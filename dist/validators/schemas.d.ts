import { z } from 'zod';
export declare const positionSchema: z.ZodObject<{
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
export declare const backgroundSchema: z.ZodObject<{
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
export declare const textFormattingSchema: z.ZodObject<{
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
export declare const borderOptionsSchema: z.ZodObject<{
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
}>;
export declare const textBlockSchema: z.ZodObject<{
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
export declare const imageElementSchema: z.ZodObject<{
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
export declare const layoutOptionsSchema: z.ZodObject<{
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
export declare const animationSchema: z.ZodObject<{
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
export declare const interactiveElementSchema: z.ZodObject<{
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
export declare const customThemeSchema: z.ZodObject<{
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
export declare const globalStylesSchema: z.ZodObject<{
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
export declare const pageSchema: z.ZodObject<{
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
export declare const pageVisualizerOptionsSchema: z.ZodObject<{
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
export declare const exportOptionsSchema: z.ZodObject<{
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
//# sourceMappingURL=schemas.d.ts.map