import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth'
import { getProfile, updateProfile, deleteProfile } from '../controllers/profile'

const profileRoutes = new Hono()

// Apply auth middleware to all profile routes
profileRoutes.use('*', authMiddleware)

// Profile CRUD operations
profileRoutes.get('/me', getProfile)
profileRoutes.put('/me', updateProfile)
profileRoutes.delete('/me', deleteProfile)

export default profileRoutes
