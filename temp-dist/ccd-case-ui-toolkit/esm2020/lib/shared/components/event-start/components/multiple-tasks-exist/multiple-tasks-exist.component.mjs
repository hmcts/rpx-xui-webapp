import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "rpx-xui-translation";
const _c0 = function (a3) { return ["/", "cases", "case-details", a3, "tasks"]; };
export class MultipleTasksExistComponent {
    constructor(route) {
        this.route = route;
        this.caseId = this.route.snapshot.data.case.case_id;
    }
}
MultipleTasksExistComponent.ɵfac = function MultipleTasksExistComponent_Factory(t) { return new (t || MultipleTasksExistComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
MultipleTasksExistComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MultipleTasksExistComponent, selectors: [["app-multiple-tasks-exist"]], decls: 24, vars: 21, consts: [[1, "govuk-!-margin-9"], ["aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "error-summary", 1, "govuk-error-summary"], ["id", "error-summary-title", 1, "govuk-error-summary__title"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"], ["href", "#"], [1, "govuk-form-group", "govuk-form-group--error"], [1, "govuk-heading-m"], ["href", "javascript:void(0)", 3, "routerLink"]], template: function MultipleTasksExistComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 9, "Multiple tasks exist"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(14, 11, "Multiple tasks exist"), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 13, "You're starting work which could complete more than one of the active tasks for this case."));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 15, "Return to tasks tab and start the event from there."));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(19, _c0, ctx.caseId));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 17, "Return to tasks tab"));
    } }, dependencies: [i1.RouterLink, i2.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MultipleTasksExistComponent, [{
        type: Component,
        args: [{ selector: 'app-multiple-tasks-exist', template: "<div class=\"govuk-!-margin-9\">\n  <div class=\"govuk-error-summary\" aria-labelledby=\"error-summary-title\" role=\"alert\" tabindex=\"-1\" data-module=\"error-summary\">\n    <h2 class=\"govuk-error-summary__title\" id=\"error-summary-title\">\n      {{'There is a problem' | rpxTranslate}}\n    </h2>\n    <div class=\"govuk-error-summary__body\">\n      <ul class=\"govuk-list govuk-error-summary__list\">\n        <li>\n          <a href=\"#\">{{'Multiple tasks exist' | rpxTranslate}}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"govuk-form-group govuk-form-group--error\">\n    <h2 class=\"govuk-heading-m\">\n      {{'Multiple tasks exist' | rpxTranslate}}\n    </h2>\n    <p>{{\"You're starting work which could complete more than one of the active tasks for this case.\" | rpxTranslate}}</p>\n    <p>{{'Return to tasks tab and start the event from there.' | rpxTranslate}}</p>\n    <a href=\"javascript:void(0)\" [routerLink]=\"['/', 'cases', 'case-details', caseId, 'tasks']\">{{'Return to tasks tab' | rpxTranslate}}</a>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i1.ActivatedRoute }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGUtdGFza3MtZXhpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2V2ZW50LXN0YXJ0L2NvbXBvbmVudHMvbXVsdGlwbGUtdGFza3MtZXhpc3QvbXVsdGlwbGUtdGFza3MtZXhpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2V2ZW50LXN0YXJ0L2NvbXBvbmVudHMvbXVsdGlwbGUtdGFza3MtZXhpc3QvbXVsdGlwbGUtdGFza3MtZXhpc3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBTWpELE1BQU0sT0FBTywyQkFBMkI7SUFJdEMsWUFBNkIsS0FBcUI7UUFBckIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0RCxDQUFDOztzR0FOVSwyQkFBMkI7OEVBQTNCLDJCQUEyQjtRQ1B4Qyw4QkFBOEIsYUFBQSxZQUFBO1FBR3hCLFlBQ0Y7O1FBQUEsaUJBQUs7UUFDTCw4QkFBdUMsWUFBQSxTQUFBLFdBQUE7UUFHckIsWUFBeUM7O1FBQUEsaUJBQUksRUFBQSxFQUFBLEVBQUEsRUFBQTtRQU1qRSwrQkFBc0QsYUFBQTtRQUVsRCxhQUNGOztRQUFBLGlCQUFLO1FBQ0wsMEJBQUc7UUFBQSxhQUErRzs7UUFBQSxpQkFBSTtRQUN0SCwwQkFBRztRQUFBLGFBQXdFOztRQUFBLGlCQUFJO1FBQy9FLDZCQUE0RjtRQUFBLGFBQXdDOztRQUFBLGlCQUFJLEVBQUEsRUFBQTs7UUFqQnRJLGVBQ0Y7UUFERSwyRUFDRjtRQUlrQixlQUF5QztRQUF6QyxtRUFBeUM7UUFRekQsZUFDRjtRQURFLCtFQUNGO1FBQ0csZUFBK0c7UUFBL0csMElBQStHO1FBQy9HLGVBQXdFO1FBQXhFLG1HQUF3RTtRQUM5QyxlQUE4RDtRQUE5RCxvRUFBOEQ7UUFBQyxlQUF3QztRQUF4QyxtRUFBd0M7O3VGRGIzSCwyQkFBMkI7Y0FKdkMsU0FBUzsyQkFDRSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW11bHRpcGxlLXRhc2tzLWV4aXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL211bHRpcGxlLXRhc2tzLWV4aXN0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBNdWx0aXBsZVRhc2tzRXhpc3RDb21wb25lbnQge1xuXG4gIHB1YmxpYyBjYXNlSWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgIHRoaXMuY2FzZUlkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5kYXRhLmNhc2UuY2FzZV9pZDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImdvdnVrLSEtbWFyZ2luLTlcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlcIiBhcmlhLWxhYmVsbGVkYnk9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCIgcm9sZT1cImFsZXJ0XCIgdGFiaW5kZXg9XCItMVwiIGRhdGEtbW9kdWxlPVwiZXJyb3Itc3VtbWFyeVwiPlxuICAgIDxoMiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX3RpdGxlXCIgaWQ9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCI+XG4gICAgICB7eydUaGVyZSBpcyBhIHByb2JsZW0nIHwgcnB4VHJhbnNsYXRlfX1cbiAgICA8L2gyPlxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X19ib2R5XCI+XG4gICAgICA8dWwgY2xhc3M9XCJnb3Z1ay1saXN0IGdvdnVrLWVycm9yLXN1bW1hcnlfX2xpc3RcIj5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIDxhIGhyZWY9XCIjXCI+e3snTXVsdGlwbGUgdGFza3MgZXhpc3QnIHwgcnB4VHJhbnNsYXRlfX08L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cCBnb3Z1ay1mb3JtLWdyb3VwLS1lcnJvclwiPlxuICAgIDxoMiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbVwiPlxuICAgICAge3snTXVsdGlwbGUgdGFza3MgZXhpc3QnIHwgcnB4VHJhbnNsYXRlfX1cbiAgICA8L2gyPlxuICAgIDxwPnt7XCJZb3UncmUgc3RhcnRpbmcgd29yayB3aGljaCBjb3VsZCBjb21wbGV0ZSBtb3JlIHRoYW4gb25lIG9mIHRoZSBhY3RpdmUgdGFza3MgZm9yIHRoaXMgY2FzZS5cIiB8IHJweFRyYW5zbGF0ZX19PC9wPlxuICAgIDxwPnt7J1JldHVybiB0byB0YXNrcyB0YWIgYW5kIHN0YXJ0IHRoZSBldmVudCBmcm9tIHRoZXJlLicgfCBycHhUcmFuc2xhdGV9fTwvcD5cbiAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgW3JvdXRlckxpbmtdPVwiWycvJywgJ2Nhc2VzJywgJ2Nhc2UtZGV0YWlscycsIGNhc2VJZCwgJ3Rhc2tzJ11cIj57eydSZXR1cm4gdG8gdGFza3MgdGFiJyB8IHJweFRyYW5zbGF0ZX19PC9hPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19