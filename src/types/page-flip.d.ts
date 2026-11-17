declare module "page-flip/dist/js/page-flip.module.js" {
  export interface FlipSettings {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    showCover?: boolean;
    usePortrait?: boolean;
    mobileScrollSupport?: boolean;
    maxShadowOpacity?: number;
    flippingTime?: number;
    drawShadow?: boolean;
    startPage?: number;
  }
  export class PageFlip {
    constructor(el: HTMLElement, settings: FlipSettings);
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    on(event: "flip" | "changeOrientation" | "init", cb: (e: { data: unknown }) => void): this;
    flip(page: number): void;
    flipNext(): void;
    flipPrev(): void;
    turnToPage(page: number): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    getOrientation(): "portrait" | "landscape";
    destroy(): void;
  }
}
