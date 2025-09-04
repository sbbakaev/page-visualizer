/**
 * Tests for PageVisualizer main class
 */

import { PageVisualizer } from '../PageVisualizer';
import { Page, PageVisualizerOptions } from '../types';

describe('PageVisualizer', () => {
  let container: HTMLElement;
  let options: PageVisualizerOptions;

  beforeEach(() => {
    // Create mock container
    container = document.createElement('div');
    container.id = 'test-container';
    // Mock appendChild to avoid DOM issues in tests
    container.appendChild = jest.fn();
    document.body.appendChild(container);

    options = {
      container,
      mode: 'canvas',
      globalStyles: {
        pageWidth: 800,
        pageHeight: 600,
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
        theme: 'light',
      },
    };
  });

  afterEach(() => {
    // Cleanup
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  describe('Constructor', () => {
    it('should create PageVisualizer instance with valid options', () => {
      const visualizer = new PageVisualizer(options);
      expect(visualizer).toBeInstanceOf(PageVisualizer);
    });

    it('should throw error with invalid options', () => {
      expect(() => {
        new PageVisualizer({} as PageVisualizerOptions);
      }).toThrow();
    });

    it('should initialize with default global styles', () => {
      const visualizer = new PageVisualizer({
        container,
        mode: 'canvas',
      });
      expect(visualizer).toBeInstanceOf(PageVisualizer);
    });
  });

  describe('renderPage', () => {
    let visualizer: PageVisualizer;
    let mockPage: Page;

    beforeEach(() => {
      visualizer = new PageVisualizer(options);
      mockPage = {
        id: 'test-page',
        background: {
          color: '#ffffff',
        },
        textBlocks: [
          {
            content: 'Test text',
            position: {
              x: 10,
              y: 10,
              width: 100,
              height: 20,
            },
            formatting: {
              fontSize: 16,
              fontFamily: 'Arial',
              color: '#000000',
            },
          },
        ],
      };
    });

    afterEach(() => {
      visualizer.destroy();
    });

    it('should render a valid page', async () => {
      await expect(visualizer.renderPage(mockPage)).resolves.not.toThrow();
    });

    it('should throw error for invalid page data', async () => {
      const invalidPage = {
        id: 'test',
        textBlocks: [
          {
            content: 'Test text',
            position: {
              x: -10, // Invalid negative value
              y: 10,
              width: 100,
              height: 20,
            },
            formatting: {
              fontSize: -16, // Invalid negative value
              fontFamily: '', // Empty string
              color: 'invalid-color',
            },
          },
        ],
      } as Page;

      await expect(visualizer.renderPage(invalidPage)).rejects.toThrow();
    });

    it('should update current page after rendering', async () => {
      await visualizer.renderPage(mockPage);
      expect(visualizer.getCurrentPage()).toEqual(mockPage);
    });
  });

  describe('exportPage', () => {
    let visualizer: PageVisualizer;
    let mockPage: Page;

    beforeEach(() => {
      visualizer = new PageVisualizer(options);
      mockPage = {
        id: 'test-page',
        background: {
          color: '#ffffff',
        },
      };
    });

    afterEach(() => {
      visualizer.destroy();
    });

    it('should export page as PNG', async () => {
      await visualizer.renderPage(mockPage);
      const result = await visualizer.exportPage({ format: 'png' });
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^data:image\/png;base64,/);
    });

    it('should throw error when no page is rendered', async () => {
      await expect(visualizer.exportPage({ format: 'png' })).rejects.toThrow('No page to export');
    });

    it('should throw error for invalid export options', async () => {
      await visualizer.renderPage(mockPage);
      await expect(visualizer.exportPage({} as any)).rejects.toThrow();
    });
  });

  describe('resize', () => {
    let visualizer: PageVisualizer;

    beforeEach(() => {
      visualizer = new PageVisualizer(options);
    });

    afterEach(() => {
      visualizer.destroy();
    });

    it('should resize the visualizer', () => {
      expect(() => visualizer.resize(1000, 800)).not.toThrow();
    });

    it('should update context dimensions', () => {
      visualizer.resize(1000, 800);
      const context = visualizer.getContext();
      expect(context.width).toBe(1000);
      expect(context.height).toBe(800);
    });
  });

  describe('clear', () => {
    let visualizer: PageVisualizer;

    beforeEach(() => {
      visualizer = new PageVisualizer(options);
    });

    afterEach(() => {
      visualizer.destroy();
    });

    it('should clear the visualizer', () => {
      expect(() => visualizer.clear()).not.toThrow();
    });

    it('should clear current page', () => {
      visualizer.clear();
      expect(visualizer.getCurrentPage()).toBeNull();
    });
  });

  describe('destroy', () => {
    let visualizer: PageVisualizer;

    beforeEach(() => {
      visualizer = new PageVisualizer(options);
    });

    it('should destroy the visualizer', () => {
      expect(() => visualizer.destroy()).not.toThrow();
    });

    it('should prevent operations after destruction', () => {
      visualizer.destroy();
      expect(() => visualizer.resize(100, 100)).toThrow();
    });
  });

  describe('updateGlobalStyles', () => {
    let visualizer: PageVisualizer;

    beforeEach(() => {
      visualizer = new PageVisualizer(options);
    });

    afterEach(() => {
      visualizer.destroy();
    });

    it('should update global styles', () => {
      const newStyles = {
        pageWidth: 1000,
        pageHeight: 800,
      };
      expect(() => visualizer.updateGlobalStyles(newStyles)).not.toThrow();
    });
  });
});
