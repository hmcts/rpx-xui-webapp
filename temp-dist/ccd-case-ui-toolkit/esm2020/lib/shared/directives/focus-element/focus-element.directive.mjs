import { Directive, ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Focuses the host element after the content of the view has been initialised. Works on writable fields. If the
 * directive is used on more than one element, the last element to be initialised will be in focus.
 * NOTE:
 * The directive focuses on the element only for the very first time when the content into the component's view, the
 * view that the directive is in is initialised. Refocusing the element will require explicit focusing for e.g. by
 * calling this directives focus() method from the host component.
 */
export class FocusElementDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ngAfterContentInit() {
        this.focus();
    }
    focus() {
        if (this.el.nativeElement) {
            const focusElement = this.renderer.selectRootElement(this.el.nativeElement, true);
            if (focusElement) {
                focusElement.focus();
            }
        }
    }
}
FocusElementDirective.ɵfac = function FocusElementDirective_Factory(t) { return new (t || FocusElementDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
FocusElementDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: FocusElementDirective, selectors: [["", "focusElement", ""]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FocusElementDirective, [{
        type: Directive,
        args: [{
                selector: '[focusElement]'
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtZWxlbWVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2RpcmVjdGl2ZXMvZm9jdXMtZWxlbWVudC9mb2N1cy1lbGVtZW50LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUtuRjs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFPLHFCQUFxQjtJQUVoQyxZQUE2QixFQUFjLEVBQW1CLFFBQW1CO1FBQXBELE9BQUUsR0FBRixFQUFFLENBQVk7UUFBbUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUNqRixDQUFDO0lBRU0sa0JBQWtCO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFTSxLQUFLO1FBQ1YsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRTtZQUN6QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xGLElBQUksWUFBWSxFQUFFO2dCQUNoQixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDdEI7U0FDRjtJQUNILENBQUM7OzBGQWhCVSxxQkFBcUI7d0VBQXJCLHFCQUFxQjt1RkFBckIscUJBQXFCO2NBWGpDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2FBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2ZvY3VzRWxlbWVudF0nXG59KVxuLyoqXG4gKiBGb2N1c2VzIHRoZSBob3N0IGVsZW1lbnQgYWZ0ZXIgdGhlIGNvbnRlbnQgb2YgdGhlIHZpZXcgaGFzIGJlZW4gaW5pdGlhbGlzZWQuIFdvcmtzIG9uIHdyaXRhYmxlIGZpZWxkcy4gSWYgdGhlXG4gKiBkaXJlY3RpdmUgaXMgdXNlZCBvbiBtb3JlIHRoYW4gb25lIGVsZW1lbnQsIHRoZSBsYXN0IGVsZW1lbnQgdG8gYmUgaW5pdGlhbGlzZWQgd2lsbCBiZSBpbiBmb2N1cy5cbiAqIE5PVEU6XG4gKiBUaGUgZGlyZWN0aXZlIGZvY3VzZXMgb24gdGhlIGVsZW1lbnQgb25seSBmb3IgdGhlIHZlcnkgZmlyc3QgdGltZSB3aGVuIHRoZSBjb250ZW50IGludG8gdGhlIGNvbXBvbmVudCdzIHZpZXcsIHRoZVxuICogdmlldyB0aGF0IHRoZSBkaXJlY3RpdmUgaXMgaW4gaXMgaW5pdGlhbGlzZWQuIFJlZm9jdXNpbmcgdGhlIGVsZW1lbnQgd2lsbCByZXF1aXJlIGV4cGxpY2l0IGZvY3VzaW5nIGZvciBlLmcuIGJ5XG4gKiBjYWxsaW5nIHRoaXMgZGlyZWN0aXZlcyBmb2N1cygpIG1ldGhvZCBmcm9tIHRoZSBob3N0IGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEZvY3VzRWxlbWVudERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzKCk7XG4gIH1cblxuICBwdWJsaWMgZm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgY29uc3QgZm9jdXNFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5zZWxlY3RSb290RWxlbWVudCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgICAgaWYgKGZvY3VzRWxlbWVudCkge1xuICAgICAgICBmb2N1c0VsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIl19