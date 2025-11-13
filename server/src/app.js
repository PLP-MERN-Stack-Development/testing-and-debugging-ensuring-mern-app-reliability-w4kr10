// app.js - Main Express application
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
  next();
});

// Routes
app.use('/api/posts', require('./routes/posts'));

// 404 handler
app.use((req, res) => {
  logger.warn('Route not found', {
    method: req.method,
    url: req.url
  });
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;