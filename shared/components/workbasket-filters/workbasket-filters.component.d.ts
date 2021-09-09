import { EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/do';
import { Jurisdiction, CaseState, CaseTypeLite, WorkbasketInputModel, CaseField } from '../../domain';
import { JurisdictionService, AlertService, WindowService, OrderService, WorkbasketInputFilterService } from '../../services';
export declare class WorkbasketFiltersComponent implements OnInit {
    private route;
    private workbasketInputFilterService;
    private orderService;
    private jurisdictionService;
    private alertService;
    private windowService;
    static readonly PARAM_JURISDICTION = "jurisdiction";
    static readonly PARAM_CASE_TYPE = "case-type";
    static readonly PARAM_CASE_STATE = "case-state";
    caseFields: CaseField[];
    jurisdictions: Jurisdiction[];
    defaults: any;
    onApply: EventEmitter<any>;
    onReset: EventEmitter<any>;
    workbasketInputs: WorkbasketInputModel[];
    workbasketInputsReady: boolean;
    workbasketDefaults: boolean;
    selected: {
        init?: boolean;
        jurisdiction?: Jurisdiction;
        caseType?: CaseTypeLite;
        caseState?: CaseState;
        formGroup?: FormGroup;
        page?: number;
        metadataFields?: string[];
    };
    formGroup: FormGroup;
    selectedJurisdictionCaseTypes?: CaseTypeLite[];
    selectedCaseTypeStates?: CaseState[];
    initialised: boolean;
    constructor(route: ActivatedRoute, workbasketInputFilterService: WorkbasketInputFilterService, orderService: OrderService, jurisdictionService: JurisdictionService, alertService: AlertService, windowService: WindowService);
    ngOnInit(): void;
    apply(init: any): void;
    reset(): void;
    getMetadataFields(): string[];
    onJurisdictionIdChange(): void;
    onCaseTypeIdChange(): void;
    isCaseTypesDropdownDisabled(): boolean;
    isCaseStatesDropdownDisabled(): boolean;
    isApplyButtonDisabled(): boolean;
    private sortStates;
    /**
     * Try to initialise filters based on query parameters or workbasket defaults.
     * Query parameters, when available, take precedence over workbasket defaults.
     */
    private initFilters;
    private selectCaseState;
    private selectCaseStateIdFromQueryOrDefaults;
    private selectCaseType;
    private selectCaseTypeIdFromQueryOrDefaults;
    isSearchableAndWorkbasketInputsReady(): boolean;
    private resetFieldsWhenNoDefaults;
    private clearWorkbasketInputs;
    private resetCaseState;
    private resetCaseType;
    private setFocusToTop;
    private getCaseFields;
}
