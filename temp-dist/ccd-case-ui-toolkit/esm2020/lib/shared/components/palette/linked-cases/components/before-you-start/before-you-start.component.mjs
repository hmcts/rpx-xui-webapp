import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LinkedCasesPages } from '../../enums';
import { LinkedCasesService } from '../../services/linked-cases.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../services/linked-cases.service";
import * as i3 from "@angular/common";
function BeforeYouStartComponent_div_1_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 5)(1, "span", 6);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.serverLinkedApiError.message, " ");
} }
function BeforeYouStartComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "h1", 1);
    i0.ɵɵtext(2, "There is a problem");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, BeforeYouStartComponent_div_1_p_3_Template, 4, 1, "p", 2);
    i0.ɵɵelementStart(4, "p", 3)(5, "a", 4);
    i0.ɵɵlistener("click", function BeforeYouStartComponent_div_1_Template_a_click_5_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onBack()); });
    i0.ɵɵtext(6, "Go back to the Linked cases tab");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.serverLinkedApiError);
} }
function BeforeYouStartComponent_div_2_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11)(1, "p", 3);
    i0.ɵɵtext(2, "If a group of linked cases has a lead case, you must start from the lead case.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 3);
    i0.ɵɵtext(4, "If the cases to be linked has no lead, you can start the linking journey from any of those cases.");
    i0.ɵɵelementEnd()();
} }
function BeforeYouStartComponent_div_2_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "p", 3);
    i0.ɵɵtext(2, "If there are linked hearings for the case you need to un-link then you must unlink the hearing first.");
    i0.ɵɵelementEnd()();
} }
function BeforeYouStartComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "h1", 1);
    i0.ɵɵtext(2, "Before you start");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, BeforeYouStartComponent_div_2_div_3_Template, 5, 0, "div", 7);
    i0.ɵɵtemplate(4, BeforeYouStartComponent_div_2_div_4_Template, 3, 0, "div", 8);
    i0.ɵɵelementStart(5, "div", 9)(6, "button", 10);
    i0.ɵɵlistener("click", function BeforeYouStartComponent_div_2_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.onNext()); });
    i0.ɵɵtext(7, "Next");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.isLinkCasesJourney);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r1.isLinkCasesJourney);
} }
export class BeforeYouStartComponent {
    constructor(router, linkedCasesService) {
        this.router = router;
        this.linkedCasesService = linkedCasesService;
        this.linkedCasesStateEmitter = new EventEmitter();
        this.isLinkCasesJourney = false;
        this.isLinkCasesJourney = this.linkedCasesService.isLinkedCasesEventTrigger;
        this.serverLinkedApiError = this.linkedCasesService.serverLinkedApiError;
        // re-initiate the state based on the casefield value
        const linkedCaseRefereneIds = this.linkedCasesService.caseFieldValue.filter(item => item).map(item => item.id);
        this.linkedCasesService.linkedCases = this.linkedCasesService.linkedCases.filter(item => linkedCaseRefereneIds.indexOf(item.caseReference) !== -1);
        this.linkedCasesService.initialCaseLinks = this.linkedCasesService.linkedCases;
    }
    onNext() {
        this.linkedCasesStateEmitter.emit({
            currentLinkedCasesPage: LinkedCasesPages.BEFORE_YOU_START,
            errorMessages: this.errorMessages,
            navigateToNextPage: true
        });
    }
    onBack() {
        this.router.navigate(['cases', 'case-details', this.linkedCasesService.caseId], { fragment: 'Linked cases' });
    }
}
BeforeYouStartComponent.ɵfac = function BeforeYouStartComponent_Factory(t) { return new (t || BeforeYouStartComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.LinkedCasesService)); };
BeforeYouStartComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BeforeYouStartComponent, selectors: [["ccd-linked-cases-before-you-start"]], outputs: { linkedCasesStateEmitter: "linkedCasesStateEmitter" }, decls: 3, vars: 2, consts: [[4, "ngIf"], [1, "govuk-heading-xl"], ["id", "unlink-cases-error", "class", "govuk-error-message", 4, "ngIf"], [1, "govuk-body"], ["href", "javascript:void(0)", 1, "govuk-link", 3, "click"], ["id", "unlink-cases-error", 1, "govuk-error-message"], [1, "govuk-visually-hidden"], ["id", "link-cases-journey", 4, "ngIf"], ["id", "manage-link-cases-journey", 4, "ngIf"], [1, "govuk-button-group"], ["type", "button", "id", "next-button", 1, "button", "button-primary", 3, "click"], ["id", "link-cases-journey"], ["id", "manage-link-cases-journey"]], template: function BeforeYouStartComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, BeforeYouStartComponent_div_1_Template, 7, 1, "div", 0);
        i0.ɵɵtemplate(2, BeforeYouStartComponent_div_2_Template, 8, 2, "div", 0);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.serverLinkedApiError);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.serverLinkedApiError);
    } }, dependencies: [i3.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BeforeYouStartComponent, [{
        type: Component,
        args: [{ selector: 'ccd-linked-cases-before-you-start', template: "<div>\n  <div *ngIf=\"serverLinkedApiError\">\n    <h1 class=\"govuk-heading-xl\">There is a problem</h1>\n    <p id=\"unlink-cases-error\" class=\"govuk-error-message\" *ngIf=\"serverLinkedApiError\">\n      <span class=\"govuk-visually-hidden\">Error:</span> {{serverLinkedApiError.message}}\n    </p>\n    <p class=\"govuk-body\">\n      <a class=\"govuk-link\" href=\"javascript:void(0)\" (click)=\"onBack()\">Go back to the Linked cases tab</a>\n    </p>\n  </div>\n  <div *ngIf=\"!serverLinkedApiError\">\n    <h1 class=\"govuk-heading-xl\">Before you start</h1>\n    <div id=\"link-cases-journey\" *ngIf=\"isLinkCasesJourney\">\n      <p class=\"govuk-body\">If a group of linked cases has a lead case, you must start from the lead case.</p>\n      <p class=\"govuk-body\">If the cases to be linked has no lead, you can start the linking journey from any of those\n        cases.</p>\n    </div>\n    <div id=\"manage-link-cases-journey\" *ngIf=\"!isLinkCasesJourney\">\n      <p class=\"govuk-body\">If there are linked hearings for the case you need to un-link then you must unlink the\n        hearing first.</p>\n    </div>\n    <div class=\"govuk-button-group\">\n      <button class=\"button button-primary\" type=\"button\" id=\"next-button\" (click)=\"onNext()\">Next</button>\n    </div>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i1.Router }, { type: i2.LinkedCasesService }]; }, { linkedCasesStateEmitter: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVmb3JlLXlvdS1zdGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9saW5rZWQtY2FzZXMvY29tcG9uZW50cy9iZWZvcmUteW91LXN0YXJ0L2JlZm9yZS15b3Utc3RhcnQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbGlua2VkLWNhc2VzL2NvbXBvbmVudHMvYmVmb3JlLXlvdS1zdGFydC9iZWZvcmUteW91LXN0YXJ0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7Ozs7SUNGckUsNEJBQW9GLGNBQUE7SUFDOUMsc0JBQU07SUFBQSxpQkFBTztJQUFDLFlBQ3BEO0lBQUEsaUJBQUk7OztJQURnRCxlQUNwRDtJQURvRCxvRUFDcEQ7Ozs7SUFKRiwyQkFBa0MsWUFBQTtJQUNILGtDQUFrQjtJQUFBLGlCQUFLO0lBQ3BELDBFQUVJO0lBQ0osNEJBQXNCLFdBQUE7SUFDNEIsK0pBQVMsZUFBQSxlQUFRLENBQUEsSUFBQztJQUFDLCtDQUErQjtJQUFBLGlCQUFJLEVBQUEsRUFBQTs7O0lBSmhELGVBQTBCO0lBQTFCLGtEQUEwQjs7O0lBU2xGLCtCQUF3RCxXQUFBO0lBQ2hDLDhGQUE4RTtJQUFBLGlCQUFJO0lBQ3hHLDRCQUFzQjtJQUFBLGlIQUNkO0lBQUEsaUJBQUksRUFBQTs7O0lBRWQsK0JBQWdFLFdBQUE7SUFDeEMscUhBQ047SUFBQSxpQkFBSSxFQUFBOzs7O0lBVHhCLDJCQUFtQyxZQUFBO0lBQ0osZ0NBQWdCO0lBQUEsaUJBQUs7SUFDbEQsOEVBSU07SUFDTiw4RUFHTTtJQUNOLDhCQUFnQyxpQkFBQTtJQUN1QyxvS0FBUyxlQUFBLGVBQVEsQ0FBQSxJQUFDO0lBQUMsb0JBQUk7SUFBQSxpQkFBUyxFQUFBLEVBQUE7OztJQVZ6RSxlQUF3QjtJQUF4QixnREFBd0I7SUFLakIsZUFBeUI7SUFBekIsaURBQXlCOztBRE5sRSxNQUFNLE9BQU8sdUJBQXVCO0lBU2xDLFlBQTZCLE1BQWMsRUFDeEIsa0JBQXNDO1FBRDVCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDeEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQVBsRCw0QkFBdUIsR0FBbUMsSUFBSSxZQUFZLEVBQW9CLENBQUM7UUFFL0YsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBTWhDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMseUJBQXlCLENBQUM7UUFDNUUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQztRQUN6RSxxREFBcUQ7UUFDckQsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUM3QyxJQUFJLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztJQUNqRixDQUFDO0lBRU0sTUFBTTtRQUNYLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUM7WUFDaEMsc0JBQXNCLEVBQUUsZ0JBQWdCLENBQUMsZ0JBQWdCO1lBQ3pELGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxrQkFBa0IsRUFBRSxJQUFJO1NBQ3pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQ2hILENBQUM7OzhGQTlCVSx1QkFBdUI7MEVBQXZCLHVCQUF1QjtRQ1hwQywyQkFBSztRQUNILHdFQVFNO1FBQ04sd0VBY007UUFDUixpQkFBTTs7UUF4QkUsZUFBMEI7UUFBMUIsK0NBQTBCO1FBUzFCLGVBQTJCO1FBQTNCLGdEQUEyQjs7dUZEQ3RCLHVCQUF1QjtjQUpuQyxTQUFTOzJCQUNFLG1DQUFtQzswRkFNdEMsdUJBQXVCO2tCQUQ3QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZG9tYWluJztcbmltcG9ydCB7IExpbmtlZENhc2VzU3RhdGUgfSBmcm9tICcuLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgTGlua2VkQ2FzZXNQYWdlcyB9IGZyb20gJy4uLy4uL2VudW1zJztcbmltcG9ydCB7IExpbmtlZENhc2VzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xpbmtlZC1jYXNlcy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWxpbmtlZC1jYXNlcy1iZWZvcmUteW91LXN0YXJ0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2JlZm9yZS15b3Utc3RhcnQuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEJlZm9yZVlvdVN0YXJ0Q29tcG9uZW50IHtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIGxpbmtlZENhc2VzU3RhdGVFbWl0dGVyOiBFdmVudEVtaXR0ZXI8TGlua2VkQ2FzZXNTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPExpbmtlZENhc2VzU3RhdGU+KCk7XG5cbiAgcHVibGljIGlzTGlua0Nhc2VzSm91cm5leSA9IGZhbHNlO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlczogRXJyb3JNZXNzYWdlW107XG4gIHB1YmxpYyBzZXJ2ZXJMaW5rZWRBcGlFcnJvcjogeyBpZDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGlua2VkQ2FzZXNTZXJ2aWNlOiBMaW5rZWRDYXNlc1NlcnZpY2UpIHtcbiAgICB0aGlzLmlzTGlua0Nhc2VzSm91cm5leSA9IHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmlzTGlua2VkQ2FzZXNFdmVudFRyaWdnZXI7XG4gICAgdGhpcy5zZXJ2ZXJMaW5rZWRBcGlFcnJvciA9IHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLnNlcnZlckxpbmtlZEFwaUVycm9yO1xuICAgIC8vIHJlLWluaXRpYXRlIHRoZSBzdGF0ZSBiYXNlZCBvbiB0aGUgY2FzZWZpZWxkIHZhbHVlXG4gICAgY29uc3QgbGlua2VkQ2FzZVJlZmVyZW5lSWRzID0gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuY2FzZUZpZWxkVmFsdWUuZmlsdGVyKGl0ZW0gPT4gaXRlbSkubWFwKGl0ZW0gPT4gaXRlbS5pZCk7XG4gICAgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UubGlua2VkQ2FzZXMgPSB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5saW5rZWRDYXNlcy5maWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW0gPT4gbGlua2VkQ2FzZVJlZmVyZW5lSWRzLmluZGV4T2YoaXRlbS5jYXNlUmVmZXJlbmNlKSAhPT0gLTEpO1xuICAgIHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmluaXRpYWxDYXNlTGlua3MgPSB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5saW5rZWRDYXNlcztcbiAgfVxuXG4gIHB1YmxpYyBvbk5leHQoKTogdm9pZCB7XG4gICAgdGhpcy5saW5rZWRDYXNlc1N0YXRlRW1pdHRlci5lbWl0KHtcbiAgICAgIGN1cnJlbnRMaW5rZWRDYXNlc1BhZ2U6IExpbmtlZENhc2VzUGFnZXMuQkVGT1JFX1lPVV9TVEFSVCxcbiAgICAgIGVycm9yTWVzc2FnZXM6IHRoaXMuZXJyb3JNZXNzYWdlcyxcbiAgICAgIG5hdmlnYXRlVG9OZXh0UGFnZTogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uQmFjaygpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2Nhc2VzJywgJ2Nhc2UtZGV0YWlscycsIHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmNhc2VJZF0sIHsgZnJhZ21lbnQ6ICdMaW5rZWQgY2FzZXMnIH0pO1xuICB9XG59XG4iLCI8ZGl2PlxuICA8ZGl2ICpuZ0lmPVwic2VydmVyTGlua2VkQXBpRXJyb3JcIj5cbiAgICA8aDEgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLXhsXCI+VGhlcmUgaXMgYSBwcm9ibGVtPC9oMT5cbiAgICA8cCBpZD1cInVubGluay1jYXNlcy1lcnJvclwiIGNsYXNzPVwiZ292dWstZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwic2VydmVyTGlua2VkQXBpRXJyb3JcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstdmlzdWFsbHktaGlkZGVuXCI+RXJyb3I6PC9zcGFuPiB7e3NlcnZlckxpbmtlZEFwaUVycm9yLm1lc3NhZ2V9fVxuICAgIDwvcD5cbiAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5cbiAgICAgIDxhIGNsYXNzPVwiZ292dWstbGlua1wiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwib25CYWNrKClcIj5HbyBiYWNrIHRvIHRoZSBMaW5rZWQgY2FzZXMgdGFiPC9hPlxuICAgIDwvcD5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCIhc2VydmVyTGlua2VkQXBpRXJyb3JcIj5cbiAgICA8aDEgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLXhsXCI+QmVmb3JlIHlvdSBzdGFydDwvaDE+XG4gICAgPGRpdiBpZD1cImxpbmstY2FzZXMtam91cm5leVwiICpuZ0lmPVwiaXNMaW5rQ2FzZXNKb3VybmV5XCI+XG4gICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5JZiBhIGdyb3VwIG9mIGxpbmtlZCBjYXNlcyBoYXMgYSBsZWFkIGNhc2UsIHlvdSBtdXN0IHN0YXJ0IGZyb20gdGhlIGxlYWQgY2FzZS48L3A+XG4gICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5JZiB0aGUgY2FzZXMgdG8gYmUgbGlua2VkIGhhcyBubyBsZWFkLCB5b3UgY2FuIHN0YXJ0IHRoZSBsaW5raW5nIGpvdXJuZXkgZnJvbSBhbnkgb2YgdGhvc2VcbiAgICAgICAgY2FzZXMuPC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgaWQ9XCJtYW5hZ2UtbGluay1jYXNlcy1qb3VybmV5XCIgKm5nSWY9XCIhaXNMaW5rQ2FzZXNKb3VybmV5XCI+XG4gICAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj5JZiB0aGVyZSBhcmUgbGlua2VkIGhlYXJpbmdzIGZvciB0aGUgY2FzZSB5b3UgbmVlZCB0byB1bi1saW5rIHRoZW4geW91IG11c3QgdW5saW5rIHRoZVxuICAgICAgICBoZWFyaW5nIGZpcnN0LjwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIGlkPVwibmV4dC1idXR0b25cIiAoY2xpY2spPVwib25OZXh0KClcIj5OZXh0PC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=