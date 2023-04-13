import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BookingDateFormErrorMessage, BookingDateOption, DateFormControl } from '../../models';

export class DateValidators {
  public static getFormValues(formGroup: AbstractControl) {
    const startDateDay = formGroup.get(DateFormControl.BOOKING_START_DAY).value;
    const startDateMonth = formGroup.get(DateFormControl.BOOKING_START_MONTH).value;
    const startDateYear = formGroup.get(DateFormControl.BOOKING_START_YEAR).value;
    const endDateDay = formGroup.get(DateFormControl.BOOKING_END_DAY).value;
    const endDateMonth = formGroup.get(DateFormControl.BOOKING_END_MONTH).value;
    const endDateYear = formGroup.get(DateFormControl.BOOKING_END_YEAR).value;
    const dateOption = formGroup.get('dateOption').value;
    return { startDateDay, startDateMonth, startDateYear, endDateDay, endDateMonth, endDateYear, dateOption };
  }

  public static bookingEmptyValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const { startDateDay, startDateMonth, startDateYear, endDateDay, endDateMonth, endDateYear, dateOption } = this.getFormValues(formGroup);
      if (dateOption !== BookingDateOption.DATERANGE) {
        return;
      }
      if ((!startDateDay || !startDateMonth || !startDateYear) &&
      (!endDateDay || !endDateMonth || !endDateYear)) {
        return { isValid: false, errorType: BookingDateFormErrorMessage.BOOKING_BOTH_DATE_EMPTY_CHECK };
      }
      if (!startDateDay || !startDateMonth || !startDateYear) {
        return { isValid: false, errorType: BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK };
      }
      if (!endDateDay || !endDateMonth || !endDateYear) {
        return { isValid: false, errorType: BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK };
      }
    };
  }

  public static bookingDateValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const { startDateDay, startDateMonth, startDateYear, endDateDay, endDateMonth, endDateYear, dateOption } = this.getFormValues(formGroup);
      if (dateOption !== BookingDateOption.DATERANGE) {
        return;
      }
      const startDate = new Date(startDateYear, startDateMonth - 1, startDateDay, 23, 59, 59);
      const endDate = new Date(endDateYear, endDateMonth - 1, endDateDay, 23, 59, 59);

      if (new Date() > startDate) {
        return { isValid: false, errorType: BookingDateFormErrorMessage.PAST_DATE_CHECK };
      }
      if (!startDateDay || !startDateMonth || !startDateYear ||
        !endDateDay || !endDateMonth || !endDateYear) {
        return { isValid: true };
      }
      if (startDate > endDate) {
        return { isValid: false, errorType: BookingDateFormErrorMessage.DATE_COMPARISON };
      }
      return;
    };
  }
}
