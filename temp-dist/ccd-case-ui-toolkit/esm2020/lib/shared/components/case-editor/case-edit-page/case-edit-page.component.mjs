import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CaseEditDataService } from '../../../commons/case-edit-data';
import { DRAFT_PREFIX } from '../../../domain/draft.model';
import { LoadingService } from '../../../services';
import { CaseFieldService } from '../../../services/case-fields/case-field.service';
import { FieldsUtils } from '../../../services/fields';
import { FormErrorService } from '../../../services/form/form-error.service';
import { FormValueService } from '../../../services/form/form-value.service';
import { SaveOrDiscardDialogComponent } from '../../dialogs/save-or-discard-dialog';
import { initDialog } from '../../helpers';
import { CaseEditComponent } from '../case-edit/case-edit.component';
import { PageValidationService } from '../services/page-validation.service';
import * as i0 from "@angular/core";
import * as i1 from "../case-edit/case-edit.component";
import * as i2 from "@angular/router";
import * as i3 from "../../../services/form/form-value.service";
import * as i4 from "../../../services/form/form-error.service";
import * as i5 from "../services/page-validation.service";
import * as i6 from "@angular/material/dialog";
import * as i7 from "../../../services/case-fields/case-field.service";
import * as i8 from "../../../commons/case-edit-data";
import * as i9 from "../../../services";
function CaseEditPageComponent_ng_container_0_h1_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r9.eventTrigger.name));
} }
function CaseEditPageComponent_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 12);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h1", 11);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, ctx_r10.eventTrigger.name));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 4, ctx_r10.currentPage.label));
} }
function CaseEditPageComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CaseEditPageComponent_ng_container_0_h1_1_Template, 3, 3, "h1", 10);
    i0.ɵɵtemplate(2, CaseEditPageComponent_ng_container_0_ng_container_2_Template, 7, 6, "ng-container", 0);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.currentPage.label);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.currentPage.label);
} }
function CaseEditPageComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div");
} }
function CaseEditPageComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-markdown", 13);
    i0.ɵɵpipe(1, "ccdCaseTitle");
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("content", i0.ɵɵpipeBind3(1, 1, ctx_r3.getCaseTitle(), ctx_r3.caseFields, ctx_r3.editForm.controls["data"]));
} }
function CaseEditPageComponent_ng_template_4_h2_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2", 15);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdCaseReference");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("#", i0.ɵɵpipeBind1(2, 1, ctx_r11.getCaseId()), "");
} }
function CaseEditPageComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CaseEditPageComponent_ng_template_4_h2_0_Template, 3, 3, "h2", 14);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", ctx_r5.getCaseId());
} }
function CaseEditPageComponent_div_6_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 19)(1, "ul", 20)(2, "li")(3, "a", 21);
    i0.ɵɵlistener("click", function CaseEditPageComponent_div_6_div_4_Template_a_click_3_listener() { const restoredCtx = i0.ɵɵrestoreView(_r15); const validationError_r13 = restoredCtx.$implicit; const ctx_r14 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r14.navigateToErrorElement(validationError_r13.id)); });
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "rpxTranslate");
    i0.ɵɵpipe(6, "rpxTranslate");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const validationError_r13 = ctx.$implicit;
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind3(5, 1, validationError_r13.message, ctx_r12.getRpxTranslatePipeArgs(i0.ɵɵpipeBind1(6, 5, validationError_r13.label)), null), " ");
} }
function CaseEditPageComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "h2", 17);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, CaseEditPageComponent_div_6_div_4_Template, 7, 7, "div", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 2, "There is a problem"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r6.validationErrors);
} }
function CaseEditPageComponent_form_10_ccd_case_edit_form_3_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccd-case-edit-form", 32);
    i0.ɵɵlistener("valuesChanged", function CaseEditPageComponent_form_10_ccd_case_edit_form_3_Template_ccd_case_edit_form_valuesChanged_0_listener($event) { i0.ɵɵrestoreView(_r19); const ctx_r18 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r18.applyValuesChanged($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("fields", ctx_r16.currentPage.getCol1Fields())("formGroup", ctx_r16.editForm.controls["data"])("caseFields", ctx_r16.caseFields)("pageChangeSubject", ctx_r16.pageChangeSubject);
} }
function CaseEditPageComponent_form_10_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33)(1, "div", 34);
    i0.ɵɵelement(2, "ccd-case-edit-form", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 36);
    i0.ɵɵelement(4, "ccd-case-edit-form", 37);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("fields", ctx_r17.currentPage.getCol1Fields())("formGroup", ctx_r17.editForm.controls["data"])("caseFields", ctx_r17.caseFields);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("fields", ctx_r17.currentPage.getCol2Fields())("formGroup", ctx_r17.editForm.controls["data"])("caseFields", ctx_r17.caseFields);
} }
function CaseEditPageComponent_form_10_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 22);
    i0.ɵɵlistener("submit", function CaseEditPageComponent_form_10_Template_form_submit_0_listener() { i0.ɵɵrestoreView(_r21); const ctx_r20 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r20.submit()); });
    i0.ɵɵelementStart(1, "fieldset", 23);
    i0.ɵɵelement(2, "legend", 24);
    i0.ɵɵtemplate(3, CaseEditPageComponent_form_10_ccd_case_edit_form_3_Template, 1, 4, "ccd-case-edit-form", 25);
    i0.ɵɵtemplate(4, CaseEditPageComponent_form_10_div_4_Template, 5, 6, "div", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 27)(6, "button", 28);
    i0.ɵɵlistener("click", function CaseEditPageComponent_form_10_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r21); const ctx_r22 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r22.toPreviousPage()); });
    i0.ɵɵpipe(7, "async");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 29);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "p", 30)(14, "a", 31);
    i0.ɵɵlistener("click", function CaseEditPageComponent_form_10_Template_a_click_14_listener() { i0.ɵɵrestoreView(_r21); const ctx_r23 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r23.cancel()); });
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "rpxTranslate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r7.editForm);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r7.currentPage.isMultiColumn());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.currentPage.isMultiColumn());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !i0.ɵɵpipeBind1(7, 8, ctx_r7.hasPreviousPage$));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 10, "Previous"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r7.submitting());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 12, ctx_r7.triggerText));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 14, ctx_r7.getCancelText()));
} }
function CaseEditPageComponent_ccd_case_event_completion_11_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccd-case-event-completion", 38);
    i0.ɵɵlistener("eventCanBeCompleted", function CaseEditPageComponent_ccd_case_event_completion_11_Template_ccd_case_event_completion_eventCanBeCompleted_0_listener($event) { i0.ɵɵrestoreView(_r25); const ctx_r24 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r24.onEventCanBeCompleted($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵproperty("eventCompletionParams", ctx_r8.caseEdit.eventCompletionParams);
} }
export class CaseEditPageComponent {
    constructor(caseEdit, route, formValueService, formErrorService, cdRef, pageValidationService, dialog, caseFieldService, caseEditDataService, loadingService) {
        this.caseEdit = caseEdit;
        this.route = route;
        this.formValueService = formValueService;
        this.formErrorService = formErrorService;
        this.cdRef = cdRef;
        this.pageValidationService = pageValidationService;
        this.dialog = dialog;
        this.caseFieldService = caseFieldService;
        this.caseEditDataService = caseEditDataService;
        this.loadingService = loadingService;
        this.triggerTextStart = CaseEditPageComponent.TRIGGER_TEXT_START;
        this.triggerTextIgnoreWarnings = CaseEditPageComponent.TRIGGER_TEXT_CONTINUE;
        this.formValuesChanged = false;
        this.pageChangeSubject = new Subject();
        this.validationErrors = [];
        this.hasPreviousPage$ = new BehaviorSubject(false);
        this.callbackErrorsSubject = new Subject();
    }
    static scrollToTop() {
        window.scrollTo(0, 0);
    }
    static setFocusToTop() {
        const topContainer = document.getElementById('top');
        if (topContainer) {
            topContainer.focus();
        }
    }
    ngOnInit() {
        initDialog();
        this.eventTrigger = this.caseEdit.eventTrigger;
        this.editForm = this.caseEdit.form;
        this.wizard = this.caseEdit.wizard;
        this.caseFields = this.getCaseFields();
        this.syncCaseEditDataService();
        this.routeParamsSub = this.route.params
            .subscribe(params => {
            const pageId = params['page'];
            /* istanbul ignore else */
            if (!this.currentPage || pageId !== this.currentPage?.id) {
                const page = this.caseEdit.getPage(pageId);
                if (page) {
                    this.currentPage = page;
                }
                else {
                    if (this.currentPage) {
                        return this.next();
                    }
                    else {
                        return this.first();
                    }
                }
                this.hasPreviousPage$.next(this.caseEdit.hasPrevious(this.currentPage?.id));
            }
            this.triggerText = this.getTriggerText();
        });
        CaseEditPageComponent.setFocusToTop();
        this.caseEditFormSub = this.caseEditDataService.caseEditForm$.subscribe({
            next: editForm => this.editForm = editForm
        });
        this.caseIsLinkedCasesJourneyAtFinalStepSub =
            this.caseEditDataService.caseIsLinkedCasesJourneyAtFinalStep$.subscribe({
                next: isLinkedCasesJourneyAtFinalStep => this.isLinkedCasesJourneyAtFinalStep = isLinkedCasesJourneyAtFinalStep
            });
        this.caseTriggerSubmitEventSub = this.caseEditDataService.caseTriggerSubmitEvent$.subscribe({
            next: state => {
                if (state) {
                    this.caseEditDataService.setTriggerSubmitEvent(false);
                    this.submit();
                }
            }
        });
    }
    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }
    ngOnDestroy() {
        this.routeParamsSub?.unsubscribe();
        this.caseEditFormSub?.unsubscribe();
        this.caseIsLinkedCasesJourneyAtFinalStepSub?.unsubscribe();
        this.caseTriggerSubmitEventSub?.unsubscribe();
        this.validateSub?.unsubscribe();
        this.dialogRefAfterClosedSub?.unsubscribe();
        this.saveDraftSub?.unsubscribe();
        this.caseFormValidationErrorsSub?.unsubscribe();
    }
    applyValuesChanged(valuesChanged) {
        this.formValuesChanged = valuesChanged;
    }
    first() {
        return this.caseEdit.first();
    }
    currentPageIsNotValid() {
        return !this.pageValidationService.isPageValid(this.currentPage, this.editForm) ||
            (this.isLinkedCasesJourney() && !this.isLinkedCasesJourneyAtFinalStep);
    }
    isLinkedCasesJourney() {
        return FieldsUtils.containsLinkedCasesCaseField(this.currentPage.case_fields);
    }
    /**
     * caseEventData.event_data contains all the values from the previous pages so we set caseEventData.data = caseEventData.event_data
     * This builds the form with data from the previous pages
     * EUI-3732 - Breathing space data not persisted on Previous button click with ExpUI Demo
     */
    toPreviousPage() {
        this.caseEditDataService.clearFormValidationErrors();
        const caseEventData = this.buildCaseEventData(true);
        caseEventData.data = caseEventData.event_data;
        this.updateFormData(caseEventData);
        this.previous();
        CaseEditPageComponent.setFocusToTop();
    }
    // Adding validation message to show it as Error Summary
    generateErrorMessage(fields, container, path) {
        const group = container || this.editForm.controls['data'];
        fields.filter(casefield => !this.caseFieldService.isReadOnly(casefield))
            .filter(casefield => !this.pageValidationService.isHidden(casefield, this.editForm, path))
            .forEach(casefield => {
            const fieldElement = FieldsUtils.isCaseFieldOfType(casefield, ['JudicialUser'])
                ? group.get(`${casefield.id}_judicialUserControl`)
                : group.get(casefield.id);
            if (fieldElement) {
                const label = casefield.label || 'Field';
                let id = casefield.id;
                if (fieldElement['component'] && fieldElement['component'].parent) {
                    if (fieldElement['component'].idPrefix.indexOf(`_${id}_`) === -1) {
                        id = `${fieldElement['component'].idPrefix}${id}`;
                    }
                    else {
                        id = `${fieldElement['component'].idPrefix}`;
                    }
                }
                if (fieldElement.hasError('required')) {
                    this.caseEditDataService.addFormValidationError({ id, message: `%FIELDLABEL% is required`, label });
                    fieldElement.markAsDirty();
                    // For the JudicialUser field type, an error needs to be set on the component so that an error message
                    // can be displayed at field level
                    if (FieldsUtils.isCaseFieldOfType(casefield, ['JudicialUser'])) {
                        fieldElement['component'].errors = { required: true };
                    }
                }
                else if (fieldElement.hasError('pattern')) {
                    this.caseEditDataService.addFormValidationError({ id, message: `%FIELDLABEL% is not valid`, label });
                    fieldElement.markAsDirty();
                }
                else if (fieldElement.hasError('minlength')) {
                    this.caseEditDataService.addFormValidationError({ id, message: `%FIELDLABEL% is below the minimum length`, label });
                    fieldElement.markAsDirty();
                }
                else if (fieldElement.hasError('maxlength')) {
                    this.caseEditDataService.addFormValidationError({ id, message: `%FIELDLABEL% exceeds the maximum length`, label });
                    fieldElement.markAsDirty();
                }
                else if (fieldElement.invalid) {
                    if (casefield.isComplex()) {
                        this.generateErrorMessage(casefield.field_type.complex_fields, fieldElement, id);
                    }
                    else if (casefield.isCollection() && casefield.field_type.collection_field_type.type === 'Complex') {
                        const fieldArray = fieldElement;
                        if (fieldArray['component'] && fieldArray['component']['collItems'] && fieldArray['component']['collItems'].length > 0) {
                            id = `${fieldArray['component']['collItems'][0].prefix}`;
                        }
                        fieldArray.controls.forEach((c) => {
                            this.generateErrorMessage(casefield.field_type.collection_field_type.complex_fields, c.get('value'), id);
                        });
                    }
                    else if (FieldsUtils.isCaseFieldOfType(casefield, ['FlagLauncher'])) {
                        // Check whether the case field DisplayContextParameter is signalling "create" mode or "update" mode
                        // (expected always to be one of the two), to set the correct error message
                        let action = '';
                        if (casefield.display_context_parameter === '#ARGUMENT(CREATE)') {
                            action = 'creation';
                        }
                        else if (casefield.display_context_parameter === '#ARGUMENT(UPDATE)') {
                            action = 'update';
                        }
                        this.validationErrors.push({
                            id,
                            message: `Please select Next to complete the ${action} of the ${action === 'update' ? 'selected ' : ''}case flag`
                        });
                    }
                    else {
                        this.validationErrors.push({ id, message: `Select or fill the required ${casefield.label} field` });
                        fieldElement.markAsDirty();
                    }
                }
            }
        });
        CaseEditPageComponent.scrollToTop();
    }
    navigateToErrorElement(elementId) {
        /* istanbul ignore else */
        if (elementId) {
            const htmlElement = document.getElementById(elementId);
            /* istanbul ignore else */
            if (htmlElement) {
                htmlElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                htmlElement.focus();
            }
        }
    }
    submit() {
        this.caseEditDataService.clearFormValidationErrors();
        if (this.currentPageIsNotValid()) {
            // The generateErrorMessage method filters out the hidden fields.
            // The error message for LinkedCases journey will never get displayed because the
            // LinkedCases is configured with ComponentLauncher field as visible and caseLinks field as hidden.
            if (this.isLinkedCasesJourney()) {
                this.validationErrors.push({ id: 'next-button', message: 'Please select Next to go to the next page' });
                CaseEditPageComponent.scrollToTop();
            }
            else {
                this.generateErrorMessage(this.currentPage.case_fields);
            }
        }
        if (!this.caseEdit.isSubmitting && !this.currentPageIsNotValid()) {
            this.caseEdit.isSubmitting = true;
            this.caseEdit.error = null;
            const caseEventData = this.buildCaseEventData();
            const loadingSpinnerToken = this.loadingService.register();
            this.validateSub = this.caseEdit.validate(caseEventData, this.currentPage.id)
                .pipe(finalize(() => {
                this.loadingService.unregister(loadingSpinnerToken);
            }))
                .subscribe((jsonData) => {
                /* istanbul ignore else */
                if (jsonData) {
                    this.updateFormData(jsonData);
                }
                this.saveDraft();
                this.next();
            }, error => {
                this.handleError(error);
            });
            CaseEditPageComponent.scrollToTop();
            // Remove all JudicialUser FormControls with the ID suffix "_judicialUserControl" because these are not
            // intended to be present in the Case Event data (they are added only for value selection and validation
            // purposes)
            this.removeAllJudicialUserFormControls(this.currentPage, this.editForm);
        }
        CaseEditPageComponent.setFocusToTop();
    }
    updateFormData(jsonData) {
        for (const caseFieldId of Object.keys(jsonData.data)) {
            /* istanbul ignore else */
            if (this.pageWithFieldExists(caseFieldId)) {
                this.updateEventTriggerCaseFields(caseFieldId, jsonData, this.caseEdit.eventTrigger);
                this.updateFormControlsValue(this.editForm, caseFieldId, jsonData.data[caseFieldId]);
            }
        }
    }
    // we do the check, becasue the data comes from the external source
    pageWithFieldExists(caseFieldId) {
        return this.wizard.findWizardPage(caseFieldId);
    }
    updateEventTriggerCaseFields(caseFieldId, jsonData, eventTrigger) {
        /* istanbul ignore else */
        if (eventTrigger?.case_fields) {
            eventTrigger.case_fields
                .filter(element => element.id === caseFieldId)
                .forEach(element => {
                if (this.isAnObject(element.value)) {
                    const updatedJsonDataObject = this.updateJsonDataObject(caseFieldId, jsonData, element);
                    element.value = {
                        ...element.value,
                        ...updatedJsonDataObject,
                    };
                }
                else {
                    element.value = jsonData.data[caseFieldId];
                }
            });
        }
    }
    updateJsonDataObject(caseFieldId, jsonData, element) {
        return Object.keys(jsonData.data[caseFieldId]).reduce((acc, key) => {
            const elementValue = element.value[key];
            const jsonDataValue = jsonData.data[caseFieldId][key];
            const hasElementGotValueProperty = this.isAnObject(elementValue) && elementValue.value !== undefined;
            const jsonDataOrElementValue = jsonDataValue?.value !== null && jsonDataValue?.value !== undefined ? jsonDataValue : elementValue;
            return {
                ...acc,
                [`${key}`]: hasElementGotValueProperty ? jsonDataOrElementValue : jsonDataValue
            };
        }, {});
    }
    isAnObject(property) {
        return typeof property === 'object' && !Array.isArray(property) && property !== null;
    }
    updateFormControlsValue(formGroup, caseFieldId, value) {
        const theControl = formGroup.controls['data'].get(caseFieldId);
        if (theControl && theControl['status'] !== 'DISABLED') {
            if (Array.isArray(theControl.value) && Array.isArray(value)
                && theControl.value.length > value.length && theControl['caseField']
                && theControl['caseField']['display_context'] && theControl['caseField']['display_context'] === 'OPTIONAL'
                && theControl['caseField']['field_type'] && theControl['caseField']['field_type']['type'] === 'Collection') {
                // do nothing
            }
            else {
                theControl.patchValue(value);
            }
        }
    }
    callbackErrorsNotify(errorContext) {
        this.caseEdit.ignoreWarning = errorContext.ignoreWarning;
        this.triggerText = errorContext.triggerText;
    }
    next() {
        if (this.canNavigateToSummaryPage()) {
            this.caseEdit.isSubmitting = false;
        }
        this.resetErrors();
        this.formValuesChanged = false;
        this.pageChangeSubject.next(true);
        return this.caseEdit.next(this.currentPage.id);
    }
    previous() {
        this.resetErrors();
        this.saveDraft();
        this.formValuesChanged = false;
        this.pageChangeSubject.next(true);
        return this.caseEdit.previous(this.currentPage.id);
    }
    hasPrevious() {
        return this.caseEdit.hasPrevious(this.currentPage.id);
    }
    cancel() {
        if (this.eventTrigger.can_save_draft) {
            if (this.formValuesChanged) {
                const dialogRef = this.dialog.open(SaveOrDiscardDialogComponent, this.dialogConfig);
                this.dialogRefAfterClosedSub = dialogRef.afterClosed().subscribe(result => {
                    if (result === 'Discard') {
                        this.discard();
                    }
                    else if (result === 'Save') {
                        const draftCaseEventData = this.formValueService.sanitise(this.editForm.value);
                        if (this.route.snapshot.queryParamMap.get(CaseEditComponent.ORIGIN_QUERY_PARAM) === 'viewDraft') {
                            this.caseEdit.cancelled.emit({ status: CaseEditPageComponent.RESUMED_FORM_SAVE, data: draftCaseEventData });
                        }
                        else {
                            this.caseEdit.cancelled.emit({ status: CaseEditPageComponent.NEW_FORM_SAVE, data: draftCaseEventData });
                        }
                    }
                });
            }
            else {
                this.discard();
            }
        }
        else {
            this.caseEdit.cancelled.emit();
        }
        this.caseEditDataService.clearFormValidationErrors();
    }
    submitting() {
        return this.caseEdit.isSubmitting;
    }
    getCaseId() {
        return (this.caseEdit.caseDetails ? this.caseEdit.caseDetails.case_id : '');
    }
    getCaseTitle() {
        return (this.caseEdit.caseDetails && this.caseEdit.caseDetails.state &&
            this.caseEdit.caseDetails.state.title_display ? this.caseEdit.caseDetails.state.title_display : '');
    }
    getCancelText() {
        return this.eventTrigger.can_save_draft ? 'Return to case list' : 'Cancel';
    }
    canNavigateToSummaryPage() {
        const nextPage = this.caseEdit.getNextPage({
            currentPageId: this.currentPage?.id,
            wizard: this.wizard,
            eventTrigger: this.eventTrigger,
            form: this.editForm
        });
        return this.eventTrigger.show_summary || !!nextPage;
    }
    getTriggerText() {
        const textBasedOnCanSaveDraft = this.eventTrigger && this.eventTrigger.can_save_draft
            ? CaseEditPageComponent.TRIGGER_TEXT_SAVE
            : CaseEditPageComponent.TRIGGER_TEXT_START;
        return this.canNavigateToSummaryPage()
            ? textBasedOnCanSaveDraft
            : 'Submit';
    }
    discard() {
        if (this.route.snapshot.queryParamMap.get(CaseEditComponent.ORIGIN_QUERY_PARAM) === 'viewDraft') {
            this.caseEdit.cancelled.emit({ status: CaseEditPageComponent.RESUMED_FORM_DISCARD });
        }
        else {
            this.caseEdit.cancelled.emit({ status: CaseEditPageComponent.NEW_FORM_DISCARD });
        }
    }
    handleError(error) {
        this.caseEdit.isSubmitting = false;
        this.caseEdit.error = error;
        this.caseEdit.callbackErrorsSubject.next(this.caseEdit.error);
        this.callbackErrorsSubject.next(this.caseEdit.error);
        /* istanbul ignore else */
        if (this.caseEdit.error.details) {
            this.formErrorService
                .mapFieldErrors(this.caseEdit.error.details.field_errors, this.editForm?.controls?.['data'], 'validation');
        }
    }
    resetErrors() {
        this.caseEdit.error = null;
        this.caseEdit.ignoreWarning = false;
        this.triggerText = this.getTriggerText();
        this.caseEdit.callbackErrorsSubject.next(null);
    }
    saveDraft() {
        if (this.eventTrigger.can_save_draft) {
            const draftCaseEventData = this.formValueService.sanitise(this.editForm.value);
            draftCaseEventData.event_token = this.eventTrigger.event_token;
            draftCaseEventData.ignore_warning = this.caseEdit.ignoreWarning;
            this.saveDraftSub = this.caseEdit.saveDraft(draftCaseEventData).subscribe((draft) => this.eventTrigger.case_id = DRAFT_PREFIX + draft.id, error => this.handleError(error));
        }
    }
    getCaseFields() {
        if (this.caseEdit.caseDetails) {
            return FieldsUtils.getCaseFields(this.caseEdit.caseDetails);
        }
        return this.eventTrigger.case_fields;
    }
    getCaseFieldsFromCurrentAndPreviousPages() {
        const result = [];
        this.wizard.pages.forEach(page => {
            if (page.order <= this.currentPage.order) {
                page.case_fields.forEach(field => result.push(field));
            }
        });
        return result;
    }
    buildCaseEventData(fromPreviousPage) {
        const formValue = this.editForm.value;
        // Get the CaseEventData for the current page.
        const pageFields = this.currentPage.case_fields;
        const pageEventData = this.getFilteredCaseEventData(pageFields, formValue, true);
        // Get the CaseEventData for the entire form (all pages).
        const allCaseFields = this.getCaseFieldsFromCurrentAndPreviousPages();
        const formEventData = this.getFilteredCaseEventData(allCaseFields, formValue, false, true, fromPreviousPage);
        // Now here's the key thing - the pageEventData has a property called `event_data` and
        // we need THAT to be the value of the entire form: `formEventData.data`.
        pageEventData.event_data = formEventData.data;
        // Finalise the CaseEventData object.
        pageEventData.event_token = this.eventTrigger.event_token;
        pageEventData.ignore_warning = this.caseEdit.ignoreWarning;
        // Finally, try to set up the case_reference.
        if (this.caseEdit.caseDetails) {
            pageEventData.case_reference = this.caseEdit.caseDetails.case_id;
        }
        // Return the now hopefully sane CaseEventData.
        return pageEventData;
    }
    /**
     * Abstracted this method from buildCaseEventData to remove duplication.
     * @param caseFields The fields to filter the data by.
     * @param formValue The original value of the form.
     * @param clearEmpty Whether or not to clear out empty values.
     * @param clearNonCase Whether or not to clear out fields that are not part of the case.
     * @returns CaseEventData for the specified parameters.
     */
    getFilteredCaseEventData(caseFields, formValue, clearEmpty = false, clearNonCase = false, fromPreviousPage = false) {
        // Get the data for the fields specified.
        const formFields = this.formValueService.filterCurrentPageFields(caseFields, formValue);
        // Sort out the dynamic lists.
        this.formValueService.sanitiseDynamicLists(caseFields, formFields);
        // Get hold of the CaseEventData.
        const caseEventData = this.formValueService.sanitise(formFields);
        // Tidy it up before we return it.
        this.formValueService.removeUnnecessaryFields(caseEventData.data, caseFields, clearEmpty, clearNonCase, fromPreviousPage, this.currentPage.case_fields);
        return caseEventData;
    }
    syncCaseEditDataService() {
        this.caseEditDataService.setCaseDetails(this.caseEdit.caseDetails);
        this.caseEditDataService.setCaseEventTriggerName(this.eventTrigger.name);
        this.caseEditDataService.setCaseTitle(this.getCaseTitle());
        this.caseEditDataService.setCaseEditForm(this.editForm);
        this.caseFormValidationErrorsSub = this.caseEditDataService.caseFormValidationErrors$.subscribe({
            next: (validationErrors) => this.validationErrors = validationErrors
        });
    }
    getRpxTranslatePipeArgs(fieldLabel) {
        return fieldLabel ? ({ FIELDLABEL: fieldLabel }) : null;
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
    removeAllJudicialUserFormControls(page, editForm) {
        page.case_fields.forEach(caseField => {
            if (FieldsUtils.isCaseFieldOfType(caseField, ['JudicialUser'])) {
                editForm.controls['data'].removeControl(`${caseField.id}_judicialUserControl`);
            }
        });
    }
}
CaseEditPageComponent.RESUMED_FORM_DISCARD = 'RESUMED_FORM_DISCARD';
CaseEditPageComponent.NEW_FORM_DISCARD = 'NEW_FORM_DISCARD';
CaseEditPageComponent.NEW_FORM_SAVE = 'NEW_FORM_CHANGED_SAVE';
CaseEditPageComponent.RESUMED_FORM_SAVE = 'RESUMED_FORM_SAVE';
CaseEditPageComponent.TRIGGER_TEXT_START = 'Continue';
CaseEditPageComponent.TRIGGER_TEXT_SAVE = 'Save and continue';
CaseEditPageComponent.TRIGGER_TEXT_CONTINUE = 'Ignore Warning and Continue';
CaseEditPageComponent.ɵfac = function CaseEditPageComponent_Factory(t) { return new (t || CaseEditPageComponent)(i0.ɵɵdirectiveInject(i1.CaseEditComponent), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i3.FormValueService), i0.ɵɵdirectiveInject(i4.FormErrorService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i5.PageValidationService), i0.ɵɵdirectiveInject(i6.MatDialog), i0.ɵɵdirectiveInject(i7.CaseFieldService), i0.ɵɵdirectiveInject(i8.CaseEditDataService), i0.ɵɵdirectiveInject(i9.LoadingService)); };
CaseEditPageComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseEditPageComponent, selectors: [["ccd-case-edit-page"]], decls: 12, vars: 11, consts: [[4, "ngIf"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["titleBlock", ""], ["idBlock", ""], ["class", "govuk-error-summary", "aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "govuk-error-summary", 4, "ngIf"], [3, "error"], [3, "triggerTextContinue", "triggerTextIgnore", "callbackErrorsSubject", "callbackErrorsContext"], [1, "width-50"], ["class", "form", 3, "formGroup", "submit", 4, "ngIf"], [3, "eventCompletionParams", "eventCanBeCompleted", 4, "ngIf"], ["class", "govuk-heading-l", 4, "ngIf"], [1, "govuk-heading-l"], [1, "govuk-caption-l"], [3, "content"], ["class", "heading-h2", 4, "ngIf"], [1, "heading-h2"], ["aria-labelledby", "error-summary-title", "role", "alert", "tabindex", "-1", "data-module", "govuk-error-summary", 1, "govuk-error-summary"], ["id", "error-summary-title", 1, "govuk-error-summary__title"], ["class", "govuk-error-summary__body", 4, "ngFor", "ngForOf"], [1, "govuk-error-summary__body"], [1, "govuk-list", "govuk-error-summary__list"], [1, "validation-error", 3, "click"], [1, "form", 3, "formGroup", "submit"], ["id", "fieldset-case-data"], [2, "display", "none"], ["id", "caseEditForm", 3, "fields", "formGroup", "caseFields", "pageChangeSubject", "valuesChanged", 4, "ngIf"], ["class", "grid-row", 4, "ngIf"], [1, "form-group", "form-group-related"], ["type", "button", 1, "button", "button-secondary", 3, "disabled", "click"], ["type", "submit", 1, "button", 3, "disabled"], [1, "cancel"], ["href", "javascript:void(0)", 3, "click"], ["id", "caseEditForm", 3, "fields", "formGroup", "caseFields", "pageChangeSubject", "valuesChanged"], [1, "grid-row"], [1, "column-two-thirds", "rightBorderSeparator"], ["id", "caseEditForm1", 3, "fields", "formGroup", "caseFields"], [1, "column-one-third"], ["id", "caseEditForm2", 3, "fields", "formGroup", "caseFields"], [3, "eventCompletionParams", "eventCanBeCompleted"]], template: function CaseEditPageComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseEditPageComponent_ng_container_0_Template, 3, 2, "ng-container", 0);
        i0.ɵɵtemplate(1, CaseEditPageComponent_div_1_Template, 1, 0, "div", 1);
        i0.ɵɵtemplate(2, CaseEditPageComponent_ng_template_2_Template, 2, 5, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(4, CaseEditPageComponent_ng_template_4_Template, 1, 1, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(6, CaseEditPageComponent_div_6_Template, 5, 4, "div", 4);
        i0.ɵɵelement(7, "ccd-case-edit-generic-errors", 5);
        i0.ɵɵelementStart(8, "ccd-callback-errors", 6);
        i0.ɵɵlistener("callbackErrorsContext", function CaseEditPageComponent_Template_ccd_callback_errors_callbackErrorsContext_8_listener($event) { return ctx.callbackErrorsNotify($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "div", 7);
        i0.ɵɵtemplate(10, CaseEditPageComponent_form_10_Template, 17, 16, "form", 8);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, CaseEditPageComponent_ccd_case_event_completion_11_Template, 1, 1, "ccd-case-event-completion", 9);
    } if (rf & 2) {
        const _r2 = i0.ɵɵreference(3);
        const _r4 = i0.ɵɵreference(5);
        i0.ɵɵproperty("ngIf", ctx.currentPage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.getCaseTitle())("ngIfThen", _r2)("ngIfElse", _r4);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", ctx.validationErrors.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("error", ctx.caseEdit.error);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("triggerTextContinue", ctx.triggerTextStart)("triggerTextIgnore", ctx.triggerTextIgnoreWarnings)("callbackErrorsSubject", ctx.caseEdit.callbackErrorsSubject);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.currentPage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseEdit.isEventCompletionChecksRequired);
    } }, styles: [".rightBorderSeparator[_ngcontent-%COMP%]{border-right-width:4px;border-right-color:#ffcc02;border-right-style:solid}.validation-error[_ngcontent-%COMP%]{cursor:pointer;text-decoration:underline;color:#d4351c}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseEditPageComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-edit-page', template: "<ng-container *ngIf=\"currentPage\">\n  <h1 *ngIf=\"!currentPage.label\" class=\"govuk-heading-l\">{{eventTrigger.name | rpxTranslate}}</h1>\n  <ng-container *ngIf=\"currentPage.label\">\n    <span class=\"govuk-caption-l\">{{ eventTrigger.name | rpxTranslate}}</span>\n    <h1 class=\"govuk-heading-l\">{{currentPage.label | rpxTranslate}}</h1>\n  </ng-container>\n</ng-container>\n\n<!--Case ID or Title -->\n<div *ngIf=\"getCaseTitle(); then titleBlock; else idBlock\"></div>\n<ng-template #titleBlock>\n  <ccd-markdown [content]=\"getCaseTitle() | ccdCaseTitle: caseFields : editForm.controls['data']\"></ccd-markdown>\n</ng-template>\n<ng-template #idBlock>\n  <h2 *ngIf=\"getCaseId()\" class=\"heading-h2\">#{{ getCaseId() | ccdCaseReference }}</h2>\n</ng-template>\n\n<!-- Error message summary -->\n<div *ngIf=\"validationErrors.length > 0\" class=\"govuk-error-summary\" aria-labelledby=\"error-summary-title\" role=\"alert\" tabindex=\"-1\" data-module=\"govuk-error-summary\">\n  <h2 class=\"govuk-error-summary__title\" id=\"error-summary-title\">\n    {{'There is a problem' | rpxTranslate}}\n  </h2>\n  <div *ngFor=\"let validationError of validationErrors\" class=\"govuk-error-summary__body\">\n    <ul class=\"govuk-list govuk-error-summary__list\">\n      <li>\n        <a (click)=\"navigateToErrorElement(validationError.id)\" class=\"validation-error\">\n          {{ validationError.message | rpxTranslate: getRpxTranslatePipeArgs(validationError.label | rpxTranslate): null }}\n        </a>\n      </li>\n    </ul>\n  </div>\n</div>\n\n<ccd-case-edit-generic-errors [error]=\"caseEdit.error\"></ccd-case-edit-generic-errors>\n\n<ccd-callback-errors\n  [triggerTextContinue]=\"triggerTextStart\"\n  [triggerTextIgnore]=\"triggerTextIgnoreWarnings\"\n  [callbackErrorsSubject]=\"caseEdit.callbackErrorsSubject\"\n  (callbackErrorsContext)=\"callbackErrorsNotify($event)\">\n</ccd-callback-errors>\n<div class=\"width-50\">\n  <form *ngIf=\"currentPage\" class=\"form\" [formGroup]=\"editForm\" (submit)=\"submit()\">\n    <fieldset id=\"fieldset-case-data\">\n      <legend style=\"display: none;\"></legend>\n      <!-- single column -->\n      <ccd-case-edit-form id='caseEditForm' *ngIf=\"!currentPage.isMultiColumn()\" [fields]=\"currentPage.getCol1Fields()\"\n                          [formGroup]=\"editForm.controls['data']\" [caseFields]=\"caseFields\"\n                          [pageChangeSubject]=\"pageChangeSubject\"\n                          (valuesChanged)=\"applyValuesChanged($event)\"></ccd-case-edit-form>\n      <!-- two columns -->\n      <div *ngIf=\"currentPage.isMultiColumn()\" class=\"grid-row\">\n        <div class=\"column-two-thirds rightBorderSeparator\">\n          <ccd-case-edit-form id='caseEditForm1' [fields]=\"currentPage.getCol1Fields()\"\n                              [formGroup]=\"editForm.controls['data']\" [caseFields]=\"caseFields\"></ccd-case-edit-form>\n        </div>\n        <div class=\"column-one-third\">\n          <ccd-case-edit-form id='caseEditForm2' [fields]=\"currentPage.getCol2Fields()\"\n                              [formGroup]=\"editForm.controls['data']\" [caseFields]=\"caseFields\"></ccd-case-edit-form>\n        </div>\n      </div>\n    </fieldset>\n\n    <div class=\"form-group form-group-related\">\n      <button class=\"button button-secondary\" type=\"button\" [disabled]=\"!(hasPreviousPage$ | async)\" (click)=\"toPreviousPage()\">\n        {{'Previous' | rpxTranslate}}\n      </button>\n      <button class=\"button\" type=\"submit\" [disabled]=\"submitting()\">{{triggerText | rpxTranslate}}</button>\n    </div>\n\n    <p class=\"cancel\"><a (click)=\"cancel()\" href=\"javascript:void(0)\">{{getCancelText() | rpxTranslate}}</a></p>\n  </form>\n</div>\n\n<ccd-case-event-completion *ngIf=\"caseEdit.isEventCompletionChecksRequired\"\n  [eventCompletionParams]=\"caseEdit.eventCompletionParams\"\n  (eventCanBeCompleted)=\"onEventCanBeCompleted($event)\">\n</ccd-case-event-completion>\n", styles: [".rightBorderSeparator{border-right-width:4px;border-right-color:#ffcc02;border-right-style:solid}.validation-error{cursor:pointer;text-decoration:underline;color:#d4351c}\n"] }]
    }], function () { return [{ type: i1.CaseEditComponent }, { type: i2.ActivatedRoute }, { type: i3.FormValueService }, { type: i4.FormErrorService }, { type: i0.ChangeDetectorRef }, { type: i5.PageValidationService }, { type: i6.MatDialog }, { type: i7.CaseFieldService }, { type: i8.CaseEditDataService }, { type: i9.LoadingService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1lZGl0LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Nhc2UtZWRpdG9yL2Nhc2UtZWRpdC1wYWdlL2Nhc2UtZWRpdC1wYWdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWVkaXQtcGFnZS9jYXNlLWVkaXQtcGFnZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0IsaUJBQWlCLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUVsRyxPQUFPLEVBQUUsU0FBUyxFQUFtQixNQUFNLDBCQUEwQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBMkIsTUFBTSxpQ0FBaUMsQ0FBQztBQUkvRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwy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dCI6WyJpbXBvcnQgeyBBZnRlclZpZXdDaGVja2VkLCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQXJyYXksIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmluYWxpemUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYXNlRWRpdERhdGFTZXJ2aWNlLCBDYXNlRWRpdFZhbGlkYXRpb25FcnJvciB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbnMvY2FzZS1lZGl0LWRhdGEnO1xuaW1wb3J0IHsgQ2FzZUV2ZW50RGF0YSB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jYXNlLWV2ZW50LWRhdGEubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZUV2ZW50VHJpZ2dlciB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcvY2FzZS1ldmVudC10cmlnZ2VyLm1vZGVsJztcbmltcG9ydCB7IENhc2VGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uJztcbmltcG9ydCB7IERSQUZUX1BSRUZJWCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9kcmFmdC5tb2RlbCc7XG5pbXBvcnQgeyBMb2FkaW5nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzJztcbmltcG9ydCB7IENhc2VGaWVsZFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9jYXNlLWZpZWxkcy9jYXNlLWZpZWxkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmllbGRzVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9maWVsZHMnO1xuaW1wb3J0IHsgRm9ybUVycm9yU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2Zvcm0vZm9ybS1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1WYWx1ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9mb3JtL2Zvcm0tdmFsdWUuc2VydmljZSc7XG5pbXBvcnQgeyBTYXZlT3JEaXNjYXJkRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vZGlhbG9ncy9zYXZlLW9yLWRpc2NhcmQtZGlhbG9nJztcbmltcG9ydCB7IENhbGxiYWNrRXJyb3JzQ29udGV4dCB9IGZyb20gJy4uLy4uL2Vycm9yL2RvbWFpbi9lcnJvci1jb250ZXh0JztcbmltcG9ydCB7IGluaXREaWFsb2cgfSBmcm9tICcuLi8uLi9oZWxwZXJzJztcbmltcG9ydCB7IENhc2VFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi4vY2FzZS1lZGl0L2Nhc2UtZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2l6YXJkUGFnZSB9IGZyb20gJy4uL2RvbWFpbi93aXphcmQtcGFnZS5tb2RlbCc7XG5pbXBvcnQgeyBXaXphcmQgfSBmcm9tICcuLi9kb21haW4vd2l6YXJkLm1vZGVsJztcbmltcG9ydCB7IFBhZ2VWYWxpZGF0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BhZ2UtdmFsaWRhdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWNhc2UtZWRpdC1wYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICdjYXNlLWVkaXQtcGFnZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FzZS1lZGl0LXBhZ2Uuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhc2VFZGl0UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBSRVNVTUVEX0ZPUk1fRElTQ0FSRCA9ICdSRVNVTUVEX0ZPUk1fRElTQ0FSRCc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTkVXX0ZPUk1fRElTQ0FSRCA9ICdORVdfRk9STV9ESVNDQVJEJztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBORVdfRk9STV9TQVZFID0gJ05FV19GT1JNX0NIQU5HRURfU0FWRSc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUkVTVU1FRF9GT1JNX1NBVkUgPSAnUkVTVU1FRF9GT1JNX1NBVkUnO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFRSSUdHRVJfVEVYVF9TVEFSVCA9ICdDb250aW51ZSc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVFJJR0dFUl9URVhUX1NBVkUgPSAnU2F2ZSBhbmQgY29udGludWUnO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFRSSUdHRVJfVEVYVF9DT05USU5VRSA9ICdJZ25vcmUgV2FybmluZyBhbmQgQ29udGludWUnO1xuXG4gIHB1YmxpYyBldmVudFRyaWdnZXI6IENhc2VFdmVudFRyaWdnZXI7XG4gIHB1YmxpYyBlZGl0Rm9ybTogVW50eXBlZEZvcm1Hcm91cDtcbiAgcHVibGljIHdpemFyZDogV2l6YXJkO1xuICBwdWJsaWMgY3VycmVudFBhZ2U6IFdpemFyZFBhZ2U7XG4gIHB1YmxpYyBkaWFsb2dDb25maWc6IE1hdERpYWxvZ0NvbmZpZztcbiAgcHVibGljIHRyaWdnZXJUZXh0U3RhcnQgPSBDYXNlRWRpdFBhZ2VDb21wb25lbnQuVFJJR0dFUl9URVhUX1NUQVJUO1xuICBwdWJsaWMgdHJpZ2dlclRleHRJZ25vcmVXYXJuaW5ncyA9IENhc2VFZGl0UGFnZUNvbXBvbmVudC5UUklHR0VSX1RFWFRfQ09OVElOVUU7XG4gIHB1YmxpYyB0cmlnZ2VyVGV4dDogc3RyaW5nO1xuICBwdWJsaWMgZm9ybVZhbHVlc0NoYW5nZWQgPSBmYWxzZTtcbiAgcHVibGljIHBhZ2VDaGFuZ2VTdWJqZWN0OiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdO1xuICBwdWJsaWMgdmFsaWRhdGlvbkVycm9yczogQ2FzZUVkaXRWYWxpZGF0aW9uRXJyb3JbXSA9IFtdO1xuICBwdWJsaWMgaGFzUHJldmlvdXNQYWdlJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHB1YmxpYyBjYWxsYmFja0Vycm9yc1N1YmplY3Q6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBpc0xpbmtlZENhc2VzSm91cm5leUF0RmluYWxTdGVwOiBib29sZWFuO1xuICBwdWJsaWMgcm91dGVQYXJhbXNTdWI6IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIGNhc2VFZGl0Rm9ybVN1YjogU3Vic2NyaXB0aW9uO1xuICBwdWJsaWMgY2FzZUlzTGlua2VkQ2FzZXNKb3VybmV5QXRGaW5hbFN0ZXBTdWI6IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIGNhc2VUcmlnZ2VyU3VibWl0RXZlbnRTdWI6IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIHZhbGlkYXRlU3ViOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBkaWFsb2dSZWZBZnRlckNsb3NlZFN1YjogU3Vic2NyaXB0aW9uO1xuICBwdWJsaWMgc2F2ZURyYWZ0U3ViOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBjYXNlRm9ybVZhbGlkYXRpb25FcnJvcnNTdWI6IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIHN0YXRpYyBzY3JvbGxUb1RvcCgpOiB2b2lkIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzZXRGb2N1c1RvVG9wKCkge1xuICAgIGNvbnN0IHRvcENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3AnKTtcbiAgICBpZiAodG9wQ29udGFpbmVyKSB7XG4gICAgICB0b3BDb250YWluZXIuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVhZG9ubHkgY2FzZUVkaXQ6IENhc2VFZGl0Q29tcG9uZW50LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZm9ybVZhbHVlU2VydmljZTogRm9ybVZhbHVlU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZvcm1FcnJvclNlcnZpY2U6IEZvcm1FcnJvclNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSByZWFkb25seSBwYWdlVmFsaWRhdGlvblNlcnZpY2U6IFBhZ2VWYWxpZGF0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRpYWxvZzogTWF0RGlhbG9nLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FzZUZpZWxkU2VydmljZTogQ2FzZUZpZWxkU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VFZGl0RGF0YVNlcnZpY2U6IENhc2VFZGl0RGF0YVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2FkaW5nU2VydmljZTogTG9hZGluZ1NlcnZpY2VcbiAgKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaW5pdERpYWxvZygpO1xuICAgIHRoaXMuZXZlbnRUcmlnZ2VyID0gdGhpcy5jYXNlRWRpdC5ldmVudFRyaWdnZXI7XG4gICAgdGhpcy5lZGl0Rm9ybSA9IHRoaXMuY2FzZUVkaXQuZm9ybTtcbiAgICB0aGlzLndpemFyZCA9IHRoaXMuY2FzZUVkaXQud2l6YXJkO1xuICAgIHRoaXMuY2FzZUZpZWxkcyA9IHRoaXMuZ2V0Q2FzZUZpZWxkcygpO1xuXG4gICAgdGhpcy5zeW5jQ2FzZUVkaXREYXRhU2VydmljZSgpO1xuXG4gICAgdGhpcy5yb3V0ZVBhcmFtc1N1YiA9IHRoaXMucm91dGUucGFyYW1zXG4gICAgICAuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgIGNvbnN0IHBhZ2VJZCA9IHBhcmFtc1sncGFnZSddO1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoIXRoaXMuY3VycmVudFBhZ2UgfHwgcGFnZUlkICE9PSB0aGlzLmN1cnJlbnRQYWdlPy5pZCkge1xuICAgICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLmNhc2VFZGl0LmdldFBhZ2UocGFnZUlkKTtcbiAgICAgICAgICBpZiAocGFnZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuaGFzUHJldmlvdXNQYWdlJC5uZXh0KHRoaXMuY2FzZUVkaXQuaGFzUHJldmlvdXModGhpcy5jdXJyZW50UGFnZT8uaWQpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyaWdnZXJUZXh0ID0gdGhpcy5nZXRUcmlnZ2VyVGV4dCgpO1xuICAgICAgfSk7XG4gICAgQ2FzZUVkaXRQYWdlQ29tcG9uZW50LnNldEZvY3VzVG9Ub3AoKTtcbiAgICB0aGlzLmNhc2VFZGl0Rm9ybVN1YiA9IHRoaXMuY2FzZUVkaXREYXRhU2VydmljZS5jYXNlRWRpdEZvcm0kLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiBlZGl0Rm9ybSA9PiB0aGlzLmVkaXRGb3JtID0gZWRpdEZvcm1cbiAgICB9KTtcbiAgICB0aGlzLmNhc2VJc0xpbmtlZENhc2VzSm91cm5leUF0RmluYWxTdGVwU3ViID1cbiAgICAgIHRoaXMuY2FzZUVkaXREYXRhU2VydmljZS5jYXNlSXNMaW5rZWRDYXNlc0pvdXJuZXlBdEZpbmFsU3RlcCQuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dDogaXNMaW5rZWRDYXNlc0pvdXJuZXlBdEZpbmFsU3RlcCA9PiB0aGlzLmlzTGlua2VkQ2FzZXNKb3VybmV5QXRGaW5hbFN0ZXAgPSBpc0xpbmtlZENhc2VzSm91cm5leUF0RmluYWxTdGVwXG4gICAgICB9KTtcbiAgICB0aGlzLmNhc2VUcmlnZ2VyU3VibWl0RXZlbnRTdWIgPSB0aGlzLmNhc2VFZGl0RGF0YVNlcnZpY2UuY2FzZVRyaWdnZXJTdWJtaXRFdmVudCQuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IHN0YXRlID0+IHtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgdGhpcy5jYXNlRWRpdERhdGFTZXJ2aWNlLnNldFRyaWdnZXJTdWJtaXRFdmVudChmYWxzZSk7XG4gICAgICAgICAgdGhpcy5zdWJtaXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlUGFyYW1zU3ViPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY2FzZUVkaXRGb3JtU3ViPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY2FzZUlzTGlua2VkQ2FzZXNKb3VybmV5QXRGaW5hbFN0ZXBTdWI/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jYXNlVHJpZ2dlclN1Ym1pdEV2ZW50U3ViPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMudmFsaWRhdGVTdWI/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5kaWFsb2dSZWZBZnRlckNsb3NlZFN1Yj8udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnNhdmVEcmFmdFN1Yj8udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNhc2VGb3JtVmFsaWRhdGlvbkVycm9yc1N1Yj8udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseVZhbHVlc0NoYW5nZWQodmFsdWVzQ2hhbmdlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZm9ybVZhbHVlc0NoYW5nZWQgPSB2YWx1ZXNDaGFuZ2VkO1xuICB9XG5cbiAgcHVibGljIGZpcnN0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmNhc2VFZGl0LmZpcnN0KCk7XG4gIH1cblxuICBwdWJsaWMgY3VycmVudFBhZ2VJc05vdFZhbGlkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5wYWdlVmFsaWRhdGlvblNlcnZpY2UuaXNQYWdlVmFsaWQodGhpcy5jdXJyZW50UGFnZSwgdGhpcy5lZGl0Rm9ybSkgfHxcbiAgICAgICh0aGlzLmlzTGlua2VkQ2FzZXNKb3VybmV5KCkgJiYgIXRoaXMuaXNMaW5rZWRDYXNlc0pvdXJuZXlBdEZpbmFsU3RlcCk7XG4gIH1cblxuICBwdWJsaWMgaXNMaW5rZWRDYXNlc0pvdXJuZXkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEZpZWxkc1V0aWxzLmNvbnRhaW5zTGlua2VkQ2FzZXNDYXNlRmllbGQodGhpcy5jdXJyZW50UGFnZS5jYXNlX2ZpZWxkcyk7XG4gIH1cblxuICAvKipcbiAgICogY2FzZUV2ZW50RGF0YS5ldmVudF9kYXRhIGNvbnRhaW5zIGFsbCB0aGUgdmFsdWVzIGZyb20gdGhlIHByZXZpb3VzIHBhZ2VzIHNvIHdlIHNldCBjYXNlRXZlbnREYXRhLmRhdGEgPSBjYXNlRXZlbnREYXRhLmV2ZW50X2RhdGFcbiAgICogVGhpcyBidWlsZHMgdGhlIGZvcm0gd2l0aCBkYXRhIGZyb20gdGhlIHByZXZpb3VzIHBhZ2VzXG4gICAqIEVVSS0zNzMyIC0gQnJlYXRoaW5nIHNwYWNlIGRhdGEgbm90IHBlcnNpc3RlZCBvbiBQcmV2aW91cyBidXR0b24gY2xpY2sgd2l0aCBFeHBVSSBEZW1vXG4gICAqL1xuICBwdWJsaWMgdG9QcmV2aW91c1BhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5jYXNlRWRpdERhdGFTZXJ2aWNlLmNsZWFyRm9ybVZhbGlkYXRpb25FcnJvcnMoKTtcblxuICAgIGNvbnN0IGNhc2VFdmVudERhdGE6IENhc2VFdmVudERhdGEgPSB0aGlzLmJ1aWxkQ2FzZUV2ZW50RGF0YSh0cnVlKTtcbiAgICBjYXNlRXZlbnREYXRhLmRhdGEgPSBjYXNlRXZlbnREYXRhLmV2ZW50X2RhdGE7XG4gICAgdGhpcy51cGRhdGVGb3JtRGF0YShjYXNlRXZlbnREYXRhKTtcbiAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgQ2FzZUVkaXRQYWdlQ29tcG9uZW50LnNldEZvY3VzVG9Ub3AoKTtcbiAgfVxuXG4gIC8vIEFkZGluZyB2YWxpZGF0aW9uIG1lc3NhZ2UgdG8gc2hvdyBpdCBhcyBFcnJvciBTdW1tYXJ5XG4gIHB1YmxpYyBnZW5lcmF0ZUVycm9yTWVzc2FnZShmaWVsZHM6IENhc2VGaWVsZFtdLCBjb250YWluZXI/OiBBYnN0cmFjdENvbnRyb2wsIHBhdGg/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBncm91cDogQWJzdHJhY3RDb250cm9sID0gY29udGFpbmVyIHx8IHRoaXMuZWRpdEZvcm0uY29udHJvbHNbJ2RhdGEnXTtcbiAgICBmaWVsZHMuZmlsdGVyKGNhc2VmaWVsZCA9PiAhdGhpcy5jYXNlRmllbGRTZXJ2aWNlLmlzUmVhZE9ubHkoY2FzZWZpZWxkKSlcbiAgICAgIC5maWx0ZXIoY2FzZWZpZWxkID0+ICF0aGlzLnBhZ2VWYWxpZGF0aW9uU2VydmljZS5pc0hpZGRlbihjYXNlZmllbGQsIHRoaXMuZWRpdEZvcm0sIHBhdGgpKVxuICAgICAgLmZvckVhY2goY2FzZWZpZWxkID0+IHtcbiAgICAgICAgY29uc3QgZmllbGRFbGVtZW50ID0gRmllbGRzVXRpbHMuaXNDYXNlRmllbGRPZlR5cGUoY2FzZWZpZWxkLCBbJ0p1ZGljaWFsVXNlciddKVxuICAgICAgICAgID8gZ3JvdXAuZ2V0KGAke2Nhc2VmaWVsZC5pZH1fanVkaWNpYWxVc2VyQ29udHJvbGApXG4gICAgICAgICAgOiBncm91cC5nZXQoY2FzZWZpZWxkLmlkKTtcbiAgICAgICAgaWYgKGZpZWxkRWxlbWVudCkge1xuICAgICAgICAgIGNvbnN0IGxhYmVsID0gY2FzZWZpZWxkLmxhYmVsIHx8ICdGaWVsZCc7XG4gICAgICAgICAgbGV0IGlkID0gY2FzZWZpZWxkLmlkO1xuICAgICAgICAgIGlmIChmaWVsZEVsZW1lbnRbJ2NvbXBvbmVudCddICYmIGZpZWxkRWxlbWVudFsnY29tcG9uZW50J10ucGFyZW50KSB7XG4gICAgICAgICAgICBpZiAoZmllbGRFbGVtZW50Wydjb21wb25lbnQnXS5pZFByZWZpeC5pbmRleE9mKGBfJHtpZH1fYCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgIGlkID0gYCR7ZmllbGRFbGVtZW50Wydjb21wb25lbnQnXS5pZFByZWZpeH0ke2lkfWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZCA9IGAke2ZpZWxkRWxlbWVudFsnY29tcG9uZW50J10uaWRQcmVmaXh9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZpZWxkRWxlbWVudC5oYXNFcnJvcigncmVxdWlyZWQnKSkge1xuICAgICAgICAgICAgdGhpcy5jYXNlRWRpdERhdGFTZXJ2aWNlLmFkZEZvcm1WYWxpZGF0aW9uRXJyb3IoeyBpZCwgbWVzc2FnZTogYCVGSUVMRExBQkVMJSBpcyByZXF1aXJlZGAsIGxhYmVsIH0pO1xuICAgICAgICAgICAgZmllbGRFbGVtZW50Lm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgICAvLyBGb3IgdGhlIEp1ZGljaWFsVXNlciBmaWVsZCB0eXBlLCBhbiBlcnJvciBuZWVkcyB0byBiZSBzZXQgb24gdGhlIGNvbXBvbmVudCBzbyB0aGF0IGFuIGVycm9yIG1lc3NhZ2VcbiAgICAgICAgICAgIC8vIGNhbiBiZSBkaXNwbGF5ZWQgYXQgZmllbGQgbGV2ZWxcbiAgICAgICAgICAgIGlmIChGaWVsZHNVdGlscy5pc0Nhc2VGaWVsZE9mVHlwZShjYXNlZmllbGQsIFsnSnVkaWNpYWxVc2VyJ10pKSB7XG4gICAgICAgICAgICAgIGZpZWxkRWxlbWVudFsnY29tcG9uZW50J10uZXJyb3JzID0geyByZXF1aXJlZDogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoZmllbGRFbGVtZW50Lmhhc0Vycm9yKCdwYXR0ZXJuJykpIHtcbiAgICAgICAgICAgIHRoaXMuY2FzZUVkaXREYXRhU2VydmljZS5hZGRGb3JtVmFsaWRhdGlvbkVycm9yKHsgaWQsIG1lc3NhZ2U6IGAlRklFTERMQUJFTCUgaXMgbm90IHZhbGlkYCwgbGFiZWwgfSk7XG4gICAgICAgICAgICBmaWVsZEVsZW1lbnQubWFya0FzRGlydHkoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpZWxkRWxlbWVudC5oYXNFcnJvcignbWlubGVuZ3RoJykpIHtcbiAgICAgICAgICAgIHRoaXMuY2FzZUVkaXREYXRhU2VydmljZS5hZGRGb3JtVmFsaWRhdGlvbkVycm9yKHsgaWQsIG1lc3NhZ2U6IGAlRklFTERMQUJFTCUgaXMgYmVsb3cgdGhlIG1pbmltdW0gbGVuZ3RoYCwgbGFiZWwgfSk7XG4gICAgICAgICAgICBmaWVsZEVsZW1lbnQubWFya0FzRGlydHkoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpZWxkRWxlbWVudC5oYXNFcnJvcignbWF4bGVuZ3RoJykpIHtcbiAgICAgICAgICAgIHRoaXMuY2FzZUVkaXREYXRhU2VydmljZS5hZGRGb3JtVmFsaWRhdGlvbkVycm9yKHsgaWQsIG1lc3NhZ2U6IGAlRklFTERMQUJFTCUgZXhjZWVkcyB0aGUgbWF4aW11bSBsZW5ndGhgLCBsYWJlbCB9KTtcbiAgICAgICAgICAgIGZpZWxkRWxlbWVudC5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZmllbGRFbGVtZW50LmludmFsaWQpIHtcbiAgICAgICAgICAgIGlmIChjYXNlZmllbGQuaXNDb21wbGV4KCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUVycm9yTWVzc2FnZShjYXNlZmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcywgZmllbGRFbGVtZW50LCBpZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNhc2VmaWVsZC5pc0NvbGxlY3Rpb24oKSAmJiBjYXNlZmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUudHlwZSA9PT0gJ0NvbXBsZXgnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpZWxkQXJyYXkgPSBmaWVsZEVsZW1lbnQgYXMgRm9ybUFycmF5O1xuICAgICAgICAgICAgICBpZiAoZmllbGRBcnJheVsnY29tcG9uZW50J10gJiYgZmllbGRBcnJheVsnY29tcG9uZW50J11bJ2NvbGxJdGVtcyddICYmIGZpZWxkQXJyYXlbJ2NvbXBvbmVudCddWydjb2xsSXRlbXMnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBgJHtmaWVsZEFycmF5Wydjb21wb25lbnQnXVsnY29sbEl0ZW1zJ11bMF0ucHJlZml4fWA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZmllbGRBcnJheS5jb250cm9scy5mb3JFYWNoKChjOiBBYnN0cmFjdENvbnRyb2wpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlRXJyb3JNZXNzYWdlKGNhc2VmaWVsZC5maWVsZF90eXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcywgYy5nZXQoJ3ZhbHVlJyksIGlkKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEZpZWxkc1V0aWxzLmlzQ2FzZUZpZWxkT2ZUeXBlKGNhc2VmaWVsZCwgWydGbGFnTGF1bmNoZXInXSkpIHtcbiAgICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgY2FzZSBmaWVsZCBEaXNwbGF5Q29udGV4dFBhcmFtZXRlciBpcyBzaWduYWxsaW5nIFwiY3JlYXRlXCIgbW9kZSBvciBcInVwZGF0ZVwiIG1vZGVcbiAgICAgICAgICAgICAgLy8gKGV4cGVjdGVkIGFsd2F5cyB0byBiZSBvbmUgb2YgdGhlIHR3byksIHRvIHNldCB0aGUgY29ycmVjdCBlcnJvciBtZXNzYWdlXG4gICAgICAgICAgICAgIGxldCBhY3Rpb24gPSAnJztcbiAgICAgICAgICAgICAgaWYgKGNhc2VmaWVsZC5kaXNwbGF5X2NvbnRleHRfcGFyYW1ldGVyID09PSAnI0FSR1VNRU5UKENSRUFURSknKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uID0gJ2NyZWF0aW9uJztcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjYXNlZmllbGQuZGlzcGxheV9jb250ZXh0X3BhcmFtZXRlciA9PT0gJyNBUkdVTUVOVChVUERBVEUpJykge1xuICAgICAgICAgICAgICAgIGFjdGlvbiA9ICd1cGRhdGUnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgUGxlYXNlIHNlbGVjdCBOZXh0IHRvIGNvbXBsZXRlIHRoZSAke2FjdGlvbn0gb2YgdGhlICR7YWN0aW9uID09PSAndXBkYXRlJyA/ICdzZWxlY3RlZCAnIDogJyd9Y2FzZSBmbGFnYFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9ycy5wdXNoKHsgaWQsIG1lc3NhZ2U6IGBTZWxlY3Qgb3IgZmlsbCB0aGUgcmVxdWlyZWQgJHtjYXNlZmllbGQubGFiZWx9IGZpZWxkYCB9KTtcbiAgICAgICAgICAgICAgZmllbGRFbGVtZW50Lm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBDYXNlRWRpdFBhZ2VDb21wb25lbnQuc2Nyb2xsVG9Ub3AoKTtcbiAgfVxuXG4gIHB1YmxpYyBuYXZpZ2F0ZVRvRXJyb3JFbGVtZW50KGVsZW1lbnRJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoZWxlbWVudElkKSB7XG4gICAgICBjb25zdCBodG1sRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKGh0bWxFbGVtZW50KSB7XG4gICAgICAgIGh0bWxFbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicgfSk7XG4gICAgICAgIGh0bWxFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN1Ym1pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNhc2VFZGl0RGF0YVNlcnZpY2UuY2xlYXJGb3JtVmFsaWRhdGlvbkVycm9ycygpO1xuXG4gICAgaWYgKHRoaXMuY3VycmVudFBhZ2VJc05vdFZhbGlkKCkpIHtcbiAgICAgIC8vIFRoZSBnZW5lcmF0ZUVycm9yTWVzc2FnZSBtZXRob2QgZmlsdGVycyBvdXQgdGhlIGhpZGRlbiBmaWVsZHMuXG4gICAgICAvLyBUaGUgZXJyb3IgbWVzc2FnZSBmb3IgTGlua2VkQ2FzZXMgam91cm5leSB3aWxsIG5ldmVyIGdldCBkaXNwbGF5ZWQgYmVjYXVzZSB0aGVcbiAgICAgIC8vIExpbmtlZENhc2VzIGlzIGNvbmZpZ3VyZWQgd2l0aCBDb21wb25lbnRMYXVuY2hlciBmaWVsZCBhcyB2aXNpYmxlIGFuZCBjYXNlTGlua3MgZmllbGQgYXMgaGlkZGVuLlxuICAgICAgaWYgKHRoaXMuaXNMaW5rZWRDYXNlc0pvdXJuZXkoKSkge1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnMucHVzaCh7IGlkOiAnbmV4dC1idXR0b24nLCBtZXNzYWdlOiAnUGxlYXNlIHNlbGVjdCBOZXh0IHRvIGdvIHRvIHRoZSBuZXh0IHBhZ2UnIH0pO1xuICAgICAgICBDYXNlRWRpdFBhZ2VDb21wb25lbnQuc2Nyb2xsVG9Ub3AoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVFcnJvck1lc3NhZ2UodGhpcy5jdXJyZW50UGFnZS5jYXNlX2ZpZWxkcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNhc2VFZGl0LmlzU3VibWl0dGluZyAmJiAhdGhpcy5jdXJyZW50UGFnZUlzTm90VmFsaWQoKSkge1xuICAgICAgdGhpcy5jYXNlRWRpdC5pc1N1Ym1pdHRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5jYXNlRWRpdC5lcnJvciA9IG51bGw7XG4gICAgICBjb25zdCBjYXNlRXZlbnREYXRhOiBDYXNlRXZlbnREYXRhID0gdGhpcy5idWlsZENhc2VFdmVudERhdGEoKTtcbiAgICAgIGNvbnN0IGxvYWRpbmdTcGlubmVyVG9rZW4gPSB0aGlzLmxvYWRpbmdTZXJ2aWNlLnJlZ2lzdGVyKCk7XG4gICAgICB0aGlzLnZhbGlkYXRlU3ViID0gdGhpcy5jYXNlRWRpdC52YWxpZGF0ZShjYXNlRXZlbnREYXRhLCB0aGlzLmN1cnJlbnRQYWdlLmlkKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaW5hbGl6ZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLnVucmVnaXN0ZXIobG9hZGluZ1NwaW5uZXJUb2tlbik7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChqc29uRGF0YSkgPT4ge1xuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgICAgaWYgKGpzb25EYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvcm1EYXRhKGpzb25EYXRhIGFzIENhc2VFdmVudERhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnNhdmVEcmFmdCgpO1xuICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgQ2FzZUVkaXRQYWdlQ29tcG9uZW50LnNjcm9sbFRvVG9wKCk7XG4gICAgICAvLyBSZW1vdmUgYWxsIEp1ZGljaWFsVXNlciBGb3JtQ29udHJvbHMgd2l0aCB0aGUgSUQgc3VmZml4IFwiX2p1ZGljaWFsVXNlckNvbnRyb2xcIiBiZWNhdXNlIHRoZXNlIGFyZSBub3RcbiAgICAgIC8vIGludGVuZGVkIHRvIGJlIHByZXNlbnQgaW4gdGhlIENhc2UgRXZlbnQgZGF0YSAodGhleSBhcmUgYWRkZWQgb25seSBmb3IgdmFsdWUgc2VsZWN0aW9uIGFuZCB2YWxpZGF0aW9uXG4gICAgICAvLyBwdXJwb3NlcylcbiAgICAgIHRoaXMucmVtb3ZlQWxsSnVkaWNpYWxVc2VyRm9ybUNvbnRyb2xzKHRoaXMuY3VycmVudFBhZ2UsIHRoaXMuZWRpdEZvcm0pO1xuICAgIH1cbiAgICBDYXNlRWRpdFBhZ2VDb21wb25lbnQuc2V0Rm9jdXNUb1RvcCgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUZvcm1EYXRhKGpzb25EYXRhOiBDYXNlRXZlbnREYXRhKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjYXNlRmllbGRJZCBvZiBPYmplY3Qua2V5cyhqc29uRGF0YS5kYXRhKSkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmICh0aGlzLnBhZ2VXaXRoRmllbGRFeGlzdHMoY2FzZUZpZWxkSWQpKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRUcmlnZ2VyQ2FzZUZpZWxkcyhjYXNlRmllbGRJZCwganNvbkRhdGEsIHRoaXMuY2FzZUVkaXQuZXZlbnRUcmlnZ2VyKTtcbiAgICAgICAgdGhpcy51cGRhdGVGb3JtQ29udHJvbHNWYWx1ZSh0aGlzLmVkaXRGb3JtLCBjYXNlRmllbGRJZCwganNvbkRhdGEuZGF0YVtjYXNlRmllbGRJZF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHdlIGRvIHRoZSBjaGVjaywgYmVjYXN1ZSB0aGUgZGF0YSBjb21lcyBmcm9tIHRoZSBleHRlcm5hbCBzb3VyY2VcbiAgcHVibGljIHBhZ2VXaXRoRmllbGRFeGlzdHMoY2FzZUZpZWxkSWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLndpemFyZC5maW5kV2l6YXJkUGFnZShjYXNlRmllbGRJZCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlRXZlbnRUcmlnZ2VyQ2FzZUZpZWxkcyhjYXNlRmllbGRJZDogc3RyaW5nLCBqc29uRGF0YTogQ2FzZUV2ZW50RGF0YSwgZXZlbnRUcmlnZ2VyOiBDYXNlRXZlbnRUcmlnZ2VyKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoZXZlbnRUcmlnZ2VyPy5jYXNlX2ZpZWxkcykge1xuICAgICAgZXZlbnRUcmlnZ2VyLmNhc2VfZmllbGRzXG4gICAgICAgIC5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50LmlkID09PSBjYXNlRmllbGRJZClcbiAgICAgICAgLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNBbk9iamVjdChlbGVtZW50LnZhbHVlKSkge1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlZEpzb25EYXRhT2JqZWN0ID0gdGhpcy51cGRhdGVKc29uRGF0YU9iamVjdChjYXNlRmllbGRJZCwganNvbkRhdGEsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LnZhbHVlID0ge1xuICAgICAgICAgICAgICAuLi5lbGVtZW50LnZhbHVlLFxuICAgICAgICAgICAgICAuLi51cGRhdGVkSnNvbkRhdGFPYmplY3QsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnZhbHVlID0ganNvbkRhdGEuZGF0YVtjYXNlRmllbGRJZF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUpzb25EYXRhT2JqZWN0KGNhc2VGaWVsZElkOiBzdHJpbmcsIGpzb25EYXRhOiBDYXNlRXZlbnREYXRhLCBlbGVtZW50OiBDYXNlRmllbGQpOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGpzb25EYXRhLmRhdGFbY2FzZUZpZWxkSWRdKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50VmFsdWUgPSBlbGVtZW50LnZhbHVlW2tleV07XG4gICAgICBjb25zdCBqc29uRGF0YVZhbHVlID0ganNvbkRhdGEuZGF0YVtjYXNlRmllbGRJZF1ba2V5XTtcbiAgICAgIGNvbnN0IGhhc0VsZW1lbnRHb3RWYWx1ZVByb3BlcnR5ID0gdGhpcy5pc0FuT2JqZWN0KGVsZW1lbnRWYWx1ZSkgJiYgZWxlbWVudFZhbHVlLnZhbHVlICE9PSB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBqc29uRGF0YU9yRWxlbWVudFZhbHVlID0ganNvbkRhdGFWYWx1ZT8udmFsdWUgIT09IG51bGwgJiYganNvbkRhdGFWYWx1ZT8udmFsdWUgIT09IHVuZGVmaW5lZCA/IGpzb25EYXRhVmFsdWUgOiBlbGVtZW50VmFsdWU7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgW2Ake2tleX1gXTogaGFzRWxlbWVudEdvdFZhbHVlUHJvcGVydHkgPyBqc29uRGF0YU9yRWxlbWVudFZhbHVlIDoganNvbkRhdGFWYWx1ZVxuICAgICAgfTtcbiAgICB9LCB7fSk7XG4gIH1cblxuICBwcml2YXRlIGlzQW5PYmplY3QocHJvcGVydHk6IHVua25vd24pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHlwZW9mIHByb3BlcnR5ID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShwcm9wZXJ0eSkgJiYgcHJvcGVydHkgIT09IG51bGw7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlRm9ybUNvbnRyb2xzVmFsdWUoZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwLCBjYXNlRmllbGRJZDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgdGhlQ29udHJvbCA9IGZvcm1Hcm91cC5jb250cm9sc1snZGF0YSddLmdldChjYXNlRmllbGRJZCk7XG4gICAgaWYgKHRoZUNvbnRyb2wgJiYgdGhlQ29udHJvbFsnc3RhdHVzJ10gIT09ICdESVNBQkxFRCcpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoZUNvbnRyb2wudmFsdWUpICYmIEFycmF5LmlzQXJyYXkodmFsdWUpXG4gICAgICAgICYmIHRoZUNvbnRyb2wudmFsdWUubGVuZ3RoID4gdmFsdWUubGVuZ3RoICYmIHRoZUNvbnRyb2xbJ2Nhc2VGaWVsZCddXG4gICAgICAgICYmIHRoZUNvbnRyb2xbJ2Nhc2VGaWVsZCddWydkaXNwbGF5X2NvbnRleHQnXSAmJiB0aGVDb250cm9sWydjYXNlRmllbGQnXVsnZGlzcGxheV9jb250ZXh0J10gPT09ICdPUFRJT05BTCdcbiAgICAgICAgJiYgdGhlQ29udHJvbFsnY2FzZUZpZWxkJ11bJ2ZpZWxkX3R5cGUnXSAmJiB0aGVDb250cm9sWydjYXNlRmllbGQnXVsnZmllbGRfdHlwZSddWyd0eXBlJ10gPT09ICdDb2xsZWN0aW9uJykge1xuICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGVDb250cm9sLnBhdGNoVmFsdWUodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjYWxsYmFja0Vycm9yc05vdGlmeShlcnJvckNvbnRleHQ6IENhbGxiYWNrRXJyb3JzQ29udGV4dCkge1xuICAgIHRoaXMuY2FzZUVkaXQuaWdub3JlV2FybmluZyA9IGVycm9yQ29udGV4dC5pZ25vcmVXYXJuaW5nO1xuICAgIHRoaXMudHJpZ2dlclRleHQgPSBlcnJvckNvbnRleHQudHJpZ2dlclRleHQ7XG4gIH1cblxuICBwdWJsaWMgbmV4dCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodGhpcy5jYW5OYXZpZ2F0ZVRvU3VtbWFyeVBhZ2UoKSkge1xuICAgICAgdGhpcy5jYXNlRWRpdC5pc1N1Ym1pdHRpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5yZXNldEVycm9ycygpO1xuICAgIHRoaXMuZm9ybVZhbHVlc0NoYW5nZWQgPSBmYWxzZTtcbiAgICB0aGlzLnBhZ2VDaGFuZ2VTdWJqZWN0Lm5leHQodHJ1ZSk7XG4gICAgcmV0dXJuIHRoaXMuY2FzZUVkaXQubmV4dCh0aGlzLmN1cnJlbnRQYWdlLmlkKTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2aW91cygpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0aGlzLnJlc2V0RXJyb3JzKCk7XG4gICAgdGhpcy5zYXZlRHJhZnQoKTtcbiAgICB0aGlzLmZvcm1WYWx1ZXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgdGhpcy5wYWdlQ2hhbmdlU3ViamVjdC5uZXh0KHRydWUpO1xuICAgIHJldHVybiB0aGlzLmNhc2VFZGl0LnByZXZpb3VzKHRoaXMuY3VycmVudFBhZ2UuaWQpO1xuICB9XG5cbiAgcHVibGljIGhhc1ByZXZpb3VzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNhc2VFZGl0Lmhhc1ByZXZpb3VzKHRoaXMuY3VycmVudFBhZ2UuaWQpO1xuICB9XG5cbiAgcHVibGljIGNhbmNlbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ldmVudFRyaWdnZXIuY2FuX3NhdmVfZHJhZnQpIHtcbiAgICAgIGlmICh0aGlzLmZvcm1WYWx1ZXNDaGFuZ2VkKSB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oU2F2ZU9yRGlzY2FyZERpYWxvZ0NvbXBvbmVudCwgdGhpcy5kaWFsb2dDb25maWcpO1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZkFmdGVyQ2xvc2VkU3ViID0gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gJ0Rpc2NhcmQnKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2NhcmQoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gJ1NhdmUnKSB7XG4gICAgICAgICAgICBjb25zdCBkcmFmdENhc2VFdmVudERhdGE6IENhc2VFdmVudERhdGEgPSB0aGlzLmZvcm1WYWx1ZVNlcnZpY2Uuc2FuaXRpc2UodGhpcy5lZGl0Rm9ybS52YWx1ZSkgYXMgQ2FzZUV2ZW50RGF0YTtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1NYXAuZ2V0KENhc2VFZGl0Q29tcG9uZW50Lk9SSUdJTl9RVUVSWV9QQVJBTSkgPT09ICd2aWV3RHJhZnQnKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FzZUVkaXQuY2FuY2VsbGVkLmVtaXQoeyBzdGF0dXM6IENhc2VFZGl0UGFnZUNvbXBvbmVudC5SRVNVTUVEX0ZPUk1fU0FWRSwgZGF0YTogZHJhZnRDYXNlRXZlbnREYXRhIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5jYXNlRWRpdC5jYW5jZWxsZWQuZW1pdCh7IHN0YXR1czogQ2FzZUVkaXRQYWdlQ29tcG9uZW50Lk5FV19GT1JNX1NBVkUsIGRhdGE6IGRyYWZ0Q2FzZUV2ZW50RGF0YSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaXNjYXJkKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FzZUVkaXQuY2FuY2VsbGVkLmVtaXQoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhc2VFZGl0RGF0YVNlcnZpY2UuY2xlYXJGb3JtVmFsaWRhdGlvbkVycm9ycygpO1xuICB9XG5cbiAgcHVibGljIHN1Ym1pdHRpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FzZUVkaXQuaXNTdWJtaXR0aW5nO1xuICB9XG5cbiAgcHVibGljIGdldENhc2VJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5jYXNlRWRpdC5jYXNlRGV0YWlscyA/IHRoaXMuY2FzZUVkaXQuY2FzZURldGFpbHMuY2FzZV9pZCA6ICcnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDYXNlVGl0bGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMuY2FzZUVkaXQuY2FzZURldGFpbHMgJiYgdGhpcy5jYXNlRWRpdC5jYXNlRGV0YWlscy5zdGF0ZSAmJlxuICAgICAgdGhpcy5jYXNlRWRpdC5jYXNlRGV0YWlscy5zdGF0ZS50aXRsZV9kaXNwbGF5ID8gdGhpcy5jYXNlRWRpdC5jYXNlRGV0YWlscy5zdGF0ZS50aXRsZV9kaXNwbGF5IDogJycpO1xuICB9XG5cbiAgcHVibGljIGdldENhbmNlbFRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFRyaWdnZXIuY2FuX3NhdmVfZHJhZnQgPyAnUmV0dXJuIHRvIGNhc2UgbGlzdCcgOiAnQ2FuY2VsJztcbiAgfVxuXG4gIHByaXZhdGUgY2FuTmF2aWdhdGVUb1N1bW1hcnlQYWdlKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5leHRQYWdlID0gdGhpcy5jYXNlRWRpdC5nZXROZXh0UGFnZSh7XG4gICAgICBjdXJyZW50UGFnZUlkOiB0aGlzLmN1cnJlbnRQYWdlPy5pZCxcbiAgICAgIHdpemFyZDogdGhpcy53aXphcmQsXG4gICAgICBldmVudFRyaWdnZXI6IHRoaXMuZXZlbnRUcmlnZ2VyLFxuICAgICAgZm9ybTogdGhpcy5lZGl0Rm9ybVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRUcmlnZ2VyLnNob3dfc3VtbWFyeSB8fCAhIW5leHRQYWdlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUcmlnZ2VyVGV4dCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHRleHRCYXNlZE9uQ2FuU2F2ZURyYWZ0ID0gdGhpcy5ldmVudFRyaWdnZXIgJiYgdGhpcy5ldmVudFRyaWdnZXIuY2FuX3NhdmVfZHJhZnRcbiAgICAgID8gQ2FzZUVkaXRQYWdlQ29tcG9uZW50LlRSSUdHRVJfVEVYVF9TQVZFXG4gICAgICA6IENhc2VFZGl0UGFnZUNvbXBvbmVudC5UUklHR0VSX1RFWFRfU1RBUlQ7XG5cbiAgICByZXR1cm4gdGhpcy5jYW5OYXZpZ2F0ZVRvU3VtbWFyeVBhZ2UoKVxuICAgICAgPyB0ZXh0QmFzZWRPbkNhblNhdmVEcmFmdFxuICAgICAgOiAnU3VibWl0JztcbiAgfVxuXG4gIHByaXZhdGUgZGlzY2FyZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtTWFwLmdldChDYXNlRWRpdENvbXBvbmVudC5PUklHSU5fUVVFUllfUEFSQU0pID09PSAndmlld0RyYWZ0Jykge1xuICAgICAgdGhpcy5jYXNlRWRpdC5jYW5jZWxsZWQuZW1pdCh7IHN0YXR1czogQ2FzZUVkaXRQYWdlQ29tcG9uZW50LlJFU1VNRURfRk9STV9ESVNDQVJEIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhc2VFZGl0LmNhbmNlbGxlZC5lbWl0KHsgc3RhdHVzOiBDYXNlRWRpdFBhZ2VDb21wb25lbnQuTkVXX0ZPUk1fRElTQ0FSRCB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgdGhpcy5jYXNlRWRpdC5pc1N1Ym1pdHRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNhc2VFZGl0LmVycm9yID0gZXJyb3I7XG4gICAgdGhpcy5jYXNlRWRpdC5jYWxsYmFja0Vycm9yc1N1YmplY3QubmV4dCh0aGlzLmNhc2VFZGl0LmVycm9yKTtcbiAgICB0aGlzLmNhbGxiYWNrRXJyb3JzU3ViamVjdC5uZXh0KHRoaXMuY2FzZUVkaXQuZXJyb3IpO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHRoaXMuY2FzZUVkaXQuZXJyb3IuZGV0YWlscykge1xuICAgICAgdGhpcy5mb3JtRXJyb3JTZXJ2aWNlXG4gICAgICAgIC5tYXBGaWVsZEVycm9ycyh0aGlzLmNhc2VFZGl0LmVycm9yLmRldGFpbHMuZmllbGRfZXJyb3JzLCB0aGlzLmVkaXRGb3JtPy5jb250cm9scz8uWydkYXRhJ10gYXMgVW50eXBlZEZvcm1Hcm91cCwgJ3ZhbGlkYXRpb24nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RXJyb3JzKCk6IHZvaWQge1xuICAgIHRoaXMuY2FzZUVkaXQuZXJyb3IgPSBudWxsO1xuICAgIHRoaXMuY2FzZUVkaXQuaWdub3JlV2FybmluZyA9IGZhbHNlO1xuICAgIHRoaXMudHJpZ2dlclRleHQgPSB0aGlzLmdldFRyaWdnZXJUZXh0KCk7XG4gICAgdGhpcy5jYXNlRWRpdC5jYWxsYmFja0Vycm9yc1N1YmplY3QubmV4dChudWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgc2F2ZURyYWZ0KCkge1xuICAgIGlmICh0aGlzLmV2ZW50VHJpZ2dlci5jYW5fc2F2ZV9kcmFmdCkge1xuICAgICAgY29uc3QgZHJhZnRDYXNlRXZlbnREYXRhOiBDYXNlRXZlbnREYXRhID0gdGhpcy5mb3JtVmFsdWVTZXJ2aWNlLnNhbml0aXNlKHRoaXMuZWRpdEZvcm0udmFsdWUpIGFzIENhc2VFdmVudERhdGE7XG4gICAgICBkcmFmdENhc2VFdmVudERhdGEuZXZlbnRfdG9rZW4gPSB0aGlzLmV2ZW50VHJpZ2dlci5ldmVudF90b2tlbjtcbiAgICAgIGRyYWZ0Q2FzZUV2ZW50RGF0YS5pZ25vcmVfd2FybmluZyA9IHRoaXMuY2FzZUVkaXQuaWdub3JlV2FybmluZztcbiAgICAgIHRoaXMuc2F2ZURyYWZ0U3ViID0gdGhpcy5jYXNlRWRpdC5zYXZlRHJhZnQoZHJhZnRDYXNlRXZlbnREYXRhKS5zdWJzY3JpYmUoXG4gICAgICAgIChkcmFmdCkgPT4gdGhpcy5ldmVudFRyaWdnZXIuY2FzZV9pZCA9IERSQUZUX1BSRUZJWCArIGRyYWZ0LmlkLCBlcnJvciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycm9yKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldENhc2VGaWVsZHMoKTogQ2FzZUZpZWxkW10ge1xuICAgIGlmICh0aGlzLmNhc2VFZGl0LmNhc2VEZXRhaWxzKSB7XG4gICAgICByZXR1cm4gRmllbGRzVXRpbHMuZ2V0Q2FzZUZpZWxkcyh0aGlzLmNhc2VFZGl0LmNhc2VEZXRhaWxzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5ldmVudFRyaWdnZXIuY2FzZV9maWVsZHM7XG4gIH1cblxuICBwcml2YXRlIGdldENhc2VGaWVsZHNGcm9tQ3VycmVudEFuZFByZXZpb3VzUGFnZXMoKTogQ2FzZUZpZWxkW10ge1xuICAgIGNvbnN0IHJlc3VsdDogQ2FzZUZpZWxkW10gPSBbXTtcbiAgICB0aGlzLndpemFyZC5wYWdlcy5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgaWYgKHBhZ2Uub3JkZXIgPD0gdGhpcy5jdXJyZW50UGFnZS5vcmRlcikge1xuICAgICAgICBwYWdlLmNhc2VfZmllbGRzLmZvckVhY2goZmllbGQgPT4gcmVzdWx0LnB1c2goZmllbGQpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGJ1aWxkQ2FzZUV2ZW50RGF0YShmcm9tUHJldmlvdXNQYWdlPzogYm9vbGVhbik6IENhc2VFdmVudERhdGEge1xuICAgIGNvbnN0IGZvcm1WYWx1ZTogb2JqZWN0ID0gdGhpcy5lZGl0Rm9ybS52YWx1ZTtcblxuICAgIC8vIEdldCB0aGUgQ2FzZUV2ZW50RGF0YSBmb3IgdGhlIGN1cnJlbnQgcGFnZS5cbiAgICBjb25zdCBwYWdlRmllbGRzOiBDYXNlRmllbGRbXSA9IHRoaXMuY3VycmVudFBhZ2UuY2FzZV9maWVsZHM7XG4gICAgY29uc3QgcGFnZUV2ZW50RGF0YTogQ2FzZUV2ZW50RGF0YSA9IHRoaXMuZ2V0RmlsdGVyZWRDYXNlRXZlbnREYXRhKHBhZ2VGaWVsZHMsIGZvcm1WYWx1ZSwgdHJ1ZSk7XG5cbiAgICAvLyBHZXQgdGhlIENhc2VFdmVudERhdGEgZm9yIHRoZSBlbnRpcmUgZm9ybSAoYWxsIHBhZ2VzKS5cbiAgICBjb25zdCBhbGxDYXNlRmllbGRzID0gdGhpcy5nZXRDYXNlRmllbGRzRnJvbUN1cnJlbnRBbmRQcmV2aW91c1BhZ2VzKCk7XG4gICAgY29uc3QgZm9ybUV2ZW50RGF0YTogQ2FzZUV2ZW50RGF0YSA9IHRoaXMuZ2V0RmlsdGVyZWRDYXNlRXZlbnREYXRhKGFsbENhc2VGaWVsZHMsIGZvcm1WYWx1ZSwgZmFsc2UsIHRydWUsIGZyb21QcmV2aW91c1BhZ2UpO1xuXG4gICAgLy8gTm93IGhlcmUncyB0aGUga2V5IHRoaW5nIC0gdGhlIHBhZ2VFdmVudERhdGEgaGFzIGEgcHJvcGVydHkgY2FsbGVkIGBldmVudF9kYXRhYCBhbmRcbiAgICAvLyB3ZSBuZWVkIFRIQVQgdG8gYmUgdGhlIHZhbHVlIG9mIHRoZSBlbnRpcmUgZm9ybTogYGZvcm1FdmVudERhdGEuZGF0YWAuXG4gICAgcGFnZUV2ZW50RGF0YS5ldmVudF9kYXRhID0gZm9ybUV2ZW50RGF0YS5kYXRhO1xuXG4gICAgLy8gRmluYWxpc2UgdGhlIENhc2VFdmVudERhdGEgb2JqZWN0LlxuICAgIHBhZ2VFdmVudERhdGEuZXZlbnRfdG9rZW4gPSB0aGlzLmV2ZW50VHJpZ2dlci5ldmVudF90b2tlbjtcbiAgICBwYWdlRXZlbnREYXRhLmlnbm9yZV93YXJuaW5nID0gdGhpcy5jYXNlRWRpdC5pZ25vcmVXYXJuaW5nO1xuXG4gICAgLy8gRmluYWxseSwgdHJ5IHRvIHNldCB1cCB0aGUgY2FzZV9yZWZlcmVuY2UuXG4gICAgaWYgKHRoaXMuY2FzZUVkaXQuY2FzZURldGFpbHMpIHtcbiAgICAgIHBhZ2VFdmVudERhdGEuY2FzZV9yZWZlcmVuY2UgPSB0aGlzLmNhc2VFZGl0LmNhc2VEZXRhaWxzLmNhc2VfaWQ7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRoZSBub3cgaG9wZWZ1bGx5IHNhbmUgQ2FzZUV2ZW50RGF0YS5cbiAgICByZXR1cm4gcGFnZUV2ZW50RGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBYnN0cmFjdGVkIHRoaXMgbWV0aG9kIGZyb20gYnVpbGRDYXNlRXZlbnREYXRhIHRvIHJlbW92ZSBkdXBsaWNhdGlvbi5cbiAgICogQHBhcmFtIGNhc2VGaWVsZHMgVGhlIGZpZWxkcyB0byBmaWx0ZXIgdGhlIGRhdGEgYnkuXG4gICAqIEBwYXJhbSBmb3JtVmFsdWUgVGhlIG9yaWdpbmFsIHZhbHVlIG9mIHRoZSBmb3JtLlxuICAgKiBAcGFyYW0gY2xlYXJFbXB0eSBXaGV0aGVyIG9yIG5vdCB0byBjbGVhciBvdXQgZW1wdHkgdmFsdWVzLlxuICAgKiBAcGFyYW0gY2xlYXJOb25DYXNlIFdoZXRoZXIgb3Igbm90IHRvIGNsZWFyIG91dCBmaWVsZHMgdGhhdCBhcmUgbm90IHBhcnQgb2YgdGhlIGNhc2UuXG4gICAqIEByZXR1cm5zIENhc2VFdmVudERhdGEgZm9yIHRoZSBzcGVjaWZpZWQgcGFyYW1ldGVycy5cbiAgICovXG4gIHByaXZhdGUgZ2V0RmlsdGVyZWRDYXNlRXZlbnREYXRhKGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdLCBmb3JtVmFsdWU6IG9iamVjdCwgY2xlYXJFbXB0eSA9IGZhbHNlLFxuICAgIGNsZWFyTm9uQ2FzZSA9IGZhbHNlLCBmcm9tUHJldmlvdXNQYWdlID0gZmFsc2UpOiBDYXNlRXZlbnREYXRhIHtcbiAgICAvLyBHZXQgdGhlIGRhdGEgZm9yIHRoZSBmaWVsZHMgc3BlY2lmaWVkLlxuICAgIGNvbnN0IGZvcm1GaWVsZHMgPSB0aGlzLmZvcm1WYWx1ZVNlcnZpY2UuZmlsdGVyQ3VycmVudFBhZ2VGaWVsZHMoY2FzZUZpZWxkcywgZm9ybVZhbHVlKTtcblxuICAgIC8vIFNvcnQgb3V0IHRoZSBkeW5hbWljIGxpc3RzLlxuICAgIHRoaXMuZm9ybVZhbHVlU2VydmljZS5zYW5pdGlzZUR5bmFtaWNMaXN0cyhjYXNlRmllbGRzLCBmb3JtRmllbGRzKTtcblxuICAgIC8vIEdldCBob2xkIG9mIHRoZSBDYXNlRXZlbnREYXRhLlxuICAgIGNvbnN0IGNhc2VFdmVudERhdGE6IENhc2VFdmVudERhdGEgPSB0aGlzLmZvcm1WYWx1ZVNlcnZpY2Uuc2FuaXRpc2UoZm9ybUZpZWxkcykgYXMgQ2FzZUV2ZW50RGF0YTtcblxuICAgIC8vIFRpZHkgaXQgdXAgYmVmb3JlIHdlIHJldHVybiBpdC5cbiAgICB0aGlzLmZvcm1WYWx1ZVNlcnZpY2UucmVtb3ZlVW5uZWNlc3NhcnlGaWVsZHMoY2FzZUV2ZW50RGF0YS5kYXRhLCBjYXNlRmllbGRzLCBjbGVhckVtcHR5LCBjbGVhck5vbkNhc2UsXG4gICAgICBmcm9tUHJldmlvdXNQYWdlLCB0aGlzLmN1cnJlbnRQYWdlLmNhc2VfZmllbGRzKTtcblxuICAgIHJldHVybiBjYXNlRXZlbnREYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBzeW5jQ2FzZUVkaXREYXRhU2VydmljZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhc2VFZGl0RGF0YVNlcnZpY2Uuc2V0Q2FzZURldGFpbHModGhpcy5jYXNlRWRpdC5jYXNlRGV0YWlscyk7XG4gICAgdGhpcy5jYXNlRWRpdERhdGFTZXJ2aWNlLnNldENhc2VFdmVudFRyaWdnZXJOYW1lKHRoaXMuZXZlbnRUcmlnZ2VyLm5hbWUpO1xuICAgIHRoaXMuY2FzZUVkaXREYXRhU2VydmljZS5zZXRDYXNlVGl0bGUodGhpcy5nZXRDYXNlVGl0bGUoKSk7XG4gICAgdGhpcy5jYXNlRWRpdERhdGFTZXJ2aWNlLnNldENhc2VFZGl0Rm9ybSh0aGlzLmVkaXRGb3JtKTtcbiAgICB0aGlzLmNhc2VGb3JtVmFsaWRhdGlvbkVycm9yc1N1YiA9IHRoaXMuY2FzZUVkaXREYXRhU2VydmljZS5jYXNlRm9ybVZhbGlkYXRpb25FcnJvcnMkLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAodmFsaWRhdGlvbkVycm9ycykgPT4gdGhpcy52YWxpZGF0aW9uRXJyb3JzID0gdmFsaWRhdGlvbkVycm9yc1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFJweFRyYW5zbGF0ZVBpcGVBcmdzKGZpZWxkTGFiZWw6IHN0cmluZyk6IHsgRklFTERMQUJFTDogc3RyaW5nIH0gfCBudWxsIHtcbiAgICByZXR1cm4gZmllbGRMYWJlbCA/ICh7IEZJRUxETEFCRUw6IGZpZWxkTGFiZWwgfSkgOiBudWxsO1xuICB9XG5cbiAgcHVibGljIG9uRXZlbnRDYW5CZUNvbXBsZXRlZChldmVudENhbkJlQ29tcGxldGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5jYXNlRWRpdC5vbkV2ZW50Q2FuQmVDb21wbGV0ZWQoe1xuICAgICAgZXZlbnRUcmlnZ2VyOiB0aGlzLmV2ZW50VHJpZ2dlcixcbiAgICAgIGV2ZW50Q2FuQmVDb21wbGV0ZWQsXG4gICAgICBjYXNlRGV0YWlsczogdGhpcy5jYXNlRWRpdC5jYXNlRGV0YWlscyxcbiAgICAgIGZvcm06IHRoaXMuZWRpdEZvcm0sXG4gICAgICBzdWJtaXQ6IHRoaXMuY2FzZUVkaXQuc3VibWl0LFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVBbGxKdWRpY2lhbFVzZXJGb3JtQ29udHJvbHMocGFnZTogV2l6YXJkUGFnZSwgZWRpdEZvcm06IFVudHlwZWRGb3JtR3JvdXApOiB2b2lkIHtcbiAgICBwYWdlLmNhc2VfZmllbGRzLmZvckVhY2goY2FzZUZpZWxkID0+IHtcbiAgICAgIGlmIChGaWVsZHNVdGlscy5pc0Nhc2VGaWVsZE9mVHlwZShjYXNlRmllbGQsIFsnSnVkaWNpYWxVc2VyJ10pKSB7XG4gICAgICAgIChlZGl0Rm9ybS5jb250cm9sc1snZGF0YSddIGFzIFVudHlwZWRGb3JtR3JvdXApLnJlbW92ZUNvbnRyb2woYCR7Y2FzZUZpZWxkLmlkfV9qdWRpY2lhbFVzZXJDb250cm9sYCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJjdXJyZW50UGFnZVwiPlxuICA8aDEgKm5nSWY9XCIhY3VycmVudFBhZ2UubGFiZWxcIiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbFwiPnt7ZXZlbnRUcmlnZ2VyLm5hbWUgfCBycHhUcmFuc2xhdGV9fTwvaDE+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJjdXJyZW50UGFnZS5sYWJlbFwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZ292dWstY2FwdGlvbi1sXCI+e3sgZXZlbnRUcmlnZ2VyLm5hbWUgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgICA8aDEgY2xhc3M9XCJnb3Z1ay1oZWFkaW5nLWxcIj57e2N1cnJlbnRQYWdlLmxhYmVsIHwgcnB4VHJhbnNsYXRlfX08L2gxPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuXG48IS0tQ2FzZSBJRCBvciBUaXRsZSAtLT5cbjxkaXYgKm5nSWY9XCJnZXRDYXNlVGl0bGUoKTsgdGhlbiB0aXRsZUJsb2NrOyBlbHNlIGlkQmxvY2tcIj48L2Rpdj5cbjxuZy10ZW1wbGF0ZSAjdGl0bGVCbG9jaz5cbiAgPGNjZC1tYXJrZG93biBbY29udGVudF09XCJnZXRDYXNlVGl0bGUoKSB8IGNjZENhc2VUaXRsZTogY2FzZUZpZWxkcyA6IGVkaXRGb3JtLmNvbnRyb2xzWydkYXRhJ11cIj48L2NjZC1tYXJrZG93bj5cbjwvbmctdGVtcGxhdGU+XG48bmctdGVtcGxhdGUgI2lkQmxvY2s+XG4gIDxoMiAqbmdJZj1cImdldENhc2VJZCgpXCIgY2xhc3M9XCJoZWFkaW5nLWgyXCI+I3t7IGdldENhc2VJZCgpIHwgY2NkQ2FzZVJlZmVyZW5jZSB9fTwvaDI+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIEVycm9yIG1lc3NhZ2Ugc3VtbWFyeSAtLT5cbjxkaXYgKm5nSWY9XCJ2YWxpZGF0aW9uRXJyb3JzLmxlbmd0aCA+IDBcIiBjbGFzcz1cImdvdnVrLWVycm9yLXN1bW1hcnlcIiBhcmlhLWxhYmVsbGVkYnk9XCJlcnJvci1zdW1tYXJ5LXRpdGxlXCIgcm9sZT1cImFsZXJ0XCIgdGFiaW5kZXg9XCItMVwiIGRhdGEtbW9kdWxlPVwiZ292dWstZXJyb3Itc3VtbWFyeVwiPlxuICA8aDIgY2xhc3M9XCJnb3Z1ay1lcnJvci1zdW1tYXJ5X190aXRsZVwiIGlkPVwiZXJyb3Itc3VtbWFyeS10aXRsZVwiPlxuICAgIHt7J1RoZXJlIGlzIGEgcHJvYmxlbScgfCBycHhUcmFuc2xhdGV9fVxuICA8L2gyPlxuICA8ZGl2ICpuZ0Zvcj1cImxldCB2YWxpZGF0aW9uRXJyb3Igb2YgdmFsaWRhdGlvbkVycm9yc1wiIGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fYm9keVwiPlxuICAgIDx1bCBjbGFzcz1cImdvdnVrLWxpc3QgZ292dWstZXJyb3Itc3VtbWFyeV9fbGlzdFwiPlxuICAgICAgPGxpPlxuICAgICAgICA8YSAoY2xpY2spPVwibmF2aWdhdGVUb0Vycm9yRWxlbWVudCh2YWxpZGF0aW9uRXJyb3IuaWQpXCIgY2xhc3M9XCJ2YWxpZGF0aW9uLWVycm9yXCI+XG4gICAgICAgICAge3sgdmFsaWRhdGlvbkVycm9yLm1lc3NhZ2UgfCBycHhUcmFuc2xhdGU6IGdldFJweFRyYW5zbGF0ZVBpcGVBcmdzKHZhbGlkYXRpb25FcnJvci5sYWJlbCB8IHJweFRyYW5zbGF0ZSk6IG51bGwgfX1cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48Y2NkLWNhc2UtZWRpdC1nZW5lcmljLWVycm9ycyBbZXJyb3JdPVwiY2FzZUVkaXQuZXJyb3JcIj48L2NjZC1jYXNlLWVkaXQtZ2VuZXJpYy1lcnJvcnM+XG5cbjxjY2QtY2FsbGJhY2stZXJyb3JzXG4gIFt0cmlnZ2VyVGV4dENvbnRpbnVlXT1cInRyaWdnZXJUZXh0U3RhcnRcIlxuICBbdHJpZ2dlclRleHRJZ25vcmVdPVwidHJpZ2dlclRleHRJZ25vcmVXYXJuaW5nc1wiXG4gIFtjYWxsYmFja0Vycm9yc1N1YmplY3RdPVwiY2FzZUVkaXQuY2FsbGJhY2tFcnJvcnNTdWJqZWN0XCJcbiAgKGNhbGxiYWNrRXJyb3JzQ29udGV4dCk9XCJjYWxsYmFja0Vycm9yc05vdGlmeSgkZXZlbnQpXCI+XG48L2NjZC1jYWxsYmFjay1lcnJvcnM+XG48ZGl2IGNsYXNzPVwid2lkdGgtNTBcIj5cbiAgPGZvcm0gKm5nSWY9XCJjdXJyZW50UGFnZVwiIGNsYXNzPVwiZm9ybVwiIFtmb3JtR3JvdXBdPVwiZWRpdEZvcm1cIiAoc3VibWl0KT1cInN1Ym1pdCgpXCI+XG4gICAgPGZpZWxkc2V0IGlkPVwiZmllbGRzZXQtY2FzZS1kYXRhXCI+XG4gICAgICA8bGVnZW5kIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj48L2xlZ2VuZD5cbiAgICAgIDwhLS0gc2luZ2xlIGNvbHVtbiAtLT5cbiAgICAgIDxjY2QtY2FzZS1lZGl0LWZvcm0gaWQ9J2Nhc2VFZGl0Rm9ybScgKm5nSWY9XCIhY3VycmVudFBhZ2UuaXNNdWx0aUNvbHVtbigpXCIgW2ZpZWxkc109XCJjdXJyZW50UGFnZS5nZXRDb2wxRmllbGRzKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUdyb3VwXT1cImVkaXRGb3JtLmNvbnRyb2xzWydkYXRhJ11cIiBbY2FzZUZpZWxkc109XCJjYXNlRmllbGRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW3BhZ2VDaGFuZ2VTdWJqZWN0XT1cInBhZ2VDaGFuZ2VTdWJqZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKHZhbHVlc0NoYW5nZWQpPVwiYXBwbHlWYWx1ZXNDaGFuZ2VkKCRldmVudClcIj48L2NjZC1jYXNlLWVkaXQtZm9ybT5cbiAgICAgIDwhLS0gdHdvIGNvbHVtbnMgLS0+XG4gICAgICA8ZGl2ICpuZ0lmPVwiY3VycmVudFBhZ2UuaXNNdWx0aUNvbHVtbigpXCIgY2xhc3M9XCJncmlkLXJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uLXR3by10aGlyZHMgcmlnaHRCb3JkZXJTZXBhcmF0b3JcIj5cbiAgICAgICAgICA8Y2NkLWNhc2UtZWRpdC1mb3JtIGlkPSdjYXNlRWRpdEZvcm0xJyBbZmllbGRzXT1cImN1cnJlbnRQYWdlLmdldENvbDFGaWVsZHMoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUdyb3VwXT1cImVkaXRGb3JtLmNvbnRyb2xzWydkYXRhJ11cIiBbY2FzZUZpZWxkc109XCJjYXNlRmllbGRzXCI+PC9jY2QtY2FzZS1lZGl0LWZvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uLW9uZS10aGlyZFwiPlxuICAgICAgICAgIDxjY2QtY2FzZS1lZGl0LWZvcm0gaWQ9J2Nhc2VFZGl0Rm9ybTInIFtmaWVsZHNdPVwiY3VycmVudFBhZ2UuZ2V0Q29sMkZpZWxkcygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtR3JvdXBdPVwiZWRpdEZvcm0uY29udHJvbHNbJ2RhdGEnXVwiIFtjYXNlRmllbGRzXT1cImNhc2VGaWVsZHNcIj48L2NjZC1jYXNlLWVkaXQtZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2ZpZWxkc2V0PlxuXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1yZWxhdGVkXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1zZWNvbmRhcnlcIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cIiEoaGFzUHJldmlvdXNQYWdlJCB8IGFzeW5jKVwiIChjbGljayk9XCJ0b1ByZXZpb3VzUGFnZSgpXCI+XG4gICAgICAgIHt7J1ByZXZpb3VzJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b25cIiB0eXBlPVwic3VibWl0XCIgW2Rpc2FibGVkXT1cInN1Ym1pdHRpbmcoKVwiPnt7dHJpZ2dlclRleHQgfCBycHhUcmFuc2xhdGV9fTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgPHAgY2xhc3M9XCJjYW5jZWxcIj48YSAoY2xpY2spPVwiY2FuY2VsKClcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+e3tnZXRDYW5jZWxUZXh0KCkgfCBycHhUcmFuc2xhdGV9fTwvYT48L3A+XG4gIDwvZm9ybT5cbjwvZGl2PlxuXG48Y2NkLWNhc2UtZXZlbnQtY29tcGxldGlvbiAqbmdJZj1cImNhc2VFZGl0LmlzRXZlbnRDb21wbGV0aW9uQ2hlY2tzUmVxdWlyZWRcIlxuICBbZXZlbnRDb21wbGV0aW9uUGFyYW1zXT1cImNhc2VFZGl0LmV2ZW50Q29tcGxldGlvblBhcmFtc1wiXG4gIChldmVudENhbkJlQ29tcGxldGVkKT1cIm9uRXZlbnRDYW5CZUNvbXBsZXRlZCgkZXZlbnQpXCI+XG48L2NjZC1jYXNlLWV2ZW50LWNvbXBsZXRpb24+XG4iXX0=