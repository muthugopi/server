// utils/errorHandling.mjs

export class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(err, req, res, next) {
  // Handle known errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(err.details ? { details: err.details } : {})
    });
  }
  // Handle validation errors (like from Joi or Zod, if used)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation error',
      details: err.details || err.message
    });
  }
  // Generic / unknown errors
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong. Please try again later.'
  });
}

export function notFoundHandler(req, res, next) {
  res.status(404).json({
    status: 'fail',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
}