import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'super-secret-access'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'super-secret-refresh'

// Access tokens usually expire fast (e.g. 15m)
const ACCESS_TOKEN_EXPIRY = '15m'
// Refresh tokens last longer (e.g. 7d)
const REFRESH_TOKEN_EXPIRY = '7d'

export function signTokens(userId: string) {
  const token = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  })

  const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  })

  return { token, refreshToken }
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET)
}

export function verifyRefreshToken(refreshToken: string) {
  return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
}
