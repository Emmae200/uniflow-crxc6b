import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth'
import { getProfile, updateProfile, deleteProfile, changePassword } from '../controllers/profile'

const profileRoutes = new Hono()

// Apply auth middleware to all profile routes
profileRoutes.use('*', authMiddleware)

// Profile CRUD operations
profileRoutes.get('/me', getProfile)
profileRoutes.put('/me', updateProfile)
profileRoutes.put('/update', updateProfile) // Alias for frontend compatibility
profileRoutes.put('/change-password', changePassword)
profileRoutes.delete('/me', deleteProfile)

export default profileRoutes
