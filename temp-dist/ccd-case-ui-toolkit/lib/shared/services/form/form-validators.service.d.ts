import { AbstractControl, ValidatorFn } from '@angular/forms';
import { CaseField } from '../../domain/definition/case-field.model';
import * as i0 from "@angular/core";
export declare class FormValidatorsService {
    private static readonly CUSTOM_VALIDATED_TYPES;
    static addValidators(caseField: CaseField, control: AbstractControl): AbstractControl;
    static emptyValidator(): ValidatorFn;
    addValidators(caseField: CaseField, control: AbstractControl): AbstractControl;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormValidatorsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormValidatorsService>;
}
//# sourceMappingURL=form-validators.service.d.ts.map