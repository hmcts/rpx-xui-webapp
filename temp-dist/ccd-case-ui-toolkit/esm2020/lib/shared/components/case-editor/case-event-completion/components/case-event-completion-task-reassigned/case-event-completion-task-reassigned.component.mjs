import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { AlertService } from '../../../../../services/alert/alert.service';
import { SessionStorageService } from '../../../../../services/session/session-storage.service';
import { CaseworkerService } from '../../../services/case-worker.service';
import { JudicialworkerService } from '../../../services/judicial-worker.service';
import { WorkAllocationService } from '../../../services/work-allocation.service';
import { CaseEventCompletionComponent, COMPONENT_PORTAL_INJECTION_TOKEN } from '../../case-event-completion.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../services/work-allocation.service";
import * as i3 from "../../../../../services/session/session-storage.service";
import * as i4 from "../../../services/judicial-worker.service";
import * as i5 from "../../../services/case-worker.service";
import * as i6 from "../../../../../services/alert/alert.service";
import * as i7 from "@angular/common";
import * as i8 from "rpx-xui-translation";
import * as i9 from "../../case-event-completion.component";
const _c0 = function (a3) { return ["/", "cases", "case-details", a3, "tasks"]; };
function CaseEventCompletionTaskReassignedComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
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
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p");
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p");
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 9)(25, "button", 10);
    i0.ɵɵlistener("click", function CaseEventCompletionTaskReassignedComponent_div_0_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r2); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onContinue()); });
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "a", 11);
    i0.ɵɵtext(29);
    i0.ɵɵpipe(30, "rpxTranslate");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 10, "There is a problem"), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 12, "Task reassigned"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 14, "Task reassigned"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(17, 16, "This task has been reassigned to"), " ", ctx_r0.assignedUserName, ".");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 18, "Click Continue to reassign the task to you and save your progress."));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 20, "Alternatively, click Cancel to return to the tasks tab without saving your progress."));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(27, 22, "Continue"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(26, _c0, ctx_r0.caseId));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(30, 24, "Cancel"), " ");
} }
export class CaseEventCompletionTaskReassignedComponent {
    constructor(parentComponent, route, workAllocationService, sessionStorageService, judicialworkerService, caseworkerService, alertService) {
        this.parentComponent = parentComponent;
        this.route = route;
        this.workAllocationService = workAllocationService;
        this.sessionStorageService = sessionStorageService;
        this.judicialworkerService = judicialworkerService;
        this.caseworkerService = caseworkerService;
        this.alertService = alertService;
    }
    ngOnInit() {
        // Get case id and task from the parent component
        this.caseId = this.parentComponent.context.caseId;
        const task = this.parentComponent.context.reassignedTask;
        // Current user is a caseworker?
        this.caseworkerSubscription = this.caseworkerService.getCaseworkers(task.jurisdiction).subscribe(result => {
            if (result && result[0].service === task.jurisdiction && result[0].caseworkers) {
                const caseworker = result[0].caseworkers.find(x => x.idamId === task.assignee);
                if (caseworker) {
                    this.assignedUserName = `${caseworker.firstName} ${caseworker.lastName}`;
                }
            }
            if (!this.assignedUserName) {
                // Current user is a judicial user?
                this.judicialworkerSubscription = this.judicialworkerService.getJudicialworkers([task.assignee], task.jurisdiction)
                    .subscribe(judicialworkers => {
                    if (judicialworkers) {
                        const judicialworker = judicialworkers.find(x => x.sidam_id === task.assignee);
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
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.caseworkerSubscription) {
            this.caseworkerSubscription.unsubscribe();
        }
        if (this.judicialworkerSubscription) {
            this.judicialworkerSubscription.unsubscribe();
        }
    }
    onContinue() {
        // Get task details
        const taskStr = this.sessionStorageService.getItem('taskToComplete');
        if (taskStr) {
            // Task is in session storage
            const task = JSON.parse(taskStr);
            // Assign and complete task
            this.subscription = this.workAllocationService.assignAndCompleteTask(task.id).subscribe(response => {
                // Emit event can be completed event
                this.parentComponent.eventCanBeCompleted.emit(true);
            }, error => {
                // Emit event cannot be completed event
                this.parentComponent.eventCanBeCompleted.emit(false);
                this.alertService.error(error.message);
                return throwError(error);
            });
        }
        else {
            // Emit event cannot be completed event
            this.parentComponent.eventCanBeCompleted.emit(false);
        }
    }
}
CaseEventCompletionTaskReassignedComponent.ɵfac = function CaseEventCompletionTaskReassignedComponent_Factory(t) { return new (t || CaseEventCompletionTaskReassignedComponent)(i0.ɵɵdirectiveInject(COMPONENT_PORTAL_INJECTION_TOKEN), i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.WorkAllocationService), i0.ɵɵdirectiveInject(i3.SessionStorageService), i0.ɵɵdirectiveInject(i4.JudicialworkerService), i0.ɵɵdirectiveInject(i5.CaseworkerService), i0.ɵɵdirectiveInject(i6.AlertService)); };
CaseEventCompletionTaskReassignedComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseEventCompletionTaskReassignedComponent, selectors: [["app-case-event-completion-task-reassigned"]], decls: 1, vars: 1, consts: [["class", "govuk-!-margin-9", 4, "ngIf"], [1, "govuk-!-margin-9"], ["aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "error-summary", 1, "govuk-error-summary"], ["id", "error-summary-title", 1, "govuk-error-summary__title"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"], ["href", "#"], [1, "govuk-form-group", "govuk-form-group--error"], [1, "govuk-heading-m"], [1, "form-group", "form-group-related"], ["data-module", "govuk-button", 1, "govuk-button", "govuk-!-margin-right-2", 3, "click"], ["data-module", "govuk-button", 1, "govuk-button", "govuk-button--secondary", 3, "routerLink"]], template: function CaseEventCompletionTaskReassignedComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseEventCompletionTaskReassignedComponent_div_0_Template, 31, 28, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.assignedUserName);
    } }, dependencies: [i7.NgIf, i1.RouterLink, i8.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseEventCompletionTaskReassignedComponent, [{
        type: Component,
        args: [{ selector: 'app-case-event-completion-task-reassigned', template: "<div class=\"govuk-!-margin-9\" *ngIf=\"assignedUserName\">\n  <div class=\"govuk-error-summary\" aria-labelledby=\"error-summary-title\" role=\"alert\" tabindex=\"-1\"\n    data-module=\"error-summary\">\n    <h2 class=\"govuk-error-summary__title\" id=\"error-summary-title\">\n      {{'There is a problem' | rpxTranslate}}\n    </h2>\n    <div class=\"govuk-error-summary__body\">\n      <ul class=\"govuk-list govuk-error-summary__list\">\n        <li>\n          <a href=\"#\">{{'Task reassigned' | rpxTranslate}}</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"govuk-form-group govuk-form-group--error\">\n    <h2 class=\"govuk-heading-m\">{{'Task reassigned' | rpxTranslate}}</h2>\n    <p>{{'This task has been reassigned to' | rpxTranslate}} {{assignedUserName}}.</p>\n    <p>{{'Click Continue to reassign the task to you and save your progress.' | rpxTranslate}}</p>\n    <p>{{'Alternatively, click Cancel to return to the tasks tab without saving your progress.' | rpxTranslate}}</p>\n    <div class=\"form-group form-group-related\">\n      <button class=\"govuk-button govuk-!-margin-right-2\" data-module=\"govuk-button\" (click)=\"onContinue()\">\n        {{'Continue' | rpxTranslate}}\n      </button>\n      <a [routerLink]=\"['/', 'cases', 'case-details', caseId, 'tasks']\"\n              class=\"govuk-button govuk-button--secondary\" data-module=\"govuk-button\">\n        {{'Cancel' | rpxTranslate}}\n      </a>\n    </div>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i9.CaseEventCompletionComponent, decorators: [{
                type: Inject,
                args: [COMPONENT_PORTAL_INJECTION_TOKEN]
            }] }, { type: i1.ActivatedRoute }, { type: i2.WorkAllocationService }, { type: i3.SessionStorageService }, { type: i4.JudicialworkerService }, { type: i5.CaseworkerService }, { type: i6.AlertService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1ldmVudC1jb21wbGV0aW9uLXRhc2stcmVhc3NpZ25lZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS1lZGl0b3IvY2FzZS1ldmVudC1jb21wbGV0aW9uL2NvbXBvbmVudHMvY2FzZS1ldmVudC1jb21wbGV0aW9uLXRhc2stcmVhc3NpZ25lZC9jYXNlLWV2ZW50LWNvbXBsZXRpb24tdGFzay1yZWFzc2lnbmVkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWV2ZW50LWNvbXBsZXRpb24vY29tcG9uZW50cy9jYXNlLWV2ZW50LWNvbXBsZXRpb24tdGFzay1yZWFzc2lnbmVkL2Nhc2UtZXZlbnQtY29tcGxldGlvbi10YXNrLXJlYXNzaWduZWQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBZ0IsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWhELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMzRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUNoRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRixPQUFPLEVBQUUscUJBQXFCLEVBQUUs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QXFCLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDckYsUUFBUSxDQUFDLEVBQUU7Z0JBQ1Qsb0NBQW9DO2dCQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RCxDQUFDLEVBQ0QsS0FBSyxDQUFDLEVBQUU7Z0JBQ04sdUNBQXVDO2dCQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2QyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDTCx1Q0FBdUM7WUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDOztvSUFyRlUsMENBQTBDLHVCQVFqQyxnQ0FBZ0M7NkZBUnpDLDBDQUEwQztRQ2Z2RCw2RkE4Qk07O1FBOUJ5QiwyQ0FBc0I7O3VGRGV4QywwQ0FBMEM7Y0FKdEQsU0FBUzsyQkFDRSwyQ0FBMkM7O3NCQVd4QyxNQUFNO3VCQUFDLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZG9tYWluL3dvcmstYWxsb2NhdGlvbi9UYXNrJztcbmltcG9ydCB7IEFsZXJ0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NlcnZpY2VzL2FsZXJ0L2FsZXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2VydmljZXMvc2Vzc2lvbi9zZXNzaW9uLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBDYXNld29ya2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2Nhc2Utd29ya2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSnVkaWNpYWx3b3JrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvanVkaWNpYWwtd29ya2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgV29ya0FsbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvd29yay1hbGxvY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FzZUV2ZW50Q29tcGxldGlvbkNvbXBvbmVudCwgQ09NUE9ORU5UX1BPUlRBTF9JTkpFQ1RJT05fVE9LRU4gfSBmcm9tICcuLi8uLi9jYXNlLWV2ZW50LWNvbXBsZXRpb24uY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNhc2UtZXZlbnQtY29tcGxldGlvbi10YXNrLXJlYXNzaWduZWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FzZS1ldmVudC1jb21wbGV0aW9uLXRhc2stcmVhc3NpZ25lZC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXNlRXZlbnRDb21wbGV0aW9uVGFza1JlYXNzaWduZWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHB1YmxpYyBjYXNlSWQ6IHN0cmluZztcbiAgcHVibGljIGFzc2lnbmVkVXNlcklkOiBzdHJpbmc7XG4gIHB1YmxpYyBhc3NpZ25lZFVzZXJOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIGNhc2V3b3JrZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIGp1ZGljaWFsd29ya2VyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChDT01QT05FTlRfUE9SVEFMX0lOSkVDVElPTl9UT0tFTikgcHJpdmF0ZSByZWFkb25seSBwYXJlbnRDb21wb25lbnQ6IENhc2VFdmVudENvbXBsZXRpb25Db21wb25lbnQsXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSB3b3JrQWxsb2NhdGlvblNlcnZpY2U6IFdvcmtBbGxvY2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlc3Npb25TdG9yYWdlU2VydmljZTogU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkganVkaWNpYWx3b3JrZXJTZXJ2aWNlOiBKdWRpY2lhbHdvcmtlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXNld29ya2VyU2VydmljZTogQ2FzZXdvcmtlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBhbGVydFNlcnZpY2U6IEFsZXJ0U2VydmljZSkge1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIEdldCBjYXNlIGlkIGFuZCB0YXNrIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnRcbiAgICB0aGlzLmNhc2VJZCA9IHRoaXMucGFyZW50Q29tcG9uZW50LmNvbnRleHQuY2FzZUlkO1xuICAgIGNvbnN0IHRhc2sgPSB0aGlzLnBhcmVudENvbXBvbmVudC5jb250ZXh0LnJlYXNzaWduZWRUYXNrO1xuXG4gICAgLy8gQ3VycmVudCB1c2VyIGlzIGEgY2FzZXdvcmtlcj9cbiAgICB0aGlzLmNhc2V3b3JrZXJTdWJzY3JpcHRpb24gPSB0aGlzLmNhc2V3b3JrZXJTZXJ2aWNlLmdldENhc2V3b3JrZXJzKHRhc2suanVyaXNkaWN0aW9uKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0WzBdLnNlcnZpY2UgPT09IHRhc2suanVyaXNkaWN0aW9uICYmIHJlc3VsdFswXS5jYXNld29ya2Vycykge1xuICAgICAgICBjb25zdCBjYXNld29ya2VyID0gcmVzdWx0WzBdLmNhc2V3b3JrZXJzLmZpbmQoeCA9PiB4LmlkYW1JZCA9PT0gdGFzay5hc3NpZ25lZSk7XG4gICAgICAgIGlmIChjYXNld29ya2VyKSB7XG4gICAgICAgICAgdGhpcy5hc3NpZ25lZFVzZXJOYW1lID0gYCR7Y2FzZXdvcmtlci5maXJzdE5hbWV9ICR7Y2FzZXdvcmtlci5sYXN0TmFtZX1gO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5hc3NpZ25lZFVzZXJOYW1lKSB7XG4gICAgICAgIC8vIEN1cnJlbnQgdXNlciBpcyBhIGp1ZGljaWFsIHVzZXI/XG4gICAgICAgIHRoaXMuanVkaWNpYWx3b3JrZXJTdWJzY3JpcHRpb24gPSB0aGlzLmp1ZGljaWFsd29ya2VyU2VydmljZS5nZXRKdWRpY2lhbHdvcmtlcnMoW3Rhc2suYXNzaWduZWVdLCB0YXNrLmp1cmlzZGljdGlvbilcbiAgICAgICAgLnN1YnNjcmliZShqdWRpY2lhbHdvcmtlcnMgPT4ge1xuICAgICAgICAgIGlmIChqdWRpY2lhbHdvcmtlcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGp1ZGljaWFsd29ya2VyID0ganVkaWNpYWx3b3JrZXJzLmZpbmQoeCA9PiB4LnNpZGFtX2lkID09PSB0YXNrLmFzc2lnbmVlKTtcbiAgICAgICAgICAgIGlmIChqdWRpY2lhbHdvcmtlcikge1xuICAgICAgICAgICAgICB0aGlzLmFzc2lnbmVkVXNlck5hbWUgPSBqdWRpY2lhbHdvcmtlci5mdWxsX25hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCF0aGlzLmFzc2lnbmVkVXNlck5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuYXNzaWduZWRVc2VyTmFtZSA9ICdhbm90aGVyIHVzZXInO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jYXNld29ya2VyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNhc2V3b3JrZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuanVkaWNpYWx3b3JrZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuanVkaWNpYWx3b3JrZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25Db250aW51ZSgpOiB2b2lkIHtcbiAgICAvLyBHZXQgdGFzayBkZXRhaWxzXG4gICAgY29uc3QgdGFza1N0ciA9IHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLmdldEl0ZW0oJ3Rhc2tUb0NvbXBsZXRlJyk7XG4gICAgaWYgKHRhc2tTdHIpIHtcbiAgICAgIC8vIFRhc2sgaXMgaW4gc2Vzc2lvbiBzdG9yYWdlXG4gICAgICBjb25zdCB0YXNrOiBUYXNrID0gSlNPTi5wYXJzZSh0YXNrU3RyKTtcblxuICAgICAgLy8gQXNzaWduIGFuZCBjb21wbGV0ZSB0YXNrXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMud29ya0FsbG9jYXRpb25TZXJ2aWNlLmFzc2lnbkFuZENvbXBsZXRlVGFzayh0YXNrLmlkKS5zdWJzY3JpYmUoXG4gICAgICAgIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAvLyBFbWl0IGV2ZW50IGNhbiBiZSBjb21wbGV0ZWQgZXZlbnRcbiAgICAgICAgICB0aGlzLnBhcmVudENvbXBvbmVudC5ldmVudENhbkJlQ29tcGxldGVkLmVtaXQodHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAvLyBFbWl0IGV2ZW50IGNhbm5vdCBiZSBjb21wbGV0ZWQgZXZlbnRcbiAgICAgICAgICB0aGlzLnBhcmVudENvbXBvbmVudC5ldmVudENhbkJlQ29tcGxldGVkLmVtaXQoZmFsc2UpO1xuICAgICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVtaXQgZXZlbnQgY2Fubm90IGJlIGNvbXBsZXRlZCBldmVudFxuICAgICAgdGhpcy5wYXJlbnRDb21wb25lbnQuZXZlbnRDYW5CZUNvbXBsZXRlZC5lbWl0KGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJnb3Z1ay0hLW1hcmdpbi05XCIgKm5nSWY9XCJhc3NpZ25lZFVzZXJOYW1lXCI+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZXJyb3Itc3VtbWFyeS10aXRsZVwiIHJvbGU9XCJhbGVydFwiIHRhYmluZGV4PVwiLTFcIlxuICAgIGRhdGEtbW9kdWxlPVwiZXJyb3Itc3VtbWFyeVwiPlxuICAgIDxoMiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlfX3RpdGxlXCIgaWQ9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCI+XG4gICAgICB7eydUaGVyZSBpcyBhIHByb2JsZW0nIHwgcnB4VHJhbnNsYXRlfX1cbiAgICA8L2gyPlxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X19ib2R5XCI+XG4gICAgICA8dWwgY2xhc3M9XCJnb3Z1ay1saXN0IGdvdnVrLWVycm9yLXN1bW1hcnlfX2xpc3RcIj5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIDxhIGhyZWY9XCIjXCI+e3snVGFzayByZWFzc2lnbmVkJyB8IHJweFRyYW5zbGF0ZX19PC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXAgZ292dWstZm9ybS1ncm91cC0tZXJyb3JcIj5cbiAgICA8aDIgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLW1cIj57eydUYXNrIHJlYXNzaWduZWQnIHwgcnB4VHJhbnNsYXRlfX08L2gyPlxuICAgIDxwPnt7J1RoaXMgdGFzayBoYXMgYmVlbiByZWFzc2lnbmVkIHRvJyB8IHJweFRyYW5zbGF0ZX19IHt7YXNzaWduZWRVc2VyTmFtZX19LjwvcD5cbiAgICA8cD57eydDbGljayBDb250aW51ZSB0byByZWFzc2lnbiB0aGUgdGFzayB0byB5b3UgYW5kIHNhdmUgeW91ciBwcm9ncmVzcy4nIHwgcnB4VHJhbnNsYXRlfX08L3A+XG4gICAgPHA+e3snQWx0ZXJuYXRpdmVseSwgY2xpY2sgQ2FuY2VsIHRvIHJldHVybiB0byB0aGUgdGFza3MgdGFiIHdpdGhvdXQgc2F2aW5nIHlvdXIgcHJvZ3Jlc3MuJyB8IHJweFRyYW5zbGF0ZX19PC9wPlxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGZvcm0tZ3JvdXAtcmVsYXRlZFwiPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImdvdnVrLWJ1dHRvbiBnb3Z1ay0hLW1hcmdpbi1yaWdodC0yXCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIiAoY2xpY2spPVwib25Db250aW51ZSgpXCI+XG4gICAgICAgIHt7J0NvbnRpbnVlJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxhIFtyb3V0ZXJMaW5rXT1cIlsnLycsICdjYXNlcycsICdjYXNlLWRldGFpbHMnLCBjYXNlSWQsICd0YXNrcyddXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnlcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWJ1dHRvblwiPlxuICAgICAgICB7eydDYW5jZWwnIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==