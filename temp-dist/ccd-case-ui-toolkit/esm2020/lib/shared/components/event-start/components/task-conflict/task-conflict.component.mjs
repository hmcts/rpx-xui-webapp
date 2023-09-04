import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "rpx-xui-translation";
const _c0 = function (a3) { return ["/", "cases", "case-details", a3, "tasks"]; };
export class TaskConflictComponent {
}
TaskConflictComponent.ɵfac = function TaskConflictComponent_Factory(t) { return new (t || TaskConflictComponent)(); };
TaskConflictComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TaskConflictComponent, selectors: [["app-task-conflict"]], inputs: { task: "task", caseId: "caseId" }, decls: 24, vars: 21, consts: [[1, "govuk-!-margin-9"], ["aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "error-summary", 1, "govuk-error-summary"], ["id", "error-summary-title", 1, "govuk-error-summary__title"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"], ["href", "#"], [1, "govuk-form-group", "govuk-form-group--error"], [1, "govuk-heading-m"], ["href", "javascript:void(0)", 3, "routerLink"]], template: function TaskConflictComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵelementStart(21, "a", 8);
        i0.ɵɵtext(22);
        i0.ɵɵpipe(23, "rpxTranslate");
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 7, "There is a problem"), " ");
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 9, "Task conflict"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 11, "Task conflict"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 13, "This task cannot be completed due to conflict with another task or tasks for this case."));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 15, "If the problem persists, contact William Priest"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(19, _c0, ctx.caseId));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 17, "Return to tasks tab"));
    } }, dependencies: [i1.RouterLink, i2.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TaskConflictComponent, [{
        type: Component,
        args: [{ selector: 'app-task-conflict', template: "<div class=\"govuk-!-margin-9\">\n  <div class=\"govuk-error-summary\" aria-labelledby=\"error-summary-title\" role=\"alert\" tabindex=\"-1\" data-module=\"error-summary\">\n    <h2 class=\"govuk-error-summary__title\" id=\"error-summary-title\">\n      {{'There is a problem' | rpxTranslate}}\n    </h2>\n    <div class=\"govuk-error-summary__body\">\n      <ul class=\"govuk-list govuk-error-summary__list\">\n        <li>\n          <a href=\"#\">{{'Task conflict' | rpxTranslate}}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"govuk-form-group govuk-form-group--error\">\n    <h2 class=\"govuk-heading-m\">{{'Task conflict' | rpxTranslate}}</h2>\n    <p>{{'This task cannot be completed due to conflict with another task or tasks for this case.' | rpxTranslate}}</p>\n    <p>{{'If the problem persists, contact William Priest' | rpxTranslate}}</p>\n    <a href=\"javascript:void(0)\" [routerLink]=\"['/', 'cases', 'case-details', caseId, 'tasks']\">{{'Return to tasks tab' | rpxTranslate}}</a>\n  </div>\n</div>\n" }]
    }], null, { task: [{
            type: Input
        }], caseId: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay1jb25mbGljdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvZXZlbnQtc3RhcnQvY29tcG9uZW50cy90YXNrLWNvbmZsaWN0L3Rhc2stY29uZmxpY3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2V2ZW50LXN0YXJ0L2NvbXBvbmVudHMvdGFzay1jb25mbGljdC90YXNrLWNvbmZsaWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQU9qRCxNQUFNLE9BQU8scUJBQXFCOzswRkFBckIscUJBQXFCO3dFQUFyQixxQkFBcUI7UUNQbEMsOEJBQThCLGFBQUEsWUFBQTtRQUd4QixZQUNGOztRQUFBLGlCQUFLO1FBQ0wsOEJBQXVDLFlBQUEsU0FBQSxXQUFBO1FBR3JCLFlBQWtDOztRQUFBLGlCQUFJLEVBQUEsRUFBQSxFQUFBLEVBQUE7UUFNMUQsK0JBQXNELGFBQUE7UUFDeEIsYUFBa0M7O1FBQUEsaUJBQUs7UUFDbkUsMEJBQUc7UUFBQSxhQUE0Rzs7UUFBQSxpQkFBSTtRQUNuSCwwQkFBRztRQUFBLGFBQW9FOztRQUFBLGlCQUFJO1FBQzNFLDZCQUE0RjtRQUFBLGFBQXdDOztRQUFBLGlCQUFJLEVBQUEsRUFBQTs7UUFmdEksZUFDRjtRQURFLDJFQUNGO1FBSWtCLGVBQWtDO1FBQWxDLDREQUFrQztRQU94QixlQUFrQztRQUFsQyw2REFBa0M7UUFDM0QsZUFBNEc7UUFBNUcsdUlBQTRHO1FBQzVHLGVBQW9FO1FBQXBFLCtGQUFvRTtRQUMxQyxlQUE4RDtRQUE5RCxvRUFBOEQ7UUFBQyxlQUF3QztRQUF4QyxtRUFBd0M7O3VGRFgzSCxxQkFBcUI7Y0FKakMsU0FBUzsyQkFDRSxtQkFBbUI7Z0JBSWIsSUFBSTtrQkFBbkIsS0FBSztZQUNVLE1BQU07a0JBQXJCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi4vLi4vLi4vLi4vZG9tYWluL3dvcmstYWxsb2NhdGlvbi9UYXNrJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXRhc2stY29uZmxpY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFzay1jb25mbGljdC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgVGFza0NvbmZsaWN0Q29tcG9uZW50IHtcbiAgQElucHV0KCkgcHVibGljIHRhc2s6IFRhc2s7XG4gIEBJbnB1dCgpIHB1YmxpYyBjYXNlSWQ6IHN0cmluZztcbn1cbiIsIjxkaXYgY2xhc3M9XCJnb3Z1ay0hLW1hcmdpbi05XCI+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXJyb3Itc3VtbWFyeS10aXRsZVwiIHJvbGU9XCJhbGVydFwiIHRhYmluZGV4PVwiLTFcIiBkYXRhLW1vZHVsZT1cImVycm9yLXN1bW1hcnlcIj5cbiAgICA8aDIgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X190aXRsZVwiIGlkPVwiZXJyb3Itc3VtbWFyeS10aXRsZVwiPlxuICAgICAge3snVGhlcmUgaXMgYSBwcm9ibGVtJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgPC9oMj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fYm9keVwiPlxuICAgICAgPHVsIGNsYXNzPVwiZ292dWstbGlzdCBnb3Z1ay1lcnJvci1zdW1tYXJ5X19saXN0XCI+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICA8YSBocmVmPVwiI1wiPnt7J1Rhc2sgY29uZmxpY3QnIHwgcnB4VHJhbnNsYXRlfX08L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cCBnb3Z1ay1mb3JtLWdyb3VwLS1lcnJvclwiPlxuICAgIDxoMiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbVwiPnt7J1Rhc2sgY29uZmxpY3QnIHwgcnB4VHJhbnNsYXRlfX08L2gyPlxuICAgIDxwPnt7J1RoaXMgdGFzayBjYW5ub3QgYmUgY29tcGxldGVkIGR1ZSB0byBjb25mbGljdCB3aXRoIGFub3RoZXIgdGFzayBvciB0YXNrcyBmb3IgdGhpcyBjYXNlLicgfCBycHhUcmFuc2xhdGV9fTwvcD5cbiAgICA8cD57eydJZiB0aGUgcHJvYmxlbSBwZXJzaXN0cywgY29udGFjdCBXaWxsaWFtIFByaWVzdCcgfCBycHhUcmFuc2xhdGV9fTwvcD5cbiAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgW3JvdXRlckxpbmtdPVwiWycvJywgJ2Nhc2VzJywgJ2Nhc2UtZGV0YWlscycsIGNhc2VJZCwgJ3Rhc2tzJ11cIj57eydSZXR1cm4gdG8gdGFza3MgdGFiJyB8IHJweFRyYW5zbGF0ZX19PC9hPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19