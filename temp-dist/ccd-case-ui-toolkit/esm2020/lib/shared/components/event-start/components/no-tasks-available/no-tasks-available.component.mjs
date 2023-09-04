import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "rpx-xui-translation";
const _c0 = function (a3) { return ["/", "cases", "case-details", a3, "tasks"]; };
export class NoTasksAvailableComponent {
    constructor(route) {
        this.route = route;
        this.caseId = this.route.snapshot.data.case.case_id;
    }
}
NoTasksAvailableComponent.ɵfac = function NoTasksAvailableComponent_Factory(t) { return new (t || NoTasksAvailableComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
NoTasksAvailableComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NoTasksAvailableComponent, selectors: [["app-no-tasks-available"]], decls: 21, vars: 18, consts: [[1, "govuk-!-margin-9"], ["aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "error-summary", 1, "govuk-error-summary"], ["id", "error-summary-title", 1, "govuk-error-summary__title"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"], ["href", "#"], [1, "govuk-form-group", "govuk-form-group--error"], [1, "govuk-heading-m"], ["href", "javascript:void(0)", 3, "routerLink"]], template: function NoTasksAvailableComponent_Template(rf, ctx) { if (rf & 1) {
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
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 8, "No task available"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 10, "No task available"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 12, "You should have an assigned task for this event, but something has gone wrong."));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(16, _c0, ctx.caseId));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 14, "Return to tasks tab"));
    } }, dependencies: [i1.RouterLink, i2.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoTasksAvailableComponent, [{
        type: Component,
        args: [{ selector: 'app-no-tasks-available', template: "<div class=\"govuk-!-margin-9\">\n  <div class=\"govuk-error-summary\" aria-labelledby=\"error-summary-title\" role=\"alert\" tabindex=\"-1\" data-module=\"error-summary\">\n    <h2 class=\"govuk-error-summary__title\" id=\"error-summary-title\">\n      {{'There is a problem' | rpxTranslate}}\n    </h2>\n    <div class=\"govuk-error-summary__body\">\n      <ul class=\"govuk-list govuk-error-summary__list\">\n        <li>\n          <a href=\"#\">{{'No task available' | rpxTranslate}}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"govuk-form-group govuk-form-group--error\">\n    <h2 class=\"govuk-heading-m\">{{'No task available' | rpxTranslate}}</h2>\n    <p>{{'You should have an assigned task for this event, but something has gone wrong.' | rpxTranslate}}</p>\n    <a href=\"javascript:void(0)\" [routerLink]=\"['/', 'cases', 'case-details', caseId, 'tasks']\">{{'Return to tasks tab' | rpxTranslate}}</a>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i1.ActivatedRoute }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tdGFza3MtYXZhaWxhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9ldmVudC1zdGFydC9jb21wb25lbnRzL25vLXRhc2tzLWF2YWlsYWJsZS9uby10YXNrcy1hdmFpbGFibGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2V2ZW50LXN0YXJ0L2NvbXBvbmVudHMvbm8tdGFza3MtYXZhaWxhYmxlL25vLXRhc2tzLWF2YWlsYWJsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQTRCLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBTTNFLE1BQU0sT0FBTyx5QkFBeUI7SUFJcEMsWUFBNkIsS0FBcUI7UUFBckIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0RCxDQUFDOztrR0FOVSx5QkFBeUI7NEVBQXpCLHlCQUF5QjtRQ1B0Qyw4QkFBOEIsYUFBQSxZQUFBO1FBR3hCLFlBQ0Y7O1FBQUEsaUJBQUs7UUFDTCw4QkFBdUMsWUFBQSxTQUFBLFdBQUE7UUFHckIsWUFBc0M7O1FBQUEsaUJBQUksRUFBQSxFQUFBLEVBQUEsRUFBQTtRQU05RCwrQkFBc0QsYUFBQTtRQUN4QixhQUFzQzs7UUFBQSxpQkFBSztRQUN2RSwwQkFBRztRQUFBLGFBQW1HOztRQUFBLGlCQUFJO1FBQzFHLDZCQUE0RjtRQUFBLGFBQXdDOztRQUFBLGlCQUFJLEVBQUEsRUFBQTs7UUFkdEksZUFDRjtRQURFLDJFQUNGO1FBSWtCLGVBQXNDO1FBQXRDLGdFQUFzQztRQU81QixlQUFzQztRQUF0QyxpRUFBc0M7UUFDL0QsZUFBbUc7UUFBbkcsOEhBQW1HO1FBQ3pFLGVBQThEO1FBQTlELG9FQUE4RDtRQUFDLGVBQXdDO1FBQXhDLG1FQUF3Qzs7dUZEVjNILHlCQUF5QjtjQUpyQyxTQUFTOzJCQUNFLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBOYXZpZ2F0aW9uRXh0cmFzLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbm8tdGFza3MtYXZhaWxhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25vLXRhc2tzLWF2YWlsYWJsZS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgTm9UYXNrc0F2YWlsYWJsZUNvbXBvbmVudCB7XG5cbiAgcHVibGljIGNhc2VJZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgdGhpcy5jYXNlSWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LmRhdGEuY2FzZS5jYXNlX2lkO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZ292dWstIS1tYXJnaW4tOVwiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeVwiIGFyaWEtbGFiZWxsZWRieT1cImVycm9yLXN1bW1hcnktdGl0bGVcIiByb2xlPVwiYWxlcnRcIiB0YWJpbmRleD1cIi0xXCIgZGF0YS1tb2R1bGU9XCJlcnJvci1zdW1tYXJ5XCI+XG4gICAgPGgyIGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fdGl0bGVcIiBpZD1cImVycm9yLXN1bW1hcnktdGl0bGVcIj5cbiAgICAgIHt7J1RoZXJlIGlzIGEgcHJvYmxlbScgfCBycHhUcmFuc2xhdGV9fVxuICAgIDwvaDI+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX2JvZHlcIj5cbiAgICAgIDx1bCBjbGFzcz1cImdvdnVrLWxpc3QgZ292dWstZXJyb3Itc3VtbWFyeV9fbGlzdFwiPlxuICAgICAgICA8bGk+XG4gICAgICAgICAgPGEgaHJlZj1cIiNcIj57eydObyB0YXNrIGF2YWlsYWJsZScgfCBycHhUcmFuc2xhdGV9fTwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwIGdvdnVrLWZvcm0tZ3JvdXAtLWVycm9yXCI+XG4gICAgPGgyIGNsYXNzPVwiZ292dWstaGVhZGluZy1tXCI+e3snTm8gdGFzayBhdmFpbGFibGUnIHwgcnB4VHJhbnNsYXRlfX08L2gyPlxuICAgIDxwPnt7J1lvdSBzaG91bGQgaGF2ZSBhbiBhc3NpZ25lZCB0YXNrIGZvciB0aGlzIGV2ZW50LCBidXQgc29tZXRoaW5nIGhhcyBnb25lIHdyb25nLicgfCBycHhUcmFuc2xhdGV9fTwvcD5cbiAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgW3JvdXRlckxpbmtdPVwiWycvJywgJ2Nhc2VzJywgJ2Nhc2UtZGV0YWlscycsIGNhc2VJZCwgJ3Rhc2tzJ11cIj57eydSZXR1cm4gdG8gdGFza3MgdGFiJyB8IHJweFRyYW5zbGF0ZX19PC9hPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19