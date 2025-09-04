/**
 * Canvas-based renderer for PageVisualizer
 * Provides high-performance rendering using HTML5 Canvas
 */

import {
  Page,
  Background,
  TextBlock,
  ImageElement,
  RenderingContext,
  Position,
  TextFormatting,
  BorderOptions,
  Animation,
} from '../types';
import {
  parsePositionValue,
  loadImage,
  createCanvas,
  applyTextFormatting,
  drawText,
  drawBorder,
  applyImageFilters,
  getTextMetrics,
} from '../utils';

export class CanvasRenderer {
  private context: RenderingContext;
  private animationFrameId?: number;
  private loadedImages: Map<string, HTMLImageElement> = new Map();

  constructor(context: RenderingContext) {
    this.context = context;
  }

  /**
   * Render a complete page
   */
  public async renderPage(page: Page): Promise<void> {
    if (!this.context.canvas || !this.context.ctx) {
      throw new Error('Canvas context not available');
    }

    const { ctx, width, height } = this.context;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    try {
      // Render background
      if (page.background) {
        await this.renderBackground(page.background, width, height);
      }

      // Render images first (lower z-index)
      if (page.images) {
        const sortedImages = [...page.images].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
        for (const image of sortedImages) {
          await this.renderImage(image, width, height);
        }
      }

      // Render text blocks
      if (page.textBlocks) {
        const sortedTextBlocks = [...page.textBlocks].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
        for (const textBlock of sortedTextBlocks) {
          this.renderTextBlock(textBlock, width, height);
        }
      }

      // Apply animations
      if (page.animations) {
        this.applyAnimations(page.animations);
      }

    } catch (error) {
      console.error('Error rendering page:', error);
      throw error;
    }
  }

  /**
   * Render background
   */
  private async renderBackground(background: Background, width: number, height: number): Promise<void> {
    if (!this.context.ctx) return;

    const { ctx } = this.context;

    if (background.color) {
      ctx.fillStyle = background.color;
      ctx.fillRect(0, 0, width, height);
    }

    if (background.gradient) {
      // Parse gradient string (e.g., "linear-gradient(45deg, #ff0000, #0000ff)")
      const gradientMatch = background.gradient.match(/linear-gradient\((\d+)deg,\s*([^,]+),\s*([^)]+)\)/);
      if (gradientMatch) {
        const [, angle, color1, color2] = gradientMatch;
        const radians = (parseFloat(angle) * Math.PI) / 180;
        
        const gradient = ctx.createLinearGradient(
          Math.cos(radians) * width,
          Math.sin(radians) * height,
          Math.cos(radians + Math.PI) * width,
          Math.sin(radians + Math.PI) * height
        );
        
        gradient.addColorStop(0, color1.trim());
        gradient.addColorStop(1, color2.trim());
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    }

    if (background.image) {
      try {
        const img = await this.loadImage(background.image);
        ctx.drawImage(img, 0, 0, width, height);
      } catch (error) {
        console.warn('Failed to load background image:', error);
      }
    }
  }

  /**
   * Render text block
   */
  private renderTextBlock(textBlock: TextBlock, containerWidth: number, containerHeight: number): void {
    if (!this.context.ctx) return;

    const { ctx } = this.context;
    const { x, y, width, height } = this.parsePosition(textBlock.position, containerWidth, containerHeight);

    // Apply text formatting
    applyTextFormatting(ctx, textBlock.formatting);

    // Handle text alignment
    const alignment = textBlock.position.alignment || 'left';
    
    // Calculate text position based on alignment
    let textX = x;
    if (alignment === 'center') {
      textX = x + width / 2;
    } else if (alignment === 'right') {
      textX = x + width;
    }

    // Draw text with word wrapping
    const metrics = getTextMetrics(ctx, textBlock.content, width);
    const lineHeight = parsePositionValue(textBlock.formatting.lineHeight || textBlock.formatting.fontSize, 16);
    
    let currentY = y;
    for (const line of metrics.lines) {
      drawText(ctx, line, textX, currentY, width, alignment);
      currentY += lineHeight;
    }

    // Draw border if specified
    if (textBlock.formatting.textDecoration === 'underline') {
      ctx.beginPath();
      ctx.moveTo(x, currentY - 2);
      ctx.lineTo(x + width, currentY - 2);
      ctx.stroke();
    }
  }

  /**
   * Render image element
   */
  private async renderImage(image: ImageElement, containerWidth: number, containerHeight: number): Promise<void> {
    if (!this.context.ctx) return;

    const { ctx } = this.context;
    const { x, y, width, height } = this.parsePosition(image.position, containerWidth, containerHeight);

    try {
      const img = await this.loadImage(image.src);
      
      // Apply filters if specified
      if (image.filters && image.filters.length > 0) {
        applyImageFilters(ctx, image.filters);
      }

      // Draw image
      ctx.drawImage(img, x, y, width, height);

      // Draw border if specified
      if (image.border) {
        drawBorder(ctx, x, y, width, height, image.border);
      }

    } catch (error) {
      console.warn('Failed to load image:', image.src, error);
      
      // Draw placeholder
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(x, y, width, height);
      
      ctx.fillStyle = '#666';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Image not found', x + width / 2, y + height / 2);
    }
  }

  /**
   * Apply animations
   */
  private applyAnimations(animations: Animation[]): void {
    // Simple animation implementation
    // In a full implementation, this would use requestAnimationFrame
    // and manage animation states
    
    for (const animation of animations) {
      const element = document.getElementById(animation.target);
      if (element) {
        element.style.transition = `all ${animation.duration}ms ease`;
        element.style.opacity = '0';
        
        setTimeout(() => {
          element.style.opacity = '1';
        }, animation.delay || 0);
      }
    }
  }

  /**
   * Load and cache image
   */
  private async loadImage(src: string): Promise<HTMLImageElement> {
    if (this.loadedImages.has(src)) {
      return this.loadedImages.get(src)!;
    }

    const img = await loadImage(src);
    this.loadedImages.set(src, img);
    return img;
  }

  /**
   * Parse position to absolute coordinates
   */
  private parsePosition(position: Position, containerWidth: number, containerHeight: number) {
    return {
      x: parsePositionValue(position.x, containerWidth),
      y: parsePositionValue(position.y, containerHeight),
      width: parsePositionValue(position.width, containerWidth),
      height: parsePositionValue(position.height, containerHeight),
    };
  }

  /**
   * Resize canvas
   */
  public resize(width: number, height: number): void {
    if (!this.context.canvas) return;

    this.context.canvas.width = width;
    this.context.canvas.height = height;
    this.context.width = width;
    this.context.height = height;
  }

  /**
   * Clear canvas
   */
  public clear(): void {
    if (!this.context.ctx) return;

    const { ctx, width, height } = this.context;
    ctx.clearRect(0, 0, width, height);
  }

  /**
   * Get canvas data URL
   */
  public getDataURL(format: string = 'image/png', quality?: number): string {
    if (!this.context.canvas) {
      throw new Error('Canvas not available');
    }

    if (format === 'image/jpeg' && quality) {
      return this.context.canvas.toDataURL(format, quality);
    }

    return this.context.canvas.toDataURL(format);
  }

  /**
   * Cleanup resources
   */
  public destroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.loadedImages.clear();
  }
}
