import { Context } from 'hono'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export class ValidationError extends Error implements AppError {
  statusCode = 400
  isOperational = true

  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class AuthenticationError extends Error implements AppError {
  statusCode = 401
  isOperational = true

  constructor(message: string = 'Authentication failed') {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends Error implements AppError {
  statusCode = 403
  isOperational = true

  constructor(message: string = 'Access denied') {
    super(message)
    this.name = 'AuthorizationError'
  }
}

export class NotFoundError extends Error implements AppError {
  statusCode = 404
  isOperational = true

  constructor(message: string = 'Resource not found') {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends Error implements AppError {
  statusCode = 409
  isOperational = true

  constructor(message: string = 'Resource conflict') {
    super(message)
    this.name = 'ConflictError'
  }
}

export const handleError = (error: unknown, c: Context) => {
  console.error('Error occurred:', error)

  // Handle known application errors
  if (error instanceof Error && 'statusCode' in error) {
    const appError = error as AppError
    const statusCode = appError.statusCode || 500
    return c.json({
      error: appError.name,
      message: appError.message,
      statusCode
    }, statusCode as any)
  }

  // Handle validation errors
  if (error instanceof Error && error.name === 'ValidationError') {
    return c.json({
      error: 'ValidationError',
      message: error.message,
      statusCode: 400
    }, 400)
  }

  // Handle MongoDB errors
  if (error instanceof Error && error.name === 'MongoError') {
    const mongoError = error as any
    if (mongoError.code === 11000) {
      return c.json({
        error: 'DuplicateError',
        message: 'Resource already exists',
        statusCode: 409
      }, 409)
    }
  }

  // Handle JWT errors
  if (error instanceof Error && error.name === 'JsonWebTokenError') {
    return c.json({
      error: 'TokenError',
      message: 'Invalid token',
      statusCode: 401
    }, 401)
  }

  if (error instanceof Error && error.name === 'TokenExpiredError') {
    return c.json({
      error: 'TokenExpiredError',
      message: 'Token has expired',
      statusCode: 401
    }, 401)
  }

  // Default error response
  return c.json({
    error: 'InternalServerError',
    message: 'An unexpected error occurred',
    statusCode: 500
  }, 500)
}

export const asyncHandler = (fn: (c: Context) => Promise<any>) => {
  return async (c: Context) => {
    try {
      return await fn(c)
    } catch (error) {
      return handleError(error, c)
    }
  }
}
