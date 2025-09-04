/**
 * Utility functions for PageVisualizer
 */
import { Position, PositionValue } from '../types';
/**
 * Parse position value to pixels
 */
export declare const parsePositionValue: (value: PositionValue, containerSize: number) => number;
/**
 * Convert position to absolute coordinates
 */
export declare const positionToAbsolute: (position: Position, containerWidth: number, containerHeight: number) => {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * Sanitize HTML content to prevent XSS
 */
export declare const sanitizeHtml: (html: string) => string;
/**
 * Load image and return promise
 */
export declare const loadImage: (src: string) => Promise<HTMLImageElement>;
/**
 * Create canvas element with proper settings
 */
export declare const createCanvas: (width: number, height: number) => HTMLCanvasElement;
/**
 * Create SVG element with proper settings
 */
export declare const createSVG: (width: number, height: number) => SVGElement;
/**
 * Apply text formatting to canvas context
 */
export declare const applyTextFormatting: (ctx: CanvasRenderingContext2D, formatting: {
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
}) => void;
/**
 * Draw text with proper alignment
 */
export declare const drawText: (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, width: number, alignment?: string) => void;
/**
 * Draw border on canvas
 */
export declare const drawBorder: (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, border: {
    width: number;
    style: string;
    color: string;
    radius?: number;
}) => void;
/**
 * Apply image filters
 */
export declare const applyImageFilters: (ctx: CanvasRenderingContext2D, filters: string[]) => void;
/**
 * Calculate text metrics
 */
export declare const getTextMetrics: (ctx: CanvasRenderingContext2D, text: string, maxWidth?: number) => {
    width: number;
    height: number;
    lines: string[];
};
/**
 * Debounce function for performance optimization
 */
export declare const debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => ((...args: Parameters<T>) => void);
/**
 * Throttle function for performance optimization
 */
export declare const throttle: <T extends (...args: any[]) => any>(func: T, limit: number) => ((...args: Parameters<T>) => void);
/**
 * Check if element is in viewport
 */
export declare const isInViewport: (element: HTMLElement) => boolean;
/**
 * Generate unique ID
 */
export declare const generateId: () => string;
/**
 * Deep clone object
 */
export declare const deepClone: <T>(obj: T) => T;
//# sourceMappingURL=index.d.ts.map