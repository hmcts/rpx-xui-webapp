import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateFormControl, BookingDateFormErrorMessage, TimeOption } from '../../models/index';

export class DateValidators {

  public static dayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (control.value <= 0 || control.value > 31) {
        return { isValid : false };
      }
      return;
    };
  }

  public static monthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (control.value <= 0 || control.value > 12) {
        return { isValid : false };
      }
      return;
    };
  }

  public static yearValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (control.value < 1900 || control.value > 2100) {
        return { isValid : false };
      }
      return;
    };
  }

  public static getFormValues(formGroup: AbstractControl) {
    const startDateDay = formGroup.get(DateFormControl.BOOKING_START_DAY).value;
    const startDateMonth = formGroup.get(DateFormControl.BOOKING_START_MONTH).value;
    const startDateYear = formGroup.get(DateFormControl.BOOKING_START_YEAR).value;
    const endDateDay = formGroup.get(DateFormControl.BOOKING_END_DAY).value;
    const endDateMonth = formGroup.get(DateFormControl.BOOKING_END_MONTH).value;
    const endDateYear = formGroup.get(DateFormControl.BOOKING_END_YEAR).value;
    const bookingDateType = formGroup.get('bookingDateType').value;
    return {startDateDay, startDateMonth, startDateYear, endDateDay, endDateMonth, endDateYear, bookingDateType};
  }

  public static bookingEmptyValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const {startDateDay, startDateMonth, startDateYear, endDateDay, endDateMonth, endDateYear, bookingDateType} =  this.getFormValues(formGroup);
      if (bookingDateType !== TimeOption.DATERANGE ) {
        return;
      }
      if ((!startDateDay || !startDateMonth || !startDateYear ) &&
      (!endDateDay  || !endDateMonth  || !endDateYear )  ) {
        return { isValid: false, errorType: BookingDateFormErrorMessage.BOOKING_BOTH_DATE_EMPTY_CHECK };
      }
      if (!startDateDay  || !startDateMonth  || !startDateYear  ) {
        return { isValid: false, errorType: BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK };
      }
      if (!endDateDay  || !endDateMonth  || !endDateYear  ) {
        return { isValid: false, errorType: BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK };
      }
    };
  }

  public static bookingDateValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const {startDateDay, startDateMonth, startDateYear, endDateDay, endDateMonth, endDateYear, bookingDateType} =  this.getFormValues(formGroup);
      if (bookingDateType !== TimeOption.DATERANGE ) {
          return;
      }
      const startDate = new Date(startDateYear, startDateMonth, startDateDay);
      const endDate = new Date(endDateYear, endDateMonth, endDateDay);
      if (new Date() > startDate) {
        return { isValid: false, errorType: BookingDateFormErrorMessage.PAST_DATE_CHECK };
      }
      if (!startDateDay  || !startDateMonth  || !startDateYear ||
        !endDateDay  || !endDateMonth  || !endDateYear ) {
        return { isValid: true };
      }
      if (startDate > endDate) {
        return { isValid: false, errorType: BookingDateFormErrorMessage.DATE_COMPARISON };
      }
      return;
    };
  }
}
