import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "rpx-xui-translation";
const _c0 = function (a3) { return ["/", "cases", "case-details", a3, "tasks"]; };
export class TaskUnassignedComponent {
    constructor(route) {
        this.route = route;
        this.caseId = this.route.snapshot.data.case.case_id;
    }
}
TaskUnassignedComponent.ɵfac = function TaskUnassignedComponent_Factory(t) { return new (t || TaskUnassignedComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
TaskUnassignedComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TaskUnassignedComponent, selectors: [["app-task-unassigned"]], decls: 21, vars: 18, consts: [[1, "govuk-!-margin-9"], ["aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "error-summary", 1, "govuk-error-summary"], ["id", "error-summary-title", 1, "govuk-error-summary__title"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"], ["href", "#"], [1, "govuk-form-group", "govuk-form-group--error"], [1, "govuk-heading-m"], ["href", "javascript:void(0)", 3, "routerLink"]], template: function TaskUnassignedComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵelementStart(18, "a", 8);
        i0.ɵɵtext(19);
        i0.ɵɵpipe(20, "rpxTranslate");
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 6, "There is a problem"), " ");
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 8, "Task assignment required"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 10, "Task assignment required"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 12, "You must assign one of the available tasks from the task tab to continue with your work."));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(16, _c0, ctx.caseId));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(20, 14, "Return to tasks tab to assign a task"), " ");
    } }, dependencies: [i1.RouterLink, i2.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TaskUnassignedComponent, [{
        type: Component,
        args: [{ selector: 'app-task-unassigned', template: "<div class=\"govuk-!-margin-9\">\n  <div class=\"govuk-error-summary\" aria-labelledby=\"error-summary-title\" role=\"alert\" tabindex=\"-1\"\n    data-module=\"error-summary\">\n    <h2 class=\"govuk-error-summary__title\" id=\"error-summary-title\">\n      {{'There is a problem' | rpxTranslate}}\n    </h2>\n    <div class=\"govuk-error-summary__body\">\n      <ul class=\"govuk-list govuk-error-summary__list\">\n        <li>\n          <a href=\"#\">{{'Task assignment required' | rpxTranslate}}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"govuk-form-group govuk-form-group--error\">\n    <h2 class=\"govuk-heading-m\">{{'Task assignment required' | rpxTranslate}}</h2>\n\n    <p>{{'You must assign one of the available tasks from the task tab to continue with your work.' | rpxTranslate}}</p>\n\n    <a href=\"javascript:void(0)\" [routerLink]=\"['/', 'cases', 'case-details', caseId, 'tasks']\">\n      {{'Return to tasks tab to assign a task' | rpxTranslate}}\n    </a>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i1.ActivatedRoute }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay11bmFzc2lnbmVkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9ldmVudC1zdGFydC9jb21wb25lbnRzL3Rhc2stdW5hc3NpZ25lZC90YXNrLXVuYXNzaWduZWQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2V2ZW50LXN0YXJ0L2NvbXBvbmVudHMvdGFzay11bmFzc2lnbmVkL3Rhc2stdW5hc3NpZ25lZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFNakQsTUFBTSxPQUFPLHVCQUF1QjtJQUlsQyxZQUE2QixLQUFxQjtRQUFyQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNoRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RELENBQUM7OzhGQU5VLHVCQUF1QjswRUFBdkIsdUJBQXVCO1FDUHBDLDhCQUE4QixhQUFBLFlBQUE7UUFJeEIsWUFDRjs7UUFBQSxpQkFBSztRQUNMLDhCQUF1QyxZQUFBLFNBQUEsV0FBQTtRQUdyQixZQUE2Qzs7UUFBQSxpQkFBSSxFQUFBLEVBQUEsRUFBQSxFQUFBO1FBTXJFLCtCQUFzRCxhQUFBO1FBQ3hCLGFBQTZDOztRQUFBLGlCQUFLO1FBRTlFLDBCQUFHO1FBQUEsYUFBNkc7O1FBQUEsaUJBQUk7UUFFcEgsNkJBQTRGO1FBQzFGLGFBQ0Y7O1FBQUEsaUJBQUksRUFBQSxFQUFBOztRQWxCRixlQUNGO1FBREUsMkVBQ0Y7UUFJa0IsZUFBNkM7UUFBN0MsdUVBQTZDO1FBT25DLGVBQTZDO1FBQTdDLHdFQUE2QztRQUV0RSxlQUE2RztRQUE3Ryx3SUFBNkc7UUFFbkYsZUFBOEQ7UUFBOUQsb0VBQThEO1FBQ3pGLGVBQ0Y7UUFERSwrRkFDRjs7dUZEZlMsdUJBQXVCO2NBSm5DLFNBQVM7MkJBQ0UscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC10YXNrLXVuYXNzaWduZWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFzay11bmFzc2lnbmVkLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBUYXNrVW5hc3NpZ25lZENvbXBvbmVudCB7XG5cbiAgcHVibGljIGNhc2VJZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgdGhpcy5jYXNlSWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LmRhdGEuY2FzZS5jYXNlX2lkO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZ292dWstIS1tYXJnaW4tOVwiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeVwiIGFyaWEtbGFiZWxsZWRieT1cImVycm9yLXN1bW1hcnktdGl0bGVcIiByb2xlPVwiYWxlcnRcIiB0YWJpbmRleD1cIi0xXCJcbiAgICBkYXRhLW1vZHVsZT1cImVycm9yLXN1bW1hcnlcIj5cbiAgICA8aDIgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X190aXRsZVwiIGlkPVwiZXJyb3Itc3VtbWFyeS10aXRsZVwiPlxuICAgICAge3snVGhlcmUgaXMgYSBwcm9ibGVtJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgPC9oMj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fYm9keVwiPlxuICAgICAgPHVsIGNsYXNzPVwiZ292dWstbGlzdCBnb3Z1ay1lcnJvci1zdW1tYXJ5X19saXN0XCI+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICA8YSBocmVmPVwiI1wiPnt7J1Rhc2sgYXNzaWdubWVudCByZXF1aXJlZCcgfCBycHhUcmFuc2xhdGV9fTwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwIGdvdnVrLWZvcm0tZ3JvdXAtLWVycm9yXCI+XG4gICAgPGgyIGNsYXNzPVwiZ292dWstaGVhZGluZy1tXCI+e3snVGFzayBhc3NpZ25tZW50IHJlcXVpcmVkJyB8IHJweFRyYW5zbGF0ZX19PC9oMj5cblxuICAgIDxwPnt7J1lvdSBtdXN0IGFzc2lnbiBvbmUgb2YgdGhlIGF2YWlsYWJsZSB0YXNrcyBmcm9tIHRoZSB0YXNrIHRhYiB0byBjb250aW51ZSB3aXRoIHlvdXIgd29yay4nIHwgcnB4VHJhbnNsYXRlfX08L3A+XG5cbiAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgW3JvdXRlckxpbmtdPVwiWycvJywgJ2Nhc2VzJywgJ2Nhc2UtZGV0YWlscycsIGNhc2VJZCwgJ3Rhc2tzJ11cIj5cbiAgICAgIHt7J1JldHVybiB0byB0YXNrcyB0YWIgdG8gYXNzaWduIGEgdGFzaycgfCBycHhUcmFuc2xhdGV9fVxuICAgIDwvYT5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==