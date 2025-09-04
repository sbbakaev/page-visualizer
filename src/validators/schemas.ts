import { z } from 'zod';

/**
 * Zod validation schemas for PageVisualizer
 * Ensures type safety and runtime validation
 */

// Base position value schema
const positionValueSchema = z.union([
  z.number().positive(),
  z.string().regex(/^\d+(\.\d+)?(px|%|vw|vh|em|rem)$/)
]);

// Position schema
export const positionSchema = z.object({
  x: positionValueSchema,
  y: positionValueSchema,
  width: positionValueSchema,
  height: positionValueSchema,
  alignment: z.enum(['left', 'center', 'right', 'justify']).optional(),
});

// Background schema
export const backgroundSchema = z.object({
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$|^rgb\(|^rgba\(|^hsl\(|^hsla\(/).optional(),
  image: z.string().url().optional(),
  gradient: z.string().optional(),
});

// Text formatting schema
export const textFormattingSchema = z.object({
  fontSize: z.union([z.number().positive(), z.string()]),
  fontFamily: z.string().min(1),
  fontStyle: z.enum(['normal', 'italic', 'oblique']).optional(),
  fontWeight: z.union([
    z.number().min(100).max(900),
    z.enum(['normal', 'bold'])
  ]).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$|^rgb\(|^rgba\(|^hsl\(|^hsla\(/),
  lineHeight: z.number().positive().optional(),
  letterSpacing: z.number().optional(),
  textDecoration: z.enum(['none', 'underline', 'line-through']).optional(),
  shadow: z.string().optional(),
  opacity: z.number().min(0).max(1).optional(),
});

// Border options schema
export const borderOptionsSchema = z.object({
  width: z.number().nonnegative(),
  style: z.enum(['solid', 'dashed', 'dotted']),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$|^rgb\(|^rgba\(|^hsl\(|^hsla\(/),
  radius: z.number().nonnegative().optional(),
});

// Text block schema
export const textBlockSchema = z.object({
  id: z.string().optional(),
  content: z.string(),
  position: positionSchema,
  formatting: textFormattingSchema,
  zIndex: z.number().int().optional(),
});

// Image element schema
export const imageElementSchema = z.object({
  id: z.string().optional(),
  src: z.string().url(),
  position: positionSchema,
  zIndex: z.number().int().optional(),
  altText: z.string().optional(),
  filters: z.array(z.string()).optional(),
  border: borderOptionsSchema.optional(),
});

// Layout options schema
export const layoutOptionsSchema = z.object({
  type: z.enum(['absolute', 'grid', 'flex']),
  columns: z.number().int().positive().optional(),
  rows: z.number().int().positive().optional(),
  direction: z.enum(['row', 'column']).optional(),
  responsive: z.boolean().optional(),
});

// Animation schema
export const animationSchema = z.object({
  target: z.string().min(1),
  type: z.enum(['fadeIn', 'slide', 'rotate']),
  duration: z.number().positive(),
  delay: z.number().nonnegative().optional(),
});

// Interactive element schema
export const interactiveElementSchema = z.object({
  id: z.string().min(1),
  type: z.enum(['button', 'link', 'input', 'custom']),
  position: positionSchema,
  content: z.string().optional(),
  zIndex: z.number().int().optional(),
  onClick: z.function().optional(),
  onHover: z.function().optional(),
  onFocus: z.function().optional(),
  onBlur: z.function().optional(),
});

// Custom theme schema
export const customThemeSchema = z.object({
  name: z.string().min(1),
  colors: z.object({
    primary: z.string().regex(/^#[0-9A-Fa-f]{6}$|^rgb\(|^rgba\(|^hsl\(|^hsla\(/),
    secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$|^rgb\(|^rgba\(|^hsl\(|^hsla\(/),
    background: z.string().regex(/^#[0-9A-Fa-f]{6}$|^rgb\(|^rgba\(|^hsl\(|^hsla\(/),
    text: z.string().regex(/^#[0-9A-Fa-f]{6}$|^rgb\(|^rgba\(|^hsl\(|^hsla\(/),
    accent: z.string().regex(/^#[0-9A-Fa-f]{6}$|^rgb\(|^rgba\(|^hsl\(|^hsla\(/),
  }),
  fonts: z.object({
    primary: z.string().min(1),
    secondary: z.string().min(1),
    heading: z.string().min(1),
  }),
  spacing: z.object({
    small: z.number().positive(),
    medium: z.number().positive(),
    large: z.number().positive(),
  }),
});

// Global styles schema
export const globalStylesSchema = z.object({
  pageWidth: z.number().positive(),
  pageHeight: z.number().positive(),
  margin: z.object({
    top: z.number().nonnegative(),
    right: z.number().nonnegative(),
    bottom: z.number().nonnegative(),
    left: z.number().nonnegative(),
  }),
  theme: z.union([
    z.enum(['light', 'dark']),
    customThemeSchema
  ]),
});

// Page schema
export const pageSchema = z.object({
  id: z.union([z.string(), z.number()]),
  background: backgroundSchema.optional(),
  textBlocks: z.array(textBlockSchema).optional(),
  images: z.array(imageElementSchema).optional(),
  layout: layoutOptionsSchema.optional(),
  animations: z.array(animationSchema).optional(),
  interactiveElements: z.array(interactiveElementSchema).optional(),
});

// PageVisualizer options schema
export const pageVisualizerOptionsSchema = z.object({
  container: z.instanceof(HTMLElement),
  mode: z.enum(['canvas', 'svg', 'dom']).optional(),
  globalStyles: globalStylesSchema.partial().optional(),
  onError: z.function().optional(),
  onLoad: z.function().optional(),
  onRender: z.function().optional(),
});

// Export options schema
export const exportOptionsSchema = z.object({
  format: z.enum(['png', 'jpeg', 'pdf', 'svg']),
  quality: z.number().min(0).max(1).optional(),
  filename: z.string().optional(),
});
