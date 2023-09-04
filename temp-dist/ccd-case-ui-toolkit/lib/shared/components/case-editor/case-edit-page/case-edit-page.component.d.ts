import { AfterViewChecked, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { CaseEditDataService, CaseEditValidationError } from '../../../commons/case-edit-data';
import { CaseEventData } from '../../../domain/case-event-data.model';
import { CaseEventTrigger } from '../../../domain/case-view/case-event-trigger.model';
import { CaseField } from '../../../domain/definition';
import { LoadingService } from '../../../services';
import { CaseFieldService } from '../../../services/case-fields/case-field.service';
import { FormErrorService } from '../../../services/form/form-error.service';
import { FormValueService } from '../../../services/form/form-value.service';
import { CallbackErrorsContext } from '../../error/domain/error-context';
import { CaseEditComponent } from '../case-edit/case-edit.component';
import { WizardPage } from '../domain/wizard-page.model';
import { Wizard } from '../domain/wizard.model';
import { PageValidationService } from '../services/page-validation.service';
import * as i0 from "@angular/core";
export declare class CaseEditPageComponent implements OnInit, AfterViewChecked, OnDestroy {
    readonly caseEdit: CaseEditComponent;
    private readonly route;
    private readonly formValueService;
    private readonly formErrorService;
    private readonly cdRef;
    private readonly pageValidationService;
    private readonly dialog;
    private readonly caseFieldService;
    private readonly caseEditDataService;
    private readonly loadingService;
    static readonly RESUMED_FORM_DISCARD = "RESUMED_FORM_DISCARD";
    static readonly NEW_FORM_DISCARD = "NEW_FORM_DISCARD";
    static readonly NEW_FORM_SAVE = "NEW_FORM_CHANGED_SAVE";
    static readonly RESUMED_FORM_SAVE = "RESUMED_FORM_SAVE";
    static readonly TRIGGER_TEXT_START = "Continue";
    static readonly TRIGGER_TEXT_SAVE = "Save and continue";
    static readonly TRIGGER_TEXT_CONTINUE = "Ignore Warning and Continue";
    eventTrigger: CaseEventTrigger;
    editForm: UntypedFormGroup;
    wizard: Wizard;
    currentPage: WizardPage;
    dialogConfig: MatDialogConfig;
    triggerTextStart: string;
    triggerTextIgnoreWarnings: string;
    triggerText: string;
    formValuesChanged: boolean;
    pageChangeSubject: Subject<boolean>;
    caseFields: CaseField[];
    validationErrors: CaseEditValidationError[];
    hasPreviousPage$: BehaviorSubject<boolean>;
    callbackErrorsSubject: Subject<any>;
    isLinkedCasesJourneyAtFinalStep: boolean;
    routeParamsSub: Subscription;
    caseEditFormSub: Subscription;
    caseIsLinkedCasesJourneyAtFinalStepSub: Subscription;
    caseTriggerSubmitEventSub: Subscription;
    validateSub: Subscription;
    dialogRefAfterClosedSub: Subscription;
    saveDraftSub: Subscription;
    caseFormValidationErrorsSub: Subscription;
    private static scrollToTop;
    private static setFocusToTop;
    constructor(caseEdit: CaseEditComponent, route: ActivatedRoute, formValueService: FormValueService, formErrorService: FormErrorService, cdRef: ChangeDetectorRef, pageValidationService: PageValidationService, dialog: MatDialog, caseFieldService: CaseFieldService, caseEditDataService: CaseEditDataService, loadingService: LoadingService);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    applyValuesChanged(valuesChanged: boolean): void;
    first(): Promise<boolean>;
    currentPageIsNotValid(): boolean;
    isLinkedCasesJourney(): boolean;
    /**
     * caseEventData.event_data contains all the values from the previous pages so we set caseEventData.data = caseEventData.event_data
     * This builds the form with data from the previous pages
     * EUI-3732 - Breathing space data not persisted on Previous button click with ExpUI Demo
     */
    toPreviousPage(): void;
    generateErrorMessage(fields: CaseField[], container?: AbstractControl, path?: string): void;
    navigateToErrorElement(elementId: string): void;
    submit(): void;
    updateFormData(jsonData: CaseEventData): void;
    pageWithFieldExists(caseFieldId: string): WizardPage;
    updateEventTriggerCaseFields(caseFieldId: string, jsonData: CaseEventData, eventTrigger: CaseEventTrigger): void;
    private updateJsonDataObject;
    private isAnObject;
    updateFormControlsValue(formGroup: UntypedFormGroup, caseFieldId: string, value: any): void;
    callbackErrorsNotify(errorContext: CallbackErrorsContext): void;
    next(): Promise<boolean>;
    previous(): Promise<boolean>;
    hasPrevious(): boolean;
    cancel(): void;
    submitting(): boolean;
    getCaseId(): string;
    getCaseTitle(): string;
    getCancelText(): string;
    private canNavigateToSummaryPage;
    private getTriggerText;
    private discard;
    private handleError;
    private resetErrors;
    private saveDraft;
    private getCaseFields;
    private getCaseFieldsFromCurrentAndPreviousPages;
    buildCaseEventData(fromPreviousPage?: boolean): CaseEventData;
    /**
     * Abstracted this method from buildCaseEventData to remove duplication.
     * @param caseFields The fields to filter the data by.
     * @param formValue The original value of the form.
     * @param clearEmpty Whether or not to clear out empty values.
     * @param clearNonCase Whether or not to clear out fields that are not part of the case.
     * @returns CaseEventData for the specified parameters.
     */
    private getFilteredCaseEventData;
    private syncCaseEditDataService;
    getRpxTranslatePipeArgs(fieldLabel: string): {
        FIELDLABEL: string;
    } | null;
    onEventCanBeCompleted(eventCanBeCompleted: boolean): void;
    private removeAllJudicialUserFormControls;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseEditPageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseEditPageComponent, "ccd-case-edit-page", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=case-edit-page.component.d.ts.map