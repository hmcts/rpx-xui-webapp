/**
 * Cloned from rpx-xui-webapp src/app/components/error-message/error-message.component.ts
 */
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "rpx-xui-translation";
function ErrorMessageComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 1)(2, "h2", 2);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 3)(6, "ul", 4)(7, "li")(8, "a", 5);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "rpxTranslate");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 3, ctx_r0.error.title));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("fragment", ctx_r0.error.fieldId);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 5, ctx_r0.error.description));
} }
export class ErrorMessageComponent {
}
ErrorMessageComponent.ɵfac = function ErrorMessageComponent_Factory(t) { return new (t || ErrorMessageComponent)(); };
ErrorMessageComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ErrorMessageComponent, selectors: [["exui-error-message"]], inputs: { error: "error" }, decls: 1, vars: 1, consts: [[4, "ngIf"], ["aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "govuk-error-summary", 1, "govuk-error-summary"], ["id", "error-summary-title", 1, "govuk-error-summary__title"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"], ["routerLink", ".", 3, "fragment"]], template: function ErrorMessageComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ErrorMessageComponent_ng_container_0_Template, 11, 7, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.error);
    } }, dependencies: [i1.NgIf, i2.RouterLink, i3.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ErrorMessageComponent, [{
        type: Component,
        args: [{ selector: 'exui-error-message', template: "<!-- Cloned from rpx-xui-webapp src/app/components/error-message/error-message.component.html -->\n<ng-container *ngIf=\"error\">\n  <div class=\"govuk-error-summary\" aria-labelledby=\"error-summary-title\" role=\"alert\" tabindex=\"-1\" data-module=\"govuk-error-summary\">\n    <h2 class=\"govuk-error-summary__title\" id=\"error-summary-title\">{{error.title | rpxTranslate}}</h2>\n    <div class=\"govuk-error-summary__body\">\n      <ul class=\"govuk-list govuk-error-summary__list\">\n        <li>\n          <a routerLink=\".\" [fragment]=\"error.fieldId\">{{error.description | rpxTranslate}}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</ng-container>\n" }]
    }], null, { error: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvZXJyb3ItbWVzc2FnZS9lcnJvci1tZXNzYWdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9lcnJvci1tZXNzYWdlL2Vycm9yLW1lc3NhZ2UuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lDRmpELDZCQUE0QjtJQUMxQiw4QkFBb0ksWUFBQTtJQUNsRSxZQUE4Qjs7SUFBQSxpQkFBSztJQUNuRyw4QkFBdUMsWUFBQSxTQUFBLFdBQUE7SUFHWSxZQUFvQzs7SUFBQSxpQkFBSSxFQUFBLEVBQUEsRUFBQSxFQUFBO0lBSy9GLDBCQUFlOzs7SUFUcUQsZUFBOEI7SUFBOUIsOERBQThCO0lBSXRFLGVBQTBCO0lBQTFCLCtDQUEwQjtJQUFDLGVBQW9DO0lBQXBDLHFFQUFvQzs7QURJM0YsTUFBTSxPQUFPLHFCQUFxQjs7MEZBQXJCLHFCQUFxQjt3RUFBckIscUJBQXFCO1FDVmxDLHlGQVdlOztRQVhBLGdDQUFXOzt1RkRVYixxQkFBcUI7Y0FKakMsU0FBUzsyQkFDRSxvQkFBb0I7Z0JBSWQsS0FBSztrQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ2xvbmVkIGZyb20gcnB4LXh1aS13ZWJhcHAgc3JjL2FwcC9jb21wb25lbnRzL2Vycm9yLW1lc3NhZ2UvZXJyb3ItbWVzc2FnZS5jb21wb25lbnQudHNcbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi8uLi9kb21haW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdleHVpLWVycm9yLW1lc3NhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vZXJyb3ItbWVzc2FnZS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgRXJyb3JNZXNzYWdlQ29tcG9uZW50IHtcbiAgQElucHV0KCkgcHVibGljIGVycm9yOiBFcnJvck1lc3NhZ2U7XG59XG4iLCI8IS0tIENsb25lZCBmcm9tIHJweC14dWktd2ViYXBwIHNyYy9hcHAvY29tcG9uZW50cy9lcnJvci1tZXNzYWdlL2Vycm9yLW1lc3NhZ2UuY29tcG9uZW50Lmh0bWwgLS0+XG48bmctY29udGFpbmVyICpuZ0lmPVwiZXJyb3JcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlcIiBhcmlhLWxhYmVsbGVkYnk9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCIgcm9sZT1cImFsZXJ0XCIgdGFiaW5kZXg9XCItMVwiIGRhdGEtbW9kdWxlPVwiZ292dWstZXJyb3Itc3VtbWFyeVwiPlxuICAgIDxoMiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX3RpdGxlXCIgaWQ9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCI+e3tlcnJvci50aXRsZSB8IHJweFRyYW5zbGF0ZX19PC9oMj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fYm9keVwiPlxuICAgICAgPHVsIGNsYXNzPVwiZ292dWstbGlzdCBnb3Z1ay1lcnJvci1zdW1tYXJ5X19saXN0XCI+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICA8YSByb3V0ZXJMaW5rPVwiLlwiIFtmcmFnbWVudF09XCJlcnJvci5maWVsZElkXCI+e3tlcnJvci5kZXNjcmlwdGlvbiB8IHJweFRyYW5zbGF0ZX19PC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==