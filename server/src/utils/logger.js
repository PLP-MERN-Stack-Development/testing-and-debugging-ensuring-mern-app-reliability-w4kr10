// logger.js - Simple logging utility for debugging
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log levels
const LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

// Get current timestamp
const getTimestamp = () => {
  return new Date().toISOString();
};

// Write log to file
const writeLog = (level, message, meta = {}) => {
  const timestamp = getTimestamp();
  const logEntry = {
    timestamp,
    level,
    message,
    meta
  };

  console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, meta);

  const logFile = path.join(logsDir, `${level}.log`);
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
};

// Create logger functions for each level
const logger = {
  error: (message, meta) => writeLog(LEVELS.ERROR, message, meta),
  warn: (message, meta) => writeLog(LEVELS.WARN, message, meta),
  info: (message, meta) => writeLog(LEVELS.INFO, message, meta),
  debug: (message, meta) => writeLog(LEVELS.DEBUG, message, meta)
};

module.exports = logger;