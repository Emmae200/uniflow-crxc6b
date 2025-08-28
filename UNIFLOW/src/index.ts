import 'dotenv/config'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { connectDB } from './config/db'
import authRoutes from './routes/auth'
import { authMiddleware } from './middleware/auth'
import { apiReference } from '@scalar/hono-api-reference'
import openapi from "../openapi.json"
import emailAuthRoutes from './routes/EmailAuth'
import profileRoutes from './routes/profile'
import { handleError } from './utils/errorHandler'

// Create app once
const app = new Hono()

// API docs
app.get('/docs', apiReference({
  spec: {
    url: '/openapi.json'
  }
}))

// Serve the OpenAPI spec at /openapi.json
app.get('/openapi.json', (c) => {
  return c.json(openapi)
})

// Mount auth routes under /auth
app.route('/auth', authRoutes)
app.route('/auth', emailAuthRoutes)

// Mount profile routes under /profile
app.route('/profile', profileRoutes)

// Global error handler
app.onError((err, c) => {
  return handleError(err, c)
})

// Health check endpoint
app.get('/health', async (c) => {
  try {
    const { User } = await import('./models/User')
    const userCount = await User.countDocuments()
    return c.json({
      status: 'healthy',
      message: 'UniFlow API is running',
      database: 'connected',
      userCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return c.json({
      status: 'unhealthy',
      message: 'Database connection failed',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, 500)
  }
})

// Test endpoint to verify database connection (legacy)
app.get('/test-db', async (c) => {
  try {
    const { User } = await import('./models/User')
    const userCount = await User.countDocuments()
    return c.json({
      message: 'Database connection working!',
      userCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return c.json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})



// Start server after DB connects
connectDB().then(() => {
  serve(app)
  console.log('🚀 UniFlow backend running at http://localhost:3000')
  console.log('📚 API Documentation available at http://localhost:3000/docs')
  console.log('🔍 OpenAPI spec available at http://localhost:3000/openapi.json')
})

export default app
