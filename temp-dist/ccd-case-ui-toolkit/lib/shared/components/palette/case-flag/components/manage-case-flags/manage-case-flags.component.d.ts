import { EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ErrorMessage } from '../../../../../domain';
import { CaseFlagState, FlagDetail, FlagDetailDisplayWithFormGroupPath, Flags, FlagsWithFormGroupPath } from '../../domain';
import { CaseFlagWizardStepTitle, SelectFlagErrorMessage } from '../../enums';
import * as i0 from "@angular/core";
export declare class ManageCaseFlagsComponent implements OnInit {
    private static readonly CASE_LEVEL_CASE_FLAGS_FIELD_ID;
    formGroup: UntypedFormGroup;
    flagsData: FlagsWithFormGroupPath[];
    caseTitle: string;
    caseFlagStateEmitter: EventEmitter<CaseFlagState>;
    manageCaseFlagTitle: CaseFlagWizardStepTitle;
    errorMessages: ErrorMessage[];
    manageCaseFlagSelectedErrorMessage: SelectFlagErrorMessage;
    flagsDisplayData: FlagDetailDisplayWithFormGroupPath[];
    flags: Flags;
    noFlagsError: boolean;
    readonly selectedControlName = "selectedManageCaseLocation";
    ngOnInit(): void;
    mapFlagDetailForDisplay(flagDetail: FlagDetail, flagsInstance: FlagsWithFormGroupPath): FlagDetailDisplayWithFormGroupPath;
    processLabel(flagDisplay: FlagDetailDisplayWithFormGroupPath): string;
    getPartyName(flagDisplay: FlagDetailDisplayWithFormGroupPath): string;
    getFlagName(flagDetail: FlagDetail): string;
    getFlagDescription(flagDetail: FlagDetail): string;
    getRoleOnCase(flagDisplay: FlagDetailDisplayWithFormGroupPath): string;
    getFlagComments(flagDetail: FlagDetail): string;
    onNext(): void;
    private validateSelection;
    private onNoFlagsError;
    static ɵfac: i0.ɵɵFactoryDeclaration<ManageCaseFlagsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ManageCaseFlagsComponent, "ccd-manage-case-flags", never, { "formGroup": "formGroup"; "flagsData": "flagsData"; "caseTitle": "caseTitle"; }, { "caseFlagStateEmitter": "caseFlagStateEmitter"; }, never, never, false, never>;
}
//# sourceMappingURL=manage-case-flags.component.d.ts.map