import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseworkerService } from '../../../case-editor/services/case-worker.service';
import { JudicialworkerService } from '../../../case-editor/services/judicial-worker.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../case-editor/services/judicial-worker.service";
import * as i3 from "../../../case-editor/services/case-worker.service";
import * as i4 from "@angular/common";
import * as i5 from "rpx-xui-translation";
const _c0 = function (a3) { return ["/", "cases", "case-details", a3, "tasks"]; };
function TaskAssignedComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "h2", 3);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 4)(6, "ul", 5)(7, "li")(8, "a", 6);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "rpxTranslate");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(11, "div", 7)(12, "h2", 8);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p");
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "rpxTranslate");
    i0.ɵɵpipe(18, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "a", 9);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "rpxTranslate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 8, "There is a problem"), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 10, "Task assignment required"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 12, "Task assignment required"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate3("", i0.ɵɵpipeBind1(17, 14, "This task is assigned to"), " ", ctx_r0.assignedUserName, ". ", i0.ɵɵpipeBind1(18, 16, "You must assign it to yourself to continue."), "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(20, _c0, ctx_r0.caseId));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(21, 18, "Return to tasks tab"), " ");
} }
export class TaskAssignedComponent {
    constructor(route, judicialworkerService, caseworkerService) {
        this.route = route;
        this.judicialworkerService = judicialworkerService;
        this.caseworkerService = caseworkerService;
        this.task = null;
        this.caseId = this.route.snapshot.data.case.case_id;
        this.task = this.route.snapshot.queryParams;
    }
    ngOnInit() {
        // Current user is a caseworker?
        this.caseworkerSubscription = this.caseworkerService.getCaseworkers(this.task.jurisdiction).subscribe(result => {
            if (result && result[0].service === this.task.jurisdiction && result[0].caseworkers) {
                const caseworker = result[0].caseworkers.find(x => x.idamId === this.task.assignee);
                if (caseworker) {
                    this.assignedUserName = `${caseworker.firstName} ${caseworker.lastName}`;
                }
            }
            if (!this.assignedUserName) {
                // Current user is a judicial user?
                this.judicialworkerSubscription =
                    this.judicialworkerService.getJudicialworkers([this.task.assignee], this.task.jurisdiction)
                        .subscribe(judicialworkers => {
                        if (judicialworkers) {
                            const judicialworker = judicialworkers.find(x => x.sidam_id === this.task.assignee);
                            if (judicialworker) {
                                this.assignedUserName = judicialworker.full_name;
                            }
                        }
                        if (!this.assignedUserName) {
                            this.assignedUserName = 'another user';
                        }
                    });
            }
        });
    }
    ngOnDestroy() {
        if (this.caseworkerSubscription) {
            this.caseworkerSubscription.unsubscribe();
        }
        if (this.judicialworkerSubscription) {
            this.judicialworkerSubscription.unsubscribe();
        }
    }
}
TaskAssignedComponent.ɵfac = function TaskAssignedComponent_Factory(t) { return new (t || TaskAssignedComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.JudicialworkerService), i0.ɵɵdirectiveInject(i3.CaseworkerService)); };
TaskAssignedComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TaskAssignedComponent, selectors: [["app-task-assigned"]], decls: 1, vars: 1, consts: [["class", "govuk-!-margin-9", 4, "ngIf"], [1, "govuk-!-margin-9"], ["aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "error-summary", 1, "govuk-error-summary"], ["id", "error-summary-title", 1, "govuk-error-summary__title"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"], ["href", "#"], [1, "govuk-form-group", "govuk-form-group--error"], [1, "govuk-heading-m"], ["href", "javascript:void(0)", 3, "routerLink"]], template: function TaskAssignedComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, TaskAssignedComponent_div_0_Template, 22, 22, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.assignedUserName);
    } }, dependencies: [i4.NgIf, i1.RouterLink, i5.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TaskAssignedComponent, [{
        type: Component,
        args: [{ selector: 'app-task-assigned', template: "<div class=\"govuk-!-margin-9\" *ngIf=\"assignedUserName\">\n  <div class=\"govuk-error-summary\" aria-labelledby=\"error-summary-title\" role=\"alert\" tabindex=\"-1\" data-module=\"error-summary\">\n    <h2 class=\"govuk-error-summary__title\" id=\"error-summary-title\">\n      {{'There is a problem' | rpxTranslate}}\n    </h2>\n    <div class=\"govuk-error-summary__body\">\n      <ul class=\"govuk-list govuk-error-summary__list\">\n        <li>\n          <a href=\"#\">{{'Task assignment required' | rpxTranslate}}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"govuk-form-group govuk-form-group--error\">\n      <h2 class=\"govuk-heading-m\">{{'Task assignment required' | rpxTranslate}}</h2>\n\n    <p>{{'This task is assigned to' | rpxTranslate}} {{assignedUserName}}. {{'You must assign it to yourself to continue.' | rpxTranslate}}</p>\n\n    <a href=\"javascript:void(0)\" [routerLink]=\"['/', 'cases', 'case-details', caseId, 'tasks']\">\n      {{'Return to tasks tab' | rpxTranslate}}\n    </a>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i1.ActivatedRoute }, { type: i2.JudicialworkerService }, { type: i3.CaseworkerService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay1hc3NpZ25lZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvZXZlbnQtc3RhcnQvY29tcG9uZW50cy90YXNrLWFzc2lnbmVkL3Rhc2stYXNzaWduZWQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2V2ZW50LXN0YXJ0L2NvbXBvbmVudHMvdGFzay1hc3NpZ25lZC90YXNrLWFzc2lnbmVkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUdqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUN0RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQzs7Ozs7Ozs7O0lDTDlGLDhCQUF1RCxhQUFBLFlBQUE7SUFHakQsWUFDRjs7SUFBQSxpQkFBSztJQUNMLDhCQUF1QyxZQUFBLFNBQUEsV0FBQTtJQUdyQixZQUE2Qzs7SUFBQSxpQkFBSSxFQUFBLEVBQUEsRUFBQSxFQUFBO0lBTXJFLCtCQUFzRCxhQUFBO0lBQ3RCLGFBQTZDOztJQUFBLGlCQUFLO0lBRWhGLDBCQUFHO0lBQUEsYUFBb0k7OztJQUFBLGlCQUFJO0lBRTNJLDZCQUE0RjtJQUMxRixhQUNGOztJQUFBLGlCQUFJLEVBQUEsRUFBQTs7O0lBbEJGLGVBQ0Y7SUFERSwyRUFDRjtJQUlrQixlQUE2QztJQUE3Qyx3RUFBNkM7SUFPakMsZUFBNkM7SUFBN0Msd0VBQTZDO0lBRXhF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c0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi4vLi4vLi4vLi4vZG9tYWluL3dvcmstYWxsb2NhdGlvbi9UYXNrJztcbmltcG9ydCB7IENhc2V3b3JrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY2FzZS1lZGl0b3Ivc2VydmljZXMvY2FzZS13b3JrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBKdWRpY2lhbHdvcmtlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jYXNlLWVkaXRvci9zZXJ2aWNlcy9qdWRpY2lhbC13b3JrZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC10YXNrLWFzc2lnbmVkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Rhc2stYXNzaWduZWQuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFRhc2tBc3NpZ25lZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBwdWJsaWMgdGFzazogVGFzayA9IG51bGw7XG4gIHB1YmxpYyBjYXNlSWQ6IHN0cmluZztcbiAgcHVibGljIGFzc2lnbmVkVXNlck5hbWU6IHN0cmluZztcbiAgcHVibGljIGNhc2V3b3JrZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIGp1ZGljaWFsd29ya2VyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBqdWRpY2lhbHdvcmtlclNlcnZpY2U6IEp1ZGljaWFsd29ya2VyU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2V3b3JrZXJTZXJ2aWNlOiBDYXNld29ya2VyU2VydmljZSkge1xuICAgIHRoaXMuY2FzZUlkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5kYXRhLmNhc2UuY2FzZV9pZDtcbiAgICB0aGlzLnRhc2sgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zIGFzIFRhc2s7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gQ3VycmVudCB1c2VyIGlzIGEgY2FzZXdvcmtlcj9cbiAgICB0aGlzLmNhc2V3b3JrZXJTdWJzY3JpcHRpb24gPSB0aGlzLmNhc2V3b3JrZXJTZXJ2aWNlLmdldENhc2V3b3JrZXJzKHRoaXMudGFzay5qdXJpc2RpY3Rpb24pLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHRbMF0uc2VydmljZSA9PT0gdGhpcy50YXNrLmp1cmlzZGljdGlvbiAmJiByZXN1bHRbMF0uY2FzZXdvcmtlcnMpIHtcbiAgICAgICAgY29uc3QgY2FzZXdvcmtlciA9IHJlc3VsdFswXS5jYXNld29ya2Vycy5maW5kKHggPT4geC5pZGFtSWQgPT09IHRoaXMudGFzay5hc3NpZ25lZSk7XG4gICAgICAgIGlmIChjYXNld29ya2VyKSB7XG4gICAgICAgICAgdGhpcy5hc3NpZ25lZFVzZXJOYW1lID0gYCR7Y2FzZXdvcmtlci5maXJzdE5hbWV9ICR7Y2FzZXdvcmtlci5sYXN0TmFtZX1gO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5hc3NpZ25lZFVzZXJOYW1lKSB7XG4gICAgICAgIC8vIEN1cnJlbnQgdXNlciBpcyBhIGp1ZGljaWFsIHVzZXI/XG4gICAgICAgIHRoaXMuanVkaWNpYWx3b3JrZXJTdWJzY3JpcHRpb24gPVxuICAgICAgICAgIHRoaXMuanVkaWNpYWx3b3JrZXJTZXJ2aWNlLmdldEp1ZGljaWFsd29ya2VycyhbdGhpcy50YXNrLmFzc2lnbmVlXSwgdGhpcy50YXNrLmp1cmlzZGljdGlvbilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoanVkaWNpYWx3b3JrZXJzID0+IHtcbiAgICAgICAgICAgICAgaWYgKGp1ZGljaWFsd29ya2Vycykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGp1ZGljaWFsd29ya2VyID0ganVkaWNpYWx3b3JrZXJzLmZpbmQoeCA9PiB4LnNpZGFtX2lkID09PSB0aGlzLnRhc2suYXNzaWduZWUpO1xuICAgICAgICAgICAgICAgIGlmIChqdWRpY2lhbHdvcmtlcikge1xuICAgICAgICAgICAgICAgICAgdGhpcy5hc3NpZ25lZFVzZXJOYW1lID0ganVkaWNpYWx3b3JrZXIuZnVsbF9uYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghdGhpcy5hc3NpZ25lZFVzZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hc3NpZ25lZFVzZXJOYW1lID0gJ2Fub3RoZXIgdXNlcic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhc2V3b3JrZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY2FzZXdvcmtlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5qdWRpY2lhbHdvcmtlclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5qdWRpY2lhbHdvcmtlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImdvdnVrLSEtbWFyZ2luLTlcIiAqbmdJZj1cImFzc2lnbmVkVXNlck5hbWVcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlcIiBhcmlhLWxhYmVsbGVkYnk9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCIgcm9sZT1cImFsZXJ0XCIgdGFiaW5kZXg9XCItMVwiIGRhdGEtbW9kdWxlPVwiZXJyb3Itc3VtbWFyeVwiPlxuICAgIDxoMiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX3RpdGxlXCIgaWQ9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCI+XG4gICAgICB7eydUaGVyZSBpcyBhIHByb2JsZW0nIHwgcnB4VHJhbnNsYXRlfX1cbiAgICA8L2gyPlxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X19ib2R5XCI+XG4gICAgICA8dWwgY2xhc3M9XCJnb3Z1ay1saXN0IGdvdnVrLWVycm9yLXN1bW1hcnlfX2xpc3RcIj5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIDxhIGhyZWY9XCIjXCI+e3snVGFzayBhc3NpZ25tZW50IHJlcXVpcmVkJyB8IHJweFRyYW5zbGF0ZX19PC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXAgZ292dWstZm9ybS1ncm91cC0tZXJyb3JcIj5cbiAgICAgIDxoMiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbVwiPnt7J1Rhc2sgYXNzaWdubWVudCByZXF1aXJlZCcgfCBycHhUcmFuc2xhdGV9fTwvaDI+XG5cbiAgICA8cD57eydUaGlzIHRhc2sgaXMgYXNzaWduZWQgdG8nIHwgcnB4VHJhbnNsYXRlfX0ge3thc3NpZ25lZFVzZXJOYW1lfX0uIHt7J1lvdSBtdXN0IGFzc2lnbiBpdCB0byB5b3Vyc2VsZiB0byBjb250aW51ZS4nIHwgcnB4VHJhbnNsYXRlfX08L3A+XG5cbiAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgW3JvdXRlckxpbmtdPVwiWycvJywgJ2Nhc2VzJywgJ2Nhc2UtZGV0YWlscycsIGNhc2VJZCwgJ3Rhc2tzJ11cIj5cbiAgICAgIHt7J1JldHVybiB0byB0YXNrcyB0YWInIHwgcnB4VHJhbnNsYXRlfX1cbiAgICA8L2E+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=