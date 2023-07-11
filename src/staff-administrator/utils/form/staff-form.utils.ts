import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { GroupOptions } from '@hmcts/rpx-xui-common-lib';
import { MultipleErrorMessage } from '../../../app/models';
import {
  StaffAddEditUserFormValidationMessages
} from '../../components/staff-add-edit-user/staff-add-edit-user-form/staff-add-edit-user-form-validation-messages.enum';
import { StaffFilterOption } from '../../models/staff-filter-option.model';

export function minSelectedValidator<T>(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const values = control.value as T[];
    return values.length && values.filter((value) => value).length >= min ? null : { minlength: true };
  };
}

export function maxSelectedValidator<T>(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const values = control.value as T[];
    return values.length && values.filter((value) => value).length <= max ? null : { maxLength: true };
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

export const getFormValidationErrorMessages = (formGroup: FormGroup, wrongLocations: string[]): MultipleErrorMessage[] => {
  const errors: MultipleErrorMessage[] = [];
  Object.keys(formGroup.controls).forEach((controlName) => {
    const control = formGroup.controls[controlName];
    const controlErrors = control.errors;

    if (controlErrors) {
      Object.keys(controlErrors).forEach((errorKey) => {
        const errorMessage = StaffAddEditUserFormValidationMessages[`${controlName}.${errorKey}`];

        if (errorMessage) {
          errors.push({ name: controlName, error: errorMessage });
        }
      });
    }
    if (controlName === 'base_locations' && wrongLocations.length > 0) {
      errors.push({ name: controlName, error: setLocationErrorMessages(wrongLocations) });
    }
  });
  return errors;
};

export const groupItemsByGroupSize = <T>(items: T[], groupSize: number): T[][] => {
  const groups = [];
  for (let i = 0; i < items.length; i += groupSize) {
    const group = items.slice(i, i + groupSize);
    groups.push(group);
  }
  return groups;
};

export const setLocationErrorMessages = (wrongLocations: string[]): string => {
  let locationString = wrongLocations[0];
  for (let i = 1; i < wrongLocations.length; i++) {
    locationString = locationString + ', ' + wrongLocations[i];
  }
  const error = wrongLocations.length === 1 ?
    `There is a problem. Location ${locationString} is not valid for the services selected` :
    `There is a problem. Locations ${locationString} are not valid for the services selected`;
  return error;
};

export const getServiceNameFromSkillId = (skillId: string, skillGroupOptions: GroupOptions[]): string => {
  return skillGroupOptions.find((group) => group.options.find((option) => option.key === skillId))?.group;
};
