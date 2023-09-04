import { AfterContentInit, ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class FocusElementDirective implements AfterContentInit {
    private readonly el;
    private readonly renderer;
    constructor(el: ElementRef, renderer: Renderer2);
    ngAfterContentInit(): void;
    focus(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FocusElementDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FocusElementDirective, "[focusElement]", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=focus-element.directive.d.ts.map