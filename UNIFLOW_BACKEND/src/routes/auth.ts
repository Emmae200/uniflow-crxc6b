import { Hono } from 'hono'
import { redirectToGoogle, handleGoogleCallback } from '../controllers/googleAuthcontroller'


const authRoutes = new Hono()

authRoutes.get('/google', redirectToGoogle)
authRoutes.get('/google/callback', handleGoogleCallback)

export default authRoutes
