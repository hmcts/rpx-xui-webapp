import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CaseView } from '../../../domain/case-view/case-view.model';
import { CasesService } from '../../case-editor/services/cases.service';
import * as i0 from "@angular/core";
import * as i1 from "../../case-editor/services/cases.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "../../../../components/banners/alert/alert.component";
import * as i5 from "../../loading-spinner/loading-spinner.component";
import * as i6 from "../../../pipes/case-reference/case-reference.pipe";
import * as i7 from "rpx-xui-translation";
function CaseBasicAccessViewComponent_ccd_loading_spinner_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-loading-spinner");
} }
function CaseBasicAccessViewComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "lowercase");
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵpipe(5, "rpxTranslate");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate3("", i0.ɵɵpipeBind1(2, 3, "This case requires"), " ", i0.ɵɵpipeBind1(3, 5, i0.ɵɵpipeBind1(4, 7, ctx_r1.accessType)), " ", i0.ɵɵpipeBind1(5, 9, "access"), ".");
} }
function CaseBasicAccessViewComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "Authorisation is needed to access this case"));
} }
function CaseBasicAccessViewComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(2, 1, "This is because the case is outside your work area. If you request access to the case, it will be logged for auditing purposes"), ".");
} }
function CaseBasicAccessViewComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(2, 1, "This could be because it's outside your jurisdiction, or you may be excluded from the case. If you request access to this case, it will be logged for auditing purposes"), ".");
} }
function CaseBasicAccessViewComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "dt", 11);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "dd", 12);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "Case name"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 4, ctx_r5.caseDetails.basicFields.caseNameHmctsInternal));
} }
function CaseBasicAccessViewComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "dt", 11);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "dd", 12);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "Service"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 4, ctx_r6.caseDetails.case_type.jurisdiction.name));
} }
function CaseBasicAccessViewComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "dt", 11);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "dd", 12);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "State"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 4, ctx_r7.caseDetails.state.description));
} }
function CaseBasicAccessViewComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "dt", 11);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "dd", 12);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "titlecase");
    i0.ɵɵpipe(7, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "Court or hearing centre"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 4, i0.ɵɵpipeBind1(7, 6, ctx_r8.courtOrHearingCentre)));
} }
function CaseBasicAccessViewComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "dt", 11);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "dd", 12);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "rpxTranslate");
    i0.ɵɵpipe(7, "titlecase");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "Access"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 4, i0.ɵɵpipeBind1(7, 6, ctx_r9.accessType)));
} }
export class CaseBasicAccessViewComponent {
    constructor(casesService, router) {
        this.casesService = casesService;
        this.router = router;
        this.caseDetails = null;
        this.accessType = null;
        this.courtOrHearingCentre = null;
    }
    ngOnInit() {
        const locationId = this.caseDetails &&
            this.caseDetails.basicFields &&
            this.caseDetails.basicFields.caseManagementLocation &&
            this.caseDetails.basicFields.caseManagementLocation.baseLocation ?
            this.caseDetails.basicFields.caseManagementLocation.baseLocation : null;
        if (locationId) {
            this.showSpinner = true;
            this.courtOrHearingCentreSubscription = this.casesService.getCourtOrHearingCentreName(locationId).subscribe(courtOrHearingCentre => {
                this.courtOrHearingCentre = courtOrHearingCentre[0] && courtOrHearingCentre[0].court_name ?
                    courtOrHearingCentre[0].court_name : null;
                this.showSpinner = false;
            }, error => this.showSpinner = false);
        }
    }
    ngOnDestroy() {
        if (this.courtOrHearingCentreSubscription) {
            this.courtOrHearingCentreSubscription.unsubscribe();
        }
    }
    onCancel() {
        this.router.navigateByUrl(CaseBasicAccessViewComponent.CANCEL_LINK_DESTINATION);
    }
    getRequestUrl(accessType) {
        return accessType === 'CHALLENGED' ? 'challenged-access-request' : 'specific-access-request';
    }
}
CaseBasicAccessViewComponent.CANCEL_LINK_DESTINATION = '/work/my-work/list';
CaseBasicAccessViewComponent.ɵfac = function CaseBasicAccessViewComponent_Factory(t) { return new (t || CaseBasicAccessViewComponent)(i0.ɵɵdirectiveInject(i1.CasesService), i0.ɵɵdirectiveInject(i2.Router)); };
CaseBasicAccessViewComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseBasicAccessViewComponent, selectors: [["ccd-case-basic-access-view"]], inputs: { caseDetails: "caseDetails", accessType: "accessType" }, decls: 29, vars: 23, consts: [[4, "ngIf"], ["type", "information"], [1, "heading-h1"], [1, "govuk-heading-m"], [1, "govuk-summary-list"], ["class", "govuk-summary-list__row", 4, "ngIf"], [1, "govuk-button-group"], [1, "govuk-button", "govuk-!-margin-right-3", 3, "routerLink"], [1, "govuk-grid-column-full", "govuk-!-padding-left-0"], ["href", "javascript:void(0)", 1, "govuk-body", 3, "click"], [1, "govuk-summary-list__row"], [1, "govuk-summary-list__key", "summary-key"], [1, "govuk-summary-list__value"]], template: function CaseBasicAccessViewComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseBasicAccessViewComponent_ccd_loading_spinner_0_Template, 1, 0, "ccd-loading-spinner", 0);
        i0.ɵɵelementStart(1, "div")(2, "cut-alert", 1);
        i0.ɵɵtemplate(3, CaseBasicAccessViewComponent_ng_container_3_Template, 6, 11, "ng-container", 0);
        i0.ɵɵtemplate(4, CaseBasicAccessViewComponent_ng_container_4_Template, 3, 3, "ng-container", 0);
        i0.ɵɵelement(5, "br");
        i0.ɵɵtemplate(6, CaseBasicAccessViewComponent_ng_container_6_Template, 3, 3, "ng-container", 0);
        i0.ɵɵtemplate(7, CaseBasicAccessViewComponent_ng_container_7_Template, 3, 3, "ng-container", 0);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "h1", 2);
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "ccdCaseReference");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "h2", 3);
        i0.ɵɵtext(12);
        i0.ɵɵpipe(13, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "dl", 4);
        i0.ɵɵtemplate(15, CaseBasicAccessViewComponent_div_15_Template, 7, 6, "div", 5);
        i0.ɵɵtemplate(16, CaseBasicAccessViewComponent_div_16_Template, 7, 6, "div", 5);
        i0.ɵɵtemplate(17, CaseBasicAccessViewComponent_div_17_Template, 7, 6, "div", 5);
        i0.ɵɵtemplate(18, CaseBasicAccessViewComponent_div_18_Template, 8, 8, "div", 5);
        i0.ɵɵtemplate(19, CaseBasicAccessViewComponent_div_19_Template, 8, 8, "div", 5);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(20, "div", 6)(21, "button", 7);
        i0.ɵɵtext(22);
        i0.ɵɵpipe(23, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "div", 8)(25, "p")(26, "a", 9);
        i0.ɵɵlistener("click", function CaseBasicAccessViewComponent_Template_a_click_26_listener() { return ctx.onCancel(); });
        i0.ɵɵtext(27);
        i0.ɵɵpipe(28, "rpxTranslate");
        i0.ɵɵelementEnd()()()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.showSpinner);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.accessType === "CHALLENGED");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.accessType === "SPECIFIC");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.accessType === "CHALLENGED");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.accessType === "SPECIFIC");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1("#", i0.ɵɵpipeBind1(10, 15, ctx.caseDetails.case_id), "");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 17, "Case details"));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.caseDetails.basicFields == null ? null : ctx.caseDetails.basicFields.caseNameHmctsInternal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseDetails.case_type == null ? null : ctx.caseDetails.case_type.jurisdiction == null ? null : ctx.caseDetails.case_type.jurisdiction.name);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseDetails.state == null ? null : ctx.caseDetails.state.description);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.courtOrHearingCentre);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.accessType);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("routerLink", ctx.getRequestUrl(ctx.accessType));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(23, 19, "Request access"), " ");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(28, 21, "Cancel"), " ");
    } }, dependencies: [i3.NgIf, i2.RouterLink, i4.AlertComponent, i5.LoadingSpinnerComponent, i3.LowerCasePipe, i3.TitleCasePipe, i6.CaseReferencePipe, i7.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseBasicAccessViewComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-basic-access-view', template: "<ccd-loading-spinner  *ngIf=\"showSpinner\"></ccd-loading-spinner>\n<div>\n  <cut-alert type=\"information\">\n    <ng-container *ngIf=\"accessType === 'CHALLENGED'\">{{'This case requires' | rpxTranslate}} {{accessType | rpxTranslate | lowercase}} {{'access' | rpxTranslate}}.</ng-container>\n    <ng-container *ngIf=\"accessType === 'SPECIFIC'\">{{'Authorisation is needed to access this case' | rpxTranslate}}</ng-container>\n    <br />\n    <ng-container *ngIf=\"accessType === 'CHALLENGED'\">{{'This is because the case is outside your work area. If you request access to the case, it will be logged for auditing purposes' | rpxTranslate}}.</ng-container>\n    <ng-container *ngIf=\"accessType === 'SPECIFIC'\">{{\"This could be because it's outside your jurisdiction, or you may be excluded from the case. If you request access to this case, it will be logged for auditing purposes\" | rpxTranslate }}.</ng-container>\n  </cut-alert>\n  <h1 class=\"heading-h1\">#{{ caseDetails.case_id | ccdCaseReference}}</h1>\n  <h2 class=\"govuk-heading-m\">{{'Case details' | rpxTranslate}}</h2>\n  <dl class=\"govuk-summary-list\">\n    <div class=\"govuk-summary-list__row\" *ngIf=\"caseDetails.basicFields?.caseNameHmctsInternal\">\n      <dt class=\"govuk-summary-list__key summary-key\">{{'Case name' | rpxTranslate}}</dt>\n      <dd class=\"govuk-summary-list__value\">{{caseDetails.basicFields.caseNameHmctsInternal | rpxTranslate}}</dd>\n    </div>\n    <div class=\"govuk-summary-list__row\" *ngIf=\"caseDetails.case_type?.jurisdiction?.name\">\n      <dt class=\"govuk-summary-list__key summary-key\">{{'Service' | rpxTranslate}}</dt>\n      <dd class=\"govuk-summary-list__value\">{{caseDetails.case_type.jurisdiction.name | rpxTranslate}}</dd>\n    </div>\n    <div class=\"govuk-summary-list__row\" *ngIf=\"caseDetails.state?.description\">\n      <dt class=\"govuk-summary-list__key summary-key\">{{'State' | rpxTranslate}}</dt>\n      <dd class=\"govuk-summary-list__value\">{{caseDetails.state.description | rpxTranslate}}</dd>\n    </div>\n    <div class=\"govuk-summary-list__row\" *ngIf=\"courtOrHearingCentre\">\n      <dt class=\"govuk-summary-list__key summary-key\">{{'Court or hearing centre' | rpxTranslate}}</dt>\n      <dd class=\"govuk-summary-list__value\">{{courtOrHearingCentre | rpxTranslate | titlecase}}</dd>\n    </div>\n\n    <div class=\"govuk-summary-list__row\" *ngIf=\"accessType\">\n      <dt class=\"govuk-summary-list__key summary-key\">{{'Access' | rpxTranslate}}</dt>\n      <dd class=\"govuk-summary-list__value\">{{accessType | titlecase | rpxTranslate}}</dd>\n    </div>\n  </dl>\n</div>\n<div class=\"govuk-button-group\">\n  <button class=\"govuk-button govuk-!-margin-right-3\" [routerLink]=\"getRequestUrl(accessType)\">\n    {{'Request access' | rpxTranslate}}\n  </button>\n  <div class=\"govuk-grid-column-full govuk-!-padding-left-0\">\n    <p>\n      <a class=\"govuk-body\" (click)=\"onCancel()\" href=\"javascript:void(0)\">\n        {{'Cancel' | rpxTranslate}}\n      </a>\n    </p>\n  </div>\n</div>\n" }]
    }], function () { return [{ type: i1.CasesService }, { type: i2.Router }]; }, { caseDetails: [{
            type: Input
        }], accessType: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1iYXNpYy1hY2Nlc3Mtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS12aWV3ZXIvY2FzZS1iYXNpYy1hY2Nlc3Mtdmlldy9jYXNlLWJhc2ljLWFjY2Vzcy12aWV3LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLWJhc2ljLWFjY2Vzcy12aWV3L2Nhc2UtYmFzaWMtYWNjZXNzLXZpZXcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7Ozs7O0lDSnhFLHNDQUFnRTs7O0lBRzVELDZCQUFrRDtJQUFBLFlBQThHOzs7OztJQUFBLDBCQUFlOzs7SUFBN0gsZUFBOEc7SUFBOUcsbUxBQThHOzs7SUFDaEssNkJBQWdEO0lBQUEsWUFBZ0U7O0lBQUEsMEJBQWU7O0lBQS9FLGVBQWdFO0lBQWhFLHlGQUFnRTs7O0lBRWhILDZCQUFrRDtJQUFBLFlBQW9KOztJQUFBLDBCQUFlOztJQUFuSyxlQUFvSjtJQUFwSixzTEFBb0o7OztJQUN0TSw2QkFBZ0Q7SUFBQSxZQUE4TDs7SUFBQSwwQkFBZTs7SUFBN00sZUFBOEw7SUFBOUwsK05BQThMOzs7SUFLOU8sK0JBQTRGLGFBQUE7SUFD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L0IsV0FBVztrQkFEakIsS0FBSztZQUlDLFVBQVU7a0JBRGhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2FzZVZpZXcgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vY2FzZS12aWV3L2Nhc2Utdmlldy5tb2RlbCc7XG5pbXBvcnQgeyBDYXNlc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jYXNlLWVkaXRvci9zZXJ2aWNlcy9jYXNlcy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWNhc2UtYmFzaWMtYWNjZXNzLXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJ2Nhc2UtYmFzaWMtYWNjZXNzLXZpZXcuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENhc2VCYXNpY0FjY2Vzc1ZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHB1YmxpYyBzdGF0aWMgQ0FOQ0VMX0xJTktfREVTVElOQVRJT04gPSAnL3dvcmsvbXktd29yay9saXN0JztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgY2FzZURldGFpbHM6IENhc2VWaWV3ID0gbnVsbDtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgYWNjZXNzVHlwZTogc3RyaW5nID0gbnVsbDtcblxuICBwdWJsaWMgY291cnRPckhlYXJpbmdDZW50cmU6IHN0cmluZyA9IG51bGw7XG4gIHB1YmxpYyBzaG93U3Bpbm5lcjogYm9vbGVhbjtcbiAgcHJpdmF0ZSBjb3VydE9ySGVhcmluZ0NlbnRyZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FzZXNTZXJ2aWNlOiBDYXNlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IFJvdXRlcikge31cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgbG9jYXRpb25JZCA9IHRoaXMuY2FzZURldGFpbHMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FzZURldGFpbHMuYmFzaWNGaWVsZHMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FzZURldGFpbHMuYmFzaWNGaWVsZHMuY2FzZU1hbmFnZW1lbnRMb2NhdGlvbiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXNlRGV0YWlscy5iYXNpY0ZpZWxkcy5jYXNlTWFuYWdlbWVudExvY2F0aW9uLmJhc2VMb2NhdGlvbiA/XG4gICAgICB0aGlzLmNhc2VEZXRhaWxzLmJhc2ljRmllbGRzLmNhc2VNYW5hZ2VtZW50TG9jYXRpb24uYmFzZUxvY2F0aW9uIDogbnVsbDtcblxuICAgIGlmIChsb2NhdGlvbklkKSB7XG4gICAgICB0aGlzLnNob3dTcGlubmVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuY291cnRPckhlYXJpbmdDZW50cmVTdWJzY3JpcHRpb24gPSB0aGlzLmNhc2VzU2VydmljZS5nZXRDb3VydE9ySGVhcmluZ0NlbnRyZU5hbWUobG9jYXRpb25JZCkuc3Vic2NyaWJlKGNvdXJ0T3JIZWFyaW5nQ2VudHJlID0+IHtcbiAgICAgICAgdGhpcy5jb3VydE9ySGVhcmluZ0NlbnRyZSA9IGNvdXJ0T3JIZWFyaW5nQ2VudHJlWzBdICYmIGNvdXJ0T3JIZWFyaW5nQ2VudHJlWzBdLmNvdXJ0X25hbWUgP1xuICAgICAgICBjb3VydE9ySGVhcmluZ0NlbnRyZVswXS5jb3VydF9uYW1lIDogbnVsbDtcbiAgICAgICAgdGhpcy5zaG93U3Bpbm5lciA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHRoaXMuc2hvd1NwaW5uZXIgPSBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvdXJ0T3JIZWFyaW5nQ2VudHJlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNvdXJ0T3JIZWFyaW5nQ2VudHJlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQ2FuY2VsKCk6IHZvaWQge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoQ2FzZUJhc2ljQWNjZXNzVmlld0NvbXBvbmVudC5DQU5DRUxfTElOS19ERVNUSU5BVElPTik7XG4gIH1cblxuICBwdWJsaWMgZ2V0UmVxdWVzdFVybChhY2Nlc3NUeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBhY2Nlc3NUeXBlID09PSAnQ0hBTExFTkdFRCcgPyAnY2hhbGxlbmdlZC1hY2Nlc3MtcmVxdWVzdCcgOiAnc3BlY2lmaWMtYWNjZXNzLXJlcXVlc3QnO1xuICB9XG59XG4iLCI8Y2NkLWxvYWRpbmctc3Bpbm5lciAgKm5nSWY9XCJzaG93U3Bpbm5lclwiPjwvY2NkLWxvYWRpbmctc3Bpbm5lcj5cbjxkaXY+XG4gIDxjdXQtYWxlcnQgdHlwZT1cImluZm9ybWF0aW9uXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjY2Vzc1R5cGUgPT09ICdDSEFMTEVOR0VEJ1wiPnt7J1RoaXMgY2FzZSByZXF1aXJlcycgfCBycHhUcmFuc2xhdGV9fSB7e2FjY2Vzc1R5cGUgfCBycHhUcmFuc2xhdGUgfCBsb3dlcmNhc2V9fSB7eydhY2Nlc3MnIHwgcnB4VHJhbnNsYXRlfX0uPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjY2Vzc1R5cGUgPT09ICdTUEVDSUZJQydcIj57eydBdXRob3Jpc2F0aW9uIGlzIG5lZWRlZCB0byBhY2Nlc3MgdGhpcyBjYXNlJyB8IHJweFRyYW5zbGF0ZX19PC9uZy1jb250YWluZXI+XG4gICAgPGJyIC8+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjY2Vzc1R5cGUgPT09ICdDSEFMTEVOR0VEJ1wiPnt7J1RoaXMgaXMgYmVjYXVzZSB0aGUgY2FzZSBpcyBvdXRzaWRlIHlvdXIgd29yayBhcmVhLiBJZiB5b3UgcmVxdWVzdCBhY2Nlc3MgdG8gdGhlIGNhc2UsIGl0IHdpbGwgYmUgbG9nZ2VkIGZvciBhdWRpdGluZyBwdXJwb3NlcycgfCBycHhUcmFuc2xhdGV9fS48L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYWNjZXNzVHlwZSA9PT0gJ1NQRUNJRklDJ1wiPnt7XCJUaGlzIGNvdWxkIGJlIGJlY2F1c2UgaXQncyBvdXRzaWRlIHlvdXIganVyaXNkaWN0aW9uLCBvciB5b3UgbWF5IGJlIGV4Y2x1ZGVkIGZyb20gdGhlIGNhc2UuIElmIHlvdSByZXF1ZXN0IGFjY2VzcyB0byB0aGlzIGNhc2UsIGl0IHdpbGwgYmUgbG9nZ2VkIGZvciBhdWRpdGluZyBwdXJwb3Nlc1wiIHwgcnB4VHJhbnNsYXRlIH19LjwvbmctY29udGFpbmVyPlxuICA8L2N1dC1hbGVydD5cbiAgPGgxIGNsYXNzPVwiaGVhZGluZy1oMVwiPiN7eyBjYXNlRGV0YWlscy5jYXNlX2lkIHwgY2NkQ2FzZVJlZmVyZW5jZX19PC9oMT5cbiAgPGgyIGNsYXNzPVwiZ292dWstaGVhZGluZy1tXCI+e3snQ2FzZSBkZXRhaWxzJyB8IHJweFRyYW5zbGF0ZX19PC9oMj5cbiAgPGRsIGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0XCI+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fcm93XCIgKm5nSWY9XCJjYXNlRGV0YWlscy5iYXNpY0ZpZWxkcz8uY2FzZU5hbWVIbWN0c0ludGVybmFsXCI+XG4gICAgICA8ZHQgY2xhc3M9XCJnb3Z1ay1zdW1tYXJ5LWxpc3RfX2tleSBzdW1tYXJ5LWtleVwiPnt7J0Nhc2UgbmFtZScgfCBycHhUcmFuc2xhdGV9fTwvZHQ+XG4gICAgICA8ZGQgY2xhc3M9XCJnb3Z1ay1zdW1tYXJ5LWxpc3RfX3ZhbHVlXCI+e3tjYXNlRGV0YWlscy5iYXNpY0ZpZWxkcy5jYXNlTmFtZUhtY3RzSW50ZXJuYWwgfCBycHhUcmFuc2xhdGV9fTwvZGQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fcm93XCIgKm5nSWY9XCJjYXNlRGV0YWlscy5jYXNlX3R5cGU/Lmp1cmlzZGljdGlvbj8ubmFtZVwiPlxuICAgICAgPGR0IGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X19rZXkgc3VtbWFyeS1rZXlcIj57eydTZXJ2aWNlJyB8IHJweFRyYW5zbGF0ZX19PC9kdD5cbiAgICAgIDxkZCBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fdmFsdWVcIj57e2Nhc2VEZXRhaWxzLmNhc2VfdHlwZS5qdXJpc2RpY3Rpb24ubmFtZSB8IHJweFRyYW5zbGF0ZX19PC9kZD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X19yb3dcIiAqbmdJZj1cImNhc2VEZXRhaWxzLnN0YXRlPy5kZXNjcmlwdGlvblwiPlxuICAgICAgPGR0IGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X19rZXkgc3VtbWFyeS1rZXlcIj57eydTdGF0ZScgfCBycHhUcmFuc2xhdGV9fTwvZHQ+XG4gICAgICA8ZGQgY2xhc3M9XCJnb3Z1ay1zdW1tYXJ5LWxpc3RfX3ZhbHVlXCI+e3tjYXNlRGV0YWlscy5zdGF0ZS5kZXNjcmlwdGlvbiB8IHJweFRyYW5zbGF0ZX19PC9kZD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X19yb3dcIiAqbmdJZj1cImNvdXJ0T3JIZWFyaW5nQ2VudHJlXCI+XG4gICAgICA8ZHQgY2xhc3M9XCJnb3Z1ay1zdW1tYXJ5LWxpc3RfX2tleSBzdW1tYXJ5LWtleVwiPnt7J0NvdXJ0IG9yIGhlYXJpbmcgY2VudHJlJyB8IHJweFRyYW5zbGF0ZX19PC9kdD5cbiAgICAgIDxkZCBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fdmFsdWVcIj57e2NvdXJ0T3JIZWFyaW5nQ2VudHJlIHwgcnB4VHJhbnNsYXRlIHwgdGl0bGVjYXNlfX08L2RkPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fcm93XCIgKm5nSWY9XCJhY2Nlc3NUeXBlXCI+XG4gICAgICA8ZHQgY2xhc3M9XCJnb3Z1ay1zdW1tYXJ5LWxpc3RfX2tleSBzdW1tYXJ5LWtleVwiPnt7J0FjY2VzcycgfCBycHhUcmFuc2xhdGV9fTwvZHQ+XG4gICAgICA8ZGQgY2xhc3M9XCJnb3Z1ay1zdW1tYXJ5LWxpc3RfX3ZhbHVlXCI+e3thY2Nlc3NUeXBlIHwgdGl0bGVjYXNlIHwgcnB4VHJhbnNsYXRlfX08L2RkPlxuICAgIDwvZGl2PlxuICA8L2RsPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCI+XG4gIDxidXR0b24gY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstIS1tYXJnaW4tcmlnaHQtM1wiIFtyb3V0ZXJMaW5rXT1cImdldFJlcXVlc3RVcmwoYWNjZXNzVHlwZSlcIj5cbiAgICB7eydSZXF1ZXN0IGFjY2VzcycgfCBycHhUcmFuc2xhdGV9fVxuICA8L2J1dHRvbj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGwgZ292dWstIS1wYWRkaW5nLWxlZnQtMFwiPlxuICAgIDxwPlxuICAgICAgPGEgY2xhc3M9XCJnb3Z1ay1ib2R5XCIgKGNsaWNrKT1cIm9uQ2FuY2VsKClcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XG4gICAgICAgIHt7J0NhbmNlbCcgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9hPlxuICAgIDwvcD5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==