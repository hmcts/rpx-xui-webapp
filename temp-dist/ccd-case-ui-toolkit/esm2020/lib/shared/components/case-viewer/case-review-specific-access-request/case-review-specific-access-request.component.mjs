import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractAppConfig } from '../../../../app.config';
import { AccessReason, ReviewSpecificAccessRequestErrors, ReviewSpecificAccessRequestPageText } from './models';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../../../app.config";
function CaseReviewSpecificAccessRequestComponent_exui_error_message_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "exui-error-message", 27);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("error", ctx_r0.errorMessage);
} }
function CaseReviewSpecificAccessRequestComponent_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, ctx_r1.errorMessage.description), " ");
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
export class CaseReviewSpecificAccessRequestComponent {
    constructor(fb, route, router, appConfig) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.appConfig = appConfig;
        this.collapsed = false;
        this.submitted = false;
        this.genericError = 'There is a problem';
        this.radioSelectedControlName = 'radioSelected';
        this.accessReasons = [
            { reason: AccessReason.APPROVE_REQUEST, checked: false },
            { reason: AccessReason.REJECT_REQUEST, checked: false },
            { reason: AccessReason.REQUEST_MORE_INFORMATION, checked: false },
        ];
    }
    ngOnInit() {
        // TODO: this ticket is blocked so mocked with those data to go through, they will be removed and implimented with actual data
        // when dependency resolved
        this.setMockData();
        this.title = ReviewSpecificAccessRequestPageText.TITLE;
        this.hint = ReviewSpecificAccessRequestPageText.HINT;
        this.caseRefLabel = ReviewSpecificAccessRequestPageText.CASE_REF;
        this.formGroup = this.fb.group({
            radioSelected: new FormControl(null, Validators.required),
        });
    }
    ngOnDestroy() {
        if (this.caseSubscription) {
            this.caseSubscription.unsubscribe();
        }
    }
    onChange() {
        this.submitted = false;
    }
    onSubmit() {
        this.submitted = true;
        if (this.formGroup.get(this.radioSelectedControlName).invalid) {
            this.errorMessage = {
                title: this.genericError,
                description: ReviewSpecificAccessRequestErrors.NO_SELECTION,
            };
        }
        // Initiate Review Access Request
        if (this.formGroup.valid) {
            // Get the Case Reference (for which access is being requested) from the ActivatedRouteSnapshot data
            const caseId = this.route.snapshot.data.case.case_id;
            const radioSelectedValue = this.formGroup.get(this.radioSelectedControlName).value;
            // Get the index of the selected AccessReason enum value. Can't use Object.values because it's not available in
            // < ES2017!
            const reasonNumber = Object.keys(AccessReason)
                .map((e) => AccessReason[e])
                .indexOf(radioSelectedValue);
            // request model created , it will be used for submission part
            const challengedAccessRequest = {
                reason: reasonNumber,
                caseId,
            };
            if (AccessReason.REJECT_REQUEST === radioSelectedValue) {
                this.router.navigate(['rejected'], { relativeTo: this.route });
            }
        }
    }
    onCancel() {
        this.router.navigateByUrl(CaseReviewSpecificAccessRequestComponent.CANCEL_LINK_DESTINATION);
    }
    // remove once Access management goes live
    setMockData() {
        const requestAccessDetailsMock = this.appConfig.getAccessManagementRequestReviewMockModel();
        if (requestAccessDetailsMock.active) {
            this.requestAccessDetails = requestAccessDetailsMock.details;
        }
    }
}
CaseReviewSpecificAccessRequestComponent.CANCEL_LINK_DESTINATION = '/work/my-work/list';
CaseReviewSpecificAccessRequestComponent.ɵfac = function CaseReviewSpecificAccessRequestComponent_Factory(t) { return new (t || CaseReviewSpecificAccessRequestComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.AbstractAppConfig)); };
CaseReviewSpecificAccessRequestComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseReviewSpecificAccessRequestComponent, selectors: [["ccd-case-review-specific-access-request"]], decls: 77, vars: 55, consts: [[3, "error", 4, "ngIf"], [3, "formGroup", "submit"], [1, "govuk-form-group"], ["aria-describedby", "reason-hint", 1, "govuk-fieldset"], [1, "govuk-grid-column-two-thirds"], [1, "govuk-fieldset__legend", "govuk-fieldset__legend--l"], [1, "govuk-fieldset__heading"], [1, "govuk-table"], [1, "govuk-table__body"], [1, "govuk-table__row"], ["scope", "row", 1, "govuk-table__header", "leftLabel"], [1, "govuk-table__cell"], [1, "govuk-form-group", 3, "ngClass"], [1, "govuk-fieldset"], [1, "govuk-fieldset__legend", "govuk-fieldset__legend--m"], ["id", "error-message", "class", "govuk-error-message", 4, "ngIf"], [1, "govuk-radios__item"], ["id", "reason-0", "name", "radioSelected", "type", "radio", "formControlName", "radioSelected", 1, "govuk-radios__input", 3, "value", "checked", "change"], ["for", "reason-0", 1, "govuk-label", "govuk-radios__label"], ["id", "reason-1", "name", "radioSelected", "type", "radio", "formControlName", "radioSelected", 1, "govuk-radios__input", 3, "value", "checked", "change"], ["for", "reason-1", 1, "govuk-label", "govuk-radios__label"], ["id", "reason-2", "name", "radioSelected", "type", "radio", "formControlName", "radioSelected", 1, "govuk-radios__input", 3, "value", "checked", "change"], ["for", "reason-2", 1, "govuk-label", "govuk-radios__label"], [1, "govuk-button-group"], ["type", "submit", 1, "govuk-button", "govuk-!-margin-right-3"], [1, "govuk-grid-column-full", "govuk-!-padding-left-0"], ["href", "javascript:void(0)", 1, "govuk-body", 3, "click"], [3, "error"], ["id", "error-message", 1, "govuk-error-message"]], template: function CaseReviewSpecificAccessRequestComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseReviewSpecificAccessRequestComponent_exui_error_message_0_Template, 1, 1, "exui-error-message", 0);
        i0.ɵɵelementStart(1, "form", 1);
        i0.ɵɵlistener("submit", function CaseReviewSpecificAccessRequestComponent_Template_form_submit_1_listener() { return ctx.onSubmit(); });
        i0.ɵɵelementStart(2, "div", 2)(3, "fieldset", 3)(4, "div", 4);
        i0.ɵɵelement(5, "p");
        i0.ɵɵelementStart(6, "legend", 5)(7, "h1", 6);
        i0.ɵɵtext(8);
        i0.ɵɵpipe(9, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelement(10, "p");
        i0.ɵɵelementStart(11, "table", 7);
        i0.ɵɵelement(12, "caption");
        i0.ɵɵelementStart(13, "tbody", 8)(14, "tr", 9)(15, "th", 10);
        i0.ɵɵtext(16);
        i0.ɵɵpipe(17, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "td", 11);
        i0.ɵɵtext(19);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(20, "tr", 9)(21, "th", 10);
        i0.ɵɵtext(22);
        i0.ɵɵpipe(23, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(24, "td", 11);
        i0.ɵɵtext(25);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(26, "tr", 9)(27, "th", 10);
        i0.ɵɵtext(28);
        i0.ɵɵpipe(29, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "td", 11);
        i0.ɵɵtext(31);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(32, "tr", 9)(33, "th", 10);
        i0.ɵɵtext(34);
        i0.ɵɵpipe(35, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "td", 11);
        i0.ɵɵtext(37);
        i0.ɵɵelement(38, "br");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(39, "tr", 9)(40, "th", 10);
        i0.ɵɵtext(41);
        i0.ɵɵpipe(42, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(43, "td", 11);
        i0.ɵɵtext(44);
        i0.ɵɵpipe(45, "rpxTranslate");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(46, "div", 12)(47, "fieldset", 13)(48, "legend", 14)(49, "h1", 6);
        i0.ɵɵtext(50);
        i0.ɵɵpipe(51, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(52, CaseReviewSpecificAccessRequestComponent_div_52_Template, 3, 3, "div", 15);
        i0.ɵɵelementStart(53, "div", 16)(54, "input", 17);
        i0.ɵɵlistener("change", function CaseReviewSpecificAccessRequestComponent_Template_input_change_54_listener() { return ctx.onChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(55, "label", 18);
        i0.ɵɵtext(56);
        i0.ɵɵpipe(57, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(58, "div", 16)(59, "input", 19);
        i0.ɵɵlistener("change", function CaseReviewSpecificAccessRequestComponent_Template_input_change_59_listener() { return ctx.onChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(60, "label", 20);
        i0.ɵɵtext(61);
        i0.ɵɵpipe(62, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(63, "div", 16)(64, "input", 21);
        i0.ɵɵlistener("change", function CaseReviewSpecificAccessRequestComponent_Template_input_change_64_listener() { return ctx.onChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(65, "label", 22);
        i0.ɵɵtext(66);
        i0.ɵɵpipe(67, "rpxTranslate");
        i0.ɵɵelementEnd()()()()()()();
        i0.ɵɵelementStart(68, "div", 23)(69, "button", 24);
        i0.ɵɵtext(70);
        i0.ɵɵpipe(71, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(72, "div", 25)(73, "p")(74, "a", 26);
        i0.ɵɵlistener("click", function CaseReviewSpecificAccessRequestComponent_Template_a_click_74_listener() { return ctx.onCancel(); });
        i0.ɵɵtext(75);
        i0.ɵɵpipe(76, "rpxTranslate");
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.formGroup.invalid && ctx.submitted);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("formGroup", ctx.formGroup);
        i0.ɵɵadvance(7);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 27, ctx.title), " ");
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(17, 29, "Case name"), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(ctx.requestAccessDetails.caseName);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(23, 31, "Case reference"), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(ctx.requestAccessDetails.caseReference);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(29, 33, "Date submitted"), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(ctx.requestAccessDetails.dateSubmitted);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(35, 35, "Request from"), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(ctx.requestAccessDetails.requestFrom);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(42, 37, "Reason for case access"), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(45, 39, ctx.requestAccessDetails.reasonForCaseAccess));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(53, _c0, ctx.formGroup.invalid && ctx.submitted));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(51, 41, ctx.hint), " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.formGroup.get("radioSelected").invalid && ctx.submitted);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("value", ctx.accessReasons[0].reason)("checked", ctx.accessReasons[0].checked);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(57, 43, ctx.accessReasons[0].reason), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.accessReasons[1].reason)("checked", ctx.accessReasons[1].checked);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(62, 45, ctx.accessReasons[1].reason), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.accessReasons[2].reason)("checked", ctx.accessReasons[2].checked);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(67, 47, ctx.accessReasons[2].reason), " ");
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(71, 49, "Continue"), " ");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(76, 51, "Cancel"), " ");
    } }, styles: [".left-label[_ngcontent-%COMP%]{width:220px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseReviewSpecificAccessRequestComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-review-specific-access-request', template: "<exui-error-message\n  *ngIf=\"formGroup.invalid && submitted\"\n  [error]=\"errorMessage\">\n</exui-error-message>\n\n<form [formGroup]=\"formGroup\" (submit)=\"onSubmit()\">\n  <div class=\"govuk-form-group\">\n    <fieldset class=\"govuk-fieldset\" aria-describedby=\"reason-hint\">\n      <div class=\"govuk-grid-column-two-thirds\">\n        <p></p>\n        <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--l\">\n          <h1 class=\"govuk-fieldset__heading\">\n            {{ title | rpxTranslate }}\n          </h1>\n        </legend>\n        <p></p>\n        <table class=\"govuk-table\">\n          <caption></caption>\n          <tbody class=\"govuk-table__body\">\n            <tr class=\"govuk-table__row\">\n              <th scope=\"row\" class=\"govuk-table__header leftLabel\" >\n                {{'Case name' | rpxTranslate}}\n              </th>\n              <td class=\"govuk-table__cell\">{{ requestAccessDetails.caseName }}</td>\n            </tr>\n            <tr class=\"govuk-table__row\">\n              <th scope=\"row\" class=\"govuk-table__header leftLabel\" >\n                {{'Case reference' | rpxTranslate}}\n              </th>\n              <td class=\"govuk-table__cell\">{{ requestAccessDetails.caseReference }}</td>\n            </tr>\n            <tr class=\"govuk-table__row\">\n              <th scope=\"row\" class=\"govuk-table__header leftLabel\" >\n                {{'Date submitted' | rpxTranslate}}\n              </th>\n              <td class=\"govuk-table__cell\">{{ requestAccessDetails.dateSubmitted }}</td>\n            </tr>\n            <tr class=\"govuk-table__row\">\n              <th scope=\"row\" class=\"govuk-table__header leftLabel\" >\n                {{'Request from' | rpxTranslate}}\n              </th>\n              <td class=\"govuk-table__cell\">{{ requestAccessDetails.requestFrom }}<br /></td>\n            </tr>\n            <tr class=\"govuk-table__row\">\n              <th scope=\"row\" class=\"govuk-table__header leftLabel\" >\n                {{'Reason for case access' | rpxTranslate}}\n              </th>\n              <td class=\"govuk-table__cell\">{{ requestAccessDetails.reasonForCaseAccess | rpxTranslate }}</td>\n            </tr>\n          </tbody>\n        </table>\n\n        <div\n          class=\"govuk-form-group\"\n          [ngClass]=\"{ 'form-group-error': formGroup.invalid && submitted }\">\n          <fieldset class=\"govuk-fieldset\">\n            <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--m\">\n              <h1 class=\"govuk-fieldset__heading\">\n                {{ hint | rpxTranslate }}\n              </h1>\n            </legend>\n            <div\n              id=\"error-message\"\n              class=\"govuk-error-message\"\n              *ngIf=\"formGroup.get('radioSelected').invalid && submitted\">\n              {{ errorMessage.description | rpxTranslate }}\n            </div>\n            <div class=\"govuk-radios__item\">\n              <input\n                class=\"govuk-radios__input\"\n                id=\"reason-0\"\n                name=\"radioSelected\"\n                type=\"radio\"\n                [value]=\"accessReasons[0].reason\"\n                formControlName=\"radioSelected\"\n                [checked]=\"accessReasons[0].checked\"\n                (change)=\"onChange()\"/>\n              <label class=\"govuk-label govuk-radios__label\" for=\"reason-0\">\n                {{ accessReasons[0].reason | rpxTranslate }}\n              </label>\n            </div>\n            <div class=\"govuk-radios__item\">\n              <input\n                class=\"govuk-radios__input\"\n                id=\"reason-1\"\n                name=\"radioSelected\"\n                type=\"radio\"\n                [value]=\"accessReasons[1].reason\"\n                formControlName=\"radioSelected\"\n                [checked]=\"accessReasons[1].checked\"\n                (change)=\"onChange()\"/>\n              <label class=\"govuk-label govuk-radios__label\" for=\"reason-1\">\n                {{ accessReasons[1].reason | rpxTranslate }}\n              </label>\n            </div>\n            <div class=\"govuk-radios__item\">\n              <input\n                class=\"govuk-radios__input\"\n                id=\"reason-2\"\n                name=\"radioSelected\"\n                type=\"radio\"\n                [value]=\"accessReasons[2].reason\"\n                formControlName=\"radioSelected\"\n                [checked]=\"accessReasons[2].checked\"\n                (change)=\"onChange()\"/>\n              <label class=\"govuk-label govuk-radios__label\" for=\"reason-2\">\n                {{ accessReasons[2].reason | rpxTranslate }}\n              </label>\n            </div>\n          </fieldset>\n        </div>\n      </div>\n    </fieldset>\n  </div>\n\n  <div class=\"govuk-button-group\">\n    <button class=\"govuk-button govuk-!-margin-right-3\" type=\"submit\">\n      {{'Continue' | rpxTranslate}}\n    </button>\n    <div class=\"govuk-grid-column-full govuk-!-padding-left-0\">\n      <p>\n        <a class=\"govuk-body\" (click)=\"onCancel()\" href=\"javascript:void(0)\">\n          {{'Cancel' | rpxTranslate}}\n        </a>\n      </p>\n    </div>\n  </div>\n</form>\n", styles: [".left-label{width:220px}\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1yZXZpZXctc3BlY2lmaWMtYWNjZXNzLXJlcXVlc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Nhc2Utdmlld2VyL2Nhc2UtcmV2aWV3LXNwZWNpZmljLWFjY2Vzcy1yZXF1ZXN0L2Nhc2UtcmV2aWV3LXNwZWNpZmljLWFjY2Vzcy1yZXF1ZXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLXJldmlldy1zcGVjaWZpYy1hY2Nlc3MtcmVxdWVzdC9jYXNlLXJldmlldy1zcGVjaWZpYy1hY2Nlc3MtcmVxdWVzdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBb0IsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGlDQUFpQyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7Ozs7SUNOaEgseUNBR3FCOzs7SUFEbkIsMkNBQXNCOzs7SUEyRFosK0JBRzhEO0lBQzVELFlBQ0Y7O0lBQUEsaUJBQU07OztJQURKLGVBQ0Y7SUFERSxzRkFDRjs7O0FEckRaLE1BQU0sT0FBTyx3Q0FBd0M7SUFtQm5ELFlBQ21CLEVBQWUsRUFDZixLQUFxQixFQUNy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RSw2RkFBa0U7UUFJNUQsZUFDRjtRQURFLGlFQUNGO1FBS0MsZUFBeUQ7UUFBekQsa0ZBQXlEO1FBU3hELGVBQWlDO1FBQWpDLG1EQUFpQyx5Q0FBQTtRQUtqQyxlQUNGO1FBREUsb0ZBQ0Y7UUFRRSxlQUFpQztRQUFqQyxtREFBaUMseUNBQUE7UUFLakMsZUFDRjtRQURFLG9GQUNGO1FBUUUsZUFBaUM7UUFBakMsbURBQWlDLHlDQUFBO1FBS2pDLGVBQ0Y7UUFERSxvRkFDRjtRQVVSLGVBQ0Y7UUFERSxtRUFDRjtRQUlNLGVBQ0Y7UUFERSxpRUFDRjs7dUZEOUdLLHdDQUF3QztjQUxwRCxTQUFTOzJCQUNFLHlDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBYnN0cmFjdEFwcENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgQ2FzZVZpZXcsIEVycm9yTWVzc2FnZSwgUmV2aWV3U3BlY2lmaWNBY2Nlc3NSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluJztcbmltcG9ydCB7IEFjY2Vzc1JlYXNvbiwgUmV2aWV3U3BlY2lmaWNBY2Nlc3NSZXF1ZXN0RXJyb3JzLCBSZXZpZXdTcGVjaWZpY0FjY2Vzc1JlcXVlc3RQYWdlVGV4dCB9IGZyb20gJy4vbW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWNhc2UtcmV2aWV3LXNwZWNpZmljLWFjY2Vzcy1yZXF1ZXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhc2UtcmV2aWV3LXNwZWNpZmljLWFjY2Vzcy1yZXF1ZXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FzZS1yZXZpZXctc3BlY2lmaWMtYWNjZXNzLXJlcXVlc3QuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYXNlUmV2aWV3U3BlY2lmaWNBY2Nlc3NSZXF1ZXN0Q29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwdWJsaWMgc3RhdGljIENBTkNFTF9MSU5LX0RFU1RJTkFUSU9OID0gJy93b3JrL215LXdvcmsvbGlzdCc7XG4gIHB1YmxpYyBjb2xsYXBzZWQgPSBmYWxzZTtcbiAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gIHB1YmxpYyBoaW50OiBzdHJpbmc7XG4gIHB1YmxpYyBjYXNlUmVmTGFiZWw6IHN0cmluZztcbiAgcHVibGljIGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cDtcbiAgcHVibGljIHN1Ym1pdHRlZCA9IGZhbHNlO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBFcnJvck1lc3NhZ2U7XG4gIHB1YmxpYyByZWFkb25seSBhY2Nlc3NSZWFzb25zOiBEaXNwbGF5ZWRBY2Nlc3NSZWFzb25bXTtcbiAgcHVibGljIHJlcXVlc3RBY2Nlc3NEZXRhaWxzOiBSZXF1ZXN0QWNjZXNzRGV0YWlscztcbiAgcHVibGljIGNhc2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIHVzZXJBY2Nlc3NUeXBlOiBzdHJpbmc7XG4gIHB1YmxpYyBjYXNlRGV0YWlsczogQ2FzZVZpZXc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBnZW5lcmljRXJyb3IgPSAnVGhlcmUgaXMgYSBwcm9ibGVtJztcbiAgcHJpdmF0ZSByZWFkb25seSByYWRpb1NlbGVjdGVkQ29udHJvbE5hbWUgPSAncmFkaW9TZWxlY3RlZCc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFwcENvbmZpZzogQWJzdHJhY3RBcHBDb25maWcsXG4gICkge1xuICAgIHRoaXMuYWNjZXNzUmVhc29ucyA9IFtcbiAgICAgIHsgcmVhc29uOiBBY2Nlc3NSZWFzb24uQVBQUk9WRV9SRVFVRVNULCBjaGVja2VkOiBmYWxzZSB9LFxuICAgICAgeyByZWFzb246IEFjY2Vzc1JlYXNvbi5SRUpFQ1RfUkVRVUVTVCwgY2hlY2tlZDogZmFsc2UgfSxcbiAgICAgIHsgcmVhc29uOiBBY2Nlc3NSZWFzb24uUkVRVUVTVF9NT1JFX0lORk9STUFUSU9OLCBjaGVja2VkOiBmYWxzZSB9LFxuICAgIF07XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gVE9ETzogdGhpcyB0aWNrZXQgaXMgYmxvY2tlZCBzbyBtb2NrZWQgd2l0aCB0aG9zZSBkYXRhIHRvIGdvIHRocm91Z2gsIHRoZXkgd2lsbCBiZSByZW1vdmVkIGFuZCBpbXBsaW1lbnRlZCB3aXRoIGFjdHVhbCBkYXRhXG4gICAgLy8gd2hlbiBkZXBlbmRlbmN5IHJlc29sdmVkXG4gICAgdGhpcy5zZXRNb2NrRGF0YSgpO1xuICAgIHRoaXMudGl0bGUgPSBSZXZpZXdTcGVjaWZpY0FjY2Vzc1JlcXVlc3RQYWdlVGV4dC5USVRMRTtcbiAgICB0aGlzLmhpbnQgPSBSZXZpZXdTcGVjaWZpY0FjY2Vzc1JlcXVlc3RQYWdlVGV4dC5ISU5UO1xuICAgIHRoaXMuY2FzZVJlZkxhYmVsID0gUmV2aWV3U3BlY2lmaWNBY2Nlc3NSZXF1ZXN0UGFnZVRleHQuQ0FTRV9SRUY7XG4gICAgdGhpcy5mb3JtR3JvdXAgPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIHJhZGlvU2VsZWN0ZWQ6IG5ldyBGb3JtQ29udHJvbChudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYXNlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNhc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJtaXR0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBvblN1Ym1pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1Ym1pdHRlZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMucmFkaW9TZWxlY3RlZENvbnRyb2xOYW1lKS5pbnZhbGlkKSB7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHtcbiAgICAgICAgdGl0bGU6IHRoaXMuZ2VuZXJpY0Vycm9yLFxuICAgICAgICBkZXNjcmlwdGlvbjogUmV2aWV3U3BlY2lmaWNBY2Nlc3NSZXF1ZXN0RXJyb3JzLk5PX1NFTEVDVElPTixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIEluaXRpYXRlIFJldmlldyBBY2Nlc3MgUmVxdWVzdFxuICAgIGlmICh0aGlzLmZvcm1Hcm91cC52YWxpZCkge1xuICAgICAgLy8gR2V0IHRoZSBDYXNlIFJlZmVyZW5jZSAoZm9yIHdoaWNoIGFjY2VzcyBpcyBiZWluZyByZXF1ZXN0ZWQpIGZyb20gdGhlIEFjdGl2YXRlZFJvdXRlU25hcHNob3QgZGF0YVxuICAgICAgY29uc3QgY2FzZUlkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5kYXRhLmNhc2UuY2FzZV9pZDtcbiAgICAgIGNvbnN0IHJhZGlvU2VsZWN0ZWRWYWx1ZSA9IHRoaXMuZm9ybUdyb3VwLmdldChcbiAgICAgICAgdGhpcy5yYWRpb1NlbGVjdGVkQ29udHJvbE5hbWVcbiAgICAgICkudmFsdWU7XG4gICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHRoZSBzZWxlY3RlZCBBY2Nlc3NSZWFzb24gZW51bSB2YWx1ZS4gQ2FuJ3QgdXNlIE9iamVjdC52YWx1ZXMgYmVjYXVzZSBpdCdzIG5vdCBhdmFpbGFibGUgaW5cbiAgICAgIC8vIDwgRVMyMDE3IVxuICAgICAgY29uc3QgcmVhc29uTnVtYmVyID0gT2JqZWN0LmtleXMoQWNjZXNzUmVhc29uKVxuICAgICAgICAubWFwKChlKSA9PiBBY2Nlc3NSZWFzb25bZV0pXG4gICAgICAgIC5pbmRleE9mKHJhZGlvU2VsZWN0ZWRWYWx1ZSk7XG4gICAgICAvLyByZXF1ZXN0IG1vZGVsIGNyZWF0ZWQgLCBpdCB3aWxsIGJlIHVzZWQgZm9yIHN1Ym1pc3Npb24gcGFydFxuICAgICAgY29uc3QgY2hhbGxlbmdlZEFjY2Vzc1JlcXVlc3QgPSB7XG4gICAgICAgIHJlYXNvbjogcmVhc29uTnVtYmVyLFxuICAgICAgICBjYXNlSWQsXG4gICAgICB9IGFzIFJldmlld1NwZWNpZmljQWNjZXNzUmVxdWVzdDtcbiAgICAgIGlmIChBY2Nlc3NSZWFzb24uUkVKRUNUX1JFUVVFU1QgPT09IHJhZGlvU2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ3JlamVjdGVkJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25DYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChDYXNlUmV2aWV3U3BlY2lmaWNBY2Nlc3NSZXF1ZXN0Q29tcG9uZW50LkNBTkNFTF9MSU5LX0RFU1RJTkFUSU9OKTtcbiAgfVxuXG4gIC8vIHJlbW92ZSBvbmNlIEFjY2VzcyBtYW5hZ2VtZW50IGdvZXMgbGl2ZVxuICBwdWJsaWMgc2V0TW9ja0RhdGEoKTogdm9pZCB7XG4gICAgY29uc3QgcmVxdWVzdEFjY2Vzc0RldGFpbHNNb2NrID1cbiAgICAgIHRoaXMuYXBwQ29uZmlnLmdldEFjY2Vzc01hbmFnZW1lbnRSZXF1ZXN0UmV2aWV3TW9ja01vZGVsKCk7XG5cbiAgICBpZiAocmVxdWVzdEFjY2Vzc0RldGFpbHNNb2NrLmFjdGl2ZSkge1xuICAgICAgdGhpcy5yZXF1ZXN0QWNjZXNzRGV0YWlscyA9IHJlcXVlc3RBY2Nlc3NEZXRhaWxzTW9jay5kZXRhaWxzO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERpc3BsYXllZEFjY2Vzc1JlYXNvbiB7XG4gIHJlYXNvbjogQWNjZXNzUmVhc29uO1xuICBjaGVja2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RBY2Nlc3NEZXRhaWxzIHtcbiAgY2FzZU5hbWU6IHN0cmluZztcbiAgY2FzZVJlZmVyZW5jZTogc3RyaW5nO1xuICBkYXRlU3VibWl0dGVkOiBzdHJpbmc7XG4gIHJlcXVlc3RGcm9tOiBzdHJpbmc7XG4gIHJlYXNvbkZvckNhc2VBY2Nlc3M6IHN0cmluZztcbn1cbiIsIjxleHVpLWVycm9yLW1lc3NhZ2VcbiAgKm5nSWY9XCJmb3JtR3JvdXAuaW52YWxpZCAmJiBzdWJtaXR0ZWRcIlxuICBbZXJyb3JdPVwiZXJyb3JNZXNzYWdlXCI+XG48L2V4dWktZXJyb3ItbWVzc2FnZT5cblxuPGZvcm0gW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIiAoc3VibWl0KT1cIm9uU3VibWl0KClcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIj5cbiAgICA8ZmllbGRzZXQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldFwiIGFyaWEtZGVzY3JpYmVkYnk9XCJyZWFzb24taGludFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLXR3by10aGlyZHNcIj5cbiAgICAgICAgPHA+PC9wPlxuICAgICAgICA8bGVnZW5kIGNsYXNzPVwiZ292dWstZmllbGRzZXRfX2xlZ2VuZCBnb3Z1ay1maWVsZHNldF9fbGVnZW5kLS1sXCI+XG4gICAgICAgICAgPGgxIGNsYXNzPVwiZ292dWstZmllbGRzZXRfX2hlYWRpbmdcIj5cbiAgICAgICAgICAgIHt7IHRpdGxlIHwgcnB4VHJhbnNsYXRlIH19XG4gICAgICAgICAgPC9oMT5cbiAgICAgICAgPC9sZWdlbmQ+XG4gICAgICAgIDxwPjwvcD5cbiAgICAgICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgICAgICA8Y2FwdGlvbj48L2NhcHRpb24+XG4gICAgICAgICAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIj5cbiAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgICAgPHRoIHNjb3BlPVwicm93XCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGxlZnRMYWJlbFwiID5cbiAgICAgICAgICAgICAgICB7eydDYXNlIG5hbWUnIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57eyByZXF1ZXN0QWNjZXNzRGV0YWlscy5jYXNlTmFtZSB9fTwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgICA8dGggc2NvcGU9XCJyb3dcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgbGVmdExhYmVsXCIgPlxuICAgICAgICAgICAgICAgIHt7J0Nhc2UgcmVmZXJlbmNlJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3sgcmVxdWVzdEFjY2Vzc0RldGFpbHMuY2FzZVJlZmVyZW5jZSB9fTwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgICA8dGggc2NvcGU9XCJyb3dcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgbGVmdExhYmVsXCIgPlxuICAgICAgICAgICAgICAgIHt7J0RhdGUgc3VibWl0dGVkJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3sgcmVxdWVzdEFjY2Vzc0RldGFpbHMuZGF0ZVN1Ym1pdHRlZCB9fTwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgICAgICA8dGggc2NvcGU9XCJyb3dcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgbGVmdExhYmVsXCIgPlxuICAgICAgICAgICAgICAgIHt7J1JlcXVlc3QgZnJvbScgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7IHJlcXVlc3RBY2Nlc3NEZXRhaWxzLnJlcXVlc3RGcm9tIH19PGJyIC8+PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgICAgIDx0aCBzY29wZT1cInJvd1wiIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBsZWZ0TGFiZWxcIiA+XG4gICAgICAgICAgICAgICAge3snUmVhc29uIGZvciBjYXNlIGFjY2VzcycgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7IHJlcXVlc3RBY2Nlc3NEZXRhaWxzLnJlYXNvbkZvckNhc2VBY2Nlc3MgfCBycHhUcmFuc2xhdGUgfX08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ2Zvcm0tZ3JvdXAtZXJyb3InOiBmb3JtR3JvdXAuaW52YWxpZCAmJiBzdWJtaXR0ZWQgfVwiPlxuICAgICAgICAgIDxmaWVsZHNldCBjbGFzcz1cImdvdnVrLWZpZWxkc2V0XCI+XG4gICAgICAgICAgICA8bGVnZW5kIGNsYXNzPVwiZ292dWstZmllbGRzZXRfX2xlZ2VuZCBnb3Z1ay1maWVsZHNldF9fbGVnZW5kLS1tXCI+XG4gICAgICAgICAgICAgIDxoMSBjbGFzcz1cImdvdnVrLWZpZWxkc2V0X19oZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAge3sgaGludCB8IHJweFRyYW5zbGF0ZSB9fVxuICAgICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgPC9sZWdlbmQ+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGlkPVwiZXJyb3ItbWVzc2FnZVwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiZ292dWstZXJyb3ItbWVzc2FnZVwiXG4gICAgICAgICAgICAgICpuZ0lmPVwiZm9ybUdyb3VwLmdldCgncmFkaW9TZWxlY3RlZCcpLmludmFsaWQgJiYgc3VibWl0dGVkXCI+XG4gICAgICAgICAgICAgIHt7IGVycm9yTWVzc2FnZS5kZXNjcmlwdGlvbiB8IHJweFRyYW5zbGF0ZSB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zX19pdGVtXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZ292dWstcmFkaW9zX19pbnB1dFwiXG4gICAgICAgICAgICAgICAgaWQ9XCJyZWFzb24tMFwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInJhZGlvU2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgW3ZhbHVlXT1cImFjY2Vzc1JlYXNvbnNbMF0ucmVhc29uXCJcbiAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJyYWRpb1NlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJhY2Nlc3NSZWFzb25zWzBdLmNoZWNrZWRcIlxuICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwib25DaGFuZ2UoKVwiLz5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstcmFkaW9zX19sYWJlbFwiIGZvcj1cInJlYXNvbi0wXCI+XG4gICAgICAgICAgICAgICAge3sgYWNjZXNzUmVhc29uc1swXS5yZWFzb24gfCBycHhUcmFuc2xhdGUgfX1cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19faXRlbVwiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzcz1cImdvdnVrLXJhZGlvc19faW5wdXRcIlxuICAgICAgICAgICAgICAgIGlkPVwicmVhc29uLTFcIlxuICAgICAgICAgICAgICAgIG5hbWU9XCJyYWRpb1NlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJhY2Nlc3NSZWFzb25zWzFdLnJlYXNvblwiXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwicmFkaW9TZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiYWNjZXNzUmVhc29uc1sxXS5jaGVja2VkXCJcbiAgICAgICAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKClcIi8+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLXJhZGlvc19fbGFiZWxcIiBmb3I9XCJyZWFzb24tMVwiPlxuICAgICAgICAgICAgICAgIHt7IGFjY2Vzc1JlYXNvbnNbMV0ucmVhc29uIHwgcnB4VHJhbnNsYXRlIH19XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2l0ZW1cIj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2lucHV0XCJcbiAgICAgICAgICAgICAgICBpZD1cInJlYXNvbi0yXCJcbiAgICAgICAgICAgICAgICBuYW1lPVwicmFkaW9TZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICBbdmFsdWVdPVwiYWNjZXNzUmVhc29uc1syXS5yZWFzb25cIlxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInJhZGlvU2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cImFjY2Vzc1JlYXNvbnNbMl0uY2hlY2tlZFwiXG4gICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbkNoYW5nZSgpXCIvPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1yYWRpb3NfX2xhYmVsXCIgZm9yPVwicmVhc29uLTJcIj5cbiAgICAgICAgICAgICAgICB7eyBhY2Nlc3NSZWFzb25zWzJdLnJlYXNvbiB8IHJweFRyYW5zbGF0ZSB9fVxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2ZpZWxkc2V0PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImdvdnVrLWJ1dHRvbiBnb3Z1ay0hLW1hcmdpbi1yaWdodC0zXCIgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAge3snQ29udGludWUnIHwgcnB4VHJhbnNsYXRlfX1cbiAgICA8L2J1dHRvbj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tZnVsbCBnb3Z1ay0hLXBhZGRpbmctbGVmdC0wXCI+XG4gICAgICA8cD5cbiAgICAgICAgPGEgY2xhc3M9XCJnb3Z1ay1ib2R5XCIgKGNsaWNrKT1cIm9uQ2FuY2VsKClcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XG4gICAgICAgICAge3snQ2FuY2VsJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgICAgIDwvYT5cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Zvcm0+XG4iXX0=