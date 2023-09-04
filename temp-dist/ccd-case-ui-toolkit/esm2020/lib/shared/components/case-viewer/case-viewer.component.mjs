import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractAppConfig } from '../../../app.config';
import { CaseNotifier } from '../case-editor';
import { OrderService } from '../../services';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../case-editor";
import * as i3 from "../../../app.config";
import * as i4 from "../../services";
function CaseViewerComponent_div_0_ccd_case_basic_access_view_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-case-basic-access-view", 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("accessType", ctx_r1.userAccessType)("caseDetails", ctx_r1.caseDetails);
} }
function CaseViewerComponent_div_0_ccd_case_full_access_view_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-case-full-access-view", 4);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("caseDetails", ctx_r2.caseDetails)("hasPrint", ctx_r2.hasPrint)("hasEventSelector", ctx_r2.hasEventSelector)("prependedTabs", ctx_r2.prependedTabs)("appendedTabs", ctx_r2.appendedTabs);
} }
function CaseViewerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, CaseViewerComponent_div_0_ccd_case_basic_access_view_1_Template, 1, 2, "ccd-case-basic-access-view", 1);
    i0.ɵɵtemplate(2, CaseViewerComponent_div_0_ccd_case_full_access_view_2_Template, 1, 5, "ccd-case-full-access-view", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.hasStandardAccess());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.hasStandardAccess());
} }
export class CaseViewerComponent {
    constructor(route, caseNotifier, appConfig, orderService) {
        this.route = route;
        this.caseNotifier = caseNotifier;
        this.appConfig = appConfig;
        this.orderService = orderService;
        this.hasPrint = true;
        this.hasEventSelector = true;
        this.prependedTabs = [];
        this.appendedTabs = [];
    }
    ngOnInit() {
        console.info('Loading case details...');
        this.loadCaseDetails();
        console.info('Loaded case details...');
    }
    ngOnDestroy() {
        if (this.caseSubscription) {
            this.caseSubscription.unsubscribe();
        }
    }
    loadCaseDetails() {
        if (this.route.snapshot.data.case) {
            console.info('Setting the case into case viewer component from this.route.snapshot.data.case.');
            this.caseDetails = this.route.snapshot.data.case;
            this.caseDetails.tabs = this.orderService.sort(this.caseDetails.tabs);
            this.caseDetails.tabs = this.suffixDuplicateTabs(this.caseDetails.tabs);
            this.setUserAccessType(this.caseDetails);
        }
        else {
            this.caseSubscription = this.caseNotifier.caseView.subscribe(caseDetails => {
                console.info('Setting the case into case viewer component as retrieved from XHR request.');
                this.caseDetails = caseDetails;
                this.setUserAccessType(this.caseDetails);
            });
        }
    }
    setUserAccessType(caseDetails) {
        if (caseDetails && Array.isArray(caseDetails.metadataFields)) {
            const accessProcess = caseDetails.metadataFields.find(metadataField => metadataField.id === CaseViewerComponent.METADATA_FIELD_ACCESS_PROCESS_ID);
            const accessGranted = caseDetails.metadataFields.find(metadataField => metadataField.id === CaseViewerComponent.METADATA_FIELD_ACCESS_GRANTED_ID);
            this.accessGranted = accessGranted ? accessGranted.value !== CaseViewerComponent.BASIC_USER_ACCESS_TYPES : false;
            this.userAccessType = accessProcess ? accessProcess.value : null;
        }
    }
    isDataLoaded() {
        return !!this.caseDetails;
    }
    hasStandardAccess() {
        const featureToggleOn = this.appConfig.getAccessManagementMode();
        return featureToggleOn ?
            !this.accessGranted ? CaseViewerComponent.NON_STANDARD_USER_ACCESS_TYPES.indexOf(this.userAccessType) === -1 : true
            : true;
    }
    suffixDuplicateTabs(tabs) {
        const count = {};
        const firstOccurences = {};
        let item;
        let itemCount;
        for (let i = 0, c = tabs.length; i < c; i++) {
            item = tabs[i].label;
            itemCount = count[item];
            itemCount = count[item] = (itemCount == null ? 1 : itemCount + 1);
            if (count[item] > 1)
                tabs[i].label = tabs[i].label + Array(count[item] - 1).fill('_').join('');
            else
                firstOccurences[item] = i;
        }
        return tabs;
    }
}
CaseViewerComponent.METADATA_FIELD_ACCESS_PROCESS_ID = '[ACCESS_PROCESS]';
CaseViewerComponent.METADATA_FIELD_ACCESS_GRANTED_ID = '[ACCESS_GRANTED]';
CaseViewerComponent.NON_STANDARD_USER_ACCESS_TYPES = ['CHALLENGED', 'SPECIFIC'];
CaseViewerComponent.BASIC_USER_ACCESS_TYPES = 'BASIC';
CaseViewerComponent.ɵfac = function CaseViewerComponent_Factory(t) { return new (t || CaseViewerComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.CaseNotifier), i0.ɵɵdirectiveInject(i3.AbstractAppConfig), i0.ɵɵdirectiveInject(i4.OrderService)); };
CaseViewerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseViewerComponent, selectors: [["ccd-case-viewer"]], inputs: { hasPrint: "hasPrint", hasEventSelector: "hasEventSelector", prependedTabs: "prependedTabs", appendedTabs: "appendedTabs" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "accessType", "caseDetails", 4, "ngIf"], [3, "caseDetails", "hasPrint", "hasEventSelector", "prependedTabs", "appendedTabs", 4, "ngIf"], [3, "accessType", "caseDetails"], [3, "caseDetails", "hasPrint", "hasEventSelector", "prependedTabs", "appendedTabs"]], template: function CaseViewerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseViewerComponent_div_0_Template, 3, 2, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isDataLoaded());
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseViewerComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-viewer', template: "<div *ngIf=\"isDataLoaded()\">\n  <ccd-case-basic-access-view *ngIf=\"!hasStandardAccess()\"\n                              [accessType]=\"userAccessType\"\n                              [caseDetails]=\"caseDetails\">\n  </ccd-case-basic-access-view>\n  <ccd-case-full-access-view *ngIf=\"hasStandardAccess()\"\n                             [caseDetails]=\"caseDetails\"\n                             [hasPrint]=\"hasPrint\"\n                             [hasEventSelector]=\"hasEventSelector\"\n                             [prependedTabs]=\"prependedTabs\"\n                             [appendedTabs]=\"appendedTabs\">\n  </ccd-case-full-access-view>\n</div>\n" }]
    }], function () { return [{ type: i1.ActivatedRoute }, { type: i2.CaseNotifier }, { type: i3.AbstractAppConfig }, { type: i4.OrderService }]; }, { hasPrint: [{
            type: Input
        }], hasEventSelector: [{
            type: Input
        }], prependedTabs: [{
            type: Input
        }], appendedTabs: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS12aWV3ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Nhc2Utdmlld2VyL2Nhc2Utdmlld2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLXZpZXdlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7SUNMNUMsZ0RBRzZCOzs7SUFGRCxrREFBNkIsbUNBQUE7OztJQUd6RCwrQ0FNNEI7OztJQUxELGdEQUEyQiw2QkFBQSw2Q0FBQSx1Q0FBQSxxQ0FBQTs7O0lBTnhELDJCQUE0QjtJQUMxQix3SEFHNkI7SUFDN0Isc0hBTTRCO0lBQzlCLGlCQUFNOzs7SUFYeUIsZUFBMEI7SUFBMUIsa0RBQTBCO0lBSTNCLGVBQXlCO0lBQXpCLGlEQUF5Qjs7QURPdkQsTUFBTSxPQUFPLG1CQUFtQjtJQWdCOUIsWUFDbUIsS0FBcUIsRUFDckIsWUFBMEIsRUFDMUIsU0FBNEIsRUFDNUIsWUFBMEI7UUFIMUIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsY0FBUyxHQUFU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QUFDOztBQTNGc0Isb0RBQWdDLEdBQUcsa0JBQWtCLENBQUM7QUFDdEQsb0RBQWdDLEdBQUcsa0JBQWtCLENBQUM7QUFDdEQsa0RBQThCLEdBQUcsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDNUQsMkNBQXVCLEdBQUcsT0FBTyxDQUFDO3NGQUo5QyxtQkFBbUI7c0VBQW5CLG1CQUFtQjtRQ1poQyxvRUFZTTs7UUFaQSx5Q0FBb0I7O3VGRFliLG1CQUFtQjtjQUovQixTQUFTOzJCQUNFLGlCQUFpQjt1SkFTWCxRQUFRO2tCQUF2QixLQUFLO1lBQ1UsZ0JBQWdCO2tCQUEvQixLQUFLO1lBQ1UsYUFBYTtrQkFBNUIsS0FBSztZQUNVLFlBQVk7a0JBQTNCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBYnN0cmFjdEFwcENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgQ2FzZVRhYiwgQ2FzZVZpZXcgfSBmcm9tICcuLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQ2FzZU5vdGlmaWVyIH0gZnJvbSAnLi4vY2FzZS1lZGl0b3InO1xuaW1wb3J0IHsgT3JkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY2FzZS12aWV3ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FzZS12aWV3ZXIuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENhc2VWaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTUVUQURBVEFfRklFTERfQUNDRVNTX1BST0NFU1NfSUQgPSAnW0FDQ0VTU19QUk9DRVNTXSc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTUVUQURBVEFfRklFTERfQUNDRVNTX0dSQU5URURfSUQgPSAnW0FDQ0VTU19HUkFOVEVEXSc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTk9OX1NUQU5EQVJEX1VTRVJfQUNDRVNTX1RZUEVTID0gWydDSEFMTEVOR0VEJywgJ1NQRUNJRklDJ107XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQkFTSUNfVVNFUl9BQ0NFU1NfVFlQRVMgPSAnQkFTSUMnO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBoYXNQcmludCA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBoYXNFdmVudFNlbGVjdG9yID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIHByZXBlbmRlZFRhYnM6IENhc2VUYWJbXSA9IFtdO1xuICBASW5wdXQoKSBwdWJsaWMgYXBwZW5kZWRUYWJzOiBDYXNlVGFiW10gPSBbXTtcblxuICBwdWJsaWMgY2FzZURldGFpbHM6IENhc2VWaWV3O1xuICBwdWJsaWMgY2FzZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwdWJsaWMgdXNlckFjY2Vzc1R5cGU6IHN0cmluZztcbiAgcHVibGljIGFjY2Vzc0dyYW50ZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXNlTm90aWZpZXI6IENhc2VOb3RpZmllcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFwcENvbmZpZzogQWJzdHJhY3RBcHBDb25maWcsXG4gICAgcHJpdmF0ZSByZWFkb25seSBvcmRlclNlcnZpY2U6IE9yZGVyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUuaW5mbygnTG9hZGluZyBjYXNlIGRldGFpbHMuLi4nKTtcbiAgICB0aGlzLmxvYWRDYXNlRGV0YWlscygpO1xuICAgIGNvbnNvbGUuaW5mbygnTG9hZGVkIGNhc2UgZGV0YWlscy4uLicpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhc2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY2FzZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBsb2FkQ2FzZURldGFpbHMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlKSB7XG4gICAgICBjb25zb2xlLmluZm8oJ1NldHRpbmcgdGhlIGNhc2UgaW50byBjYXNlIHZpZXdlciBjb21wb25lbnQgZnJvbSB0aGlzLnJvdXRlLnNuYXBzaG90LmRhdGEuY2FzZS4nKTtcbiAgICAgIHRoaXMuY2FzZURldGFpbHMgPSB0aGlzLnJvdXRlLnNuYXBzaG90LmRhdGEuY2FzZTtcbiAgICAgIHRoaXMuY2FzZURldGFpbHMudGFicyA9IHRoaXMub3JkZXJTZXJ2aWNlLnNvcnQodGhpcy5jYXNlRGV0YWlscy50YWJzKTtcbiAgICAgIHRoaXMuY2FzZURldGFpbHMudGFicyA9IHRoaXMuc3VmZml4RHVwbGljYXRlVGFicyh0aGlzLmNhc2VEZXRhaWxzLnRhYnMpO1xuICAgICAgdGhpcy5zZXRVc2VyQWNjZXNzVHlwZSh0aGlzLmNhc2VEZXRhaWxzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYXNlU3Vic2NyaXB0aW9uID0gdGhpcy5jYXNlTm90aWZpZXIuY2FzZVZpZXcuc3Vic2NyaWJlKGNhc2VEZXRhaWxzID0+IHtcbiAgICAgICAgY29uc29sZS5pbmZvKCdTZXR0aW5nIHRoZSBjYXNlIGludG8gY2FzZSB2aWV3ZXIgY29tcG9uZW50IGFzIHJldHJpZXZlZCBmcm9tIFhIUiByZXF1ZXN0LicpO1xuICAgICAgICB0aGlzLmNhc2VEZXRhaWxzID0gY2FzZURldGFpbHM7XG4gICAgICAgIHRoaXMuc2V0VXNlckFjY2Vzc1R5cGUodGhpcy5jYXNlRGV0YWlscyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0VXNlckFjY2Vzc1R5cGUoY2FzZURldGFpbHM6IENhc2VWaWV3KTogdm9pZCB7XG4gICAgaWYgKGNhc2VEZXRhaWxzICYmIEFycmF5LmlzQXJyYXkoY2FzZURldGFpbHMubWV0YWRhdGFGaWVsZHMpKSB7XG4gICAgICBjb25zdCBhY2Nlc3NQcm9jZXNzID0gY2FzZURldGFpbHMubWV0YWRhdGFGaWVsZHMuZmluZChtZXRhZGF0YUZpZWxkID0+XG4gICAgICAgIG1ldGFkYXRhRmllbGQuaWQgPT09IENhc2VWaWV3ZXJDb21wb25lbnQuTUVUQURBVEFfRklFTERfQUNDRVNTX1BST0NFU1NfSUQpO1xuICAgICAgY29uc3QgYWNjZXNzR3JhbnRlZCA9IGNhc2VEZXRhaWxzLm1ldGFkYXRhRmllbGRzLmZpbmQobWV0YWRhdGFGaWVsZCA9PlxuICAgICAgICBtZXRhZGF0YUZpZWxkLmlkID09PSBDYXNlVmlld2VyQ29tcG9uZW50Lk1FVEFEQVRBX0ZJRUxEX0FDQ0VTU19HUkFOVEVEX0lEKTtcbiAgICAgICAgdGhpcy5hY2Nlc3NHcmFudGVkID0gYWNjZXNzR3JhbnRlZCA/IGFjY2Vzc0dyYW50ZWQudmFsdWUgIT09IENhc2VWaWV3ZXJDb21wb25lbnQuQkFTSUNfVVNFUl9BQ0NFU1NfVFlQRVMgOiBmYWxzZTtcbiAgICAgIHRoaXMudXNlckFjY2Vzc1R5cGUgPSBhY2Nlc3NQcm9jZXNzID8gYWNjZXNzUHJvY2Vzcy52YWx1ZSA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzRGF0YUxvYWRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmNhc2VEZXRhaWxzO1xuICB9XG5cbiAgcHVibGljIGhhc1N0YW5kYXJkQWNjZXNzKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGZlYXR1cmVUb2dnbGVPbiA9IHRoaXMuYXBwQ29uZmlnLmdldEFjY2Vzc01hbmFnZW1lbnRNb2RlKCk7XG4gICAgcmV0dXJuIGZlYXR1cmVUb2dnbGVPbiA/XG4gICAgICAgICAgICAhdGhpcy5hY2Nlc3NHcmFudGVkID8gQ2FzZVZpZXdlckNvbXBvbmVudC5OT05fU1RBTkRBUkRfVVNFUl9BQ0NFU1NfVFlQRVMuaW5kZXhPZih0aGlzLnVzZXJBY2Nlc3NUeXBlKSA9PT0gLTEgOiB0cnVlXG4gICAgICAgICAgICA6IHRydWU7XG4gIH1cblxuICBwcml2YXRlIHN1ZmZpeER1cGxpY2F0ZVRhYnModGFiczogQ2FzZVRhYltdKTogQ2FzZVRhYltdIHtcblxuICAgIGNvbnN0IGNvdW50ID0ge307XG4gICAgY29uc3QgZmlyc3RPY2N1cmVuY2VzID0ge307XG5cbiAgICBsZXQgaXRlbTogc3RyaW5nO1xuICAgIGxldCBpdGVtQ291bnQ6IG51bWJlcjtcbiAgICBmb3IgKGxldCBpID0gMCwgYyA9IHRhYnMubGVuZ3RoOyBpIDwgYzsgaSsrKSB7XG4gICAgICBpdGVtID0gdGFic1tpXS5sYWJlbDtcbiAgICAgIGl0ZW1Db3VudCA9IGNvdW50W2l0ZW1dO1xuICAgICAgaXRlbUNvdW50ID0gY291bnRbaXRlbV0gPSAoaXRlbUNvdW50ID09IG51bGwgPyAxIDogaXRlbUNvdW50ICsgMSk7XG5cbiAgICAgIGlmIChjb3VudFtpdGVtXSA+IDEpXG4gICAgICAgIHRhYnNbaV0ubGFiZWwgPSB0YWJzW2ldLmxhYmVsICsgQXJyYXkoY291bnRbaXRlbV0gLSAxKS5maWxsKCdfJykuam9pbignJyk7XG4gICAgICBlbHNlXG4gICAgICAgIGZpcnN0T2NjdXJlbmNlc1tpdGVtXSA9IGk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhYnM7XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJpc0RhdGFMb2FkZWQoKVwiPlxuICA8Y2NkLWNhc2UtYmFzaWMtYWNjZXNzLXZpZXcgKm5nSWY9XCIhaGFzU3RhbmRhcmRBY2Nlc3MoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYWNjZXNzVHlwZV09XCJ1c2VyQWNjZXNzVHlwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2FzZURldGFpbHNdPVwiY2FzZURldGFpbHNcIj5cbiAgPC9jY2QtY2FzZS1iYXNpYy1hY2Nlc3Mtdmlldz5cbiAgPGNjZC1jYXNlLWZ1bGwtYWNjZXNzLXZpZXcgKm5nSWY9XCJoYXNTdGFuZGFyZEFjY2VzcygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Nhc2VEZXRhaWxzXT1cImNhc2VEZXRhaWxzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2hhc1ByaW50XT1cImhhc1ByaW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2hhc0V2ZW50U2VsZWN0b3JdPVwiaGFzRXZlbnRTZWxlY3RvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcmVwZW5kZWRUYWJzXT1cInByZXBlbmRlZFRhYnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXBwZW5kZWRUYWJzXT1cImFwcGVuZGVkVGFic1wiPlxuICA8L2NjZC1jYXNlLWZ1bGwtYWNjZXNzLXZpZXc+XG48L2Rpdj5cbiJdfQ==