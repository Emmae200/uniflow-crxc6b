import { Hono } from 'hono'
import { signup, signin } from '../controllers/emailAuthcontroller'


const emailAuthRoutes = new Hono()

emailAuthRoutes.post('/signup', signup)
emailAuthRoutes.post('/signin', signin)

export default emailAuthRoutes
