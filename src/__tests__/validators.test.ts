/**
 * Tests for validation functions
 */

import {
  validatePage,
  validatePageVisualizerOptions,
  validatePosition,
  validateBackground,
  validateTextBlock,
  validateImageElement,
} from '../validators';
import { ValidationError } from '../types';

describe('Validators', () => {
  describe('validatePage', () => {
    it('should validate a correct page', () => {
      const validPage = {
        id: 'test-page',
        background: {
          color: '#ffffff',
        },
        textBlocks: [
          {
            content: 'Test text',
            position: {
              x: 10,
              y: 10,
              width: 100,
              height: 20,
            },
            formatting: {
              fontSize: 16,
              fontFamily: 'Arial',
              color: '#000000',
            },
          },
        ],
      };

      expect(() => validatePage(validPage)).not.toThrow();
    });

    it('should throw ValidationError for invalid page', () => {
      const invalidPage = {
        id: 'test',
        textBlocks: [
          {
            content: 'Test text',
            position: {
              x: -10, // Invalid negative value
              y: 10,
              width: 100,
              height: 20,
            },
            formatting: {
              fontSize: -16, // Invalid negative value
              fontFamily: '', // Empty string
              color: 'invalid-color',
            },
          },
        ],
      };

      expect(() => validatePage(invalidPage)).toThrow(ValidationError);
    });
  });

  describe('validatePageVisualizerOptions', () => {
    it('should validate correct options', () => {
      const container = document.createElement('div');
      const validOptions = {
        container,
        mode: 'canvas' as const,
        globalStyles: {
          pageWidth: 800,
          pageHeight: 600,
          margin: { top: 20, right: 20, bottom: 20, left: 20 },
          theme: 'light' as const,
        },
      };

      expect(() => validatePageVisualizerOptions(validOptions)).not.toThrow();
    });

    it('should throw ValidationError for invalid options', () => {
      const invalidOptions = {
        container: 'not-an-element',
        mode: 'invalid-mode',
      };

      expect(() => validatePageVisualizerOptions(invalidOptions)).toThrow(ValidationError);
    });
  });

  describe('validatePosition', () => {
    it('should validate correct position', () => {
      const validPosition = {
        x: 10,
        y: 20,
        width: 100,
        height: 50,
        alignment: 'center' as const,
      };

      expect(() => validatePosition(validPosition)).not.toThrow();
    });

    it('should validate position with string values', () => {
      const validPosition = {
        x: '10px',
        y: '20%',
        width: '100vw',
        height: '50vh',
      };

      expect(() => validatePosition(validPosition)).not.toThrow();
    });

    it('should throw ValidationError for invalid position', () => {
      const invalidPosition = {
        x: -10, // Negative value
        y: 'invalid',
        width: 100,
        height: 50,
      };

      expect(() => validatePosition(invalidPosition)).toThrow(ValidationError);
    });
  });

  describe('validateBackground', () => {
    it('should validate correct background', () => {
      const validBackground = {
        color: '#ffffff',
        image: 'https://example.com/image.jpg',
        gradient: 'linear-gradient(45deg, #ff0000, #0000ff)',
      };

      expect(() => validateBackground(validBackground)).not.toThrow();
    });

    it('should validate background with only color', () => {
      const validBackground = {
        color: 'rgb(255, 255, 255)',
      };

      expect(() => validateBackground(validBackground)).not.toThrow();
    });

    it('should throw ValidationError for invalid background', () => {
      const invalidBackground = {
        color: 'invalid-color',
        image: 'not-a-url',
      };

      expect(() => validateBackground(invalidBackground)).toThrow(ValidationError);
    });
  });

  describe('validateTextBlock', () => {
    it('should validate correct text block', () => {
      const validTextBlock = {
        id: 'text-1',
        content: 'Test content',
        position: {
          x: 10,
          y: 10,
          width: 100,
          height: 20,
        },
        formatting: {
          fontSize: 16,
          fontFamily: 'Arial',
          color: '#000000',
          fontStyle: 'normal' as const,
          fontWeight: 'bold' as const,
          lineHeight: 1.5,
          letterSpacing: 1,
          textDecoration: 'none' as const,
          opacity: 0.8,
        },
        zIndex: 1,
      };

      expect(() => validateTextBlock(validTextBlock)).not.toThrow();
    });

    it('should throw ValidationError for invalid text block', () => {
      const invalidTextBlock = {
        content: 'Test',
        position: {
          x: 10,
          y: 10,
          width: 100,
          height: 20,
        },
        formatting: {
          fontSize: -16, // Invalid negative value
          fontFamily: '', // Empty string
          color: 'invalid-color',
        },
      };

      expect(() => validateTextBlock(invalidTextBlock)).toThrow(ValidationError);
    });
  });

  describe('validateImageElement', () => {
    it('should validate correct image element', () => {
      const validImageElement = {
        id: 'image-1',
        src: 'https://example.com/image.jpg',
        position: {
          x: 10,
          y: 10,
          width: 100,
          height: 100,
        },
        altText: 'Test image',
        filters: ['blur(5px)', 'brightness(1.2)'],
        border: {
          width: 2,
          style: 'solid' as const,
          color: '#000000',
          radius: 5,
        },
        zIndex: 2,
      };

      expect(() => validateImageElement(validImageElement)).not.toThrow();
    });

    it('should throw ValidationError for invalid image element', () => {
      const invalidImageElement = {
        src: 'not-a-url',
        position: {
          x: 10,
          y: 10,
          width: 100,
          height: 100,
        },
        border: {
          width: -2, // Invalid negative value
          style: 'invalid-style' as any,
          color: 'invalid-color',
        },
      };

      expect(() => validateImageElement(invalidImageElement)).toThrow(ValidationError);
    });
  });
});
