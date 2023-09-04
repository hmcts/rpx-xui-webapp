import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "rpx-xui-translation";
const _c0 = function (a0, a1) { return { caseLocked: a0, someoneViewing: a1 }; };
export class ActivityBannerComponent {
    constructor() { }
    ngOnInit() {
    }
}
ActivityBannerComponent.ɵfac = function ActivityBannerComponent_Factory(t) { return new (t || ActivityBannerComponent)(); };
ActivityBannerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ActivityBannerComponent, selectors: [["ccd-activity-banner"]], inputs: { bannerType: "bannerType", description: "description", imageLink: "imageLink" }, decls: 7, vars: 11, consts: [[3, "ngClass"], [1, "bannerIcon"], [1, "img-responsive", 3, "alt", "src"], [1, "bannerText"]], template: function ActivityBannerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
        i0.ɵɵelement(2, "img", 2);
        i0.ɵɵpipe(3, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "div", 3);
        i0.ɵɵtext(5);
        i0.ɵɵpipe(6, "rpxTranslate");
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(8, _c0, ctx.bannerType === "editor", ctx.bannerType === "viewer"));
        i0.ɵɵadvance(2);
        i0.ɵɵpropertyInterpolate("alt", i0.ɵɵpipeBind1(3, 4, ctx.description));
        i0.ɵɵpropertyInterpolate("src", ctx.imageLink, i0.ɵɵsanitizeUrl);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 6, ctx.description));
    } }, dependencies: [i1.NgClass, i2.RpxTranslatePipe], styles: [".caseLocked[_ngcontent-%COMP%]{margin-top:4px;height:40px;filter:blur(0);background-color:#e72626}.someoneViewing[_ngcontent-%COMP%]{margin-top:4px;height:40px;filter:blur(0);background-color:#912b88}.bannerIcon[_ngcontent-%COMP%]{float:left;color:#fff;padding-left:9px;position:relative;top:50%;transform:translateY(-40%)}.bannerText[_ngcontent-%COMP%]{padding-left:40px;position:relative;top:50%;transform:translateY(-50%);height:20px;filter:blur(0);font-family:nta,Arial,sans-serif;font-size:16px;font-weight:700;line-height:1.25;text-align:left;color:#fff}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActivityBannerComponent, [{
        type: Component,
        args: [{ selector: 'ccd-activity-banner', template: "<div [ngClass]=\"{caseLocked: bannerType === 'editor', someoneViewing: bannerType === 'viewer'}\">\n  <div class=\"bannerIcon\"><img alt=\"{{description | rpxTranslate}}\" class=\"img-responsive\" src=\"{{imageLink}}\" /></div>\n  <div class=\"bannerText\">{{description | rpxTranslate}}</div>\n</div>\n", styles: [".caseLocked{margin-top:4px;height:40px;filter:blur(0);background-color:#e72626}.someoneViewing{margin-top:4px;height:40px;filter:blur(0);background-color:#912b88}.bannerIcon{float:left;color:#fff;padding-left:9px;position:relative;top:50%;transform:translateY(-40%)}.bannerText{padding-left:40px;position:relative;top:50%;transform:translateY(-50%);height:20px;filter:blur(0);font-family:nta,Arial,sans-serif;font-size:16px;font-weight:700;line-height:1.25;text-align:left;color:#fff}\n"] }]
    }], function () { return []; }, { bannerType: [{
            type: Input
        }], description: [{
            type: Input
        }], imageLink: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9hY3Rpdml0eS9hY3Rpdml0eS1iYW5uZXIvYWN0aXZpdHktYmFubmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9hY3Rpdml0eS9hY3Rpdml0eS1iYW5uZXIvYWN0aXZpdHktYmFubmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7OztBQU96RCxNQUFNLE9BQU8sdUJBQXVCO0lBVWxDLGdCQUFnQixDQUFDO0lBRVYsUUFBUTtJQUNmLENBQUM7OzhGQWJVLHVCQUF1QjswRUFBdkIsdUJBQXVCO1FDUHBDLDhCQUFnRyxhQUFBO1FBQ3RFLHlCQUF1Rjs7UUFBQSxpQkFBTTtRQUNySCw4QkFBd0I7UUFBQSxZQUE4Qjs7UUFBQSxpQkFBTSxFQUFBOztRQUZ6RCw4R0FBMEY7UUFDaEUsZUFBb0M7UUFBcEMsc0VBQW9DO1FBQXdCLGdFQUFtQjtRQUNwRixlQUE4QjtRQUE5QiwyREFBOEI7O3VGREszQyx1QkFBdUI7Y0FMbkMsU0FBUzsyQkFDRSxxQkFBcUI7c0NBTXhCLFVBQVU7a0JBRGhCLEtBQUs7WUFJQyxXQUFXO2tCQURqQixLQUFLO1lBSUMsU0FBUztrQkFEZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1hY3Rpdml0eS1iYW5uZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYWN0aXZpdHktYmFubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWN0aXZpdHktYmFubmVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBY3Rpdml0eUJhbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBiYW5uZXJUeXBlOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGltYWdlTGluazogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICB9XG59XG4iLCI8ZGl2IFtuZ0NsYXNzXT1cIntjYXNlTG9ja2VkOiBiYW5uZXJUeXBlID09PSAnZWRpdG9yJywgc29tZW9uZVZpZXdpbmc6IGJhbm5lclR5cGUgPT09ICd2aWV3ZXInfVwiPlxuICA8ZGl2IGNsYXNzPVwiYmFubmVySWNvblwiPjxpbWcgYWx0PVwie3tkZXNjcmlwdGlvbiB8IHJweFRyYW5zbGF0ZX19XCIgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cInt7aW1hZ2VMaW5rfX1cIiAvPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiYmFubmVyVGV4dFwiPnt7ZGVzY3JpcHRpb24gfCBycHhUcmFuc2xhdGV9fTwvZGl2PlxuPC9kaXY+XG4iXX0=