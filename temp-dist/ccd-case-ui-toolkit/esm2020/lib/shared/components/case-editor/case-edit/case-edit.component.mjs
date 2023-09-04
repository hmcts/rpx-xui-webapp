import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConditionalShowRegistrarService, GreyBarService } from '../../../directives';
import { CaseEventTrigger, CaseView } from '../../../domain';
import { FieldsPurger, FieldsUtils, FormErrorService, FormValueService, LoadingService, SessionStorageService, WindowService } from '../../../services';
import { Confirmation } from '../domain';
import { CaseNotifier, WizardFactoryService } from '../services';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../services";
import * as i3 from "@angular/router";
import * as i4 from "../../../services";
import * as i5 from "../../../directives";
export class CaseEditComponent {
    constructor(fb, caseNotifier, router, route, fieldsUtils, fieldsPurger, registrarService, wizardFactory, sessionStorageService, windowsService, formValueService, formErrorService, loadingService) {
        this.fb = fb;
        this.caseNotifier = caseNotifier;
        this.router = router;
        this.route = route;
        this.fieldsUtils = fieldsUtils;
        this.fieldsPurger = fieldsPurger;
        this.registrarService = registrarService;
        this.wizardFactory = wizardFactory;
        this.sessionStorageService = sessionStorageService;
        this.windowsService = windowsService;
        this.formValueService = formValueService;
        this.formErrorService = formErrorService;
        this.loadingService = loadingService;
        this.cancelled = new EventEmitter();
        this.submitted = new EventEmitter();
        this.isEventCompletionChecksRequired = false;
        this.isCaseFlagSubmission = false;
        this.ignoreWarning = false;
        this.isLinkedCasesSubmission = false;
        this.callbackErrorsSubject = new Subject();
    }
    ngOnInit() {
        this.wizard = this.wizardFactory.create(this.eventTrigger);
        this.initialUrl = this.sessionStorageService.getItem('eventUrl');
        this.isPageRefreshed = JSON.parse(this.sessionStorageService.getItem('isPageRefreshed'));
        this.checkPageRefresh();
        /* istanbul ignore else */
        if (this.router.url && !this.isPageRefreshed) {
            this.sessionStorageService.setItem('eventUrl', this.router.url);
        }
        this.form = this.fb.group({
            data: new UntypedFormGroup({}),
            event: this.fb.group({
                id: [this.eventTrigger.id, Validators.required],
                summary: [''],
                description: ['']
            })
        });
        this.route.queryParams.subscribe((params) => {
            this.navigationOrigin = params[CaseEditComponent.ORIGIN_QUERY_PARAM];
        });
    }
    ngOnDestroy() {
        /* istanbul ignore else */
        if (this.callbackErrorsSubject) {
            this.callbackErrorsSubject.unsubscribe();
        }
    }
    checkPageRefresh() {
        if (this.isPageRefreshed && this.initialUrl) {
            this.sessionStorageService.removeItem('eventUrl');
            this.windowsService.alert(CaseEditComponent.ALERT_MESSAGE);
            this.router.navigate([this.initialUrl], { relativeTo: this.route });
            return true;
        }
        return false;
    }
    getPage(pageId) {
        return this.wizard.getPage(pageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
    }
    first() {
        const firstPage = this.wizard.firstPage(this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
        return this.router.navigate([firstPage ? firstPage.id : 'submit'], { relativeTo: this.route });
    }
    navigateToPage(pageId) {
        const page = this.getPage(pageId);
        return this.router.navigate([page ? page.id : 'submit'], { relativeTo: this.route });
    }
    next(currentPageId) {
        this.initialUrl = this.sessionStorageService.getItem('eventUrl');
        /* istanbul ignore else */
        if (this.router.url && !this.initialUrl) {
            this.sessionStorageService.setItem('eventUrl', this.router.url);
        }
        this.fieldsPurger.clearHiddenFields(this.form, this.wizard, this.eventTrigger, currentPageId);
        const nextPage = this.getNextPage({
            currentPageId,
            wizard: this.wizard,
            eventTrigger: this.eventTrigger,
            form: this.form,
        });
        /* istanbul ignore else */
        if (!nextPage &&
            !(this.eventTrigger.show_summary || this.eventTrigger.show_summary === null) &&
            !this.eventTrigger.show_event_notes) {
            this.submitForm({
                eventTrigger: this.eventTrigger,
                form: this.form,
                submit: this.submit,
                caseDetails: this.caseDetails,
            });
            return;
        }
        this.registrarService.reset();
        const theQueryParams = {};
        theQueryParams[CaseEditComponent.ORIGIN_QUERY_PARAM] = this.navigationOrigin;
        return this.router.navigate([nextPage ? nextPage.id : 'submit'], { queryParams: theQueryParams, relativeTo: this.route });
    }
    previous(currentPageId) {
        this.fieldsPurger.clearHiddenFields(this.form, this.wizard, this.eventTrigger, currentPageId);
        this.registrarService.reset();
        const previousPage = this.wizard.previousPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
        /* istanbul ignore else */
        if (!previousPage) {
            return Promise.resolve(false);
        }
        const theQueryParams = {};
        theQueryParams[CaseEditComponent.ORIGIN_QUERY_PARAM] = this.navigationOrigin;
        return this.router.navigate([previousPage.id], { queryParams: theQueryParams, relativeTo: this.route });
    }
    hasPrevious(currentPageId) {
        return this.wizard.hasPreviousPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
    }
    cancel() {
        this.cancelled.emit();
    }
    emitSubmitted(response) {
        this.submitted.emit({ caseId: response['id'], status: this.getStatus(response) });
    }
    getNextPage({ wizard, currentPageId, eventTrigger, form }) {
        return wizard.nextPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(eventTrigger, form));
    }
    confirm(confirmation) {
        this.confirmation = confirmation;
        return this.router.navigate(['confirm'], { relativeTo: this.route });
    }
    submitForm({ eventTrigger, form, caseDetails, submit }) {
        this.isSubmitting = true;
        // We have to run the event completion checks if task in session storage
        // and if the task is in session storage, then is it associated to the case
        let taskInSessionStorage;
        const taskStr = this.sessionStorageService.getItem('taskToComplete');
        if (taskStr) {
            taskInSessionStorage = JSON.parse(taskStr);
        }
        if (taskInSessionStorage && taskInSessionStorage.case_id === this.getCaseId(caseDetails)) {
            // Show event completion component to perform event completion checks
            this.eventCompletionParams = ({
                caseId: this.getCaseId(caseDetails),
                eventId: this.getEventId(form),
                task: taskInSessionStorage
            });
            this.isEventCompletionChecksRequired = true;
        }
        else {
            // Task not in session storage, proceed to submit
            const caseEventData = this.generateCaseEventData({
                eventTrigger,
                form
            });
            this.caseSubmit({
                form,
                caseEventData,
                submit
            });
        }
    }
    getCaseId(caseDetails) {
        return (caseDetails ? caseDetails.case_id : '');
    }
    getEventId(form) {
        return form.value.event.id;
    }
    generateCaseEventData({ eventTrigger, form }) {
        const caseEventData = {
            data: this.replaceEmptyComplexFieldValues(this.formValueService.sanitise(this.replaceHiddenFormValuesWithOriginalCaseData(form.get('data'), eventTrigger.case_fields))),
            event: form.value.event
        };
        this.formValueService.clearNonCaseFields(caseEventData.data, eventTrigger.case_fields);
        this.formValueService.removeNullLabels(caseEventData.data, eventTrigger.case_fields);
        this.formValueService.removeEmptyDocuments(caseEventData.data, eventTrigger.case_fields);
        // Remove collection fields that have "min" validation of greater than zero set on the FieldType but are empty;
        // these will fail validation
        this.formValueService.removeEmptyCollectionsWithMinValidation(caseEventData.data, eventTrigger.case_fields);
        // For Case Flag submissions (where a FlagLauncher field is present in the event trigger), the flag details data
        // needs populating for each Flags field, then the FlagLauncher field needs removing
        this.formValueService.repopulateFormDataFromCaseFieldValues(caseEventData.data, eventTrigger.case_fields);
        // Data population step required for Linked Cases
        this.formValueService.populateLinkedCasesDetailsFromCaseFields(caseEventData.data, eventTrigger.case_fields);
        // Remove "Launcher"-type fields (these have no values and are not intended to be persisted)
        this.formValueService.removeCaseFieldsOfType(caseEventData.data, eventTrigger.case_fields, ['FlagLauncher', 'ComponentLauncher']);
        caseEventData.event_token = eventTrigger.event_token;
        caseEventData.ignore_warning = this.ignoreWarning;
        if (this.confirmation) {
            caseEventData.data = {};
        }
        return caseEventData;
    }
    /**
     * Replaces non-array value objects with `null` for any Complex-type fields whose value is effectively empty, i.e.
     * all its sub-fields and descendants are `null` or `undefined`.
     *
     * @param data The object tree representing all the form field data
     * @returns The form field data modified accordingly
     */
    replaceEmptyComplexFieldValues(data) {
        Object.keys(data).forEach((key) => {
            if (!Array.isArray(data[key]) && typeof data[key] === 'object' && !FieldsUtils.containsNonEmptyValues(data[key])) {
                data[key] = null;
            }
        });
        return data;
    }
    /**
     * Traverse *all* values of a {@link UntypedFormGroup}, including those for disabled fields (i.e. hidden ones), replacing the
     * value of any that are hidden AND have `retain_hidden_value` set to `true` in the corresponding `CaseField`, with
     * the *original* value held in the `CaseField` object.
     *
     * This is as per design in EUI-3622, where any user-driven updates to hidden fields with `retain_hidden_value` =
     * `true` are ignored (thus retaining the value displayed originally).
     *
     * * For Complex field types, the replacement above is performed recursively for all hidden sub-fields with
     * `retain_hidden_value` = `true`.
     *
     * * For Collection field types, including collections of Complex and Document field types, the replacement is
     * performed for all fields in the collection.
     *
     * @param UntypedFormGroup The `UntypedFormGroup` instance whose raw values are to be traversed
     * @param caseFields The array of {@link CaseField} domain model objects corresponding to fields in `UntypedFormGroup`
     * @param parentField Reference to the parent `CaseField`. Used for retrieving the sub-field values of a Complex field
     * to perform recursive replacement - the sub-field `CaseField`s themselves do *not* contain any values
     * @returns An object with the *raw* form value data (as key-value pairs), with any value replacements as necessary
     */
    replaceHiddenFormValuesWithOriginalCaseData(formGroup, caseFields, parentField) {
        // Get the raw form value data, which includes the values of any disabled controls, as key-value pairs
        const rawFormValueData = formGroup.getRawValue();
        // Place all case fields in a lookup object, so they can be retrieved by id
        const caseFieldsLookup = {};
        for (let i = 0, len = caseFields.length; i < len; i++) {
            caseFieldsLookup[caseFields[i].id] = caseFields[i];
        }
        /**
         * Replace any form value with the original, where its CaseField is hidden AND has the retain_hidden_value flag set
         * to true.
         *
         * If the CaseField's `hidden` attribute is null or undefined, then check this attribute in the parent CaseField (if
         * one exists). This is occurring (and is possibly a bug) when a CaseField is a sub-field of a Complex type, or an
         * item in a Collection type.
         *
         * If the field is a Complex type with retain_hidden_value = true, perform a recursive replacement for all (hidden)
         * sub-fields with retain_hidden_value = true, using their original CaseField values (from the `formatted_value`
         * attribute).
         *
         * If the field is a Collection type with retain_hidden_value = true, the entire collection is replaced with the
         * original from `formatted_value`. This applies to *all* types of Collections.
         */
        /* istanbul ignore next */
        Object.keys(rawFormValueData).forEach((key) => {
            const caseField = caseFieldsLookup[key];
            // If caseField.hidden is NOT truthy and also NOT equal to false, then it must be null/undefined (remember that
            // both null and undefined are equal to *neither false nor true*)
            if (caseField && caseField.retain_hidden_value &&
                (caseField.hidden || (caseField.hidden !== false && parentField && parentField.hidden))) {
                if (caseField.field_type.type === 'Complex') {
                    // Note: Deliberate use of equality (==) and non-equality (!=) operators for null checks throughout, to
                    // handle both null and undefined values
                    if (caseField.value != null) {
                        // Call this function recursively to replace the Complex field's sub-fields as necessary, passing the
                        // CaseField itself (the sub-fields do not contain any values, so these need to be obtained from the
                        // parent)
                        // Update rawFormValueData for this field
                        // creating form group and adding control into it in case caseField is of complext type and and part of UntypedFormGroup
                        const form = new UntypedFormGroup({});
                        if (formGroup.controls[key].value) {
                            Object.keys(formGroup.controls[key].value).forEach((item) => {
                                form.addControl(item, new FormControl(formGroup.controls[key].value[item]));
                            });
                        }
                        rawFormValueData[key] = this.replaceHiddenFormValuesWithOriginalCaseData(form, caseField.field_type.complex_fields, caseField);
                    }
                }
                else {
                    // Default case also handles collections of *all* types; the entire collection in rawFormValueData will be
                    // replaced with the original from formatted_value
                    // Use the CaseField's existing *formatted_value* from the parent, if available. (This is necessary for
                    // Complex fields, whose sub-fields do not hold any values in the model.) Otherwise, use formatted_value
                    // from the CaseField itself.
                    if (parentField && parentField.formatted_value) {
                        rawFormValueData[key] = parentField.formatted_value[caseField.id];
                    }
                    else {
                        rawFormValueData[key] = caseField.formatted_value;
                    }
                }
            }
        });
        return rawFormValueData;
    }
    caseSubmit({ form, caseEventData, submit }) {
        const loadingSpinnerToken = this.loadingService.register();
        submit(caseEventData)
            .pipe(finalize(() => {
            this.loadingService.unregister(loadingSpinnerToken);
        }))
            .subscribe(response => {
            this.caseNotifier.cachedCaseView = null;
            this.sessionStorageService.removeItem('eventUrl');
            const confirmation = this.buildConfirmation(response);
            if (confirmation && (confirmation.getHeader() || confirmation.getBody())) {
                this.confirm(confirmation);
            }
            else {
                this.emitSubmitted(response);
            }
        }, error => {
            this.error = error;
            this.callbackErrorsSubject.next(error);
            /* istanbul ignore else */
            if (this.error.details) {
                this.formErrorService
                    .mapFieldErrors(this.error.details.field_errors, form.controls['data'], 'validation');
            }
            this.isSubmitting = false;
        });
    }
    buildConfirmation(response) {
        if (response['after_submit_callback_response']) {
            return new Confirmation(response['id'], response['callback_response_status'], response['after_submit_callback_response']['confirmation_header'], response['after_submit_callback_response']['confirmation_body']);
        }
        else {
            return null;
        }
    }
    onEventCanBeCompleted({ eventTrigger, eventCanBeCompleted, caseDetails, form, submit }) {
        if (eventCanBeCompleted) {
            // Submit
            const caseEventData = this.generateCaseEventData({ eventTrigger, form });
            this.caseSubmit({ form, caseEventData, submit });
        }
        else {
            // Navigate to tasks tab on case details page
            this.router.navigate([`/cases/case-details/${this.getCaseId(caseDetails)}/tasks`], { relativeTo: this.route });
        }
    }
    getStatus(response) {
        return this.hasCallbackFailed(response) ? response['callback_response_status'] : response['delete_draft_response_status'];
    }
    hasCallbackFailed(response) {
        return response['callback_response_status'] !== 'CALLBACK_COMPLETED';
    }
}
CaseEditComponent.ORIGIN_QUERY_PARAM = 'origin';
CaseEditComponent.ALERT_MESSAGE = 'Page is being refreshed so you will be redirected to the first page of this event.';
CaseEditComponent.ɵfac = function CaseEditComponent_Factory(t) { return new (t || CaseEditComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.CaseNotifier), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i3.ActivatedRoute), i0.ɵɵdirectiveInject(i4.FieldsUtils), i0.ɵɵdirectiveInject(i4.FieldsPurger), i0.ɵɵdirectiveInject(i5.ConditionalShowRegistrarService), i0.ɵɵdirectiveInject(i2.WizardFactoryService), i0.ɵɵdirectiveInject(i4.SessionStorageService), i0.ɵɵdirectiveInject(i4.WindowService), i0.ɵɵdirectiveInject(i4.FormValueService), i0.ɵɵdirectiveInject(i4.FormErrorService), i0.ɵɵdirectiveInject(i4.LoadingService)); };
CaseEditComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseEditComponent, selectors: [["ccd-case-edit"]], inputs: { eventTrigger: "eventTrigger", submit: "submit", validate: "validate", saveDraft: "saveDraft", caseDetails: "caseDetails" }, outputs: { cancelled: "cancelled", submitted: "submitted" }, features: [i0.ɵɵProvidersFeature([GreyBarService])], decls: 1, vars: 0, template: function CaseEditComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "router-outlet");
    } }, dependencies: [i3.RouterOutlet], styles: ["#fieldset-case-data[_ngcontent-%COMP%]{margin-bottom:30px}#fieldset-case-data[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{width:1%;white-space:nowrap;vertical-align:top}.compound-field[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:0}#confirmation-header[_ngcontent-%COMP%]{width:630px;background-color:#17958b;border:solid 1px #979797;color:#fff;text-align:center}#confirmation-body[_ngcontent-%COMP%]{width:630px;background-color:#fff}.valign-top[_ngcontent-%COMP%]{vertical-align:top}.summary-fields[_ngcontent-%COMP%]{margin-bottom:30px}.summary-fields[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .summary-fields[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-bottom:0px}a.disabled[_ngcontent-%COMP%]{pointer-events:none;cursor:default}.case-field-label[_ngcontent-%COMP%]{width:45%}.case-field-content[_ngcontent-%COMP%]{width:50%}.case-field-change[_ngcontent-%COMP%]{width:5%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseEditComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-edit', providers: [GreyBarService], template: "<router-outlet></router-outlet>\n", styles: ["#fieldset-case-data{margin-bottom:30px}#fieldset-case-data th{width:1%;white-space:nowrap;vertical-align:top}.compound-field td{padding:0}#confirmation-header{width:630px;background-color:#17958b;border:solid 1px #979797;color:#fff;text-align:center}#confirmation-body{width:630px;background-color:#fff}.valign-top{vertical-align:top}.summary-fields{margin-bottom:30px}.summary-fields tbody tr th,.summary-fields tbody tr td{border-bottom:0px}a.disabled{pointer-events:none;cursor:default}.case-field-label{width:45%}.case-field-content{width:50%}.case-field-change{width:5%}\n"] }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.CaseNotifier }, { type: i3.Router }, { type: i3.ActivatedRoute }, { type: i4.FieldsUtils }, { type: i4.FieldsPurger }, { type: i5.ConditionalShowRegistrarService }, { type: i2.WizardFactoryService }, { type: i4.SessionStorageService }, { type: i4.WindowService }, { type: i4.FormValueService }, { type: i4.FormErrorService }, { type: i4.LoadingService }]; }, { eventTrigger: [{
            type: Input
        }], submit: [{
            type: Input
        }], validate: [{
            type: Input
        }], saveDraft: [{
            type: Input
        }], caseDetails: [{
            type: Input
        }], cancelled: [{
            type: Output
        }], submitted: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWVkaXQvY2FzZS1lZGl0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWVkaXRvci9jYXNlLWVkaXQvY2FzZS1lZGl0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxjQUFjLEVBQVUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLCtCQUErQixFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RGLE9BQU8sRUFJVSxnQkFBZ0IsRUFDL0IsUUFBUSxFQUNULE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUNMLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUM3RSxxQkFBcUIsRUFBRSxhQUFhLEVBQ3JDLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFlBQVksRUFBc0IsTUFBTSxXQUFXLENBQUM7QUFF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QkFBMEIsQ0FBQyxLQUFLLG9CQUFvQixDQUFDO0lBQ3ZFLENBQUM7O0FBcGJzQixvQ0FBa0IsR0FBRyxRQUFRLENBQUM7QUFDOUIsK0JBQWEsR0FBRyxvRkFBb0YsQ0FBQztrRkFGakgsaUJBQWlCO29FQUFqQixpQkFBaUIsc1FBRmpCLENBQUMsY0FBYyxDQUFDO1FDMUI3QixnQ0FBK0I7O3VGRDRCbEIsaUJBQWlCO2NBTjdCLFNBQVM7MkJBQ0UsZUFBZSxhQUdkLENBQUMsY0FBYyxDQUFDOzRhQU9wQixZQUFZO2tCQURsQixLQUFLO1lBSUMsTUFBTTtrQkFEWixLQUFLO1lBSUMsUUFBUTtrQkFEZCxLQUFLO1lBSUMsU0FBUztrQkFEZixLQUFLO1lBSUMsV0FBVztrQkFEakIsS0FBSztZQUlDLFNBQVM7a0JBRGYsTUFBTTtZQUlBLFNBQVM7a0JBRGYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcywgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbmFsaXplIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxTaG93UmVnaXN0cmFyU2VydmljZSwgR3JleUJhclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzJztcbmltcG9ydCB7XG4gIENhc2VFZGl0Q2FzZVN1Ym1pdCwgQ2FzZUVkaXRHZW5lcmF0ZUNhc2VFdmVudERhdGEsIENhc2VFZGl0R2V0TmV4dFBhZ2UsXG4gIENhc2VFZGl0U3VibWl0Rm9ybSxcbiAgQ2FzZUVkaXRvbkV2ZW50Q2FuQmVDb21wbGV0ZWQsXG4gIENhc2VFdmVudERhdGEsIENhc2VFdmVudFRyaWdnZXIsIENhc2VGaWVsZCxcbiAgQ2FzZVZpZXcsIERyYWZ0LCBIdHRwRXJyb3IsIFByb2ZpbGVcbn0gZnJvbSAnLi4vLi4vLi4vZG9tYWluJztcbmltcG9ydCB7IFRhc2sgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vd29yay1hbGxvY2F0aW9uL1Rhc2snO1xuaW1wb3J0IHtcbiAgRmllbGRzUHVyZ2VyLCBGaWVsZHNVdGlscywgRm9ybUVycm9yU2VydmljZSwgRm9ybVZhbHVlU2VydmljZSwgTG9hZGluZ1NlcnZpY2UsXG4gIFNlc3Npb25TdG9yYWdlU2VydmljZSwgV2luZG93U2VydmljZVxufSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBDb25maXJtYXRpb24sIFdpemFyZCwgV2l6YXJkUGFnZSB9IGZyb20gJy4uL2RvbWFpbic7XG5pbXBvcnQgeyBFdmVudENvbXBsZXRpb25QYXJhbXMgfSBmcm9tICcuLi9kb21haW4vZXZlbnQtY29tcGxldGlvbi1wYXJhbXMubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZU5vdGlmaWVyLCBXaXphcmRGYWN0b3J5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWNhc2UtZWRpdCcsXG4gIHRlbXBsYXRlVXJsOiAnY2FzZS1lZGl0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4uL2Nhc2UtZWRpdC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW0dyZXlCYXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBDYXNlRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBPUklHSU5fUVVFUllfUEFSQU0gPSAnb3JpZ2luJztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBBTEVSVF9NRVNTQUdFID0gJ1BhZ2UgaXMgYmVpbmcgcmVmcmVzaGVkIHNvIHlvdSB3aWxsIGJlIHJlZGlyZWN0ZWQgdG8gdGhlIGZpcnN0IHBhZ2Ugb2YgdGhpcyBldmVudC4nO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBldmVudFRyaWdnZXI6IENhc2VFdmVudFRyaWdnZXI7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHN1Ym1pdDogKGNhc2VFdmVudERhdGE6IENhc2VFdmVudERhdGEsIHByb2ZpbGU/OiBQcm9maWxlKSA9PiBPYnNlcnZhYmxlPG9iamVjdD47XG5cbiAgQElucHV0KClcbiAgcHVibGljIHZhbGlkYXRlOiAoY2FzZUV2ZW50RGF0YTogQ2FzZUV2ZW50RGF0YSwgcGFnZUlkOiBzdHJpbmcpID0+IE9ic2VydmFibGU8b2JqZWN0PjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2F2ZURyYWZ0OiAoY2FzZUV2ZW50RGF0YTogQ2FzZUV2ZW50RGF0YSkgPT4gT2JzZXJ2YWJsZTxEcmFmdD47XG5cbiAgQElucHV0KClcbiAgcHVibGljIGNhc2VEZXRhaWxzOiBDYXNlVmlldztcblxuICBAT3V0cHV0KClcbiAgcHVibGljIGNhbmNlbGxlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBzdWJtaXR0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyB3aXphcmQ6IFdpemFyZDtcblxuICBwdWJsaWMgZm9ybTogVW50eXBlZEZvcm1Hcm91cDtcblxuICBwdWJsaWMgY29uZmlybWF0aW9uOiBDb25maXJtYXRpb247XG5cbiAgcHVibGljIG5hdmlnYXRpb25PcmlnaW46IGFueTtcblxuICBwdWJsaWMgaW5pdGlhbFVybDogc3RyaW5nO1xuXG4gIHB1YmxpYyBpc1BhZ2VSZWZyZXNoZWQ6IGJvb2xlYW47XG5cbiAgcHVibGljIGlzU3VibWl0dGluZzogYm9vbGVhbjtcblxuICBwdWJsaWMgZXZlbnRDb21wbGV0aW9uUGFyYW1zOiBFdmVudENvbXBsZXRpb25QYXJhbXM7XG5cbiAgcHVibGljIHN1Ym1pdFJlc3BvbnNlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuXG4gIHB1YmxpYyBpc0V2ZW50Q29tcGxldGlvbkNoZWNrc1JlcXVpcmVkID0gZmFsc2U7XG5cbiAgcHVibGljIGlzQ2FzZUZsYWdTdWJtaXNzaW9uID0gZmFsc2U7XG5cbiAgcHVibGljIGlnbm9yZVdhcm5pbmcgPSBmYWxzZTtcblxuICBwdWJsaWMgaXNMaW5rZWRDYXNlc1N1Ym1pc3Npb24gPSBmYWxzZTtcblxuICBwdWJsaWMgZXJyb3I6IEh0dHBFcnJvcjtcblxuICBwdWJsaWMgY2FsbGJhY2tFcnJvcnNTdWJqZWN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FzZU5vdGlmaWVyOiBDYXNlTm90aWZpZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpZWxkc1V0aWxzOiBGaWVsZHNVdGlscyxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpZWxkc1B1cmdlcjogRmllbGRzUHVyZ2VyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVnaXN0cmFyU2VydmljZTogQ29uZGl0aW9uYWxTaG93UmVnaXN0cmFyU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdpemFyZEZhY3Rvcnk6IFdpemFyZEZhY3RvcnlTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlOiBTZXNzaW9uU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSB3aW5kb3dzU2VydmljZTogV2luZG93U2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZvcm1WYWx1ZVNlcnZpY2U6IEZvcm1WYWx1ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBmb3JtRXJyb3JTZXJ2aWNlOiBGb3JtRXJyb3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9hZGluZ1NlcnZpY2U6IExvYWRpbmdTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMud2l6YXJkID0gdGhpcy53aXphcmRGYWN0b3J5LmNyZWF0ZSh0aGlzLmV2ZW50VHJpZ2dlcik7XG4gICAgdGhpcy5pbml0aWFsVXJsID0gdGhpcy5zZXNzaW9uU3RvcmFnZVNlcnZpY2UuZ2V0SXRlbSgnZXZlbnRVcmwnKTtcbiAgICB0aGlzLmlzUGFnZVJlZnJlc2hlZCA9IEpTT04ucGFyc2UodGhpcy5zZXNzaW9uU3RvcmFnZVNlcnZpY2UuZ2V0SXRlbSgnaXNQYWdlUmVmcmVzaGVkJykpO1xuXG4gICAgdGhpcy5jaGVja1BhZ2VSZWZyZXNoKCk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAodGhpcy5yb3V0ZXIudXJsICYmICF0aGlzLmlzUGFnZVJlZnJlc2hlZCkge1xuICAgICAgdGhpcy5zZXNzaW9uU3RvcmFnZVNlcnZpY2Uuc2V0SXRlbSgnZXZlbnRVcmwnLCB0aGlzLnJvdXRlci51cmwpO1xuICAgIH1cblxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgZGF0YTogbmV3IFVudHlwZWRGb3JtR3JvdXAoe30pLFxuICAgICAgZXZlbnQ6IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICBpZDogW3RoaXMuZXZlbnRUcmlnZ2VyLmlkLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgc3VtbWFyeTogWycnXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFsnJ11cbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZSgocGFyYW1zOiBQYXJhbXMpID0+IHtcbiAgICAgIHRoaXMubmF2aWdhdGlvbk9yaWdpbiA9IHBhcmFtc1tDYXNlRWRpdENvbXBvbmVudC5PUklHSU5fUVVFUllfUEFSQU1dO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHRoaXMuY2FsbGJhY2tFcnJvcnNTdWJqZWN0KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrRXJyb3JzU3ViamVjdC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjaGVja1BhZ2VSZWZyZXNoKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmlzUGFnZVJlZnJlc2hlZCAmJiB0aGlzLmluaXRpYWxVcmwpIHtcbiAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLnJlbW92ZUl0ZW0oJ2V2ZW50VXJsJyk7XG4gICAgICB0aGlzLndpbmRvd3NTZXJ2aWNlLmFsZXJ0KENhc2VFZGl0Q29tcG9uZW50LkFMRVJUX01FU1NBR0UpO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuaW5pdGlhbFVybF0sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0UGFnZShwYWdlSWQ6IHN0cmluZyk6IFdpemFyZFBhZ2Uge1xuICAgIHJldHVybiB0aGlzLndpemFyZC5nZXRQYWdlKHBhZ2VJZCwgdGhpcy5maWVsZHNVdGlscy5idWlsZENhblNob3dQcmVkaWNhdGUodGhpcy5ldmVudFRyaWdnZXIsIHRoaXMuZm9ybSkpO1xuICB9XG5cbiAgcHVibGljIGZpcnN0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGZpcnN0UGFnZSA9IHRoaXMud2l6YXJkLmZpcnN0UGFnZSh0aGlzLmZpZWxkc1V0aWxzLmJ1aWxkQ2FuU2hvd1ByZWRpY2F0ZSh0aGlzLmV2ZW50VHJpZ2dlciwgdGhpcy5mb3JtKSk7XG4gICAgcmV0dXJuIHRoaXMucm91dGVyLm5hdmlnYXRlKFtmaXJzdFBhZ2UgPyBmaXJzdFBhZ2UuaWQgOiAnc3VibWl0J10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuYXZpZ2F0ZVRvUGFnZShwYWdlSWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHBhZ2UgPSB0aGlzLmdldFBhZ2UocGFnZUlkKTtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3BhZ2UgPyBwYWdlLmlkIDogJ3N1Ym1pdCddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XG4gIH1cblxuICBwdWJsaWMgbmV4dChjdXJyZW50UGFnZUlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0aGlzLmluaXRpYWxVcmwgPSB0aGlzLnNlc3Npb25TdG9yYWdlU2VydmljZS5nZXRJdGVtKCdldmVudFVybCcpO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHRoaXMucm91dGVyLnVybCAmJiAhdGhpcy5pbml0aWFsVXJsKSB7XG4gICAgICB0aGlzLnNlc3Npb25TdG9yYWdlU2VydmljZS5zZXRJdGVtKCdldmVudFVybCcsIHRoaXMucm91dGVyLnVybCk7XG4gICAgfVxuICAgIHRoaXMuZmllbGRzUHVyZ2VyLmNsZWFySGlkZGVuRmllbGRzKHRoaXMuZm9ybSwgdGhpcy53aXphcmQsIHRoaXMuZXZlbnRUcmlnZ2VyLCBjdXJyZW50UGFnZUlkKTtcbiAgICBjb25zdCBuZXh0UGFnZSA9IHRoaXMuZ2V0TmV4dFBhZ2Uoe1xuICAgICAgY3VycmVudFBhZ2VJZCxcbiAgICAgIHdpemFyZDogdGhpcy53aXphcmQsXG4gICAgICBldmVudFRyaWdnZXI6IHRoaXMuZXZlbnRUcmlnZ2VyLFxuICAgICAgZm9ybTogdGhpcy5mb3JtLFxuICAgIH0pO1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoIW5leHRQYWdlICYmXG4gICAgICAhKHRoaXMuZXZlbnRUcmlnZ2VyLnNob3dfc3VtbWFyeSB8fCB0aGlzLmV2ZW50VHJpZ2dlci5zaG93X3N1bW1hcnkgPT09IG51bGwpICYmXG4gICAgICAhdGhpcy5ldmVudFRyaWdnZXIuc2hvd19ldmVudF9ub3Rlcykge1xuICAgICAgdGhpcy5zdWJtaXRGb3JtKHtcbiAgICAgICAgZXZlbnRUcmlnZ2VyOiB0aGlzLmV2ZW50VHJpZ2dlcixcbiAgICAgICAgZm9ybTogdGhpcy5mb3JtLFxuICAgICAgICBzdWJtaXQ6IHRoaXMuc3VibWl0LFxuICAgICAgICBjYXNlRGV0YWlsczogdGhpcy5jYXNlRGV0YWlscyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucmVnaXN0cmFyU2VydmljZS5yZXNldCgpO1xuXG4gICAgY29uc3QgdGhlUXVlcnlQYXJhbXM6IFBhcmFtcyA9IHt9O1xuICAgIHRoZVF1ZXJ5UGFyYW1zW0Nhc2VFZGl0Q29tcG9uZW50Lk9SSUdJTl9RVUVSWV9QQVJBTV0gPSB0aGlzLm5hdmlnYXRpb25PcmlnaW47XG4gICAgcmV0dXJuIHRoaXMucm91dGVyLm5hdmlnYXRlKFtuZXh0UGFnZSA/IG5leHRQYWdlLmlkIDogJ3N1Ym1pdCddLCB7IHF1ZXJ5UGFyYW1zOiB0aGVRdWVyeVBhcmFtcywgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2aW91cyhjdXJyZW50UGFnZUlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0aGlzLmZpZWxkc1B1cmdlci5jbGVhckhpZGRlbkZpZWxkcyh0aGlzLmZvcm0sIHRoaXMud2l6YXJkLCB0aGlzLmV2ZW50VHJpZ2dlciwgY3VycmVudFBhZ2VJZCk7XG4gICAgdGhpcy5yZWdpc3RyYXJTZXJ2aWNlLnJlc2V0KCk7XG5cbiAgICBjb25zdCBwcmV2aW91c1BhZ2UgPSB0aGlzLndpemFyZC5wcmV2aW91c1BhZ2UoY3VycmVudFBhZ2VJZCwgdGhpcy5maWVsZHNVdGlscy5idWlsZENhblNob3dQcmVkaWNhdGUodGhpcy5ldmVudFRyaWdnZXIsIHRoaXMuZm9ybSkpO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKCFwcmV2aW91c1BhZ2UpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHRoZVF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSB7fTtcbiAgICB0aGVRdWVyeVBhcmFtc1tDYXNlRWRpdENvbXBvbmVudC5PUklHSU5fUVVFUllfUEFSQU1dID0gdGhpcy5uYXZpZ2F0aW9uT3JpZ2luO1xuICAgIHJldHVybiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcHJldmlvdXNQYWdlLmlkXSwgeyBxdWVyeVBhcmFtczogdGhlUXVlcnlQYXJhbXMsIHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XG4gIH1cblxuICBwdWJsaWMgaGFzUHJldmlvdXMoY3VycmVudFBhZ2VJZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMud2l6YXJkLmhhc1ByZXZpb3VzUGFnZShjdXJyZW50UGFnZUlkLCB0aGlzLmZpZWxkc1V0aWxzLmJ1aWxkQ2FuU2hvd1ByZWRpY2F0ZSh0aGlzLmV2ZW50VHJpZ2dlciwgdGhpcy5mb3JtKSk7XG4gIH1cblxuICBwdWJsaWMgY2FuY2VsKCk6IHZvaWQge1xuICAgIHRoaXMuY2FuY2VsbGVkLmVtaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBlbWl0U3VibWl0dGVkKHJlc3BvbnNlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5zdWJtaXR0ZWQuZW1pdCh7IGNhc2VJZDogcmVzcG9uc2VbJ2lkJ10sIHN0YXR1czogdGhpcy5nZXRTdGF0dXMocmVzcG9uc2UpIH0pO1xuICB9XG5cbiAgcHVibGljIGdldE5leHRQYWdlKHsgd2l6YXJkLCBjdXJyZW50UGFnZUlkLCBldmVudFRyaWdnZXIsIGZvcm0gfTogQ2FzZUVkaXRHZXROZXh0UGFnZSk6IFdpemFyZFBhZ2Uge1xuICAgIHJldHVybiB3aXphcmQubmV4dFBhZ2UoXG4gICAgICBjdXJyZW50UGFnZUlkLFxuICAgICAgdGhpcy5maWVsZHNVdGlscy5idWlsZENhblNob3dQcmVkaWNhdGUoZXZlbnRUcmlnZ2VyLCBmb3JtKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgY29uZmlybShjb25maXJtYXRpb246IENvbmZpcm1hdGlvbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHRoaXMuY29uZmlybWF0aW9uID0gY29uZmlybWF0aW9uO1xuICAgIHJldHVybiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2NvbmZpcm0nXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xuICB9XG5cbiAgcHVibGljIHN1Ym1pdEZvcm0oeyBldmVudFRyaWdnZXIsIGZvcm0sIGNhc2VEZXRhaWxzLCBzdWJtaXQgfTogQ2FzZUVkaXRTdWJtaXRGb3JtKTogdm9pZCB7XG4gICAgdGhpcy5pc1N1Ym1pdHRpbmcgPSB0cnVlO1xuICAgIC8vIFdlIGhhdmUgdG8gcnVuIHRoZSBldmVudCBjb21wbGV0aW9uIGNoZWNrcyBpZiB0YXNrIGluIHNlc3Npb24gc3RvcmFnZVxuICAgIC8vIGFuZCBpZiB0aGUgdGFzayBpcyBpbiBzZXNzaW9uIHN0b3JhZ2UsIHRoZW4gaXMgaXQgYXNzb2NpYXRlZCB0byB0aGUgY2FzZVxuICAgIGxldCB0YXNrSW5TZXNzaW9uU3RvcmFnZTogVGFzaztcbiAgICBjb25zdCB0YXNrU3RyID0gdGhpcy5zZXNzaW9uU3RvcmFnZVNlcnZpY2UuZ2V0SXRlbSgndGFza1RvQ29tcGxldGUnKTtcbiAgICBpZiAodGFza1N0cikge1xuICAgICAgdGFza0luU2Vzc2lvblN0b3JhZ2UgPSBKU09OLnBhcnNlKHRhc2tTdHIpO1xuICAgIH1cblxuICAgIGlmICh0YXNrSW5TZXNzaW9uU3RvcmFnZSAmJiB0YXNrSW5TZXNzaW9uU3RvcmFnZS5jYXNlX2lkID09PSB0aGlzLmdldENhc2VJZChjYXNlRGV0YWlscykpIHtcbiAgICAgIC8vIFNob3cgZXZlbnQgY29tcGxldGlvbiBjb21wb25lbnQgdG8gcGVyZm9ybSBldmVudCBjb21wbGV0aW9uIGNoZWNrc1xuICAgICAgdGhpcy5ldmVudENvbXBsZXRpb25QYXJhbXMgPSAoe1xuICAgICAgICBjYXNlSWQ6IHRoaXMuZ2V0Q2FzZUlkKGNhc2VEZXRhaWxzKSxcbiAgICAgICAgZXZlbnRJZDogdGhpcy5nZXRFdmVudElkKGZvcm0pLFxuICAgICAgICB0YXNrOiB0YXNrSW5TZXNzaW9uU3RvcmFnZVxuICAgICAgfSk7XG4gICAgICB0aGlzLmlzRXZlbnRDb21wbGV0aW9uQ2hlY2tzUmVxdWlyZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUYXNrIG5vdCBpbiBzZXNzaW9uIHN0b3JhZ2UsIHByb2NlZWQgdG8gc3VibWl0XG4gICAgICBjb25zdCBjYXNlRXZlbnREYXRhID0gdGhpcy5nZW5lcmF0ZUNhc2VFdmVudERhdGEoe1xuICAgICAgICBldmVudFRyaWdnZXIsXG4gICAgICAgIGZvcm1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5jYXNlU3VibWl0KHtcbiAgICAgICAgZm9ybSxcbiAgICAgICAgY2FzZUV2ZW50RGF0YSxcbiAgICAgICAgc3VibWl0XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2FzZUlkKGNhc2VEZXRhaWxzOiBDYXNlVmlldyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIChjYXNlRGV0YWlscyA/IGNhc2VEZXRhaWxzLmNhc2VfaWQgOiAnJyk7XG4gIH1cblxuICBwcml2YXRlIGdldEV2ZW50SWQoZm9ybTogVW50eXBlZEZvcm1Hcm91cCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZvcm0udmFsdWUuZXZlbnQuaWQ7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlQ2FzZUV2ZW50RGF0YSh7IGV2ZW50VHJpZ2dlciwgZm9ybSB9OiBDYXNlRWRpdEdlbmVyYXRlQ2FzZUV2ZW50RGF0YSk6IENhc2VFdmVudERhdGEge1xuICAgIGNvbnN0IGNhc2VFdmVudERhdGE6IENhc2VFdmVudERhdGEgPSB7XG4gICAgICBkYXRhOiB0aGlzLnJlcGxhY2VFbXB0eUNvbXBsZXhGaWVsZFZhbHVlcyhcbiAgICAgICAgdGhpcy5mb3JtVmFsdWVTZXJ2aWNlLnNhbml0aXNlKFxuICAgICAgICAgIHRoaXMucmVwbGFjZUhpZGRlbkZvcm1WYWx1ZXNXaXRoT3JpZ2luYWxDYXNlRGF0YShcbiAgICAgICAgICAgIGZvcm0uZ2V0KCdkYXRhJykgYXMgVW50eXBlZEZvcm1Hcm91cCwgZXZlbnRUcmlnZ2VyLmNhc2VfZmllbGRzKSkpLFxuICAgICAgZXZlbnQ6IGZvcm0udmFsdWUuZXZlbnRcbiAgICB9IGFzIENhc2VFdmVudERhdGE7XG4gICAgdGhpcy5mb3JtVmFsdWVTZXJ2aWNlLmNsZWFyTm9uQ2FzZUZpZWxkcyhjYXNlRXZlbnREYXRhLmRhdGEsIGV2ZW50VHJpZ2dlci5jYXNlX2ZpZWxkcyk7XG4gICAgdGhpcy5mb3JtVmFsdWVTZXJ2aWNlLnJlbW92ZU51bGxMYWJlbHMoY2FzZUV2ZW50RGF0YS5kYXRhLCBldmVudFRyaWdnZXIuY2FzZV9maWVsZHMpO1xuICAgIHRoaXMuZm9ybVZhbHVlU2VydmljZS5yZW1vdmVFbXB0eURvY3VtZW50cyhjYXNlRXZlbnREYXRhLmRhdGEsIGV2ZW50VHJpZ2dlci5jYXNlX2ZpZWxkcyk7XG4gICAgLy8gUmVtb3ZlIGNvbGxlY3Rpb24gZmllbGRzIHRoYXQgaGF2ZSBcIm1pblwiIHZhbGlkYXRpb24gb2YgZ3JlYXRlciB0aGFuIHplcm8gc2V0IG9uIHRoZSBGaWVsZFR5cGUgYnV0IGFyZSBlbXB0eTtcbiAgICAvLyB0aGVzZSB3aWxsIGZhaWwgdmFsaWRhdGlvblxuICAgIHRoaXMuZm9ybVZhbHVlU2VydmljZS5yZW1vdmVFbXB0eUNvbGxlY3Rpb25zV2l0aE1pblZhbGlkYXRpb24oY2FzZUV2ZW50RGF0YS5kYXRhLCBldmVudFRyaWdnZXIuY2FzZV9maWVsZHMpO1xuICAgIC8vIEZvciBDYXNlIEZsYWcgc3VibWlzc2lvbnMgKHdoZXJlIGEgRmxhZ0xhdW5jaGVyIGZpZWxkIGlzIHByZXNlbnQgaW4gdGhlIGV2ZW50IHRyaWdnZXIpLCB0aGUgZmxhZyBkZXRhaWxzIGRhdGFcbiAgICAvLyBuZWVkcyBwb3B1bGF0aW5nIGZvciBlYWNoIEZsYWdzIGZpZWxkLCB0aGVuIHRoZSBGbGFnTGF1bmNoZXIgZmllbGQgbmVlZHMgcmVtb3ZpbmdcbiAgICB0aGlzLmZvcm1WYWx1ZVNlcnZpY2UucmVwb3B1bGF0ZUZvcm1EYXRhRnJvbUNhc2VGaWVsZFZhbHVlcyhjYXNlRXZlbnREYXRhLmRhdGEsIGV2ZW50VHJpZ2dlci5jYXNlX2ZpZWxkcyk7XG4gICAgLy8gRGF0YSBwb3B1bGF0aW9uIHN0ZXAgcmVxdWlyZWQgZm9yIExpbmtlZCBDYXNlc1xuICAgIHRoaXMuZm9ybVZhbHVlU2VydmljZS5wb3B1bGF0ZUxpbmtlZENhc2VzRGV0YWlsc0Zyb21DYXNlRmllbGRzKGNhc2VFdmVudERhdGEuZGF0YSwgZXZlbnRUcmlnZ2VyLmNhc2VfZmllbGRzKTtcbiAgICAvLyBSZW1vdmUgXCJMYXVuY2hlclwiLXR5cGUgZmllbGRzICh0aGVzZSBoYXZlIG5vIHZhbHVlcyBhbmQgYXJlIG5vdCBpbnRlbmRlZCB0byBiZSBwZXJzaXN0ZWQpXG4gICAgdGhpcy5mb3JtVmFsdWVTZXJ2aWNlLnJlbW92ZUNhc2VGaWVsZHNPZlR5cGUoY2FzZUV2ZW50RGF0YS5kYXRhLCBldmVudFRyaWdnZXIuY2FzZV9maWVsZHMsIFsnRmxhZ0xhdW5jaGVyJywgJ0NvbXBvbmVudExhdW5jaGVyJ10pO1xuICAgIGNhc2VFdmVudERhdGEuZXZlbnRfdG9rZW4gPSBldmVudFRyaWdnZXIuZXZlbnRfdG9rZW47XG4gICAgY2FzZUV2ZW50RGF0YS5pZ25vcmVfd2FybmluZyA9IHRoaXMuaWdub3JlV2FybmluZztcbiAgICBpZiAodGhpcy5jb25maXJtYXRpb24pIHtcbiAgICAgIGNhc2VFdmVudERhdGEuZGF0YSA9IHt9O1xuICAgIH1cblxuICAgIHJldHVybiBjYXNlRXZlbnREYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIG5vbi1hcnJheSB2YWx1ZSBvYmplY3RzIHdpdGggYG51bGxgIGZvciBhbnkgQ29tcGxleC10eXBlIGZpZWxkcyB3aG9zZSB2YWx1ZSBpcyBlZmZlY3RpdmVseSBlbXB0eSwgaS5lLlxuICAgKiBhbGwgaXRzIHN1Yi1maWVsZHMgYW5kIGRlc2NlbmRhbnRzIGFyZSBgbnVsbGAgb3IgYHVuZGVmaW5lZGAuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBvYmplY3QgdHJlZSByZXByZXNlbnRpbmcgYWxsIHRoZSBmb3JtIGZpZWxkIGRhdGFcbiAgICogQHJldHVybnMgVGhlIGZvcm0gZmllbGQgZGF0YSBtb2RpZmllZCBhY2NvcmRpbmdseVxuICAgKi9cbiAgcHJpdmF0ZSByZXBsYWNlRW1wdHlDb21wbGV4RmllbGRWYWx1ZXMoZGF0YTogb2JqZWN0KTogb2JqZWN0IHtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhW2tleV0pICYmIHR5cGVvZiBkYXRhW2tleV0gPT09ICdvYmplY3QnICYmICFGaWVsZHNVdGlscy5jb250YWluc05vbkVtcHR5VmFsdWVzKGRhdGFba2V5XSkpIHtcbiAgICAgICAgZGF0YVtrZXldID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYXZlcnNlICphbGwqIHZhbHVlcyBvZiBhIHtAbGluayBVbnR5cGVkRm9ybUdyb3VwfSwgaW5jbHVkaW5nIHRob3NlIGZvciBkaXNhYmxlZCBmaWVsZHMgKGkuZS4gaGlkZGVuIG9uZXMpLCByZXBsYWNpbmcgdGhlXG4gICAqIHZhbHVlIG9mIGFueSB0aGF0IGFyZSBoaWRkZW4gQU5EIGhhdmUgYHJldGFpbl9oaWRkZW5fdmFsdWVgIHNldCB0byBgdHJ1ZWAgaW4gdGhlIGNvcnJlc3BvbmRpbmcgYENhc2VGaWVsZGAsIHdpdGhcbiAgICogdGhlICpvcmlnaW5hbCogdmFsdWUgaGVsZCBpbiB0aGUgYENhc2VGaWVsZGAgb2JqZWN0LlxuICAgKlxuICAgKiBUaGlzIGlzIGFzIHBlciBkZXNpZ24gaW4gRVVJLTM2MjIsIHdoZXJlIGFueSB1c2VyLWRyaXZlbiB1cGRhdGVzIHRvIGhpZGRlbiBmaWVsZHMgd2l0aCBgcmV0YWluX2hpZGRlbl92YWx1ZWAgPVxuICAgKiBgdHJ1ZWAgYXJlIGlnbm9yZWQgKHRodXMgcmV0YWluaW5nIHRoZSB2YWx1ZSBkaXNwbGF5ZWQgb3JpZ2luYWxseSkuXG4gICAqXG4gICAqICogRm9yIENvbXBsZXggZmllbGQgdHlwZXMsIHRoZSByZXBsYWNlbWVudCBhYm92ZSBpcyBwZXJmb3JtZWQgcmVjdXJzaXZlbHkgZm9yIGFsbCBoaWRkZW4gc3ViLWZpZWxkcyB3aXRoXG4gICAqIGByZXRhaW5faGlkZGVuX3ZhbHVlYCA9IGB0cnVlYC5cbiAgICpcbiAgICogKiBGb3IgQ29sbGVjdGlvbiBmaWVsZCB0eXBlcywgaW5jbHVkaW5nIGNvbGxlY3Rpb25zIG9mIENvbXBsZXggYW5kIERvY3VtZW50IGZpZWxkIHR5cGVzLCB0aGUgcmVwbGFjZW1lbnQgaXNcbiAgICogcGVyZm9ybWVkIGZvciBhbGwgZmllbGRzIGluIHRoZSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gVW50eXBlZEZvcm1Hcm91cCBUaGUgYFVudHlwZWRGb3JtR3JvdXBgIGluc3RhbmNlIHdob3NlIHJhdyB2YWx1ZXMgYXJlIHRvIGJlIHRyYXZlcnNlZFxuICAgKiBAcGFyYW0gY2FzZUZpZWxkcyBUaGUgYXJyYXkgb2Yge0BsaW5rIENhc2VGaWVsZH0gZG9tYWluIG1vZGVsIG9iamVjdHMgY29ycmVzcG9uZGluZyB0byBmaWVsZHMgaW4gYFVudHlwZWRGb3JtR3JvdXBgXG4gICAqIEBwYXJhbSBwYXJlbnRGaWVsZCBSZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBgQ2FzZUZpZWxkYC4gVXNlZCBmb3IgcmV0cmlldmluZyB0aGUgc3ViLWZpZWxkIHZhbHVlcyBvZiBhIENvbXBsZXggZmllbGRcbiAgICogdG8gcGVyZm9ybSByZWN1cnNpdmUgcmVwbGFjZW1lbnQgLSB0aGUgc3ViLWZpZWxkIGBDYXNlRmllbGRgcyB0aGVtc2VsdmVzIGRvICpub3QqIGNvbnRhaW4gYW55IHZhbHVlc1xuICAgKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCB0aGUgKnJhdyogZm9ybSB2YWx1ZSBkYXRhIChhcyBrZXktdmFsdWUgcGFpcnMpLCB3aXRoIGFueSB2YWx1ZSByZXBsYWNlbWVudHMgYXMgbmVjZXNzYXJ5XG4gICAqL1xuICBwcml2YXRlIHJlcGxhY2VIaWRkZW5Gb3JtVmFsdWVzV2l0aE9yaWdpbmFsQ2FzZURhdGEoZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwLCBjYXNlRmllbGRzOiBDYXNlRmllbGRbXSwgcGFyZW50RmllbGQ/OiBDYXNlRmllbGQpOiBvYmplY3Qge1xuICAgIC8vIEdldCB0aGUgcmF3IGZvcm0gdmFsdWUgZGF0YSwgd2hpY2ggaW5jbHVkZXMgdGhlIHZhbHVlcyBvZiBhbnkgZGlzYWJsZWQgY29udHJvbHMsIGFzIGtleS12YWx1ZSBwYWlyc1xuICAgIGNvbnN0IHJhd0Zvcm1WYWx1ZURhdGEgPSBmb3JtR3JvdXAuZ2V0UmF3VmFsdWUoKTtcblxuICAgIC8vIFBsYWNlIGFsbCBjYXNlIGZpZWxkcyBpbiBhIGxvb2t1cCBvYmplY3QsIHNvIHRoZXkgY2FuIGJlIHJldHJpZXZlZCBieSBpZFxuICAgIGNvbnN0IGNhc2VGaWVsZHNMb29rdXAgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY2FzZUZpZWxkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY2FzZUZpZWxkc0xvb2t1cFtjYXNlRmllbGRzW2ldLmlkXSA9IGNhc2VGaWVsZHNbaV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVwbGFjZSBhbnkgZm9ybSB2YWx1ZSB3aXRoIHRoZSBvcmlnaW5hbCwgd2hlcmUgaXRzIENhc2VGaWVsZCBpcyBoaWRkZW4gQU5EIGhhcyB0aGUgcmV0YWluX2hpZGRlbl92YWx1ZSBmbGFnIHNldFxuICAgICAqIHRvIHRydWUuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgQ2FzZUZpZWxkJ3MgYGhpZGRlbmAgYXR0cmlidXRlIGlzIG51bGwgb3IgdW5kZWZpbmVkLCB0aGVuIGNoZWNrIHRoaXMgYXR0cmlidXRlIGluIHRoZSBwYXJlbnQgQ2FzZUZpZWxkIChpZlxuICAgICAqIG9uZSBleGlzdHMpLiBUaGlzIGlzIG9jY3VycmluZyAoYW5kIGlzIHBvc3NpYmx5IGEgYnVnKSB3aGVuIGEgQ2FzZUZpZWxkIGlzIGEgc3ViLWZpZWxkIG9mIGEgQ29tcGxleCB0eXBlLCBvciBhblxuICAgICAqIGl0ZW0gaW4gYSBDb2xsZWN0aW9uIHR5cGUuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgZmllbGQgaXMgYSBDb21wbGV4IHR5cGUgd2l0aCByZXRhaW5faGlkZGVuX3ZhbHVlID0gdHJ1ZSwgcGVyZm9ybSBhIHJlY3Vyc2l2ZSByZXBsYWNlbWVudCBmb3IgYWxsIChoaWRkZW4pXG4gICAgICogc3ViLWZpZWxkcyB3aXRoIHJldGFpbl9oaWRkZW5fdmFsdWUgPSB0cnVlLCB1c2luZyB0aGVpciBvcmlnaW5hbCBDYXNlRmllbGQgdmFsdWVzIChmcm9tIHRoZSBgZm9ybWF0dGVkX3ZhbHVlYFxuICAgICAqIGF0dHJpYnV0ZSkuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgZmllbGQgaXMgYSBDb2xsZWN0aW9uIHR5cGUgd2l0aCByZXRhaW5faGlkZGVuX3ZhbHVlID0gdHJ1ZSwgdGhlIGVudGlyZSBjb2xsZWN0aW9uIGlzIHJlcGxhY2VkIHdpdGggdGhlXG4gICAgICogb3JpZ2luYWwgZnJvbSBgZm9ybWF0dGVkX3ZhbHVlYC4gVGhpcyBhcHBsaWVzIHRvICphbGwqIHR5cGVzIG9mIENvbGxlY3Rpb25zLlxuICAgICAqL1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgT2JqZWN0LmtleXMocmF3Rm9ybVZhbHVlRGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCBjYXNlRmllbGQ6IENhc2VGaWVsZCA9IGNhc2VGaWVsZHNMb29rdXBba2V5XTtcbiAgICAgIC8vIElmIGNhc2VGaWVsZC5oaWRkZW4gaXMgTk9UIHRydXRoeSBhbmQgYWxzbyBOT1QgZXF1YWwgdG8gZmFsc2UsIHRoZW4gaXQgbXVzdCBiZSBudWxsL3VuZGVmaW5lZCAocmVtZW1iZXIgdGhhdFxuICAgICAgLy8gYm90aCBudWxsIGFuZCB1bmRlZmluZWQgYXJlIGVxdWFsIHRvICpuZWl0aGVyIGZhbHNlIG5vciB0cnVlKilcbiAgICAgIGlmIChjYXNlRmllbGQgJiYgY2FzZUZpZWxkLnJldGFpbl9oaWRkZW5fdmFsdWUgJiZcbiAgICAgICAgKGNhc2VGaWVsZC5oaWRkZW4gfHwgKGNhc2VGaWVsZC5oaWRkZW4gIT09IGZhbHNlICYmIHBhcmVudEZpZWxkICYmIHBhcmVudEZpZWxkLmhpZGRlbikpKSB7XG4gICAgICAgIGlmIChjYXNlRmllbGQuZmllbGRfdHlwZS50eXBlID09PSAnQ29tcGxleCcpIHtcbiAgICAgICAgICAvLyBOb3RlOiBEZWxpYmVyYXRlIHVzZSBvZiBlcXVhbGl0eSAoPT0pIGFuZCBub24tZXF1YWxpdHkgKCE9KSBvcGVyYXRvcnMgZm9yIG51bGwgY2hlY2tzIHRocm91Z2hvdXQsIHRvXG4gICAgICAgICAgLy8gaGFuZGxlIGJvdGggbnVsbCBhbmQgdW5kZWZpbmVkIHZhbHVlc1xuICAgICAgICAgIGlmIChjYXNlRmllbGQudmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gQ2FsbCB0aGlzIGZ1bmN0aW9uIHJlY3Vyc2l2ZWx5IHRvIHJlcGxhY2UgdGhlIENvbXBsZXggZmllbGQncyBzdWItZmllbGRzIGFzIG5lY2Vzc2FyeSwgcGFzc2luZyB0aGVcbiAgICAgICAgICAgIC8vIENhc2VGaWVsZCBpdHNlbGYgKHRoZSBzdWItZmllbGRzIGRvIG5vdCBjb250YWluIGFueSB2YWx1ZXMsIHNvIHRoZXNlIG5lZWQgdG8gYmUgb2J0YWluZWQgZnJvbSB0aGVcbiAgICAgICAgICAgIC8vIHBhcmVudClcbiAgICAgICAgICAgIC8vIFVwZGF0ZSByYXdGb3JtVmFsdWVEYXRhIGZvciB0aGlzIGZpZWxkXG4gICAgICAgICAgICAvLyBjcmVhdGluZyBmb3JtIGdyb3VwIGFuZCBhZGRpbmcgY29udHJvbCBpbnRvIGl0IGluIGNhc2UgY2FzZUZpZWxkIGlzIG9mIGNvbXBsZXh0IHR5cGUgYW5kIGFuZCBwYXJ0IG9mIFVudHlwZWRGb3JtR3JvdXBcbiAgICAgICAgICAgIGNvbnN0IGZvcm06IFVudHlwZWRGb3JtR3JvdXAgPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSk7XG4gICAgICAgICAgICBpZiAoZm9ybUdyb3VwLmNvbnRyb2xzW2tleV0udmFsdWUpIHtcbiAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzW2tleV0udmFsdWUpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBmb3JtLmFkZENvbnRyb2woaXRlbSwgbmV3IEZvcm1Db250cm9sKGZvcm1Hcm91cC5jb250cm9sc1trZXldLnZhbHVlW2l0ZW1dKSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmF3Rm9ybVZhbHVlRGF0YVtrZXldID0gdGhpcy5yZXBsYWNlSGlkZGVuRm9ybVZhbHVlc1dpdGhPcmlnaW5hbENhc2VEYXRhKFxuICAgICAgICAgICAgICBmb3JtLCBjYXNlRmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcywgY2FzZUZpZWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRGVmYXVsdCBjYXNlIGFsc28gaGFuZGxlcyBjb2xsZWN0aW9ucyBvZiAqYWxsKiB0eXBlczsgdGhlIGVudGlyZSBjb2xsZWN0aW9uIGluIHJhd0Zvcm1WYWx1ZURhdGEgd2lsbCBiZVxuICAgICAgICAgIC8vIHJlcGxhY2VkIHdpdGggdGhlIG9yaWdpbmFsIGZyb20gZm9ybWF0dGVkX3ZhbHVlXG4gICAgICAgICAgLy8gVXNlIHRoZSBDYXNlRmllbGQncyBleGlzdGluZyAqZm9ybWF0dGVkX3ZhbHVlKiBmcm9tIHRoZSBwYXJlbnQsIGlmIGF2YWlsYWJsZS4gKFRoaXMgaXMgbmVjZXNzYXJ5IGZvclxuICAgICAgICAgIC8vIENvbXBsZXggZmllbGRzLCB3aG9zZSBzdWItZmllbGRzIGRvIG5vdCBob2xkIGFueSB2YWx1ZXMgaW4gdGhlIG1vZGVsLikgT3RoZXJ3aXNlLCB1c2UgZm9ybWF0dGVkX3ZhbHVlXG4gICAgICAgICAgLy8gZnJvbSB0aGUgQ2FzZUZpZWxkIGl0c2VsZi5cbiAgICAgICAgICBpZiAocGFyZW50RmllbGQgJiYgcGFyZW50RmllbGQuZm9ybWF0dGVkX3ZhbHVlKSB7XG4gICAgICAgICAgICByYXdGb3JtVmFsdWVEYXRhW2tleV0gPSBwYXJlbnRGaWVsZC5mb3JtYXR0ZWRfdmFsdWVbY2FzZUZpZWxkLmlkXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmF3Rm9ybVZhbHVlRGF0YVtrZXldID0gY2FzZUZpZWxkLmZvcm1hdHRlZF92YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByYXdGb3JtVmFsdWVEYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBjYXNlU3VibWl0KHsgZm9ybSwgY2FzZUV2ZW50RGF0YSwgc3VibWl0IH06IENhc2VFZGl0Q2FzZVN1Ym1pdCk6IHZvaWQge1xuICAgIGNvbnN0IGxvYWRpbmdTcGlubmVyVG9rZW4gPSB0aGlzLmxvYWRpbmdTZXJ2aWNlLnJlZ2lzdGVyKCk7XG5cbiAgICBzdWJtaXQoY2FzZUV2ZW50RGF0YSlcbiAgICAgIC5waXBlKGZpbmFsaXplKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkaW5nU2VydmljZS51bnJlZ2lzdGVyKGxvYWRpbmdTcGlubmVyVG9rZW4pO1xuICAgICAgfSkpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICByZXNwb25zZSA9PiB7XG4gICAgICAgICAgdGhpcy5jYXNlTm90aWZpZXIuY2FjaGVkQ2FzZVZpZXcgPSBudWxsO1xuICAgICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlLnJlbW92ZUl0ZW0oJ2V2ZW50VXJsJyk7XG4gICAgICAgICAgY29uc3QgY29uZmlybWF0aW9uOiBDb25maXJtYXRpb24gPSB0aGlzLmJ1aWxkQ29uZmlybWF0aW9uKHJlc3BvbnNlKTtcbiAgICAgICAgICBpZiAoY29uZmlybWF0aW9uICYmIChjb25maXJtYXRpb24uZ2V0SGVhZGVyKCkgfHwgY29uZmlybWF0aW9uLmdldEJvZHkoKSkpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybShjb25maXJtYXRpb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRTdWJtaXR0ZWQocmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICB0aGlzLmNhbGxiYWNrRXJyb3JzU3ViamVjdC5uZXh0KGVycm9yKTtcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICAgIGlmICh0aGlzLmVycm9yLmRldGFpbHMpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUVycm9yU2VydmljZVxuICAgICAgICAgICAgICAubWFwRmllbGRFcnJvcnModGhpcy5lcnJvci5kZXRhaWxzLmZpZWxkX2Vycm9ycywgZm9ybS5jb250cm9sc1snZGF0YSddIGFzIFVudHlwZWRGb3JtR3JvdXAsICd2YWxpZGF0aW9uJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuaXNTdWJtaXR0aW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkQ29uZmlybWF0aW9uKHJlc3BvbnNlOiBvYmplY3QpOiBDb25maXJtYXRpb24ge1xuICAgIGlmIChyZXNwb25zZVsnYWZ0ZXJfc3VibWl0X2NhbGxiYWNrX3Jlc3BvbnNlJ10pIHtcbiAgICAgIHJldHVybiBuZXcgQ29uZmlybWF0aW9uKFxuICAgICAgICByZXNwb25zZVsnaWQnXSxcbiAgICAgICAgcmVzcG9uc2VbJ2NhbGxiYWNrX3Jlc3BvbnNlX3N0YXR1cyddLFxuICAgICAgICByZXNwb25zZVsnYWZ0ZXJfc3VibWl0X2NhbGxiYWNrX3Jlc3BvbnNlJ11bJ2NvbmZpcm1hdGlvbl9oZWFkZXInXSxcbiAgICAgICAgcmVzcG9uc2VbJ2FmdGVyX3N1Ym1pdF9jYWxsYmFja19yZXNwb25zZSddWydjb25maXJtYXRpb25fYm9keSddXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25FdmVudENhbkJlQ29tcGxldGVkKHsgZXZlbnRUcmlnZ2VyLCBldmVudENhbkJlQ29tcGxldGVkLCBjYXNlRGV0YWlscywgZm9ybSwgc3VibWl0IH06IENhc2VFZGl0b25FdmVudENhbkJlQ29tcGxldGVkKTogdm9pZCB7XG4gICAgaWYgKGV2ZW50Q2FuQmVDb21wbGV0ZWQpIHtcbiAgICAgIC8vIFN1Ym1pdFxuICAgICAgY29uc3QgY2FzZUV2ZW50RGF0YSA9IHRoaXMuZ2VuZXJhdGVDYXNlRXZlbnREYXRhKHsgZXZlbnRUcmlnZ2VyLCBmb3JtIH0pO1xuICAgICAgdGhpcy5jYXNlU3VibWl0KHsgZm9ybSwgY2FzZUV2ZW50RGF0YSwgc3VibWl0IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOYXZpZ2F0ZSB0byB0YXNrcyB0YWIgb24gY2FzZSBkZXRhaWxzIHBhZ2VcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtgL2Nhc2VzL2Nhc2UtZGV0YWlscy8ke3RoaXMuZ2V0Q2FzZUlkKGNhc2VEZXRhaWxzKX0vdGFza3NgXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xuICAgIH1cbiAgfVxuXG5cbiAgcHVibGljIGdldFN0YXR1cyhyZXNwb25zZTogb2JqZWN0KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5oYXNDYWxsYmFja0ZhaWxlZChyZXNwb25zZSkgPyByZXNwb25zZVsnY2FsbGJhY2tfcmVzcG9uc2Vfc3RhdHVzJ10gOiByZXNwb25zZVsnZGVsZXRlX2RyYWZ0X3Jlc3BvbnNlX3N0YXR1cyddO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNDYWxsYmFja0ZhaWxlZChyZXNwb25zZTogb2JqZWN0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJlc3BvbnNlWydjYWxsYmFja19yZXNwb25zZV9zdGF0dXMnXSAhPT0gJ0NBTExCQUNLX0NPTVBMRVRFRCc7XG4gIH1cblxufVxuIiwiPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuIl19