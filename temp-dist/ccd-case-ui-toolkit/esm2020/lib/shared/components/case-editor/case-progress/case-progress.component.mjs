import { Component, EventEmitter, Input, Output } from '@angular/core';
import { throwError } from 'rxjs';
import { AlertService } from '../../../services/alert/alert.service';
import { CasesService } from '../services/cases.service';
import { EventTriggerService } from '../services/event-trigger.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/cases.service";
import * as i2 from "../../../services/alert/alert.service";
import * as i3 from "../services/event-trigger.service";
function CaseProgressComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "ccd-case-edit", 1);
    i0.ɵɵlistener("cancelled", function CaseProgressComponent_div_0_Template_ccd_case_edit_cancelled_1_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.emitCancelled($event)); })("submitted", function CaseProgressComponent_div_0_Template_ccd_case_edit_submitted_1_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.emitSubmitted($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("submit", ctx_r0.submit())("validate", ctx_r0.validate())("caseDetails", ctx_r0.caseDetails)("eventTrigger", ctx_r0.eventTrigger);
} }
export class CaseProgressComponent {
    constructor(casesService, alertService, eventTriggerService) {
        this.casesService = casesService;
        this.alertService = alertService;
        this.eventTriggerService = eventTriggerService;
        this.cancelled = new EventEmitter();
        this.submitted = new EventEmitter();
    }
    ngOnInit() {
        // tslint:disable-next-line: prefer-const
        let caseTypeId;
        this.casesService.getCaseViewV2(this.case).toPromise()
            .then(caseView => this.caseDetails = caseView)
            .then(caseView => this.casesService.getEventTrigger(caseTypeId, this.event, caseView.case_id)
            .toPromise())
            .then(eventTrigger => {
            this.eventTriggerService.announceEventTrigger(eventTrigger);
            this.eventTrigger = eventTrigger;
        })
            .catch((error) => {
            this.alertService.error({ phrase: error.message });
            return throwError(error);
        });
    }
    submit() {
        return (sanitizedEditForm) => this.casesService.createEvent(this.caseDetails, sanitizedEditForm);
    }
    validate() {
        return (sanitizedEditForm, pageId) => this.casesService.validateCase(this.caseDetails.case_type.id, sanitizedEditForm, pageId);
    }
    emitCancelled(event) {
        this.cancelled.emit(event);
    }
    emitSubmitted(event) {
        this.submitted.emit(event);
    }
    isDataLoaded() {
        return this.eventTrigger && this.caseDetails ? true : false;
    }
}
CaseProgressComponent.ɵfac = function CaseProgressComponent_Factory(t) { return new (t || CaseProgressComponent)(i0.ɵɵdirectiveInject(i1.CasesService), i0.ɵɵdirectiveInject(i2.AlertService), i0.ɵɵdirectiveInject(i3.EventTriggerService)); };
CaseProgressComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseProgressComponent, selectors: [["ccd-case-progress"]], inputs: { case: "case", event: "event" }, outputs: { cancelled: "cancelled", submitted: "submitted" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "submit", "validate", "caseDetails", "eventTrigger", "cancelled", "submitted"]], template: function CaseProgressComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseProgressComponent_div_0_Template, 2, 4, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isDataLoaded());
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseProgressComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-progress', template: "<div *ngIf=\"isDataLoaded()\">\n    <ccd-case-edit [submit]=\"submit()\"\n                   [validate]=\"validate()\"\n                   [caseDetails]=\"caseDetails\"\n                   [eventTrigger]=\"eventTrigger\"\n                   (cancelled)=\"emitCancelled($event)\"\n                   (submitted)=\"emitSubmitted($event)\"></ccd-case-edit>\n</div>" }]
    }], function () { return [{ type: i1.CasesService }, { type: i2.AlertService }, { type: i3.EventTriggerService }]; }, { case: [{
            type: Input
        }], event: [{
            type: Input
        }], cancelled: [{
            type: Output
        }], submitted: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1wcm9ncmVzcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS1lZGl0b3IvY2FzZS1wcm9ncmVzcy9jYXNlLXByb2dyZXNzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLXByb2dyZXNzL2Nhc2UtcHJvZ3Jlc3MuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7SUNSeEUsMkJBQTRCLHVCQUFBO0lBS1QsdUxBQWEsZUFBQSw0QkFBcUIsQ0FBQSxJQUFDLDBLQUN0QixlQUFBLDRCQUFxQixDQUFBLElBREM7SUFDQyxpQkFBZ0IsRUFBQTs7O0lBTHBELGVBQW1CO0lBQW5CLHdDQUFtQiwrQkFBQSxtQ0FBQSxxQ0FBQTs7QURldEMsTUFBTSxPQUFPLHFCQUFxQjtJQWVoQyxZQUNtQixZQUEwQixFQUMxQixZQUEwQixFQUMxQixtQkFBd0M7UUFGeEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQVZwRCxjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEQsY0FBUyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBU3RELENBQUM7SUFFRyxRQUFRO1FBQ2IseUNBQXlDO1FBQ3pDLElBQUksVUFBa0IsQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFO2FBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO2FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUM7YUFDdEMsU0FBUyxFQUFFLENBQUM7YUFDbEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNuQyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxLQUFnQixFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbkQsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU8sQ0FBQyxpQkFBZ0MsRUFBRSxFQUFFLENBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sQ0FBQyxpQkFBZ0MsRUFBRSxNQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUN6RixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQzdCLGlCQUFpQixFQUNqQixNQUFNLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFTSxhQUFhLENBQUMsS0FBSztRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sYUFBYSxDQUFDLEtBQUs7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLFlBQVk7UUFDakIsT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzlELENBQUM7OzBGQTVEVSxxQkFBcUI7d0VBQXJCLHFCQUFxQjtRQ2hCbEMsc0VBT007O1FBUEEseUNBQW9COzt1RkRnQmIscUJBQXFCO2NBSmpDLFNBQVM7MkJBQ0UsbUJBQW1COzRIQU10QixJQUFJO2tCQURWLEtBQUs7WUFHQyxLQUFLO2tCQURYLEtBQUs7WUFJQyxTQUFTO2tCQURmLE1BQU07WUFHQSxTQUFTO2tCQURmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYXNlRXZlbnREYXRhIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2Nhc2UtZXZlbnQtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBDYXNlRXZlbnRUcmlnZ2VyIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2Nhc2Utdmlldy9jYXNlLWV2ZW50LXRyaWdnZXIubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZVZpZXcgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vY2FzZS12aWV3L2Nhc2Utdmlldy5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwRXJyb3IgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vaHR0cC9odHRwLWVycm9yLm1vZGVsJztcbmltcG9ydCB7IEFsZXJ0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2FsZXJ0L2FsZXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FzZXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY2FzZXMuc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudFRyaWdnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZXZlbnQtdHJpZ2dlci5zZXJ2aWNlJztcblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1jYXNlLXByb2dyZXNzJyxcbiAgdGVtcGxhdGVVcmw6ICdjYXNlLXByb2dyZXNzLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXNlUHJvZ3Jlc3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBldmVudDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgY2FuY2VsbGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBzdWJtaXR0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBjYXNlRGV0YWlsczogQ2FzZVZpZXc7XG4gIHB1YmxpYyBldmVudFRyaWdnZXI6IENhc2VFdmVudFRyaWdnZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXNlc1NlcnZpY2U6IENhc2VzU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFsZXJ0U2VydmljZTogQWxlcnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRUcmlnZ2VyU2VydmljZTogRXZlbnRUcmlnZ2VyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogcHJlZmVyLWNvbnN0XG4gICAgbGV0IGNhc2VUeXBlSWQ6IHN0cmluZztcbiAgICB0aGlzLmNhc2VzU2VydmljZS5nZXRDYXNlVmlld1YyKHRoaXMuY2FzZSkudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKGNhc2VWaWV3ID0+IHRoaXMuY2FzZURldGFpbHMgPSBjYXNlVmlldylcbiAgICAgIC50aGVuKGNhc2VWaWV3ID0+IHRoaXMuY2FzZXNTZXJ2aWNlLmdldEV2ZW50VHJpZ2dlcihjYXNlVHlwZUlkLCB0aGlzLmV2ZW50LCBjYXNlVmlldy5jYXNlX2lkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpKVxuICAgICAgLnRoZW4oZXZlbnRUcmlnZ2VyID0+IHtcbiAgICAgICAgdGhpcy5ldmVudFRyaWdnZXJTZXJ2aWNlLmFubm91bmNlRXZlbnRUcmlnZ2VyKGV2ZW50VHJpZ2dlcik7XG4gICAgICAgIHRoaXMuZXZlbnRUcmlnZ2VyID0gZXZlbnRUcmlnZ2VyO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3I6IEh0dHBFcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmFsZXJ0U2VydmljZS5lcnJvcih7IHBocmFzZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3VibWl0KCk6IChzYW5pdGl6ZWRFZGl0Rm9ybTogQ2FzZUV2ZW50RGF0YSkgPT4gT2JzZXJ2YWJsZTxvYmplY3Q+IHtcbiAgICByZXR1cm4gKHNhbml0aXplZEVkaXRGb3JtOiBDYXNlRXZlbnREYXRhKSA9PlxuICAgICAgdGhpcy5jYXNlc1NlcnZpY2UuY3JlYXRlRXZlbnQodGhpcy5jYXNlRGV0YWlscywgc2FuaXRpemVkRWRpdEZvcm0pO1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlKCk6IChzYW5pdGl6ZWRFZGl0Rm9ybTogQ2FzZUV2ZW50RGF0YSwgcGFnZUlkOiBzdHJpbmcpID0+IE9ic2VydmFibGU8b2JqZWN0PiB7XG4gICAgcmV0dXJuIChzYW5pdGl6ZWRFZGl0Rm9ybTogQ2FzZUV2ZW50RGF0YSwgcGFnZUlkOiBzdHJpbmcpID0+IHRoaXMuY2FzZXNTZXJ2aWNlLnZhbGlkYXRlQ2FzZShcbiAgICAgIHRoaXMuY2FzZURldGFpbHMuY2FzZV90eXBlLmlkLFxuICAgICAgc2FuaXRpemVkRWRpdEZvcm0sXG4gICAgICBwYWdlSWQpO1xuICB9XG5cbiAgcHVibGljIGVtaXRDYW5jZWxsZWQoZXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmNhbmNlbGxlZC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBlbWl0U3VibWl0dGVkKGV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5zdWJtaXR0ZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBwdWJsaWMgaXNEYXRhTG9hZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50VHJpZ2dlciAmJiB0aGlzLmNhc2VEZXRhaWxzID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwiaXNEYXRhTG9hZGVkKClcIj5cbiAgICA8Y2NkLWNhc2UtZWRpdCBbc3VibWl0XT1cInN1Ym1pdCgpXCJcbiAgICAgICAgICAgICAgICAgICBbdmFsaWRhdGVdPVwidmFsaWRhdGUoKVwiXG4gICAgICAgICAgICAgICAgICAgW2Nhc2VEZXRhaWxzXT1cImNhc2VEZXRhaWxzXCJcbiAgICAgICAgICAgICAgICAgICBbZXZlbnRUcmlnZ2VyXT1cImV2ZW50VHJpZ2dlclwiXG4gICAgICAgICAgICAgICAgICAgKGNhbmNlbGxlZCk9XCJlbWl0Q2FuY2VsbGVkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgIChzdWJtaXR0ZWQpPVwiZW1pdFN1Ym1pdHRlZCgkZXZlbnQpXCI+PC9jY2QtY2FzZS1lZGl0PlxuPC9kaXY+Il19