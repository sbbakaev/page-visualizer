/**
 * SVG-based renderer for PageVisualizer
 * Provides scalable vector graphics rendering
 */
import { Page, RenderingContext } from '../types';
export declare class SVGRenderer {
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
//# sourceMappingURL=SVGRenderer.d.ts.map