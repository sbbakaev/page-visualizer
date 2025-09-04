# PageVisualizer

A modular, importable **TypeScript library** for rendering and visualizing pages of digital books, comics, manga, or interactive content using HTML5 Canvas, SVG, or DOM approaches.

## Features

- 🎨 **Multiple Rendering Modes**: Canvas, SVG, and DOM rendering
- 📱 **Responsive Design**: Maintains aspect ratio and scales proportionally
- 🔒 **Type Safety**: Full TypeScript support with comprehensive interfaces
- ✅ **Input Validation**: Zod-based validation for all input data
- 🎭 **Rich Styling**: Support for fonts, colors, gradients, borders, and effects
- 🖼️ **Image Support**: Load and render images with filters and borders
- 📝 **Text Rendering**: Advanced text formatting with alignment and wrapping
- 🎬 **Animations**: Built-in animation support
- 📤 **Export Options**: Export to PNG, JPEG, PDF, and SVG
- ♿ **Accessibility**: ARIA roles and semantic HTML support
- 🔧 **Customizable**: Global styles and themes

## Installation

```bash
npm install page-visualizer
```

## Quick Start

```typescript
import { PageVisualizer } from 'page-visualizer';

// Create a container element
const container = document.getElementById('page-container')!;

// Initialize the visualizer
const visualizer = new PageVisualizer({
  container,
  mode: 'canvas', // 'canvas' | 'svg' | 'dom'
  globalStyles: {
    pageWidth: 800,
    pageHeight: 600,
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    theme: 'light',
  },
});

// Define a page
const page = {
  id: 'page-1',
  background: {
    color: '#ffffff',
    gradient: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  },
  textBlocks: [
    {
      content: 'Welcome to PageVisualizer!',
      position: {
        x: 50,
        y: 100,
        width: 700,
        height: 50,
        alignment: 'center',
      },
      formatting: {
        fontSize: 32,
        fontFamily: 'Arial, sans-serif',
        color: '#333333',
        fontWeight: 'bold',
        textDecoration: 'underline',
      },
    },
  ],
  images: [
    {
      src: 'https://example.com/image.jpg',
      position: {
        x: 100,
        y: 200,
        width: 600,
        height: 300,
      },
      altText: 'Sample image',
      border: {
        width: 2,
        style: 'solid',
        color: '#cccccc',
        radius: 10,
      },
    },
  ],
};

// Render the page
await visualizer.renderPage(page);

// Export the page
const dataURL = await visualizer.exportPage({ format: 'png' });
```

## API Reference

### PageVisualizer

#### Constructor

```typescript
new PageVisualizer(options: PageVisualizerOptions)
```

**Options:**
- `container: HTMLElement` - The DOM element to render into
- `mode?: 'canvas' | 'svg' | 'dom'` - Rendering mode (default: 'canvas')
- `globalStyles?: Partial<GlobalStyles>` - Global styling options
- `onError?: (error: Error) => void` - Error callback
- `onLoad?: () => void` - Load callback
- `onRender?: () => void` - Render callback

#### Methods

##### `renderPage(page: Page): Promise<void>`
Renders a page with the given data.

##### `exportPage(options: ExportOptions): Promise<string | Blob>`
Exports the current page in the specified format.

**Export Options:**
- `format: 'png' | 'jpeg' | 'pdf' | 'svg'` - Export format
- `quality?: number` - Quality (0-1) for JPEG
- `filename?: string` - Optional filename

##### `resize(width: number, height: number): void`
Resizes the visualizer to the specified dimensions.

##### `clear(): void`
Clears the current page.

##### `destroy(): void`
Destroys the visualizer and cleans up resources.

### Data Structures

#### Page

```typescript
interface Page {
  id: string | number;
  background?: Background;
  textBlocks?: TextBlock[];
  images?: ImageElement[];
  layout?: LayoutOptions;
  animations?: Animation[];
  interactiveElements?: InteractiveElement[];
}
```

#### TextBlock

```typescript
interface TextBlock {
  id?: string;
  content: string;
  position: Position;
  formatting: TextFormatting;
  zIndex?: number;
}
```

#### ImageElement

```typescript
interface ImageElement {
  id?: string;
  src: string;
  position: Position;
  zIndex?: number;
  altText?: string;
  filters?: string[];
  border?: BorderOptions;
}
```

#### Position

```typescript
interface Position {
  x: number | string;  // px, %, vw, vh, em, rem
  y: number | string;
  width: number | string;
  height: number | string;
  alignment?: 'left' | 'center' | 'right' | 'justify';
}
```

## Examples

### Basic Text Page

```typescript
const textPage = {
  id: 'text-page',
  background: { color: '#f8f9fa' },
  textBlocks: [
    {
      content: 'This is a sample text block with custom formatting.',
      position: {
        x: '10%',
        y: '20%',
        width: '80%',
        height: '60%',
        alignment: 'justify',
      },
      formatting: {
        fontSize: 18,
        fontFamily: 'Georgia, serif',
        color: '#2c3e50',
        lineHeight: 1.6,
        letterSpacing: 0.5,
      },
    },
  ],
};
```

### Image Gallery Page

```typescript
const galleryPage = {
  id: 'gallery-page',
  background: { color: '#ffffff' },
  images: [
    {
      src: 'image1.jpg',
      position: { x: 50, y: 50, width: 300, height: 200 },
      altText: 'Gallery image 1',
      border: { width: 1, style: 'solid', color: '#ddd', radius: 5 },
    },
    {
      src: 'image2.jpg',
      position: { x: 400, y: 50, width: 300, height: 200 },
      altText: 'Gallery image 2',
      border: { width: 1, style: 'solid', color: '#ddd', radius: 5 },
    },
  ],
};
```

### Animated Page

```typescript
const animatedPage = {
  id: 'animated-page',
  background: { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  textBlocks: [
    {
      id: 'title',
      content: 'Animated Title',
      position: { x: 50, y: 100, width: 700, height: 50, alignment: 'center' },
      formatting: {
        fontSize: 36,
        fontFamily: 'Arial',
        color: '#ffffff',
        fontWeight: 'bold',
      },
    },
  ],
  animations: [
    {
      target: 'title',
      type: 'fadeIn',
      duration: 1000,
      delay: 500,
    },
  ],
};
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Type check
npm run type-check
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## Changelog

### 1.0.0
- Initial release
- Canvas and SVG rendering support
- TypeScript interfaces and validation
- Export functionality
- Animation support
- Comprehensive test suite
