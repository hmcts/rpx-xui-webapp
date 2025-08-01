import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { CheckDatesResult } from '../models';

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
    const day = parseInt(dayControl.value, 10);
    const month = parseInt(monthControl.value, 10) - 1;
    const year = parseInt(yearControl.value, 10);
    if (typeof day !== 'number' || typeof month !== 'number' || typeof year !== 'number') {
      throw new Error('Invalid values provided');
    }
    return new Date(year, month, day);
  }

  public getRawFromControlsValues(
    dayControl: FormControl,
    monthControl: FormControl,
    yearControl: FormControl
  ): any {
    const day = parseInt(dayControl.value, 10);
    const month = parseInt(monthControl.value, 10);
    const year = parseInt(yearControl.value, 10);
    return { day, month, year };
  }

  /**
   * Return todays date as a Date object
   * @return date object
   */
  public getTodaysDate(): Date {
    const currentDate = new Date();
    return this.setStartTimeOfDay(currentDate);
  }

  /**
   * For given number returns string representation with 0 prefix if it's single digit
   * @param n the number to convert to string
   * @return string representation of number
   */
  public formatString(n: number): string {
    if (n < 0) {
      throw new Error('Invalid value provided');
    }
    return n >= 10 ? n.toString() : `0${n}`;
  }

  /**
   * For given startDate and endDate strings return object representing validity of dates
   * @param startDate the start date string e.g. YYYY-MM-DD
   * @param endDate the end date string e.g. YYYY-MM-DD
   * @return object representing date validity
   */
  public checkDates(
    endDate: string
  ): CheckDatesResult {
    const isEndDateValid = moment(endDate, this.dateFormat, true).isValid();
    return {
      isEndDateValid
    };
  }

  /**
   * For provided date form controls returns a string representation of the date
   * @param dayControl the day form control
   * @param monthControl the day form control
   * @param yearControl the day form control
   * @return string representation of date: YYYY-MM-DD
   */
  public convertDateControlsToString(
    dayControl: FormControl,
    monthControl: FormControl,
    yearControl: FormControl
  ): string {
    const dayStart = this.formatString(dayControl.value);
    const monthStart = this.formatString(monthControl.value);
    const yearStart = yearControl.value;
    const dateStr = `${yearStart}-${monthStart}-${dayStart}`;
    return dateStr;
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

  /**
   * Returns a date in the future based on daysToAdd parameter
   * @param daysToAdd number of days to add to todays date
   * @return Date object
   */
  public getDateInFuture(daysToAdd: number): Date {
    if (daysToAdd < 0) {
      throw new Error('Invalid value for daysToAdd param');
    }
    const date = moment().add(daysToAdd, 'd').toDate();
    return this.setEndTimeOfDay(date);
  }

  /**
   * Returns boolean representing whether the start date is in the past or not
   * @param startDate the start date to compare to todays date
   * @return boolean
   */
  public startDateNotInPast(startDate: Date): boolean {
    return startDate >= this.getTodaysDate();
  }

  /**
   * Returns boolean representing whether the start date is before the end date
   * @param startDate the start date
   * @param endDate the end date
   * @return boolean
   */
  public startDateBeforeEndDate(startDate: Date, endDate: Date): boolean {
    return startDate <= endDate;
  }

  public setUTCTimezone(date: Date): Date {
    if (!date) {
      return null;
    }
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
  }

  public setStartTimeOfDay(date: Date): Date {
    if (!date) {
      return null;
    }
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  public setEndTimeOfDay(date: Date): Date {
    if (!date) {
      return null;
    }
    date.setUTCHours(23, 59, 59, 999);
    return date;
  }
}
