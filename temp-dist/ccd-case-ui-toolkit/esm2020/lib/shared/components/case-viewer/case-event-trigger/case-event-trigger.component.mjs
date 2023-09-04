import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DisplayMode } from '../../../domain';
import { CaseReferencePipe } from '../../../pipes';
import { ActivityPollingService, AlertService, EventStatusService, FieldsUtils } from '../../../services';
import { CaseNotifier, CasesService } from '../../case-editor';
import * as i0 from "@angular/core";
import * as i1 from "../../case-editor";
import * as i2 from "@angular/router";
import * as i3 from "../../../services";
import * as i4 from "../../../pipes";
function CaseEventTriggerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelement(1, "ccd-activity", 2);
    i0.ɵɵelementStart(2, "ccd-case-edit", 3);
    i0.ɵɵlistener("cancelled", function CaseEventTriggerComponent_div_0_Template_ccd_case_edit_cancelled_2_listener() { i0.ɵɵrestoreView(_r2); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancel()); })("submitted", function CaseEventTriggerComponent_div_0_Template_ccd_case_edit_submitted_2_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.submitted($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseId", ctx_r0.caseDetails.case_id)("displayMode", ctx_r0.BANNER);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseDetails", ctx_r0.caseDetails)("submit", ctx_r0.submit())("validate", ctx_r0.validate())("eventTrigger", ctx_r0.eventTrigger);
} }
export class CaseEventTriggerComponent {
    constructor(ngZone, casesService, caseNotifier, router, alertService, route, caseReferencePipe, activityPollingService) {
        this.ngZone = ngZone;
        this.casesService = casesService;
        this.caseNotifier = caseNotifier;
        this.router = router;
        this.alertService = alertService;
        this.route = route;
        this.caseReferencePipe = caseReferencePipe;
        this.activityPollingService = activityPollingService;
        this.BANNER = DisplayMode.BANNER;
    }
    ngOnInit() {
        if (this.route.snapshot.data.case) {
            this.caseDetails = this.route.snapshot.data.case;
        }
        else {
            this.caseSubscription = this.caseNotifier.caseView.subscribe(caseDetails => {
                this.caseDetails = caseDetails;
            });
        }
        this.eventTrigger = this.route.snapshot.data.eventTrigger;
        if (this.activityPollingService.isEnabled) {
            this.ngZone.runOutsideAngular(() => {
                this.activitySubscription = this.postEditActivity().subscribe(() => {
                    // console.log('Posted EDIT activity and result is: ' + JSON.stringify(_resolved));
                });
            });
        }
        this.route.parent.url.subscribe(path => {
            this.parentUrl = `/${path.join('/')}`;
        });
    }
    ngOnDestroy() {
        if (this.activitySubscription && this.activityPollingService.isEnabled) {
            this.activitySubscription.unsubscribe();
        }
        if (!this.route.snapshot.data.case && this.caseSubscription) {
            this.caseSubscription.unsubscribe();
        }
    }
    postEditActivity() {
        return this.activityPollingService.postEditActivity(this.caseDetails.case_id);
    }
    submit() {
        return (sanitizedEditForm) => this.casesService.createEvent(this.caseDetails, sanitizedEditForm);
    }
    validate() {
        return (sanitizedEditForm, pageId) => {
            // Bypass validation if the CaseEventData data object contains a FlagLauncher field; this field type cannot be
            // validated like regular fields. Need to match this field id against that of the defined FlagLauncher CaseField
            // (if it exists on any CaseTab)
            let flagLauncherCaseField;
            if (this.caseDetails.tabs) {
                for (const tab of this.caseDetails.tabs) {
                    if (tab.fields) {
                        flagLauncherCaseField = tab.fields.find(caseField => FieldsUtils.isFlagLauncherCaseField(caseField));
                        // Stop searching for a FlagLauncher field as soon as it is found
                        if (flagLauncherCaseField) {
                            break;
                        }
                    }
                }
            }
            return flagLauncherCaseField && sanitizedEditForm.data.hasOwnProperty(flagLauncherCaseField.id)
                ? of(null)
                : this.casesService.validateCase(this.caseDetails.case_type.id, sanitizedEditForm, pageId);
        };
    }
    submitted(event) {
        const eventStatus = event['status'];
        this.router
            .navigate([this.parentUrl])
            .then(() => {
            const caseReference = this.caseReferencePipe.transform(this.caseDetails.case_id.toString());
            const replacements = { CASEREFERENCE: caseReference, NAME: this.eventTrigger.name };
            if (EventStatusService.isIncomplete(eventStatus)) {
                this.alertService.warning({
                    phrase: `Case #%CASEREFERENCE% has been updated with event: %NAME%
            but the callback service cannot be completed`,
                    replacements
                });
            }
            else {
                this.alertService.success({
                    phrase: 'Case #%CASEREFERENCE% has been updated with event: %NAME%',
                    replacements,
                    preserve: true
                });
            }
        });
    }
    cancel() {
        if (this.router.url && this.router.url.includes('linkCases')) {
            this.router.navigate(['cases', 'case-details', this.caseDetails.case_id], { fragment: 'Linked cases' });
        }
        else {
            return this.router.navigate([this.parentUrl]);
        }
    }
    isDataLoaded() {
        return !!(this.eventTrigger && this.caseDetails);
    }
}
CaseEventTriggerComponent.ɵfac = function CaseEventTriggerComponent_Factory(t) { return new (t || CaseEventTriggerComponent)(i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i1.CasesService), i0.ɵɵdirectiveInject(i1.CaseNotifier), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.AlertService), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i4.CaseReferencePipe), i0.ɵɵdirectiveInject(i3.ActivityPollingService)); };
CaseEventTriggerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseEventTriggerComponent, selectors: [["ccd-case-event-trigger"]], decls: 1, vars: 1, consts: [["class", "screen-990", 4, "ngIf"], [1, "screen-990"], [3, "caseId", "displayMode"], [3, "caseDetails", "submit", "validate", "eventTrigger", "cancelled", "submitted"]], template: function CaseEventTriggerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseEventTriggerComponent_div_0_Template, 3, 6, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isDataLoaded());
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseEventTriggerComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-event-trigger', template: "<div *ngIf=\"isDataLoaded()\" class=\"screen-990\">\n  <ccd-activity [caseId]=\"caseDetails.case_id\" [displayMode]=\"BANNER\"></ccd-activity>\n  <ccd-case-edit [caseDetails]=\"caseDetails\"\n                 [submit]=\"submit()\"\n                 [validate]=\"validate()\"\n                 [eventTrigger]=\"eventTrigger\"\n                 (cancelled)=\"cancel()\"\n                 (submitted)=\"submitted($event)\"></ccd-case-edit>\n</div>\n" }]
    }], function () { return [{ type: i0.NgZone }, { type: i1.CasesService }, { type: i1.CaseNotifier }, { type: i2.Router }, { type: i3.AlertService }, { type: i2.ActivatedRoute }, { type: i4.CaseReferencePipe }, { type: i3.ActivityPollingService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1ldmVudC10cmlnZ2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLWV2ZW50LXRyaWdnZXIvY2FzZS1ldmVudC10cmlnZ2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLWV2ZW50LXRyaWdnZXIvY2FzZS1ldmVudC10cmlnZ2VyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV0QyxPQUFPLEVBQWtFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUcsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7SUNQL0QsOEJBQStDO0lBQzdDLGtDQUFtRjtJQUNuRix3Q0FLK0M7SUFEaEMscUxBQWEsZUFBQSxlQUFRLENBQUEsSUFBQyw4S0FDVCxlQUFBLHdCQUFpQixDQUFBLElBRFI7SUFDVSxpQkFBZ0IsRUFBQTs7O0lBTmpELGVBQThCO0lBQTlCLG1EQUE4Qiw4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LCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBBY3Rpdml0eSwgQ2FzZUV2ZW50RGF0YSwgQ2FzZUV2ZW50VHJpZ2dlciwgQ2FzZUZpZWxkLCBDYXNlVmlldywgRGlzcGxheU1vZGUgfSBmcm9tICcuLi8uLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQ2FzZVJlZmVyZW5jZVBpcGUgfSBmcm9tICcuLi8uLi8uLi9waXBlcyc7XG5pbXBvcnQgeyBBY3Rpdml0eVBvbGxpbmdTZXJ2aWNlLCBBbGVydFNlcnZpY2UsIEV2ZW50U3RhdHVzU2VydmljZSwgRmllbGRzVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBDYXNlTm90aWZpZXIsIENhc2VzU2VydmljZSB9IGZyb20gJy4uLy4uL2Nhc2UtZWRpdG9yJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWNhc2UtZXZlbnQtdHJpZ2dlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXNlLWV2ZW50LXRyaWdnZXIuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZUV2ZW50VHJpZ2dlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHVibGljIEJBTk5FUiA9IERpc3BsYXlNb2RlLkJBTk5FUjtcbiAgcHVibGljIGV2ZW50VHJpZ2dlcjogQ2FzZUV2ZW50VHJpZ2dlcjtcbiAgcHVibGljIGNhc2VEZXRhaWxzOiBDYXNlVmlldztcbiAgcHVibGljIGFjdGl2aXR5U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBjYXNlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBwYXJlbnRVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FzZXNTZXJ2aWNlOiBDYXNlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXNlTm90aWZpZXI6IENhc2VOb3RpZmllcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYWxlcnRTZXJ2aWNlOiBBbGVydFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXNlUmVmZXJlbmNlUGlwZTogQ2FzZVJlZmVyZW5jZVBpcGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBhY3Rpdml0eVBvbGxpbmdTZXJ2aWNlOiBBY3Rpdml0eVBvbGxpbmdTZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJvdXRlLnNuYXBzaG90LmRhdGEuY2FzZSkge1xuICAgICAgdGhpcy5jYXNlRGV0YWlscyA9IHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2FzZVN1YnNjcmlwdGlvbiA9IHRoaXMuY2FzZU5vdGlmaWVyLmNhc2VWaWV3LnN1YnNjcmliZShjYXNlRGV0YWlscyA9PiB7XG4gICAgICAgICAgdGhpcy5jYXNlRGV0YWlscyA9IGNhc2VEZXRhaWxzO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5ldmVudFRyaWdnZXIgPSB0aGlzLnJvdXRlLnNuYXBzaG90LmRhdGEuZXZlbnRUcmlnZ2VyO1xuICAgIGlmICh0aGlzLmFjdGl2aXR5UG9sbGluZ1NlcnZpY2UuaXNFbmFibGVkKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhciggKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2aXR5U3Vic2NyaXB0aW9uID0gdGhpcy5wb3N0RWRpdEFjdGl2aXR5KCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnUG9zdGVkIEVESVQgYWN0aXZpdHkgYW5kIHJlc3VsdCBpczogJyArIEpTT04uc3RyaW5naWZ5KF9yZXNvbHZlZCkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnJvdXRlLnBhcmVudC51cmwuc3Vic2NyaWJlKHBhdGggPT4ge1xuICAgICAgdGhpcy5wYXJlbnRVcmwgPSBgLyR7cGF0aC5qb2luKCcvJyl9YDtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hY3Rpdml0eVN1YnNjcmlwdGlvbiAmJiB0aGlzLmFjdGl2aXR5UG9sbGluZ1NlcnZpY2UuaXNFbmFibGVkKSB7XG4gICAgICB0aGlzLmFjdGl2aXR5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5yb3V0ZS5zbmFwc2hvdC5kYXRhLmNhc2UgJiYgdGhpcy5jYXNlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNhc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcG9zdEVkaXRBY3Rpdml0eSgpOiBPYnNlcnZhYmxlPEFjdGl2aXR5W10+IHtcbiAgICByZXR1cm4gdGhpcy5hY3Rpdml0eVBvbGxpbmdTZXJ2aWNlLnBvc3RFZGl0QWN0aXZpdHkodGhpcy5jYXNlRGV0YWlscy5jYXNlX2lkKTtcbiAgfVxuXG4gIHB1YmxpYyBzdWJtaXQoKTogKHNhbml0aXplZEVkaXRGb3JtOiBDYXNlRXZlbnREYXRhKSA9PiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuICAgIHJldHVybiAoc2FuaXRpemVkRWRpdEZvcm06IENhc2VFdmVudERhdGEpID0+XG4gICAgICB0aGlzLmNhc2VzU2VydmljZS5jcmVhdGVFdmVudCh0aGlzLmNhc2VEZXRhaWxzLCBzYW5pdGl6ZWRFZGl0Rm9ybSk7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGUoKTogKHNhbml0aXplZEVkaXRGb3JtOiBDYXNlRXZlbnREYXRhLCBwYWdlSWQ6IHN0cmluZykgPT4gT2JzZXJ2YWJsZTxvYmplY3Q+IHtcbiAgICByZXR1cm4gKHNhbml0aXplZEVkaXRGb3JtOiBDYXNlRXZlbnREYXRhLCBwYWdlSWQ6IHN0cmluZykgPT4ge1xuICAgICAgLy8gQnlwYXNzIHZhbGlkYXRpb24gaWYgdGhlIENhc2VFdmVudERhdGEgZGF0YSBvYmplY3QgY29udGFpbnMgYSBGbGFnTGF1bmNoZXIgZmllbGQ7IHRoaXMgZmllbGQgdHlwZSBjYW5ub3QgYmVcbiAgICAgIC8vIHZhbGlkYXRlZCBsaWtlIHJlZ3VsYXIgZmllbGRzLiBOZWVkIHRvIG1hdGNoIHRoaXMgZmllbGQgaWQgYWdhaW5zdCB0aGF0IG9mIHRoZSBkZWZpbmVkIEZsYWdMYXVuY2hlciBDYXNlRmllbGRcbiAgICAgIC8vIChpZiBpdCBleGlzdHMgb24gYW55IENhc2VUYWIpXG4gICAgICBsZXQgZmxhZ0xhdW5jaGVyQ2FzZUZpZWxkOiBDYXNlRmllbGQ7XG4gICAgICBpZiAodGhpcy5jYXNlRGV0YWlscy50YWJzKSB7XG4gICAgICAgIGZvciAoY29uc3QgdGFiIG9mIHRoaXMuY2FzZURldGFpbHMudGFicykge1xuICAgICAgICAgIGlmICh0YWIuZmllbGRzKSB7XG4gICAgICAgICAgICBmbGFnTGF1bmNoZXJDYXNlRmllbGQgPSB0YWIuZmllbGRzLmZpbmQoY2FzZUZpZWxkID0+IEZpZWxkc1V0aWxzLmlzRmxhZ0xhdW5jaGVyQ2FzZUZpZWxkKGNhc2VGaWVsZCkpO1xuICAgICAgICAgICAgLy8gU3RvcCBzZWFyY2hpbmcgZm9yIGEgRmxhZ0xhdW5jaGVyIGZpZWxkIGFzIHNvb24gYXMgaXQgaXMgZm91bmRcbiAgICAgICAgICAgIGlmIChmbGFnTGF1bmNoZXJDYXNlRmllbGQpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbGFnTGF1bmNoZXJDYXNlRmllbGQgJiYgc2FuaXRpemVkRWRpdEZvcm0uZGF0YS5oYXNPd25Qcm9wZXJ0eShmbGFnTGF1bmNoZXJDYXNlRmllbGQuaWQpXG4gICAgICAgID8gb2YobnVsbClcbiAgICAgICAgOiB0aGlzLmNhc2VzU2VydmljZS52YWxpZGF0ZUNhc2UodGhpcy5jYXNlRGV0YWlscy5jYXNlX3R5cGUuaWQsIHNhbml0aXplZEVkaXRGb3JtLCBwYWdlSWQpO1xuICAgIH07XG4gIH1cblxuICBwdWJsaWMgc3VibWl0dGVkKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBldmVudFN0YXR1czogc3RyaW5nID0gZXZlbnRbJ3N0YXR1cyddO1xuICAgIHRoaXMucm91dGVyXG4gICAgICAubmF2aWdhdGUoW3RoaXMucGFyZW50VXJsXSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgY2FzZVJlZmVyZW5jZSA9IHRoaXMuY2FzZVJlZmVyZW5jZVBpcGUudHJhbnNmb3JtKHRoaXMuY2FzZURldGFpbHMuY2FzZV9pZC50b1N0cmluZygpKTtcbiAgICAgICAgY29uc3QgcmVwbGFjZW1lbnRzID0geyBDQVNFUkVGRVJFTkNFOiBjYXNlUmVmZXJlbmNlLCBOQU1FOiB0aGlzLmV2ZW50VHJpZ2dlci5uYW1lIH07XG4gICAgICAgIGlmIChFdmVudFN0YXR1c1NlcnZpY2UuaXNJbmNvbXBsZXRlKGV2ZW50U3RhdHVzKSkge1xuICAgICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLndhcm5pbmcoe1xuICAgICAgICAgICAgcGhyYXNlOiBgQ2FzZSAjJUNBU0VSRUZFUkVOQ0UlIGhhcyBiZWVuIHVwZGF0ZWQgd2l0aCBldmVudDogJU5BTUUlXG4gICAgICAgICAgICBidXQgdGhlIGNhbGxiYWNrIHNlcnZpY2UgY2Fubm90IGJlIGNvbXBsZXRlZGAsXG4gICAgICAgICAgICByZXBsYWNlbWVudHNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmFsZXJ0U2VydmljZS5zdWNjZXNzKHtcbiAgICAgICAgICAgIHBocmFzZTogJ0Nhc2UgIyVDQVNFUkVGRVJFTkNFJSBoYXMgYmVlbiB1cGRhdGVkIHdpdGggZXZlbnQ6ICVOQU1FJScsXG4gICAgICAgICAgICByZXBsYWNlbWVudHMsXG4gICAgICAgICAgICBwcmVzZXJ2ZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2FuY2VsKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICh0aGlzLnJvdXRlci51cmwgJiYgdGhpcy5yb3V0ZXIudXJsLmluY2x1ZGVzKCdsaW5rQ2FzZXMnKSkge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydjYXNlcycsICdjYXNlLWRldGFpbHMnLCB0aGlzLmNhc2VEZXRhaWxzLmNhc2VfaWRdLCB7IGZyYWdtZW50OiAnTGlua2VkIGNhc2VzJyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLnBhcmVudFVybF0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0RhdGFMb2FkZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKHRoaXMuZXZlbnRUcmlnZ2VyICYmIHRoaXMuY2FzZURldGFpbHMpO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwiaXNEYXRhTG9hZGVkKClcIiBjbGFzcz1cInNjcmVlbi05OTBcIj5cbiAgPGNjZC1hY3Rpdml0eSBbY2FzZUlkXT1cImNhc2VEZXRhaWxzLmNhc2VfaWRcIiBbZGlzcGxheU1vZGVdPVwiQkFOTkVSXCI+PC9jY2QtYWN0aXZpdHk+XG4gIDxjY2QtY2FzZS1lZGl0IFtjYXNlRGV0YWlsc109XCJjYXNlRGV0YWlsc1wiXG4gICAgICAgICAgICAgICAgIFtzdWJtaXRdPVwic3VibWl0KClcIlxuICAgICAgICAgICAgICAgICBbdmFsaWRhdGVdPVwidmFsaWRhdGUoKVwiXG4gICAgICAgICAgICAgICAgIFtldmVudFRyaWdnZXJdPVwiZXZlbnRUcmlnZ2VyXCJcbiAgICAgICAgICAgICAgICAgKGNhbmNlbGxlZCk9XCJjYW5jZWwoKVwiXG4gICAgICAgICAgICAgICAgIChzdWJtaXR0ZWQpPVwic3VibWl0dGVkKCRldmVudClcIj48L2NjZC1jYXNlLWVkaXQ+XG48L2Rpdj5cbiJdfQ==