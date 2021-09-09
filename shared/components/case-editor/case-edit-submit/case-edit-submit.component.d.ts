import { OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { CaseEventTrigger, CaseField, HttpError, Profile } from '../../../domain';
import { CaseFieldService, FieldsUtils, FormErrorService, FormValueService, OrderService, ProfileNotifier, ProfileService } from '../../../services';
import { CallbackErrorsContext } from '../../error';
import { PaletteContext } from '../../palette';
import { CaseEditComponent } from '../case-edit/case-edit.component';
import { Wizard, WizardPage } from '../domain';
export declare class CaseEditSubmitComponent implements OnInit, OnDestroy {
    private caseEdit;
    private formValueService;
    private formErrorService;
    private fieldsUtils;
    private caseFieldService;
    private route;
    private orderService;
    private profileService;
    private profileNotifier;
    eventTrigger: CaseEventTrigger;
    editForm: FormGroup;
    error: HttpError;
    callbackErrorsSubject: Subject<any>;
    ignoreWarning: boolean;
    triggerText: string;
    wizard: Wizard;
    profile: Profile;
    showSummaryFields: CaseField[];
    paletteContext: PaletteContext;
    isSubmitting: boolean;
    profileSubscription: Subscription;
    contextFields: CaseField[];
    static readonly SHOW_SUMMARY_CONTENT_COMPARE_FUNCTION: (a: CaseField, b: CaseField) => number;
    readonly isDisabled: boolean;
    constructor(caseEdit: CaseEditComponent, formValueService: FormValueService, formErrorService: FormErrorService, fieldsUtils: FieldsUtils, caseFieldService: CaseFieldService, route: ActivatedRoute, orderService: OrderService, profileService: ProfileService, profileNotifier: ProfileNotifier);
    ngOnInit(): void;
    ngOnDestroy(): void;
    submit(): void;
    /**
     * Traverse *all* values of a {@link FormGroup}, including those for disabled fields (i.e. hidden ones), replacing the
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
     * @param formGroup The `FormGroup` instance whose raw values are to be traversed
     * @param caseFields The array of {@link CaseField} domain model objects corresponding to fields in `formGroup`
     * @param parentField Reference to the parent `CaseField`. Used for retrieving the sub-field values of a Complex field
     * to perform recursive replacement - the sub-field `CaseField`s themselves do *not* contain any values
     * @returns An object with the *raw* form value data (as key-value pairs), with any value replacements as necessary
     */
    private replaceHiddenFormValuesWithOriginalCaseData;
    /**
     * Replaces non-array value objects with `null` for any Complex-type fields whose value is effectively empty, i.e.
     * all its sub-fields and descendants are `null` or `undefined`.
     *
     * @param data The object tree representing all the form field data
     * @returns The form field data modified accordingly
     */
    private replaceEmptyComplexFieldValues;
    private getStatus;
    private hasCallbackFailed;
    private readonly hasErrors;
    navigateToPage(pageId: string): void;
    callbackErrorsNotify(errorContext: CallbackErrorsContext): void;
    summaryCaseField(field: CaseField): CaseField;
    cancel(): void;
    isLabel(field: CaseField): boolean;
    isChangeAllowed(field: CaseField): boolean;
    checkYourAnswerFieldsToDisplayExists(): boolean;
    readOnlySummaryFieldsToDisplayExists(): boolean;
    showEventNotes(): boolean;
    private getLastPageShown;
    previous(): void;
    hasPrevious(): boolean;
    isShown(page: WizardPage): boolean;
    canShowFieldInCYA(field: CaseField): boolean;
    isSolicitor(): boolean;
    private announceProfile;
    private buildConfirmation;
    private sortFieldsByShowSummaryContent;
    private getCaseFields;
    getCaseId(): string;
    getCaseTitle(): string;
    getCancelText(): string;
}
