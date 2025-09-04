import { z } from 'zod';

/**
 * Core interfaces and types for PageVisualizer library
 * Based on the Technical Specification
 */
type RenderingMode = 'canvas' | 'svg' | 'dom';
type Alignment = 'left' | 'center' | 'right' | 'justify';
type FontStyle = 'normal' | 'italic' | 'oblique';
type FontWeight = number | 'normal' | 'bold';
type TextDecoration = 'none' | 'underline' | 'line-through';
type BorderStyle = 'solid' | 'dashed' | 'dotted';
type LayoutType = 'absolute' | 'grid' | 'flex';
type FlexDirection = 'row' | 'column';
type Theme = 'light' | 'dark' | 'custom';
type AnimationType = 'fadeIn' | 'slide' | 'rotate';
type PositionValue = number | string;
/**
 * Position interface for element placement
 */
interface Position {
    x: PositionValue;
    y: PositionValue;
    width: PositionValue;
    height: PositionValue;
    alignment?: Alignment;
}
/**
 * Background configuration
 */
interface Background {
    color?: string;
    image?: string;
    gradient?: string;
}
/**
 * Text formatting options
 */
interface TextFormatting {
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
interface BorderOptions {
    width: number;
    style: BorderStyle;
    color: string;
    radius?: number;
}
/**
 * Text block element
 */
interface TextBlock {
    id?: string;
    content: string;
    position: Position;
    formatting: TextFormatting;
    zIndex?: number;
}
/**
 * Image element
 */
interface ImageElement {
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
interface LayoutOptions {
    type: LayoutType;
    columns?: number;
    rows?: number;
    direction?: FlexDirection;
    responsive?: boolean;
}
/**
 * Animation configuration
 */
interface Animation {
    target: string;
    type: AnimationType;
    duration: number;
    delay?: number;
}
/**
 * Interactive element (for future extensibility)
 */
interface InteractiveElement {
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
interface CustomTheme {
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
interface GlobalStyles {
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
interface Page {
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
interface PageVisualizerOptions {
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
interface RenderingContext {
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
interface ExportOptions {
    format: 'png' | 'jpeg' | 'pdf' | 'svg';
    quality?: number;
    filename?: string;
}
/**
 * Error types
 */
declare class PageVisualizerError extends Error {
    code: string;
    details?: unknown | undefined;
    constructor(message: string, code: string, details?: unknown | undefined);
}
declare class ValidationError extends PageVisualizerError {
    constructor(message: string, details?: unknown);
}
declare class RenderingError extends PageVisualizerError {
    constructor(message: string, details?: unknown);
}
declare class AssetLoadError extends PageVisualizerError {
    constructor(message: string, details?: unknown);
}

declare const positionSchema: z.ZodObject<{
    x: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    y: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    width: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    height: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    alignment: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
}, "strip", z.ZodTypeAny, {
    x: string | number;
    y: string | number;
    width: string | number;
    height: string | number;
    alignment?: "left" | "center" | "right" | "justify" | undefined;
}, {
    x: string | number;
    y: string | number;
    width: string | number;
    height: string | number;
    alignment?: "left" | "center" | "right" | "justify" | undefined;
}>;
declare const backgroundSchema: z.ZodObject<{
    color: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    gradient: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    color?: string | undefined;
    image?: string | undefined;
    gradient?: string | undefined;
}, {
    color?: string | undefined;
    image?: string | undefined;
    gradient?: string | undefined;
}>;
declare const textBlockSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
    position: z.ZodObject<{
        x: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        y: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        width: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        height: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        alignment: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
    }, "strip", z.ZodTypeAny, {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    }, {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    }>;
    formatting: z.ZodObject<{
        fontSize: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        fontFamily: z.ZodString;
        fontStyle: z.ZodOptional<z.ZodEnum<["normal", "italic", "oblique"]>>;
        fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["normal", "bold"]>]>>;
        color: z.ZodString;
        lineHeight: z.ZodOptional<z.ZodNumber>;
        letterSpacing: z.ZodOptional<z.ZodNumber>;
        textDecoration: z.ZodOptional<z.ZodEnum<["none", "underline", "line-through"]>>;
        shadow: z.ZodOptional<z.ZodString>;
        opacity: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        color: string;
        fontSize: string | number;
        fontFamily: string;
        fontStyle?: "normal" | "italic" | "oblique" | undefined;
        fontWeight?: number | "normal" | "bold" | undefined;
        lineHeight?: number | undefined;
        letterSpacing?: number | undefined;
        textDecoration?: "none" | "underline" | "line-through" | undefined;
        shadow?: string | undefined;
        opacity?: number | undefined;
    }, {
        color: string;
        fontSize: string | number;
        fontFamily: string;
        fontStyle?: "normal" | "italic" | "oblique" | undefined;
        fontWeight?: number | "normal" | "bold" | undefined;
        lineHeight?: number | undefined;
        letterSpacing?: number | undefined;
        textDecoration?: "none" | "underline" | "line-through" | undefined;
        shadow?: string | undefined;
        opacity?: number | undefined;
    }>;
    zIndex: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    content: string;
    position: {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    };
    formatting: {
        color: string;
        fontSize: string | number;
        fontFamily: string;
        fontStyle?: "normal" | "italic" | "oblique" | undefined;
        fontWeight?: number | "normal" | "bold" | undefined;
        lineHeight?: number | undefined;
        letterSpacing?: number | undefined;
        textDecoration?: "none" | "underline" | "line-through" | undefined;
        shadow?: string | undefined;
        opacity?: number | undefined;
    };
    id?: string | undefined;
    zIndex?: number | undefined;
}, {
    content: string;
    position: {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    };
    formatting: {
        color: string;
        fontSize: string | number;
        fontFamily: string;
        fontStyle?: "normal" | "italic" | "oblique" | undefined;
        fontWeight?: number | "normal" | "bold" | undefined;
        lineHeight?: number | undefined;
        letterSpacing?: number | undefined;
        textDecoration?: "none" | "underline" | "line-through" | undefined;
        shadow?: string | undefined;
        opacity?: number | undefined;
    };
    id?: string | undefined;
    zIndex?: number | undefined;
}>;
declare const imageElementSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    src: z.ZodString;
    position: z.ZodObject<{
        x: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        y: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        width: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        height: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        alignment: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
    }, "strip", z.ZodTypeAny, {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    }, {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    }>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    altText: z.ZodOptional<z.ZodString>;
    filters: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    border: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        style: z.ZodEnum<["solid", "dashed", "dotted"]>;
        color: z.ZodString;
        radius: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        width: number;
        color: string;
        style: "solid" | "dashed" | "dotted";
        radius?: number | undefined;
    }, {
        width: number;
        color: string;
        style: "solid" | "dashed" | "dotted";
        radius?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    position: {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    };
    src: string;
    id?: string | undefined;
    zIndex?: number | undefined;
    altText?: string | undefined;
    filters?: string[] | undefined;
    border?: {
        width: number;
        color: string;
        style: "solid" | "dashed" | "dotted";
        radius?: number | undefined;
    } | undefined;
}, {
    position: {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    };
    src: string;
    id?: string | undefined;
    zIndex?: number | undefined;
    altText?: string | undefined;
    filters?: string[] | undefined;
    border?: {
        width: number;
        color: string;
        style: "solid" | "dashed" | "dotted";
        radius?: number | undefined;
    } | undefined;
}>;
declare const layoutOptionsSchema: z.ZodObject<{
    type: z.ZodEnum<["absolute", "grid", "flex"]>;
    columns: z.ZodOptional<z.ZodNumber>;
    rows: z.ZodOptional<z.ZodNumber>;
    direction: z.ZodOptional<z.ZodEnum<["row", "column"]>>;
    responsive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    type: "absolute" | "grid" | "flex";
    columns?: number | undefined;
    rows?: number | undefined;
    direction?: "row" | "column" | undefined;
    responsive?: boolean | undefined;
}, {
    type: "absolute" | "grid" | "flex";
    columns?: number | undefined;
    rows?: number | undefined;
    direction?: "row" | "column" | undefined;
    responsive?: boolean | undefined;
}>;
declare const animationSchema: z.ZodObject<{
    target: z.ZodString;
    type: z.ZodEnum<["fadeIn", "slide", "rotate"]>;
    duration: z.ZodNumber;
    delay: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "fadeIn" | "slide" | "rotate";
    target: string;
    duration: number;
    delay?: number | undefined;
}, {
    type: "fadeIn" | "slide" | "rotate";
    target: string;
    duration: number;
    delay?: number | undefined;
}>;
declare const interactiveElementSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["button", "link", "input", "custom"]>;
    position: z.ZodObject<{
        x: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        y: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        width: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        height: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        alignment: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
    }, "strip", z.ZodTypeAny, {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    }, {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    }>;
    content: z.ZodOptional<z.ZodString>;
    zIndex: z.ZodOptional<z.ZodNumber>;
    onClick: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    onHover: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    onFocus: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    onBlur: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type: "custom" | "button" | "link" | "input";
    id: string;
    position: {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    };
    content?: string | undefined;
    zIndex?: number | undefined;
    onClick?: ((...args: unknown[]) => unknown) | undefined;
    onHover?: ((...args: unknown[]) => unknown) | undefined;
    onFocus?: ((...args: unknown[]) => unknown) | undefined;
    onBlur?: ((...args: unknown[]) => unknown) | undefined;
}, {
    type: "custom" | "button" | "link" | "input";
    id: string;
    position: {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    };
    content?: string | undefined;
    zIndex?: number | undefined;
    onClick?: ((...args: unknown[]) => unknown) | undefined;
    onHover?: ((...args: unknown[]) => unknown) | undefined;
    onFocus?: ((...args: unknown[]) => unknown) | undefined;
    onBlur?: ((...args: unknown[]) => unknown) | undefined;
}>;
declare const customThemeSchema: z.ZodObject<{
    name: z.ZodString;
    colors: z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        background: z.ZodString;
        text: z.ZodString;
        accent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        accent: string;
    }, {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        accent: string;
    }>;
    fonts: z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        heading: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        heading: string;
    }, {
        primary: string;
        secondary: string;
        heading: string;
    }>;
    spacing: z.ZodObject<{
        small: z.ZodNumber;
        medium: z.ZodNumber;
        large: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        small: number;
        medium: number;
        large: number;
    }, {
        small: number;
        medium: number;
        large: number;
    }>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
declare const globalStylesSchema: z.ZodObject<{
    pageWidth: z.ZodNumber;
    pageHeight: z.ZodNumber;
    margin: z.ZodObject<{
        top: z.ZodNumber;
        right: z.ZodNumber;
        bottom: z.ZodNumber;
        left: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        left: number;
        right: number;
        top: number;
        bottom: number;
    }, {
        left: number;
        right: number;
        top: number;
        bottom: number;
    }>;
    theme: z.ZodUnion<[z.ZodEnum<["light", "dark"]>, z.ZodObject<{
        name: z.ZodString;
        colors: z.ZodObject<{
            primary: z.ZodString;
            secondary: z.ZodString;
            background: z.ZodString;
            text: z.ZodString;
            accent: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            primary: string;
            secondary: string;
            background: string;
            text: string;
            accent: string;
        }, {
            primary: string;
            secondary: string;
            background: string;
            text: string;
            accent: string;
        }>;
        fonts: z.ZodObject<{
            primary: z.ZodString;
            secondary: z.ZodString;
            heading: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            primary: string;
            secondary: string;
            heading: string;
        }, {
            primary: string;
            secondary: string;
            heading: string;
        }>;
        spacing: z.ZodObject<{
            small: z.ZodNumber;
            medium: z.ZodNumber;
            large: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            small: number;
            medium: number;
            large: number;
        }, {
            small: number;
            medium: number;
            large: number;
        }>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>]>;
}, "strip", z.ZodTypeAny, {
    pageWidth: number;
    pageHeight: number;
    margin: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    theme: "light" | "dark" | {
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
    };
}, {
    pageWidth: number;
    pageHeight: number;
    margin: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    theme: "light" | "dark" | {
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
    };
}>;
declare const pageSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    background: z.ZodOptional<z.ZodObject<{
        color: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        gradient: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        color?: string | undefined;
        image?: string | undefined;
        gradient?: string | undefined;
    }, {
        color?: string | undefined;
        image?: string | undefined;
        gradient?: string | undefined;
    }>>;
    textBlocks: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        content: z.ZodString;
        position: z.ZodObject<{
            x: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            y: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            width: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            height: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            alignment: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
        }, "strip", z.ZodTypeAny, {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        }, {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        }>;
        formatting: z.ZodObject<{
            fontSize: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            fontFamily: z.ZodString;
            fontStyle: z.ZodOptional<z.ZodEnum<["normal", "italic", "oblique"]>>;
            fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEnum<["normal", "bold"]>]>>;
            color: z.ZodString;
            lineHeight: z.ZodOptional<z.ZodNumber>;
            letterSpacing: z.ZodOptional<z.ZodNumber>;
            textDecoration: z.ZodOptional<z.ZodEnum<["none", "underline", "line-through"]>>;
            shadow: z.ZodOptional<z.ZodString>;
            opacity: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            color: string;
            fontSize: string | number;
            fontFamily: string;
            fontStyle?: "normal" | "italic" | "oblique" | undefined;
            fontWeight?: number | "normal" | "bold" | undefined;
            lineHeight?: number | undefined;
            letterSpacing?: number | undefined;
            textDecoration?: "none" | "underline" | "line-through" | undefined;
            shadow?: string | undefined;
            opacity?: number | undefined;
        }, {
            color: string;
            fontSize: string | number;
            fontFamily: string;
            fontStyle?: "normal" | "italic" | "oblique" | undefined;
            fontWeight?: number | "normal" | "bold" | undefined;
            lineHeight?: number | undefined;
            letterSpacing?: number | undefined;
            textDecoration?: "none" | "underline" | "line-through" | undefined;
            shadow?: string | undefined;
            opacity?: number | undefined;
        }>;
        zIndex: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        content: string;
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        formatting: {
            color: string;
            fontSize: string | number;
            fontFamily: string;
            fontStyle?: "normal" | "italic" | "oblique" | undefined;
            fontWeight?: number | "normal" | "bold" | undefined;
            lineHeight?: number | undefined;
            letterSpacing?: number | undefined;
            textDecoration?: "none" | "underline" | "line-through" | undefined;
            shadow?: string | undefined;
            opacity?: number | undefined;
        };
        id?: string | undefined;
        zIndex?: number | undefined;
    }, {
        content: string;
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        formatting: {
            color: string;
            fontSize: string | number;
            fontFamily: string;
            fontStyle?: "normal" | "italic" | "oblique" | undefined;
            fontWeight?: number | "normal" | "bold" | undefined;
            lineHeight?: number | undefined;
            letterSpacing?: number | undefined;
            textDecoration?: "none" | "underline" | "line-through" | undefined;
            shadow?: string | undefined;
            opacity?: number | undefined;
        };
        id?: string | undefined;
        zIndex?: number | undefined;
    }>, "many">>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        src: z.ZodString;
        position: z.ZodObject<{
            x: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            y: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            width: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            height: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            alignment: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
        }, "strip", z.ZodTypeAny, {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        }, {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        }>;
        zIndex: z.ZodOptional<z.ZodNumber>;
        altText: z.ZodOptional<z.ZodString>;
        filters: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        border: z.ZodOptional<z.ZodObject<{
            width: z.ZodNumber;
            style: z.ZodEnum<["solid", "dashed", "dotted"]>;
            color: z.ZodString;
            radius: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            width: number;
            color: string;
            style: "solid" | "dashed" | "dotted";
            radius?: number | undefined;
        }, {
            width: number;
            color: string;
            style: "solid" | "dashed" | "dotted";
            radius?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        src: string;
        id?: string | undefined;
        zIndex?: number | undefined;
        altText?: string | undefined;
        filters?: string[] | undefined;
        border?: {
            width: number;
            color: string;
            style: "solid" | "dashed" | "dotted";
            radius?: number | undefined;
        } | undefined;
    }, {
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        src: string;
        id?: string | undefined;
        zIndex?: number | undefined;
        altText?: string | undefined;
        filters?: string[] | undefined;
        border?: {
            width: number;
            color: string;
            style: "solid" | "dashed" | "dotted";
            radius?: number | undefined;
        } | undefined;
    }>, "many">>;
    layout: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["absolute", "grid", "flex"]>;
        columns: z.ZodOptional<z.ZodNumber>;
        rows: z.ZodOptional<z.ZodNumber>;
        direction: z.ZodOptional<z.ZodEnum<["row", "column"]>>;
        responsive: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "absolute" | "grid" | "flex";
        columns?: number | undefined;
        rows?: number | undefined;
        direction?: "row" | "column" | undefined;
        responsive?: boolean | undefined;
    }, {
        type: "absolute" | "grid" | "flex";
        columns?: number | undefined;
        rows?: number | undefined;
        direction?: "row" | "column" | undefined;
        responsive?: boolean | undefined;
    }>>;
    animations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        target: z.ZodString;
        type: z.ZodEnum<["fadeIn", "slide", "rotate"]>;
        duration: z.ZodNumber;
        delay: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "fadeIn" | "slide" | "rotate";
        target: string;
        duration: number;
        delay?: number | undefined;
    }, {
        type: "fadeIn" | "slide" | "rotate";
        target: string;
        duration: number;
        delay?: number | undefined;
    }>, "many">>;
    interactiveElements: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["button", "link", "input", "custom"]>;
        position: z.ZodObject<{
            x: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            y: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            width: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            height: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
            alignment: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
        }, "strip", z.ZodTypeAny, {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        }, {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        }>;
        content: z.ZodOptional<z.ZodString>;
        zIndex: z.ZodOptional<z.ZodNumber>;
        onClick: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
        onHover: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
        onFocus: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
        onBlur: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        type: "custom" | "button" | "link" | "input";
        id: string;
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        content?: string | undefined;
        zIndex?: number | undefined;
        onClick?: ((...args: unknown[]) => unknown) | undefined;
        onHover?: ((...args: unknown[]) => unknown) | undefined;
        onFocus?: ((...args: unknown[]) => unknown) | undefined;
        onBlur?: ((...args: unknown[]) => unknown) | undefined;
    }, {
        type: "custom" | "button" | "link" | "input";
        id: string;
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        content?: string | undefined;
        zIndex?: number | undefined;
        onClick?: ((...args: unknown[]) => unknown) | undefined;
        onHover?: ((...args: unknown[]) => unknown) | undefined;
        onFocus?: ((...args: unknown[]) => unknown) | undefined;
        onBlur?: ((...args: unknown[]) => unknown) | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    background?: {
        color?: string | undefined;
        image?: string | undefined;
        gradient?: string | undefined;
    } | undefined;
    textBlocks?: {
        content: string;
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        formatting: {
            color: string;
            fontSize: string | number;
            fontFamily: string;
            fontStyle?: "normal" | "italic" | "oblique" | undefined;
            fontWeight?: number | "normal" | "bold" | undefined;
            lineHeight?: number | undefined;
            letterSpacing?: number | undefined;
            textDecoration?: "none" | "underline" | "line-through" | undefined;
            shadow?: string | undefined;
            opacity?: number | undefined;
        };
        id?: string | undefined;
        zIndex?: number | undefined;
    }[] | undefined;
    images?: {
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        src: string;
        id?: string | undefined;
        zIndex?: number | undefined;
        altText?: string | undefined;
        filters?: string[] | undefined;
        border?: {
            width: number;
            color: string;
            style: "solid" | "dashed" | "dotted";
            radius?: number | undefined;
        } | undefined;
    }[] | undefined;
    layout?: {
        type: "absolute" | "grid" | "flex";
        columns?: number | undefined;
        rows?: number | undefined;
        direction?: "row" | "column" | undefined;
        responsive?: boolean | undefined;
    } | undefined;
    animations?: {
        type: "fadeIn" | "slide" | "rotate";
        target: string;
        duration: number;
        delay?: number | undefined;
    }[] | undefined;
    interactiveElements?: {
        type: "custom" | "button" | "link" | "input";
        id: string;
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        content?: string | undefined;
        zIndex?: number | undefined;
        onClick?: ((...args: unknown[]) => unknown) | undefined;
        onHover?: ((...args: unknown[]) => unknown) | undefined;
        onFocus?: ((...args: unknown[]) => unknown) | undefined;
        onBlur?: ((...args: unknown[]) => unknown) | undefined;
    }[] | undefined;
}, {
    id: string | number;
    background?: {
        color?: string | undefined;
        image?: string | undefined;
        gradient?: string | undefined;
    } | undefined;
    textBlocks?: {
        content: string;
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        formatting: {
            color: string;
            fontSize: string | number;
            fontFamily: string;
            fontStyle?: "normal" | "italic" | "oblique" | undefined;
            fontWeight?: number | "normal" | "bold" | undefined;
            lineHeight?: number | undefined;
            letterSpacing?: number | undefined;
            textDecoration?: "none" | "underline" | "line-through" | undefined;
            shadow?: string | undefined;
            opacity?: number | undefined;
        };
        id?: string | undefined;
        zIndex?: number | undefined;
    }[] | undefined;
    images?: {
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        src: string;
        id?: string | undefined;
        zIndex?: number | undefined;
        altText?: string | undefined;
        filters?: string[] | undefined;
        border?: {
            width: number;
            color: string;
            style: "solid" | "dashed" | "dotted";
            radius?: number | undefined;
        } | undefined;
    }[] | undefined;
    layout?: {
        type: "absolute" | "grid" | "flex";
        columns?: number | undefined;
        rows?: number | undefined;
        direction?: "row" | "column" | undefined;
        responsive?: boolean | undefined;
    } | undefined;
    animations?: {
        type: "fadeIn" | "slide" | "rotate";
        target: string;
        duration: number;
        delay?: number | undefined;
    }[] | undefined;
    interactiveElements?: {
        type: "custom" | "button" | "link" | "input";
        id: string;
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        content?: string | undefined;
        zIndex?: number | undefined;
        onClick?: ((...args: unknown[]) => unknown) | undefined;
        onHover?: ((...args: unknown[]) => unknown) | undefined;
        onFocus?: ((...args: unknown[]) => unknown) | undefined;
        onBlur?: ((...args: unknown[]) => unknown) | undefined;
    }[] | undefined;
}>;
declare const pageVisualizerOptionsSchema: z.ZodObject<{
    container: z.ZodType<HTMLElement, z.ZodTypeDef, HTMLElement>;
    mode: z.ZodOptional<z.ZodEnum<["canvas", "svg", "dom"]>>;
    globalStyles: z.ZodOptional<z.ZodObject<{
        pageWidth: z.ZodOptional<z.ZodNumber>;
        pageHeight: z.ZodOptional<z.ZodNumber>;
        margin: z.ZodOptional<z.ZodObject<{
            top: z.ZodNumber;
            right: z.ZodNumber;
            bottom: z.ZodNumber;
            left: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            left: number;
            right: number;
            top: number;
            bottom: number;
        }, {
            left: number;
            right: number;
            top: number;
            bottom: number;
        }>>;
        theme: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["light", "dark"]>, z.ZodObject<{
            name: z.ZodString;
            colors: z.ZodObject<{
                primary: z.ZodString;
                secondary: z.ZodString;
                background: z.ZodString;
                text: z.ZodString;
                accent: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                primary: string;
                secondary: string;
                background: string;
                text: string;
                accent: string;
            }, {
                primary: string;
                secondary: string;
                background: string;
                text: string;
                accent: string;
            }>;
            fonts: z.ZodObject<{
                primary: z.ZodString;
                secondary: z.ZodString;
                heading: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                primary: string;
                secondary: string;
                heading: string;
            }, {
                primary: string;
                secondary: string;
                heading: string;
            }>;
            spacing: z.ZodObject<{
                small: z.ZodNumber;
                medium: z.ZodNumber;
                large: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                small: number;
                medium: number;
                large: number;
            }, {
                small: number;
                medium: number;
                large: number;
            }>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
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
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        pageWidth?: number | undefined;
        pageHeight?: number | undefined;
        margin?: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | undefined;
        theme?: "light" | "dark" | {
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
        } | undefined;
    }, {
        pageWidth?: number | undefined;
        pageHeight?: number | undefined;
        margin?: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | undefined;
        theme?: "light" | "dark" | {
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
        } | undefined;
    }>>;
    onError: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    onLoad: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
    onRender: z.ZodOptional<z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    container: HTMLElement;
    mode?: "canvas" | "svg" | "dom" | undefined;
    globalStyles?: {
        pageWidth?: number | undefined;
        pageHeight?: number | undefined;
        margin?: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | undefined;
        theme?: "light" | "dark" | {
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
        } | undefined;
    } | undefined;
    onError?: ((...args: unknown[]) => unknown) | undefined;
    onLoad?: ((...args: unknown[]) => unknown) | undefined;
    onRender?: ((...args: unknown[]) => unknown) | undefined;
}, {
    container: HTMLElement;
    mode?: "canvas" | "svg" | "dom" | undefined;
    globalStyles?: {
        pageWidth?: number | undefined;
        pageHeight?: number | undefined;
        margin?: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | undefined;
        theme?: "light" | "dark" | {
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
        } | undefined;
    } | undefined;
    onError?: ((...args: unknown[]) => unknown) | undefined;
    onLoad?: ((...args: unknown[]) => unknown) | undefined;
    onRender?: ((...args: unknown[]) => unknown) | undefined;
}>;
declare const exportOptionsSchema: z.ZodObject<{
    format: z.ZodEnum<["png", "jpeg", "pdf", "svg"]>;
    quality: z.ZodOptional<z.ZodNumber>;
    filename: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    format: "svg" | "png" | "jpeg" | "pdf";
    quality?: number | undefined;
    filename?: string | undefined;
}, {
    format: "svg" | "png" | "jpeg" | "pdf";
    quality?: number | undefined;
    filename?: string | undefined;
}>;

/**
 * Validation utilities for PageVisualizer
 */
declare const validatePage: (data: unknown) => {
    id: string | number;
    background?: {
        color?: string | undefined;
        image?: string | undefined;
        gradient?: string | undefined;
    } | undefined;
    textBlocks?: {
        content: string;
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        formatting: {
            color: string;
            fontSize: string | number;
            fontFamily: string;
            fontStyle?: "normal" | "italic" | "oblique" | undefined;
            fontWeight?: number | "normal" | "bold" | undefined;
            lineHeight?: number | undefined;
            letterSpacing?: number | undefined;
            textDecoration?: "none" | "underline" | "line-through" | undefined;
            shadow?: string | undefined;
            opacity?: number | undefined;
        };
        id?: string | undefined;
        zIndex?: number | undefined;
    }[] | undefined;
    images?: {
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        src: string;
        id?: string | undefined;
        zIndex?: number | undefined;
        altText?: string | undefined;
        filters?: string[] | undefined;
        border?: {
            width: number;
            color: string;
            style: "solid" | "dashed" | "dotted";
            radius?: number | undefined;
        } | undefined;
    }[] | undefined;
    layout?: {
        type: "absolute" | "grid" | "flex";
        columns?: number | undefined;
        rows?: number | undefined;
        direction?: "row" | "column" | undefined;
        responsive?: boolean | undefined;
    } | undefined;
    animations?: {
        type: "fadeIn" | "slide" | "rotate";
        target: string;
        duration: number;
        delay?: number | undefined;
    }[] | undefined;
    interactiveElements?: {
        type: "custom" | "button" | "link" | "input";
        id: string;
        position: {
            x: string | number;
            y: string | number;
            width: string | number;
            height: string | number;
            alignment?: "left" | "center" | "right" | "justify" | undefined;
        };
        content?: string | undefined;
        zIndex?: number | undefined;
        onClick?: ((...args: unknown[]) => unknown) | undefined;
        onHover?: ((...args: unknown[]) => unknown) | undefined;
        onFocus?: ((...args: unknown[]) => unknown) | undefined;
        onBlur?: ((...args: unknown[]) => unknown) | undefined;
    }[] | undefined;
};
declare const validatePageVisualizerOptions: (data: unknown) => {
    container: HTMLElement;
    mode?: "canvas" | "svg" | "dom" | undefined;
    globalStyles?: {
        pageWidth?: number | undefined;
        pageHeight?: number | undefined;
        margin?: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | undefined;
        theme?: "light" | "dark" | {
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
        } | undefined;
    } | undefined;
    onError?: ((...args: unknown[]) => unknown) | undefined;
    onLoad?: ((...args: unknown[]) => unknown) | undefined;
    onRender?: ((...args: unknown[]) => unknown) | undefined;
};
declare const validateExportOptions: (data: unknown) => {
    format: "svg" | "png" | "jpeg" | "pdf";
    quality?: number | undefined;
    filename?: string | undefined;
};
declare const validatePosition: (data: unknown) => {
    x: string | number;
    y: string | number;
    width: string | number;
    height: string | number;
    alignment?: "left" | "center" | "right" | "justify" | undefined;
};
declare const validateBackground: (data: unknown) => {
    color?: string | undefined;
    image?: string | undefined;
    gradient?: string | undefined;
};
declare const validateTextBlock: (data: unknown) => {
    content: string;
    position: {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    };
    formatting: {
        color: string;
        fontSize: string | number;
        fontFamily: string;
        fontStyle?: "normal" | "italic" | "oblique" | undefined;
        fontWeight?: number | "normal" | "bold" | undefined;
        lineHeight?: number | undefined;
        letterSpacing?: number | undefined;
        textDecoration?: "none" | "underline" | "line-through" | undefined;
        shadow?: string | undefined;
        opacity?: number | undefined;
    };
    id?: string | undefined;
    zIndex?: number | undefined;
};
declare const validateImageElement: (data: unknown) => {
    position: {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    };
    src: string;
    id?: string | undefined;
    zIndex?: number | undefined;
    altText?: string | undefined;
    filters?: string[] | undefined;
    border?: {
        width: number;
        color: string;
        style: "solid" | "dashed" | "dotted";
        radius?: number | undefined;
    } | undefined;
};
declare const validateLayoutOptions: (data: unknown) => {
    type: "absolute" | "grid" | "flex";
    columns?: number | undefined;
    rows?: number | undefined;
    direction?: "row" | "column" | undefined;
    responsive?: boolean | undefined;
};
declare const validateAnimation: (data: unknown) => {
    type: "fadeIn" | "slide" | "rotate";
    target: string;
    duration: number;
    delay?: number | undefined;
};
declare const validateInteractiveElement: (data: unknown) => {
    type: "custom" | "button" | "link" | "input";
    id: string;
    position: {
        x: string | number;
        y: string | number;
        width: string | number;
        height: string | number;
        alignment?: "left" | "center" | "right" | "justify" | undefined;
    };
    content?: string | undefined;
    zIndex?: number | undefined;
    onClick?: ((...args: unknown[]) => unknown) | undefined;
    onHover?: ((...args: unknown[]) => unknown) | undefined;
    onFocus?: ((...args: unknown[]) => unknown) | undefined;
    onBlur?: ((...args: unknown[]) => unknown) | undefined;
};
declare const validateGlobalStyles: (data: unknown) => {
    pageWidth: number;
    pageHeight: number;
    margin: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    theme: "light" | "dark" | {
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
    };
};
declare const validateCustomTheme: (data: unknown) => {
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
};

/**
 * Canvas-based renderer for PageVisualizer
 * Provides high-performance rendering using HTML5 Canvas
 */

declare class CanvasRenderer {
    private context;
    private animationFrameId?;
    private loadedImages;
    constructor(context: RenderingContext);
    /**
     * Render a complete page
     */
    renderPage(page: Page): Promise<void>;
    /**
     * Render background
     */
    private renderBackground;
    /**
     * Render text block
     */
    private renderTextBlock;
    /**
     * Render image element
     */
    private renderImage;
    /**
     * Apply animations
     */
    private applyAnimations;
    /**
     * Load and cache image
     */
    private loadImage;
    /**
     * Parse position to absolute coordinates
     */
    private parsePosition;
    /**
     * Resize canvas
     */
    resize(width: number, height: number): void;
    /**
     * Clear canvas
     */
    clear(): void;
    /**
     * Get canvas data URL
     */
    getDataURL(format?: string, quality?: number): string;
    /**
     * Cleanup resources
     */
    destroy(): void;
}

/**
 * SVG-based renderer for PageVisualizer
 * Provides scalable vector graphics rendering
 */

declare class SVGRenderer {
    private context;
    private loadedImages;
    constructor(context: RenderingContext);
    /**
     * Render a complete page
     */
    renderPage(page: Page): Promise<void>;
    /**
     * Render background
     */
    private renderBackground;
    /**
     * Render text block
     */
    private renderTextBlock;
    /**
     * Render image element
     */
    private renderImage;
    /**
     * Apply animations
     */
    private applyAnimations;
    /**
     * Load image as data URL
     */
    private loadImageAsDataURL;
    /**
     * Parse position to absolute coordinates
     */
    private parsePosition;
    /**
     * Apply text formatting to SVG text element
     */
    private applyTextFormatting;
    /**
     * Wrap text to fit within width
     */
    private wrapText;
    /**
     * Create SVG filter
     */
    private createFilter;
    /**
     * Create shadow filter
     */
    private createShadowFilter;
    /**
     * Draw border
     */
    private drawBorder;
    /**
     * Resize SVG
     */
    resize(width: number, height: number): void;
    /**
     * Get SVG data URL
     */
    getDataURL(): string;
    /**
     * Clear SVG
     */
    clear(): void;
    /**
     * Cleanup resources
     */
    destroy(): void;
}

/**
 * Main PageVisualizer class
 * TypeScript library for rendering and visualizing pages of digital books, comics, manga, or interactive content
 */

declare class PageVisualizer$2 {
    private options;
    private context;
    private renderer;
    private currentPage;
    private resizeObserver?;
    private isDestroyed;
    constructor(options: PageVisualizerOptions);
    /**
     * Render a page
     */
    renderPage(page: Page): Promise<void>;
    /**
     * Export current page
     */
    exportPage(options: ExportOptions): Promise<string | Blob>;
    /**
     * Resize the visualizer
     */
    resize(width: number, height: number): void;
    /**
     * Clear the visualizer
     */
    clear(): void;
    /**
     * Get current page
     */
    getCurrentPage(): Page | null;
    /**
     * Get rendering context
     */
    getContext(): RenderingContext;
    /**
     * Update global styles
     */
    updateGlobalStyles(styles: Partial<GlobalStyles>): void;
    /**
     * Destroy the visualizer and cleanup resources
     */
    destroy(): void;
    /**
     * Create rendering context based on mode
     */
    private createRenderingContext;
    /**
     * Create appropriate renderer based on mode
     */
    private createRenderer;
    /**
     * Initialize container
     */
    private initializeContainer;
    /**
     * Update context for specific page
     */
    private updateContextForPage;
    /**
     * Set up resize handling
     */
    private setupResizeHandling;
}

/**
 * Utility functions for PageVisualizer
 */

/**
 * Parse position value to pixels
 */
declare const parsePositionValue: (value: PositionValue, containerSize: number) => number;
/**
 * Convert position to absolute coordinates
 */
declare const positionToAbsolute: (position: Position, containerWidth: number, containerHeight: number) => {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * Sanitize HTML content to prevent XSS
 */
declare const sanitizeHtml: (html: string) => string;
/**
 * Load image and return promise
 */
declare const loadImage: (src: string) => Promise<HTMLImageElement>;
/**
 * Create canvas element with proper settings
 */
declare const createCanvas: (width: number, height: number) => HTMLCanvasElement;
/**
 * Create SVG element with proper settings
 */
declare const createSVG: (width: number, height: number) => SVGElement;
/**
 * Apply text formatting to canvas context
 */
declare const applyTextFormatting: (ctx: CanvasRenderingContext2D, formatting: {
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
declare const drawText: (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, width: number, alignment?: string) => void;
/**
 * Draw border on canvas
 */
declare const drawBorder: (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, border: {
    width: number;
    style: string;
    color: string;
    radius?: number;
}) => void;
/**
 * Apply image filters
 */
declare const applyImageFilters: (ctx: CanvasRenderingContext2D, filters: string[]) => void;
/**
 * Calculate text metrics
 */
declare const getTextMetrics: (ctx: CanvasRenderingContext2D, text: string, maxWidth?: number) => {
    width: number;
    height: number;
    lines: string[];
};
/**
 * Debounce function for performance optimization
 */
declare const debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => ((...args: Parameters<T>) => void);
/**
 * Throttle function for performance optimization
 */
declare const throttle: <T extends (...args: any[]) => any>(func: T, limit: number) => ((...args: Parameters<T>) => void);
/**
 * Check if element is in viewport
 */
declare const isInViewport: (element: HTMLElement) => boolean;
/**
 * Generate unique ID
 */
declare const generateId: () => string;
/**
 * Deep clone object
 */
declare const deepClone: <T>(obj: T) => T;

/**
 * PageVisualizer - TypeScript Library for Digital Page Rendering
 *
 * A modular, importable TypeScript library for rendering and visualizing pages of
 * digital books, comics, manga, or interactive content using HTML5 Canvas, SVG, or DOM.
 */
var PageVisualizer$1 = PageVisualizer;
//# sourceMappingURL=index.d.ts.map

export { AssetLoadError, CanvasRenderer, PageVisualizer$2 as PageVisualizer, PageVisualizerError, RenderingError, SVGRenderer, ValidationError, animationSchema, applyImageFilters, applyTextFormatting, backgroundSchema, createCanvas, createSVG, customThemeSchema, debounce, deepClone, PageVisualizer$1 as default, drawBorder, drawText, exportOptionsSchema, generateId, getTextMetrics, globalStylesSchema, imageElementSchema, interactiveElementSchema, isInViewport, layoutOptionsSchema, loadImage, pageSchema, pageVisualizerOptionsSchema, parsePositionValue, positionSchema, positionToAbsolute, sanitizeHtml, textBlockSchema, throttle, validateAnimation, validateBackground, validateCustomTheme, validateExportOptions, validateGlobalStyles, validateImageElement, validateInteractiveElement, validateLayoutOptions, validatePage, validatePageVisualizerOptions, validatePosition, validateTextBlock };
export type { Alignment, Animation, AnimationType, Background, BorderOptions, BorderStyle, CustomTheme, ExportOptions, FlexDirection, FontStyle, FontWeight, GlobalStyles, ImageElement, InteractiveElement, LayoutOptions, LayoutType, Page, PageVisualizerOptions, Position, PositionValue, RenderingContext, RenderingMode, TextBlock, TextDecoration, TextFormatting, Theme };
