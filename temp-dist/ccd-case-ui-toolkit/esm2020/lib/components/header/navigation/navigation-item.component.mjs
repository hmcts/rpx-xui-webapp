import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "rpx-xui-translation";
function NavigationItemComponent_input_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate1("alt", "", ctx_r0.label, " button");
    i0.ɵɵpropertyInterpolate("src", ctx_r0.imageLink, i0.ɵɵsanitizeUrl);
} }
export class NavigationItemComponent {
}
NavigationItemComponent.ɵfac = function NavigationItemComponent_Factory(t) { return new (t || NavigationItemComponent)(); };
NavigationItemComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NavigationItemComponent, selectors: [["cut-nav-item"]], inputs: { label: "label", link: "link", imageLink: "imageLink" }, decls: 5, vars: 6, consts: [[3, "routerLinkActive", "routerLink"], ["type", "image", 3, "alt", "src", 4, "ngIf"], ["type", "image", 3, "alt", "src"]], template: function NavigationItemComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div")(1, "a", 0);
        i0.ɵɵtext(2);
        i0.ɵɵpipe(3, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, NavigationItemComponent_input_4_Template, 1, 2, "input", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("routerLinkActive", "item-bold")("routerLink", ctx.link);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 4, ctx.label));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.imageLink);
    } }, dependencies: [i1.NgIf, i2.RouterLink, i2.RouterLinkActive, i3.RpxTranslatePipe], styles: ["a[_ngcontent-%COMP%]{color:#fff;text-decoration:none;padding-right:10px;font-size:18px}a.active[_ngcontent-%COMP%]{color:#fff}a[_ngcontent-%COMP%]:focus{background-color:#005ea5;color:#fff}input[_ngcontent-%COMP%]{float:right;background-color:#00823b;margin-top:-3px}.item-bold[_ngcontent-%COMP%]{font-size:18px;font-weight:700}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NavigationItemComponent, [{
        type: Component,
        args: [{ selector: 'cut-nav-item', template: "<div>\n  <a [routerLinkActive]=\"'item-bold'\" [routerLink]=\"link\">{{label | rpxTranslate}}</a>\n  <input type=\"image\" alt=\"{{label}} button\" *ngIf=\"imageLink\" src=\"{{imageLink}}\"/>\n</div>\n", styles: ["a{color:#fff;text-decoration:none;padding-right:10px;font-size:18px}a.active{color:#fff}a:focus{background-color:#005ea5;color:#fff}input{float:right;background-color:#00823b;margin-top:-3px}.item-bold{font-size:18px;font-weight:700}\n"] }]
    }], null, { label: [{
            type: Input
        }], link: [{
            type: Input
        }], imageLink: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9jb21wb25lbnRzL2hlYWRlci9uYXZpZ2F0aW9uL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvY29tcG9uZW50cy9oZWFkZXIvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLWl0ZW0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lDRS9DLDJCQUFrRjs7O0lBQTlELDZEQUFzQjtJQUFtQixtRUFBbUI7O0FES2xGLE1BQU0sT0FBTyx1QkFBdUI7OzhGQUF2Qix1QkFBdUI7MEVBQXZCLHVCQUF1QjtRQ1BwQywyQkFBSyxXQUFBO1FBQ3FELFlBQXdCOztRQUFBLGlCQUFJO1FBQ3BGLDRFQUFrRjtRQUNwRixpQkFBTTs7UUFGRCxlQUFnQztRQUFoQyw4Q0FBZ0Msd0JBQUE7UUFBcUIsZUFBd0I7UUFBeEIscURBQXdCO1FBQ3BDLGVBQWU7UUFBZixvQ0FBZTs7dUZES2hELHVCQUF1QjtjQUxuQyxTQUFTOzJCQUNJLGNBQWM7Z0JBT25CLEtBQUs7a0JBRFgsS0FBSztZQUlDLElBQUk7a0JBRFYsS0FBSztZQUlDLFNBQVM7a0JBRGYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdjdXQtbmF2LWl0ZW0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uYXZpZ2F0aW9uLWl0ZW0uaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmF2aWdhdGlvbi1pdGVtLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGxhYmVsOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGxpbms6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgaW1hZ2VMaW5rOiBzdHJpbmc7XG5cbn1cbiIsIjxkaXY+XG4gIDxhIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIidpdGVtLWJvbGQnXCIgW3JvdXRlckxpbmtdPVwibGlua1wiPnt7bGFiZWwgfCBycHhUcmFuc2xhdGV9fTwvYT5cbiAgPGlucHV0IHR5cGU9XCJpbWFnZVwiIGFsdD1cInt7bGFiZWx9fSBidXR0b25cIiAqbmdJZj1cImltYWdlTGlua1wiIHNyYz1cInt7aW1hZ2VMaW5rfX1cIi8+XG48L2Rpdj5cbiJdfQ==