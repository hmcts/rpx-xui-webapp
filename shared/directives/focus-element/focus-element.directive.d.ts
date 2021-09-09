import { AfterContentInit, ElementRef, Renderer2 } from '@angular/core';
export declare class FocusElementDirective implements AfterContentInit {
    private el;
    private renderer;
    constructor(el: ElementRef, renderer: Renderer2);
    ngAfterContentInit(): void;
    focus(): void;
}
