/**
 * PageVisualizer - TypeScript Library for Digital Page Rendering
 * 
 * A modular, importable TypeScript library for rendering and visualizing pages of 
 * digital books, comics, manga, or interactive content using HTML5 Canvas, SVG, or DOM.
 */

export { PageVisualizer } from './PageVisualizer';
export * from './types';
export * from './validators';
export { CanvasRenderer } from './renderers/CanvasRenderer';
export { SVGRenderer } from './renderers/SVGRenderer';
export * from './utils';

// Default export
export default PageVisualizer;
