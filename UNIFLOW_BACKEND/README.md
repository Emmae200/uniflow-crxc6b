# UniFlow API

A modern Node.js/TypeScript backend API built with Hono framework for educational/university applications. Provides comprehensive authentication, user management, and profile functionality.

## 🚀 Features

- **Dual Authentication**: Email/password and Google OAuth
- **JWT Token System**: Secure access and refresh tokens
- **User Profiles**: Academic profile management
- **Comprehensive Error Handling**: Centralized error management
- **API Documentation**: Interactive OpenAPI/Swagger docs
- **TypeScript**: Full type safety
- **MongoDB Integration**: Robust database operations

## 🏗️ Architecture

```
src/
├── index.ts              # Main server entry point
├── config/
│   └── db.ts            # MongoDB connection setup
├── models/
│   ├── User.ts          # User data model
│   └── profile.ts       # User profile model
├── controllers/
│   ├── emailAuthcontroller.ts    # Email/password auth logic
│   ├── googleAuthcontroller.ts   # Google OAuth logic
│   └── profile.ts               # Profile management
├── routes/
│   ├── auth.ts          # Google OAuth routes
│   ├── EmailAuth.ts     # Email auth routes
│   └── profile.ts       # Profile routes
├── middleware/
│   └── auth.ts          # JWT authentication middleware
├── utils/
│   ├── jwt.ts           # JWT token utilities
│   ├── hash.ts          # Password hashing utilities
│   └── errorHandler.ts  # Centralized error handling
└── passport.ts          # Passport.js configuration
```

## 📋 API Endpoints

### Authentication
- `POST /auth/signup` - Register with email/password
- `POST /auth/signin` - Login with email/password
- `GET /auth/google` - Redirect to Google OAuth
- `GET /auth/google/callback` - Google OAuth callback

### Profile Management
- `GET /profile/me` - Get current user profile
- `PUT /profile/me` - Update current user profile
- `DELETE /profile/me` - Delete current user profile

### System
- `GET /health` - Health check endpoint
- `GET /docs` - Interactive API documentation
- `GET /openapi.json` - OpenAPI specification

## 🔧 Setup

### Prerequisites
- Node.js 18+
- MongoDB
- Google OAuth credentials (for Google auth)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uniflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file:
   ```env
   # Database
   MONGO_URI=mongodb://localhost:27017/uniflow
   
   # JWT Secrets
   ACCESS_TOKEN_SECRET=your-access-token-secret
   REFRESH_TOKEN_SECRET=your-refresh-token-secret
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   ```

4. **Run the application**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   ```

## 🔐 Authentication

### Email/Password Authentication
```bash
# Signup
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123", "name": "John Doe"}'

# Signin
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Google OAuth
1. Visit `GET /auth/google` to start OAuth flow
2. Complete Google authentication
3. Receive JWT tokens in callback

### Using JWT Tokens
```bash
# Include token in Authorization header
curl -X GET http://localhost:3000/profile/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Error Handling

The API uses a centralized error handling system with consistent error responses:

```json
{
  "error": "ErrorType",
  "message": "Human readable message",
  "statusCode": 400
}
```

### Error Types
- `ValidationError` (400) - Invalid input data
- `AuthenticationError` (401) - Authentication failed
- `AuthorizationError` (403) - Access denied
- `NotFoundError` (404) - Resource not found
- `ConflictError` (409) - Resource conflict
- `InternalServerError` (500) - Unexpected server error

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### Code Structure
- **Controllers**: Business logic and request handling
- **Routes**: API endpoint definitions
- **Models**: Database schemas and models
- **Middleware**: Request processing (auth, validation)
- **Utils**: Helper functions and utilities

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Comprehensive request validation
- **Error Sanitization**: Safe error responses
- **CORS**: Configurable cross-origin requests

## 📈 Recent Improvements

### ✅ Completed Enhancements
1. **Profile Routes Implementation**: Added complete CRUD operations for user profiles
2. **Code Cleanup**: Removed all commented-out code for cleaner codebase
3. **Comprehensive Error Handling**: Centralized error management with custom error classes
4. **Enhanced JWT Middleware**: Improved token verification and error handling
5. **Health Check Endpoint**: Added system health monitoring
6. **Updated API Documentation**: Enhanced OpenAPI specification
7. **Input Validation**: Added request validation across all endpoints

### 🎯 Key Improvements
- **Better Error Messages**: Consistent, informative error responses
- **Type Safety**: Enhanced TypeScript usage throughout
- **Code Organization**: Cleaner, more maintainable structure
- **API Consistency**: Standardized response formats
- **Developer Experience**: Better debugging and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Check the API documentation at `/docs`
- Review the health endpoint at `/health`
- Check server logs for detailed error information
