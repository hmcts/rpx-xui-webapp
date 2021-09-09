import { AbstractControl } from '@angular/forms';
import { CaseField } from '../../domain/definition/case-field.model';
export declare class FormValidatorsService {
    private static CUSTOM_VALIDATED_TYPES;
    static addValidators(caseField: CaseField, control: AbstractControl): AbstractControl;
    addValidators(caseField: CaseField, control: AbstractControl): AbstractControl;
}
