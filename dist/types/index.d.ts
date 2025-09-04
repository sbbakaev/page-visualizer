/**
 * Core interfaces and types for PageVisualizer library
 * Based on the Technical Specification
 */
export type RenderingMode = 'canvas' | 'svg' | 'dom';
export type Alignment = 'left' | 'center' | 'right' | 'justify';
export type FontStyle = 'normal' | 'italic' | 'oblique';
export type FontWeight = number | 'normal' | 'bold';
export type TextDecoration = 'none' | 'underline' | 'line-through';
export type BorderStyle = 'solid' | 'dashed' | 'dotted';
export type LayoutType = 'absolute' | 'grid' | 'flex';
export type FlexDirection = 'row' | 'column';
export type Theme = 'light' | 'dark' | 'custom';
export type AnimationType = 'fadeIn' | 'slide' | 'rotate';
export type PositionValue = number | string;
/**
 * Position interface for element placement
 */
export interface Position {
    x: PositionValue;
    y: PositionValue;
    width: PositionValue;
    height: PositionValue;
    alignment?: Alignment;
}
/**
 * Background configuration
 */
export interface Background {
    color?: string;
    image?: string;
    gradient?: string;
}
/**
 * Text formatting options
 */
export interface TextFormatting {
    fontSize: number | string;
    fontFamily: string;
    fontStyle?: FontStyle;
    fontWeight?: FontWeight;
    color: string;
    lineHeight?: number;
    letterSpacing?: number;
    textDecoration?: TextDecoration;
    shadow?: string;
    opacity?: number;
}
/**
 * Border styling options
 */
export interface BorderOptions {
    width: number;
    style: BorderStyle;
    color: string;
    radius?: number;
}
/**
 * Text block element
 */
export interface TextBlock {
    id?: string;
    content: string;
    position: Position;
    formatting: TextFormatting;
    zIndex?: number;
}
/**
 * Image element
 */
export interface ImageElement {
    id?: string;
    src: string;
    position: Position;
    zIndex?: number;
    altText?: string;
    filters?: string[];
    border?: BorderOptions;
}
/**
 * Layout configuration
 */
export interface LayoutOptions {
    type: LayoutType;
    columns?: number;
    rows?: number;
    direction?: FlexDirection;
    responsive?: boolean;
}
/**
 * Animation configuration
 */
export interface Animation {
    target: string;
    type: AnimationType;
    duration: number;
    delay?: number;
}
/**
 * Interactive element (for future extensibility)
 */
export interface InteractiveElement {
    id: string;
    type: 'button' | 'link' | 'input' | 'custom';
    position: Position;
    content?: string;
    zIndex?: number;
    onClick?: () => void;
    onHover?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
}
/**
 * Custom theme configuration
 */
export interface CustomTheme {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        accent: string;
    };
    fonts: {
        primary: string;
        secondary: string;
        heading: string;
    };
    spacing: {
        small: number;
        medium: number;
        large: number;
    };
}
/**
 * Global styles configuration
 */
export interface GlobalStyles {
    pageWidth: number;
    pageHeight: number;
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    theme: Theme | CustomTheme;
}
/**
 * Main Page interface
 */
export interface Page {
    id: string | number;
    background?: Background;
    textBlocks?: TextBlock[];
    images?: ImageElement[];
    layout?: LayoutOptions;
    animations?: Animation[];
    interactiveElements?: InteractiveElement[];
}
/**
 * PageVisualizer configuration options
 */
export interface PageVisualizerOptions {
    container: HTMLElement;
    mode?: RenderingMode;
    globalStyles?: Partial<GlobalStyles>;
    onError?: (error: Error) => void;
    onLoad?: () => void;
    onRender?: () => void;
}
/**
 * Rendering context for different renderers
 */
export interface RenderingContext {
    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    svg?: SVGElement;
    container?: HTMLElement;
    width: number;
    height: number;
    scale: number;
}
/**
 * Export options
 */
export interface ExportOptions {
    format: 'png' | 'jpeg' | 'pdf' | 'svg';
    quality?: number;
    filename?: string;
}
/**
 * Error types
 */
export declare class PageVisualizerError extends Error {
    code: string;
    details?: unknown | undefined;
    constructor(message: string, code: string, details?: unknown | undefined);
}
export declare class ValidationError extends PageVisualizerError {
    constructor(message: string, details?: unknown);
}
export declare class RenderingError extends PageVisualizerError {
    constructor(message: string, details?: unknown);
}
export declare class AssetLoadError extends PageVisualizerError {
    constructor(message: string, details?: unknown);
}
//# sourceMappingURL=index.d.ts.map