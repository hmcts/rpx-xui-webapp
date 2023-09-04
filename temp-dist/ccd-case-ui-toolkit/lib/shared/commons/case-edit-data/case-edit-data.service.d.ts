import { UntypedFormGroup } from '@angular/forms';
import { CaseView } from '../../domain';
import { CaseEditValidationError } from './case-edit-validation.model';
export declare class CaseEditDataService {
    private details$;
    private title$;
    private formValidationErrors$;
    private editForm$;
    private isLinkedCasesJourneyAtFinalStep$;
    private eventTriggerName$;
    private triggerSubmitEvent$;
    caseDetails$: import("rxjs").Observable<CaseView>;
    caseTitle$: import("rxjs").Observable<string>;
    caseEditForm$: import("rxjs").Observable<UntypedFormGroup>;
    caseFormValidationErrors$: import("rxjs").Observable<CaseEditValidationError[]>;
    caseIsLinkedCasesJourneyAtFinalStep$: import("rxjs").Observable<boolean>;
    caseEventTriggerName$: import("rxjs").Observable<string>;
    caseTriggerSubmitEvent$: import("rxjs").Observable<boolean>;
    constructor();
    setCaseDetails(caseDetails: CaseView): void;
    setCaseTitle(caseTitle: string): void;
    setCaseEventTriggerName(triggerName: string): void;
    setFormValidationErrors(validationErrors: any[]): void;
    setCaseEditForm(editForm: UntypedFormGroup): void;
    clearFormValidationErrors(): void;
    setLinkedCasesJourneyAtFinalStep(isAtFinalStep: boolean): void;
    addFormValidationError(validationError: CaseEditValidationError): void;
    setTriggerSubmitEvent(state: boolean): void;
}
//# sourceMappingURL=case-edit-data.service.d.ts.map