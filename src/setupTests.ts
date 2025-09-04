/**
 * Jest setup file for PageVisualizer tests
 */

// Mock canvas for testing
const mockCanvas = {
  width: 800,
  height: 600,
  style: {
    display: 'block',
  },
  parentNode: null,
  appendChild: jest.fn(),
  removeChild: jest.fn(),
  getContext: jest.fn(() => ({
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    drawImage: jest.fn(),
    fillText: jest.fn(),
    measureText: jest.fn(() => ({ width: 100 })),
    strokeRect: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    setLineDash: jest.fn(),
    roundRect: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    setTransform: jest.fn(),
    createLinearGradient: jest.fn(() => ({
      addColorStop: jest.fn(),
    })),
    createRadialGradient: jest.fn(() => ({
      addColorStop: jest.fn(),
    })),
    createPattern: jest.fn(),
    arc: jest.fn(),
    arcTo: jest.fn(),
    bezierCurveTo: jest.fn(),
    closePath: jest.fn(),
    ellipse: jest.fn(),
    quadraticCurveTo: jest.fn(),
    rect: jest.fn(),
    toDataURL: jest.fn(() => 'data:image/png;base64,mock'),
  })),
  toDataURL: jest.fn(() => 'data:image/png;base64,mock'),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

// Mock HTMLCanvasElement
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: mockCanvas.getContext,
});

Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
  value: mockCanvas.toDataURL,
});

// Mock Image
const mockImage = {
  width: 100,
  height: 100,
  onload: null,
  onerror: null,
  src: '',
  crossOrigin: '',
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

Object.defineProperty(global, 'Image', {
  value: jest.fn(() => mockImage),
});

// Mock SVG
const mockSVG = {
  setAttribute: jest.fn(),
  getAttribute: jest.fn(),
  appendChild: jest.fn(),
  removeChild: jest.fn(),
  querySelector: jest.fn(),
  querySelectorAll: jest.fn(() => []),
  innerHTML: '',
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  parentNode: null,
};

Object.defineProperty(global, 'SVGElement', {
  value: jest.fn(() => mockSVG),
});

// Mock document.createElement
const originalCreateElement = document.createElement;
document.createElement = jest.fn((tagName: string) => {
  if (tagName === 'canvas') {
    // Make the mock canvas behave like a real DOM node
    Object.setPrototypeOf(mockCanvas, HTMLCanvasElement.prototype);
    return mockCanvas as any;
  }
  if (tagName === 'svg') {
    // Make the mock SVG behave like a real DOM node
    Object.setPrototypeOf(mockSVG, SVGElement.prototype);
    return mockSVG as any;
  }
  return originalCreateElement.call(document, tagName);
});

// Mock document.createElementNS
document.createElementNS = jest.fn((namespace: string, tagName: string) => {
  if (namespace === 'http://www.w3.org/2000/svg') {
    return mockSVG as any;
  }
  return originalCreateElement.call(document, tagName);
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock XMLSerializer
global.XMLSerializer = jest.fn().mockImplementation(() => ({
  serializeToString: jest.fn(() => '<svg></svg>'),
}));

// Mock window properties
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 768,
});

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
};
