import { ErrorMessage } from '../../../../domain';
import { FlagDetailDisplayWithFormGroupPath, FlagPath, FlagsWithFormGroupPath } from './case-flag.model';
export interface CaseFlagState {
    currentCaseFlagFieldState: number;
    selectedFlagsLocation?: FlagsWithFormGroupPath;
    isParentFlagType?: boolean;
    errorMessages: ErrorMessage[];
    flagName?: string;
    flagPath?: FlagPath[];
    hearingRelevantFlag?: boolean;
    flagCode?: string;
    listOfValues?: {
        key: string;
        value: string;
    }[];
    selectedFlag?: FlagDetailDisplayWithFormGroupPath;
}
//# sourceMappingURL=case-flag-state.model.d.ts.map