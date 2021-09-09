import { FormControl } from '@angular/forms';
import { CaseEditComponent } from '../case-edit/case-edit.component';
import { Router } from '@angular/router';
import { CaseEventTrigger } from '../../../domain/case-view/case-event-trigger.model';
import { Confirmation } from '../domain/confirmation.model';
import { CaseField } from '../../../domain/definition';
import { FormGroup } from '@angular/forms';
export declare class CaseEditConfirmComponent {
    private caseEdit;
    private router;
    private caseId;
    eventTrigger: CaseEventTrigger;
    triggerText: string;
    formGroup: FormControl;
    confirmation: Confirmation;
    caseFields: CaseField[];
    editForm: FormGroup;
    constructor(caseEdit: CaseEditComponent, router: Router);
    submit(): void;
    getCaseId(): string;
    getCaseTitle(): string;
    private getCaseFields;
}
