import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class ActivityIconComponent {
    constructor() { }
    ngOnInit() {
    }
}
ActivityIconComponent.ɵfac = function ActivityIconComponent_Factory(t) { return new (t || ActivityIconComponent)(); };
ActivityIconComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ActivityIconComponent, selectors: [["ccd-activity-icon"]], inputs: { description: "description", imageLink: "imageLink" }, decls: 6, vars: 7, consts: [[1, "tooltip"], [1, "img-responsive", 3, "alt", "src"], [1, "tooltiptext"]], template: function ActivityIconComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "img", 1);
        i0.ɵɵpipe(2, "rpxTranslate");
        i0.ɵɵelementStart(3, "span", 2);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "rpxTranslate");
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵpropertyInterpolate("alt", i0.ɵɵpipeBind1(2, 3, ctx.description));
        i0.ɵɵpropertyInterpolate("src", ctx.imageLink, i0.ɵɵsanitizeUrl);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 5, ctx.description));
    } }, dependencies: [i1.RpxTranslatePipe], styles: [".tooltip[_ngcontent-%COMP%]{position:relative;display:inline-block}.tooltip[_ngcontent-%COMP%]   .tooltiptext[_ngcontent-%COMP%]{visibility:hidden;width:140px;background-color:#1175b2;color:#fff;text-align:center;border-radius:6px;padding:5px 0;position:absolute;z-index:1;margin-left:-50px;opacity:0;transition:opacity 1s}.tooltip[_ngcontent-%COMP%]:hover   .tooltiptext[_ngcontent-%COMP%]{visibility:visible;opacity:1}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActivityIconComponent, [{
        type: Component,
        args: [{ selector: 'ccd-activity-icon', template: "<div class=\"tooltip\">\n  <img alt=\"{{description | rpxTranslate}}\" class=\"img-responsive\" src=\"{{imageLink}}\" />\n  <span class=\"tooltiptext\">{{description | rpxTranslate}}</span>\n</div>\n", styles: [".tooltip{position:relative;display:inline-block}.tooltip .tooltiptext{visibility:hidden;width:140px;background-color:#1175b2;color:#fff;text-align:center;border-radius:6px;padding:5px 0;position:absolute;z-index:1;margin-left:-50px;opacity:0;transition:opacity 1s}.tooltip:hover .tooltiptext{visibility:visible;opacity:1}\n"] }]
    }], function () { return []; }, { description: [{
            type: Input
        }], imageLink: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvYWN0aXZpdHkvYWN0aXZpdHktaWNvbi9hY3Rpdml0eS1pY29uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9hY3Rpdml0eS9hY3Rpdml0eS1pY29uL2FjdGl2aXR5LWljb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7OztBQU96RCxNQUFNLE9BQU8scUJBQXFCO0lBT2hDLGdCQUFnQixDQUFDO0lBRVYsUUFBUTtJQUNmLENBQUM7OzBGQVZVLHFCQUFxQjt3RUFBckIscUJBQXFCO1FDUGxDLDhCQUFxQjtRQUNuQix5QkFBdUY7O1FBQ3ZGLCtCQUEwQjtRQUFBLFlBQThCOztRQUFBLGlCQUFPLEVBQUE7O1FBRDFELGVBQW9DO1FBQXBDLHNFQUFvQztRQUF3QixnRUFBbUI7UUFDMUQsZUFBOEI7UUFBOUIsMkRBQThCOzt1RkRLN0MscUJBQXFCO2NBTGpDLFNBQVM7MkJBQ0UsbUJBQW1CO3NDQU10QixXQUFXO2tCQURqQixLQUFLO1lBSUMsU0FBUztrQkFEZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1hY3Rpdml0eS1pY29uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FjdGl2aXR5LWljb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hY3Rpdml0eS1pY29uLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBY3Rpdml0eUljb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgaW1hZ2VMaW5rOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJ0b29sdGlwXCI+XG4gIDxpbWcgYWx0PVwie3tkZXNjcmlwdGlvbiB8IHJweFRyYW5zbGF0ZX19XCIgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cInt7aW1hZ2VMaW5rfX1cIiAvPlxuICA8c3BhbiBjbGFzcz1cInRvb2x0aXB0ZXh0XCI+e3tkZXNjcmlwdGlvbiB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuPC9kaXY+XG4iXX0=