/**
 * Canvas-based renderer for PageVisualizer
 * Provides high-performance rendering using HTML5 Canvas
 */
import { Page, RenderingContext } from '../types';
export declare class CanvasRenderer {
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
//# sourceMappingURL=CanvasRenderer.d.ts.map