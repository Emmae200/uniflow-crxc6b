import { Schema, model, Document, Types } from 'mongoose'

export interface IProfile extends Document {
  userId: Types.ObjectId
  email: string
  name?: string
  profilePicture?: string
  themeColor?: string
  darkMode?: boolean
  school?: string
  department?: string
  level?: string
  academicYear?: string
  subjects?: string[]
  bio?: string
  notificationSettings?: {
    pushNotifications: boolean
    emailNotifications: boolean
    studyReminders: boolean
    taskReminders: boolean
    motivationalMessages: boolean
  }
  studyGoals?: {
    dailyHours: number
    weeklyHours: number
    subjects: Record<string, number> // subject: target hours
  }
  preferences?: {
    focusModeDuration: number // default Pomodoro work time
    breakDuration: number // default break time
    autoStartBreaks: boolean
    backgroundMusic: boolean
  }
  createdAt: Date
  updatedAt: Date
}

const profileSchema = new Schema<IProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  email: { type: String, required: true }, // keep in sync with User
  name: { type: String },
  profilePicture: { type: String },
  themeColor: { type: String, default: '#3B82F6' }, // default blue
  darkMode: { type: Boolean, default: false },
  school: { type: String, default: '' },
  department: { type: String, default: '' },
  level: { type: String, default: '' },
  academicYear: { type: String, default: '' },
  subjects: [{ type: String }],
  bio: { type: String, default: '' },
  notificationSettings: {
    pushNotifications: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true },
    studyReminders: { type: Boolean, default: true },
    taskReminders: { type: Boolean, default: true },
    motivationalMessages: { type: Boolean, default: true }
  },
  studyGoals: {
    dailyHours: { type: Number, default: 4 },
    weeklyHours: { type: Number, default: 25 },
    subjects: { type: Object, default: {} }
  },
  preferences: {
    focusModeDuration: { type: Number, default: 25 }, // 25 minutes default
    breakDuration: { type: Number, default: 5 }, // 5 minutes default
    autoStartBreaks: { type: Boolean, default: true },
    backgroundMusic: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Update the updatedAt field on save
profileSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const Profile = model<IProfile>('Profile', profileSchema)
