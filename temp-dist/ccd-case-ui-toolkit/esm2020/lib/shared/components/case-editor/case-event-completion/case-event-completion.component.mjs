import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, InjectionToken, Injector, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';
import { SessionStorageService } from '../../../services/session/session-storage.service';
import { EventCompletionPortalTypes } from '../domain/event-completion-portal-types.model';
import { EventCompletionStateMachineService } from '../services/event-completion-state-machine.service';
import { WorkAllocationService } from '../services/work-allocation.service';
import { CaseEventCompletionTaskCancelledComponent } from './components/case-event-completion-task-cancelled/case-event-completion-task-cancelled.component';
import { CaseEventCompletionTaskReassignedComponent } from './components/case-event-completion-task-reassigned/case-event-completion-task-reassigned.component';
import * as i0 from "@angular/core";
import * as i1 from "../services/event-completion-state-machine.service";
import * as i2 from "@angular/router";
import * as i3 from "../../../services/session/session-storage.service";
import * as i4 from "../services/work-allocation.service";
import * as i5 from "../../../services/alert/alert.service";
import * as i6 from "@angular/cdk/portal";
function CaseEventCompletionComponent_ng_template_0_Template(rf, ctx) { }
export const COMPONENT_PORTAL_INJECTION_TOKEN = new InjectionToken('');
export class CaseEventCompletionComponent {
    constructor(service, router, route, sessionStorageService, workAllocationService, alertService) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.sessionStorageService = sessionStorageService;
        this.workAllocationService = workAllocationService;
        this.alertService = alertService;
        this.eventCanBeCompleted = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes.eventCompletionParams && changes.eventCompletionParams.currentValue) {
            // Setup the context
            this.context = {
                task: this.eventCompletionParams.task,
                caseId: this.eventCompletionParams.caseId,
                eventId: this.eventCompletionParams.eventId,
                reassignedTask: null,
                router: this.router,
                route: this.route,
                sessionStorageService: this.sessionStorageService,
                workAllocationService: this.workAllocationService,
                alertService: this.alertService,
                canBeCompleted: false,
                component: this
            };
            // Initialise state machine
            this.stateMachine = this.service.initialiseStateMachine(this.context);
            // Create states
            this.service.createStates(this.stateMachine);
            // Add transitions for the states
            this.service.addTransitions();
            // Start state machine
            this.service.startStateMachine(this.stateMachine);
        }
    }
    showPortal(portalType) {
        const injector = Injector.create({
            providers: [
                { provide: COMPONENT_PORTAL_INJECTION_TOKEN, useValue: this }
            ]
        });
        // tslint:disable-next-line:switch-default
        switch (portalType) {
            case EventCompletionPortalTypes.TaskCancelled:
                this.selectedComponentPortal = new ComponentPortal(CaseEventCompletionTaskCancelledComponent, null, injector);
                break;
            case EventCompletionPortalTypes.TaskReassigned:
                this.selectedComponentPortal = new ComponentPortal(CaseEventCompletionTaskReassignedComponent, null, injector);
                break;
        }
    }
}
CaseEventCompletionComponent.ɵfac = function CaseEventCompletionComponent_Factory(t) { return new (t || CaseEventCompletionComponent)(i0.ɵɵdirectiveInject(i1.EventCompletionStateMachineService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i3.SessionStorageService), i0.ɵɵdirectiveInject(i4.WorkAllocationService), i0.ɵɵdirectiveInject(i5.AlertService)); };
CaseEventCompletionComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseEventCompletionComponent, selectors: [["ccd-case-event-completion"]], inputs: { eventCompletionParams: "eventCompletionParams" }, outputs: { eventCanBeCompleted: "eventCanBeCompleted" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "cdkPortalOutlet"]], template: function CaseEventCompletionComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseEventCompletionComponent_ng_template_0_Template, 0, 0, "ng-template", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("cdkPortalOutlet", ctx.selectedComponentPortal);
    } }, dependencies: [i6.CdkPortalOutlet], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseEventCompletionComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-event-completion', template: "<ng-template [cdkPortalOutlet]=\"selectedComponentPortal\"></ng-template>\n" }]
    }], function () { return [{ type: i1.EventCompletionStateMachineService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: i3.SessionStorageService }, { type: i4.WorkAllocationService }, { type: i5.AlertService }]; }, { eventCompletionParams: [{
            type: Input
        }], eventCanBeCompleted: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1ldmVudC1jb21wbGV0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWV2ZW50LWNvbXBsZXRpb24vY2FzZS1ldmVudC1jb21wbGV0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWV2ZW50LWNvbXBsZXRpb24vY2FzZS1ldmVudC1jb21wbGV0aW9uLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDM0gsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFFMUYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFFM0YsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDeEcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHlDQUF5QyxFQUFFLE1BQU0sa0dBQWtHLENBQUM7QUFDN0osT0FBTyxFQUFFLDBDQUEwQyxFQUFFLE1BQU0sb0dBQW9HLENBQUM7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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdGF0ZU1hY2hpbmUgfSBmcm9tICdAZWRpdW0vZnNtJztcbmltcG9ydCB7IEFsZXJ0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2FsZXJ0L2FsZXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU2Vzc2lvblN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvc2Vzc2lvbi9zZXNzaW9uLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudENvbXBsZXRpb25QYXJhbXMgfSBmcm9tICcuLi9kb21haW4vZXZlbnQtY29tcGxldGlvbi1wYXJhbXMubW9kZWwnO1xuaW1wb3J0IHsgRXZlbnRDb21wbGV0aW9uUG9ydGFsVHlwZXMgfSBmcm9tICcuLi9kb21haW4vZXZlbnQtY29tcGxldGlvbi1wb3J0YWwtdHlwZXMubW9kZWwnO1xuaW1wb3J0IHsgRXZlbnRDb21wbGV0aW9uQ29tcG9uZW50RW1pdHRlciwgRXZlbnRDb21wbGV0aW9uU3RhdGVNYWNoaW5lQ29udGV4dCB9IGZyb20gJy4uL2RvbWFpbi9ldmVudC1jb21wbGV0aW9uLXN0YXRlLW1hY2hpbmUtY29udGV4dC5tb2RlbCc7XG5pbXBvcnQgeyBFdmVudENvbXBsZXRpb25TdGF0ZU1hY2hpbmVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZXZlbnQtY29tcGxldGlvbi1zdGF0ZS1tYWNoaW5lLnNlcnZpY2UnO1xuaW1wb3J0IHsgV29ya0FsbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvd29yay1hbGxvY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FzZUV2ZW50Q29tcGxldGlvblRhc2tDYW5jZWxsZWRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1ldmVudC1jb21wbGV0aW9uLXRhc2stY2FuY2VsbGVkL2Nhc2UtZXZlbnQtY29tcGxldGlvbi10YXNrLWNhbmNlbGxlZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FzZUV2ZW50Q29tcGxldGlvblRhc2tSZWFzc2lnbmVkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhc2UtZXZlbnQtY29tcGxldGlvbi10YXNrLXJlYXNzaWduZWQvY2FzZS1ldmVudC1jb21wbGV0aW9uLXRhc2stcmVhc3NpZ25lZC5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgQ09NUE9ORU5UX1BPUlRBTF9JTkpFQ1RJT05fVE9LRU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48Q2FzZUV2ZW50Q29tcGxldGlvbkNvbXBvbmVudD4oJycpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY2FzZS1ldmVudC1jb21wbGV0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhc2UtZXZlbnQtY29tcGxldGlvbi5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXNlRXZlbnRDb21wbGV0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBFdmVudENvbXBsZXRpb25Db21wb25lbnRFbWl0dGVyIHtcbiAgQElucHV0KClcbiAgcHVibGljIGV2ZW50Q29tcGxldGlvblBhcmFtczogRXZlbnRDb21wbGV0aW9uUGFyYW1zO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgZXZlbnRDYW5CZUNvbXBsZXRlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBzdGF0ZU1hY2hpbmU6IFN0YXRlTWFjaGluZTtcbiAgcHVibGljIGNvbnRleHQ6IEV2ZW50Q29tcGxldGlvblN0YXRlTWFjaGluZUNvbnRleHQ7XG4gIHB1YmxpYyBzZWxlY3RlZENvbXBvbmVudFBvcnRhbDogQ29tcG9uZW50UG9ydGFsPGFueT47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBzZXJ2aWNlOiBFdmVudENvbXBsZXRpb25TdGF0ZU1hY2hpbmVTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXNzaW9uU3RvcmFnZVNlcnZpY2U6IFNlc3Npb25TdG9yYWdlU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdvcmtBbGxvY2F0aW9uU2VydmljZTogV29ya0FsbG9jYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYWxlcnRTZXJ2aWNlOiBBbGVydFNlcnZpY2UpIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLmV2ZW50Q29tcGxldGlvblBhcmFtcyAmJiBjaGFuZ2VzLmV2ZW50Q29tcGxldGlvblBhcmFtcy5jdXJyZW50VmFsdWUpIHtcbiAgICAgIC8vIFNldHVwIHRoZSBjb250ZXh0XG4gICAgICB0aGlzLmNvbnRleHQgPSB7XG4gICAgICAgIHRhc2s6IHRoaXMuZXZlbnRDb21wbGV0aW9uUGFyYW1zLnRhc2ssXG4gICAgICAgIGNhc2VJZDogdGhpcy5ldmVudENvbXBsZXRpb25QYXJhbXMuY2FzZUlkLFxuICAgICAgICBldmVudElkOiB0aGlzLmV2ZW50Q29tcGxldGlvblBhcmFtcy5ldmVudElkLFxuICAgICAgICByZWFzc2lnbmVkVGFzazogbnVsbCxcbiAgICAgICAgcm91dGVyOiB0aGlzLnJvdXRlcixcbiAgICAgICAgcm91dGU6IHRoaXMucm91dGUsXG4gICAgICAgIHNlc3Npb25TdG9yYWdlU2VydmljZTogdGhpcy5zZXNzaW9uU3RvcmFnZVNlcnZpY2UsXG4gICAgICAgIHdvcmtBbGxvY2F0aW9uU2VydmljZTogdGhpcy53b3JrQWxsb2NhdGlvblNlcnZpY2UsXG4gICAgICAgIGFsZXJ0U2VydmljZTogdGhpcy5hbGVydFNlcnZpY2UsXG4gICAgICAgIGNhbkJlQ29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgY29tcG9uZW50OiB0aGlzXG4gICAgICB9O1xuICAgICAgLy8gSW5pdGlhbGlzZSBzdGF0ZSBtYWNoaW5lXG4gICAgICB0aGlzLnN0YXRlTWFjaGluZSA9IHRoaXMuc2VydmljZS5pbml0aWFsaXNlU3RhdGVNYWNoaW5lKHRoaXMuY29udGV4dCk7XG4gICAgICAvLyBDcmVhdGUgc3RhdGVzXG4gICAgICB0aGlzLnNlcnZpY2UuY3JlYXRlU3RhdGVzKHRoaXMuc3RhdGVNYWNoaW5lKTtcbiAgICAgIC8vIEFkZCB0cmFuc2l0aW9ucyBmb3IgdGhlIHN0YXRlc1xuICAgICAgdGhpcy5zZXJ2aWNlLmFkZFRyYW5zaXRpb25zKCk7XG4gICAgICAvLyBTdGFydCBzdGF0ZSBtYWNoaW5lXG4gICAgICB0aGlzLnNlcnZpY2Uuc3RhcnRTdGF0ZU1hY2hpbmUodGhpcy5zdGF0ZU1hY2hpbmUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzaG93UG9ydGFsKHBvcnRhbFR5cGU6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQ09NUE9ORU5UX1BPUlRBTF9JTkpFQ1RJT05fVE9LRU4sIHVzZVZhbHVlOiB0aGlzfVxuICAgICAgXVxuICAgIH0pO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzd2l0Y2gtZGVmYXVsdFxuICAgIHN3aXRjaCAocG9ydGFsVHlwZSkge1xuICAgICAgY2FzZSBFdmVudENvbXBsZXRpb25Qb3J0YWxUeXBlcy5UYXNrQ2FuY2VsbGVkOlxuICAgICAgICB0aGlzLnNlbGVjdGVkQ29tcG9uZW50UG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChDYXNlRXZlbnRDb21wbGV0aW9uVGFza0NhbmNlbGxlZENvbXBvbmVudCwgbnVsbCwgaW5qZWN0b3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRDb21wbGV0aW9uUG9ydGFsVHlwZXMuVGFza1JlYXNzaWduZWQ6XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDb21wb25lbnRQb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKENhc2VFdmVudENvbXBsZXRpb25UYXNrUmVhc3NpZ25lZENvbXBvbmVudCwgbnVsbCwgaW5qZWN0b3IpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cbiIsIjxuZy10ZW1wbGF0ZSBbY2RrUG9ydGFsT3V0bGV0XT1cInNlbGVjdGVkQ29tcG9uZW50UG9ydGFsXCI+PC9uZy10ZW1wbGF0ZT5cbiJdfQ==