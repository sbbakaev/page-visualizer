/**
 * Main PageVisualizer class
 * TypeScript library for rendering and visualizing pages of digital books, comics, manga, or interactive content
 */
import { Page, PageVisualizerOptions, RenderingContext, GlobalStyles, ExportOptions } from './types';
export declare class PageVisualizer {
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
export * from './types';
export * from './validators';
export { CanvasRenderer } from './renderers/CanvasRenderer';
export { SVGRenderer } from './renderers/SVGRenderer';
//# sourceMappingURL=PageVisualizer.d.ts.map