import { EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CaseField } from '../../domain/definition/case-field.model';
import { CaseState } from '../../domain/definition/case-state.model';
import { CaseTypeLite } from '../../domain/definition/case-type-lite.model';
import { Jurisdiction } from '../../domain/definition/jurisdiction.model';
import { WorkbasketInputModel } from '../../domain/workbasket/workbasket-input.model';
import { AlertService } from '../../services/alert/alert.service';
import { JurisdictionService } from '../../services/jurisdiction/jurisdiction.service';
import { OrderService } from '../../services/order/order.service';
import { WindowService } from '../../services/window/window.service';
import { WorkbasketInputFilterService } from '../../services/workbasket/workbasket-input-filter.service';
import * as i0 from "@angular/core";
export declare class WorkbasketFiltersComponent implements OnInit {
    private readonly route;
    private readonly workbasketInputFilterService;
    private readonly orderService;
    private readonly jurisdictionService;
    private readonly alertService;
    private readonly windowService;
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
        formGroup?: UntypedFormGroup;
        page?: number;
        metadataFields?: string[];
    };
    formGroup: UntypedFormGroup;
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
    isSearchableAndWorkbasketInputsReady(): boolean;
    /**
     * This method is used to clear the previously used
     * form group control filter values to make sure only the
     * currently selected form group control filter values are present.
     *
     * Has been implemented for 'Region and FRC filters' and can be extended
     * in future to incorporate other dynamic filters.
     */
    updateFormGroupFilters(): void;
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
    private resetFieldsWhenNoDefaults;
    private clearWorkbasketInputs;
    private resetCaseState;
    private resetCaseType;
    private setFocusToTop;
    private getCaseFields;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkbasketFiltersComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkbasketFiltersComponent, "ccd-workbasket-filters", never, { "jurisdictions": "jurisdictions"; "defaults": "defaults"; }, { "onApply": "onApply"; "onReset": "onReset"; }, never, never, false, never>;
}
//# sourceMappingURL=workbasket-filters.component.d.ts.map