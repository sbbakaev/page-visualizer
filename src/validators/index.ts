import { z } from 'zod';
import {
  pageSchema,
  pageVisualizerOptionsSchema,
  exportOptionsSchema,
  positionSchema,
  backgroundSchema,
  textBlockSchema,
  imageElementSchema,
  layoutOptionsSchema,
  animationSchema,
  interactiveElementSchema,
  globalStylesSchema,
  customThemeSchema,
} from './schemas';
import { ValidationError } from '../types';

/**
 * Validation utilities for PageVisualizer
 */

export const validatePage = (data: unknown) => {
  try {
    return pageSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `Invalid page data: ${error.errors.map(e => e.message).join(', ')}`,
        error.errors
      );
    }
    throw error;
  }
};

export const validatePageVisualizerOptions = (data: unknown) => {
  try {
    return pageVisualizerOptionsSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `Invalid PageVisualizer options: ${error.errors.map(e => e.message).join(', ')}`,
        error.errors
      );
    }
    throw error;
  }
};

export const validateExportOptions = (data: unknown) => {
  try {
    return exportOptionsSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `Invalid export options: ${error.errors.map(e => e.message).join(', ')}`,
        error.errors
      );
    }
    throw error;
  }
};

export const validatePosition = (data: unknown) => {
  try {
    return positionSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `Invalid position data: ${error.errors.map(e => e.message).join(', ')}`,
        error.errors
      );
    }
    throw error;
  }
};

export const validateBackground = (data: unknown) => {
  try {
    return backgroundSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `Invalid background data: ${error.errors.map(e => e.message).join(', ')}`,
        error.errors
      );
    }
    throw error;
  }
};

export const validateTextBlock = (data: unknown) => {
  try {
    return textBlockSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `Invalid text block data: ${error.errors.map(e => e.message).join(', ')}`,
        error.errors
      );
    }
    throw error;
  }
};

export const validateImageElement = (data: unknown) => {
  try {
    return imageElementSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `Invalid image element data: ${error.errors.map(e => e.message).join(', ')}`,
        error.errors
      );
    }
    throw error;
  }
};

export const validateLayoutOptions = (data: unknown) => {
  try {
    return layoutOptionsSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `Invalid layout options: ${error.errors.map(e => e.message).join(', ')}`,
        error.errors
      );
    }
    throw error;
  }
};

export const validateAnimation = (data: unknown) => {
  try {
    return animationSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `Invalid animation data: ${error.errors.map(e => e.message).join(', ')}`,
        error.errors
      );
    }
    throw error;
  }
};

export const validateInteractiveElement = (data: unknown) => {
  try {
    return interactiveElementSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `Invalid interactive element data: ${error.errors.map(e => e.message).join(', ')}`,
        error.errors
      );
    }
    throw error;
  }
};

export const validateGlobalStyles = (data: unknown) => {
  try {
    return globalStylesSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `Invalid global styles: ${error.errors.map(e => e.message).join(', ')}`,
        error.errors
      );
    }
    throw error;
  }
};

export const validateCustomTheme = (data: unknown) => {
  try {
    return customThemeSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        `Invalid custom theme: ${error.errors.map(e => e.message).join(', ')}`,
        error.errors
      );
    }
    throw error;
  }
};

// Re-export schemas for external use
export {
  pageSchema,
  pageVisualizerOptionsSchema,
  exportOptionsSchema,
  positionSchema,
  backgroundSchema,
  textBlockSchema,
  imageElementSchema,
  layoutOptionsSchema,
  animationSchema,
  interactiveElementSchema,
  globalStylesSchema,
  customThemeSchema,
} from './schemas';
