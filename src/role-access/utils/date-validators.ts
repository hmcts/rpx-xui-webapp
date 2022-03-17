import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  SpecificAccessDurationFormControl,
  SpecificAccessDurationFormErrorMessage,
  SpecificAccessDurationOption,
} from '../models';

export class DateValidators {

  public static getFormValues(formGroup: AbstractControl) {
    const startDateDay = formGroup.get(SpecificAccessDurationFormControl.START_DAY).value;
    const startDateMonth = formGroup.get(SpecificAccessDurationFormControl.START_MONTH).value;
    const startDateYear = formGroup.get(SpecificAccessDurationFormControl.START_YEAR).value;
    const endDateDay = formGroup.get(SpecificAccessDurationFormControl.END_DAY).value;
    const endDateMonth = formGroup.get(SpecificAccessDurationFormControl.END_MONTH).value;
    const endDateYear = formGroup.get(SpecificAccessDurationFormControl.END_YEAR).value;
    const dateOption = formGroup.get('dateOption').value;
    return {startDateDay, startDateMonth, startDateYear, endDateDay, endDateMonth, endDateYear, dateOption};
  }

  public static specificAccessEmptyValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const {startDateDay, startDateMonth, startDateYear, endDateDay, endDateMonth, endDateYear, dateOption} =  this.getFormValues(formGroup);
      if (dateOption !== SpecificAccessDurationOption.DATE_RANGE ) {
        return;
      }
      if ((!startDateDay || !startDateMonth || !startDateYear ) &&
      (!endDateDay  || !endDateMonth  || !endDateYear )  ) {
        return { isValid: false, errorType: SpecificAccessDurationFormErrorMessage.BOTH_DATE_EMPTY_CHECK };
      }
      if (!startDateDay  || !startDateMonth  || !startDateYear  ) {
        return { isValid: false, errorType: SpecificAccessDurationFormErrorMessage.START_DATE_EMPTY_CHECK };
      }
      if (!endDateDay  || !endDateMonth  || !endDateYear  ) {
        return { isValid: false, errorType: SpecificAccessDurationFormErrorMessage.END_DATE_EMPTY_CHECK };
      }
    };
  }

  public static specificAccessDateValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const {startDateDay, startDateMonth, startDateYear, endDateDay, endDateMonth, endDateYear, dateOption} =  this.getFormValues(formGroup);
      if (dateOption !== SpecificAccessDurationOption.DATE_RANGE ) {
        return;
      }
      const startDate = new Date(startDateYear, startDateMonth - 1, startDateDay, 23, 59, 59);
      const endDate = new Date(endDateYear, endDateMonth - 1, endDateDay, 23, 59, 59);

      if (new Date() > startDate) {
        return { isValid: false, errorType: SpecificAccessDurationFormErrorMessage.PAST_DATE_CHECK };
      }
      if (!startDateDay  || !startDateMonth  || !startDateYear ||
        !endDateDay  || !endDateMonth  || !endDateYear ) {
        return { isValid: true };
      }
      if (startDate > endDate) {
        return { isValid: false, errorType: SpecificAccessDurationFormErrorMessage.DATE_COMPARISON };
      }
      return;
    };
  }
}
