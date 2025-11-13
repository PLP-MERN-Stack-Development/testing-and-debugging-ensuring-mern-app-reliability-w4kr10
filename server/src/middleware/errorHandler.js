// errorHandler.js - Global error handling middleware
const { formatMongoError } = require('../utils/helpers');

// Global error handler
const errorHandler = (err, req, res, next) => {
  // Log error for debugging (in production, use a proper logging library)
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json({
      success: false,
      error: message
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    return res.status(400).json({
      success: false,
      error: message
    });
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    return res.status(404).json({
      success: false,
      error: message
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    return res.status(401).json({
      success: false,
      error: message
    });
  }

  // Token expired
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    return res.status(401).json({
      success: false,
      error: message
    });
  }

  // Use custom error message or default
  const message = formatMongoError(err);
  
  // Default server error
  res.status(err.statusCode || 500).json({
    success: false,
    error: message || 'Server Error'
  });
};

module.exports = errorHandler;