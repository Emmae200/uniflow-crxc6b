import { Schema, model, Document, Types } from 'mongoose'

export interface IUser extends Document {
  _id: Types.ObjectId   
  email: string
  password?: string
  passwordHash?: string
  googleId?: string
  name?: string
  avatar?: string
  preferences?: Record<string, unknown>
  createdAt: Date
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  name: { type: String },
  avatar: { type: String },
  preferences: { type: Object },
  createdAt: { type: Date, default: Date.now }
})

export const User = model<IUser>('User', userSchema)
