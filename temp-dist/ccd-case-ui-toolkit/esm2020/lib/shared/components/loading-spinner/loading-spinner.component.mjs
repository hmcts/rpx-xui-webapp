import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class LoadingSpinnerComponent {
    constructor() {
        this.loadingText = 'Loading';
    }
}
LoadingSpinnerComponent.ɵfac = function LoadingSpinnerComponent_Factory(t) { return new (t || LoadingSpinnerComponent)(); };
LoadingSpinnerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoadingSpinnerComponent, selectors: [["ccd-loading-spinner"]], inputs: { loadingText: "loadingText" }, decls: 6, vars: 3, consts: [[1, "spinner-container"], [1, "spinner-inner-container"], [1, "spinner", 2, "margin", "auto"]], template: function LoadingSpinnerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "p");
        i0.ɵɵtext(3);
        i0.ɵɵpipe(4, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(5, "div", 2);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, ctx.loadingText));
    } }, dependencies: [i1.RpxTranslatePipe], styles: [".spinner-container{position:fixed;top:0;left:0;height:100%;width:100%;display:flex;justify-content:center;align-items:center;background:rgba(255,255,255,.5);z-index:99}.spinner-container .spinner-inner-container p{text-align:center}.spinner-container .spinner-inner-container .spinner{border:10px solid #dddddd;border-top:10px solid #000000;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoadingSpinnerComponent, [{
        type: Component,
        args: [{ selector: 'ccd-loading-spinner', encapsulation: ViewEncapsulation.None, template: "<div class=\"spinner-container\">\n    <div class=\"spinner-inner-container\">\n        <p>{{loadingText | rpxTranslate}}</p>\n        <div class=\"spinner\" style=\"margin: auto;\"></div>\n    </div>\n</div>\n", styles: [".spinner-container{position:fixed;top:0;left:0;height:100%;width:100%;display:flex;justify-content:center;align-items:center;background:rgba(255,255,255,.5);z-index:99}.spinner-container .spinner-inner-container p{text-align:center}.spinner-container .spinner-inner-container .spinner{border:10px solid #dddddd;border-top:10px solid #000000;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] }]
    }], null, { loadingText: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1zcGlubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9sb2FkaW5nLXNwaW5uZXIvbG9hZGluZy1zcGlubmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9sb2FkaW5nLXNwaW5uZXIvbG9hZGluZy1zcGlubmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFTcEUsTUFBTSxPQUFPLHVCQUF1QjtJQVBwQztRQVFrQixnQkFBVyxHQUFHLFNBQVMsQ0FBQztLQUN6Qzs7OEZBRlksdUJBQXVCOzBFQUF2Qix1QkFBdUI7UUNUcEMsOEJBQStCLGFBQUEsUUFBQTtRQUVwQixZQUE4Qjs7UUFBQSxpQkFBSTtRQUNyQyx5QkFBaUQ7UUFDckQsaUJBQU0sRUFBQTs7UUFGQyxlQUE4QjtRQUE5QiwyREFBOEI7O3VGRE81Qix1QkFBdUI7Y0FQbkMsU0FBUzsyQkFDRSxxQkFBcUIsaUJBR2hCLGlCQUFpQixDQUFDLElBQUk7Z0JBSXJCLFdBQVc7a0JBQTFCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtbG9hZGluZy1zcGlubmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvYWRpbmctc3Bpbm5lci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvYWRpbmctc3Bpbm5lci5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuXG5leHBvcnQgY2xhc3MgTG9hZGluZ1NwaW5uZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBwdWJsaWMgbG9hZGluZ1RleHQgPSAnTG9hZGluZyc7XG59XG4iLCI8ZGl2IGNsYXNzPVwic3Bpbm5lci1jb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1pbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgPHA+e3tsb2FkaW5nVGV4dCB8IHJweFRyYW5zbGF0ZX19PC9wPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lclwiIHN0eWxlPVwibWFyZ2luOiBhdXRvO1wiPjwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG4iXX0=