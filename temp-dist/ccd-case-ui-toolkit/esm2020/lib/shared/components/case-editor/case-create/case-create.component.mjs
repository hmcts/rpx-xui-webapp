import { Component, EventEmitter, Input, Output } from '@angular/core';
import { throwError } from 'rxjs';
import { AlertService } from '../../../services/alert/alert.service';
import { DraftService } from '../../../services/draft/draft.service';
import { CasesService } from '../services/cases.service';
import { EventTriggerService } from '../services/event-trigger.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/cases.service";
import * as i2 from "../../../services/alert/alert.service";
import * as i3 from "../../../services/draft/draft.service";
import * as i4 from "../services/event-trigger.service";
function CaseCreateComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "ccd-case-edit", 1);
    i0.ɵɵlistener("cancelled", function CaseCreateComponent_div_0_Template_ccd_case_edit_cancelled_1_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.emitCancelled($event)); })("submitted", function CaseCreateComponent_div_0_Template_ccd_case_edit_submitted_1_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.emitSubmitted($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("submit", ctx_r0.submit())("validate", ctx_r0.validate())("saveDraft", ctx_r0.saveDraft())("eventTrigger", ctx_r0.eventTrigger);
} }
export class CaseCreateComponent {
    constructor(casesService, alertService, draftService, eventTriggerService) {
        this.casesService = casesService;
        this.alertService = alertService;
        this.draftService = draftService;
        this.eventTriggerService = eventTriggerService;
        this.cancelled = new EventEmitter();
        this.submitted = new EventEmitter();
    }
    ngOnInit() {
        this.casesService.getEventTrigger(this.caseType, this.event).toPromise()
            .then(eventTrigger => {
            this.eventTrigger = eventTrigger;
            this.eventTriggerService.announceEventTrigger(eventTrigger);
        })
            .catch((error) => {
            this.alertService.error({ phrase: error.message });
            return throwError(error);
        });
    }
    submit() {
        return (sanitizedEditForm) => {
            sanitizedEditForm.draft_id = this.eventTrigger.case_id;
            return this.casesService.createCase(this.caseType, sanitizedEditForm);
        };
    }
    validate() {
        return (sanitizedEditForm, pageId) => this.casesService
            .validateCase(this.caseType, sanitizedEditForm, pageId);
    }
    saveDraft() {
        if (this.eventTrigger.can_save_draft) {
            return (caseEventData) => this.draftService.createOrUpdateDraft(this.caseType, this.eventTrigger.case_id, caseEventData);
        }
    }
    emitCancelled(event) {
        this.cancelled.emit(event);
    }
    emitSubmitted(event) {
        this.submitted.emit(event);
    }
    isDataLoaded() {
        return this.eventTrigger ? true : false;
    }
}
CaseCreateComponent.ɵfac = function CaseCreateComponent_Factory(t) { return new (t || CaseCreateComponent)(i0.ɵɵdirectiveInject(i1.CasesService), i0.ɵɵdirectiveInject(i2.AlertService), i0.ɵɵdirectiveInject(i3.DraftService), i0.ɵɵdirectiveInject(i4.EventTriggerService)); };
CaseCreateComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseCreateComponent, selectors: [["ccd-case-create"]], inputs: { jurisdiction: "jurisdiction", caseType: "caseType", event: "event" }, outputs: { cancelled: "cancelled", submitted: "submitted" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "submit", "validate", "saveDraft", "eventTrigger", "cancelled", "submitted"]], template: function CaseCreateComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseCreateComponent_div_0_Template, 2, 4, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isDataLoaded());
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseCreateComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-create', template: "<div *ngIf=\"isDataLoaded()\">\n    <ccd-case-edit [submit]=\"submit()\"\n                   [validate]=\"validate()\"\n                   [saveDraft]=\"saveDraft()\"\n                   [eventTrigger]=\"eventTrigger\"\n                   (cancelled)=\"emitCancelled($event)\"\n                   (submitted)=\"emitSubmitted($event)\"></ccd-case-edit>\n</div>" }]
    }], function () { return [{ type: i1.CasesService }, { type: i2.AlertService }, { type: i3.DraftService }, { type: i4.EventTriggerService }]; }, { jurisdiction: [{
            type: Input
        }], caseType: [{
            type: Input
        }], event: [{
            type: Input
        }], cancelled: [{
            type: Output
        }], submitted: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1jcmVhdGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Nhc2UtZWRpdG9yL2Nhc2UtY3JlYXRlL2Nhc2UtY3JlYXRlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWNyZWF0ZS9jYXNlLWNyZWF0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFNOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7O0lDVnhFLDJCQUE0Qix1QkFBQTtJQUtULHFMQUFhLGVBQUEsNEJBQXFCLENBQUEsSUFBQyx3S0FDdEIsZUFBQSw0QkFBcUIsQ0FBQSxJQURDO0lBQ0MsaUJBQWdCLEVBQUE7OztJQUxwRCxlQUFtQjtJQUFuQix3Q0FBbUIsK0JBQUEsaUNBQUEscUNBQUE7O0FEZXRDLE1BQU0sT0FBTyxtQkFBbUI7SUFnQjlCLFlBQ21CLFlBQTBCLEVBQzFCLFlBQTBCLEVBQzFCLFlBQTBCLEVBQzFCLG1CQUF3QztRQUh4QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBVnBELGNBQVMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRCxjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFTdEQsQ0FBQztJQUVHLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUU7YUFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxLQUFnQixFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbkQsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU8sQ0FBQyxpQkFBZ0MsRUFBRSxFQUFFO1lBQzFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztZQUN2RCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sQ0FBQyxpQkFBZ0MsRUFBRSxNQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZO2FBQzNFLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTSxTQUFTO1FBQ2QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRTtZQUNwQyxPQUFPLENBQUMsYUFBNEIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FDNUUsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFDekIsYUFBYSxDQUNkLENBQUM7U0FDSDtJQUNILENBQUM7SUFFTSxhQUFhLENBQUMsS0FBSztRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sYUFBYSxDQUFDLEtBQUs7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLFlBQVk7UUFDakIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMxQyxDQUFDOztzRkFuRVUsbUJBQW1CO3NFQUFuQixtQkFBbUI7UUNoQmhDLG9FQU9NOztRQVBBLHlDQUFvQjs7dUZEZ0JiLG1CQUFtQjtjQUovQixTQUFTOzJCQUNFLGlCQUFpQjt1SkFNcEIsWUFBWTtrQkFEbEIsS0FBSztZQUdDLFFBQVE7a0JBRGQsS0FBSztZQUdDLEtBQUs7a0JBRFgsS0FBSztZQUlDLFNBQVM7a0JBRGYsTUFBTTtZQUdBLFNBQVM7a0JBRGYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENhc2VFdmVudERhdGEgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vY2FzZS1ldmVudC1kYXRhLm1vZGVsJztcblxuaW1wb3J0IHsgQ2FzZUV2ZW50VHJpZ2dlciB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcvY2FzZS1ldmVudC10cmlnZ2VyLm1vZGVsJztcbmltcG9ydCB7IERyYWZ0IH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RyYWZ0Lm1vZGVsJztcbmltcG9ydCB7IEh0dHBFcnJvciB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9odHRwL2h0dHAtZXJyb3IubW9kZWwnO1xuaW1wb3J0IHsgQWxlcnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYWxlcnQvYWxlcnQuc2VydmljZSc7XG5pbXBvcnQgeyBEcmFmdFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9kcmFmdC9kcmFmdC5zZXJ2aWNlJztcbmltcG9ydCB7IENhc2VzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Nhc2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXZlbnRUcmlnZ2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2V2ZW50LXRyaWdnZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1jYXNlLWNyZWF0ZScsXG4gIHRlbXBsYXRlVXJsOiAnY2FzZS1jcmVhdGUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENhc2VDcmVhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBqdXJpc2RpY3Rpb246IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIGNhc2VUeXBlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBldmVudDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgY2FuY2VsbGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBzdWJtaXR0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBldmVudFRyaWdnZXI6IENhc2VFdmVudFRyaWdnZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXNlc1NlcnZpY2U6IENhc2VzU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFsZXJ0U2VydmljZTogQWxlcnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHJhZnRTZXJ2aWNlOiBEcmFmdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBldmVudFRyaWdnZXJTZXJ2aWNlOiBFdmVudFRyaWdnZXJTZXJ2aWNlLFxuICApIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2FzZXNTZXJ2aWNlLmdldEV2ZW50VHJpZ2dlcih0aGlzLmNhc2VUeXBlLCB0aGlzLmV2ZW50KS50b1Byb21pc2UoKVxuICAgICAgLnRoZW4oZXZlbnRUcmlnZ2VyID0+IHtcbiAgICAgICAgdGhpcy5ldmVudFRyaWdnZXIgPSBldmVudFRyaWdnZXI7XG4gICAgICAgIHRoaXMuZXZlbnRUcmlnZ2VyU2VydmljZS5hbm5vdW5jZUV2ZW50VHJpZ2dlcihldmVudFRyaWdnZXIpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3I6IEh0dHBFcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmFsZXJ0U2VydmljZS5lcnJvcih7IHBocmFzZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3VibWl0KCk6IChzYW5pdGl6ZWRFZGl0Rm9ybTogQ2FzZUV2ZW50RGF0YSkgPT4gT2JzZXJ2YWJsZTxvYmplY3Q+IHtcbiAgICByZXR1cm4gKHNhbml0aXplZEVkaXRGb3JtOiBDYXNlRXZlbnREYXRhKSA9PiB7XG4gICAgICBzYW5pdGl6ZWRFZGl0Rm9ybS5kcmFmdF9pZCA9IHRoaXMuZXZlbnRUcmlnZ2VyLmNhc2VfaWQ7XG4gICAgICByZXR1cm4gdGhpcy5jYXNlc1NlcnZpY2UuY3JlYXRlQ2FzZSh0aGlzLmNhc2VUeXBlLCBzYW5pdGl6ZWRFZGl0Rm9ybSk7XG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZSgpOiAoc2FuaXRpemVkRWRpdEZvcm06IENhc2VFdmVudERhdGEsIHBhZ2VJZDogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuICAgIHJldHVybiAoc2FuaXRpemVkRWRpdEZvcm06IENhc2VFdmVudERhdGEsIHBhZ2VJZDogc3RyaW5nKSA9PiB0aGlzLmNhc2VzU2VydmljZVxuICAgICAgLnZhbGlkYXRlQ2FzZSh0aGlzLmNhc2VUeXBlLCBzYW5pdGl6ZWRFZGl0Rm9ybSwgcGFnZUlkKTtcbiAgfVxuXG4gIHB1YmxpYyBzYXZlRHJhZnQoKTogKGNhc2VFdmVudERhdGE6IENhc2VFdmVudERhdGEpID0+IE9ic2VydmFibGU8RHJhZnQ+IHtcbiAgICBpZiAodGhpcy5ldmVudFRyaWdnZXIuY2FuX3NhdmVfZHJhZnQpIHtcbiAgICAgIHJldHVybiAoY2FzZUV2ZW50RGF0YTogQ2FzZUV2ZW50RGF0YSkgPT4gdGhpcy5kcmFmdFNlcnZpY2UuY3JlYXRlT3JVcGRhdGVEcmFmdChcbiAgICAgICAgdGhpcy5jYXNlVHlwZSxcbiAgICAgICAgdGhpcy5ldmVudFRyaWdnZXIuY2FzZV9pZCxcbiAgICAgICAgY2FzZUV2ZW50RGF0YVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZW1pdENhbmNlbGxlZChldmVudCk6IHZvaWQge1xuICAgIHRoaXMuY2FuY2VsbGVkLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIGVtaXRTdWJtaXR0ZWQoZXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLnN1Ym1pdHRlZC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBpc0RhdGFMb2FkZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRUcmlnZ2VyID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwiaXNEYXRhTG9hZGVkKClcIj5cbiAgICA8Y2NkLWNhc2UtZWRpdCBbc3VibWl0XT1cInN1Ym1pdCgpXCJcbiAgICAgICAgICAgICAgICAgICBbdmFsaWRhdGVdPVwidmFsaWRhdGUoKVwiXG4gICAgICAgICAgICAgICAgICAgW3NhdmVEcmFmdF09XCJzYXZlRHJhZnQoKVwiXG4gICAgICAgICAgICAgICAgICAgW2V2ZW50VHJpZ2dlcl09XCJldmVudFRyaWdnZXJcIlxuICAgICAgICAgICAgICAgICAgIChjYW5jZWxsZWQpPVwiZW1pdENhbmNlbGxlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAoc3VibWl0dGVkKT1cImVtaXRTdWJtaXR0ZWQoJGV2ZW50KVwiPjwvY2NkLWNhc2UtZWRpdD5cbjwvZGl2PiJdfQ==