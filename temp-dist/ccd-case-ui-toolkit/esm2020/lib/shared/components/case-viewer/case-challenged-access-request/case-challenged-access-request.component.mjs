import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CaseNotifier, CasesService } from '../../case-editor';
import { AccessReason, ChallengedAccessRequestErrors, ChallengedAccessRequestPageText } from './models';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../case-editor";
function CaseChallengedAccessRequestComponent_exui_error_message_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "exui-error-message", 25);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("error", ctx_r0.errorMessage);
} }
function CaseChallengedAccessRequestComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, ctx_r1.errorMessage.description), " ");
} }
function CaseChallengedAccessRequestComponent_div_24_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, ctx_r4.errorMessage.description), " ");
} }
const _c0 = function (a0) { return { "govuk-input--error": a0 }; };
function CaseChallengedAccessRequestComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27)(1, "div", 28)(2, "label", 29);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, CaseChallengedAccessRequestComponent_div_24_div_4_Template, 3, 3, "div", 30);
    i0.ɵɵelement(5, "input", 31);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.caseRefLabel, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.formGroup.get("caseReference").invalid && ctx_r2.submitted);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c0, ctx_r2.formGroup.get("caseReference").invalid && ctx_r2.submitted));
} }
function CaseChallengedAccessRequestComponent_div_40_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, ctx_r5.errorMessage.description), " ");
} }
const _c1 = function (a0) { return { "govuk-textarea--error": a0 }; };
function CaseChallengedAccessRequestComponent_div_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33)(1, "div", 28);
    i0.ɵɵtemplate(2, CaseChallengedAccessRequestComponent_div_40_div_2_Template, 3, 3, "div", 34);
    i0.ɵɵelement(3, "textarea", 35);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r3.formGroup.get("otherReason").invalid && ctx_r3.submitted);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c1, ctx_r3.formGroup.get("otherReason").invalid && ctx_r3.submitted));
} }
const _c2 = function (a0) { return { "form-group-error": a0 }; };
export class CaseChallengedAccessRequestComponent {
    constructor(fb, router, casesService, route, caseNotifier) {
        this.fb = fb;
        this.router = router;
        this.casesService = casesService;
        this.route = route;
        this.caseNotifier = caseNotifier;
        this.submitted = false;
        this.genericError = 'There is a problem';
        this.radioSelectedControlName = 'radioSelected';
        this.caseReferenceControlName = 'caseReference';
        this.otherReasonControlName = 'otherReason';
        this.accessReasons = [
            { reason: AccessReason.LINKED_TO_CURRENT_CASE, checked: false },
            { reason: AccessReason.CONSOLIDATE_CASE, checked: false },
            { reason: AccessReason.ORDER_FOR_TRANSFER, checked: false },
            { reason: AccessReason.OTHER, checked: false }
        ];
    }
    ngOnInit() {
        this.title = ChallengedAccessRequestPageText.TITLE;
        this.hint = ChallengedAccessRequestPageText.HINT;
        this.caseRefLabel = ChallengedAccessRequestPageText.CASE_REF;
        this.formGroup = this.fb.group({
            radioSelected: new FormControl(null, Validators.required)
        });
        this.formGroup.addControl(this.caseReferenceControlName, new FormControl('', {
            validators: [(control) => {
                    if (this.formGroup.get(this.radioSelectedControlName).value === AccessReason.LINKED_TO_CURRENT_CASE && this.inputEmpty(control)) {
                        return { invalid: true };
                    }
                    return null;
                }],
            updateOn: 'submit'
        }));
        this.formGroup.addControl(this.otherReasonControlName, new FormControl('', {
            validators: [(control) => {
                    if (this.formGroup.get(this.radioSelectedControlName).value === AccessReason.OTHER && this.inputEmpty(control)) {
                        return { invalid: true };
                    }
                    return null;
                }],
            updateOn: 'submit'
        }));
    }
    onChange() {
        this.submitted = false;
        // Clear the "Case reference" and "Other reason" fields manually. This prevents any previous value being retained by
        // the field's FormControl when the field itself is removed from the DOM by *ngIf. (If it is subsequently added back
        // to the DOM by *ngIf, it will appear empty but the associated FormControl still has the previous value.)
        this.formGroup.get(this.caseReferenceControlName).setValue('');
        this.formGroup.get(this.otherReasonControlName).setValue('');
    }
    onSubmit() {
        this.submitted = true;
        if (this.formGroup.get(this.radioSelectedControlName).invalid) {
            this.errorMessage = {
                title: this.genericError,
                description: ChallengedAccessRequestErrors.NO_SELECTION
            };
        }
        else {
            if (this.formGroup.get(this.caseReferenceControlName).invalid) {
                this.errorMessage = {
                    title: this.genericError,
                    description: ChallengedAccessRequestErrors.NO_CASE_REFERENCE,
                    fieldId: 'case-reference'
                };
            }
            if (this.formGroup.get(this.otherReasonControlName).invalid) {
                this.errorMessage = {
                    title: this.genericError,
                    description: ChallengedAccessRequestErrors.NO_REASON,
                    fieldId: 'other-reason'
                };
            }
        }
        // Initiate Challenged Access Request
        if (this.formGroup.valid) {
            // Get the Case Reference (for which access is being requested) from the ActivatedRouteSnapshot data
            const caseId = this.route.snapshot.params.cid;
            const radioSelectedValue = this.formGroup.get(this.radioSelectedControlName).value;
            // Get the index of the selected AccessReason enum value. Can't use Object.values because it's not available in
            // < ES2017!
            const reasonNumber = Object.keys(AccessReason).map(e => AccessReason[e]).indexOf(radioSelectedValue);
            const challengedAccessRequest = {
                reason: reasonNumber,
                caseReference: reasonNumber === 0 ? this.formGroup.get(this.caseReferenceControlName).value : null,
                otherReason: reasonNumber === 3 ? this.formGroup.get(this.otherReasonControlName).value : null
            };
            this.$roleAssignmentResponseSubscription = this.casesService.createChallengedAccessRequest(caseId, challengedAccessRequest)
                .pipe(switchMap(() => this.caseNotifier.fetchAndRefresh(caseId)))
                .subscribe(() => {
                // Would have been nice to pass the caseId within state.data, but this isn't part of NavigationExtras until
                // Angular 7.2!
                this.router.navigate(['success'], { relativeTo: this.route });
            }, () => {
                // Navigate to error page
            });
        }
    }
    onCancel() {
        this.router.navigateByUrl(CaseChallengedAccessRequestComponent.CANCEL_LINK_DESTINATION);
    }
    ngOnDestroy() {
        if (this.$roleAssignmentResponseSubscription) {
            this.$roleAssignmentResponseSubscription.unsubscribe();
        }
    }
    inputEmpty(input) {
        return input.value === null || input.value.trim().length === 0;
    }
}
CaseChallengedAccessRequestComponent.CANCEL_LINK_DESTINATION = '/work/my-work/list';
CaseChallengedAccessRequestComponent.ɵfac = function CaseChallengedAccessRequestComponent_Factory(t) { return new (t || CaseChallengedAccessRequestComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.CasesService), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i3.CaseNotifier)); };
CaseChallengedAccessRequestComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseChallengedAccessRequestComponent, selectors: [["ccd-case-challenged-access-request"]], decls: 50, vars: 46, consts: [[3, "error", 4, "ngIf"], ["type", "information"], [3, "formGroup", "submit"], [1, "govuk-form-group", 3, "ngClass"], ["aria-describedby", "reason-hint", 1, "govuk-fieldset"], [1, "govuk-fieldset__legend", "govuk-fieldset__legend--l"], [1, "govuk-fieldset__heading"], ["id", "reason-hint", 1, "govuk-hint"], ["id", "error-message", "class", "govuk-error-message", 4, "ngIf"], ["data-module", "govuk-radios", 1, "govuk-radios", "govuk-radios--conditional"], [1, "govuk-radios__item"], ["id", "reason-0", "name", "radioSelected", "type", "radio", "data-aria-controls", "conditional-reason-0", "formControlName", "radioSelected", 1, "govuk-radios__input", 3, "value", "checked", "change"], ["for", "reason-0", 1, "govuk-label", "govuk-radios__label"], ["id", "conditional-reason-0", "class", "govuk-radios__conditional", 4, "ngIf"], ["id", "reason-1", "name", "radioSelected", "type", "radio", "formControlName", "radioSelected", 1, "govuk-radios__input", 3, "value", "checked", "change"], ["for", "reason-1", 1, "govuk-label", "govuk-radios__label"], ["id", "reason-2", "name", "radioSelected", "type", "radio", "formControlName", "radioSelected", 1, "govuk-radios__input", 3, "value", "checked", "change"], ["for", "reason-2", 1, "govuk-label", "govuk-radios__label"], ["id", "reason-3", "name", "radioSelected", "type", "radio", "data-aria-controls", "conditional-reason-3", "formControlName", "radioSelected", 1, "govuk-radios__input", 3, "value", "checked", "change"], ["for", "reason-3", "id", "reason-3-label", 1, "govuk-label", "govuk-radios__label"], ["id", "conditional-reason-3", "class", "govuk-radios__conditional", 4, "ngIf"], [1, "govuk-button-group"], ["type", "submit", 1, "govuk-button", "govuk-!-margin-right-3"], [1, "govuk-grid-column-full", "govuk-!-padding-left-0"], ["href", "javascript:void(0)", 1, "govuk-body", 3, "click"], [3, "error"], ["id", "error-message", 1, "govuk-error-message"], ["id", "conditional-reason-0", 1, "govuk-radios__conditional"], [1, "govuk-form-group"], ["for", "case-reference", 1, "govuk-label"], ["id", "case-reference-error-message", "class", "govuk-error-message", 4, "ngIf"], ["id", "case-reference", "name", "case-reference", "type", "text", "formControlName", "caseReference", 1, "govuk-input", "govuk-!-width-one-third", 3, "ngClass"], ["id", "case-reference-error-message", 1, "govuk-error-message"], ["id", "conditional-reason-3", 1, "govuk-radios__conditional"], ["id", "other-reason-error-message", "class", "govuk-error-message", 4, "ngIf"], ["id", "other-reason", "name", "other-reason", "rows", "5", "aria-describedby", "reason-3-label", "formControlName", "otherReason", 1, "govuk-textarea", 3, "ngClass"], ["id", "other-reason-error-message", 1, "govuk-error-message"]], template: function CaseChallengedAccessRequestComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseChallengedAccessRequestComponent_exui_error_message_0_Template, 1, 1, "exui-error-message", 0);
        i0.ɵɵelementStart(1, "cut-alert", 1);
        i0.ɵɵtext(2);
        i0.ɵɵpipe(3, "rpxTranslate");
        i0.ɵɵelement(4, "br");
        i0.ɵɵtext(5);
        i0.ɵɵpipe(6, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "form", 2);
        i0.ɵɵlistener("submit", function CaseChallengedAccessRequestComponent_Template_form_submit_7_listener() { return ctx.onSubmit(); });
        i0.ɵɵelementStart(8, "div", 3)(9, "fieldset", 4)(10, "legend", 5)(11, "h1", 6);
        i0.ɵɵtext(12);
        i0.ɵɵpipe(13, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(14, "div", 7);
        i0.ɵɵtext(15);
        i0.ɵɵpipe(16, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(17, CaseChallengedAccessRequestComponent_div_17_Template, 3, 3, "div", 8);
        i0.ɵɵelementStart(18, "div", 9)(19, "div", 10)(20, "input", 11);
        i0.ɵɵlistener("change", function CaseChallengedAccessRequestComponent_Template_input_change_20_listener() { return ctx.onChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "label", 12);
        i0.ɵɵtext(22);
        i0.ɵɵpipe(23, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(24, CaseChallengedAccessRequestComponent_div_24_Template, 6, 5, "div", 13);
        i0.ɵɵelementStart(25, "div", 10)(26, "input", 14);
        i0.ɵɵlistener("change", function CaseChallengedAccessRequestComponent_Template_input_change_26_listener() { return ctx.onChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "label", 15);
        i0.ɵɵtext(28);
        i0.ɵɵpipe(29, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(30, "div", 10)(31, "input", 16);
        i0.ɵɵlistener("change", function CaseChallengedAccessRequestComponent_Template_input_change_31_listener() { return ctx.onChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(32, "label", 17);
        i0.ɵɵtext(33);
        i0.ɵɵpipe(34, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(35, "div", 10)(36, "input", 18);
        i0.ɵɵlistener("change", function CaseChallengedAccessRequestComponent_Template_input_change_36_listener() { return ctx.onChange(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(37, "label", 19);
        i0.ɵɵtext(38);
        i0.ɵɵpipe(39, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(40, CaseChallengedAccessRequestComponent_div_40_Template, 4, 4, "div", 20);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(41, "div", 21)(42, "button", 22);
        i0.ɵɵtext(43);
        i0.ɵɵpipe(44, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "div", 23)(46, "p")(47, "a", 24);
        i0.ɵɵlistener("click", function CaseChallengedAccessRequestComponent_Template_a_click_47_listener() { return ctx.onCancel(); });
        i0.ɵɵtext(48);
        i0.ɵɵpipe(49, "rpxTranslate");
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.formGroup.invalid && ctx.submitted);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 24, "This case requires challenged access."), "");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 26, "This is because the case is outside your work area. If you request access to the case, it will be logged for auditing purposes."), "\n");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("formGroup", ctx.formGroup);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(44, _c2, ctx.formGroup.invalid && ctx.submitted));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(13, 28, ctx.title), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(16, 30, ctx.hint), " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.formGroup.get("radioSelected").invalid && ctx.submitted);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.accessReasons[0].reason)("checked", ctx.accessReasons[0].checked);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(23, 32, ctx.accessReasons[0].reason), " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.formGroup.get("radioSelected").value === ctx.accessReasons[0].reason);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("value", ctx.accessReasons[1].reason)("checked", ctx.accessReasons[1].checked);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(29, 34, ctx.accessReasons[1].reason), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.accessReasons[2].reason)("checked", ctx.accessReasons[2].checked);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(34, 36, ctx.accessReasons[2].reason), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("value", ctx.accessReasons[3].reason)("checked", ctx.accessReasons[3].checked);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(39, 38, ctx.accessReasons[3].reason), " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.formGroup.get("radioSelected").value === ctx.accessReasons[3].reason);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(44, 40, "Submit"), " ");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(49, 42, "Cancel"), " ");
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseChallengedAccessRequestComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-challenged-access-request', template: "<exui-error-message *ngIf=\"formGroup.invalid && submitted\" [error]=\"errorMessage\"></exui-error-message>\n<cut-alert type=\"information\">\n  {{'This case requires challenged access.' | rpxTranslate}}<br/>\n  {{'This is because the case is outside your work area. If you request access to the case, it will be logged for auditing purposes.' | rpxTranslate}}\n</cut-alert>\n<form [formGroup]=\"formGroup\" (submit)=\"onSubmit()\">\n  <div class=\"govuk-form-group\" [ngClass]=\"{'form-group-error': formGroup.invalid && submitted}\">\n    <fieldset class=\"govuk-fieldset\" aria-describedby=\"reason-hint\">\n      <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--l\">\n        <h1 class=\"govuk-fieldset__heading\">\n          {{title | rpxTranslate}}\n        </h1>\n      </legend>\n      <div id=\"reason-hint\" class=\"govuk-hint\">\n        {{hint | rpxTranslate}}\n      </div>\n      <div id=\"error-message\" class=\"govuk-error-message\" *ngIf=\"formGroup.get('radioSelected').invalid && submitted\">\n        {{errorMessage.description | rpxTranslate}}\n      </div>\n      <div class=\"govuk-radios govuk-radios--conditional\" data-module=\"govuk-radios\">\n        <div class=\"govuk-radios__item\">\n          <input class=\"govuk-radios__input\" id=\"reason-0\" name=\"radioSelected\" type=\"radio\" [value]=\"accessReasons[0].reason\"\n          data-aria-controls=\"conditional-reason-0\" formControlName=\"radioSelected\" [checked]=\"accessReasons[0].checked\"\n          (change)=\"onChange()\"/>\n          <label class=\"govuk-label govuk-radios__label\" for=\"reason-0\">\n            {{accessReasons[0].reason | rpxTranslate}}\n          </label>\n        </div>\n        <div id=\"conditional-reason-0\" *ngIf=\"formGroup.get('radioSelected').value === accessReasons[0].reason\"\n        class=\"govuk-radios__conditional\">\n          <div class=\"govuk-form-group\">\n            <label class=\"govuk-label\" for=\"case-reference\">\n              {{caseRefLabel}}\n            </label>\n            <div id=\"case-reference-error-message\" class=\"govuk-error-message\" *ngIf=\"formGroup.get('caseReference').invalid && submitted\">\n              {{errorMessage.description | rpxTranslate}}\n            </div>\n            <input class=\"govuk-input govuk-!-width-one-third\"\n            [ngClass]=\"{'govuk-input--error': formGroup.get('caseReference').invalid && submitted}\" id=\"case-reference\"\n            name=\"case-reference\" type=\"text\" formControlName=\"caseReference\">\n          </div>\n        </div>\n        <div class=\"govuk-radios__item\">\n          <input class=\"govuk-radios__input\" id=\"reason-1\" name=\"radioSelected\" type=\"radio\" [value]=\"accessReasons[1].reason\"\n          formControlName=\"radioSelected\" [checked]=\"accessReasons[1].checked\" (change)=\"onChange()\"/>\n          <label class=\"govuk-label govuk-radios__label\" for=\"reason-1\">\n            {{accessReasons[1].reason | rpxTranslate}}\n          </label>\n        </div>\n        <div class=\"govuk-radios__item\">\n          <input class=\"govuk-radios__input\" id=\"reason-2\" name=\"radioSelected\" type=\"radio\" [value]=\"accessReasons[2].reason\"\n          formControlName=\"radioSelected\" [checked]=\"accessReasons[2].checked\" (change)=\"onChange()\"/>\n          <label class=\"govuk-label govuk-radios__label\" for=\"reason-2\">\n            {{accessReasons[2].reason | rpxTranslate}}\n          </label>\n        </div>\n        <div class=\"govuk-radios__item\">\n          <input class=\"govuk-radios__input\" id=\"reason-3\" name=\"radioSelected\" type=\"radio\" [value]=\"accessReasons[3].reason\"\n          data-aria-controls=\"conditional-reason-3\" formControlName=\"radioSelected\" [checked]=\"accessReasons[3].checked\"\n          (change)=\"onChange()\"/>\n          <label class=\"govuk-label govuk-radios__label\" for=\"reason-3\" id=\"reason-3-label\">\n            {{accessReasons[3].reason | rpxTranslate}}\n          </label>\n        </div>\n        <div id=\"conditional-reason-3\" *ngIf=\"formGroup.get('radioSelected').value === accessReasons[3].reason\"\n        class=\"govuk-radios__conditional\">\n          <div class=\"govuk-form-group\">\n            <div id=\"other-reason-error-message\" class=\"govuk-error-message\" *ngIf=\"formGroup.get('otherReason').invalid && submitted\">\n              {{errorMessage.description | rpxTranslate}}\n            </div>\n            <textarea class=\"govuk-textarea\" [ngClass]=\"{'govuk-textarea--error': formGroup.get('otherReason').invalid && submitted}\"\n            id=\"other-reason\" name=\"other-reason\" rows=\"5\" aria-describedby=\"reason-3-label\" formControlName=\"otherReason\"></textarea>\n          </div>\n        </div>\n      </div>\n    </fieldset>\n  </div>\n  <div class=\"govuk-button-group\">\n    <button class=\"govuk-button govuk-!-margin-right-3\" type=\"submit\">\n      {{'Submit' | rpxTranslate}}\n    </button>\n    <div class=\"govuk-grid-column-full govuk-!-padding-left-0\">\n      <p>\n        <a class='govuk-body' (click)=\"onCancel()\" href=\"javascript:void(0)\">\n          {{'Cancel' | rpxTranslate}}\n        </a>\n      </p>\n    </div>\n  </div>\n</form>\n" }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.Router }, { type: i3.CasesService }, { type: i2.ActivatedRoute }, { type: i3.CaseNotifier }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1jaGFsbGVuZ2VkLWFjY2Vzcy1yZXF1ZXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLWNoYWxsZW5nZWQtYWNjZXNzLXJlcXVlc3QvY2FzZS1jaGFsbGVuZ2VkLWFjY2Vzcy1yZXF1ZXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLWNoYWxsZW5nZWQtYWNjZXNzLXJlcXVlc3QvY2FzZS1jaGFsbGVuZ2VkLWFjY2Vzcy1yZXF1ZXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBbUIsV0FBVyxFQUFFLFdBQVcsRUFBb0IsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLDZCQUE2QixFQUFFLCtCQUErQixFQUFFLE1BQU0sVUFBVSxDQUFDOzs7Ozs7SUNQeEcseUNBQXVHOzs7SUFBNUMsMkNBQXNCOzs7SUFnQjNFLCtCQUFnSDtJQUM5RyxZQUNGOztJQUFBLGlCQUFNOzs7SUFESixlQUNGO0lBREUsc0ZBQ0Y7OztJQWdCTSwrQkFBK0g7SUFDN0gsWUFDRjs7SUFBQSxpQkFBTTs7O0lBREosZUFDRjtJQURFLHNGQUNGOzs7O0lBUkosK0JBQ2tDLGNBQUEsZ0JBQUE7SUFHNUIsWUFDRjtJQUFBLGlCQUFRO0lBQ1IsNkZBRU07SUFDTiw0QkFFa0U7SUFDcEUsaUJBQU0sRUFBQTs7O0lBUkYsZUFDRjtJQURFLG9EQUNGO0lBQ29FLGVBQXlEO0lBQXpELHdGQUF5RDtJQUk3SCxlQUF1RjtJQUF2Rix1SEFBdUY7OztJQTZCdkYsK0JBQTJIO0lBQ3pILFlBQ0Y7O0lBQUEsaUJBQU07OztJQURKLGVBQ0Y7SUFERSxzRkFDRjs7OztJQUxKLCtCQUNrQyxjQUFBO0lBRTlCLDZGQUVNO0lBQ04sK0JBQzBIO0lBQzVILGlCQUFNLEVBQUE7OztJQUw4RCxlQUF1RDtJQUF2RCxzRkFBdUQ7SUFHeEYsZUFBd0Y7SUFBeEYscUhBQXdGOzs7QUR6RHJJLE1BQU0sT0FBTyxvQ0FBb0M7SUFpQi9DLFlBQ21CLEVBQWUsRUFDZixNQUFjLEVBQ2QsWUFBMEIsRUFDMUIsS0FBcUIsRUFDckIsWUFBMEI7UUFKMUIsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWR0QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBSVIsaUJBQVksR0FBRyxvQkFBb0IsQ0FBQztRQUNwQyw2QkFBd0IsR0FBRyxlQUFlLENBQUM7UUFDM0MsNkJBQXdCLEdBQUcsZUFBZSxDQUFDO1FBQzNDLDJCQUFzQixHQUFHLGFBQWEsQ0FBQztRQVN0RCxJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQy9ELEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQ3pELEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQzNELEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtTQUMvQyxDQUFDO0lBQ0osQ0FBQztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLCtCQUErQixDQUFDLEtBQUssQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxHQUFHLCtCQUErQixDQUFDLElBQUksQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLCtCQUErQixDQUFDLFFBQVEsQ0FBQztRQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQzdCLGFBQWEsRUFBRSxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUMxRCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQ3JELElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRTtZQUNsQixVQUFVLEVBQUUsQ0FBQyxDQUFDLE9BQXdCLEVBQXFDLEVBQUU7b0JBQzNFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSyxLQUFLLFlBQVksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUMvSCxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO3FCQUMxQjtvQkFDRCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDLENBQUM7WUFDRixRQUFRLEVBQUUsUUFBUTtTQUNuQixDQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFDbkQsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFO1lBQ2xCLFVBQVUsRUFBRSxDQUFDLENBQUMsT0FBd0IsRUFBcUMsRUFBRTtvQkFDM0UsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxLQUFLLEtBQUssWUFBWSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUM5RyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO3FCQUMxQjtvQkFDRCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDLENBQUM7WUFDRixRQUFRLEVBQUUsUUFBUTtTQUNuQixDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsb0hBQW9IO1FBQ3BILG9IQUFvSDtRQUNwSCwwR0FBMEc7UUFDMUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsT0FBTyxFQUFFO1lBQzdELElBQUksQ0FBQyxZQUFZLEdBQUc7Z0JBQ2xCLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWTtnQkFDeEIsV0FBVyxFQUFFLDZCQUE2QixDQUFDLFlBQVk7YUFDeEQsQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE9BQU8sRUFBRTtnQkFDN0QsSUFBSSxDQUFDLFlBQVksR0FBRztvQkFDbEIsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZO29CQUN4QixXQUFXLEVBQUUsNkJBQTZCLENBQUMsaUJBQWlCO29CQUM1RCxPQUFPLEVBQUUsZ0JBQWdCO2lCQUMxQixDQUFDO2FBQ0g7WUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sRUFBRTtnQkFDM0QsSUFBSSxDQUFDLFlBQVksR0FBRztvQkFDbEIsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZO29CQUN4QixXQUFXLEVBQUUsNkJBQTZCLENBQUMsU0FBUztvQkFDcEQsT0FBTyxFQUFFLGNBQWM7aUJBQ3hCLENBQUM7YUFDSDtTQUNGO1FBRUQscUNBQXFDO1FBQ3JDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7WUFDeEIsb0dBQW9HO1lBQ3BHLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDOUMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDbkYsK0dBQStHO1lBQy9HLFlBQVk7WUFDWixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3JHLE1BQU0sdUJBQXVCLEdBQUc7Z0JBQzlCLE1BQU0sRUFBRSxZQUFZO2dCQUNwQixhQUFhLEVBQUUsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUNsRyxXQUFXLEVBQUUsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJO2FBQ3BFLENBQUM7WUFFN0IsSUFBSSxDQUFDLG1DQUFtQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsNkJBQTZCLENBQUMsTUFBTSxFQUFFLHVCQUF1QixDQUFDO2lCQUN4SCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQ2hFLFNBQVMsQ0FDUixHQUFHLEVBQUU7Z0JBQ0gsMkdBQTJHO2dCQUMzRyxlQUFlO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDaEUsQ0FBQyxFQUNELEdBQUcsRUFBRTtnQkFDSCx5QkFBeUI7WUFDM0IsQ0FBQyxDQUNGLENBQUM7U0FDTDtJQUNILENBQUM7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsb0NBQW9DLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRU0sV0FBVztRQUNoQixJQUFJLElBQUksQ0FBQyxtQ0FBbUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsbUNBQW1DLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBRU8sVUFBVSxDQUFDLEtBQXNCO1FBQ3ZDLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLENBQUM7O0FBeklhLDREQUF1QixHQUFHLG9CQUFvQixDQUFDO3dIQURsRCxvQ0FBb0M7dUZBQXBDLG9DQUFvQztRQ2JqRCxtSEFBdUc7UUFDdkcsb0NBQThCO1FBQzVCLFlBQTBEOztRQUFBLHFCQUFLO1FBQy9ELFlBQ0Y7O1FBQUEsaUJBQVk7UUFDWiwrQkFBb0Q7UUFBdEIsaUhBQVUsY0FBVSxJQUFDO1FBQ2pELDhCQUErRixrQkFBQSxpQkFBQSxhQUFBO1FBSXZGLGFBQ0Y7O1FBQUEsaUJBQUssRUFBQTtRQUVQLCtCQUF5QztRQUN2QyxhQUNGOztRQUFBLGlCQUFNO1FBQ04sdUZBRU07UUFDTiwrQkFBK0UsZUFBQSxpQkFBQTtRQUkzRSxtSEFBVSxjQUFVLElBQUM7UUFGckIsaUJBRXVCO1FBQ3ZCLGtDQUE4RDtRQUM1RCxhQUNGOztRQUFBLGlCQUFRLEVBQUE7UUFFVix3RkFhTTtRQUNOLGdDQUFnQyxpQkFBQTtRQUV1QyxtSEFBVSxjQUFVLElBQUM7UUFEMUYsaUJBQzRGO1FBQzVGLGtDQUE4RDtRQUM1RCxhQUNGOztRQUFBLGlCQUFRLEVBQUE7UUFFVixnQ0FBZ0MsaUJBQUE7UUFFdUMsbUhBQVUsY0FBVSxJQUFDO1FBRDFGLGlCQUM0RjtRQUM1RixrQ0FBOEQ7UUFDNUQsYUFDRjs7UUFBQSxpQkFBUSxFQUFBO1FBRVYsZ0NBQWdDLGlCQUFBO1FBRzlCLG1IQUFVLGNBQVUsSUFBQztRQUZyQixpQkFFdUI7UUFDdkIsa0NBQWtGO1FBQ2hGLGFBQ0Y7O1FBQUEsaUJBQVEsRUFBQTtRQUVWLHdGQVNNO1FBQ1IsaUJBQU0sRUFBQSxFQUFBO1FBR1YsZ0NBQWdDLGtCQUFBO1FBRTVCLGFBQ0Y7O1FBQUEsaUJBQVM7UUFDVCxnQ0FBMkQsU0FBQSxhQUFBO1FBRWpDLDZHQUFTLGNBQVUsSUFBQztRQUN4QyxhQUNGOztRQUFBLGlCQUFJLEVBQUEsRUFBQSxFQUFBLEVBQUE7O1FBckZTLDZEQUFvQztRQUV2RCxlQUEwRDtRQUExRCw4RkFBMEQ7UUFDMUQsZUFDRjtRQURFLDBMQUNGO1FBQ00sZUFBdUI7UUFBdkIseUNBQXVCO1FBQ0csZUFBZ0U7UUFBaEUsNkZBQWdFO1FBSXRGLGVBQ0Y7UUFERSxrRUFDRjtRQUdBLGVBQ0Y7UUFERSxpRUFDRjtRQUNxRCxlQUF5RDtRQUF6RCxrRkFBeUQ7UUFLdkIsZUFBaUM7UUFBakMsbURBQWlDLHlDQUFBO1FBSWxILGVBQ0Y7UUFERSxvRkFDRjtRQUU4QixlQUFzRTtRQUF0RSwrRkFBc0U7UUFlakIsZUFBaUM7UUFBakMsbURBQWlDLHlDQUFBO1FBR2xILGVBQ0Y7UUFERSxvRkFDRjtRQUdtRixlQUFpQztRQUFqQyxtREFBaUMseUNBQUE7UUFHbEgsZUFDRjtRQURFLG9GQUNGO1FBR21GLGVBQWlDO1FBQWpDLG1EQUFpQyx5Q0FBQTtRQUlsSCxlQUNGO1FBREUsb0ZBQ0Y7UUFFOEIsZUFBc0U7UUFBdEUsK0ZBQXNFO1FBZXhHLGVBQ0Y7UUFERSxpRUFDRjtRQUlNLGVBQ0Y7UUFERSxpRUFDRjs7dUZEeEVLLG9DQUFvQztjQUpoRCxTQUFTOzJCQUNFLG9DQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENoYWxsZW5nZWRBY2Nlc3NSZXF1ZXN0LCBFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi8uLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQ2FzZU5vdGlmaWVyLCBDYXNlc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jYXNlLWVkaXRvcic7XG5pbXBvcnQgeyBBY2Nlc3NSZWFzb24sIENoYWxsZW5nZWRBY2Nlc3NSZXF1ZXN0RXJyb3JzLCBDaGFsbGVuZ2VkQWNjZXNzUmVxdWVzdFBhZ2VUZXh0IH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY2FzZS1jaGFsbGVuZ2VkLWFjY2Vzcy1yZXF1ZXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhc2UtY2hhbGxlbmdlZC1hY2Nlc3MtcmVxdWVzdC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZUNoYWxsZW5nZWRBY2Nlc3NSZXF1ZXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBwdWJsaWMgc3RhdGljIENBTkNFTF9MSU5LX0RFU1RJTkFUSU9OID0gJy93b3JrL215LXdvcmsvbGlzdCc7XG5cbiAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gIHB1YmxpYyBoaW50OiBzdHJpbmc7XG4gIHB1YmxpYyBjYXNlUmVmTGFiZWw6IHN0cmluZztcbiAgcHVibGljIHJlYWRvbmx5IGFjY2Vzc1JlYXNvbnM6IERpc3BsYXllZEFjY2Vzc1JlYXNvbltdO1xuICBwdWJsaWMgZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBwdWJsaWMgc3VibWl0dGVkID0gZmFsc2U7XG4gIHB1YmxpYyBlcnJvck1lc3NhZ2U6IEVycm9yTWVzc2FnZTtcbiAgcHVibGljICRyb2xlQXNzaWdubWVudFJlc3BvbnNlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSByZWFkb25seSBnZW5lcmljRXJyb3IgPSAnVGhlcmUgaXMgYSBwcm9ibGVtJztcbiAgcHJpdmF0ZSByZWFkb25seSByYWRpb1NlbGVjdGVkQ29udHJvbE5hbWUgPSAncmFkaW9TZWxlY3RlZCc7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2FzZVJlZmVyZW5jZUNvbnRyb2xOYW1lID0gJ2Nhc2VSZWZlcmVuY2UnO1xuICBwcml2YXRlIHJlYWRvbmx5IG90aGVyUmVhc29uQ29udHJvbE5hbWUgPSAnb3RoZXJSZWFzb24nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXNlc1NlcnZpY2U6IENhc2VzU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VOb3RpZmllcjogQ2FzZU5vdGlmaWVyXG4gICkge1xuICAgIHRoaXMuYWNjZXNzUmVhc29ucyA9IFtcbiAgICAgIHsgcmVhc29uOiBBY2Nlc3NSZWFzb24uTElOS0VEX1RPX0NVUlJFTlRfQ0FTRSwgY2hlY2tlZDogZmFsc2UgfSxcbiAgICAgIHsgcmVhc29uOiBBY2Nlc3NSZWFzb24uQ09OU09MSURBVEVfQ0FTRSwgY2hlY2tlZDogZmFsc2UgfSxcbiAgICAgIHsgcmVhc29uOiBBY2Nlc3NSZWFzb24uT1JERVJfRk9SX1RSQU5TRkVSLCBjaGVja2VkOiBmYWxzZSB9LFxuICAgICAgeyByZWFzb246IEFjY2Vzc1JlYXNvbi5PVEhFUiwgY2hlY2tlZDogZmFsc2UgfVxuICAgIF07XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy50aXRsZSA9IENoYWxsZW5nZWRBY2Nlc3NSZXF1ZXN0UGFnZVRleHQuVElUTEU7XG4gICAgdGhpcy5oaW50ID0gQ2hhbGxlbmdlZEFjY2Vzc1JlcXVlc3RQYWdlVGV4dC5ISU5UO1xuICAgIHRoaXMuY2FzZVJlZkxhYmVsID0gQ2hhbGxlbmdlZEFjY2Vzc1JlcXVlc3RQYWdlVGV4dC5DQVNFX1JFRjtcbiAgICB0aGlzLmZvcm1Hcm91cCA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgcmFkaW9TZWxlY3RlZDogbmV3IEZvcm1Db250cm9sKG51bGwsIFZhbGlkYXRvcnMucmVxdWlyZWQpXG4gICAgfSk7XG4gICAgdGhpcy5mb3JtR3JvdXAuYWRkQ29udHJvbCh0aGlzLmNhc2VSZWZlcmVuY2VDb250cm9sTmFtZSxcbiAgICAgIG5ldyBGb3JtQ29udHJvbCgnJywge1xuICAgICAgICB2YWxpZGF0b3JzOiBbKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9IHwgbnVsbCA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLnJhZGlvU2VsZWN0ZWRDb250cm9sTmFtZSkudmFsdWUgPT09IEFjY2Vzc1JlYXNvbi5MSU5LRURfVE9fQ1VSUkVOVF9DQVNFICYmIHRoaXMuaW5wdXRFbXB0eShjb250cm9sKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgaW52YWxpZDogdHJ1ZSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfV0sXG4gICAgICAgIHVwZGF0ZU9uOiAnc3VibWl0J1xuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2wodGhpcy5vdGhlclJlYXNvbkNvbnRyb2xOYW1lLFxuICAgICAgbmV3IEZvcm1Db250cm9sKCcnLCB7XG4gICAgICAgIHZhbGlkYXRvcnM6IFsoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gfCBudWxsID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMucmFkaW9TZWxlY3RlZENvbnRyb2xOYW1lKS52YWx1ZSA9PT0gQWNjZXNzUmVhc29uLk9USEVSICYmIHRoaXMuaW5wdXRFbXB0eShjb250cm9sKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgaW52YWxpZDogdHJ1ZSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfV0sXG4gICAgICAgIHVwZGF0ZU9uOiAnc3VibWl0J1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuc3VibWl0dGVkID0gZmFsc2U7XG4gICAgLy8gQ2xlYXIgdGhlIFwiQ2FzZSByZWZlcmVuY2VcIiBhbmQgXCJPdGhlciByZWFzb25cIiBmaWVsZHMgbWFudWFsbHkuIFRoaXMgcHJldmVudHMgYW55IHByZXZpb3VzIHZhbHVlIGJlaW5nIHJldGFpbmVkIGJ5XG4gICAgLy8gdGhlIGZpZWxkJ3MgRm9ybUNvbnRyb2wgd2hlbiB0aGUgZmllbGQgaXRzZWxmIGlzIHJlbW92ZWQgZnJvbSB0aGUgRE9NIGJ5ICpuZ0lmLiAoSWYgaXQgaXMgc3Vic2VxdWVudGx5IGFkZGVkIGJhY2tcbiAgICAvLyB0byB0aGUgRE9NIGJ5ICpuZ0lmLCBpdCB3aWxsIGFwcGVhciBlbXB0eSBidXQgdGhlIGFzc29jaWF0ZWQgRm9ybUNvbnRyb2wgc3RpbGwgaGFzIHRoZSBwcmV2aW91cyB2YWx1ZS4pXG4gICAgdGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMuY2FzZVJlZmVyZW5jZUNvbnRyb2xOYW1lKS5zZXRWYWx1ZSgnJyk7XG4gICAgdGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMub3RoZXJSZWFzb25Db250cm9sTmFtZSkuc2V0VmFsdWUoJycpO1xuICB9XG5cbiAgcHVibGljIG9uU3VibWl0KCk6IHZvaWQge1xuICAgIHRoaXMuc3VibWl0dGVkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMucmFkaW9TZWxlY3RlZENvbnRyb2xOYW1lKS5pbnZhbGlkKSB7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHtcbiAgICAgICAgdGl0bGU6IHRoaXMuZ2VuZXJpY0Vycm9yLFxuICAgICAgICBkZXNjcmlwdGlvbjogQ2hhbGxlbmdlZEFjY2Vzc1JlcXVlc3RFcnJvcnMuTk9fU0VMRUNUSU9OXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMuY2FzZVJlZmVyZW5jZUNvbnRyb2xOYW1lKS5pbnZhbGlkKSB7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0ge1xuICAgICAgICAgIHRpdGxlOiB0aGlzLmdlbmVyaWNFcnJvcixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogQ2hhbGxlbmdlZEFjY2Vzc1JlcXVlc3RFcnJvcnMuTk9fQ0FTRV9SRUZFUkVOQ0UsXG4gICAgICAgICAgZmllbGRJZDogJ2Nhc2UtcmVmZXJlbmNlJ1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMub3RoZXJSZWFzb25Db250cm9sTmFtZSkuaW52YWxpZCkge1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHtcbiAgICAgICAgICB0aXRsZTogdGhpcy5nZW5lcmljRXJyb3IsXG4gICAgICAgICAgZGVzY3JpcHRpb246IENoYWxsZW5nZWRBY2Nlc3NSZXF1ZXN0RXJyb3JzLk5PX1JFQVNPTixcbiAgICAgICAgICBmaWVsZElkOiAnb3RoZXItcmVhc29uJ1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluaXRpYXRlIENoYWxsZW5nZWQgQWNjZXNzIFJlcXVlc3RcbiAgICBpZiAodGhpcy5mb3JtR3JvdXAudmFsaWQpIHtcbiAgICAgIC8vIEdldCB0aGUgQ2FzZSBSZWZlcmVuY2UgKGZvciB3aGljaCBhY2Nlc3MgaXMgYmVpbmcgcmVxdWVzdGVkKSBmcm9tIHRoZSBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IGRhdGFcbiAgICAgIGNvbnN0IGNhc2VJZCA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zLmNpZDtcbiAgICAgIGNvbnN0IHJhZGlvU2VsZWN0ZWRWYWx1ZSA9IHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLnJhZGlvU2VsZWN0ZWRDb250cm9sTmFtZSkudmFsdWU7XG4gICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHRoZSBzZWxlY3RlZCBBY2Nlc3NSZWFzb24gZW51bSB2YWx1ZS4gQ2FuJ3QgdXNlIE9iamVjdC52YWx1ZXMgYmVjYXVzZSBpdCdzIG5vdCBhdmFpbGFibGUgaW5cbiAgICAgIC8vIDwgRVMyMDE3IVxuICAgICAgY29uc3QgcmVhc29uTnVtYmVyID0gT2JqZWN0LmtleXMoQWNjZXNzUmVhc29uKS5tYXAoZSA9PiBBY2Nlc3NSZWFzb25bZV0pLmluZGV4T2YocmFkaW9TZWxlY3RlZFZhbHVlKTtcbiAgICAgIGNvbnN0IGNoYWxsZW5nZWRBY2Nlc3NSZXF1ZXN0ID0ge1xuICAgICAgICByZWFzb246IHJlYXNvbk51bWJlcixcbiAgICAgICAgY2FzZVJlZmVyZW5jZTogcmVhc29uTnVtYmVyID09PSAwID8gdGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMuY2FzZVJlZmVyZW5jZUNvbnRyb2xOYW1lKS52YWx1ZSA6IG51bGwsXG4gICAgICAgIG90aGVyUmVhc29uOiByZWFzb25OdW1iZXIgPT09IDMgPyB0aGlzLmZvcm1Hcm91cC5nZXQodGhpcy5vdGhlclJlYXNvbkNvbnRyb2xOYW1lKS52YWx1ZSA6IG51bGxcbiAgICAgIH0gYXMgQ2hhbGxlbmdlZEFjY2Vzc1JlcXVlc3Q7XG5cbiAgICAgIHRoaXMuJHJvbGVBc3NpZ25tZW50UmVzcG9uc2VTdWJzY3JpcHRpb24gPSB0aGlzLmNhc2VzU2VydmljZS5jcmVhdGVDaGFsbGVuZ2VkQWNjZXNzUmVxdWVzdChjYXNlSWQsIGNoYWxsZW5nZWRBY2Nlc3NSZXF1ZXN0KVxuICAgICAgICAucGlwZShzd2l0Y2hNYXAoKCkgPT4gdGhpcy5jYXNlTm90aWZpZXIuZmV0Y2hBbmRSZWZyZXNoKGNhc2VJZCkpKVxuICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIC8vIFdvdWxkIGhhdmUgYmVlbiBuaWNlIHRvIHBhc3MgdGhlIGNhc2VJZCB3aXRoaW4gc3RhdGUuZGF0YSwgYnV0IHRoaXMgaXNuJ3QgcGFydCBvZiBOYXZpZ2F0aW9uRXh0cmFzIHVudGlsXG4gICAgICAgICAgICAvLyBBbmd1bGFyIDcuMiFcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnc3VjY2VzcyddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAvLyBOYXZpZ2F0ZSB0byBlcnJvciBwYWdlXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKENhc2VDaGFsbGVuZ2VkQWNjZXNzUmVxdWVzdENvbXBvbmVudC5DQU5DRUxfTElOS19ERVNUSU5BVElPTik7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuJHJvbGVBc3NpZ25tZW50UmVzcG9uc2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuJHJvbGVBc3NpZ25tZW50UmVzcG9uc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlucHV0RW1wdHkoaW5wdXQ6IEFic3RyYWN0Q29udHJvbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbnB1dC52YWx1ZSA9PT0gbnVsbCB8fCBpbnB1dC52YWx1ZS50cmltKCkubGVuZ3RoID09PSAwO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzcGxheWVkQWNjZXNzUmVhc29uIHtcbiAgcmVhc29uOiBBY2Nlc3NSZWFzb247XG4gIGNoZWNrZWQ6IGJvb2xlYW47XG59XG4iLCI8ZXh1aS1lcnJvci1tZXNzYWdlICpuZ0lmPVwiZm9ybUdyb3VwLmludmFsaWQgJiYgc3VibWl0dGVkXCIgW2Vycm9yXT1cImVycm9yTWVzc2FnZVwiPjwvZXh1aS1lcnJvci1tZXNzYWdlPlxuPGN1dC1hbGVydCB0eXBlPVwiaW5mb3JtYXRpb25cIj5cbiAge3snVGhpcyBjYXNlIHJlcXVpcmVzIGNoYWxsZW5nZWQgYWNjZXNzLicgfCBycHhUcmFuc2xhdGV9fTxici8+XG4gIHt7J1RoaXMgaXMgYmVjYXVzZSB0aGUgY2FzZSBpcyBvdXRzaWRlIHlvdXIgd29yayBhcmVhLiBJZiB5b3UgcmVxdWVzdCBhY2Nlc3MgdG8gdGhlIGNhc2UsIGl0IHdpbGwgYmUgbG9nZ2VkIGZvciBhdWRpdGluZyBwdXJwb3Nlcy4nIHwgcnB4VHJhbnNsYXRlfX1cbjwvY3V0LWFsZXJ0PlxuPGZvcm0gW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIiAoc3VibWl0KT1cIm9uU3VibWl0KClcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIiBbbmdDbGFzc109XCJ7J2Zvcm0tZ3JvdXAtZXJyb3InOiBmb3JtR3JvdXAuaW52YWxpZCAmJiBzdWJtaXR0ZWR9XCI+XG4gICAgPGZpZWxkc2V0IGNsYXNzPVwiZ292dWstZmllbGRzZXRcIiBhcmlhLWRlc2NyaWJlZGJ5PVwicmVhc29uLWhpbnRcIj5cbiAgICAgIDxsZWdlbmQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldF9fbGVnZW5kIGdvdnVrLWZpZWxkc2V0X19sZWdlbmQtLWxcIj5cbiAgICAgICAgPGgxIGNsYXNzPVwiZ292dWstZmllbGRzZXRfX2hlYWRpbmdcIj5cbiAgICAgICAgICB7e3RpdGxlIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgPC9oMT5cbiAgICAgIDwvbGVnZW5kPlxuICAgICAgPGRpdiBpZD1cInJlYXNvbi1oaW50XCIgY2xhc3M9XCJnb3Z1ay1oaW50XCI+XG4gICAgICAgIHt7aGludCB8IHJweFRyYW5zbGF0ZX19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgaWQ9XCJlcnJvci1tZXNzYWdlXCIgY2xhc3M9XCJnb3Z1ay1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJmb3JtR3JvdXAuZ2V0KCdyYWRpb1NlbGVjdGVkJykuaW52YWxpZCAmJiBzdWJtaXR0ZWRcIj5cbiAgICAgICAge3tlcnJvck1lc3NhZ2UuZGVzY3JpcHRpb24gfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zIGdvdnVrLXJhZGlvcy0tY29uZGl0aW9uYWxcIiBkYXRhLW1vZHVsZT1cImdvdnVrLXJhZGlvc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zX19pdGVtXCI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstcmFkaW9zX19pbnB1dFwiIGlkPVwicmVhc29uLTBcIiBuYW1lPVwicmFkaW9TZWxlY3RlZFwiIHR5cGU9XCJyYWRpb1wiIFt2YWx1ZV09XCJhY2Nlc3NSZWFzb25zWzBdLnJlYXNvblwiXG4gICAgICAgICAgZGF0YS1hcmlhLWNvbnRyb2xzPVwiY29uZGl0aW9uYWwtcmVhc29uLTBcIiBmb3JtQ29udHJvbE5hbWU9XCJyYWRpb1NlbGVjdGVkXCIgW2NoZWNrZWRdPVwiYWNjZXNzUmVhc29uc1swXS5jaGVja2VkXCJcbiAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKClcIi8+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstcmFkaW9zX19sYWJlbFwiIGZvcj1cInJlYXNvbi0wXCI+XG4gICAgICAgICAgICB7e2FjY2Vzc1JlYXNvbnNbMF0ucmVhc29uIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cImNvbmRpdGlvbmFsLXJlYXNvbi0wXCIgKm5nSWY9XCJmb3JtR3JvdXAuZ2V0KCdyYWRpb1NlbGVjdGVkJykudmFsdWUgPT09IGFjY2Vzc1JlYXNvbnNbMF0ucmVhc29uXCJcbiAgICAgICAgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2NvbmRpdGlvbmFsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsXCIgZm9yPVwiY2FzZS1yZWZlcmVuY2VcIj5cbiAgICAgICAgICAgICAge3tjYXNlUmVmTGFiZWx9fVxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJjYXNlLXJlZmVyZW5jZS1lcnJvci1tZXNzYWdlXCIgY2xhc3M9XCJnb3Z1ay1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJmb3JtR3JvdXAuZ2V0KCdjYXNlUmVmZXJlbmNlJykuaW52YWxpZCAmJiBzdWJtaXR0ZWRcIj5cbiAgICAgICAgICAgICAge3tlcnJvck1lc3NhZ2UuZGVzY3JpcHRpb24gfCBycHhUcmFuc2xhdGV9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1pbnB1dCBnb3Z1ay0hLXdpZHRoLW9uZS10aGlyZFwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J2dvdnVrLWlucHV0LS1lcnJvcic6IGZvcm1Hcm91cC5nZXQoJ2Nhc2VSZWZlcmVuY2UnKS5pbnZhbGlkICYmIHN1Ym1pdHRlZH1cIiBpZD1cImNhc2UtcmVmZXJlbmNlXCJcbiAgICAgICAgICAgIG5hbWU9XCJjYXNlLXJlZmVyZW5jZVwiIHR5cGU9XCJ0ZXh0XCIgZm9ybUNvbnRyb2xOYW1lPVwiY2FzZVJlZmVyZW5jZVwiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19faXRlbVwiPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLXJhZGlvc19faW5wdXRcIiBpZD1cInJlYXNvbi0xXCIgbmFtZT1cInJhZGlvU2VsZWN0ZWRcIiB0eXBlPVwicmFkaW9cIiBbdmFsdWVdPVwiYWNjZXNzUmVhc29uc1sxXS5yZWFzb25cIlxuICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInJhZGlvU2VsZWN0ZWRcIiBbY2hlY2tlZF09XCJhY2Nlc3NSZWFzb25zWzFdLmNoZWNrZWRcIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKClcIi8+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstcmFkaW9zX19sYWJlbFwiIGZvcj1cInJlYXNvbi0xXCI+XG4gICAgICAgICAgICB7e2FjY2Vzc1JlYXNvbnNbMV0ucmVhc29uIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19faXRlbVwiPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLXJhZGlvc19faW5wdXRcIiBpZD1cInJlYXNvbi0yXCIgbmFtZT1cInJhZGlvU2VsZWN0ZWRcIiB0eXBlPVwicmFkaW9cIiBbdmFsdWVdPVwiYWNjZXNzUmVhc29uc1syXS5yZWFzb25cIlxuICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInJhZGlvU2VsZWN0ZWRcIiBbY2hlY2tlZF09XCJhY2Nlc3NSZWFzb25zWzJdLmNoZWNrZWRcIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKClcIi8+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstcmFkaW9zX19sYWJlbFwiIGZvcj1cInJlYXNvbi0yXCI+XG4gICAgICAgICAgICB7e2FjY2Vzc1JlYXNvbnNbMl0ucmVhc29uIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLXJhZGlvc19faXRlbVwiPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLXJhZGlvc19faW5wdXRcIiBpZD1cInJlYXNvbi0zXCIgbmFtZT1cInJhZGlvU2VsZWN0ZWRcIiB0eXBlPVwicmFkaW9cIiBbdmFsdWVdPVwiYWNjZXNzUmVhc29uc1szXS5yZWFzb25cIlxuICAgICAgICAgIGRhdGEtYXJpYS1jb250cm9scz1cImNvbmRpdGlvbmFsLXJlYXNvbi0zXCIgZm9ybUNvbnRyb2xOYW1lPVwicmFkaW9TZWxlY3RlZFwiIFtjaGVja2VkXT1cImFjY2Vzc1JlYXNvbnNbM10uY2hlY2tlZFwiXG4gICAgICAgICAgKGNoYW5nZSk9XCJvbkNoYW5nZSgpXCIvPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLXJhZGlvc19fbGFiZWxcIiBmb3I9XCJyZWFzb24tM1wiIGlkPVwicmVhc29uLTMtbGFiZWxcIj5cbiAgICAgICAgICAgIHt7YWNjZXNzUmVhc29uc1szXS5yZWFzb24gfCBycHhUcmFuc2xhdGV9fVxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwiY29uZGl0aW9uYWwtcmVhc29uLTNcIiAqbmdJZj1cImZvcm1Hcm91cC5nZXQoJ3JhZGlvU2VsZWN0ZWQnKS52YWx1ZSA9PT0gYWNjZXNzUmVhc29uc1szXS5yZWFzb25cIlxuICAgICAgICBjbGFzcz1cImdvdnVrLXJhZGlvc19fY29uZGl0aW9uYWxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGRpdiBpZD1cIm90aGVyLXJlYXNvbi1lcnJvci1tZXNzYWdlXCIgY2xhc3M9XCJnb3Z1ay1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJmb3JtR3JvdXAuZ2V0KCdvdGhlclJlYXNvbicpLmludmFsaWQgJiYgc3VibWl0dGVkXCI+XG4gICAgICAgICAgICAgIHt7ZXJyb3JNZXNzYWdlLmRlc2NyaXB0aW9uIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZ292dWstdGV4dGFyZWFcIiBbbmdDbGFzc109XCJ7J2dvdnVrLXRleHRhcmVhLS1lcnJvcic6IGZvcm1Hcm91cC5nZXQoJ290aGVyUmVhc29uJykuaW52YWxpZCAmJiBzdWJtaXR0ZWR9XCJcbiAgICAgICAgICAgIGlkPVwib3RoZXItcmVhc29uXCIgbmFtZT1cIm90aGVyLXJlYXNvblwiIHJvd3M9XCI1XCIgYXJpYS1kZXNjcmliZWRieT1cInJlYXNvbi0zLWxhYmVsXCIgZm9ybUNvbnRyb2xOYW1lPVwib3RoZXJSZWFzb25cIj48L3RleHRhcmVhPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZmllbGRzZXQ+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImdvdnVrLWJ1dHRvbiBnb3Z1ay0hLW1hcmdpbi1yaWdodC0zXCIgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAge3snU3VibWl0JyB8IHJweFRyYW5zbGF0ZX19XG4gICAgPC9idXR0b24+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLWZ1bGwgZ292dWstIS1wYWRkaW5nLWxlZnQtMFwiPlxuICAgICAgPHA+XG4gICAgICAgIDxhIGNsYXNzPSdnb3Z1ay1ib2R5JyAoY2xpY2spPVwib25DYW5jZWwoKVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj5cbiAgICAgICAgICB7eydDYW5jZWwnIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgPC9hPlxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZm9ybT5cbiJdfQ==