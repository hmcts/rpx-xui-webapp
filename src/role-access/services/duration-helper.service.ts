import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { boolean } from '@pact-foundation/pact/dsl/matchers';

@Injectable({ providedIn: 'root' })
export class DurationHelperService {

  public dateFormat = 'YYYY-MM-DD';

  /**
   * Return todays Date object for provided FormControl's
   * @param dayControl day form control
   * @param monthControl month form control
   * @param yearControl year form control
   * @return date object
   */
  public getDateFromControls(
    dayControl: FormControl,
    monthControl: FormControl,
    yearControl: FormControl
  ): Date {
    return new Date(yearControl.value, monthControl.value - 1, dayControl.value);
  }

  /**
   * Return todays date as a Date object
   * @return date object
   */
  public getTodaysDate(): Date {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  }

  /**
   * For given number returns string representation with 0 prefix if it's single digit
   * @param n the number to convert to string
   * @return string representation of number
   */
  public formatString(n: number): string {
    return n >= 10 ? n.toString() : `0${n}`;
  }

  /**
   * For given startDate and endDate strings return object representing validity of dates
   * @param startDate the start date string e.g. YYYY-MM-DD
   * @param endDate the end date string e.g. YYYY-MM-DD
   * @return object representing date validity
   */
  public checkDates(
    startDate: string,
    endDate: string
  ): { isStartDateValid: boolean, isEndDateValid: boolean} {
    const isStartDateValid = moment(startDate, this.dateFormat, true).isValid();
    const isEndDateValid = moment(endDate, this.dateFormat, true).isValid();
    return {
      isStartDateValid,
      isEndDateValid
    }
  }

  /**
   * For given array of dateControls returns string representation of the date
   * @param dateControls array of form controls for a date, expects 3 controls (day, month, year)
   * @return string representation of date: YYYY-MM-DD
   */
  public convertDateControlsToString(dateControls: FormControl[]): string {
    if (dateControls.length !== 3) {
      return '';
    }
    const dayStart = this.formatString(dateControls[0].value);
    const monthStart = this.formatString(dateControls[1].value);
    const yearStart = dateControls[2].value;
    return `${yearStart}-${monthStart}-${dayStart}`;
  }

  /**
   * Returns a string used for the class on date input fields
   * @param isError whether there is an input error
   * @param isYear whether the input is a year field. Default = false
   * @return the class string for the input field
   */
  public getInputClass(isError: boolean, isYear = false): string {
    const inputClass = `govuk-input govuk-date-input__input govuk-input--width-${isYear ? '4' : '2'}`;
    return isError ? `${inputClass} date-error` : inputClass;
  }

}
