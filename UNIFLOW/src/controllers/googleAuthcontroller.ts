import { google } from 'googleapis'
import { User } from '../models/User'
import { signTokens } from '../utils/jwt'
import { asyncHandler, ValidationError, AuthenticationError } from '../utils/errorHandler'

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback'

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)

// Redirect to Google login
export const redirectToGoogle = (c: any) => {
  console.log('[Controller] redirectToGoogle called')
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
    prompt: 'consent',
  })
  console.log('[Controller] Redirecting to Google:', authUrl)
  return c.redirect(authUrl)
}

// Handle Google callback
export const handleGoogleCallback = asyncHandler(async (c: any) => {
  const code = c.req.query('code')
  console.log('[Controller] handleGoogleCallback called with code:', code)

  if (!code) {
    console.error('[Controller] No code provided')
    throw new ValidationError('No authorization code provided')
  }

  const { tokens } = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens)
  console.log('[Controller] Tokens received:', tokens)

  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client })
  const { data: profile } = await oauth2.userinfo.get()
  console.log('[Controller] Profile received:', profile)

  if (!profile.email) {
    throw new AuthenticationError('No email found in Google profile')
  }

  let user = await User.findOne({ googleId: profile.id })
  if (!user) {
    console.log('[Controller] Creating new user:', profile.email)
    user = new User({
      email: profile.email,
      googleId: profile.id,
      name: profile.name,
      avatar: profile.picture,
    })
    await user.save()
    console.log('[Controller] User saved successfully')
  } else {
    console.log('[Controller] User found:', user.email)
  }

  const { token, refreshToken } = signTokens(user._id.toString())
  console.log('[Controller] JWTs generated for:', user.email)

  return c.json({ token, refreshToken, user })
})
