// helpers.test.js - Unit tests for utility functions
const { 
  formatMongoError, 
  generateSlug, 
  isValidObjectId, 
  paginateResults 
} = require('../../src/utils/helpers');
const mongoose = require('mongoose');

describe('Utility Functions', () => {
  describe('formatMongoError', () => {
    it('should format duplicate key error', () => {
      const error = { code: 11000 };
      const result = formatMongoError(error);
      expect(result).toBe('Duplicate key error: This record already exists');
    });

    it('should format validation error', () => {
      const error = {
        name: 'ValidationError',
        errors: {
          field1: { message: 'Field1 is required' },
          field2: { message: 'Field2 must be a string' }
        }
      };
      const result = formatMongoError(error);
      expect(result).toBe('Field1 is required, Field2 must be a string');
    });

    it('should format generic error', () => {
      const error = { message: 'Something went wrong' };
      const result = formatMongoError(error);
      expect(result).toBe('Something went wrong');
    });
  });

  describe('generateSlug', () => {
    it('should generate slug from text', () => {
      const result = generateSlug('Hello World');
      expect(result).toBe('hello-world');
    });

    it('should handle special characters', () => {
      const result = generateSlug('Hello, World! 123');
      expect(result).toBe('hello-world-123');
    });

    it('should handle empty string', () => {
      const result = generateSlug('');
      expect(result).toBe('');
    });

    it('should handle null/undefined', () => {
      expect(generateSlug(null)).toBe('');
      expect(generateSlug(undefined)).toBe('');
    });
  });

  describe('isValidObjectId', () => {
    it('should validate valid ObjectId', () => {
      const validId = new mongoose.Types.ObjectId();
      expect(isValidObjectId(validId)).toBe(true);
    });

    it('should reject invalid ObjectId', () => {
      expect(isValidObjectId('invalid-id')).toBe(false);
      expect(isValidObjectId('')).toBe(false);
      expect(isValidObjectId(null)).toBe(false);
    });
  });

  describe('paginateResults', () => {
    it('should return correct pagination values', () => {
      const result = paginateResults(2, 10);
      expect(result).toEqual({ page: 2, limit: 10, skip: 10 });
    });

    it('should handle default values', () => {
      const result = paginateResults();
      expect(result).toEqual({ page: 1, limit: 10, skip: 0 });
    });

    it('should enforce minimum values', () => {
      const result = paginateResults(0, -5);
      expect(result).toEqual({ page: 1, limit: 10, skip: 0 });
    });

    it('should enforce maximum limit', () => {
      const result = paginateResults(1, 150);
      expect(result).toEqual({ page: 1, limit: 100, skip: 0 });
    });
  });
});