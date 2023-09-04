import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { throwError } from 'rxjs';
import { CasesService } from '../../../../case-editor/services/cases.service';
import { LinkedCasesErrorMessages, LinkedCasesPages, Patterns } from '../../enums';
import { LinkedCasesService } from '../../services/linked-cases.service';
import { ValidatorsUtils } from '../../utils/validators.utils';
import * as i0 from "@angular/core";
import * as i1 from "../../../../case-editor/services/cases.service";
import * as i2 from "@angular/forms";
import * as i3 from "../../utils/validators.utils";
import * as i4 from "../../services/linked-cases.service";
function LinkCasesComponent_div_8_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30)(1, "span", 31);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.caseNumberError, " ");
} }
function LinkCasesComponent_div_8_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30)(1, "span", 31);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r5.caseReasonError, " ");
} }
function LinkCasesComponent_div_8_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 32)(1, "input", 33);
    i0.ɵɵlistener("change", function LinkCasesComponent_div_8_div_13_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r11.toggleLinkCaseReasonOtherComments($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 34);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const reason_r9 = ctx.$implicit;
    const pos_r10 = ctx.index;
    i0.ɵɵproperty("formGroupName", pos_r10);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("id", reason_r9.key);
    i0.ɵɵproperty("value", reason_r9.value_en);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("for", reason_r9.key);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(reason_r9.value_en);
} }
function LinkCasesComponent_div_8_div_14_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30)(1, "span", 31);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r13.caseReasonCommentsError, " ");
} }
const _c0 = function (a0) { return { "govuk-form-group--error": a0 }; };
function LinkCasesComponent_div_8_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35)(1, "h3", 22);
    i0.ɵɵtext(2, "Comments");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, LinkCasesComponent_div_8_div_14_span_3_Template, 4, 1, "span", 6);
    i0.ɵɵelementStart(4, "textarea", 36);
    i0.ɵɵtext(5, "          ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 37);
    i0.ɵɵtext(7, " You can enter up to 100 characters ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c0, !!ctx_r7.caseReasonCommentsError));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r7.caseReasonCommentsError);
} }
function LinkCasesComponent_div_8_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30)(1, "span", 31);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r8.caseSelectionError, " ");
} }
function LinkCasesComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 5)(2, "h3", 22);
    i0.ɵɵtext(3, "Enter case reference");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, LinkCasesComponent_div_8_span_4_Template, 4, 1, "span", 6);
    i0.ɵɵelement(5, "input", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 24)(7, "h3", 22);
    i0.ɵɵtext(8, "Why should these cases be linked?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 25);
    i0.ɵɵtext(10, " Select all that apply. ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, LinkCasesComponent_div_8_span_11_Template, 4, 1, "span", 6);
    i0.ɵɵelementStart(12, "div", 26);
    i0.ɵɵtemplate(13, LinkCasesComponent_div_8_div_13_Template, 4, 5, "div", 27);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(14, LinkCasesComponent_div_8_div_14_Template, 8, 4, "div", 28);
    i0.ɵɵelement(15, "br")(16, "br");
    i0.ɵɵtemplate(17, LinkCasesComponent_div_8_span_17_Template, 4, 1, "span", 6);
    i0.ɵɵelementStart(18, "button", 29);
    i0.ɵɵlistener("click", function LinkCasesComponent_div_8_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r14.submitCaseInfo()); });
    i0.ɵɵtext(19, "Propose case link");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.linkCaseForm);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c0, !!ctx_r0.caseNumberError));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.caseNumberError);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c0, !!ctx_r0.caseReasonError));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r0.caseReasonError);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.linkCaseReasons);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.showComments);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.caseSelectionError);
} }
function LinkCasesComponent_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30)(1, "span", 31);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.noSelectedCaseError, " ");
} }
function LinkCasesComponent_tr_31_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdLinkCasesReasonValue");
    i0.ɵɵelement(3, "br");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const reason_r19 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, reason_r19));
} }
const _c1 = function (a0) { return { "table-group-error": a0 }; };
function LinkCasesComponent_tr_31_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 10)(1, "td", 38);
    i0.ɵɵelement(2, "div", 39);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelement(5, "br");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "ccdCaseReference");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td", 40);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 38);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 40);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 38);
    i0.ɵɵtemplate(15, LinkCasesComponent_tr_31_span_15_Template, 4, 3, "span", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 38)(17, "a", 42);
    i0.ɵɵlistener("click", function LinkCasesComponent_tr_31_Template_a_click_17_listener() { const restoredCtx = i0.ɵɵrestoreView(_r21); const pos_r17 = restoredCtx.index; const case_r16 = restoredCtx.$implicit; const ctx_r20 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r20.onSelectedLinkedCaseRemove(pos_r17, case_r16.caseReference)); });
    i0.ɵɵtext(18, "Remove");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const case_r16 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(12, _c1, ctx_r2.caseSelectionError && case_r16.caseReference === ctx_r2.linkCaseForm.value.caseNumber));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", case_r16.caseName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(7, 10, case_r16.caseReference), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", case_r16.caseTypeDescription);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(case_r16.caseType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(case_r16.caseService);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("title", case_r16.caseStateDescription);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(case_r16.caseState);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", case_r16.reasons);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("id", case_r16.caseReference);
} }
function LinkCasesComponent_tr_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 10)(1, "td", 43);
    i0.ɵɵtext(2, " None ");
    i0.ɵɵelementEnd()();
} }
export class LinkCasesComponent {
    constructor(casesService, fb, validatorsUtils, linkedCasesService) {
        this.casesService = casesService;
        this.fb = fb;
        this.validatorsUtils = validatorsUtils;
        this.linkedCasesService = linkedCasesService;
        this.linkedCasesStateEmitter = new EventEmitter();
        this.errorMessages = [];
        this.selectedCases = [];
        this.showComments = false;
        this.ISO_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';
    }
    ngOnInit() {
        this.caseId = this.linkedCasesService.caseId;
        this.caseName = this.linkedCasesService.caseName;
        this.linkCaseReasons = this.linkedCasesService.linkCaseReasons;
        this.initForm();
        if (this.linkedCasesService.editMode) {
            // this may have includes the currently added one but yet to be submitted.
            this.selectedCases = this.linkedCasesService.linkedCases;
        }
        else if (this.linkedCasesService.initialCaseLinks.length !== this.linkedCasesService.caseFieldValue.length) {
            this.linkedCasesService.linkedCases = this.linkedCasesService.initialCaseLinks;
        }
    }
    initForm() {
        this.linkCaseForm = this.fb.group({
            caseNumber: ['', [Validators.minLength(16), this.validatorsUtils.regexPattern(Patterns.CASE_REF)]],
            reasonType: this.getReasonTypeFormArray,
            otherDescription: ['', [Validators.maxLength(100)]]
        });
    }
    get getReasonTypeFormArray() {
        return this.fb.array(this.linkCaseReasons.map((val) => this.fb.group({
            key: [val.key],
            value_en: [val.value_en],
            value_cy: [val.value_cy],
            hint_text_en: [val.hint_text_en],
            hint_text_cy: [val.hint_text_cy],
            lov_order: [val.lov_order],
            parent_key: [val.parent_key],
            selected: [!!val.selected],
        })), this.validatorsUtils.formArraySelectedValidator());
    }
    toggleLinkCaseReasonOtherComments(event) {
        this.linkCaseReasons.find(reason => reason.value_en === event.target.value).selected = event.target.checked;
        this.showComments = this.linkCaseReasons.find(reason => reason.value_en === 'Other').selected;
    }
    submitCaseInfo() {
        this.errorMessages = [];
        this.caseReasonError = null;
        this.caseReasonCommentsError = null;
        this.caseNumberError = null;
        this.caseSelectionError = null;
        this.noSelectedCaseError = null;
        if (this.linkCaseForm.valid &&
            !this.isCaseSelected(this.selectedCases) &&
            !this.isCaseSelected(this.linkedCasesService.linkedCases) &&
            !this.isCaseSelectedSameAsCurrentCase() &&
            !this.isOtherOptionSelectedButOtherDescriptionNotEntered()) {
            this.getCaseInfo();
        }
        else {
            this.showErrorInfo();
        }
    }
    isCaseSelected(linkedCases) {
        if (linkedCases.length === 0) {
            return false;
        }
        const caseNumber = this.linkCaseForm.value.caseNumber;
        return !!linkedCases.find((caseLink) => caseLink.caseReference.split('-').join('') === caseNumber.split('-').join(''));
    }
    isCaseSelectedSameAsCurrentCase() {
        return this.linkCaseForm.value.caseNumber.split('-').join('') === this.linkedCasesService.caseId.split('-').join('');
    }
    isOtherOptionSelectedButOtherDescriptionNotEntered() {
        return this.showComments && this.linkCaseForm.value.otherDescription.trim().length === 0;
    }
    showErrorInfo() {
        if (this.linkCaseForm.controls.caseNumber.invalid) {
            this.caseNumberError = LinkedCasesErrorMessages.CaseNumberError;
            this.errorMessages.push({
                title: 'dummy-case-number',
                description: LinkedCasesErrorMessages.CaseNumberError,
                fieldId: 'caseNumber',
            });
        }
        if (this.linkCaseForm.controls.reasonType.invalid) {
            this.caseReasonError = LinkedCasesErrorMessages.ReasonSelectionError;
            this.errorMessages.push({
                title: 'dummy-case-reason',
                description: LinkedCasesErrorMessages.ReasonSelectionError,
                fieldId: 'caseReason',
            });
        }
        if (this.linkCaseForm.controls.reasonType.valid
            && this.linkCaseReasons.find(reason => reason.value_en === 'Other').selected) {
            if (this.linkCaseForm.controls.otherDescription.value.trim().length === 0) {
                this.caseReasonCommentsError = LinkedCasesErrorMessages.otherDescriptionError;
                this.errorMessages.push({
                    title: 'dummy-case-reason-comments',
                    description: LinkedCasesErrorMessages.otherDescriptionError,
                    fieldId: 'otherDescription',
                });
            }
            if (this.linkCaseForm.controls.otherDescription.value.trim().length > 100) {
                this.caseReasonCommentsError = LinkedCasesErrorMessages.otherDescriptionMaxLengthError;
                this.errorMessages.push({
                    title: 'dummy-case-reason-comments',
                    description: LinkedCasesErrorMessages.otherDescriptionMaxLengthError,
                    fieldId: 'otherDescription',
                });
            }
        }
        if (this.isCaseSelected(this.selectedCases)) {
            this.caseSelectionError = LinkedCasesErrorMessages.CaseProposedError;
            this.errorMessages.push({
                title: 'dummy-case-number',
                description: LinkedCasesErrorMessages.CaseProposedError,
                fieldId: 'caseNumber',
            });
        }
        if (this.isCaseSelected(this.linkedCasesService.linkedCases)) {
            this.caseSelectionError = LinkedCasesErrorMessages.CasesLinkedError;
            this.errorMessages.push({
                title: 'dummy-case-number',
                description: LinkedCasesErrorMessages.CasesLinkedError,
                fieldId: 'caseNumber',
            });
        }
        if (this.linkCaseForm.value.caseNumber.split('-').join('') === this.linkedCasesService.caseId.split('-').join('')) {
            this.errorMessages.push({
                title: 'dummy-case-number',
                description: LinkedCasesErrorMessages.ProposedCaseWithIn,
                fieldId: 'caseNumber',
            });
        }
        window.scrollTo(0, 0);
        this.emitLinkedCasesState(false);
    }
    getCaseInfo() {
        const caseNumberData = this.linkCaseForm.value.caseNumber.replace(/[- ]/g, '');
        this.casesService
            .getCaseViewV2(caseNumberData)
            .subscribe((caseView) => {
            this.linkedCasesService.caseDetails = caseView;
            const caseLink = {
                caseReference: caseView.case_id,
                reasons: this.getSelectedCaseReasons(),
                createdDateTime: moment(new Date()).format(this.ISO_FORMAT),
                caseType: caseView.case_type.name || '',
                caseTypeDescription: caseView.case_type.description || '',
                caseState: caseView.state.name || '',
                caseStateDescription: caseView.state.description || '',
                caseService: caseView.case_type && caseView.case_type.jurisdiction && caseView.case_type.jurisdiction.description || '',
                caseName: this.linkedCasesService.getCaseName(caseView),
            };
            const ccdApiCaseLinkData = {
                CaseReference: caseView.case_id,
                CaseType: caseView.case_type.id,
                CreatedDateTime: moment(new Date()).format(this.ISO_FORMAT),
                ReasonForLink: this.getSelectedCCDTypeCaseReason()
            };
            if (!this.linkedCasesService.caseFieldValue) {
                this.linkedCasesService.caseFieldValue = [];
            }
            this.linkedCasesService.caseFieldValue.push({ id: caseView.case_id.toString(), value: ccdApiCaseLinkData });
            this.selectedCases.push(caseLink);
            this.linkCaseReasons.forEach(reason => reason.selected = false);
            this.initForm();
            this.emitLinkedCasesState(false);
        }, (error) => {
            this.caseNumberError = LinkedCasesErrorMessages.CaseCheckAgainError;
            this.errorMessages.push({
                title: 'dummy-case-number',
                description: LinkedCasesErrorMessages.CaseCheckAgainError,
                fieldId: 'caseNumber',
            });
            this.emitLinkedCasesState(false);
            window.scrollTo(0, 0);
            return throwError(error);
        });
    }
    // Return linked cases state and error messages to the parent
    emitLinkedCasesState(isNavigateToNextPage) {
        this.linkedCasesStateEmitter.emit({
            currentLinkedCasesPage: LinkedCasesPages.LINK_CASE,
            errorMessages: this.errorMessages,
            navigateToNextPage: isNavigateToNextPage,
        });
    }
    getSelectedCaseReasons() {
        const selectedReasons = [];
        this.linkCaseForm.controls.reasonType.value.forEach((selectedReason) => {
            if (selectedReason.selected) {
                selectedReasons.push({
                    Reason: selectedReason.key,
                    OtherDescription: selectedReason.value_en === 'Other'
                        ? this.linkCaseForm.controls.otherDescription.value
                        : ''
                });
            }
        });
        return selectedReasons;
    }
    getSelectedCCDTypeCaseReason() {
        const selectedReasons = [];
        this.linkCaseForm.controls.reasonType.value.forEach((selectedReason) => {
            if (selectedReason.selected) {
                selectedReasons.push({
                    value: {
                        Reason: selectedReason.key,
                        OtherDescription: selectedReason.value_en === 'Other'
                            ? this.linkCaseForm.controls.otherDescription.value
                            : ''
                    }
                });
            }
        });
        return selectedReasons;
    }
    onSelectedLinkedCaseRemove(pos, selectedCaseReference) {
        const caseFieldValue = this.linkedCasesService.caseFieldValue || [];
        const updatedItems = caseFieldValue.filter(item => item.value && item.value.CaseReference !== selectedCaseReference);
        if (updatedItems) {
            this.linkedCasesService.caseFieldValue = updatedItems;
        }
        this.selectedCases.splice(pos, 1);
    }
    onNext() {
        this.errorMessages = [];
        this.caseReasonError = null;
        this.caseNumberError = null;
        this.caseSelectionError = null;
        this.noSelectedCaseError = null;
        let navigateToNextPage = true;
        if (this.selectedCases.length) {
            this.linkedCasesService.linkedCases = this.selectedCases;
        }
        else {
            this.noSelectedCaseError = LinkedCasesErrorMessages.CaseSelectionError;
            this.errorMessages.push({
                title: 'dummy-case-selection',
                description: LinkedCasesErrorMessages.CaseSelectionError,
                fieldId: 'caseReason',
            });
            navigateToNextPage = false;
        }
        this.emitLinkedCasesState(navigateToNextPage);
    }
}
LinkCasesComponent.ɵfac = function LinkCasesComponent_Factory(t) { return new (t || LinkCasesComponent)(i0.ɵɵdirectiveInject(i1.CasesService), i0.ɵɵdirectiveInject(i2.FormBuilder), i0.ɵɵdirectiveInject(i3.ValidatorsUtils), i0.ɵɵdirectiveInject(i4.LinkedCasesService)); };
LinkCasesComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LinkCasesComponent, selectors: [["ccd-link-cases"]], outputs: { linkedCasesStateEmitter: "linkedCasesStateEmitter" }, decls: 36, vars: 11, consts: [[1, "govuk-grid-row"], [1, "govuk-grid-column-full"], [1, "govuk-caption-l"], [1, "govuk-heading-xl"], ["class", "form-group", 3, "formGroup", 4, "ngIf"], ["id", "caseNumber", 1, "govuk-form-group", 3, "ngClass"], ["class", "govuk-error-message", 4, "ngIf"], [1, "govuk-table"], [1, "govuk-table__caption", "govuk-table__caption--m"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["scope", "col", "width", "300", 1, "govuk-table__header"], ["scope", "col", "width", "150", 1, "govuk-table__header"], ["scope", "col", "width", "200", 1, "govuk-table__header"], ["scope", "col", "width", "400", 1, "govuk-table__header"], ["scope", "col", "width", "50", 1, "govuk-table__header"], [1, "govuk-table__body"], ["class", "govuk-table__row", 4, "ngFor", "ngForOf"], ["class", "govuk-table__row", 4, "ngIf"], [1, "govuk-button-group"], ["type", "button", "id", "next-button", 1, "button", "button-primary", 3, "click"], [1, "form-group", 3, "formGroup"], [1, "govuk-heading-s"], ["formControlName", "caseNumber", "id", "width-20", "name", "width-20", "type", "text", 1, "govuk-input", "govuk-input--width-20"], [1, "govuk-!-margin-top-3", 3, "ngClass"], ["id", "waste-hint", 1, "govuk-hint"], ["data-module", "govuk-checkboxes", "formArrayName", "reasonType", "id", "caseReason", 1, "govuk-checkboxes"], ["class", "govuk-checkboxes__item", 3, "formGroupName", 4, "ngFor", "ngForOf"], ["id", "other-description-char-limit-error", "class", "govuk-!-margin-top-3", 3, "ngClass", 4, "ngIf"], ["id", "propose", "type", "button", "data-module", "govuk-button", 1, "govuk-button", "govuk-button--secondary", 3, "click"], [1, "govuk-error-message"], [1, "govuk-visually-hidden"], [1, "govuk-checkboxes__item", 3, "formGroupName"], ["formControlName", "selected", "name", "pos", "type", "checkbox", 1, "govuk-checkboxes__input", 3, "id", "value", "change"], [1, "govuk-label", "govuk-checkboxes__label", 3, "for"], ["id", "other-description-char-limit-error", 1, "govuk-!-margin-top-3", 3, "ngClass"], ["id", "otherDescription", "name", "otherDescription", "formControlName", "otherDescription", "rows", "5", "aria-describedby", "other-description-hint other-description-char-limit-info other-description-char-limit-error", 1, "govuk-textarea", "govuk-input--width-30"], ["id", "other-description-char-limit-info", "aria-live", "polite", 1, "govuk-hint", "govuk-character-count__message"], [1, "govuk-table__cell"], [1, "govuk-form-group--error", 3, "ngClass"], [1, "govuk-table__cell", 3, "title"], [4, "ngFor", "ngForOf"], [1, "govuk-link", "no-visited-state", 3, "click"], ["colspan", "6", 1, "govuk-table__cell"]], template: function LinkCasesComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "span", 2);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "ccdCaseReference");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "h1", 3);
        i0.ɵɵtext(7, "Select a\u00A0case you want to link to this case");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(8, LinkCasesComponent_div_8_Template, 20, 12, "div", 4);
        i0.ɵɵelement(9, "hr")(10, "br")(11, "br");
        i0.ɵɵelementStart(12, "div", 5);
        i0.ɵɵtemplate(13, LinkCasesComponent_span_13_Template, 4, 1, "span", 6);
        i0.ɵɵelementStart(14, "table", 7)(15, "caption", 8);
        i0.ɵɵtext(16, "Proposed case links ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "thead", 9)(18, "tr", 10)(19, "th", 11);
        i0.ɵɵtext(20, "Case name and number");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(21, "th", 12);
        i0.ɵɵtext(22, "Case type ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "th", 13);
        i0.ɵɵtext(24, "Service");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "th", 13);
        i0.ɵɵtext(26, "State");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "th", 14);
        i0.ɵɵtext(28, "Reasons for case link");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(29, "th", 15);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(30, "tbody", 16);
        i0.ɵɵtemplate(31, LinkCasesComponent_tr_31_Template, 19, 14, "tr", 17);
        i0.ɵɵtemplate(32, LinkCasesComponent_tr_32_Template, 3, 0, "tr", 18);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(33, "div", 19)(34, "button", 20);
        i0.ɵɵlistener("click", function LinkCasesComponent_Template_button_click_34_listener() { return ctx.onNext(); });
        i0.ɵɵtext(35, "Next");
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate2("Link cases to ", ctx.caseName, " ", i0.ɵɵpipeBind1(5, 7, ctx.caseId), "");
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.linkCaseForm);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c0, !!ctx.noSelectedCaseError));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.noSelectedCaseError);
        i0.ɵɵadvance(18);
        i0.ɵɵproperty("ngForOf", ctx.selectedCases);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.selectedCases.length);
    } }, styles: [".no-visited-state[_ngcontent-%COMP%]{color:#1d70b8;cursor:pointer}.no-visited-state[_ngcontent-%COMP%]:hover{color:#003078}.govuk-checkboxes[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex-wrap:wrap;max-height:500px;width:100%;overflow-x:auto;overflow-y:hidden;padding-top:5px}.govuk-checkboxes[_ngcontent-%COMP%]   .govuk-checkboxes__item[_ngcontent-%COMP%]{display:flex}  .govuk-width-container .screen-990 .width-50{width:100%}.govuk-table__row[_ngcontent-%COMP%]{position:relative}.govuk-table__row[_ngcontent-%COMP%]   .table-group-error[_ngcontent-%COMP%]{position:absolute;height:calc(100% - 20px);margin-left:-15px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LinkCasesComponent, [{
        type: Component,
        args: [{ selector: 'ccd-link-cases', template: "<div class=\"govuk-grid-row\">\n  <div class=\"govuk-grid-column-full\">\n    <div>\n      <span class=\"govuk-caption-l\">Link cases to {{caseName}} {{caseId | ccdCaseReference}}</span>\n      <h1 class=\"govuk-heading-xl\">Select a&nbsp;case you want to link to this case</h1>\n      <div class=\"form-group\" [formGroup]=\"linkCaseForm\" *ngIf=\"linkCaseForm\">\n        <div class=\"govuk-form-group\" id=\"caseNumber\" [ngClass]=\"{'govuk-form-group--error': !!caseNumberError}\">\n          <h3 class=\"govuk-heading-s\">Enter case reference</h3>\n          <span class=\"govuk-error-message\" *ngIf=\"caseNumberError\">\n            <span class=\"govuk-visually-hidden\">Error:</span> {{caseNumberError}}\n          </span>\n          <input class=\"govuk-input govuk-input--width-20\" formControlName=\"caseNumber\" id=\"width-20\" name=\"width-20\"\n            type=\"text\">\n        </div>\n        <div [ngClass]=\"{'govuk-form-group--error': !!caseReasonError}\" class=\"govuk-!-margin-top-3\">\n          <h3 class=\"govuk-heading-s\">Why should these cases be linked?</h3>\n          <div id=\"waste-hint\" class=\"govuk-hint\">\n            Select all that apply.\n          </div>\n          <span class=\"govuk-error-message\" *ngIf=\"caseReasonError\">\n            <span class=\"govuk-visually-hidden\">Error:</span> {{caseReasonError}}\n          </span>\n          <div class=\"govuk-checkboxes\" data-module=\"govuk-checkboxes\" formArrayName=\"reasonType\" id=\"caseReason\">\n            <div class=\"govuk-checkboxes__item\" *ngFor=\"let reason of linkCaseReasons;index as pos\" [formGroupName]=\"pos\">\n              <input class=\"govuk-checkboxes__input\" id=\"{{reason.key}}\" formControlName=\"selected\" name=\"pos\"\n                type=\"checkbox\" [value]=\"reason.value_en\" (change)=\"toggleLinkCaseReasonOtherComments($event)\">\n              <label class=\"govuk-label govuk-checkboxes__label\" for=\"{{reason.key}}\">{{reason.value_en}}</label>\n            </div>\n          </div>\n        </div>\n        <div id=\"other-description-char-limit-error\" [ngClass]=\"{'govuk-form-group--error': !!caseReasonCommentsError}\" class=\"govuk-!-margin-top-3\" *ngIf=\"showComments\">\n          <h3 class=\"govuk-heading-s\">Comments</h3>\n          <span class=\"govuk-error-message\" *ngIf=\"caseReasonCommentsError\">\n            <span class=\"govuk-visually-hidden\">Error:</span> {{caseReasonCommentsError}}\n          </span>\n          <textarea class=\"govuk-textarea govuk-input--width-30\" id=\"otherDescription\"\n            name=\"otherDescription\" formControlName=\"otherDescription\" rows=\"5\"\n            aria-describedby=\"other-description-hint other-description-char-limit-info other-description-char-limit-error\">\n          </textarea>\n          <div id=\"other-description-char-limit-info\" aria-live=\"polite\" class=\"govuk-hint govuk-character-count__message\">\n            You can enter up to 100 characters\n          </div>\n        </div>\n        <br><br>\n        <span class=\"govuk-error-message\" *ngIf=\"caseSelectionError\">\n          <span class=\"govuk-visually-hidden\">Error:</span> {{caseSelectionError}}\n        </span>\n        <button id=\"propose\" type=\"button\" class=\"govuk-button govuk-button--secondary\" data-module=\"govuk-button\"\n          (click)=\"submitCaseInfo()\">Propose case link</button>\n      </div>\n      <hr>\n      <br><br>\n      <div class=\"govuk-form-group\" id=\"caseNumber\" [ngClass]=\"{'govuk-form-group--error': !!noSelectedCaseError}\">\n        <span class=\"govuk-error-message\" *ngIf=\"noSelectedCaseError\">\n          <span class=\"govuk-visually-hidden\">Error:</span> {{noSelectedCaseError}}\n        </span>\n        <table class=\"govuk-table\">\n          <caption class=\"govuk-table__caption govuk-table__caption--m\">Proposed case links </caption>\n          <thead class=\"govuk-table__head\">\n            <tr class=\"govuk-table__row\">\n              <th scope=\"col\" class=\"govuk-table__header\" width=\"300\">Case name and number</th>\n              <th scope=\"col\" class=\"govuk-table__header\" width=\"150\">Case type </th>\n              <th scope=\"col\" class=\"govuk-table__header\" width=\"200\">Service</th>\n              <th scope=\"col\" class=\"govuk-table__header\" width=\"200\">State</th>\n              <th scope=\"col\" class=\"govuk-table__header\" width=\"400\">Reasons for case link</th>\n              <th scope=\"col\" class=\"govuk-table__header\" width=\"50\"></th>\n            </tr>\n          </thead>\n          <tbody class=\"govuk-table__body\">\n            <tr class=\"govuk-table__row\" *ngFor=\"let case of selectedCases; let pos = index\">\n              <td class=\"govuk-table__cell\">\n                <div class=\"govuk-form-group--error\"\n                  [ngClass]=\"{'table-group-error':caseSelectionError && case.caseReference === linkCaseForm.value.caseNumber}\">\n                </div>\n                <span>{{case.caseName}} <br> {{case.caseReference | ccdCaseReference}}</span>\n              </td>\n              <td class=\"govuk-table__cell\" [title]=\"case.caseTypeDescription\">{{case.caseType}}</td>\n              <td class=\"govuk-table__cell\">{{case.caseService}}</td>\n              <td class=\"govuk-table__cell\" [title]=\"case.caseStateDescription\">{{case.caseState}}</td>\n              <td class=\"govuk-table__cell\"><span\n                  *ngFor=\"let reason of case.reasons\">{{reason | ccdLinkCasesReasonValue}}<br></span></td>\n              <td class=\"govuk-table__cell\"><a [attr.id]=\"case.caseReference\" (click)=\"onSelectedLinkedCaseRemove(pos, case.caseReference);\"\n                  class=\"govuk-link no-visited-state\">Remove</a></td>\n            </tr>\n            <tr class=\"govuk-table__row\" *ngIf=\"!selectedCases.length\">\n              <td class=\"govuk-table__cell\" colspan=\"6\">\n                None\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <div class=\"govuk-button-group\">\n        <button class=\"button button-primary\" type=\"button\" id=\"next-button\" (click)=\"onNext()\">Next</button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".no-visited-state{color:#1d70b8;cursor:pointer}.no-visited-state:hover{color:#003078}.govuk-checkboxes{display:flex;flex-direction:column;flex-wrap:wrap;max-height:500px;width:100%;overflow-x:auto;overflow-y:hidden;padding-top:5px}.govuk-checkboxes .govuk-checkboxes__item{display:flex}::ng-deep .govuk-width-container .screen-990 .width-50{width:100%}.govuk-table__row{position:relative}.govuk-table__row .table-group-error{position:absolute;height:calc(100% - 20px);margin-left:-15px}\n"] }]
    }], function () { return [{ type: i1.CasesService }, { type: i2.FormBuilder }, { type: i3.ValidatorsUtils }, { type: i4.LinkedCasesService }]; }, { linkedCasesStateEmitter: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1jYXNlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9saW5rZWQtY2FzZXMvY29tcG9uZW50cy9saW5rLWNhc2VzL2xpbmstY2FzZXMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbGlua2VkLWNhc2VzL2NvbXBvbmVudHMvbGluay1jYXNlcy9saW5rLWNhc2VzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQWEsV0FBVyxFQUFvQixVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR2xDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQVE5RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7OztJQ1JyRCxnQ0FBMEQsZUFBQTtJQUNwQixzQkFBTTtJQUFBLGlCQUFPO0lBQUMsWUFDcEQ7SUFBQSxpQkFBTzs7O0lBRDZDLGVBQ3BEO0lBRG9ELHVEQUNwRDs7O0lBU0EsZ0NB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bEUsK0JBQXdEO1FBQUEsc0NBQXFCO1FBQUEsaUJBQUs7UUFDbEYsMEJBQTREO1FBQzlELGlCQUFLLEVBQUE7UUFFUCxrQ0FBaUM7UUFDL0Isc0VBY0s7UUFDTCxvRUFJSztRQUNQLGlCQUFRLEVBQUEsRUFBQTtRQUdaLGdDQUFnQyxrQkFBQTtRQUN1QyxnR0FBUyxZQUFRLElBQUM7UUFBQyxxQkFBSTtRQUFBLGlCQUFTLEVBQUEsRUFBQSxFQUFBLEVBQUE7O1FBMUZ6RSxlQUF3RDtRQUF4RCxnR0FBd0Q7UUFFbEMsZUFBa0I7UUFBbEIsdUNBQWtCO1FBK0N4QixlQUE4RDtRQUE5RCwrRUFBOEQ7UUFDdkUsZUFBeUI7UUFBekIsOENBQXlCO1FBZ0JWLGdCQUFrQjtRQUFsQiwyQ0FBa0I7UUFlbEMsZUFBMkI7UUFBM0IsZ0RBQTJCOzt1RkQ3RHhELGtCQUFrQjtjQUw5QixTQUFTOzJCQUNFLGdCQUFnQjt3SkFNbkIsdUJBQXVCO2tCQUQ3QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBVbnR5cGVkRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYXNlVmlldywgRXJyb3JNZXNzYWdlLCBIdHRwRXJyb3IgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgTG92UmVmRGF0YU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2VydmljZXMvY29tbW9uLWRhdGEtc2VydmljZS9jb21tb24tZGF0YS1zZXJ2aWNlJztcbmltcG9ydCB7IENhc2VzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2Nhc2UtZWRpdG9yL3NlcnZpY2VzL2Nhc2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGlua2VkQ2FzZXNTdGF0ZSB9IGZyb20gJy4uLy4uL2RvbWFpbic7XG5pbXBvcnQge1xuICBDYXNlTGluayxcbiAgQ0NEQ2FzZUxpbmtUeXBlLFxuICBMaW5rQ2FzZVJlYXNvbixcbiAgTGlua1JlYXNvblxufSBmcm9tICcuLi8uLi9kb21haW4vbGlua2VkLWNhc2VzLm1vZGVsJztcbmltcG9ydCB7IExpbmtlZENhc2VzRXJyb3JNZXNzYWdlcywgTGlua2VkQ2FzZXNQYWdlcywgUGF0dGVybnMgfSBmcm9tICcuLi8uLi9lbnVtcyc7XG5pbXBvcnQgeyBMaW5rZWRDYXNlc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9saW5rZWQtY2FzZXMuc2VydmljZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzVXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy92YWxpZGF0b3JzLnV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWxpbmstY2FzZXMnLFxuICBzdHlsZVVybHM6IFsnLi9saW5rLWNhc2VzLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnLi9saW5rLWNhc2VzLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgTGlua0Nhc2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBsaW5rZWRDYXNlc1N0YXRlRW1pdHRlcjogRXZlbnRFbWl0dGVyPExpbmtlZENhc2VzU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxMaW5rZWRDYXNlc1N0YXRlPigpO1xuXG4gIHB1YmxpYyBlcnJvck1lc3NhZ2VzOiBFcnJvck1lc3NhZ2VbXSA9IFtdO1xuICBwdWJsaWMgbGlua0Nhc2VGb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBwdWJsaWMgc2VsZWN0ZWRDYXNlczogQ2FzZUxpbmtbXSA9IFtdO1xuICBwdWJsaWMgY2FzZU51bWJlckVycm9yOiBzdHJpbmc7XG4gIHB1YmxpYyBjYXNlUmVhc29uRXJyb3I6IHN0cmluZztcbiAgcHVibGljIGNhc2VSZWFzb25Db21tZW50c0Vycm9yOiBzdHJpbmc7XG4gIHB1YmxpYyBjYXNlU2VsZWN0aW9uRXJyb3I6IHN0cmluZztcbiAgcHVibGljIG5vU2VsZWN0ZWRDYXNlRXJyb3I6IHN0cmluZztcbiAgcHVibGljIGNhc2VJZDogc3RyaW5nO1xuICBwdWJsaWMgY2FzZU5hbWU6IHN0cmluZztcbiAgcHVibGljIGxpbmtDYXNlUmVhc29uczogTG92UmVmRGF0YU1vZGVsW107XG4gIHB1YmxpYyBzaG93Q29tbWVudHMgPSBmYWxzZTtcbiAgcHJpdmF0ZSByZWFkb25seSBJU09fRk9STUFUID0gJ1lZWVktTU0tRERUSEg6bW06c3MuU1NTJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VzU2VydmljZTogQ2FzZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmFsaWRhdG9yc1V0aWxzOiBWYWxpZGF0b3JzVXRpbHMsXG4gICAgcHJpdmF0ZSByZWFkb25seSBsaW5rZWRDYXNlc1NlcnZpY2U6IExpbmtlZENhc2VzU2VydmljZSkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2FzZUlkID0gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuY2FzZUlkO1xuICAgIHRoaXMuY2FzZU5hbWUgPSB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5jYXNlTmFtZTtcbiAgICB0aGlzLmxpbmtDYXNlUmVhc29ucyA9IHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmxpbmtDYXNlUmVhc29ucztcbiAgICB0aGlzLmluaXRGb3JtKCk7XG4gICAgaWYgKHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmVkaXRNb2RlKSB7XG4gICAgICAvLyB0aGlzIG1heSBoYXZlIGluY2x1ZGVzIHRoZSBjdXJyZW50bHkgYWRkZWQgb25lIGJ1dCB5ZXQgdG8gYmUgc3VibWl0dGVkLlxuICAgICAgdGhpcy5zZWxlY3RlZENhc2VzID0gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UubGlua2VkQ2FzZXM7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxpbmtlZENhc2VzU2VydmljZS5pbml0aWFsQ2FzZUxpbmtzLmxlbmd0aCAhPT0gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuY2FzZUZpZWxkVmFsdWUubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5saW5rZWRDYXNlcyA9IHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmluaXRpYWxDYXNlTGlua3M7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGluaXRGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMubGlua0Nhc2VGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICBjYXNlTnVtYmVyOiBbJycsIFtWYWxpZGF0b3JzLm1pbkxlbmd0aCgxNiksIHRoaXMudmFsaWRhdG9yc1V0aWxzLnJlZ2V4UGF0dGVybihQYXR0ZXJucy5DQVNFX1JFRildXSxcbiAgICAgIHJlYXNvblR5cGU6IHRoaXMuZ2V0UmVhc29uVHlwZUZvcm1BcnJheSxcbiAgICAgIG90aGVyRGVzY3JpcHRpb246IFsnJywgW1ZhbGlkYXRvcnMubWF4TGVuZ3RoKDEwMCldXVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldCBnZXRSZWFzb25UeXBlRm9ybUFycmF5KCk6IEZvcm1BcnJheSB7XG4gICAgcmV0dXJuIHRoaXMuZmIuYXJyYXkoXG4gICAgICB0aGlzLmxpbmtDYXNlUmVhc29ucy5tYXAoKHZhbCkgPT5cbiAgICAgICAgdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAga2V5OiBbdmFsLmtleV0sXG4gICAgICAgICAgdmFsdWVfZW46IFt2YWwudmFsdWVfZW5dLFxuICAgICAgICAgIHZhbHVlX2N5OiBbdmFsLnZhbHVlX2N5XSxcbiAgICAgICAgICBoaW50X3RleHRfZW46IFt2YWwuaGludF90ZXh0X2VuXSxcbiAgICAgICAgICBoaW50X3RleHRfY3k6IFt2YWwuaGludF90ZXh0X2N5XSxcbiAgICAgICAgICBsb3Zfb3JkZXI6IFt2YWwubG92X29yZGVyXSxcbiAgICAgICAgICBwYXJlbnRfa2V5OiBbdmFsLnBhcmVudF9rZXldLFxuICAgICAgICAgIHNlbGVjdGVkOiBbISF2YWwuc2VsZWN0ZWRdLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRoaXMudmFsaWRhdG9yc1V0aWxzLmZvcm1BcnJheVNlbGVjdGVkVmFsaWRhdG9yKClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUxpbmtDYXNlUmVhc29uT3RoZXJDb21tZW50cyhldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5saW5rQ2FzZVJlYXNvbnMuZmluZChyZWFzb24gPT4gcmVhc29uLnZhbHVlX2VuID09PSBldmVudC50YXJnZXQudmFsdWUpLnNlbGVjdGVkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgdGhpcy5zaG93Q29tbWVudHMgPSB0aGlzLmxpbmtDYXNlUmVhc29ucy5maW5kKHJlYXNvbiA9PiByZWFzb24udmFsdWVfZW4gPT09ICdPdGhlcicpLnNlbGVjdGVkO1xuICB9XG5cbiAgcHVibGljIHN1Ym1pdENhc2VJbmZvKCk6IHZvaWQge1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlcyA9IFtdO1xuICAgIHRoaXMuY2FzZVJlYXNvbkVycm9yID0gbnVsbDtcbiAgICB0aGlzLmNhc2VSZWFzb25Db21tZW50c0Vycm9yID0gbnVsbDtcbiAgICB0aGlzLmNhc2VOdW1iZXJFcnJvciA9IG51bGw7XG4gICAgdGhpcy5jYXNlU2VsZWN0aW9uRXJyb3IgPSBudWxsO1xuICAgIHRoaXMubm9TZWxlY3RlZENhc2VFcnJvciA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgdGhpcy5saW5rQ2FzZUZvcm0udmFsaWQgJiZcbiAgICAgICF0aGlzLmlzQ2FzZVNlbGVjdGVkKHRoaXMuc2VsZWN0ZWRDYXNlcykgJiZcbiAgICAgICF0aGlzLmlzQ2FzZVNlbGVjdGVkKHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmxpbmtlZENhc2VzKSAmJlxuICAgICAgIXRoaXMuaXNDYXNlU2VsZWN0ZWRTYW1lQXNDdXJyZW50Q2FzZSgpICYmXG4gICAgICAhdGhpcy5pc090aGVyT3B0aW9uU2VsZWN0ZWRCdXRPdGhlckRlc2NyaXB0aW9uTm90RW50ZXJlZCgpXG4gICAgKSB7XG4gICAgICB0aGlzLmdldENhc2VJbmZvKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd0Vycm9ySW5mbygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0Nhc2VTZWxlY3RlZChsaW5rZWRDYXNlczogQ2FzZUxpbmtbXSk6IGJvb2xlYW4ge1xuICAgIGlmIChsaW5rZWRDYXNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgY2FzZU51bWJlciA9IHRoaXMubGlua0Nhc2VGb3JtLnZhbHVlLmNhc2VOdW1iZXI7XG4gICAgcmV0dXJuICEhbGlua2VkQ2FzZXMuZmluZChcbiAgICAgIChjYXNlTGluaykgPT4gY2FzZUxpbmsuY2FzZVJlZmVyZW5jZS5zcGxpdCgnLScpLmpvaW4oJycpID09PSBjYXNlTnVtYmVyLnNwbGl0KCctJykuam9pbignJylcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0Nhc2VTZWxlY3RlZFNhbWVBc0N1cnJlbnRDYXNlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxpbmtDYXNlRm9ybS52YWx1ZS5jYXNlTnVtYmVyLnNwbGl0KCctJykuam9pbignJykgPT09IHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmNhc2VJZC5zcGxpdCgnLScpLmpvaW4oJycpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc090aGVyT3B0aW9uU2VsZWN0ZWRCdXRPdGhlckRlc2NyaXB0aW9uTm90RW50ZXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaG93Q29tbWVudHMgJiYgdGhpcy5saW5rQ2FzZUZvcm0udmFsdWUub3RoZXJEZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgcHVibGljIHNob3dFcnJvckluZm8oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlua0Nhc2VGb3JtLmNvbnRyb2xzLmNhc2VOdW1iZXIuaW52YWxpZCkge1xuICAgICAgdGhpcy5jYXNlTnVtYmVyRXJyb3IgPSBMaW5rZWRDYXNlc0Vycm9yTWVzc2FnZXMuQ2FzZU51bWJlckVycm9yO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzLnB1c2goe1xuICAgICAgICB0aXRsZTogJ2R1bW15LWNhc2UtbnVtYmVyJyxcbiAgICAgICAgZGVzY3JpcHRpb246IExpbmtlZENhc2VzRXJyb3JNZXNzYWdlcy5DYXNlTnVtYmVyRXJyb3IsXG4gICAgICAgIGZpZWxkSWQ6ICdjYXNlTnVtYmVyJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5saW5rQ2FzZUZvcm0uY29udHJvbHMucmVhc29uVHlwZS5pbnZhbGlkKSB7XG4gICAgICB0aGlzLmNhc2VSZWFzb25FcnJvciA9IExpbmtlZENhc2VzRXJyb3JNZXNzYWdlcy5SZWFzb25TZWxlY3Rpb25FcnJvcjtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgdGl0bGU6ICdkdW1teS1jYXNlLXJlYXNvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBMaW5rZWRDYXNlc0Vycm9yTWVzc2FnZXMuUmVhc29uU2VsZWN0aW9uRXJyb3IsXG4gICAgICAgIGZpZWxkSWQ6ICdjYXNlUmVhc29uJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5saW5rQ2FzZUZvcm0uY29udHJvbHMucmVhc29uVHlwZS52YWxpZFxuICAgICAgJiYgdGhpcy5saW5rQ2FzZVJlYXNvbnMuZmluZChyZWFzb24gPT4gcmVhc29uLnZhbHVlX2VuID09PSAnT3RoZXInKS5zZWxlY3RlZCkge1xuICAgICAgaWYgKHRoaXMubGlua0Nhc2VGb3JtLmNvbnRyb2xzLm90aGVyRGVzY3JpcHRpb24udmFsdWUudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmNhc2VSZWFzb25Db21tZW50c0Vycm9yID0gTGlua2VkQ2FzZXNFcnJvck1lc3NhZ2VzLm90aGVyRGVzY3JpcHRpb25FcnJvcjtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgIHRpdGxlOiAnZHVtbXktY2FzZS1yZWFzb24tY29tbWVudHMnLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBMaW5rZWRDYXNlc0Vycm9yTWVzc2FnZXMub3RoZXJEZXNjcmlwdGlvbkVycm9yLFxuICAgICAgICAgIGZpZWxkSWQ6ICdvdGhlckRlc2NyaXB0aW9uJyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5saW5rQ2FzZUZvcm0uY29udHJvbHMub3RoZXJEZXNjcmlwdGlvbi52YWx1ZS50cmltKCkubGVuZ3RoID4gMTAwKSB7XG4gICAgICAgIHRoaXMuY2FzZVJlYXNvbkNvbW1lbnRzRXJyb3IgPSBMaW5rZWRDYXNlc0Vycm9yTWVzc2FnZXMub3RoZXJEZXNjcmlwdGlvbk1heExlbmd0aEVycm9yO1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6ICdkdW1teS1jYXNlLXJlYXNvbi1jb21tZW50cycsXG4gICAgICAgICAgZGVzY3JpcHRpb246IExpbmtlZENhc2VzRXJyb3JNZXNzYWdlcy5vdGhlckRlc2NyaXB0aW9uTWF4TGVuZ3RoRXJyb3IsXG4gICAgICAgICAgZmllbGRJZDogJ290aGVyRGVzY3JpcHRpb24nLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaXNDYXNlU2VsZWN0ZWQodGhpcy5zZWxlY3RlZENhc2VzKSkge1xuICAgICAgdGhpcy5jYXNlU2VsZWN0aW9uRXJyb3IgPSBMaW5rZWRDYXNlc0Vycm9yTWVzc2FnZXMuQ2FzZVByb3Bvc2VkRXJyb3I7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiAnZHVtbXktY2FzZS1udW1iZXInLFxuICAgICAgICBkZXNjcmlwdGlvbjogTGlua2VkQ2FzZXNFcnJvck1lc3NhZ2VzLkNhc2VQcm9wb3NlZEVycm9yLFxuICAgICAgICBmaWVsZElkOiAnY2FzZU51bWJlcicsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNDYXNlU2VsZWN0ZWQodGhpcy5saW5rZWRDYXNlc1NlcnZpY2UubGlua2VkQ2FzZXMpKSB7XG4gICAgICB0aGlzLmNhc2VTZWxlY3Rpb25FcnJvciA9IExpbmtlZENhc2VzRXJyb3JNZXNzYWdlcy5DYXNlc0xpbmtlZEVycm9yO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzLnB1c2goe1xuICAgICAgICB0aXRsZTogJ2R1bW15LWNhc2UtbnVtYmVyJyxcbiAgICAgICAgZGVzY3JpcHRpb246IExpbmtlZENhc2VzRXJyb3JNZXNzYWdlcy5DYXNlc0xpbmtlZEVycm9yLFxuICAgICAgICBmaWVsZElkOiAnY2FzZU51bWJlcicsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMubGlua0Nhc2VGb3JtLnZhbHVlLmNhc2VOdW1iZXIuc3BsaXQoJy0nKS5qb2luKCcnKSA9PT0gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuY2FzZUlkLnNwbGl0KCctJykuam9pbignJykpIHtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgdGl0bGU6ICdkdW1teS1jYXNlLW51bWJlcicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBMaW5rZWRDYXNlc0Vycm9yTWVzc2FnZXMuUHJvcG9zZWRDYXNlV2l0aEluLFxuICAgICAgICBmaWVsZElkOiAnY2FzZU51bWJlcicsXG4gICAgICB9KTtcbiAgICB9XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgIHRoaXMuZW1pdExpbmtlZENhc2VzU3RhdGUoZmFsc2UpO1xuICB9XG5cbiAgcHVibGljIGdldENhc2VJbmZvKCk6IHZvaWQge1xuICAgIGNvbnN0IGNhc2VOdW1iZXJEYXRhID0gdGhpcy5saW5rQ2FzZUZvcm0udmFsdWUuY2FzZU51bWJlci5yZXBsYWNlKC9bLSBdL2csICcnKTtcbiAgICB0aGlzLmNhc2VzU2VydmljZVxuICAgICAgLmdldENhc2VWaWV3VjIoY2FzZU51bWJlckRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoY2FzZVZpZXc6IENhc2VWaWV3KSA9PiB7XG4gICAgICAgICAgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuY2FzZURldGFpbHMgPSBjYXNlVmlldztcbiAgICAgICAgICBjb25zdCBjYXNlTGluazogQ2FzZUxpbmsgPSB7XG4gICAgICAgICAgICBjYXNlUmVmZXJlbmNlOiBjYXNlVmlldy5jYXNlX2lkLFxuICAgICAgICAgICAgcmVhc29uczogdGhpcy5nZXRTZWxlY3RlZENhc2VSZWFzb25zKCksXG4gICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IG1vbWVudChuZXcgRGF0ZSgpKS5mb3JtYXQodGhpcy5JU09fRk9STUFUKSxcbiAgICAgICAgICAgIGNhc2VUeXBlOiBjYXNlVmlldy5jYXNlX3R5cGUubmFtZSB8fCAnJyxcbiAgICAgICAgICAgIGNhc2VUeXBlRGVzY3JpcHRpb246IGNhc2VWaWV3LmNhc2VfdHlwZS5kZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgICAgICAgIGNhc2VTdGF0ZTogY2FzZVZpZXcuc3RhdGUubmFtZSB8fCAnJyxcbiAgICAgICAgICAgIGNhc2VTdGF0ZURlc2NyaXB0aW9uOiBjYXNlVmlldy5zdGF0ZS5kZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgICAgICAgIGNhc2VTZXJ2aWNlOiBjYXNlVmlldy5jYXNlX3R5cGUgJiYgY2FzZVZpZXcuY2FzZV90eXBlLmp1cmlzZGljdGlvbiAmJiBjYXNlVmlldy5jYXNlX3R5cGUuanVyaXNkaWN0aW9uLmRlc2NyaXB0aW9uIHx8ICcnLFxuICAgICAgICAgICAgY2FzZU5hbWU6IHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmdldENhc2VOYW1lKGNhc2VWaWV3KSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnN0IGNjZEFwaUNhc2VMaW5rRGF0YTogQ0NEQ2FzZUxpbmtUeXBlID0ge1xuICAgICAgICAgICAgQ2FzZVJlZmVyZW5jZTogY2FzZVZpZXcuY2FzZV9pZCxcbiAgICAgICAgICAgIENhc2VUeXBlOiBjYXNlVmlldy5jYXNlX3R5cGUuaWQsXG4gICAgICAgICAgICBDcmVhdGVkRGF0ZVRpbWU6IG1vbWVudChuZXcgRGF0ZSgpKS5mb3JtYXQodGhpcy5JU09fRk9STUFUKSxcbiAgICAgICAgICAgIFJlYXNvbkZvckxpbms6IHRoaXMuZ2V0U2VsZWN0ZWRDQ0RUeXBlQ2FzZVJlYXNvbigpXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoIXRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmNhc2VGaWVsZFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5jYXNlRmllbGRWYWx1ZSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5jYXNlRmllbGRWYWx1ZS5wdXNoKHsgaWQ6IGNhc2VWaWV3LmNhc2VfaWQudG9TdHJpbmcoKSwgdmFsdWU6IGNjZEFwaUNhc2VMaW5rRGF0YSB9KTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FzZXMucHVzaChjYXNlTGluayk7XG4gICAgICAgICAgdGhpcy5saW5rQ2FzZVJlYXNvbnMuZm9yRWFjaChyZWFzb24gPT4gcmVhc29uLnNlbGVjdGVkID0gZmFsc2UpO1xuICAgICAgICAgIHRoaXMuaW5pdEZvcm0oKTtcbiAgICAgICAgICB0aGlzLmVtaXRMaW5rZWRDYXNlc1N0YXRlKGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yOiBIdHRwRXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLmNhc2VOdW1iZXJFcnJvciA9IExpbmtlZENhc2VzRXJyb3JNZXNzYWdlcy5DYXNlQ2hlY2tBZ2FpbkVycm9yO1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgIHRpdGxlOiAnZHVtbXktY2FzZS1udW1iZXInLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IExpbmtlZENhc2VzRXJyb3JNZXNzYWdlcy5DYXNlQ2hlY2tBZ2FpbkVycm9yLFxuICAgICAgICAgICAgZmllbGRJZDogJ2Nhc2VOdW1iZXInLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuZW1pdExpbmtlZENhc2VzU3RhdGUoZmFsc2UpO1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICAvLyBSZXR1cm4gbGlua2VkIGNhc2VzIHN0YXRlIGFuZCBlcnJvciBtZXNzYWdlcyB0byB0aGUgcGFyZW50XG4gIHB1YmxpYyBlbWl0TGlua2VkQ2FzZXNTdGF0ZShpc05hdmlnYXRlVG9OZXh0UGFnZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubGlua2VkQ2FzZXNTdGF0ZUVtaXR0ZXIuZW1pdCh7XG4gICAgICBjdXJyZW50TGlua2VkQ2FzZXNQYWdlOiBMaW5rZWRDYXNlc1BhZ2VzLkxJTktfQ0FTRSxcbiAgICAgIGVycm9yTWVzc2FnZXM6IHRoaXMuZXJyb3JNZXNzYWdlcyxcbiAgICAgIG5hdmlnYXRlVG9OZXh0UGFnZTogaXNOYXZpZ2F0ZVRvTmV4dFBhZ2UsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2VsZWN0ZWRDYXNlUmVhc29ucygpOiBMaW5rUmVhc29uW10ge1xuICAgIGNvbnN0IHNlbGVjdGVkUmVhc29ucyA9IFtdO1xuICAgIHRoaXMubGlua0Nhc2VGb3JtLmNvbnRyb2xzLnJlYXNvblR5cGUudmFsdWUuZm9yRWFjaChcbiAgICAgIChzZWxlY3RlZFJlYXNvbjogTGlua0Nhc2VSZWFzb24pID0+IHtcbiAgICAgICAgaWYgKHNlbGVjdGVkUmVhc29uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgc2VsZWN0ZWRSZWFzb25zLnB1c2goe1xuICAgICAgICAgICAgUmVhc29uOiBzZWxlY3RlZFJlYXNvbi5rZXksXG4gICAgICAgICAgICBPdGhlckRlc2NyaXB0aW9uOiBzZWxlY3RlZFJlYXNvbi52YWx1ZV9lbiA9PT0gJ090aGVyJ1xuICAgICAgICAgICAgICA/IHRoaXMubGlua0Nhc2VGb3JtLmNvbnRyb2xzLm90aGVyRGVzY3JpcHRpb24udmFsdWVcbiAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgIH0gYXMgTGlua1JlYXNvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiBzZWxlY3RlZFJlYXNvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2VsZWN0ZWRDQ0RUeXBlQ2FzZVJlYXNvbigpOiBMaW5rUmVhc29uW10ge1xuICAgIGNvbnN0IHNlbGVjdGVkUmVhc29ucyA9IFtdO1xuICAgIHRoaXMubGlua0Nhc2VGb3JtLmNvbnRyb2xzLnJlYXNvblR5cGUudmFsdWUuZm9yRWFjaChcbiAgICAgIChzZWxlY3RlZFJlYXNvbjogTGlua0Nhc2VSZWFzb24pID0+IHtcbiAgICAgICAgaWYgKHNlbGVjdGVkUmVhc29uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgc2VsZWN0ZWRSZWFzb25zLnB1c2goe1xuICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgUmVhc29uOiBzZWxlY3RlZFJlYXNvbi5rZXksXG4gICAgICAgICAgICAgIE90aGVyRGVzY3JpcHRpb246IHNlbGVjdGVkUmVhc29uLnZhbHVlX2VuID09PSAnT3RoZXInXG4gICAgICAgICAgICAgICAgPyB0aGlzLmxpbmtDYXNlRm9ybS5jb250cm9scy5vdGhlckRlc2NyaXB0aW9uLnZhbHVlXG4gICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gc2VsZWN0ZWRSZWFzb25zO1xuICB9XG5cbiAgcHVibGljIG9uU2VsZWN0ZWRMaW5rZWRDYXNlUmVtb3ZlKHBvcywgc2VsZWN0ZWRDYXNlUmVmZXJlbmNlKTogdm9pZCB7XG4gICAgY29uc3QgY2FzZUZpZWxkVmFsdWUgPSB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5jYXNlRmllbGRWYWx1ZSB8fCBbXTtcbiAgICBjb25zdCB1cGRhdGVkSXRlbXMgPSBjYXNlRmllbGRWYWx1ZS5maWx0ZXIoaXRlbSA9PiBpdGVtLnZhbHVlICYmIGl0ZW0udmFsdWUuQ2FzZVJlZmVyZW5jZSAhPT0gc2VsZWN0ZWRDYXNlUmVmZXJlbmNlKTtcbiAgICBpZiAodXBkYXRlZEl0ZW1zKSB7XG4gICAgICB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5jYXNlRmllbGRWYWx1ZSA9IHVwZGF0ZWRJdGVtcztcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZENhc2VzLnNwbGljZShwb3MsIDEpO1xuICB9XG5cbiAgcHVibGljIG9uTmV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBbXTtcbiAgICB0aGlzLmNhc2VSZWFzb25FcnJvciA9IG51bGw7XG4gICAgdGhpcy5jYXNlTnVtYmVyRXJyb3IgPSBudWxsO1xuICAgIHRoaXMuY2FzZVNlbGVjdGlvbkVycm9yID0gbnVsbDtcbiAgICB0aGlzLm5vU2VsZWN0ZWRDYXNlRXJyb3IgPSBudWxsO1xuICAgIGxldCBuYXZpZ2F0ZVRvTmV4dFBhZ2UgPSB0cnVlO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkQ2FzZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5saW5rZWRDYXNlcyA9IHRoaXMuc2VsZWN0ZWRDYXNlcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub1NlbGVjdGVkQ2FzZUVycm9yID0gTGlua2VkQ2FzZXNFcnJvck1lc3NhZ2VzLkNhc2VTZWxlY3Rpb25FcnJvcjtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgdGl0bGU6ICdkdW1teS1jYXNlLXNlbGVjdGlvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBMaW5rZWRDYXNlc0Vycm9yTWVzc2FnZXMuQ2FzZVNlbGVjdGlvbkVycm9yLFxuICAgICAgICBmaWVsZElkOiAnY2FzZVJlYXNvbicsXG4gICAgICB9KTtcbiAgICAgIG5hdmlnYXRlVG9OZXh0UGFnZSA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLmVtaXRMaW5rZWRDYXNlc1N0YXRlKG5hdmlnYXRlVG9OZXh0UGFnZSk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLXJvd1wiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tZnVsbFwiPlxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLWNhcHRpb24tbFwiPkxpbmsgY2FzZXMgdG8ge3tjYXNlTmFtZX19IHt7Y2FzZUlkIHwgY2NkQ2FzZVJlZmVyZW5jZX19PC9zcGFuPlxuICAgICAgPGgxIGNsYXNzPVwiZ292dWstaGVhZGluZy14bFwiPlNlbGVjdCBhJm5ic3A7Y2FzZSB5b3Ugd2FudCB0byBsaW5rIHRvIHRoaXMgY2FzZTwvaDE+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIFtmb3JtR3JvdXBdPVwibGlua0Nhc2VGb3JtXCIgKm5nSWY9XCJsaW5rQ2FzZUZvcm1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIiBpZD1cImNhc2VOdW1iZXJcIiBbbmdDbGFzc109XCJ7J2dvdnVrLWZvcm0tZ3JvdXAtLWVycm9yJzogISFjYXNlTnVtYmVyRXJyb3J9XCI+XG4gICAgICAgICAgPGgzIGNsYXNzPVwiZ292dWstaGVhZGluZy1zXCI+RW50ZXIgY2FzZSByZWZlcmVuY2U8L2gzPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwiY2FzZU51bWJlckVycm9yXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXZpc3VhbGx5LWhpZGRlblwiPkVycm9yOjwvc3Bhbj4ge3tjYXNlTnVtYmVyRXJyb3J9fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1pbnB1dCBnb3Z1ay1pbnB1dC0td2lkdGgtMjBcIiBmb3JtQ29udHJvbE5hbWU9XCJjYXNlTnVtYmVyXCIgaWQ9XCJ3aWR0aC0yMFwiIG5hbWU9XCJ3aWR0aC0yMFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J2dvdnVrLWZvcm0tZ3JvdXAtLWVycm9yJzogISFjYXNlUmVhc29uRXJyb3J9XCIgY2xhc3M9XCJnb3Z1ay0hLW1hcmdpbi10b3AtM1wiPlxuICAgICAgICAgIDxoMyBjbGFzcz1cImdvdnVrLWhlYWRpbmctc1wiPldoeSBzaG91bGQgdGhlc2UgY2FzZXMgYmUgbGlua2VkPzwvaDM+XG4gICAgICAgICAgPGRpdiBpZD1cIndhc3RlLWhpbnRcIiBjbGFzcz1cImdvdnVrLWhpbnRcIj5cbiAgICAgICAgICAgIFNlbGVjdCBhbGwgdGhhdCBhcHBseS5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLWVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImNhc2VSZWFzb25FcnJvclwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay12aXN1YWxseS1oaWRkZW5cIj5FcnJvcjo8L3NwYW4+IHt7Y2FzZVJlYXNvbkVycm9yfX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWNoZWNrYm94ZXNcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWNoZWNrYm94ZXNcIiBmb3JtQXJyYXlOYW1lPVwicmVhc29uVHlwZVwiIGlkPVwiY2FzZVJlYXNvblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWNoZWNrYm94ZXNfX2l0ZW1cIiAqbmdGb3I9XCJsZXQgcmVhc29uIG9mIGxpbmtDYXNlUmVhc29ucztpbmRleCBhcyBwb3NcIiBbZm9ybUdyb3VwTmFtZV09XCJwb3NcIj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstY2hlY2tib3hlc19faW5wdXRcIiBpZD1cInt7cmVhc29uLmtleX19XCIgZm9ybUNvbnRyb2xOYW1lPVwic2VsZWN0ZWRcIiBuYW1lPVwicG9zXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIiBbdmFsdWVdPVwicmVhc29uLnZhbHVlX2VuXCIgKGNoYW5nZSk9XCJ0b2dnbGVMaW5rQ2FzZVJlYXNvbk90aGVyQ29tbWVudHMoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1jaGVja2JveGVzX19sYWJlbFwiIGZvcj1cInt7cmVhc29uLmtleX19XCI+e3tyZWFzb24udmFsdWVfZW59fTwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJvdGhlci1kZXNjcmlwdGlvbi1jaGFyLWxpbWl0LWVycm9yXCIgW25nQ2xhc3NdPVwieydnb3Z1ay1mb3JtLWdyb3VwLS1lcnJvcic6ICEhY2FzZVJlYXNvbkNvbW1lbnRzRXJyb3J9XCIgY2xhc3M9XCJnb3Z1ay0hLW1hcmdpbi10b3AtM1wiICpuZ0lmPVwic2hvd0NvbW1lbnRzXCI+XG4gICAgICAgICAgPGgzIGNsYXNzPVwiZ292dWstaGVhZGluZy1zXCI+Q29tbWVudHM8L2gzPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwiY2FzZVJlYXNvbkNvbW1lbnRzRXJyb3JcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstdmlzdWFsbHktaGlkZGVuXCI+RXJyb3I6PC9zcGFuPiB7e2Nhc2VSZWFzb25Db21tZW50c0Vycm9yfX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZ292dWstdGV4dGFyZWEgZ292dWstaW5wdXQtLXdpZHRoLTMwXCIgaWQ9XCJvdGhlckRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgIG5hbWU9XCJvdGhlckRlc2NyaXB0aW9uXCIgZm9ybUNvbnRyb2xOYW1lPVwib3RoZXJEZXNjcmlwdGlvblwiIHJvd3M9XCI1XCJcbiAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJvdGhlci1kZXNjcmlwdGlvbi1oaW50IG90aGVyLWRlc2NyaXB0aW9uLWNoYXItbGltaXQtaW5mbyBvdGhlci1kZXNjcmlwdGlvbi1jaGFyLWxpbWl0LWVycm9yXCI+XG4gICAgICAgICAgPC90ZXh0YXJlYT5cbiAgICAgICAgICA8ZGl2IGlkPVwib3RoZXItZGVzY3JpcHRpb24tY2hhci1saW1pdC1pbmZvXCIgYXJpYS1saXZlPVwicG9saXRlXCIgY2xhc3M9XCJnb3Z1ay1oaW50IGdvdnVrLWNoYXJhY3Rlci1jb3VudF9fbWVzc2FnZVwiPlxuICAgICAgICAgICAgWW91IGNhbiBlbnRlciB1cCB0byAxMDAgY2hhcmFjdGVyc1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJyPjxicj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJjYXNlU2VsZWN0aW9uRXJyb3JcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXZpc3VhbGx5LWhpZGRlblwiPkVycm9yOjwvc3Bhbj4ge3tjYXNlU2VsZWN0aW9uRXJyb3J9fVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxidXR0b24gaWQ9XCJwcm9wb3NlXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZ292dWstYnV0dG9uIGdvdnVrLWJ1dHRvbi0tc2Vjb25kYXJ5XCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1idXR0b25cIlxuICAgICAgICAgIChjbGljayk9XCJzdWJtaXRDYXNlSW5mbygpXCI+UHJvcG9zZSBjYXNlIGxpbms8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGhyPlxuICAgICAgPGJyPjxicj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCIgaWQ9XCJjYXNlTnVtYmVyXCIgW25nQ2xhc3NdPVwieydnb3Z1ay1mb3JtLWdyb3VwLS1lcnJvcic6ICEhbm9TZWxlY3RlZENhc2VFcnJvcn1cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJub1NlbGVjdGVkQ2FzZUVycm9yXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay12aXN1YWxseS1oaWRkZW5cIj5FcnJvcjo8L3NwYW4+IHt7bm9TZWxlY3RlZENhc2VFcnJvcn19XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIj5cbiAgICAgICAgICA8Y2FwdGlvbiBjbGFzcz1cImdvdnVrLXRhYmxlX19jYXB0aW9uIGdvdnVrLXRhYmxlX19jYXB0aW9uLS1tXCI+UHJvcG9zZWQgY2FzZSBsaW5rcyA8L2NhcHRpb24+XG4gICAgICAgICAgPHRoZWFkIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgd2lkdGg9XCIzMDBcIj5DYXNlIG5hbWUgYW5kIG51bWJlcjwvdGg+XG4gICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHdpZHRoPVwiMTUwXCI+Q2FzZSB0eXBlIDwvdGg+XG4gICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHdpZHRoPVwiMjAwXCI+U2VydmljZTwvdGg+XG4gICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHdpZHRoPVwiMjAwXCI+U3RhdGU8L3RoPlxuICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiB3aWR0aD1cIjQwMFwiPlJlYXNvbnMgZm9yIGNhc2UgbGluazwvdGg+XG4gICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlclwiIHdpZHRoPVwiNTBcIj48L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCI+XG4gICAgICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCIgKm5nRm9yPVwibGV0IGNhc2Ugb2Ygc2VsZWN0ZWRDYXNlczsgbGV0IHBvcyA9IGluZGV4XCI+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXAtLWVycm9yXCJcbiAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndGFibGUtZ3JvdXAtZXJyb3InOmNhc2VTZWxlY3Rpb25FcnJvciAmJiBjYXNlLmNhc2VSZWZlcmVuY2UgPT09IGxpbmtDYXNlRm9ybS52YWx1ZS5jYXNlTnVtYmVyfVwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuPnt7Y2FzZS5jYXNlTmFtZX19IDxicj4ge3tjYXNlLmNhc2VSZWZlcmVuY2UgfCBjY2RDYXNlUmVmZXJlbmNlfX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCIgW3RpdGxlXT1cImNhc2UuY2FzZVR5cGVEZXNjcmlwdGlvblwiPnt7Y2FzZS5jYXNlVHlwZX19PC90ZD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj57e2Nhc2UuY2FzZVNlcnZpY2V9fTwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCIgW3RpdGxlXT1cImNhc2UuY2FzZVN0YXRlRGVzY3JpcHRpb25cIj57e2Nhc2UuY2FzZVN0YXRlfX08L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPjxzcGFuXG4gICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgcmVhc29uIG9mIGNhc2UucmVhc29uc1wiPnt7cmVhc29uIHwgY2NkTGlua0Nhc2VzUmVhc29uVmFsdWV9fTxicj48L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZ292dWstdGFibGVfX2NlbGxcIj48YSBbYXR0ci5pZF09XCJjYXNlLmNhc2VSZWZlcmVuY2VcIiAoY2xpY2spPVwib25TZWxlY3RlZExpbmtlZENhc2VSZW1vdmUocG9zLCBjYXNlLmNhc2VSZWZlcmVuY2UpO1wiXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImdvdnVrLWxpbmsgbm8tdmlzaXRlZC1zdGF0ZVwiPlJlbW92ZTwvYT48L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIiAqbmdJZj1cIiFzZWxlY3RlZENhc2VzLmxlbmd0aFwiPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiIGNvbHNwYW49XCI2XCI+XG4gICAgICAgICAgICAgICAgTm9uZVxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJuZXh0LWJ1dHRvblwiIChjbGljayk9XCJvbk5leHQoKVwiPk5leHQ8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19