// helpers.test.js - Unit tests for client-side utility functions
import { 
  formatDate, 
  truncateText, 
  validateEmail, 
  debounce, 
  capitalizeFirstLetter 
} from '../../utils/helpers';

describe('Client-side Utility Functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = '2023-01-15T10:30:00Z';
      const result = formatDate(date);
      // Format may vary based on locale, but should contain these elements
      expect(result).toMatch(/Jan/);
      expect(result).toMatch(/2023/);
    });

    it('should handle empty date', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const text = 'This is a long text that should be truncated';
      const result = truncateText(text, 20);
      expect(result).toBe('This is a long text...');
    });

    it('should not truncate short text', () => {
      const text = 'Short text';
      const result = truncateText(text, 20);
      expect(result).toBe('Short text');
    });

    it('should handle empty text', () => {
      expect(truncateText('')).toBe('');
      expect(truncateText(null)).toBe('');
      expect(truncateText(undefined)).toBe('');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail(null)).toBe(false);
      expect(validateEmail(undefined)).toBe(false);
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should capitalize first letter', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
      expect(capitalizeFirstLetter('world')).toBe('World');
    });

    it('should handle empty string', () => {
      expect(capitalizeFirstLetter('')).toBe('');
      expect(capitalizeFirstLetter(null)).toBe('');
      expect(capitalizeFirstLetter(undefined)).toBe('');
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    it('should debounce function calls', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 1000);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      // Fast-forward time
      jest.runAllTimers();

      // Should only have been called once
      expect(func).toHaveBeenCalledTimes(1);
    });
  });
});