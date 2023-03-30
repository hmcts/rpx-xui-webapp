import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { FilterConfigOption } from '@hmcts/rpx-xui-common-lib';
import { StaffFilterOption } from '../models/staff-filter-option.model';

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

export const addFormValidators = (min: number, max: number): Validators => {
  const validators = [];
  if (min && min > 0) {
    validators.push(minSelectedValidator(min));
  }

  if (max && max > 0) {
    validators.push(maxSelectedValidator(max));
  }

  return validators;
};

export function getValues(options: FilterConfigOption[], values: any[]): any[] {
  return options.reduce((acc: string[], option: { key: string, label: string }, index: number) => {
    if (values[index]) {
      return [...acc, option.key];
    }
    return acc;
  }, []);
}

export const filterItemsByBoolean = <T>(items: T[], bools: boolean[]): T[] => {
  return items.filter((item, index) => bools[index]);
};

export const buildCheckboxArray = (options: StaffFilterOption[], min: number, max: number, preselectedValues?: any[]): FormArray => {
  const validators = addFormValidators(min, max);
  const formArray = new FormArray([], validators);

  for (const option of options) {
    let checked = false;
    if (preselectedValues?.length > 0) {
      checked = !!preselectedValues.find((value) => value === option.key);
    }
    formArray.push(new FormControl(checked));
  }

  return formArray;
};

export const getInvalidControlNames = (form: FormGroup): string[] => {
  return Object.keys(form.controls).filter(controlName => {
    const control = form.get(controlName);
    return control.invalid;
  });
};
