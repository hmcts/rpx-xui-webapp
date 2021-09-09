import { AfterViewChecked, ChangeDetectorRef, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CaseEditComponent } from '../case-edit/case-edit.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CallbackErrorsContext } from '../../error/domain/error-context';
import { CaseEventTrigger } from '../../../domain/case-view/case-event-trigger.model';
import { HttpError } from '../../../domain/http/http-error.model';
import { FormValueService } from '../../../services/form/form-value.service';
import { PageValidationService } from '../services/page-validation.service';
import { WizardPage } from '../domain/wizard-page.model';
import { FormErrorService } from '../../../services/form/form-error.service';
import { CaseEventData } from '../../../domain/case-event-data.model';
import { Wizard } from '../domain/wizard.model';
import { CaseField } from '../../../domain/definition';
import { CaseFieldService } from '../../../services/case-fields/case-field.service';
export declare class CaseEditPageComponent implements OnInit, AfterViewChecked {
    private readonly caseEdit;
    private readonly route;
    private readonly formValueService;
    private readonly formErrorService;
    private readonly cdRef;
    private readonly pageValidationService;
    private readonly dialog;
    private readonly caseFieldService;
    static readonly RESUMED_FORM_DISCARD = "RESUMED_FORM_DISCARD";
    static readonly NEW_FORM_DISCARD = "NEW_FORM_DISCARD";
    static readonly NEW_FORM_SAVE = "NEW_FORM_CHANGED_SAVE";
    static readonly RESUMED_FORM_SAVE = "RESUMED_FORM_SAVE";
    static readonly TRIGGER_TEXT_START = "Continue";
    static readonly TRIGGER_TEXT_SAVE = "Save and continue";
    static readonly TRIGGER_TEXT_CONTINUE = "Ignore Warning and Continue";
    eventTrigger: CaseEventTrigger;
    editForm: FormGroup;
    wizard: Wizard;
    currentPage: WizardPage;
    dialogConfig: MatDialogConfig;
    error: HttpError;
    callbackErrorsSubject: Subject<any>;
    ignoreWarning: boolean;
    triggerTextStart: string;
    triggerTextIgnoreWarnings: string;
    triggerText: string;
    isSubmitting: boolean;
    formValuesChanged: boolean;
    pageChangeSubject: Subject<boolean>;
    caseFields: CaseField[];
    validationErrors: {
        id: string;
        message: string;
    }[];
    hasPreviousPage$: BehaviorSubject<boolean>;
    private static scrollToTop;
    private static setFocusToTop;
    constructor(caseEdit: CaseEditComponent, route: ActivatedRoute, formValueService: FormValueService, formErrorService: FormErrorService, cdRef: ChangeDetectorRef, pageValidationService: PageValidationService, dialog: MatDialog, caseFieldService: CaseFieldService);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    applyValuesChanged(valuesChanged: boolean): void;
    first(): Promise<boolean>;
    currentPageIsNotValid(): boolean;
    /**
     * caseEventData.event_data contains all the values from the previous pages so we set caseEventData.data = caseEventData.event_data
     * This builds the form with data from the previous pages
     * EUI-3732 - Breathing space data not persisted on Previous button click with ExpUI Demo
     */
    toPreviousPage(): void;
    generateErrorMessage(fields: CaseField[], container?: AbstractControl): void;
    navigateToErrorElement(elementId: string): void;
    submit(): void;
    updateFormData(jsonData: CaseEventData): void;
    pageWithFieldExists(caseFieldId: any): WizardPage;
    updateEventTriggerCaseFields(caseFieldId: string, jsonData: CaseEventData, eventTrigger: CaseEventTrigger): void;
    updateFormControlsValue(formGroup: FormGroup, caseFieldId: string, value: any): void;
    callbackErrorsNotify(errorContext: CallbackErrorsContext): void;
    next(): Promise<boolean>;
    previous(): Promise<boolean>;
    hasPrevious(): boolean;
    cancel(): void;
    submitting(): boolean;
    getCaseId(): string;
    getCaseTitle(): string;
    getCancelText(): string;
    private getTriggerText;
    private initDialog;
    private discard;
    private handleError;
    private resetErrors;
    private saveDraft;
    private getCaseFields;
    private getCaseFieldsFromCurrentAndPreviousPages;
    private buildCaseEventData;
    /**
     * Abstracted this method from buildCaseEventData to remove duplication.
     * @param caseFields The fields to filter the data by.
     * @param formValue The original value of the form.
     * @param clearEmpty Whether or not to clear out empty values.
     * @param clearNonCase Whether or not to clear out fields that are not part of the case.
     * @returns CaseEventData for the specified parameters.
     */
    private getFilteredCaseEventData;
}
