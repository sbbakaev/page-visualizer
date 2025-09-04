/**
 * Utility functions for PageVisualizer
 */

import { Position, PositionValue, RenderingContext } from '../types';

/**
 * Parse position value to pixels
 */
export const parsePositionValue = (value: PositionValue, containerSize: number): number => {
  if (typeof value === 'number') {
    return value;
  }

  const match = value.match(/^(\d+(?:\.\d+)?)(px|%|vw|vh|em|rem)$/);
  if (!match) {
    throw new Error(`Invalid position value: ${value}`);
  }

  const [, num, unit] = match;
  const numValue = parseFloat(num);

  switch (unit) {
    case 'px':
      return numValue;
    case '%':
      return (numValue / 100) * containerSize;
    case 'vw':
      return (numValue / 100) * window.innerWidth;
    case 'vh':
      return (numValue / 100) * window.innerHeight;
    case 'em':
      return numValue * 16; // Assuming 16px base font size
    case 'rem':
      return numValue * 16; // Assuming 16px root font size
    default:
      return numValue;
  }
};

/**
 * Convert position to absolute coordinates
 */
export const positionToAbsolute = (
  position: Position,
  containerWidth: number,
  containerHeight: number
): { x: number; y: number; width: number; height: number } => {
  const x = parsePositionValue(position.x, containerWidth);
  const y = parsePositionValue(position.y, containerHeight);
  const width = parsePositionValue(position.width, containerWidth);
  const height = parsePositionValue(position.height, containerHeight);

  return { x, y, width, height };
};

/**
 * Sanitize HTML content to prevent XSS
 */
export const sanitizeHtml = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

/**
 * Load image and return promise
 */
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Create canvas element with proper settings
 */
export const createCanvas = (width: number, height: number): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.display = 'block';
  return canvas;
};

/**
 * Create SVG element with proper settings
 */
export const createSVG = (width: number, height: number): SVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width.toString());
  svg.setAttribute('height', height.toString());
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  return svg;
};

/**
 * Apply text formatting to canvas context
 */
export const applyTextFormatting = (
  ctx: CanvasRenderingContext2D,
  formatting: {
    fontSize: number | string;
    fontFamily: string;
    fontStyle?: string;
    fontWeight?: number | string;
    color: string;
    lineHeight?: number;
    letterSpacing?: number;
    textDecoration?: string;
    shadow?: string;
    opacity?: number;
  }
): void => {
  const fontSize = typeof formatting.fontSize === 'number' 
    ? formatting.fontSize 
    : parsePositionValue(formatting.fontSize, 16);

  ctx.font = `${formatting.fontStyle || 'normal'} ${formatting.fontWeight || 'normal'} ${fontSize}px ${formatting.fontFamily}`;
  ctx.fillStyle = formatting.color;
  ctx.globalAlpha = formatting.opacity ?? 1;

  if (formatting.shadow) {
    const shadowParts = formatting.shadow.split(' ');
    if (shadowParts.length >= 3) {
      ctx.shadowColor = shadowParts[2];
      ctx.shadowOffsetX = parseFloat(shadowParts[0]) || 0;
      ctx.shadowOffsetY = parseFloat(shadowParts[1]) || 0;
      ctx.shadowBlur = parseFloat(shadowParts[3]) || 0;
    }
  }

  if (formatting.letterSpacing) {
    // Note: Canvas doesn't support letter-spacing directly
    // This would need to be handled by manually positioning characters
  }
};

/**
 * Draw text with proper alignment
 */
export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number,
  alignment: string = 'left'
): void => {
  ctx.textAlign = alignment as CanvasTextAlign;
  ctx.textBaseline = 'top';

  if (alignment === 'justify') {
    // Handle justified text by distributing spaces
    const words = text.split(' ');
    if (words.length > 1) {
      const spaceWidth = ctx.measureText(' ').width;
      const totalTextWidth = ctx.measureText(text).width;
      const availableWidth = width - totalTextWidth;
      const spaceToAdd = availableWidth / (words.length - 1);

      let currentX = x;
      for (let i = 0; i < words.length; i++) {
        ctx.fillText(words[i], currentX, y);
        currentX += ctx.measureText(words[i]).width + spaceWidth + spaceToAdd;
      }
    } else {
      ctx.fillText(text, x, y);
    }
  } else {
    ctx.fillText(text, x, y);
  }
};

/**
 * Draw border on canvas
 */
export const drawBorder = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  border: {
    width: number;
    style: string;
    color: string;
    radius?: number;
  }
): void => {
  ctx.strokeStyle = border.color;
  ctx.lineWidth = border.width;
  ctx.setLineDash(border.style === 'dashed' ? [5, 5] : border.style === 'dotted' ? [2, 2] : []);

  if (border.radius) {
    // Draw rounded rectangle
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, border.radius);
    ctx.stroke();
  } else {
    // Draw regular rectangle
    ctx.strokeRect(x, y, width, height);
  }
};

/**
 * Apply image filters
 */
export const applyImageFilters = (
  ctx: CanvasRenderingContext2D,
  filters: string[]
): void => {
  if (filters.length === 0) return;

  const filterString = filters.join(' ');
  ctx.filter = filterString;
};

/**
 * Calculate text metrics
 */
export const getTextMetrics = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth?: number
): { width: number; height: number; lines: string[] } => {
  if (!maxWidth) {
    return {
      width: ctx.measureText(text).width,
      height: parseFloat(ctx.font) || 16,
      lines: [text]
    };
  }

  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  const lineHeight = parseFloat(ctx.font) || 16;
  const height = lines.length * lineHeight;

  return {
    width: Math.max(...lines.map(line => ctx.measureText(line).width)),
    height,
    lines
  };
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }

  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  return obj;
};
