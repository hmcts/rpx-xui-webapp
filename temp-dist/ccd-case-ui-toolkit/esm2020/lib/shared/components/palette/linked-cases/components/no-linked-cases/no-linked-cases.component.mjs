import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LinkedCasesService } from '../../services/linked-cases.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../services/linked-cases.service";
import * as i3 from "@angular/common";
function NoLinkedCasesComponent_h1_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 9);
    i0.ɵɵtext(1, "There is a problem");
    i0.ɵɵelementEnd();
} }
function NoLinkedCasesComponent_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 10)(1, "span", 11);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.serverLinkedApiError.message, " ");
} }
function NoLinkedCasesComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 5);
    i0.ɵɵtext(1, "There are no cases linked to this one.");
    i0.ɵɵelementEnd();
} }
export class NoLinkedCasesComponent {
    constructor(router, linkedCasesService) {
        this.router = router;
        this.linkedCasesService = linkedCasesService;
    }
    ngOnInit() {
        this.serverLinkedApiError = this.linkedCasesService.serverLinkedApiError;
    }
    onBack() {
        this.router.navigate(['cases', 'case-details', this.linkedCasesService.caseId], { fragment: 'Linked cases' });
    }
}
NoLinkedCasesComponent.ɵfac = function NoLinkedCasesComponent_Factory(t) { return new (t || NoLinkedCasesComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.LinkedCasesService)); };
NoLinkedCasesComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NoLinkedCasesComponent, selectors: [["ccd-no-linked-cases"]], decls: 12, vars: 3, consts: [[1, "govuk-grid-row"], [1, "govuk-grid-column-full"], ["class", "govuk-heading-xl", 4, "ngIf"], ["id", "unlink-cases-error", "class", "govuk-error-message", 4, "ngIf", "ngIfElse"], ["noLinkedCases", ""], [1, "govuk-body"], ["href", "javascript:void(0)", 1, "govuk-link", 3, "click"], [1, "govuk-button-group"], ["type", "button", "id", "back-button", 1, "button", "button-primary", 3, "click"], [1, "govuk-heading-xl"], ["id", "unlink-cases-error", 1, "govuk-error-message"], [1, "govuk-visually-hidden"]], template: function NoLinkedCasesComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
        i0.ɵɵtemplate(2, NoLinkedCasesComponent_h1_2_Template, 2, 0, "h1", 2);
        i0.ɵɵtemplate(3, NoLinkedCasesComponent_p_3_Template, 4, 1, "p", 3);
        i0.ɵɵtemplate(4, NoLinkedCasesComponent_ng_template_4_Template, 2, 0, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementStart(6, "p", 5)(7, "a", 6);
        i0.ɵɵlistener("click", function NoLinkedCasesComponent_Template_a_click_7_listener() { return ctx.onBack(); });
        i0.ɵɵtext(8, "Go back to the Linked cases tab");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(9, "div", 7)(10, "button", 8);
        i0.ɵɵlistener("click", function NoLinkedCasesComponent_Template_button_click_10_listener() { return ctx.onBack(); });
        i0.ɵɵtext(11, "Back");
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        const _r2 = i0.ɵɵreference(5);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.serverLinkedApiError);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.serverLinkedApiError)("ngIfElse", _r2);
    } }, dependencies: [i3.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoLinkedCasesComponent, [{
        type: Component,
        args: [{ selector: 'ccd-no-linked-cases', template: "<div class=\"govuk-grid-row\">\n  <div class=\"govuk-grid-column-full\">\n    <h1 class=\"govuk-heading-xl\" *ngIf=\"serverLinkedApiError\">There is a problem</h1>\n    <p id=\"unlink-cases-error\" class=\"govuk-error-message\"\n      *ngIf=\"serverLinkedApiError;else noLinkedCases;\">\n      <span class=\"govuk-visually-hidden\">Error:</span> {{serverLinkedApiError.message}}\n    </p>\n    <ng-template #noLinkedCases>\n      <p class=\"govuk-body\">There are no cases linked to this one.</p>\n    </ng-template>\n    <p class=\"govuk-body\">\n      <a class=\"govuk-link\" href=\"javascript:void(0)\" (click)=\"onBack()\">Go back to the Linked cases tab</a>\n    </p>\n    <div class=\"govuk-button-group\">\n      <button class=\"button button-primary\" type=\"button\" id=\"back-button\" (click)=\"onBack()\">Back</button>\n    </div>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i1.Router }, { type: i2.LinkedCasesService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tbGlua2VkLWNhc2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2xpbmtlZC1jYXNlcy9jb21wb25lbnRzL25vLWxpbmtlZC1jYXNlcy9uby1saW5rZWQtY2FzZXMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbGlua2VkLWNhc2VzL2NvbXBvbmVudHMvbm8tbGlua2VkLWNhc2VzL25vLWxpbmtlZC1jYXNlcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7O0lDQXJFLDZCQUEwRDtJQUFBLGtDQUFrQjtJQUFBLGlCQUFLOzs7SUFDakYsNkJBQ21ELGVBQUE7SUFDYixzQkFBTTtJQUFBLGlCQUFPO0lBQUMsWUFDcEQ7SUFBQSxpQkFBSTs7O0lBRGdELGVBQ3BEO0lBRG9ELG9FQUNwRDs7O0lBRUUsNEJBQXNCO0lBQUEsc0RBQXNDO0lBQUEsaUJBQUk7O0FEQXRFLE1BQU0sT0FBTyxzQkFBc0I7SUFJakMsWUFBNkIsTUFBYyxFQUN4QixrQkFBc0M7UUFENUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN4Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQ3pELENBQUM7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQztJQUMzRSxDQUFDO0lBRU0sTUFBTTtRQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUNoSCxDQUFDOzs0RkFkVSxzQkFBc0I7eUVBQXRCLHNCQUFzQjtRQ1JuQyw4QkFBNEIsYUFBQTtRQUV4QixxRUFBaUY7UUFDakYsbUVBR0k7UUFDSix3SEFFYztRQUNkLDRCQUFzQixXQUFBO1FBQzRCLDhGQUFTLFlBQVEsSUFBQztRQUFDLCtDQUErQjtRQUFBLGlCQUFJLEVBQUE7UUFFeEcsOEJBQWdDLGlCQUFBO1FBQ3VDLG9HQUFTLFlBQVEsSUFBQztRQUFDLHFCQUFJO1FBQUEsaUJBQVMsRUFBQSxFQUFBLEVBQUE7OztRQVp6RSxlQUEwQjtRQUExQiwrQ0FBMEI7UUFFckQsZUFBMkI7UUFBM0IsK0NBQTJCLGlCQUFBOzt1RkRJckIsc0JBQXNCO2NBSmxDLFNBQVM7MkJBQ0UscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBMaW5rZWRDYXNlc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9saW5rZWQtY2FzZXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1uby1saW5rZWQtY2FzZXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vbm8tbGlua2VkLWNhc2VzLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBOb0xpbmtlZENhc2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgc2VydmVyTGlua2VkQXBpRXJyb3I6IHsgaWQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxpbmtlZENhc2VzU2VydmljZTogTGlua2VkQ2FzZXNTZXJ2aWNlKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXJ2ZXJMaW5rZWRBcGlFcnJvciA9IHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLnNlcnZlckxpbmtlZEFwaUVycm9yO1xuICB9XG5cbiAgcHVibGljIG9uQmFjaygpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2Nhc2VzJywgJ2Nhc2UtZGV0YWlscycsIHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmNhc2VJZF0sIHsgZnJhZ21lbnQ6ICdMaW5rZWQgY2FzZXMnIH0pO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1yb3dcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGxcIj5cbiAgICA8aDEgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLXhsXCIgKm5nSWY9XCJzZXJ2ZXJMaW5rZWRBcGlFcnJvclwiPlRoZXJlIGlzIGEgcHJvYmxlbTwvaDE+XG4gICAgPHAgaWQ9XCJ1bmxpbmstY2FzZXMtZXJyb3JcIiBjbGFzcz1cImdvdnVrLWVycm9yLW1lc3NhZ2VcIlxuICAgICAgKm5nSWY9XCJzZXJ2ZXJMaW5rZWRBcGlFcnJvcjtlbHNlIG5vTGlua2VkQ2FzZXM7XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXZpc3VhbGx5LWhpZGRlblwiPkVycm9yOjwvc3Bhbj4ge3tzZXJ2ZXJMaW5rZWRBcGlFcnJvci5tZXNzYWdlfX1cbiAgICA8L3A+XG4gICAgPG5nLXRlbXBsYXRlICNub0xpbmtlZENhc2VzPlxuICAgICAgPHAgY2xhc3M9XCJnb3Z1ay1ib2R5XCI+VGhlcmUgYXJlIG5vIGNhc2VzIGxpbmtlZCB0byB0aGlzIG9uZS48L3A+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5cbiAgICAgIDxhIGNsYXNzPVwiZ292dWstbGlua1wiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwib25CYWNrKClcIj5HbyBiYWNrIHRvIHRoZSBMaW5rZWQgY2FzZXMgdGFiPC9hPlxuICAgIDwvcD5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIGlkPVwiYmFjay1idXR0b25cIiAoY2xpY2spPVwib25CYWNrKClcIj5CYWNrPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=