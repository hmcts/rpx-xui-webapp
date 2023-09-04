import { OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CaseEditDataService } from '../../../commons/case-edit-data/case-edit-data.service';
import { CaseField, ErrorMessage } from '../../../domain';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { CaseFlagState, FlagDetail, FlagDetailDisplayWithFormGroupPath, FlagPath, FlagsWithFormGroupPath } from './domain';
import { CaseFlagFieldState, CaseFlagText } from './enums';
import * as i0 from "@angular/core";
export declare class WriteCaseFlagFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    private readonly route;
    private readonly caseEditDataService;
    formGroup: UntypedFormGroup;
    fieldState: number;
    caseFlagFieldState: typeof CaseFlagFieldState;
    errorMessages: ErrorMessage[];
    createFlagCaption: CaseFlagText;
    flagsData: FlagsWithFormGroupPath[];
    selectedFlag: FlagDetailDisplayWithFormGroupPath;
    selectedFlagsLocation: FlagsWithFormGroupPath;
    caseFlagParentFormGroup: UntypedFormGroup;
    flagCommentsOptional: boolean;
    jurisdiction: string;
    caseTypeId: string;
    hmctsServiceId: string;
    flagName: string;
    flagPath: FlagPath[];
    hearingRelevantFlag: boolean;
    flagCode: string;
    listOfValues: {
        key: string;
        value: string;
    }[];
    isDisplayContextParameterUpdate: boolean;
    caseTitle: string;
    private allCaseFlagStagesCompleted;
    private readonly updateMode;
    private readonly otherFlagTypeCode;
    readonly caseNameMissing = "Case name missing";
    constructor(route: ActivatedRoute, caseEditDataService: CaseEditDataService);
    ngOnInit(): void;
    setDisplayContextParameterUpdate(caseFields: CaseField[]): boolean;
    onCaseFlagStateEmitted(caseFlagState: CaseFlagState): void;
    proceedToNextState(): void;
    setFlagsCaseFieldValue(): void;
    addFlagToCollection(): void;
    updateFlagInCollection(): void;
    isAtFinalState(): boolean;
    navigateToErrorElement(elementId: string): void;
    onFlagCommentsOptionalEmitted(_: any): void;
    /**
     * Set the parent {@link UntypedFormGroup} for this component's children, depending on the `Flags` {@link CaseField} instance
     * to which data should be attached. **Note:** The parent is not _this_ component's `UntypedFormGroup` (as might otherwise be
     * expected) because this component is not expected to have a value, given it is used for the empty `FlagLauncher` base
     * field type.
     *
     * @param pathToFlagsFormGroup The dot-delimited string that is the path to the `UntypedFormGroup` for a `Flags` instance
     */
    setCaseFlagParentFormGroup(pathToFlagsFormGroup: string): void;
    populateNewFlagDetailInstance(): FlagDetail;
    moveToFinalReviewStage(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteCaseFlagFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteCaseFlagFieldComponent, "ccd-write-case-flag-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=write-case-flag-field.component.d.ts.map