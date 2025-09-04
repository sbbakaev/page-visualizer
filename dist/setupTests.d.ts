/**
 * Jest setup file for PageVisualizer tests
 */
declare const mockCanvas: {
    width: number;
    height: number;
    style: {
        display: string;
    };
    parentNode: null;
    appendChild: jest.Mock<any, any, any>;
    removeChild: jest.Mock<any, any, any>;
    getContext: jest.Mock<{
        clearRect: jest.Mock<any, any, any>;
        fillRect: jest.Mock<any, any, any>;
        drawImage: jest.Mock<any, any, any>;
        fillText: jest.Mock<any, any, any>;
        measureText: jest.Mock<{
            width: number;
        }, [], any>;
        strokeRect: jest.Mock<any, any, any>;
        beginPath: jest.Mock<any, any, any>;
        moveTo: jest.Mock<any, any, any>;
        lineTo: jest.Mock<any, any, any>;
        stroke: jest.Mock<any, any, any>;
        setLineDash: jest.Mock<any, any, any>;
        roundRect: jest.Mock<any, any, any>;
        save: jest.Mock<any, any, any>;
        restore: jest.Mock<any, any, any>;
        translate: jest.Mock<any, any, any>;
        scale: jest.Mock<any, any, any>;
        rotate: jest.Mock<any, any, any>;
        setTransform: jest.Mock<any, any, any>;
        createLinearGradient: jest.Mock<{
            addColorStop: jest.Mock<any, any, any>;
        }, [], any>;
        createRadialGradient: jest.Mock<{
            addColorStop: jest.Mock<any, any, any>;
        }, [], any>;
        createPattern: jest.Mock<any, any, any>;
        arc: jest.Mock<any, any, any>;
        arcTo: jest.Mock<any, any, any>;
        bezierCurveTo: jest.Mock<any, any, any>;
        closePath: jest.Mock<any, any, any>;
        ellipse: jest.Mock<any, any, any>;
        quadraticCurveTo: jest.Mock<any, any, any>;
        rect: jest.Mock<any, any, any>;
        toDataURL: jest.Mock<string, [], any>;
    }, [], any>;
    toDataURL: jest.Mock<string, [], any>;
    addEventListener: jest.Mock<any, any, any>;
    removeEventListener: jest.Mock<any, any, any>;
};
declare const mockImage: {
    width: number;
    height: number;
    onload: null;
    onerror: null;
    src: string;
    crossOrigin: string;
    addEventListener: jest.Mock<any, any, any>;
    removeEventListener: jest.Mock<any, any, any>;
};
declare const mockSVG: {
    setAttribute: jest.Mock<any, any, any>;
    getAttribute: jest.Mock<any, any, any>;
    appendChild: jest.Mock<any, any, any>;
    removeChild: jest.Mock<any, any, any>;
    querySelector: jest.Mock<any, any, any>;
    querySelectorAll: jest.Mock<never[], [], any>;
    innerHTML: string;
    addEventListener: jest.Mock<any, any, any>;
    removeEventListener: jest.Mock<any, any, any>;
    parentNode: null;
};
declare const originalCreateElement: {
    <K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K];
    <K extends keyof HTMLElementDeprecatedTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementDeprecatedTagNameMap[K];
    (tagName: string, options?: ElementCreationOptions): HTMLElement;
};
//# sourceMappingURL=setupTests.d.ts.map