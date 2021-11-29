import { FormBuilder, FormControl } from '@angular/forms';
import {
  BookingDateFormErrorMessage,
  TimeOption,
} from '../../models';
import { DateValidators } from './date-validators';

describe('DateValidators', () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl({});
  });

  it('should have an invalid date', () => {
    control.setValue('32');
    const dayValidator = DateValidators.dayValidator();
    expect(dayValidator(control)).toEqual({ isValid: false });
  });

  it('should have an valid date', () => {
    control.setValue('10');
    const validator = DateValidators.dayValidator();
    expect(validator(control)).toBeUndefined();
  });

  it('should have an invalid date', () => {
    control.setValue('14');
    const monthValidator = DateValidators.monthValidator();
    expect(monthValidator(control)).toEqual({ isValid: false });
  });

  it('should have an valid date', () => {
    control.setValue('10');
    const monthValidator = DateValidators.monthValidator();
    expect(monthValidator(control)).toBeUndefined();
  });

  it('should have an invalid date', () => {
    control.setValue('1800');
    const yearValidator = DateValidators.yearValidator();
    expect(yearValidator(control)).toEqual({ isValid: false });
  });

  it('should have an valid date', () => {
    control.setValue('2010');
    const yearValidator = DateValidators.yearValidator();
    expect(yearValidator(control)).toBeUndefined();
  });

  it('should not allow the start date to be after the today', () => {
    const formGroup = new FormBuilder().group({
      startDate_day: '',
      startDate_month: '',
      startDate_year: '',
      endDate_year: '',
      endDate_month: '',
      endDate_day: '',
      bookingDateType: '',
    });
    formGroup.get('startDate_day').setValue(10);
    formGroup.get('startDate_month').setValue(12);
    formGroup.get('startDate_year').setValue(2020);
    formGroup.get('endDate_year').setValue(10);
    formGroup.get('endDate_month').setValue(12);
    formGroup.get('endDate_day').setValue(2010);
    formGroup.get('bookingDateType').setValue(TimeOption.DATERANGE);
    const bookingDateValidator = DateValidators.bookingDateValidator();
    expect(bookingDateValidator(formGroup)).toEqual({
      isValid: false,
      errorType: BookingDateFormErrorMessage.PAST_DATE_CHECK,
    });
  });

  it('should not allow the start date to be after the end date', () => {
    const formGroup = new FormBuilder().group({
      startDate_day: '',
      startDate_month: '',
      startDate_year: '',
      endDate_year: '',
      endDate_month: '',
      endDate_day: '',
      bookingDateType: '',
    });
    formGroup.get('startDate_day').setValue(11);
    formGroup.get('startDate_month').setValue(12);
    formGroup.get('startDate_year').setValue(2022);
    formGroup.get('endDate_year').setValue(10);
    formGroup.get('endDate_month').setValue(12);
    formGroup.get('endDate_day').setValue(2022);
    formGroup.get('bookingDateType').setValue(TimeOption.DATERANGE);
    const dateComparisonValidator = DateValidators.bookingDateValidator();
    expect(dateComparisonValidator(formGroup)).toEqual({
      isValid: false,
      errorType: BookingDateFormErrorMessage.DATE_COMPARISON,
    });
  });
});
