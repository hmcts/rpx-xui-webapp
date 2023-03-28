import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { FilterConfigOption } from "@hmcts/rpx-xui-common-lib";

export function minSelectedValidator<T>(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const values = control.value as T[];
      return values.length && values.filter(value => value).length >= min ? null : {minlength: true};
    };
  }
  
  export function maxSelectedValidator<T>(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const values = control.value as T[];
      return values.length && values.filter(value => value).length <= max ? null : {maxLength: true};
    };
  }

  export function getValues(options: FilterConfigOption[], values: any[]): any[] {
    return options.reduce((acc: string[], option: { key: string, label: string }, index: number) => {
      if (values[index]) {
        return [...acc, option.key];
      }
      return acc;
    }, []);
  }