import { AbstractControl, FormArray, UntypedFormGroup } from '@angular/forms';
import { CaseField } from '../../../domain/definition/case-field.model';
import * as i0 from "@angular/core";
declare type FormContainer = UntypedFormGroup | FormArray;
export declare abstract class AbstractFormFieldComponent {
    caseField: CaseField;
    formGroup: UntypedFormGroup;
    parent?: FormContainer;
    idPrefix: string;
    id(): string;
    protected registerControl<T extends AbstractControl>(control: T, replace?: boolean): AbstractControl;
    protected addValidators(caseField: CaseField, control: AbstractControl): void;
    private addControlToParent;
    private addControlToFormArray;
    private addControlToFormGroup;
    static ɵfac: i0.ɵɵFactoryDeclaration<AbstractFormFieldComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AbstractFormFieldComponent, never, never, { "caseField": "caseField"; "formGroup": "formGroup"; "parent": "parent"; "idPrefix": "idPrefix"; }, {}, never, never, false, never>;
}
export {};
//# sourceMappingURL=abstract-form-field.component.d.ts.map