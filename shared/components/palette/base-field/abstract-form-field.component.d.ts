import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { CaseField } from '../../../domain';
declare type FormContainer = FormGroup | FormArray;
export declare abstract class AbstractFormFieldComponent {
    caseField: CaseField;
    formGroup: FormGroup;
    parent?: FormContainer;
    idPrefix: string;
    id(): string;
    protected registerControl<T extends AbstractControl>(control: T, replace?: boolean): AbstractControl;
    protected addValidators(caseField: CaseField, control: AbstractControl): void;
    private addControlToParent;
    private addControlToFormArray;
    private addControlToFormGroup;
}
export {};
