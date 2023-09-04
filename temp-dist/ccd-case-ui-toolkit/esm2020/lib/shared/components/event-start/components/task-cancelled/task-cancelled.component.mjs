import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "rpx-xui-translation";
const _c0 = function (a3) { return ["/", "cases", "case-details", a3, "tasks"]; };
export class TaskCancelledComponent {
}
TaskCancelledComponent.ɵfac = function TaskCancelledComponent_Factory(t) { return new (t || TaskCancelledComponent)(); };
TaskCancelledComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TaskCancelledComponent, selectors: [["app-task-cancelled"]], inputs: { caseId: "caseId" }, decls: 31, vars: 27, consts: [[1, "govuk-!-margin-9"], ["aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "error-summary", 1, "govuk-error-summary"], ["id", "error-summary-title", 1, "govuk-error-summary__title"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"], ["href", "#"], [1, "govuk-form-group", "govuk-form-group--error"], [1, "govuk-heading-m"], [1, "form-group", "form-group-related"], ["type", "submit", "data-module", "govuk-button", 1, "govuk-button", "govuk-!-margin-right-2"], ["data-module", "govuk-button", 1, "govuk-button", "govuk-button--secondary", 3, "routerLink"]], template: function TaskCancelledComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 17, "Click Continue to complete the task and save your progress."));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 19, "Alternatively, click Cancel to return to the tasks tab without saving your progress."));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(27, 21, "Continue"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(25, _c0, ctx.caseId));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(30, 23, "Cancel"));
    } }, dependencies: [i1.RouterLink, i2.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TaskCancelledComponent, [{
        type: Component,
        args: [{ selector: 'app-task-cancelled', template: "<div class=\"govuk-!-margin-9\">\n  <div class=\"govuk-error-summary\" aria-labelledby=\"error-summary-title\" role=\"alert\" tabindex=\"-1\" data-module=\"error-summary\">\n    <h2 class=\"govuk-error-summary__title\" id=\"error-summary-title\">\n      {{'There is a problem' | rpxTranslate}}\n    </h2>\n    <div class=\"govuk-error-summary__body\">\n      <ul class=\"govuk-list govuk-error-summary__list\">\n        <li>\n          <a href=\"#\">{{'Task cancelled/marked as done' | rpxTranslate}}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"govuk-form-group govuk-form-group--error\">\n    <h2 class=\"govuk-heading-m\">{{'Task cancelled/marked as done' | rpxTranslate}}</h2>\n\n    <p>{{'This task has been cancelled or marked as done.' | rpxTranslate}}</p>\n\n    <p>{{'Click Continue to complete the task and save your progress.' | rpxTranslate}}</p>\n\n    <p>{{'Alternatively, click Cancel to return to the tasks tab without saving your progress.' | rpxTranslate}}</p>\n\n    <div class=\"form-group form-group-related\">\n      <button type=\"submit\" class=\"govuk-button govuk-!-margin-right-2\" data-module=\"govuk-button\">{{'Continue' | rpxTranslate}}</button>\n      <a  [routerLink]=\"['/', 'cases', 'case-details', caseId, 'tasks']\"\n              class=\"govuk-button govuk-button--secondary\" data-module=\"govuk-button\">{{'Cancel' | rpxTranslate}}</a>\n    </div>\n  </div>\n</div>\n" }]
    }], null, { caseId: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay1jYW5jZWxsZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2V2ZW50LXN0YXJ0L2NvbXBvbmVudHMvdGFzay1jYW5jZWxsZWQvdGFzay1jYW5jZWxsZWQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2V2ZW50LXN0YXJ0L2NvbXBvbmVudHMvdGFzay1jYW5jZWxsZWQvdGFzay1jYW5jZWxsZWQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBTWpELE1BQU0sT0FBTyxzQkFBc0I7OzRGQUF0QixzQkFBc0I7eUVBQXRCLHNCQUFzQjtRQ05uQyw4QkFBOEIsYUFBQSxZQUFBO1FBR3hCLFlBQ0Y7O1FBQUEsaUJBQUs7UUFDTCw4QkFBdUMsWUFBQSxTQUFBLFdBQUE7UUFHckIsWUFBa0Q7O1FBQUEsaUJBQUksRUFBQSxFQUFBLEVBQUEsRUFBQTtRQU0xRSwrQkFBc0QsYUFBQTtRQUN4QixhQUFrRDs7UUFBQSxpQkFBSztRQUVuRiwwQkFBRztRQUFBLGFBQW9FOztRQUFBLGlCQUFJO1FBRTNFLDBCQUFHO1FBQUEsYUFBZ0Y7O1FBQUEsaUJBQUk7UUFFdkYsMEJBQUc7UUFBQSxhQUF5Rzs7UUFBQSxpQkFBSTtRQUVoSCwrQkFBMkMsaUJBQUE7UUFDb0QsYUFBNkI7O1FBQUEsaUJBQVM7UUFDbkksOEJBQ2dGO1FBQUEsYUFBMkI7O1FBQUEsaUJBQUksRUFBQSxFQUFBLEVBQUE7O1FBdkIvRyxlQUNGO1FBREUsMkVBQ0Y7UUFJa0IsZUFBa0Q7UUFBbEQsNkVBQWtEO1FBT3hDLGVBQWtEO1FBQWxELDZFQUFrRDtRQUUzRSxlQUFvRTtRQUFwRSwrRkFBb0U7UUFFcEUsZUFBZ0Y7UUFBaEYsMkdBQWdGO1FBRWhGLGVBQXlHO1FBQXpHLG9JQUF5RztRQUdiLGVBQTZCO1FBQTdCLHdEQUE2QjtRQUN0SCxlQUE4RDtRQUE5RCxvRUFBOEQ7UUFDYyxlQUEyQjtRQUEzQixzREFBMkI7O3VGRHBCcEcsc0JBQXNCO2NBSmxDLFNBQVM7MkJBQ0Usb0JBQW9CO2dCQUlkLE1BQU07a0JBQXJCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC10YXNrLWNhbmNlbGxlZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90YXNrLWNhbmNlbGxlZC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgVGFza0NhbmNlbGxlZENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBjYXNlSWQ6IHN0cmluZztcbn1cbiIsIjxkaXYgY2xhc3M9XCJnb3Z1ay0hLW1hcmdpbi05XCI+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXJyb3Itc3VtbWFyeS10aXRsZVwiIHJvbGU9XCJhbGVydFwiIHRhYmluZGV4PVwiLTFcIiBkYXRhLW1vZHVsZT1cImVycm9yLXN1bW1hcnlcIj5cbiAgICA8aDIgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X190aXRsZVwiIGlkPVwiZXJyb3Itc3VtbWFyeS10aXRsZVwiPlxuICAgICAge3snVGhlcmUgaXMgYSBwcm9ibGVtJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgPC9oMj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fYm9keVwiPlxuICAgICAgPHVsIGNsYXNzPVwiZ292dWstbGlzdCBnb3Z1ay1lcnJvci1zdW1tYXJ5X19saXN0XCI+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICA8YSBocmVmPVwiI1wiPnt7J1Rhc2sgY2FuY2VsbGVkL21hcmtlZCBhcyBkb25lJyB8IHJweFRyYW5zbGF0ZX19PC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXAgZ292dWstZm9ybS1ncm91cC0tZXJyb3JcIj5cbiAgICA8aDIgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLW1cIj57eydUYXNrIGNhbmNlbGxlZC9tYXJrZWQgYXMgZG9uZScgfCBycHhUcmFuc2xhdGV9fTwvaDI+XG5cbiAgICA8cD57eydUaGlzIHRhc2sgaGFzIGJlZW4gY2FuY2VsbGVkIG9yIG1hcmtlZCBhcyBkb25lLicgfCBycHhUcmFuc2xhdGV9fTwvcD5cblxuICAgIDxwPnt7J0NsaWNrIENvbnRpbnVlIHRvIGNvbXBsZXRlIHRoZSB0YXNrIGFuZCBzYXZlIHlvdXIgcHJvZ3Jlc3MuJyB8IHJweFRyYW5zbGF0ZX19PC9wPlxuXG4gICAgPHA+e3snQWx0ZXJuYXRpdmVseSwgY2xpY2sgQ2FuY2VsIHRvIHJldHVybiB0byB0aGUgdGFza3MgdGFiIHdpdGhvdXQgc2F2aW5nIHlvdXIgcHJvZ3Jlc3MuJyB8IHJweFRyYW5zbGF0ZX19PC9wPlxuXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1yZWxhdGVkXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImdvdnVrLWJ1dHRvbiBnb3Z1ay0hLW1hcmdpbi1yaWdodC0yXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIj57eydDb250aW51ZScgfCBycHhUcmFuc2xhdGV9fTwvYnV0dG9uPlxuICAgICAgPGEgIFtyb3V0ZXJMaW5rXT1cIlsnLycsICdjYXNlcycsICdjYXNlLWRldGFpbHMnLCBjYXNlSWQsICd0YXNrcyddXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnlcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWJ1dHRvblwiPnt7J0NhbmNlbCcgfCBycHhUcmFuc2xhdGV9fTwvYT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==