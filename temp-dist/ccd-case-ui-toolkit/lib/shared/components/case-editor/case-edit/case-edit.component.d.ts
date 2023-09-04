import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ConditionalShowRegistrarService } from '../../../directives';
import { CaseEditGetNextPage, CaseEditSubmitForm, CaseEditonEventCanBeCompleted, CaseEventData, CaseEventTrigger, CaseView, Draft, HttpError, Profile } from '../../../domain';
import { FieldsPurger, FieldsUtils, FormErrorService, FormValueService, LoadingService, SessionStorageService, WindowService } from '../../../services';
import { Confirmation, Wizard, WizardPage } from '../domain';
import { EventCompletionParams } from '../domain/event-completion-params.model';
import { CaseNotifier, WizardFactoryService } from '../services';
import * as i0 from "@angular/core";
export declare class CaseEditComponent implements OnInit, OnDestroy {
    private readonly fb;
    private readonly caseNotifier;
    private readonly router;
    private readonly route;
    private readonly fieldsUtils;
    private readonly fieldsPurger;
    private readonly registrarService;
    private readonly wizardFactory;
    private readonly sessionStorageService;
    private readonly windowsService;
    private readonly formValueService;
    private readonly formErrorService;
    private readonly loadingService;
    static readonly ORIGIN_QUERY_PARAM = "origin";
    static readonly ALERT_MESSAGE = "Page is being refreshed so you will be redirected to the first page of this event.";
    eventTrigger: CaseEventTrigger;
    submit: (caseEventData: CaseEventData, profile?: Profile) => Observable<object>;
    validate: (caseEventData: CaseEventData, pageId: string) => Observable<object>;
    saveDraft: (caseEventData: CaseEventData) => Observable<Draft>;
    caseDetails: CaseView;
    cancelled: EventEmitter<any>;
    submitted: EventEmitter<any>;
    wizard: Wizard;
    form: UntypedFormGroup;
    confirmation: Confirmation;
    navigationOrigin: any;
    initialUrl: string;
    isPageRefreshed: boolean;
    isSubmitting: boolean;
    eventCompletionParams: EventCompletionParams;
    submitResponse: Record<string, any>;
    isEventCompletionChecksRequired: boolean;
    isCaseFlagSubmission: boolean;
    ignoreWarning: boolean;
    isLinkedCasesSubmission: boolean;
    error: HttpError;
    callbackErrorsSubject: Subject<any>;
    constructor(fb: FormBuilder, caseNotifier: CaseNotifier, router: Router, route: ActivatedRoute, fieldsUtils: FieldsUtils, fieldsPurger: FieldsPurger, registrarService: ConditionalShowRegistrarService, wizardFactory: WizardFactoryService, sessionStorageService: SessionStorageService, windowsService: WindowService, formValueService: FormValueService, formErrorService: FormErrorService, loadingService: LoadingService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    checkPageRefresh(): boolean;
    getPage(pageId: string): WizardPage;
    first(): Promise<boolean>;
    navigateToPage(pageId: string): Promise<boolean>;
    next(currentPageId: string): Promise<boolean>;
    previous(currentPageId: string): Promise<boolean>;
    hasPrevious(currentPageId: string): boolean;
    cancel(): void;
    emitSubmitted(response: Record<string, any>): void;
    getNextPage({ wizard, currentPageId, eventTrigger, form }: CaseEditGetNextPage): WizardPage;
    confirm(confirmation: Confirmation): Promise<boolean>;
    submitForm({ eventTrigger, form, caseDetails, submit }: CaseEditSubmitForm): void;
    getCaseId(caseDetails: CaseView): string;
    private getEventId;
    private generateCaseEventData;
    /**
     * Replaces non-array value objects with `null` for any Complex-type fields whose value is effectively empty, i.e.
     * all its sub-fields and descendants are `null` or `undefined`.
     *
     * @param data The object tree representing all the form field data
     * @returns The form field data modified accordingly
     */
    private replaceEmptyComplexFieldValues;
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
    private replaceHiddenFormValuesWithOriginalCaseData;
    private caseSubmit;
    private buildConfirmation;
    onEventCanBeCompleted({ eventTrigger, eventCanBeCompleted, caseDetails, form, submit }: CaseEditonEventCanBeCompleted): void;
    getStatus(response: object): any;
    private hasCallbackFailed;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseEditComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseEditComponent, "ccd-case-edit", never, { "eventTrigger": "eventTrigger"; "submit": "submit"; "validate": "validate"; "saveDraft": "saveDraft"; "caseDetails": "caseDetails"; }, { "cancelled": "cancelled"; "submitted": "submitted"; }, never, never, false, never>;
}
//# sourceMappingURL=case-edit.component.d.ts.map