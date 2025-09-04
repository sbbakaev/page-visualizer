/**
 * Validation utilities for PageVisualizer
 */
export declare const validatePage: (data: unknown) => {
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
export declare const validatePageVisualizerOptions: (data: unknown) => {
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
export declare const validateExportOptions: (data: unknown) => {
    format: "svg" | "png" | "jpeg" | "pdf";
    quality?: number | undefined;
    filename?: string | undefined;
};
export declare const validatePosition: (data: unknown) => {
    x: string | number;
    y: string | number;
    width: string | number;
    height: string | number;
    alignment?: "left" | "center" | "right" | "justify" | undefined;
};
export declare const validateBackground: (data: unknown) => {
    color?: string | undefined;
    image?: string | undefined;
    gradient?: string | undefined;
};
export declare const validateTextBlock: (data: unknown) => {
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
export declare const validateImageElement: (data: unknown) => {
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
export declare const validateLayoutOptions: (data: unknown) => {
    type: "absolute" | "grid" | "flex";
    columns?: number | undefined;
    rows?: number | undefined;
    direction?: "row" | "column" | undefined;
    responsive?: boolean | undefined;
};
export declare const validateAnimation: (data: unknown) => {
    type: "fadeIn" | "slide" | "rotate";
    target: string;
    duration: number;
    delay?: number | undefined;
};
export declare const validateInteractiveElement: (data: unknown) => {
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
export declare const validateGlobalStyles: (data: unknown) => {
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
export declare const validateCustomTheme: (data: unknown) => {
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
export { pageSchema, pageVisualizerOptionsSchema, exportOptionsSchema, positionSchema, backgroundSchema, textBlockSchema, imageElementSchema, layoutOptionsSchema, animationSchema, interactiveElementSchema, globalStylesSchema, customThemeSchema, } from './schemas';
//# sourceMappingURL=index.d.ts.map