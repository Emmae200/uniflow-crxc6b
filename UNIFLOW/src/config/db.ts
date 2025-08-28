// src/config/db.ts
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load env vars
dotenv.config()

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI
    
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is not defined')
    }
    
    console.log(`🔗 Attempting to connect to MongoDB at: ${mongoUri}`)

    // Connect with recommended options
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Fail fast if DB unreachable
    })

    console.log('✅ MongoDB connected successfully')

    // Test the connection with a ping
    const admin = mongoose.connection.db?.admin()
    if (admin) {
      const result = await admin.ping()
      console.log('🏓 MongoDB ping successful:', result)
    }
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err)
    console.error('💡 Make sure your MONGO_URI is correct and MongoDB is running')
    process.exit(1)
  }
}
