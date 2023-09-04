import { Component, Input } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from '../../services/alert/alert.service';
import { CaseNotifier, CasesService } from '../case-editor';
import * as i0 from "@angular/core";
import * as i1 from "../case-editor";
import * as i2 from "../../services/alert/alert.service";
function CaseTimelineComponent_div_0_ng_container_2_ccd_event_log_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccd-event-log", 4);
    i0.ɵɵlistener("onCaseHistory", function CaseTimelineComponent_div_0_ng_container_2_ccd_event_log_1_Template_ccd_event_log_onCaseHistory_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r4.caseHistoryClicked($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("events", ctx_r3.events);
} }
function CaseTimelineComponent_div_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CaseTimelineComponent_div_0_ng_container_2_ccd_event_log_1_Template, 1, 1, "ccd-event-log", 3);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.displayMode === ctx_r1.dspMode.TIMELINE);
} }
function CaseTimelineComponent_div_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 5)(2, "ol", 6)(3, "li", 7)(4, "a", 8);
    i0.ɵɵlistener("click", function CaseTimelineComponent_div_0_ng_container_3_Template_a_click_4_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.goToCaseTimeline()); });
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "rpxTranslate");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelement(7, "ccd-case-history", 9);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 2, "Back to case timeline"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("event", ctx_r2.selectedEventId);
} }
function CaseTimelineComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementContainerStart(1, 1);
    i0.ɵɵtemplate(2, CaseTimelineComponent_div_0_ng_container_2_Template, 2, 1, "ng-container", 2);
    i0.ɵɵtemplate(3, CaseTimelineComponent_div_0_ng_container_3_Template, 8, 4, "ng-container", 2);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitch", ctx_r0.displayMode);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r0.dspMode.TIMELINE);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r0.dspMode.DETAILS);
} }
export var CaseTimelineDisplayMode;
(function (CaseTimelineDisplayMode) {
    CaseTimelineDisplayMode[CaseTimelineDisplayMode["TIMELINE"] = 0] = "TIMELINE";
    CaseTimelineDisplayMode[CaseTimelineDisplayMode["DETAILS"] = 1] = "DETAILS";
})(CaseTimelineDisplayMode || (CaseTimelineDisplayMode = {}));
export class CaseTimelineComponent {
    constructor(caseNotifier, casesService, alertService) {
        this.caseNotifier = caseNotifier;
        this.casesService = casesService;
        this.alertService = alertService;
        this.dspMode = CaseTimelineDisplayMode;
        this.displayMode = CaseTimelineDisplayMode.TIMELINE;
    }
    ngOnInit() {
        this.casesService
            .getCaseViewV2(this.case)
            .pipe(map(caseView => {
            this.events = caseView.events;
            this.caseNotifier.announceCase(caseView);
        }))
            .toPromise()
            .catch((error) => {
            this.alertService.error({ phrase: error.message });
            return throwError(error);
        });
    }
    isDataLoaded() {
        return this.events ? true : false;
    }
    caseHistoryClicked(eventId) {
        this.displayMode = CaseTimelineDisplayMode.DETAILS;
        this.selectedEventId = eventId;
    }
    goToCaseTimeline() {
        this.displayMode = CaseTimelineDisplayMode.TIMELINE;
    }
}
CaseTimelineComponent.ɵfac = function CaseTimelineComponent_Factory(t) { return new (t || CaseTimelineComponent)(i0.ɵɵdirectiveInject(i1.CaseNotifier), i0.ɵɵdirectiveInject(i1.CasesService), i0.ɵɵdirectiveInject(i2.AlertService)); };
CaseTimelineComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseTimelineComponent, selectors: [["ccd-case-timeline"]], inputs: { case: "case" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "ngSwitch"], [4, "ngSwitchCase"], [3, "events", "onCaseHistory", 4, "ngIf"], [3, "events", "onCaseHistory"], [1, "govuk-breadcrumbs"], [1, "govuk-breadcrumbs__list"], [1, "govuk-breadcrumbs__list-item"], ["href", "javascript:void(0)", 1, "govuk-back-link", 3, "click"], [3, "event"]], template: function CaseTimelineComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseTimelineComponent_div_0_Template, 4, 3, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isDataLoaded());
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseTimelineComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-timeline', template: "<div *ngIf=\"isDataLoaded()\">\n    <ng-container [ngSwitch]=\"displayMode\">\n        <ng-container *ngSwitchCase=\"dspMode.TIMELINE\">\n            <ccd-event-log [events]=\"events\" (onCaseHistory)=\"caseHistoryClicked($event)\" *ngIf=\"displayMode === dspMode.TIMELINE\">\n            </ccd-event-log>\n        </ng-container>\n        <ng-container *ngSwitchCase=\"dspMode.DETAILS\">\n            <div class=\"govuk-breadcrumbs\">\n                <ol class=\"govuk-breadcrumbs__list\">\n                    <li class=\"govuk-breadcrumbs__list-item\">\n                        <a href=\"javascript:void(0)\" (click)=\"goToCaseTimeline()\" class=\"govuk-back-link\">\n                          {{'Back to case timeline' | rpxTranslate}}\n                        </a>\n                    </li>\n                </ol>\n            </div>\n            <ccd-case-history [event]=\"selectedEventId\"></ccd-case-history>\n        </ng-container>\n    </ng-container>\n</div>\n" }]
    }], function () { return [{ type: i1.CaseNotifier }, { type: i1.CasesService }, { type: i2.AlertService }]; }, { case: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS10aW1lbGluZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS10aW1lbGluZS9jYXNlLXRpbWVsaW5lLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXRpbWVsaW5lL2Nhc2UtdGltZWxpbmUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHckMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztJQ0hoRCx3Q0FBdUg7SUFBdEYsK05BQWlCLGVBQUEsaUNBQTBCLENBQUEsSUFBQztJQUM3RSxpQkFBZ0I7OztJQURELHNDQUFpQjs7O0lBRHBDLDZCQUErQztJQUMzQywrR0FDZ0I7SUFDcEIsMEJBQWU7OztJQUZvRSxlQUFzQztJQUF0QyxxRUFBc0M7Ozs7SUFHekgsNkJBQThDO0lBQzFDLDhCQUErQixZQUFBLFlBQUEsV0FBQTtJQUdVLDZLQUFTLGVBQUEseUJBQWtCLENBQUEsSUFBQztJQUN2RCxZQUNGOztJQUFBLGlCQUFJLEVBQUEsRUFBQSxFQUFBO0lBSWhCLHNDQUErRDtJQUNuRSwwQkFBZTs7O0lBTkcsZUFDRjtJQURFLDhFQUNGO0lBSU0sZUFBeUI7SUFBekIsOENBQXlCOzs7SUFoQnZELDJCQUE0QjtJQUN4QixnQ0FBdUM7SUFDbkMsOEZBR2U7SUFDZiw4RkFXZTtJQUNuQiwwQkFBZTtJQUNuQixpQkFBTTs7O0lBbEJZLGVBQXdCO0lBQXhCLDZDQUF3QjtJQUNuQixlQUE4QjtJQUE5QixzREFBOEI7SUFJOUIsZUFBNkI7SUFBN0IscURBQTZCOztBREVwRCxNQUFNLENBQU4sSUFBWSx1QkFHWDtBQUhELFdBQVksdUJBQXVCO0lBQ2pDLDZFQUFRLENBQUE7SUFDUiwyRUFBTyxDQUFBO0FBQ1QsQ0FBQyxFQUhXLHVCQUF1QixLQUF2Qix1QkFBdUIsUUFHbEM7QUFLRCxNQUFNLE9BQU8scUJBQXFCO0lBVWhDLFlBQ21CLFlBQTBCLEVBQzFCLFlBQTBCLEVBQzFCLFlBQTBCO1FBRjFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTnRDLFlBQU8sR0FBRyx1QkFBdUIsQ0FBQztRQUNsQyxnQkFBVyxHQUE0Qix1QkFBdUIsQ0FBQyxRQUFRLENBQUM7SUFNNUUsQ0FBQztJQUVHLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWTthQUNkLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3hCLElBQUksQ0FDSCxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQ0g7YUFDQSxTQUFTLEVBQUU7YUFDWCxLQUFLLENBQUMsQ0FBQyxLQUFnQixFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbkQsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sWUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxPQUFlO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsdUJBQXVCLENBQUMsT0FBTyxDQUFDO1FBQ25ELElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO0lBQ2pDLENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7SUFDdEQsQ0FBQzs7MEZBM0NVLHFCQUFxQjt3RUFBckIscUJBQXFCO1FDaEJsQyxzRUFtQk07O1FBbkJBLHlDQUFvQjs7dUZEZ0JiLHFCQUFxQjtjQUpqQyxTQUFTOzJCQUNFLG1CQUFtQjtxSEFNdEIsSUFBSTtrQkFEVixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYXNlVmlld0V2ZW50IH0gZnJvbSAnLi4vLi4vZG9tYWluL2Nhc2Utdmlldy9jYXNlLXZpZXctZXZlbnQubW9kZWwnO1xuaW1wb3J0IHsgSHR0cEVycm9yIH0gZnJvbSAnLi4vLi4vZG9tYWluL2h0dHAvaHR0cC1lcnJvci5tb2RlbCc7XG5pbXBvcnQgeyBBbGVydFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbGVydC9hbGVydC5zZXJ2aWNlJztcbmltcG9ydCB7IENhc2VOb3RpZmllciwgQ2FzZXNTZXJ2aWNlIH0gZnJvbSAnLi4vY2FzZS1lZGl0b3InO1xuXG5leHBvcnQgZW51bSBDYXNlVGltZWxpbmVEaXNwbGF5TW9kZSB7XG4gIFRJTUVMSU5FLFxuICBERVRBSUxTXG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY2FzZS10aW1lbGluZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXNlLXRpbWVsaW5lLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXNlVGltZWxpbmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlOiBzdHJpbmc7XG5cbiAgcHVibGljIGV2ZW50czogQ2FzZVZpZXdFdmVudFtdO1xuICBwdWJsaWMgc2VsZWN0ZWRFdmVudElkOiBzdHJpbmc7XG4gIHB1YmxpYyBkc3BNb2RlID0gQ2FzZVRpbWVsaW5lRGlzcGxheU1vZGU7XG4gIHB1YmxpYyBkaXNwbGF5TW9kZTogQ2FzZVRpbWVsaW5lRGlzcGxheU1vZGUgPSBDYXNlVGltZWxpbmVEaXNwbGF5TW9kZS5USU1FTElORTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VOb3RpZmllcjogQ2FzZU5vdGlmaWVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FzZXNTZXJ2aWNlOiBDYXNlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBhbGVydFNlcnZpY2U6IEFsZXJ0U2VydmljZSxcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNhc2VzU2VydmljZVxuICAgICAgLmdldENhc2VWaWV3VjIodGhpcy5jYXNlKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChjYXNlVmlldyA9PiB7XG4gICAgICAgICAgdGhpcy5ldmVudHMgPSBjYXNlVmlldy5ldmVudHM7XG4gICAgICAgICAgdGhpcy5jYXNlTm90aWZpZXIuYW5ub3VuY2VDYXNlKGNhc2VWaWV3KTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLmNhdGNoKChlcnJvcjogSHR0cEVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmVycm9yKHsgcGhyYXNlOiBlcnJvci5tZXNzYWdlIH0pO1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpc0RhdGFMb2FkZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRzID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGNhc2VIaXN0b3J5Q2xpY2tlZChldmVudElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRpc3BsYXlNb2RlID0gQ2FzZVRpbWVsaW5lRGlzcGxheU1vZGUuREVUQUlMUztcbiAgICB0aGlzLnNlbGVjdGVkRXZlbnRJZCA9IGV2ZW50SWQ7XG4gIH1cblxuICBwdWJsaWMgZ29Ub0Nhc2VUaW1lbGluZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3BsYXlNb2RlID0gQ2FzZVRpbWVsaW5lRGlzcGxheU1vZGUuVElNRUxJTkU7XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJpc0RhdGFMb2FkZWQoKVwiPlxuICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImRpc3BsYXlNb2RlXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImRzcE1vZGUuVElNRUxJTkVcIj5cbiAgICAgICAgICAgIDxjY2QtZXZlbnQtbG9nIFtldmVudHNdPVwiZXZlbnRzXCIgKG9uQ2FzZUhpc3RvcnkpPVwiY2FzZUhpc3RvcnlDbGlja2VkKCRldmVudClcIiAqbmdJZj1cImRpc3BsYXlNb2RlID09PSBkc3BNb2RlLlRJTUVMSU5FXCI+XG4gICAgICAgICAgICA8L2NjZC1ldmVudC1sb2c+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJkc3BNb2RlLkRFVEFJTFNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1icmVhZGNydW1ic1wiPlxuICAgICAgICAgICAgICAgIDxvbCBjbGFzcz1cImdvdnVrLWJyZWFkY3J1bWJzX19saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImdvdnVrLWJyZWFkY3J1bWJzX19saXN0LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ29Ub0Nhc2VUaW1lbGluZSgpXCIgY2xhc3M9XCJnb3Z1ay1iYWNrLWxpbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3snQmFjayB0byBjYXNlIHRpbWVsaW5lJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGNjZC1jYXNlLWhpc3RvcnkgW2V2ZW50XT1cInNlbGVjdGVkRXZlbnRJZFwiPjwvY2NkLWNhc2UtaGlzdG9yeT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbiJdfQ==