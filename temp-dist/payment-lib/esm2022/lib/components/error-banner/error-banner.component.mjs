import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class ErrorBannerComponent {
    errorMessage;
    constructor() { }
    ngOnInit() {
    }
    static ɵfac = function ErrorBannerComponent_Factory(t) { return new (t || ErrorBannerComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ErrorBannerComponent, selectors: [["ccpay-error-banner"]], inputs: { errorMessage: "errorMessage" }, decls: 7, vars: 2, consts: [["aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "govuk-error-summary", 1, "govuk-error-summary"], ["id", "error-summary-title", 1, "govuk-error-summary__title", "govuk-error-summary__title-custom"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"]], template: function ErrorBannerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h2", 1);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2)(4, "ul", 3)(5, "li");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.errorMessage.title, " ");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", ctx.errorMessage.body, " ");
        } }, styles: [".govuk-error-summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:24px}.govuk-error-summary__list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{font-size:19px}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ErrorBannerComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-error-banner', template: "<div class=\"govuk-error-summary\" aria-labelledby=\"error-summary-title\" role=\"alert\" tabindex=\"-1\" data-module=\"govuk-error-summary\">\n  <h2 class=\"govuk-error-summary__title govuk-error-summary__title-custom\" id=\"error-summary-title\">\n      {{errorMessage.title}}\n  </h2>\n  <div class=\"govuk-error-summary__body\">\n    <ul class=\"govuk-list govuk-error-summary__list\">\n      <li>\n          {{errorMessage.body}}\n      </li>\n    </ul>\n  </div>\n</div>", styles: [".govuk-error-summary h2{font-size:24px}.govuk-error-summary__list li{font-size:19px}\n"] }]
    }], function () { return []; }, { errorMessage: [{
            type: Input,
            args: ['errorMessage']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItYmFubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9lcnJvci1iYW5uZXIvZXJyb3ItYmFubmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9lcnJvci1iYW5uZXIvZXJyb3ItYmFubmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVV6RCxNQUFNLE9BQU8sb0JBQW9CO0lBQ1IsWUFBWSxDQUFDO0lBRXBDLGdCQUNHLENBQUM7SUFFSixRQUFRO0lBRVIsQ0FBQzs4RUFSVSxvQkFBb0I7NkRBQXBCLG9CQUFvQjtZQ1ZqQyw4QkFBb0ksWUFBQTtZQUU5SCxZQUNKO1lBQUEsaUJBQUs7WUFDTCw4QkFBdUMsWUFBQSxTQUFBO1lBRy9CLFlBQ0o7WUFBQSxpQkFBSyxFQUFBLEVBQUEsRUFBQTs7WUFOTCxlQUNKO1lBREksdURBQ0o7WUFJUSxlQUNKO1lBREksc0RBQ0o7Ozt1RkRFTyxvQkFBb0I7Y0FOaEMsU0FBUzsyQkFDRSxvQkFBb0I7c0NBTVAsWUFBWTtrQkFBbEMsS0FBSzttQkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY3BheS1lcnJvci1iYW5uZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZXJyb3ItYmFubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZXJyb3ItYmFubmVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBFcnJvckJhbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgnZXJyb3JNZXNzYWdlJykgZXJyb3JNZXNzYWdlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlcIiBhcmlhLWxhYmVsbGVkYnk9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCIgcm9sZT1cImFsZXJ0XCIgdGFiaW5kZXg9XCItMVwiIGRhdGEtbW9kdWxlPVwiZ292dWstZXJyb3Itc3VtbWFyeVwiPlxuICA8aDIgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X190aXRsZSBnb3Z1ay1lcnJvci1zdW1tYXJ5X190aXRsZS1jdXN0b21cIiBpZD1cImVycm9yLXN1bW1hcnktdGl0bGVcIj5cbiAgICAgIHt7ZXJyb3JNZXNzYWdlLnRpdGxlfX1cbiAgPC9oMj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX2JvZHlcIj5cbiAgICA8dWwgY2xhc3M9XCJnb3Z1ay1saXN0IGdvdnVrLWVycm9yLXN1bW1hcnlfX2xpc3RcIj5cbiAgICAgIDxsaT5cbiAgICAgICAgICB7e2Vycm9yTWVzc2FnZS5ib2R5fX1cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9kaXY+XG48L2Rpdj4iXX0=