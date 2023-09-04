import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseFieldService, FieldsUtils, OrderService, ProfileNotifier, } from '../../../services';
import { CallbackErrorsComponent } from '../../error';
import { PaletteContext } from '../../palette';
import { CaseEditPageComponent } from '../case-edit-page/case-edit-page.component';
import { CaseEditComponent } from '../case-edit/case-edit.component';
import * as i0 from "@angular/core";
import * as i1 from "../case-edit/case-edit.component";
import * as i2 from "../../../services";
import * as i3 from "@angular/router";
function CaseEditSubmitComponent_div_0_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div");
} }
function CaseEditSubmitComponent_div_0_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-markdown", 14);
    i0.ɵɵpipe(1, "ccdCaseTitle");
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("content", i0.ɵɵpipeBind3(1, 1, ctx_r4.getCaseTitle(), ctx_r4.contextFields, ctx_r4.editForm.controls["data"]));
} }
function CaseEditSubmitComponent_div_0_ng_template_6_h2_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdCaseReference");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("#", i0.ɵɵpipeBind1(2, 1, ctx_r10.getCaseId()), "");
} }
function CaseEditSubmitComponent_div_0_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CaseEditSubmitComponent_div_0_ng_template_6_h2_0_Template, 3, 3, "h2", 15);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", ctx_r6.getCaseId());
} }
function CaseEditSubmitComponent_div_0_ng_container_11_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 20);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "Check the information below carefully."));
} }
function CaseEditSubmitComponent_div_0_ng_container_11_ng_container_7_ng_container_1_ng_container_1_ng_container_1_th_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 27)(1, "span", 20);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const field_r16 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(field_r16.label);
} }
function CaseEditSubmitComponent_div_0_ng_container_11_ng_container_7_ng_container_1_ng_container_1_ng_container_1_a_6_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 13);
    i0.ɵɵlistener("click", function CaseEditSubmitComponent_div_0_ng_container_11_ng_container_7_ng_container_1_ng_container_1_ng_container_1_a_6_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r23); const page_r13 = i0.ɵɵnextContext(4).$implicit; const ctx_r21 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r21.navigateToPage(page_r13.id)); });
    i0.ɵɵelementStart(1, "span", 20);
    i0.ɵɵtext(2, "Change");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const field_r16 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵattributeInterpolate1("aria-label", "Change ", field_r16.label, "");
} }
function CaseEditSubmitComponent_div_0_ng_container_11_ng_container_7_ng_container_1_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "tr", 21);
    i0.ɵɵtemplate(2, CaseEditSubmitComponent_div_0_ng_container_11_ng_container_7_ng_container_1_ng_container_1_ng_container_1_th_2_Template, 3, 1, "th", 22);
    i0.ɵɵelementStart(3, "td", 23);
    i0.ɵɵelement(4, "ccd-field-read", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 25);
    i0.ɵɵtemplate(6, CaseEditSubmitComponent_div_0_ng_container_11_ng_container_7_ng_container_1_ng_container_1_ng_container_1_a_6_Template, 3, 1, "a", 26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const field_r16 = i0.ɵɵnextContext().$implicit;
    const ctx_r17 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", field_r16)("hidden", field_r16.hidden)("formGroup", ctx_r17.editForm.controls["data"])("contextFields", ctx_r17.contextFields);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r17.isLabel(field_r16) && !ctx_r17.caseEdit.isCaseFlagSubmission);
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("colspan", ctx_r17.isLabel(field_r16) ? "2" : "1");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroup", ctx_r17.editForm.controls["data"])("topLevelFormGroup", ctx_r17.editForm.controls["data"])("caseField", ctx_r17.summaryCaseField(field_r16))("context", ctx_r17.paletteContext)("caseFields", ctx_r17.contextFields);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r17.isChangeAllowed(field_r16));
} }
function CaseEditSubmitComponent_div_0_ng_container_11_ng_container_7_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CaseEditSubmitComponent_div_0_ng_container_11_ng_container_7_ng_container_1_ng_container_1_ng_container_1_Template, 7, 12, "ng-container", 0);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const field_r16 = ctx.$implicit;
    const ctx_r15 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.canShowFieldInCYA(field_r16));
} }
const _c0 = function (a0, a4) { return [a0, false, undefined, true, a4]; };
function CaseEditSubmitComponent_div_0_ng_container_11_ng_container_7_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CaseEditSubmitComponent_div_0_ng_container_11_ng_container_7_ng_container_1_ng_container_1_Template, 2, 1, "ng-container", 19);
    i0.ɵɵpipe(2, "ccdCYAPageLabelFilter");
    i0.ɵɵpipe(3, "ccdReadFieldsFilter");
    i0.ɵɵpipe(4, "ccdPageFields");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const page_r13 = i0.ɵɵnextContext().$implicit;
    const ctx_r14 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBindV(3, 3, i0.ɵɵpureFunction2(12, _c0, i0.ɵɵpipeBind2(4, 9, page_r13, ctx_r14.editForm), ctx_r14.editForm.controls["data"]))));
} }
function CaseEditSubmitComponent_div_0_ng_container_11_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CaseEditSubmitComponent_div_0_ng_container_11_ng_container_7_ng_container_1_Template, 5, 15, "ng-container", 0);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const page_r13 = ctx.$implicit;
    const ctx_r12 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r12.isShown(page_r13));
} }
function CaseEditSubmitComponent_div_0_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "h2", 16);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, CaseEditSubmitComponent_div_0_ng_container_11_span_4_Template, 3, 3, "span", 17);
    i0.ɵɵelementStart(5, "table", 18)(6, "tbody");
    i0.ɵɵtemplate(7, CaseEditSubmitComponent_div_0_ng_container_11_ng_container_7_Template, 2, 1, "ng-container", 19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 3, ctx_r7.pageTitle));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r7.caseEdit.isCaseFlagSubmission);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r7.wizard.pages);
} }
function CaseEditSubmitComponent_div_0_ng_container_12_ng_container_3_tr_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 32)(1, "th", 33);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 34);
    i0.ɵɵelement(4, "ccd-field-read", 35);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const field_r28 = i0.ɵɵnextContext().$implicit;
    const ctx_r29 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("caseField", field_r28)("formGroup", ctx_r29.editForm.controls["data"])("contextFields", ctx_r29.contextFields);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(field_r28.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r29.editForm.controls["data"])("caseField", ctx_r29.summaryCaseField(field_r28));
} }
function CaseEditSubmitComponent_div_0_ng_container_12_ng_container_3_tr_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 36)(1, "td", 37);
    i0.ɵɵelement(2, "ccd-field-read", 38);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const field_r28 = i0.ɵɵnextContext().$implicit;
    const ctx_r30 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("caseField", field_r28)("formGroup", ctx_r30.editForm.controls["data"])("contextFields", ctx_r30.contextFields);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r30.editForm.controls["data"])("caseField", ctx_r30.summaryCaseField(field_r28))("caseFields", ctx_r30.contextFields);
} }
function CaseEditSubmitComponent_div_0_ng_container_12_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0)(1, 29);
    i0.ɵɵpipe(2, "ccdIsCompound");
    i0.ɵɵtemplate(3, CaseEditSubmitComponent_div_0_ng_container_12_ng_container_3_tr_3_Template, 5, 6, "tr", 30);
    i0.ɵɵtemplate(4, CaseEditSubmitComponent_div_0_ng_container_12_ng_container_3_tr_4_Template, 3, 6, "tr", 31);
    i0.ɵɵelementContainerEnd()();
} if (rf & 2) {
    const field_r28 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitch", !i0.ɵɵpipeBind1(2, 3, field_r28));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngSwitchCase", true);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", false);
} }
function CaseEditSubmitComponent_div_0_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "table", 28)(2, "tbody");
    i0.ɵɵtemplate(3, CaseEditSubmitComponent_div_0_ng_container_12_ng_container_3_Template, 5, 5, "ng-container", 19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r8.showSummaryFields);
} }
function CaseEditSubmitComponent_div_0_ng_container_13_fieldset_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "fieldset", 40);
    i0.ɵɵelement(1, "legend", 41);
    i0.ɵɵelementStart(2, "div", 42)(3, "label", 43);
    i0.ɵɵtext(4, " Event summary (optional) ");
    i0.ɵɵelementStart(5, "span", 44);
    i0.ɵɵtext(6, "A few words describing the purpose of the event.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "input", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 42)(9, "label", 46);
    i0.ɵɵtext(10, "Event description (optional)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "textarea", 47);
    i0.ɵɵelementEnd()();
} }
function CaseEditSubmitComponent_div_0_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CaseEditSubmitComponent_div_0_ng_container_13_fieldset_1_Template, 12, 0, "fieldset", 39);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r9.profile && !ctx_r9.isSolicitor());
} }
function CaseEditSubmitComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "h1", 2);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, CaseEditSubmitComponent_div_0_div_3_Template, 1, 0, "div", 3);
    i0.ɵɵtemplate(4, CaseEditSubmitComponent_div_0_ng_template_4_Template, 2, 5, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵtemplate(6, CaseEditSubmitComponent_div_0_ng_template_6_Template, 1, 1, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelement(8, "ccd-case-edit-generic-errors", 6);
    i0.ɵɵelementStart(9, "ccd-callback-errors", 7);
    i0.ɵɵlistener("callbackErrorsContext", function CaseEditSubmitComponent_div_0_Template_ccd_callback_errors_callbackErrorsContext_9_listener($event) { i0.ɵɵrestoreView(_r35); const ctx_r34 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r34.callbackErrorsNotify($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "form", 8);
    i0.ɵɵlistener("submit", function CaseEditSubmitComponent_div_0_Template_form_submit_10_listener() { i0.ɵɵrestoreView(_r35); const ctx_r36 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r36.submit()); });
    i0.ɵɵtemplate(11, CaseEditSubmitComponent_div_0_ng_container_11_Template, 8, 5, "ng-container", 0);
    i0.ɵɵtemplate(12, CaseEditSubmitComponent_div_0_ng_container_12_Template, 4, 1, "ng-container", 0);
    i0.ɵɵtemplate(13, CaseEditSubmitComponent_div_0_ng_container_13_Template, 2, 1, "ng-container", 0);
    i0.ɵɵelementStart(14, "div", 9)(15, "button", 10);
    i0.ɵɵlistener("click", function CaseEditSubmitComponent_div_0_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r35); const ctx_r37 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r37.previous()); });
    i0.ɵɵtext(16, "Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 11);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "p", 12)(20, "a", 13);
    i0.ɵɵlistener("click", function CaseEditSubmitComponent_div_0_Template_a_click_20_listener() { i0.ɵɵrestoreView(_r35); const ctx_r38 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r38.cancel()); });
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const _r3 = i0.ɵɵreference(5);
    const _r5 = i0.ɵɵreference(7);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.eventTrigger.name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.getCaseTitle())("ngIfThen", _r3)("ngIfElse", _r5);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("error", ctx_r0.caseEdit.error);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("callbackErrorsSubject", ctx_r0.caseEdit.callbackErrorsSubject);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroup", ctx_r0.editForm);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.checkYourAnswerFieldsToDisplayExists());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.readOnlySummaryFieldsToDisplayExists());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.showEventNotes());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r0.hasPrevious() || ctx_r0.caseEdit.isSubmitting);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isDisabled);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.triggerText);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("disabled", ctx_r0.caseEdit.isSubmitting);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.getCancelText());
} }
function CaseEditSubmitComponent_ccd_case_event_completion_1_Template(rf, ctx) { if (rf & 1) {
    const _r40 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccd-case-event-completion", 48);
    i0.ɵɵlistener("eventCanBeCompleted", function CaseEditSubmitComponent_ccd_case_event_completion_1_Template_ccd_case_event_completion_eventCanBeCompleted_0_listener($event) { i0.ɵɵrestoreView(_r40); const ctx_r39 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r39.onEventCanBeCompleted($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("eventCompletionParams", ctx_r1.caseEdit.eventCompletionParams);
} }
// @dynamic
export class CaseEditSubmitComponent {
    constructor(caseEdit, fieldsUtils, caseFieldService, route, orderService, profileNotifier) {
        this.caseEdit = caseEdit;
        this.fieldsUtils = fieldsUtils;
        this.caseFieldService = caseFieldService;
        this.route = route;
        this.orderService = orderService;
        this.profileNotifier = profileNotifier;
        this.paletteContext = PaletteContext.CHECK_YOUR_ANSWER;
    }
    get isDisabled() {
        // EUI-3452.
        // We don't need to check the validity of the editForm as it is readonly.
        // This was causing issues with hidden fields that aren't wanted but have
        // not been disabled.
        return this.caseEdit.isSubmitting || this.hasErrors;
    }
    ngOnInit() {
        this.profileSubscription = this.profileNotifier.profile.subscribe(_ => this.profile = _);
        this.eventTrigger = this.caseEdit.eventTrigger;
        this.triggerText = this.eventTrigger.end_button_label || CallbackErrorsComponent.TRIGGER_TEXT_SUBMIT;
        this.editForm = this.caseEdit.form;
        this.wizard = this.caseEdit.wizard;
        this.showSummaryFields = this.sortFieldsByShowSummaryContent(this.eventTrigger.case_fields);
        this.caseEdit.isSubmitting = false;
        this.contextFields = this.getCaseFields();
        // Indicates if the submission is for a Case Flag, as opposed to a "regular" form submission, by the presence of
        // a FlagLauncher field in the event trigger
        this.caseEdit.isCaseFlagSubmission =
            this.eventTrigger.case_fields.some(caseField => FieldsUtils.isCaseFieldOfType(caseField, ['FlagLauncher']));
        this.caseEdit.isLinkedCasesSubmission =
            this.eventTrigger.case_fields.some(caseField => FieldsUtils.isCaseFieldOfType(caseField, ['ComponentLauncher']));
        this.pageTitle = this.caseEdit.isCaseFlagSubmission ? 'Review flag details' : 'Check your answers';
    }
    ngOnDestroy() {
        /* istanbul ignore else */
        if (this.profileSubscription) {
            this.profileSubscription.unsubscribe();
        }
    }
    submit() {
        this.caseEdit.submitForm({
            eventTrigger: this.eventTrigger,
            form: this.editForm,
            submit: this.caseEdit.submit,
            caseDetails: this.caseEdit.caseDetails,
        });
    }
    onEventCanBeCompleted(eventCanBeCompleted) {
        this.caseEdit.onEventCanBeCompleted({
            eventTrigger: this.eventTrigger,
            eventCanBeCompleted,
            caseDetails: this.caseEdit.caseDetails,
            form: this.editForm,
            submit: this.caseEdit.submit,
        });
    }
    get hasErrors() {
        return this.caseEdit?.error?.callbackErrors?.length;
    }
    navigateToPage(pageId) {
        this.caseEdit.navigateToPage(pageId);
    }
    callbackErrorsNotify(errorContext) {
        this.caseEdit.ignoreWarning = errorContext.ignoreWarning;
        this.triggerText = errorContext.triggerText;
    }
    summaryCaseField(field) {
        /* istanbul ignore else */
        if (null === this.editForm.get('data').get(field.id)) {
            // If not in form, return field itself
            return field;
        }
        const cloneField = this.fieldsUtils.cloneCaseField(field);
        cloneField.value = this.editForm.get('data').get(field.id).value;
        return cloneField;
    }
    cancel() {
        if (this.eventTrigger.can_save_draft) {
            if (this.route.snapshot.queryParamMap.get(CaseEditComponent.ORIGIN_QUERY_PARAM) === 'viewDraft') {
                this.caseEdit.cancelled.emit({ status: CaseEditPageComponent.RESUMED_FORM_DISCARD });
            }
            else {
                this.caseEdit.cancelled.emit({ status: CaseEditPageComponent.NEW_FORM_DISCARD });
            }
        }
        else {
            this.caseEdit.cancelled.emit();
        }
    }
    isLabel(field) {
        return this.caseFieldService.isLabel(field);
    }
    isChangeAllowed(field) {
        return !this.caseFieldService.isReadOnly(field);
    }
    checkYourAnswerFieldsToDisplayExists() {
        /* istanbul ignore else */
        if (this.eventTrigger.show_summary || this.eventTrigger.show_summary === null) {
            for (const page of this.wizard.pages) {
                /* istanbul ignore else */
                if (page.case_fields && this.isShown(page)) {
                    for (const field of page.case_fields) {
                        /* istanbul ignore else */
                        if (this.canShowFieldInCYA(field)) {
                            // at least one field needs showing
                            return true;
                        }
                    }
                }
            }
        }
        else {
            // found no fields to show in CYA summary page
            return false;
        }
    }
    readOnlySummaryFieldsToDisplayExists() {
        return this.eventTrigger.case_fields.some(field => field.show_summary_content_option >= 0);
    }
    showEventNotes() {
        return !!this.eventTrigger.show_event_notes;
    }
    getLastPageShown() {
        let lastPage;
        this.wizard.reverse().forEach(page => {
            if (!lastPage && this.isShown(page)) {
                lastPage = page;
            }
        });
        // noinspection JSUnusedAssignment
        return lastPage;
    }
    previous() {
        /* istanbul ignore else */
        if (this.hasPrevious()) {
            this.navigateToPage(this.getLastPageShown().id);
        }
    }
    hasPrevious() {
        return !!this.getLastPageShown();
    }
    isShown(page) {
        const fields = this.fieldsUtils
            .mergeCaseFieldsAndFormFields(this.eventTrigger.case_fields, this.editForm.controls['data'].value);
        return page.parsedShowCondition.match(fields);
    }
    canShowFieldInCYA(field) {
        return field.show_summary_change_option;
    }
    isSolicitor() {
        return this.profile.isSolicitor();
    }
    sortFieldsByShowSummaryContent(fields) {
        return this.orderService
            .sort(fields, CaseEditSubmitComponent.SHOW_SUMMARY_CONTENT_COMPARE_FUNCTION)
            .filter(cf => cf.show_summary_content_option);
    }
    getCaseFields() {
        if (this.caseEdit.caseDetails) {
            return FieldsUtils.getCaseFields(this.caseEdit.caseDetails);
        }
        return this.eventTrigger.case_fields;
    }
    getCaseId() {
        return this.caseEdit.getCaseId(this.caseEdit.caseDetails);
    }
    getCaseTitle() {
        return (this.caseEdit.caseDetails && this.caseEdit.caseDetails.state &&
            this.caseEdit.caseDetails.state.title_display ? this.caseEdit.caseDetails.state.title_display : '');
    }
    getCancelText() {
        if (this.eventTrigger.can_save_draft) {
            return 'Return to case list';
        }
        else {
            return 'Cancel';
        }
    }
}
CaseEditSubmitComponent.SHOW_SUMMARY_CONTENT_COMPARE_FUNCTION = (a, b) => {
    const aCaseField = a.show_summary_content_option === 0 || a.show_summary_content_option;
    const bCaseField = b.show_summary_content_option === 0 || b.show_summary_content_option;
    if (!aCaseField) {
        return !bCaseField ? 0 : 1;
    }
    if (!bCaseField) {
        return -1;
    }
    return a.show_summary_content_option - b.show_summary_content_option;
};
CaseEditSubmitComponent.ɵfac = function CaseEditSubmitComponent_Factory(t) { return new (t || CaseEditSubmitComponent)(i0.ɵɵdirectiveInject(i1.CaseEditComponent), i0.ɵɵdirectiveInject(i2.FieldsUtils), i0.ɵɵdirectiveInject(i2.CaseFieldService), i0.ɵɵdirectiveInject(i3.ActivatedRoute), i0.ɵɵdirectiveInject(i2.OrderService), i0.ɵɵdirectiveInject(i2.ProfileNotifier)); };
CaseEditSubmitComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseEditSubmitComponent, selectors: [["ccd-case-edit-submit"]], decls: 2, vars: 2, consts: [[4, "ngIf"], [3, "eventCompletionParams", "eventCanBeCompleted", 4, "ngIf"], [1, "govuk-heading-l"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["titleBlock", ""], ["idBlock", ""], [3, "error"], [3, "callbackErrorsSubject", "callbackErrorsContext"], [1, "check-your-answers", 3, "formGroup", "submit"], [1, "form-group", "form-group-related"], ["type", "button", 1, "button", "button-secondary", 3, "disabled", "click"], ["type", "submit", 1, "button", 3, "disabled"], [1, "cancel"], ["href", "javascript:void(0)", 3, "click"], [3, "content"], ["class", "heading-h2", 4, "ngIf"], [1, "heading-h2"], ["class", "text-16", 4, "ngIf"], ["aria-describedby", "check your answers table", 1, "form-table"], [4, "ngFor", "ngForOf"], [1, "text-16"], ["ccdLabelSubstitutor", "", 3, "caseField", "hidden", "formGroup", "contextFields"], ["class", "valign-top case-field-label", 4, "ngIf"], [1, "form-cell", "case-field-content"], [3, "formGroup", "topLevelFormGroup", "caseField", "context", "caseFields"], [1, "valign-top", "check-your-answers__change", "case-field-change"], ["href", "javascript:void(0)", 3, "click", 4, "ngIf"], [1, "valign-top", "case-field-label"], ["aria-describedby", "summary fields table", 1, "summary-fields"], [3, "ngSwitch"], ["ccdLabelSubstitutor", "", 3, "caseField", "formGroup", "contextFields", 4, "ngSwitchCase"], ["class", "compound-field", "ccdLabelSubstitutor", "", 3, "caseField", "formGroup", "contextFields", 4, "ngSwitchCase"], ["ccdLabelSubstitutor", "", 3, "caseField", "formGroup", "contextFields"], ["id", "summary-field-label"], [1, "form-cell"], [3, "formGroup", "caseField"], ["ccdLabelSubstitutor", "", 1, "compound-field", 3, "caseField", "formGroup", "contextFields"], ["colspan", "2"], [3, "formGroup", "caseField", "caseFields"], ["id", "fieldset-event", "formGroupName", "event", 4, "ngIf"], ["id", "fieldset-event", "formGroupName", "event"], [2, "display", "none"], [1, "form-group"], ["for", "field-trigger-summary", 1, "form-label"], [1, "form-hint"], ["type", "text", "id", "field-trigger-summary", "formControlName", "summary", "maxlength", "1024", 1, "form-control", "bottom-30", "width-50"], ["for", "field-trigger-description", 1, "form-label"], ["id", "field-trigger-description", "formControlName", "description", "maxlength", "65536", 1, "form-control", "bottom-30", "width-50"], [3, "eventCompletionParams", "eventCanBeCompleted"]], template: function CaseEditSubmitComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseEditSubmitComponent_div_0_Template, 22, 16, "div", 0);
        i0.ɵɵtemplate(1, CaseEditSubmitComponent_ccd_case_event_completion_1_Template, 1, 1, "ccd-case-event-completion", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.caseEdit.isEventCompletionChecksRequired);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseEdit.isEventCompletionChecksRequired);
    } }, styles: ["#fieldset-case-data[_ngcontent-%COMP%]{margin-bottom:30px}#fieldset-case-data[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{width:1%;white-space:nowrap;vertical-align:top}.compound-field[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:0}#confirmation-header[_ngcontent-%COMP%]{width:630px;background-color:#17958b;border:solid 1px #979797;color:#fff;text-align:center}#confirmation-body[_ngcontent-%COMP%]{width:630px;background-color:#fff}.valign-top[_ngcontent-%COMP%]{vertical-align:top}.summary-fields[_ngcontent-%COMP%]{margin-bottom:30px}.summary-fields[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .summary-fields[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-bottom:0px}a.disabled[_ngcontent-%COMP%]{pointer-events:none;cursor:default}.case-field-label[_ngcontent-%COMP%]{width:45%}.case-field-content[_ngcontent-%COMP%]{width:50%}.case-field-change[_ngcontent-%COMP%]{width:5%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseEditSubmitComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-edit-submit', template: "<div *ngIf=\"!caseEdit.isEventCompletionChecksRequired\">\n  <!-- Event trigger name -->\n  <h1 class=\"govuk-heading-l\">{{ eventTrigger.name}}</h1>\n\n  <!--Case ID or Title -->\n  <div *ngIf=\"getCaseTitle(); then titleBlock; else idBlock\"></div>\n  <ng-template #titleBlock>\n    <ccd-markdown [content]=\"getCaseTitle() | ccdCaseTitle: contextFields : editForm.controls['data']\"></ccd-markdown>\n  </ng-template>\n  <ng-template #idBlock>\n    <h2 *ngIf=\"getCaseId()\" class=\"heading-h2\">#{{ getCaseId() | ccdCaseReference }}</h2>\n  </ng-template>\n\n  <ccd-case-edit-generic-errors [error]=\"caseEdit.error\"></ccd-case-edit-generic-errors>\n\n  <ccd-callback-errors [callbackErrorsSubject]=\"caseEdit.callbackErrorsSubject\"\n                      (callbackErrorsContext)=\"callbackErrorsNotify($event)\"></ccd-callback-errors>\n\n  <form class=\"check-your-answers\" [formGroup]=\"editForm\" (submit)=\"submit()\">\n    <ng-container *ngIf=\"checkYourAnswerFieldsToDisplayExists()\">\n\n      <h2 class=\"heading-h2\">{{pageTitle | rpxTranslate }}</h2>\n      <span class=\"text-16\" *ngIf=\"!caseEdit.isCaseFlagSubmission\">{{'Check the information below carefully.' | rpxTranslate}}</span>\n\n      <table class=\"form-table\" aria-describedby=\"check your answers table\">\n        <tbody>\n        <ng-container *ngFor=\"let page of wizard.pages\">\n          <ng-container *ngIf=\"isShown(page)\">\n            <ng-container *ngFor=\"let field of page\n            | ccdPageFields: editForm\n            | ccdReadFieldsFilter: false :undefined :true : editForm.controls['data']\n            | ccdCYAPageLabelFilter\">\n              <ng-container *ngIf=\"canShowFieldInCYA(field)\">\n                <tr ccdLabelSubstitutor [caseField]=\"field\" [hidden]=\"field.hidden\"\n                    [formGroup]=\"editForm.controls['data']\" [contextFields]=\"contextFields\">\n                  <th *ngIf=\"!isLabel(field) && !caseEdit.isCaseFlagSubmission\" class=\"valign-top case-field-label\"><span class=\"text-16\">{{field.label}}</span></th>\n                  <td class=\"form-cell case-field-content\" [attr.colspan]=\"isLabel(field) ? '2' : '1'\">\n                    <ccd-field-read\n                      [formGroup]=\"editForm.controls['data']\" [topLevelFormGroup]=\"editForm.controls['data']\"\n                      [caseField]=\"summaryCaseField(field)\" [context]=\"paletteContext\" [caseFields]=\"contextFields\"></ccd-field-read>\n                  </td>\n                  <td class=\"valign-top check-your-answers__change case-field-change\">\n                    <a *ngIf=\"isChangeAllowed(field)\" (click)=\"navigateToPage(page.id)\"\n                      href=\"javascript:void(0)\"><span class=\"text-16\" attr.aria-label=\"Change {{ field.label }}\">Change</span></a>\n                  </td>\n                </tr>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n        </tbody>\n      </table>\n    </ng-container>\n    <ng-container *ngIf=\"readOnlySummaryFieldsToDisplayExists()\">\n\n      <table class=\"summary-fields\" aria-describedby=\"summary fields table\">\n        <tbody>\n          <ng-container *ngFor=\"let field of showSummaryFields\">\n              <ng-container [ngSwitch]=\"!(field | ccdIsCompound)\">\n                <tr *ngSwitchCase=\"true\" ccdLabelSubstitutor [caseField]=\"field\" [formGroup]=\"editForm.controls['data']\" [contextFields]=\"contextFields\">\n                  <th id=\"summary-field-label\">{{field.label}}</th>\n                  <td class=\"form-cell\">\n                    <ccd-field-read [formGroup]=\"editForm.controls['data']\" [caseField]=\"summaryCaseField(field)\"></ccd-field-read>\n                  </td>\n                </tr>\n                <tr *ngSwitchCase=\"false\" class=\"compound-field\" ccdLabelSubstitutor [caseField]=\"field\" [formGroup]=\"editForm.controls['data']\" [contextFields]=\"contextFields\">\n                  <td colspan=\"2\">\n                    <ccd-field-read [formGroup]=\"editForm.controls['data']\" [caseField]=\"summaryCaseField(field)\" [caseFields]=\"contextFields\"></ccd-field-read>\n                  </td>\n                </tr>\n              </ng-container>\n            </ng-container>\n        </tbody>\n      </table>\n    </ng-container>\n    <ng-container *ngIf=\"showEventNotes()\">\n      <fieldset id=\"fieldset-event\" formGroupName=\"event\" *ngIf=\"profile && !isSolicitor()\">\n        <legend style=\"display: none;\"></legend>\n        <div class=\"form-group\">\n          <label for=\"field-trigger-summary\" class=\"form-label\">\n            Event summary (optional)\n            <span class=\"form-hint\">A few words describing the purpose of the event.</span>\n          </label>\n          <input type=\"text\" id=\"field-trigger-summary\" class=\"form-control bottom-30 width-50\" formControlName=\"summary\" maxlength=\"1024\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"field-trigger-description\" class=\"form-label\">Event description (optional)</label>\n          <textarea id=\"field-trigger-description\" class=\"form-control bottom-30 width-50\" formControlName=\"description\"\n                    maxlength=\"65536\"></textarea>\n        </div>\n      </fieldset>\n    </ng-container>\n    <div class=\"form-group form-group-related\">\n      <button class=\"button button-secondary\" type=\"button\" [disabled]=\"!hasPrevious() || caseEdit.isSubmitting\" (click)=\"previous()\">Previous</button>\n      <button type=\"submit\" [disabled]=\"isDisabled\" class=\"button\">{{triggerText}}</button>\n    </div>\n    <p class=\"cancel\"><a (click)=\"cancel()\" href=\"javascript:void(0)\" [class.disabled]=\"caseEdit.isSubmitting\">{{getCancelText()}}</a></p>\n  </form>\n</div>\n<ccd-case-event-completion *ngIf=\"caseEdit.isEventCompletionChecksRequired\"\n  [eventCompletionParams]=\"caseEdit.eventCompletionParams\"\n  (eventCanBeCompleted)=\"onEventCanBeCompleted($event)\">\n</ccd-case-event-completion>\n", styles: ["#fieldset-case-data{margin-bottom:30px}#fieldset-case-data th{width:1%;white-space:nowrap;vertical-align:top}.compound-field td{padding:0}#confirmation-header{width:630px;background-color:#17958b;border:solid 1px #979797;color:#fff;text-align:center}#confirmation-body{width:630px;background-color:#fff}.valign-top{vertical-align:top}.summary-fields{margin-bottom:30px}.summary-fields tbody tr th,.summary-fields tbody tr td{border-bottom:0px}a.disabled{pointer-events:none;cursor:default}.case-field-label{width:45%}.case-field-content{width:50%}.case-field-change{width:5%}\n"] }]
    }], function () { return [{ type: i1.CaseEditComponent }, { type: i2.FieldsUtils }, { type: i2.CaseFieldService }, { type: i3.ActivatedRoute }, { type: i2.OrderService }, { type: i2.ProfileNotifier }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1lZGl0LXN1Ym1pdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS1lZGl0b3IvY2FzZS1lZGl0LXN1Ym1pdC9jYXNlLWVkaXQtc3VibWl0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWVkaXQtc3VibWl0L2Nhc2UtZWRpdC1zdWJtaXQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUU3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFJakQsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixXQUFXLEVBQ1gsWUFBWSxFQUNaLGVBQWUsR0FDaEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsdUJBQXVCLEVBQXlCLE1BQU0sYUFBYSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7OztJQ1ZuRSxzQkFBaUU7OztJQUUvRCxtQ0FBa0g7Ozs7SUFBcEcsNkhBQW9GOzs7SUFHbEcsOEJBQTJDO0lBQUEsWUFBcUM7O0lBQUEsaUJBQUs7OztJQUExQyxlQUFxQztJQUFyQyx5RUFBcUM7OztJQUFoRiwyRkFBcUY7OztJQUFoRix5Q0FBaUI7OztJQVlwQixnQ0FBNkQ7SUFBQSxZQUEyRDs7SUFBQSxpQkFBTzs7SUFBbEUs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QUMsRUFBRSxDQUFDLENBQUM7SUFDeEcsQ0FBQztJQUVNLGFBQWE7UUFDbEIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRTtZQUNwQyxPQUFPLHFCQUFxQixDQUFDO1NBQzlCO2FBQU07WUFDTCxPQUFPLFFBQVEsQ0FBQztTQUNqQjtJQUNILENBQUM7O0FBeE5zQiw2REFBcUMsR0FBRyxDQUFDLENBQVksRUFBRSxDQUFZLEVBQVUsRUFBRTtJQUNwRyxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsMkJBQTJCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztJQUN4RixNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsMkJBQTJCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztJQUV4RixJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUI7SUFFRCxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUNYO0lBQ0QsT0FBTyxDQUFDLENBQUMsMkJBQTJCLEdBQUcsQ0FBQyxDQUFDLDJCQUEyQixDQUFDO0FBQ3ZFLENBQUMsQ0FBQTs4RkF6QlUsdUJBQXVCOzBFQUF2Qix1QkFBdUI7UUN4QnBDLDBFQWtHTTtRQUNOLG9IQUc0Qjs7UUF0R3RCLG9FQUErQztRQW1HekIsZUFBOEM7UUFBOUMsbUVBQThDOzt1RkQzRTdELHVCQUF1QjtjQUxuQyxTQUFTOzJCQUNFLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENhc2VFdmVudFRyaWdnZXIsIENhc2VGaWVsZCwgUHJvZmlsZSB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbic7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL3dvcmstYWxsb2NhdGlvbi9UYXNrJztcbmltcG9ydCB7XG4gIENhc2VGaWVsZFNlcnZpY2UsXG4gIEZpZWxkc1V0aWxzLFxuICBPcmRlclNlcnZpY2UsXG4gIFByb2ZpbGVOb3RpZmllcixcbn0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHsgQ2FsbGJhY2tFcnJvcnNDb21wb25lbnQsIENhbGxiYWNrRXJyb3JzQ29udGV4dCB9IGZyb20gJy4uLy4uL2Vycm9yJztcbmltcG9ydCB7IFBhbGV0dGVDb250ZXh0IH0gZnJvbSAnLi4vLi4vcGFsZXR0ZSc7XG5pbXBvcnQgeyBDYXNlRWRpdFBhZ2VDb21wb25lbnQgfSBmcm9tICcuLi9jYXNlLWVkaXQtcGFnZS9jYXNlLWVkaXQtcGFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FzZUVkaXRDb21wb25lbnQgfSBmcm9tICcuLi9jYXNlLWVkaXQvY2FzZS1lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXaXphcmQsIFdpemFyZFBhZ2UgfSBmcm9tICcuLi9kb21haW4nO1xuXG4vLyBAZHluYW1pY1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWNhc2UtZWRpdC1zdWJtaXQnLFxuICB0ZW1wbGF0ZVVybDogJ2Nhc2UtZWRpdC1zdWJtaXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuLi9jYXNlLWVkaXQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhc2VFZGl0U3VibWl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwdWJsaWMgZXZlbnRUcmlnZ2VyOiBDYXNlRXZlbnRUcmlnZ2VyO1xuICBwdWJsaWMgZWRpdEZvcm06IFVudHlwZWRGb3JtR3JvdXA7XG4gIHB1YmxpYyB0cmlnZ2VyVGV4dDogc3RyaW5nO1xuICBwdWJsaWMgd2l6YXJkOiBXaXphcmQ7XG4gIHB1YmxpYyBwcm9maWxlOiBQcm9maWxlO1xuICBwdWJsaWMgc2hvd1N1bW1hcnlGaWVsZHM6IENhc2VGaWVsZFtdO1xuICBwdWJsaWMgcGFsZXR0ZUNvbnRleHQ6IFBhbGV0dGVDb250ZXh0ID0gUGFsZXR0ZUNvbnRleHQuQ0hFQ0tfWU9VUl9BTlNXRVI7XG4gIHB1YmxpYyBwcm9maWxlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBjb250ZXh0RmllbGRzOiBDYXNlRmllbGRbXTtcbiAgcHVibGljIHRhc2s6IFRhc2s7XG4gIHB1YmxpYyBwYWdlVGl0bGU6IHN0cmluZztcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFNIT1dfU1VNTUFSWV9DT05URU5UX0NPTVBBUkVfRlVOQ1RJT04gPSAoYTogQ2FzZUZpZWxkLCBiOiBDYXNlRmllbGQpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGFDYXNlRmllbGQgPSBhLnNob3dfc3VtbWFyeV9jb250ZW50X29wdGlvbiA9PT0gMCB8fCBhLnNob3dfc3VtbWFyeV9jb250ZW50X29wdGlvbjtcbiAgICBjb25zdCBiQ2FzZUZpZWxkID0gYi5zaG93X3N1bW1hcnlfY29udGVudF9vcHRpb24gPT09IDAgfHwgYi5zaG93X3N1bW1hcnlfY29udGVudF9vcHRpb247XG5cbiAgICBpZiAoIWFDYXNlRmllbGQpIHtcbiAgICAgIHJldHVybiAhYkNhc2VGaWVsZCA/IDAgOiAxO1xuICAgIH1cblxuICAgIGlmICghYkNhc2VGaWVsZCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICByZXR1cm4gYS5zaG93X3N1bW1hcnlfY29udGVudF9vcHRpb24gLSBiLnNob3dfc3VtbWFyeV9jb250ZW50X29wdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAvLyBFVUktMzQ1Mi5cbiAgICAvLyBXZSBkb24ndCBuZWVkIHRvIGNoZWNrIHRoZSB2YWxpZGl0eSBvZiB0aGUgZWRpdEZvcm0gYXMgaXQgaXMgcmVhZG9ubHkuXG4gICAgLy8gVGhpcyB3YXMgY2F1c2luZyBpc3N1ZXMgd2l0aCBoaWRkZW4gZmllbGRzIHRoYXQgYXJlbid0IHdhbnRlZCBidXQgaGF2ZVxuICAgIC8vIG5vdCBiZWVuIGRpc2FibGVkLlxuICAgIHJldHVybiB0aGlzLmNhc2VFZGl0LmlzU3VibWl0dGluZyB8fCB0aGlzLmhhc0Vycm9ycztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyByZWFkb25seSBjYXNlRWRpdDogQ2FzZUVkaXRDb21wb25lbnQsXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaWVsZHNVdGlsczogRmllbGRzVXRpbHMsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXNlRmllbGRTZXJ2aWNlOiBDYXNlRmllbGRTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgb3JkZXJTZXJ2aWNlOiBPcmRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBwcm9maWxlTm90aWZpZXI6IFByb2ZpbGVOb3RpZmllcixcbiAgKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5wcm9maWxlU3Vic2NyaXB0aW9uID0gdGhpcy5wcm9maWxlTm90aWZpZXIucHJvZmlsZS5zdWJzY3JpYmUoXyA9PiB0aGlzLnByb2ZpbGUgPSBfKTtcbiAgICB0aGlzLmV2ZW50VHJpZ2dlciA9IHRoaXMuY2FzZUVkaXQuZXZlbnRUcmlnZ2VyO1xuICAgIHRoaXMudHJpZ2dlclRleHQgPSB0aGlzLmV2ZW50VHJpZ2dlci5lbmRfYnV0dG9uX2xhYmVsIHx8IENhbGxiYWNrRXJyb3JzQ29tcG9uZW50LlRSSUdHRVJfVEVYVF9TVUJNSVQ7XG4gICAgdGhpcy5lZGl0Rm9ybSA9IHRoaXMuY2FzZUVkaXQuZm9ybTtcbiAgICB0aGlzLndpemFyZCA9IHRoaXMuY2FzZUVkaXQud2l6YXJkO1xuICAgIHRoaXMuc2hvd1N1bW1hcnlGaWVsZHMgPSB0aGlzLnNvcnRGaWVsZHNCeVNob3dTdW1tYXJ5Q29udGVudCh0aGlzLmV2ZW50VHJpZ2dlci5jYXNlX2ZpZWxkcyk7XG4gICAgdGhpcy5jYXNlRWRpdC5pc1N1Ym1pdHRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNvbnRleHRGaWVsZHMgPSB0aGlzLmdldENhc2VGaWVsZHMoKTtcbiAgICAvLyBJbmRpY2F0ZXMgaWYgdGhlIHN1Ym1pc3Npb24gaXMgZm9yIGEgQ2FzZSBGbGFnLCBhcyBvcHBvc2VkIHRvIGEgXCJyZWd1bGFyXCIgZm9ybSBzdWJtaXNzaW9uLCBieSB0aGUgcHJlc2VuY2Ugb2ZcbiAgICAvLyBhIEZsYWdMYXVuY2hlciBmaWVsZCBpbiB0aGUgZXZlbnQgdHJpZ2dlclxuICAgIHRoaXMuY2FzZUVkaXQuaXNDYXNlRmxhZ1N1Ym1pc3Npb24gPVxuICAgICAgdGhpcy5ldmVudFRyaWdnZXIuY2FzZV9maWVsZHMuc29tZShjYXNlRmllbGQgPT4gRmllbGRzVXRpbHMuaXNDYXNlRmllbGRPZlR5cGUoY2FzZUZpZWxkLCBbJ0ZsYWdMYXVuY2hlciddKSk7XG4gICAgdGhpcy5jYXNlRWRpdC5pc0xpbmtlZENhc2VzU3VibWlzc2lvbiA9XG4gICAgICB0aGlzLmV2ZW50VHJpZ2dlci5jYXNlX2ZpZWxkcy5zb21lKGNhc2VGaWVsZCA9PiBGaWVsZHNVdGlscy5pc0Nhc2VGaWVsZE9mVHlwZShjYXNlRmllbGQsIFsnQ29tcG9uZW50TGF1bmNoZXInXSkpO1xuICAgIHRoaXMucGFnZVRpdGxlID0gdGhpcy5jYXNlRWRpdC5pc0Nhc2VGbGFnU3VibWlzc2lvbiA/ICdSZXZpZXcgZmxhZyBkZXRhaWxzJyA6ICdDaGVjayB5b3VyIGFuc3dlcnMnO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHRoaXMucHJvZmlsZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5wcm9maWxlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN1Ym1pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNhc2VFZGl0LnN1Ym1pdEZvcm0oe1xuICAgICAgZXZlbnRUcmlnZ2VyOiB0aGlzLmV2ZW50VHJpZ2dlcixcbiAgICAgIGZvcm06IHRoaXMuZWRpdEZvcm0sXG4gICAgICBzdWJtaXQ6IHRoaXMuY2FzZUVkaXQuc3VibWl0LFxuICAgICAgY2FzZURldGFpbHM6IHRoaXMuY2FzZUVkaXQuY2FzZURldGFpbHMsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25FdmVudENhbkJlQ29tcGxldGVkKGV2ZW50Q2FuQmVDb21wbGV0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmNhc2VFZGl0Lm9uRXZlbnRDYW5CZUNvbXBsZXRlZCh7XG4gICAgICBldmVudFRyaWdnZXI6IHRoaXMuZXZlbnRUcmlnZ2VyLFxuICAgICAgZXZlbnRDYW5CZUNvbXBsZXRlZCxcbiAgICAgIGNhc2VEZXRhaWxzOiB0aGlzLmNhc2VFZGl0LmNhc2VEZXRhaWxzLFxuICAgICAgZm9ybTogdGhpcy5lZGl0Rm9ybSxcbiAgICAgIHN1Ym1pdDogdGhpcy5jYXNlRWRpdC5zdWJtaXQsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldCBoYXNFcnJvcnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FzZUVkaXQ/LmVycm9yPy5jYWxsYmFja0Vycm9ycz8ubGVuZ3RoO1xuICB9XG5cbiAgcHVibGljIG5hdmlnYXRlVG9QYWdlKHBhZ2VJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jYXNlRWRpdC5uYXZpZ2F0ZVRvUGFnZShwYWdlSWQpO1xuICB9XG5cbiAgcHVibGljIGNhbGxiYWNrRXJyb3JzTm90aWZ5KGVycm9yQ29udGV4dDogQ2FsbGJhY2tFcnJvcnNDb250ZXh0KTogdm9pZCB7XG4gICAgdGhpcy5jYXNlRWRpdC5pZ25vcmVXYXJuaW5nID0gZXJyb3JDb250ZXh0Lmlnbm9yZVdhcm5pbmc7XG4gICAgdGhpcy50cmlnZ2VyVGV4dCA9IGVycm9yQ29udGV4dC50cmlnZ2VyVGV4dDtcbiAgfVxuXG4gIHB1YmxpYyBzdW1tYXJ5Q2FzZUZpZWxkKGZpZWxkOiBDYXNlRmllbGQpOiBDYXNlRmllbGQge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKG51bGwgPT09IHRoaXMuZWRpdEZvcm0uZ2V0KCdkYXRhJykuZ2V0KGZpZWxkLmlkKSkge1xuICAgICAgLy8gSWYgbm90IGluIGZvcm0sIHJldHVybiBmaWVsZCBpdHNlbGZcbiAgICAgIHJldHVybiBmaWVsZDtcbiAgICB9XG5cbiAgICBjb25zdCBjbG9uZUZpZWxkOiBDYXNlRmllbGQgPSB0aGlzLmZpZWxkc1V0aWxzLmNsb25lQ2FzZUZpZWxkKGZpZWxkKTtcbiAgICBjbG9uZUZpZWxkLnZhbHVlID0gdGhpcy5lZGl0Rm9ybS5nZXQoJ2RhdGEnKS5nZXQoZmllbGQuaWQpLnZhbHVlO1xuXG4gICAgcmV0dXJuIGNsb25lRmllbGQ7XG4gIH1cblxuICBwdWJsaWMgY2FuY2VsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmV2ZW50VHJpZ2dlci5jYW5fc2F2ZV9kcmFmdCkge1xuICAgICAgaWYgKHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbU1hcC5nZXQoQ2FzZUVkaXRDb21wb25lbnQuT1JJR0lOX1FVRVJZX1BBUkFNKSA9PT0gJ3ZpZXdEcmFmdCcpIHtcbiAgICAgICAgdGhpcy5jYXNlRWRpdC5jYW5jZWxsZWQuZW1pdCh7IHN0YXR1czogQ2FzZUVkaXRQYWdlQ29tcG9uZW50LlJFU1VNRURfRk9STV9ESVNDQVJEIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYXNlRWRpdC5jYW5jZWxsZWQuZW1pdCh7IHN0YXR1czogQ2FzZUVkaXRQYWdlQ29tcG9uZW50Lk5FV19GT1JNX0RJU0NBUkQgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FzZUVkaXQuY2FuY2VsbGVkLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNMYWJlbChmaWVsZDogQ2FzZUZpZWxkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FzZUZpZWxkU2VydmljZS5pc0xhYmVsKGZpZWxkKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0NoYW5nZUFsbG93ZWQoZmllbGQ6IENhc2VGaWVsZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5jYXNlRmllbGRTZXJ2aWNlLmlzUmVhZE9ubHkoZmllbGQpO1xuICB9XG5cbiAgcHVibGljIGNoZWNrWW91ckFuc3dlckZpZWxkc1RvRGlzcGxheUV4aXN0cygpOiBib29sZWFuIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmICh0aGlzLmV2ZW50VHJpZ2dlci5zaG93X3N1bW1hcnkgfHwgdGhpcy5ldmVudFRyaWdnZXIuc2hvd19zdW1tYXJ5ID09PSBudWxsKSB7XG4gICAgICBmb3IgKGNvbnN0IHBhZ2Ugb2YgdGhpcy53aXphcmQucGFnZXMpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHBhZ2UuY2FzZV9maWVsZHMgJiYgdGhpcy5pc1Nob3duKHBhZ2UpKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBwYWdlLmNhc2VfZmllbGRzKSB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FuU2hvd0ZpZWxkSW5DWUEoZmllbGQpKSB7XG4gICAgICAgICAgICAgIC8vIGF0IGxlYXN0IG9uZSBmaWVsZCBuZWVkcyBzaG93aW5nXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmb3VuZCBubyBmaWVsZHMgdG8gc2hvdyBpbiBDWUEgc3VtbWFyeSBwYWdlXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlYWRPbmx5U3VtbWFyeUZpZWxkc1RvRGlzcGxheUV4aXN0cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFRyaWdnZXIuY2FzZV9maWVsZHMuc29tZShmaWVsZCA9PiBmaWVsZC5zaG93X3N1bW1hcnlfY29udGVudF9vcHRpb24gPj0gMCk7XG4gIH1cblxuICBwdWJsaWMgc2hvd0V2ZW50Tm90ZXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5ldmVudFRyaWdnZXIuc2hvd19ldmVudF9ub3RlcztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TGFzdFBhZ2VTaG93bigpOiBXaXphcmRQYWdlIHtcbiAgICBsZXQgbGFzdFBhZ2U6IFdpemFyZFBhZ2U7XG4gICAgdGhpcy53aXphcmQucmV2ZXJzZSgpLmZvckVhY2gocGFnZSA9PiB7XG4gICAgICBpZiAoIWxhc3RQYWdlICYmIHRoaXMuaXNTaG93bihwYWdlKSkge1xuICAgICAgICBsYXN0UGFnZSA9IHBhZ2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuICAgIHJldHVybiBsYXN0UGFnZTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2aW91cygpOiB2b2lkIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmICh0aGlzLmhhc1ByZXZpb3VzKCkpIHtcbiAgICAgIHRoaXMubmF2aWdhdGVUb1BhZ2UodGhpcy5nZXRMYXN0UGFnZVNob3duKCkuaWQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYXNQcmV2aW91cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmdldExhc3RQYWdlU2hvd24oKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1Nob3duKHBhZ2U6IFdpemFyZFBhZ2UpOiBib29sZWFuIHtcbiAgICBjb25zdCBmaWVsZHMgPSB0aGlzLmZpZWxkc1V0aWxzXG4gICAgICAubWVyZ2VDYXNlRmllbGRzQW5kRm9ybUZpZWxkcyh0aGlzLmV2ZW50VHJpZ2dlci5jYXNlX2ZpZWxkcywgdGhpcy5lZGl0Rm9ybS5jb250cm9sc1snZGF0YSddLnZhbHVlKTtcbiAgICByZXR1cm4gcGFnZS5wYXJzZWRTaG93Q29uZGl0aW9uLm1hdGNoKGZpZWxkcyk7XG4gIH1cblxuICBwdWJsaWMgY2FuU2hvd0ZpZWxkSW5DWUEoZmllbGQ6IENhc2VGaWVsZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmaWVsZC5zaG93X3N1bW1hcnlfY2hhbmdlX29wdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBpc1NvbGljaXRvcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wcm9maWxlLmlzU29saWNpdG9yKCk7XG4gIH1cblxuICBwcml2YXRlIHNvcnRGaWVsZHNCeVNob3dTdW1tYXJ5Q29udGVudChmaWVsZHM6IENhc2VGaWVsZFtdKTogQ2FzZUZpZWxkW10ge1xuICAgIHJldHVybiB0aGlzLm9yZGVyU2VydmljZVxuICAgICAgLnNvcnQoZmllbGRzLCBDYXNlRWRpdFN1Ym1pdENvbXBvbmVudC5TSE9XX1NVTU1BUllfQ09OVEVOVF9DT01QQVJFX0ZVTkNUSU9OKVxuICAgICAgLmZpbHRlcihjZiA9PiBjZi5zaG93X3N1bW1hcnlfY29udGVudF9vcHRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDYXNlRmllbGRzKCk6IENhc2VGaWVsZFtdIHtcbiAgICBpZiAodGhpcy5jYXNlRWRpdC5jYXNlRGV0YWlscykge1xuICAgICAgcmV0dXJuIEZpZWxkc1V0aWxzLmdldENhc2VGaWVsZHModGhpcy5jYXNlRWRpdC5jYXNlRGV0YWlscyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRUcmlnZ2VyLmNhc2VfZmllbGRzO1xuICB9XG5cbiAgcHVibGljIGdldENhc2VJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNhc2VFZGl0LmdldENhc2VJZCh0aGlzLmNhc2VFZGl0LmNhc2VEZXRhaWxzKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYXNlVGl0bGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMuY2FzZUVkaXQuY2FzZURldGFpbHMgJiYgdGhpcy5jYXNlRWRpdC5jYXNlRGV0YWlscy5zdGF0ZSAmJlxuICAgICAgdGhpcy5jYXNlRWRpdC5jYXNlRGV0YWlscy5zdGF0ZS50aXRsZV9kaXNwbGF5ID8gdGhpcy5jYXNlRWRpdC5jYXNlRGV0YWlscy5zdGF0ZS50aXRsZV9kaXNwbGF5IDogJycpO1xuICB9XG5cbiAgcHVibGljIGdldENhbmNlbFRleHQoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5ldmVudFRyaWdnZXIuY2FuX3NhdmVfZHJhZnQpIHtcbiAgICAgIHJldHVybiAnUmV0dXJuIHRvIGNhc2UgbGlzdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnQ2FuY2VsJztcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCIhY2FzZUVkaXQuaXNFdmVudENvbXBsZXRpb25DaGVja3NSZXF1aXJlZFwiPlxuICA8IS0tIEV2ZW50IHRyaWdnZXIgbmFtZSAtLT5cbiAgPGgxIGNsYXNzPVwiZ292dWstaGVhZGluZy1sXCI+e3sgZXZlbnRUcmlnZ2VyLm5hbWV9fTwvaDE+XG5cbiAgPCEtLUNhc2UgSUQgb3IgVGl0bGUgLS0+XG4gIDxkaXYgKm5nSWY9XCJnZXRDYXNlVGl0bGUoKTsgdGhlbiB0aXRsZUJsb2NrOyBlbHNlIGlkQmxvY2tcIj48L2Rpdj5cbiAgPG5nLXRlbXBsYXRlICN0aXRsZUJsb2NrPlxuICAgIDxjY2QtbWFya2Rvd24gW2NvbnRlbnRdPVwiZ2V0Q2FzZVRpdGxlKCkgfCBjY2RDYXNlVGl0bGU6IGNvbnRleHRGaWVsZHMgOiBlZGl0Rm9ybS5jb250cm9sc1snZGF0YSddXCI+PC9jY2QtbWFya2Rvd24+XG4gIDwvbmctdGVtcGxhdGU+XG4gIDxuZy10ZW1wbGF0ZSAjaWRCbG9jaz5cbiAgICA8aDIgKm5nSWY9XCJnZXRDYXNlSWQoKVwiIGNsYXNzPVwiaGVhZGluZy1oMlwiPiN7eyBnZXRDYXNlSWQoKSB8IGNjZENhc2VSZWZlcmVuY2UgfX08L2gyPlxuICA8L25nLXRlbXBsYXRlPlxuXG4gIDxjY2QtY2FzZS1lZGl0LWdlbmVyaWMtZXJyb3JzIFtlcnJvcl09XCJjYXNlRWRpdC5lcnJvclwiPjwvY2NkLWNhc2UtZWRpdC1nZW5lcmljLWVycm9ycz5cblxuICA8Y2NkLWNhbGxiYWNrLWVycm9ycyBbY2FsbGJhY2tFcnJvcnNTdWJqZWN0XT1cImNhc2VFZGl0LmNhbGxiYWNrRXJyb3JzU3ViamVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgKGNhbGxiYWNrRXJyb3JzQ29udGV4dCk9XCJjYWxsYmFja0Vycm9yc05vdGlmeSgkZXZlbnQpXCI+PC9jY2QtY2FsbGJhY2stZXJyb3JzPlxuXG4gIDxmb3JtIGNsYXNzPVwiY2hlY2steW91ci1hbnN3ZXJzXCIgW2Zvcm1Hcm91cF09XCJlZGl0Rm9ybVwiIChzdWJtaXQpPVwic3VibWl0KClcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY2hlY2tZb3VyQW5zd2VyRmllbGRzVG9EaXNwbGF5RXhpc3RzKClcIj5cblxuICAgICAgPGgyIGNsYXNzPVwiaGVhZGluZy1oMlwiPnt7cGFnZVRpdGxlIHwgcnB4VHJhbnNsYXRlIH19PC9oMj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC0xNlwiICpuZ0lmPVwiIWNhc2VFZGl0LmlzQ2FzZUZsYWdTdWJtaXNzaW9uXCI+e3snQ2hlY2sgdGhlIGluZm9ybWF0aW9uIGJlbG93IGNhcmVmdWxseS4nIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+XG5cbiAgICAgIDx0YWJsZSBjbGFzcz1cImZvcm0tdGFibGVcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiY2hlY2sgeW91ciBhbnN3ZXJzIHRhYmxlXCI+XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgcGFnZSBvZiB3aXphcmQucGFnZXNcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNTaG93bihwYWdlKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGQgb2YgcGFnZVxuICAgICAgICAgICAgfCBjY2RQYWdlRmllbGRzOiBlZGl0Rm9ybVxuICAgICAgICAgICAgfCBjY2RSZWFkRmllbGRzRmlsdGVyOiBmYWxzZSA6dW5kZWZpbmVkIDp0cnVlIDogZWRpdEZvcm0uY29udHJvbHNbJ2RhdGEnXVxuICAgICAgICAgICAgfCBjY2RDWUFQYWdlTGFiZWxGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNhblNob3dGaWVsZEluQ1lBKGZpZWxkKVwiPlxuICAgICAgICAgICAgICAgIDx0ciBjY2RMYWJlbFN1YnN0aXR1dG9yIFtjYXNlRmllbGRdPVwiZmllbGRcIiBbaGlkZGVuXT1cImZpZWxkLmhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgIFtmb3JtR3JvdXBdPVwiZWRpdEZvcm0uY29udHJvbHNbJ2RhdGEnXVwiIFtjb250ZXh0RmllbGRzXT1cImNvbnRleHRGaWVsZHNcIj5cbiAgICAgICAgICAgICAgICAgIDx0aCAqbmdJZj1cIiFpc0xhYmVsKGZpZWxkKSAmJiAhY2FzZUVkaXQuaXNDYXNlRmxhZ1N1Ym1pc3Npb25cIiBjbGFzcz1cInZhbGlnbi10b3AgY2FzZS1maWVsZC1sYWJlbFwiPjxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7ZmllbGQubGFiZWx9fTwvc3Bhbj48L3RoPlxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiZm9ybS1jZWxsIGNhc2UtZmllbGQtY29udGVudFwiIFthdHRyLmNvbHNwYW5dPVwiaXNMYWJlbChmaWVsZCkgPyAnMicgOiAnMSdcIj5cbiAgICAgICAgICAgICAgICAgICAgPGNjZC1maWVsZC1yZWFkXG4gICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Hcm91cF09XCJlZGl0Rm9ybS5jb250cm9sc1snZGF0YSddXCIgW3RvcExldmVsRm9ybUdyb3VwXT1cImVkaXRGb3JtLmNvbnRyb2xzWydkYXRhJ11cIlxuICAgICAgICAgICAgICAgICAgICAgIFtjYXNlRmllbGRdPVwic3VtbWFyeUNhc2VGaWVsZChmaWVsZClcIiBbY29udGV4dF09XCJwYWxldHRlQ29udGV4dFwiIFtjYXNlRmllbGRzXT1cImNvbnRleHRGaWVsZHNcIj48L2NjZC1maWVsZC1yZWFkPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInZhbGlnbi10b3AgY2hlY2steW91ci1hbnN3ZXJzX19jaGFuZ2UgY2FzZS1maWVsZC1jaGFuZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJpc0NoYW5nZUFsbG93ZWQoZmllbGQpXCIgKGNsaWNrKT1cIm5hdmlnYXRlVG9QYWdlKHBhZ2UuaWQpXCJcbiAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCIgYXR0ci5hcmlhLWxhYmVsPVwiQ2hhbmdlIHt7IGZpZWxkLmxhYmVsIH19XCI+Q2hhbmdlPC9zcGFuPjwvYT5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJyZWFkT25seVN1bW1hcnlGaWVsZHNUb0Rpc3BsYXlFeGlzdHMoKVwiPlxuXG4gICAgICA8dGFibGUgY2xhc3M9XCJzdW1tYXJ5LWZpZWxkc1wiIGFyaWEtZGVzY3JpYmVkYnk9XCJzdW1tYXJ5IGZpZWxkcyB0YWJsZVwiPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGQgb2Ygc2hvd1N1bW1hcnlGaWVsZHNcIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiIShmaWVsZCB8IGNjZElzQ29tcG91bmQpXCI+XG4gICAgICAgICAgICAgICAgPHRyICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCIgY2NkTGFiZWxTdWJzdGl0dXRvciBbY2FzZUZpZWxkXT1cImZpZWxkXCIgW2Zvcm1Hcm91cF09XCJlZGl0Rm9ybS5jb250cm9sc1snZGF0YSddXCIgW2NvbnRleHRGaWVsZHNdPVwiY29udGV4dEZpZWxkc1wiPlxuICAgICAgICAgICAgICAgICAgPHRoIGlkPVwic3VtbWFyeS1maWVsZC1sYWJlbFwiPnt7ZmllbGQubGFiZWx9fTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJmb3JtLWNlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGNjZC1maWVsZC1yZWFkIFtmb3JtR3JvdXBdPVwiZWRpdEZvcm0uY29udHJvbHNbJ2RhdGEnXVwiIFtjYXNlRmllbGRdPVwic3VtbWFyeUNhc2VGaWVsZChmaWVsZClcIj48L2NjZC1maWVsZC1yZWFkPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0ciAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIiBjbGFzcz1cImNvbXBvdW5kLWZpZWxkXCIgY2NkTGFiZWxTdWJzdGl0dXRvciBbY2FzZUZpZWxkXT1cImZpZWxkXCIgW2Zvcm1Hcm91cF09XCJlZGl0Rm9ybS5jb250cm9sc1snZGF0YSddXCIgW2NvbnRleHRGaWVsZHNdPVwiY29udGV4dEZpZWxkc1wiPlxuICAgICAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxjY2QtZmllbGQtcmVhZCBbZm9ybUdyb3VwXT1cImVkaXRGb3JtLmNvbnRyb2xzWydkYXRhJ11cIiBbY2FzZUZpZWxkXT1cInN1bW1hcnlDYXNlRmllbGQoZmllbGQpXCIgW2Nhc2VGaWVsZHNdPVwiY29udGV4dEZpZWxkc1wiPjwvY2NkLWZpZWxkLXJlYWQ+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzaG93RXZlbnROb3RlcygpXCI+XG4gICAgICA8ZmllbGRzZXQgaWQ9XCJmaWVsZHNldC1ldmVudFwiIGZvcm1Hcm91cE5hbWU9XCJldmVudFwiICpuZ0lmPVwicHJvZmlsZSAmJiAhaXNTb2xpY2l0b3IoKVwiPlxuICAgICAgICA8bGVnZW5kIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj48L2xlZ2VuZD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwiZmllbGQtdHJpZ2dlci1zdW1tYXJ5XCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+XG4gICAgICAgICAgICBFdmVudCBzdW1tYXJ5IChvcHRpb25hbClcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1oaW50XCI+QSBmZXcgd29yZHMgZGVzY3JpYmluZyB0aGUgcHVycG9zZSBvZiB0aGUgZXZlbnQuPC9zcGFuPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJmaWVsZC10cmlnZ2VyLXN1bW1hcnlcIiBjbGFzcz1cImZvcm0tY29udHJvbCBib3R0b20tMzAgd2lkdGgtNTBcIiBmb3JtQ29udHJvbE5hbWU9XCJzdW1tYXJ5XCIgbWF4bGVuZ3RoPVwiMTAyNFwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwiZmllbGQtdHJpZ2dlci1kZXNjcmlwdGlvblwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPkV2ZW50IGRlc2NyaXB0aW9uIChvcHRpb25hbCk8L2xhYmVsPlxuICAgICAgICAgIDx0ZXh0YXJlYSBpZD1cImZpZWxkLXRyaWdnZXItZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm0tY29udHJvbCBib3R0b20tMzAgd2lkdGgtNTBcIiBmb3JtQ29udHJvbE5hbWU9XCJkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIG1heGxlbmd0aD1cIjY1NTM2XCI+PC90ZXh0YXJlYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2ZpZWxkc2V0PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGZvcm0tZ3JvdXAtcmVsYXRlZFwiPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tc2Vjb25kYXJ5XCIgdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCIhaGFzUHJldmlvdXMoKSB8fCBjYXNlRWRpdC5pc1N1Ym1pdHRpbmdcIiAoY2xpY2spPVwicHJldmlvdXMoKVwiPlByZXZpb3VzPC9idXR0b24+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBbZGlzYWJsZWRdPVwiaXNEaXNhYmxlZFwiIGNsYXNzPVwiYnV0dG9uXCI+e3t0cmlnZ2VyVGV4dH19PC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPHAgY2xhc3M9XCJjYW5jZWxcIj48YSAoY2xpY2spPVwiY2FuY2VsKClcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgW2NsYXNzLmRpc2FibGVkXT1cImNhc2VFZGl0LmlzU3VibWl0dGluZ1wiPnt7Z2V0Q2FuY2VsVGV4dCgpfX08L2E+PC9wPlxuICA8L2Zvcm0+XG48L2Rpdj5cbjxjY2QtY2FzZS1ldmVudC1jb21wbGV0aW9uICpuZ0lmPVwiY2FzZUVkaXQuaXNFdmVudENvbXBsZXRpb25DaGVja3NSZXF1aXJlZFwiXG4gIFtldmVudENvbXBsZXRpb25QYXJhbXNdPVwiY2FzZUVkaXQuZXZlbnRDb21wbGV0aW9uUGFyYW1zXCJcbiAgKGV2ZW50Q2FuQmVDb21wbGV0ZWQpPVwib25FdmVudENhbkJlQ29tcGxldGVkKCRldmVudClcIj5cbjwvY2NkLWNhc2UtZXZlbnQtY29tcGxldGlvbj5cbiJdfQ==