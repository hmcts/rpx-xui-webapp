import { FormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseEventTrigger } from '../../../domain/case-view/case-event-trigger.model';
import { CaseField } from '../../../domain/definition/case-field.model';
import { CaseEditComponent } from '../case-edit/case-edit.component';
import { Confirmation } from '../domain/confirmation.model';
import * as i0 from "@angular/core";
export declare class CaseEditConfirmComponent {
    private readonly caseEdit;
    private readonly router;
    eventTrigger: CaseEventTrigger;
    triggerText: string;
    formGroup: FormControl<any>;
    confirmation: Confirmation;
    caseFields: CaseField[];
    editForm: UntypedFormGroup;
    constructor(caseEdit: CaseEditComponent, router: Router);
    submit(): void;
    getCaseId(): string;
    getCaseTitle(): string;
    private getCaseFields;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseEditConfirmComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseEditConfirmComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=case-edit-confirm.component.d.ts.map