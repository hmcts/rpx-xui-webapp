import { Component, Inject } from '@angular/core';
import { CaseEventCompletionComponent, COMPONENT_PORTAL_INJECTION_TOKEN } from '../../case-event-completion.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "rpx-xui-translation";
import * as i3 from "../../case-event-completion.component";
const _c0 = function (a3) { return ["/", "cases", "case-details", a3, "tasks"]; };
export class CaseEventCompletionTaskCancelledComponent {
    constructor(parentComponent) {
        this.parentComponent = parentComponent;
        this.caseId = this.parentComponent.context.caseId;
    }
    onContinue() {
        // Emit event can be completed event
        this.parentComponent.eventCanBeCompleted.emit(true);
    }
}
CaseEventCompletionTaskCancelledComponent.ɵfac = function CaseEventCompletionTaskCancelledComponent_Factory(t) { return new (t || CaseEventCompletionTaskCancelledComponent)(i0.ɵɵdirectiveInject(COMPONENT_PORTAL_INJECTION_TOKEN)); };
CaseEventCompletionTaskCancelledComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseEventCompletionTaskCancelledComponent, selectors: [["app-case-event-completion-task-cancelled"]], decls: 31, vars: 27, consts: [[1, "govuk-!-margin-9"], ["aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "error-summary", 1, "govuk-error-summary"], ["id", "error-summary-title", 1, "govuk-error-summary__title"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"], ["href", "#"], [1, "govuk-form-group", "govuk-form-group--error"], [1, "govuk-heading-m"], [1, "form-group", "form-group-related"], ["data-module", "govuk-button", 1, "govuk-button", "govuk-!-margin-right-2", 3, "click"], ["data-module", "govuk-button", 1, "govuk-button", "govuk-button--secondary", 3, "routerLink"]], template: function CaseEventCompletionTaskCancelledComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        i0.ɵɵtext(3);
        i0.ɵɵpipe(4, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div", 3)(6, "ul", 4)(7, "li")(8, "a", 5);
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "rpxTranslate");
        i0.ɵɵelementEnd()()()()();
        i0.ɵɵelementStart(11, "div", 6)(12, "h2", 7);
        i0.ɵɵtext(13);
        i0.ɵɵpipe(14, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(15, "p");
        i0.ɵɵtext(16);
        i0.ɵɵpipe(17, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "p");
        i0.ɵɵtext(19);
        i0.ɵɵpipe(20, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "p");
        i0.ɵɵtext(22);
        i0.ɵɵpipe(23, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "div", 8)(25, "button", 9);
        i0.ɵɵlistener("click", function CaseEventCompletionTaskCancelledComponent_Template_button_click_25_listener() { return ctx.onContinue(); });
        i0.ɵɵtext(26);
        i0.ɵɵpipe(27, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "a", 10);
        i0.ɵɵtext(29);
        i0.ɵɵpipe(30, "rpxTranslate");
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 9, "There is a problem"), " ");
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 11, "Task cancelled/marked as done"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 13, "Task cancelled/marked as done"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 15, "This task has been cancelled or marked as done."));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 17, "Click Continue to complete the event and save your progress."));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 19, "Alternatively, click Cancel to return to the tasks tab without saving your progress."));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(27, 21, "Continue"), " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(25, _c0, ctx.caseId));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(30, 23, "Cancel"), " ");
    } }, dependencies: [i1.RouterLink, i2.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseEventCompletionTaskCancelledComponent, [{
        type: Component,
        args: [{ selector: 'app-case-event-completion-task-cancelled', template: "<div class=\"govuk-!-margin-9\">\n  <div class=\"govuk-error-summary\" aria-labelledby=\"error-summary-title\" role=\"alert\" tabindex=\"-1\" data-module=\"error-summary\">\n    <h2 class=\"govuk-error-summary__title\" id=\"error-summary-title\">\n      {{'There is a problem' | rpxTranslate}}\n    </h2>\n    <div class=\"govuk-error-summary__body\">\n      <ul class=\"govuk-list govuk-error-summary__list\">\n        <li>\n          <a href=\"#\">{{'Task cancelled/marked as done' | rpxTranslate}}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"govuk-form-group govuk-form-group--error\">\n    <h2 class=\"govuk-heading-m\">{{'Task cancelled/marked as done' | rpxTranslate}}</h2>\n    <p>{{'This task has been cancelled or marked as done.' | rpxTranslate}}</p>\n    <p>{{'Click Continue to complete the event and save your progress.' | rpxTranslate}}</p>\n\n    <p>{{'Alternatively, click Cancel to return to the tasks tab without saving your progress.' | rpxTranslate}}</p>\n\n    <div class=\"form-group form-group-related\">\n      <button class=\"govuk-button govuk-!-margin-right-2\" data-module=\"govuk-button\" (click)=\"onContinue()\">\n        {{'Continue' | rpxTranslate}}\n      </button>\n      <a [routerLink]=\"['/', 'cases', 'case-details', caseId, 'tasks']\"\n              class=\"govuk-button govuk-button--secondary\" data-module=\"govuk-button\">\n        {{'Cancel' | rpxTranslate}}\n      </a>\n    </div>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i3.CaseEventCompletionComponent, decorators: [{
                type: Inject,
                args: [COMPONENT_PORTAL_INJECTION_TOKEN]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1ldmVudC1jb21wbGV0aW9uLXRhc2stY2FuY2VsbGVkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWV2ZW50LWNvbXBsZXRpb24vY29tcG9uZW50cy9jYXNlLWV2ZW50LWNvbXBsZXRpb24tdGFzay1jYW5jZWxsZWQvY2FzZS1ldmVudC1jb21wbGV0aW9uLXRhc2stY2FuY2VsbGVkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWV2ZW50LWNvbXBsZXRpb24vY29tcG9uZW50cy9jYXNlLWV2ZW50LWNvbXBsZXRpb24tdGFzay1jYW5jZWxsZWQvY2FzZS1ldmVudC1jb21wbGV0aW9uLXRhc2stY2FuY2VsbGVkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLGdDQUFnQyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7Ozs7OztBQU12SCxNQUFNLE9BQU8seUNBQXlDO0lBR3BELFlBQXVFLGVBQTZDO1FBQTdDLG9CQUFlLEdBQWYsZUFBZSxDQUE4QjtRQUNsSCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUNwRCxDQUFDO0lBRU0sVUFBVTtRQUNmLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDOztrSUFWVSx5Q0FBeUMsdUJBR2hDLGdDQUFnQzs0RkFIekMseUNBQXlDO1FDUHRELDhCQUE4QixhQUFBLFlBQUE7UUFHeEIsWUFDRjs7UUFBQSxpQkFBSztRQUNMLDhCQUF1QyxZQUFBLFNBQUEsV0FBQTtRQUdyQixZQUFrRDs7UUFBQSxpQkFBSSxFQUFBLEVBQUEsRUFBQSxFQUFBO1FBTTFFLCtCQUFzRCxhQUFBO1FBQ3hCLGFBQWtEOztRQUFBLGlCQUFLO1FBQ25GLDBCQUFHO1FBQUEsYUFBb0U7O1FBQUEsaUJBQUk7UUFDM0UsMEJBQUc7UUFBQSxhQUFpRjs7UUFBQSxpQkFBSTtRQUV4RiwwQkFBRztRQUFBLGFBQXlHOztRQUFBLGlCQUFJO1FBRWhILCtCQUEyQyxpQkFBQTtRQUNzQyx1SEFBUyxnQkFBWSxJQUFDO1FBQ25HLGFBQ0Y7O1FBQUEsaUJBQVM7UUFDVCw4QkFDZ0Y7UUFDOUUsYUFDRjs7UUFBQSxpQkFBSSxFQUFBLEVBQUEsRUFBQTs7UUF6QkosZUFDRjtRQURFLDJFQUNGO1FBSWtCLGVBQWtEO1FBQWxELDZFQUFrRDtRQU94QyxlQUFrRDtRQUFsRCw2RUFBa0Q7UUFDM0UsZUFBb0U7UUFBcEUsK0ZBQW9FO1FBQ3BFLGVBQWlGO1FBQWpGLDRHQUFpRjtRQUVqRixlQUF5RztRQUF6RyxvSUFBeUc7UUFJeEcsZUFDRjtRQURFLG1FQUNGO1FBQ0csZUFBOEQ7UUFBOUQsb0VBQThEO1FBRS9ELGVBQ0Y7UUFERSxpRUFDRjs7dUZEckJPLHlDQUF5QztjQUpyRCxTQUFTOzJCQUNFLDBDQUEwQzs7c0JBTXZDLE1BQU07dUJBQUMsZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhc2VFdmVudENvbXBsZXRpb25Db21wb25lbnQsIENPTVBPTkVOVF9QT1JUQUxfSU5KRUNUSU9OX1RPS0VOIH0gZnJvbSAnLi4vLi4vY2FzZS1ldmVudC1jb21wbGV0aW9uLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1jYXNlLWV2ZW50LWNvbXBsZXRpb24tdGFzay1jYW5jZWxsZWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FzZS1ldmVudC1jb21wbGV0aW9uLXRhc2stY2FuY2VsbGVkLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENhc2VFdmVudENvbXBsZXRpb25UYXNrQ2FuY2VsbGVkQ29tcG9uZW50IHtcbiAgcHVibGljIGNhc2VJZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQ09NUE9ORU5UX1BPUlRBTF9JTkpFQ1RJT05fVE9LRU4pIHByaXZhdGUgcmVhZG9ubHkgcGFyZW50Q29tcG9uZW50OiBDYXNlRXZlbnRDb21wbGV0aW9uQ29tcG9uZW50KSB7XG4gICAgdGhpcy5jYXNlSWQgPSB0aGlzLnBhcmVudENvbXBvbmVudC5jb250ZXh0LmNhc2VJZDtcbiAgfVxuXG4gIHB1YmxpYyBvbkNvbnRpbnVlKCk6IHZvaWQge1xuICAgIC8vIEVtaXQgZXZlbnQgY2FuIGJlIGNvbXBsZXRlZCBldmVudFxuICAgIHRoaXMucGFyZW50Q29tcG9uZW50LmV2ZW50Q2FuQmVDb21wbGV0ZWQuZW1pdCh0cnVlKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImdvdnVrLSEtbWFyZ2luLTlcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlcIiBhcmlhLWxhYmVsbGVkYnk9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCIgcm9sZT1cImFsZXJ0XCIgdGFiaW5kZXg9XCItMVwiIGRhdGEtbW9kdWxlPVwiZXJyb3Itc3VtbWFyeVwiPlxuICAgIDxoMiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX3RpdGxlXCIgaWQ9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCI+XG4gICAgICB7eydUaGVyZSBpcyBhIHByb2JsZW0nIHwgcnB4VHJhbnNsYXRlfX1cbiAgICA8L2gyPlxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X19ib2R5XCI+XG4gICAgICA8dWwgY2xhc3M9XCJnb3Z1ay1saXN0IGdvdnVrLWVycm9yLXN1bW1hcnlfX2xpc3RcIj5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIDxhIGhyZWY9XCIjXCI+e3snVGFzayBjYW5jZWxsZWQvbWFya2VkIGFzIGRvbmUnIHwgcnB4VHJhbnNsYXRlfX08L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cCBnb3Z1ay1mb3JtLWdyb3VwLS1lcnJvclwiPlxuICAgIDxoMiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbVwiPnt7J1Rhc2sgY2FuY2VsbGVkL21hcmtlZCBhcyBkb25lJyB8IHJweFRyYW5zbGF0ZX19PC9oMj5cbiAgICA8cD57eydUaGlzIHRhc2sgaGFzIGJlZW4gY2FuY2VsbGVkIG9yIG1hcmtlZCBhcyBkb25lLicgfCBycHhUcmFuc2xhdGV9fTwvcD5cbiAgICA8cD57eydDbGljayBDb250aW51ZSB0byBjb21wbGV0ZSB0aGUgZXZlbnQgYW5kIHNhdmUgeW91ciBwcm9ncmVzcy4nIHwgcnB4VHJhbnNsYXRlfX08L3A+XG5cbiAgICA8cD57eydBbHRlcm5hdGl2ZWx5LCBjbGljayBDYW5jZWwgdG8gcmV0dXJuIHRvIHRoZSB0YXNrcyB0YWIgd2l0aG91dCBzYXZpbmcgeW91ciBwcm9ncmVzcy4nIHwgcnB4VHJhbnNsYXRlfX08L3A+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBmb3JtLWdyb3VwLXJlbGF0ZWRcIj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstIS1tYXJnaW4tcmlnaHQtMlwiIGRhdGEtbW9kdWxlPVwiZ292dWstYnV0dG9uXCIgKGNsaWNrKT1cIm9uQ29udGludWUoKVwiPlxuICAgICAgICB7eydDb250aW51ZScgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9idXR0b24+XG4gICAgICA8YSBbcm91dGVyTGlua109XCJbJy8nLCAnY2FzZXMnLCAnY2FzZS1kZXRhaWxzJywgY2FzZUlkLCAndGFza3MnXVwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiZ292dWstYnV0dG9uIGdvdnVrLWJ1dHRvbi0tc2Vjb25kYXJ5XCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj5cbiAgICAgICAge3snQ2FuY2VsJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgICA8L2E+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=