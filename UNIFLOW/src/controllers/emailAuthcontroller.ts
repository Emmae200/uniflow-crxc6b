



import { User } from '../models/User'
import { signTokens } from '../utils/jwt'
import { hashPassword, comparePassword } from '../utils/hash'
import { ensureProfile } from '../controllers/profile'
import { asyncHandler, ValidationError, AuthenticationError, ConflictError } from '../utils/errorHandler'

// --- Signup ---
export const signup = asyncHandler(async (c: any) => {
  const { email, password, name } = await c.req.json()
  
  // Validation
  if (!email || !password) {
    throw new ValidationError('Email and password are required')
  }
  
  if (password.length < 6) {
    throw new ValidationError('Password must be at least 6 characters long')
  }

  console.log('[EmailAuth] Signup attempt for:', email)

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new ConflictError('User already exists')
  }

  const hashed = await hashPassword(password)  
  const user = new User({ email, passwordHash: hashed, name })
  await user.save()
  console.log('[EmailAuth] User created:', email)

  // Auto-create profile
  await ensureProfile(user)

  const { token, refreshToken } = signTokens(user._id.toString())
  return c.json({ token, refreshToken, user })
})
// --- Signin ---
export const signin = asyncHandler(async (c: any) => {
  const { email, password } = await c.req.json()
  
  // Validation
  if (!email || !password) {
    throw new ValidationError('Email and password are required')
  }

  console.log('[EmailAuth] Signin attempt for:', email)

  const user = await User.findOne({ email })
  if (!user || !user.passwordHash) {
    console.log('[EmailAuth] User not found or no password set:', email)
    throw new AuthenticationError('Invalid credentials')
  }

  const isMatch = await comparePassword(password, user.passwordHash)
  if (!isMatch) {
    console.log('[EmailAuth] Invalid password for:', email)
    throw new AuthenticationError('Invalid credentials')
  }

  const { token, refreshToken } = signTokens(user._id.toString())
  console.log('[EmailAuth] Signin successful for:', email)
  return c.json({ token, refreshToken, user })
})
