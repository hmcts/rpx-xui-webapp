import { EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ErrorMessage } from '../../../../../domain';
import { CaseFlagState, FlagsWithFormGroupPath } from '../../domain';
import { CaseFlagWizardStepTitle, SelectFlagLocationErrorMessage } from '../../enums';
import * as i0 from "@angular/core";
export declare class SelectFlagLocationComponent implements OnInit {
    formGroup: UntypedFormGroup;
    flagsData: FlagsWithFormGroupPath[];
    caseFlagStateEmitter: EventEmitter<CaseFlagState>;
    flagLocationTitle: CaseFlagWizardStepTitle;
    errorMessages: ErrorMessage[];
    flagLocationNotSelectedErrorMessage: SelectFlagLocationErrorMessage;
    filteredFlagsData: FlagsWithFormGroupPath[];
    caseFlagsConfigError: boolean;
    readonly selectedLocationControlName = "selectedLocation";
    readonly caseLevelFlagLabel = "Case level";
    private readonly caseLevelCaseFlagsFieldId;
    ngOnInit(): void;
    onNext(): void;
    private validateSelection;
    private onCaseFlagsConfigError;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectFlagLocationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectFlagLocationComponent, "ccd-select-flag-location", never, { "formGroup": "formGroup"; "flagsData": "flagsData"; }, { "caseFlagStateEmitter": "caseFlagStateEmitter"; }, never, never, false, never>;
}
//# sourceMappingURL=select-flag-location.component.d.ts.map