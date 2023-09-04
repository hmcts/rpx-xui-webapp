import { ControlValueAccessor, FormControl, ValidationErrors, Validator } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class MoneyGbpInputComponent implements ControlValueAccessor, Validator {
    private static readonly PATTERN_REGEXP;
    id: string;
    name: string;
    mandatory: boolean;
    formControl: FormControl;
    displayValue: string;
    disabled: boolean;
    private rawValue;
    onChange(event: any): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(_: any): void;
    setDisabledState(isDisabled: boolean): void;
    validate(control: FormControl): ValidationErrors;
    registerOnValidatorChange(_: () => void): void;
    private propagateChange;
    static ɵfac: i0.ɵɵFactoryDeclaration<MoneyGbpInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MoneyGbpInputComponent, "ccd-money-gbp-input", never, { "id": "id"; "name": "name"; "mandatory": "mandatory"; "formControl": "formControl"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=money-gbp-input.component.d.ts.map