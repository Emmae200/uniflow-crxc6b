// src/config/db.ts
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

// Load env vars from the correct path
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

export const connectDB = async () => {
  try {
    // Debug: Log all environment variables (remove in production)
    console.log('🔍 Environment variables check:')
    console.log('MONGO_URI exists:', !!process.env.MONGO_URI)
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET)
    console.log('GOOGLE_CLIENT_ID exists:', !!process.env.GOOGLE_CLIENT_ID)
    
    const mongoUri = process.env.MONGO_URI
    
    if (!mongoUri) {
      console.error('❌ MONGO_URI is not defined in environment variables')
      console.error('💡 Check your .env file in the backend directory')
      console.error('📁 Current working directory:', process.cwd())
      console.error('📄 .env file path:', path.resolve(process.cwd(), '.env'))
      throw new Error('MONGO_URI environment variable is not defined')
    }
    
    console.log(`🔗 Attempting to connect to MongoDB...`)
    console.log(`📍 URI: ${mongoUri.substring(0, 50)}...`)

    // Connect with recommended options
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000, // Increased timeout
      socketTimeoutMS: 45000,
      bufferCommands: false,
    })

    console.log('✅ MongoDB connected successfully')

    // Test the connection with a ping
    const admin = mongoose.connection.db?.admin()
    if (admin) {
      const result = await admin.ping()
      console.log('🏓 MongoDB ping successful:', result)
    }

    // Log connection info
    console.log('📊 Database:', mongoose.connection.name)
    console.log('🌐 Host:', mongoose.connection.host)
    console.log('🔌 Port:', mongoose.connection.port)
    
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err)
    console.error('💡 Troubleshooting steps:')
    console.error('   1. Check if your .env file exists in the backend directory')
    console.error('   2. Verify MONGO_URI is correctly set')
    console.error('   3. Ensure MongoDB Atlas cluster is accessible')
    console.error('   4. Check network connectivity')
    console.error('   5. Verify username/password in connection string')
    process.exit(1)
  }
}
