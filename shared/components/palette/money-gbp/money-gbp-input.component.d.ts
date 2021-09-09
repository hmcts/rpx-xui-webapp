import { ControlValueAccessor, FormControl, ValidationErrors, Validator } from '@angular/forms';
export declare class MoneyGbpInputComponent implements ControlValueAccessor, Validator {
    private static readonly PATTERN_REGEXP;
    id: string;
    name: string;
    mandatory: boolean;
    formControl: FormControl;
    private rawValue;
    displayValue: string;
    disabled: boolean;
    onChange(event: any): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(_: any): void;
    setDisabledState(isDisabled: boolean): void;
    private propagateChange;
    validate(control: FormControl): ValidationErrors;
    registerOnValidatorChange(_: () => void): void;
}
