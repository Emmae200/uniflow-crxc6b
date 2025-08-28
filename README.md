# UniFlow Project

A comprehensive student productivity and planning application with both frontend and backend components.

## Project Structure

```
uniflow-crxc6b/
├── UNIFLOW/              # Backend API (Node.js, Express, MongoDB)
│   ├── src/             # Source code
│   ├── prisma/          # Database schema
│   ├── package.json     # Backend dependencies
│   └── README.md        # Backend documentation
├── UNIFLOW_FRONTEND/    # Frontend App (React, Ionic, TypeScript)
│   ├── pages/           # Application pages
│   ├── components/      # Reusable components
│   ├── services/        # API services
│   ├── package.json     # Frontend dependencies
│   └── README.md        # Frontend documentation
└── README.md           # This file
```

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd UNIFLOW
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (create .env file):
```bash
MONGO_URI=mongodb://localhost:27017/uniflow
JWT_SECRET=your-super-secret-jwt-key
```

4. Start the backend server:
```bash
npm run dev
```

The backend will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd UNIFLOW_FRONTEND
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Features

### Backend (UNIFLOW/)
- **Authentication**: JWT-based auth with Google OAuth
- **User Management**: Registration, login, profile management
- **Database**: MongoDB with Prisma ORM
- **API Documentation**: OpenAPI/Swagger docs
- **Error Handling**: Comprehensive error management

### Frontend (UNIFLOW_FRONTEND/)
- **Dashboard**: Overview of tasks, events, and progress
- **Calendar**: Event management with priority levels
- **Task Management**: Create, complete, and delete tasks
- **Plans**: Academic, financial, health, and personal growth planning
- **Courses**: Course management and tracking
- **Profile**: User profile management
- **Responsive Design**: Mobile-first with Ionic components

## Technologies

### Backend
- **Node.js** - Runtime environment
- **Express/Hono** - Web framework
- **MongoDB** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **Passport** - OAuth integration

### Frontend
- **React 19** - UI library
- **Ionic React** - Mobile-first UI components
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Client-side routing

## Development

Both frontend and backend support hot reloading for development. Make sure to run both services simultaneously for full functionality.

## API Endpoints

- `GET /health` - Health check
- `GET /docs` - API documentation
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

## Contributing

1. Make changes in the respective directories (UNIFLOW/ or UNIFLOW_FRONTEND/)
2. Test your changes
3. Commit and push to the repository

## License

This project is licensed under the ISC License.
