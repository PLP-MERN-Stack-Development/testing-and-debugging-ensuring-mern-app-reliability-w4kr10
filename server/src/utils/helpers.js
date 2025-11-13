// helpers.js - Utility functions for the server
const mongoose = require('mongoose');

// Format MongoDB error messages
const formatMongoError = (error) => {
  if (error.code === 11000) {
    return 'Duplicate key error: This record already exists';
  }
  
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(err => err.message);
    return messages.join(', ');
  }
  
  return error.message || 'An unknown error occurred';
};

// Generate slug from text
const generateSlug = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Paginate results
const paginateResults = (page = 1, limit = 10) => {
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = parseInt(limit) || 10;
  const finalLimit = limitNum > 0 ? Math.min(limitNum, 100) : 10;
  const skip = (pageNum - 1) * finalLimit;
  
  return { page: pageNum, limit: finalLimit, skip };
};

module.exports = {
  formatMongoError,
  generateSlug,
  isValidObjectId,
  paginateResults
};