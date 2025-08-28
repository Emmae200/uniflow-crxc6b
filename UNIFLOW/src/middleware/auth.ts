


import { Context, Next } from 'hono'
import { verifyAccessToken } from '../utils/jwt'

interface JwtPayload {
  userId: string
}

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization') || c.req.header('authorization')
  if (!authHeader) return c.json({ message: 'No token provided' }, 401)

  const token = authHeader.split(' ')[1]
  try {
    const decoded = verifyAccessToken(token) as JwtPayload
    c.set('userId', decoded.userId)
    await next()
  } catch (error) {
    return c.json({ 
      message: 'Invalid or expired token',
      error: error instanceof Error ? error.message : 'Token verification failed'
    }, 401)
  }
}
