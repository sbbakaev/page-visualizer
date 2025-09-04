/**
 * Main PageVisualizer class
 * TypeScript library for rendering and visualizing pages of digital books, comics, manga, or interactive content
 */

import {
  Page,
  PageVisualizerOptions,
  RenderingMode,
  RenderingContext,
  GlobalStyles,
  ExportOptions,
  PageVisualizerError,
  RenderingError,
  AssetLoadError,
} from './types';
import { validatePage, validatePageVisualizerOptions, validateExportOptions } from './validators';
import { CanvasRenderer } from './renderers/CanvasRenderer';
import { SVGRenderer } from './renderers/SVGRenderer';
import { createCanvas, createSVG, debounce, generateId } from './utils';

export class PageVisualizer {
  private options: Required<PageVisualizerOptions>;
  private context: RenderingContext;
  private renderer: CanvasRenderer | SVGRenderer;
  private currentPage: Page | null = null;
  private resizeObserver?: ResizeObserver;
  private isDestroyed = false;

  constructor(options: PageVisualizerOptions) {
    // Validate options
    this.options = validatePageVisualizerOptions(options) as Required<PageVisualizerOptions>;
    
    // Set default global styles
    const defaultGlobalStyles: GlobalStyles = {
      pageWidth: 800,
      pageHeight: 600,
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
      theme: 'light',
      ...this.options.globalStyles,
    };

    // Initialize rendering context
    this.context = this.createRenderingContext(defaultGlobalStyles);
    
    // Initialize renderer
    this.renderer = this.createRenderer();
    
    // Set up resize handling
    this.setupResizeHandling();
    
    // Initialize container
    this.initializeContainer();
  }

  /**
   * Render a page
   */
  public async renderPage(page: Page): Promise<void> {
    if (this.isDestroyed) {
      throw new PageVisualizerError('PageVisualizer has been destroyed', 'DESTROYED');
    }

    try {
      // Validate page data
      const validatedPage = validatePage(page);
      this.currentPage = validatedPage;

      // Update context with page dimensions
      this.updateContextForPage(validatedPage);

      // Render the page
      await this.renderer.renderPage(validatedPage);

      // Trigger render callback
      this.options.onRender?.();

    } catch (error) {
      const renderingError = new RenderingError(
        `Failed to render page: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      );
      this.options.onError?.(renderingError);
      throw renderingError;
    }
  }

  /**
   * Export current page
   */
  public async exportPage(options: ExportOptions): Promise<string | Blob> {
    if (this.isDestroyed) {
      throw new PageVisualizerError('PageVisualizer has been destroyed', 'DESTROYED');
    }

    if (!this.currentPage) {
      throw new PageVisualizerError('No page to export', 'NO_PAGE');
    }

    try {
      const validatedOptions = validateExportOptions(options);
      
      if (this.options.mode === 'canvas' && this.renderer instanceof CanvasRenderer) {
        return this.renderer.getDataURL(validatedOptions.format, validatedOptions.quality);
      } else if (this.options.mode === 'svg' && this.renderer instanceof SVGRenderer) {
        return this.renderer.getDataURL();
      } else {
        throw new PageVisualizerError('Export not supported for current rendering mode', 'UNSUPPORTED_EXPORT');
      }
    } catch (error) {
      const exportError = new PageVisualizerError(
        `Failed to export page: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'EXPORT_ERROR',
        error
      );
      this.options.onError?.(exportError);
      throw exportError;
    }
  }

  /**
   * Resize the visualizer
   */
  public resize(width: number, height: number): void {
    if (this.isDestroyed) {
      throw new PageVisualizerError('PageVisualizer has been destroyed', 'DESTROYED');
    }

    this.context.width = width;
    this.context.height = height;
    this.context.scale = Math.min(width / this.options.globalStyles!.pageWidth, height / this.options.globalStyles!.pageHeight);

    this.renderer.resize(width, height);

    // Re-render current page if exists
    if (this.currentPage) {
      this.renderPage(this.currentPage).catch(error => {
        this.options.onError?.(error);
      });
    }
  }

  /**
   * Clear the visualizer
   */
  public clear(): void {
    if (this.isDestroyed) return;

    this.renderer.clear();
    this.currentPage = null;
  }

  /**
   * Get current page
   */
  public getCurrentPage(): Page | null {
    return this.currentPage;
  }

  /**
   * Get rendering context
   */
  public getContext(): RenderingContext {
    return { ...this.context };
  }

  /**
   * Update global styles
   */
  public updateGlobalStyles(styles: Partial<GlobalStyles>): void {
    if (this.isDestroyed) return;

    this.options.globalStyles = { ...this.options.globalStyles, ...styles };
    
    // Update context
    this.context.width = this.options.globalStyles.pageWidth;
    this.context.height = this.options.globalStyles.pageHeight;
    
    // Re-render if page exists
    if (this.currentPage) {
      this.renderPage(this.currentPage).catch(error => {
        this.options.onError?.(error);
      });
    }
  }

  /**
   * Destroy the visualizer and cleanup resources
   */
  public destroy(): void {
    if (this.isDestroyed) return;

    this.isDestroyed = true;
    
    // Cleanup renderer
    this.renderer.destroy();
    
    // Cleanup resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    
    // Clear container
    if (this.options.container) {
      this.options.container.innerHTML = '';
    }
    
    // Clear references
    this.currentPage = null;
    this.context = null as any;
    this.renderer = null as any;
  }

  /**
   * Create rendering context based on mode
   */
  private createRenderingContext(globalStyles: GlobalStyles): RenderingContext {
    const { pageWidth, pageHeight } = globalStyles;
    
    const context: RenderingContext = {
      width: pageWidth,
      height: pageHeight,
      scale: 1,
    };

    switch (this.options.mode) {
      case 'canvas':
        const canvas = createCanvas(pageWidth, pageHeight);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new PageVisualizerError('Failed to get 2D context from canvas', 'CANVAS_ERROR');
        }
        context.canvas = canvas;
        context.ctx = ctx;
        break;
        
      case 'svg':
        const svg = createSVG(pageWidth, pageHeight);
        context.svg = svg;
        break;
        
      case 'dom':
        // DOM mode would create HTML elements
        // This is a placeholder for future implementation
        context.container = this.options.container;
        break;
        
      default:
        throw new PageVisualizerError(`Unsupported rendering mode: ${this.options.mode}`, 'UNSUPPORTED_MODE');
    }

    return context;
  }

  /**
   * Create appropriate renderer based on mode
   */
  private createRenderer(): CanvasRenderer | SVGRenderer {
    switch (this.options.mode) {
      case 'canvas':
        return new CanvasRenderer(this.context);
      case 'svg':
        return new SVGRenderer(this.context);
      case 'dom':
        throw new PageVisualizerError('DOM renderer not yet implemented', 'NOT_IMPLEMENTED');
      default:
        throw new PageVisualizerError(`Unsupported rendering mode: ${this.options.mode}`, 'UNSUPPORTED_MODE');
    }
  }

  /**
   * Initialize container
   */
  private initializeContainer(): void {
    const { container } = this.options;
    
    // Clear container
    container.innerHTML = '';
    
    // Add the rendering element
    if (this.context.canvas) {
      container.appendChild(this.context.canvas);
    } else if (this.context.svg) {
      container.appendChild(this.context.svg);
    }
    
    // Set container styles
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    
    // Trigger load callback
    this.options.onLoad?.();
  }

  /**
   * Update context for specific page
   */
  private updateContextForPage(page: Page): void {
    // This could be extended to calculate optimal dimensions based on page content
    // For now, we use the global styles
  }

  /**
   * Set up resize handling
   */
  private setupResizeHandling(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(
        debounce((entries) => {
          for (const entry of entries) {
            const { width, height } = entry.contentRect;
            this.resize(width, height);
          }
        }, 100)
      );
      
      this.resizeObserver.observe(this.options.container);
    } else {
      // Fallback for browsers without ResizeObserver
      const handleResize = debounce(() => {
        const rect = this.options.container.getBoundingClientRect();
        this.resize(rect.width, rect.height);
      }, 100);
      
      window.addEventListener('resize', handleResize);
    }
  }
}

// Export the main class and types
export * from './types';
export * from './validators';
export { CanvasRenderer } from './renderers/CanvasRenderer';
export { SVGRenderer } from './renderers/SVGRenderer';
