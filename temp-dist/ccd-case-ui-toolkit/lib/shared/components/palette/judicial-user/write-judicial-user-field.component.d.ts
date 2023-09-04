import { OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { JudicialUserModel } from '../../../domain/jurisdiction';
import { CaseFlagRefdataService, FormValidatorsService, JurisdictionService, SessionStorageService } from '../../../services';
import { WriteComplexFieldComponent } from '../complex/write-complex-field.component';
import { IsCompoundPipe } from '../utils/is-compound.pipe';
import * as i0 from "@angular/core";
export declare class WriteJudicialUserFieldComponent extends WriteComplexFieldComponent implements OnInit {
    private readonly jurisdictionService;
    private readonly sessionStorageService;
    private readonly caseFlagRefDataService;
    private readonly compoundPipe;
    private readonly validatorsService;
    readonly minSearchCharacters = 2;
    judicialUserControl: AbstractControl;
    jurisdiction: string;
    caseType: string;
    showAutocomplete: boolean;
    filteredJudicialUsers$: Observable<JudicialUserModel[]>;
    searchTerm: string;
    noResults: boolean;
    errors: ValidationErrors;
    invalidSearchTerm: boolean;
    judicialUserSelected: boolean;
    constructor(jurisdictionService: JurisdictionService, sessionStorageService: SessionStorageService, caseFlagRefDataService: CaseFlagRefdataService, compoundPipe: IsCompoundPipe, validatorsService: FormValidatorsService);
    ngOnInit(): void;
    filterJudicialUsers(searchTerm: string): Observable<JudicialUserModel[]>;
    loadJudicialUser(personalCode: string): void;
    setJurisdictionAndCaseType(): void;
    displayJudicialUser(judicialUser?: JudicialUserModel): string | undefined;
    onSelectionChange(event: any): void;
    onBlur(event: any): void;
    setupValidation(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteJudicialUserFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteJudicialUserFieldComponent, "ccd-write-judicial-user-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=write-judicial-user-field.component.d.ts.map