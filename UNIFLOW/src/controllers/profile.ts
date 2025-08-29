import { Profile } from '../models/profile'
import { IUser } from '../models/User'
import { asyncHandler, NotFoundError, ValidationError, AuthenticationError } from '../utils/errorHandler'
import { Context } from 'hono'
import { comparePassword, hashPassword } from '../utils/hash'

/**
 * Ensure a profile exists for a user.
 * If not, create a blank profile with defaults.
 */
export const ensureProfile = async (user: IUser) => {
  let profile = await Profile.findOne({ userId: user._id })
  if (!profile) {
    profile = new Profile({
      userId: user._id,
      email: user.email,
      name: user.name,
      school: '',
      department: '',
      level: '',
      bio: '',
    })
    await profile.save()
    console.log('[Profile] New profile created for:', user.email)
  } else {
    console.log('[Profile] Profile already exists for:', user.email)
  }
  return profile
}

// --- Get Profile ---
export const getProfile = asyncHandler(async (c: Context) => {
  const userId = c.get('userId') // from JWT
  const profile = await Profile.findOne({ userId })

  if (!profile) throw new NotFoundError('Profile not found')
  return c.json(profile)
})

// --- Update Profile ---
export const updateProfile = asyncHandler(async (c: Context) => {
  const userId = c.get('userId')
  const data = await c.req.json()

  // Validate notification settings if provided
  if (data.notificationSettings) {
    const validSettings = ['pushNotifications', 'emailNotifications', 'studyReminders', 'taskReminders', 'motivationalMessages']
    for (const key in data.notificationSettings) {
      if (!validSettings.includes(key)) {
        throw new ValidationError(`Invalid notification setting: ${key}`)
      }
    }
  }

  // Validate study goals if provided
  if (data.studyGoals) {
    if (data.studyGoals.dailyHours && (data.studyGoals.dailyHours < 0 || data.studyGoals.dailyHours > 24)) {
      throw new ValidationError('Daily study hours must be between 0 and 24')
    }
    if (data.studyGoals.weeklyHours && (data.studyGoals.weeklyHours < 0 || data.studyGoals.weeklyHours > 168)) {
      throw new ValidationError('Weekly study hours must be between 0 and 168')
    }
  }

  // Validate preferences if provided
  if (data.preferences) {
    if (data.preferences.focusModeDuration && (data.preferences.focusModeDuration < 1 || data.preferences.focusModeDuration > 120)) {
      throw new ValidationError('Focus mode duration must be between 1 and 120 minutes')
    }
    if (data.preferences.breakDuration && (data.preferences.breakDuration < 1 || data.preferences.breakDuration > 60)) {
      throw new ValidationError('Break duration must be between 1 and 60 minutes')
    }
  }

  const updated = await Profile.findOneAndUpdate(
    { userId },
    { $set: { ...data, updatedAt: new Date() } },
    { new: true }
  )

  if (!updated) throw new NotFoundError('Profile not found')
  return c.json(updated)
})

// --- Change Password ---
export const changePassword = asyncHandler(async (c: Context) => {
  const userId = c.get('userId')
  const { currentPassword, newPassword } = await c.req.json()

  if (!currentPassword || !newPassword) {
    throw new ValidationError('Current password and new password are required')
  }

  if (newPassword.length < 6) {
    throw new ValidationError('New password must be at least 6 characters long')
  }

  // Find user and verify current password
  const { User } = await import('../models/User')
  const user = await User.findById(userId)
  
  if (!user || !user.passwordHash) {
    throw new AuthenticationError('User not found or no password set')
  }

  const isMatch = await comparePassword(currentPassword, user.passwordHash)
  if (!isMatch) {
    throw new AuthenticationError('Current password is incorrect')
  }

  // Hash and update new password
  const newPasswordHash = await hashPassword(newPassword)
  user.passwordHash = newPasswordHash
  await user.save()

  return c.json({ message: 'Password changed successfully' })
})

// --- Delete Profile ---
export const deleteProfile = asyncHandler(async (c: Context) => {
  const userId = c.get('userId')
  const deleted = await Profile.findOneAndDelete({ userId })

  if (!deleted) throw new NotFoundError('Profile not found')
  return c.json({ message: 'Profile deleted' })
})

