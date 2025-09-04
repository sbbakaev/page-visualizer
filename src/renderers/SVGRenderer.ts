/**
 * SVG-based renderer for PageVisualizer
 * Provides scalable vector graphics rendering
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
  createSVG,
  sanitizeHtml,
} from '../utils';

export class SVGRenderer {
  private context: RenderingContext;
  private loadedImages: Map<string, string> = new Map();

  constructor(context: RenderingContext) {
    this.context = context;
  }

  /**
   * Render a complete page
   */
  public async renderPage(page: Page): Promise<void> {
    if (!this.context.svg) {
      throw new Error('SVG context not available');
    }

    const { svg, width, height } = this.context;
    
    // Clear SVG
    svg.innerHTML = '';

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
    if (!this.context.svg) return;

    const { svg } = this.context;

    if (background.color) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', '0');
      rect.setAttribute('y', '0');
      rect.setAttribute('width', width.toString());
      rect.setAttribute('height', height.toString());
      rect.setAttribute('fill', background.color);
      svg.appendChild(rect);
    }

    if (background.gradient) {
      const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
      const gradientMatch = background.gradient.match(/linear-gradient\((\d+)deg,\s*([^,]+),\s*([^)]+)\)/);
      
      if (gradientMatch) {
        const [, angle, color1, color2] = gradientMatch;
        
        // Create gradient definition
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', gradientId);
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');
        gradient.setAttribute('gradientTransform', `rotate(${angle})`);
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', color1.trim());
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', color2.trim());
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);

        // Create rectangle with gradient
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '0');
        rect.setAttribute('y', '0');
        rect.setAttribute('width', width.toString());
        rect.setAttribute('height', height.toString());
        rect.setAttribute('fill', `url(#${gradientId})`);
        svg.appendChild(rect);
      }
    }

    if (background.image) {
      try {
        const imageDataUrl = await this.loadImageAsDataURL(background.image);
        const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        image.setAttribute('x', '0');
        image.setAttribute('y', '0');
        image.setAttribute('width', width.toString());
        image.setAttribute('height', height.toString());
        image.setAttribute('href', imageDataUrl);
        image.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        svg.appendChild(image);
      } catch (error) {
        console.warn('Failed to load background image:', error);
      }
    }
  }

  /**
   * Render text block
   */
  private renderTextBlock(textBlock: TextBlock, containerWidth: number, containerHeight: number): void {
    if (!this.context.svg) return;

    const { svg } = this.context;
    const { x, y, width, height } = this.parsePosition(textBlock.position, containerWidth, containerHeight);

    // Create text element
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x.toString());
    text.setAttribute('y', (y + parsePositionValue(textBlock.formatting.fontSize, 16)).toString());
    text.setAttribute('width', width.toString());
    text.setAttribute('height', height.toString());
    
    // Apply text formatting
    this.applyTextFormatting(text, textBlock.formatting);
    
    // Handle text alignment
    const alignment = textBlock.position.alignment || 'left';
    if (alignment === 'center') {
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('x', (x + width / 2).toString());
    } else if (alignment === 'right') {
      text.setAttribute('text-anchor', 'end');
      text.setAttribute('x', (x + width).toString());
    }

    // Handle text wrapping
    const lines = this.wrapText(textBlock.content, textBlock.formatting, width);
    
    if (lines.length === 1) {
      text.textContent = sanitizeHtml(lines[0]);
      svg.appendChild(text);
    } else {
      // Create tspan elements for multi-line text
      const lineHeight = parsePositionValue(textBlock.formatting.lineHeight || textBlock.formatting.fontSize, 16);
      
      for (let i = 0; i < lines.length; i++) {
        const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.setAttribute('x', text.getAttribute('x') || '0');
        tspan.setAttribute('dy', i === 0 ? '0' : lineHeight.toString());
        tspan.textContent = sanitizeHtml(lines[i]);
        text.appendChild(tspan);
      }
      
      svg.appendChild(text);
    }

    // Add text decoration
    if (textBlock.formatting.textDecoration === 'underline') {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x.toString());
      line.setAttribute('y1', (y + height - 2).toString());
      line.setAttribute('x2', (x + width).toString());
      line.setAttribute('y2', (y + height - 2).toString());
      line.setAttribute('stroke', textBlock.formatting.color);
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);
    }
  }

  /**
   * Render image element
   */
  private async renderImage(image: ImageElement, containerWidth: number, containerHeight: number): Promise<void> {
    if (!this.context.svg) return;

    const { svg } = this.context;
    const { x, y, width, height } = this.parsePosition(image.position, containerWidth, containerHeight);

    try {
      const imageDataUrl = await this.loadImageAsDataURL(image.src);
      const imageElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      
      imageElement.setAttribute('x', x.toString());
      imageElement.setAttribute('y', y.toString());
      imageElement.setAttribute('width', width.toString());
      imageElement.setAttribute('height', height.toString());
      imageElement.setAttribute('href', imageDataUrl);
      imageElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      
      if (image.altText) {
        imageElement.setAttribute('alt', image.altText);
      }

      // Apply filters if specified
      if (image.filters && image.filters.length > 0) {
        const filterId = `filter-${Math.random().toString(36).substr(2, 9)}`;
        this.createFilter(filterId, image.filters);
        imageElement.setAttribute('filter', `url(#${filterId})`);
      }

      svg.appendChild(imageElement);

      // Draw border if specified
      if (image.border) {
        this.drawBorder(x, y, width, height, image.border);
      }

    } catch (error) {
      console.warn('Failed to load image:', image.src, error);
      
      // Draw placeholder
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x.toString());
      rect.setAttribute('y', y.toString());
      rect.setAttribute('width', width.toString());
      rect.setAttribute('height', height.toString());
      rect.setAttribute('fill', '#f0f0f0');
      rect.setAttribute('stroke', '#ccc');
      rect.setAttribute('stroke-width', '1');
      svg.appendChild(rect);
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', (x + width / 2).toString());
      text.setAttribute('y', (y + height / 2).toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', '#666');
      text.setAttribute('font-family', 'Arial');
      text.setAttribute('font-size', '14');
      text.textContent = 'Image not found';
      svg.appendChild(text);
    }
  }

  /**
   * Apply animations
   */
  private applyAnimations(animations: Animation[]): void {
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
   * Load image as data URL
   */
  private async loadImageAsDataURL(src: string): Promise<string> {
    if (this.loadedImages.has(src)) {
      return this.loadedImages.get(src)!;
    }

    const img = await loadImage(src);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    const dataURL = canvas.toDataURL('image/png');
    this.loadedImages.set(src, dataURL);
    return dataURL;
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
   * Apply text formatting to SVG text element
   */
  private applyTextFormatting(textElement: SVGTextElement, formatting: TextFormatting): void {
    const fontSize = typeof formatting.fontSize === 'number' 
      ? formatting.fontSize 
      : parsePositionValue(formatting.fontSize, 16);

    textElement.setAttribute('font-family', formatting.fontFamily);
    textElement.setAttribute('font-size', fontSize.toString());
    textElement.setAttribute('fill', formatting.color);
    
    if (formatting.fontStyle) {
      textElement.setAttribute('font-style', formatting.fontStyle);
    }
    
    if (formatting.fontWeight) {
      textElement.setAttribute('font-weight', formatting.fontWeight.toString());
    }
    
    if (formatting.letterSpacing) {
      textElement.setAttribute('letter-spacing', formatting.letterSpacing.toString());
    }
    
    if (formatting.opacity) {
      textElement.setAttribute('opacity', formatting.opacity.toString());
    }
    
    if (formatting.shadow) {
      const shadowParts = formatting.shadow.split(' ');
      if (shadowParts.length >= 3) {
        const filterId = `shadow-${Math.random().toString(36).substr(2, 9)}`;
        this.createShadowFilter(filterId, shadowParts);
        textElement.setAttribute('filter', `url(#${filterId})`);
      }
    }
  }

  /**
   * Wrap text to fit within width
   */
  private wrapText(content: string, formatting: TextFormatting, maxWidth: number): string[] {
    // Simple word wrapping implementation
    // In a full implementation, this would use proper text measurement
    const words = content.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      // Approximate character width (this is simplified)
      const fontSize = typeof formatting.fontSize === 'number' 
        ? formatting.fontSize 
        : parsePositionValue(formatting.fontSize, 16);
      const estimatedWidth = testLine.length * fontSize * 0.6;

      if (estimatedWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  /**
   * Create SVG filter
   */
  private createFilter(filterId: string, filters: string[]): void {
    if (!this.context.svg) return;

    let defs = this.context.svg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      this.context.svg.appendChild(defs);
    }

    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', filterId);

    for (const filterString of filters) {
      // Parse common CSS filters and convert to SVG
      if (filterString.includes('blur')) {
        const blurMatch = filterString.match(/blur\((\d+)px\)/);
        if (blurMatch) {
          const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
          feGaussianBlur.setAttribute('stdDeviation', blurMatch[1]);
          filter.appendChild(feGaussianBlur);
        }
      }
      // Add more filter types as needed
    }

    defs.appendChild(filter);
  }

  /**
   * Create shadow filter
   */
  private createShadowFilter(filterId: string, shadowParts: string[]): void {
    if (!this.context.svg) return;

    let defs = this.context.svg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      this.context.svg.appendChild(defs);
    }

    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', filterId);

    const feDropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
    feDropShadow.setAttribute('dx', shadowParts[0] || '0');
    feDropShadow.setAttribute('dy', shadowParts[1] || '0');
    feDropShadow.setAttribute('stdDeviation', shadowParts[3] || '0');
    feDropShadow.setAttribute('flood-color', shadowParts[2] || '#000');

    filter.appendChild(feDropShadow);
    defs.appendChild(filter);
  }

  /**
   * Draw border
   */
  private drawBorder(x: number, y: number, width: number, height: number, border: BorderOptions): void {
    if (!this.context.svg) return;

    const { svg } = this.context;
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    
    rect.setAttribute('x', x.toString());
    rect.setAttribute('y', y.toString());
    rect.setAttribute('width', width.toString());
    rect.setAttribute('height', height.toString());
    rect.setAttribute('fill', 'none');
    rect.setAttribute('stroke', border.color);
    rect.setAttribute('stroke-width', border.width.toString());
    
    if (border.style === 'dashed') {
      rect.setAttribute('stroke-dasharray', '5,5');
    } else if (border.style === 'dotted') {
      rect.setAttribute('stroke-dasharray', '2,2');
    }
    
    if (border.radius) {
      rect.setAttribute('rx', border.radius.toString());
      rect.setAttribute('ry', border.radius.toString());
    }
    
    svg.appendChild(rect);
  }

  /**
   * Resize SVG
   */
  public resize(width: number, height: number): void {
    if (!this.context.svg) return;

    this.context.svg.setAttribute('width', width.toString());
    this.context.svg.setAttribute('height', height.toString());
    this.context.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    this.context.width = width;
    this.context.height = height;
  }

  /**
   * Get SVG data URL
   */
  public getDataURL(): string {
    if (!this.context.svg) {
      throw new Error('SVG not available');
    }

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(this.context.svg);
    const encodedSvg = encodeURIComponent(svgString);
    return `data:image/svg+xml,${encodedSvg}`;
  }

  /**
   * Clear SVG
   */
  public clear(): void {
    if (!this.context.svg) return;
    this.context.svg.innerHTML = '';
  }

  /**
   * Cleanup resources
   */
  public destroy(): void {
    this.loadedImages.clear();
  }
}
