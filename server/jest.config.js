// jest.config.js - Jest configuration for server tests

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/config/**',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  verbose: true,
  testTimeout: 30000,
};
