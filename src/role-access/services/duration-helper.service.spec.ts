import { FormControl } from '@angular/forms';
import { DurationHelperService } from '.';

describe('DurationHelperService', () => {
  let durationHelperService: DurationHelperService;

  beforeEach(() => {
    durationHelperService = new DurationHelperService();
  });

  describe('getDateFromControls', () => {
    it('should return a Date object for the provided form controls', () => {
      const dayControl = new FormControl('7');
      const monthControl = new FormControl('7');
      const yearControl = new FormControl('2022');
      const date = durationHelperService.getDateFromControls(dayControl, monthControl, yearControl);
      expect(typeof date).toEqual('object');
    });

    it('should not allow invalid form control values to be used', () => {
      const dayControl = new FormControl('');
      const monthControl = new FormControl('');
      const yearControl = new FormControl('');
      const date = durationHelperService.getDateFromControls(dayControl, monthControl, yearControl);
      expect(date.toString()).toEqual('Invalid Date');
    });
  });

  describe('formatString', () => {
    it('should return the expected strings for the provided numbers', () => {
      const num1 = durationHelperService.formatString(1);
      const num2 = durationHelperService.formatString(9);
      const num3 = durationHelperService.formatString(11);
      expect(num1).toEqual('01');
      expect(num2).toEqual('09');
      expect(num3).toEqual('11');
    });

    it('should throw an error if a negative number is used', () => {
      expect(() => {
        durationHelperService.formatString(-1);
      }).toThrow(new Error('Invalid value provided'));
    });
  });

  describe('getTodaysDate', () => {
    it('should return todays date', () => {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      expect(today).toEqual(durationHelperService.getTodaysDate());
    });
  });

  describe('checkDates', () => {
    it('should return true for both object properties', () => {
      const dateCheck = durationHelperService.checkDates('2202-07-07');
      expect(dateCheck.isEndDateValid).toBe(true);
    });

    it('should return false for both object properties if no date strings are provided', () => {
      const dateCheck = durationHelperService.checkDates('');
      expect(dateCheck.isEndDateValid).toBe(false);
    });

    it('should return false for both object properties if invalid date strings are provided', () => {
      const dateCheck = durationHelperService.checkDates('2022-07-99');
      expect(dateCheck.isEndDateValid).toBe(false);
    });

    it('should return true for the isStartDateValid property ', () => {
      const dateCheck = durationHelperService.checkDates('2022-07-99');
      expect(dateCheck.isEndDateValid).toBe(false);
    });
  });

  describe('convertDateControlsToString', () => {
    it('should return string representation of date for provided form controls', () => {
      const day = new FormControl('7');
      const month = new FormControl('7');
      const year = new FormControl('2022');
      const dateStr = durationHelperService.convertDateControlsToString(day, month, year);
      expect(dateStr).toEqual('2022-07-07');
    });

    it('should return an incorrect date string if an invalid date is provided in form controls', () => {
      const day = new FormControl('');
      const month = new FormControl('');
      const year = new FormControl('');

      const day2 = new FormControl('7');
      const month2 = new FormControl('7');
      const year2 = new FormControl('');

      expect(durationHelperService.convertDateControlsToString(day, month, year)).toEqual('-0-0');
      expect(durationHelperService.convertDateControlsToString(day2, month2, year2)).toEqual('-07-07');
    });

    it('should return extract values for provided form controls', () => {
      const day = new FormControl('7');
      const month = new FormControl('7');
      const year = new FormControl('2022');
      const dateStr = durationHelperService.getRawFromControlsValues(day, month, year);
      expect(dateStr).toEqual({ day: 7, month: 7, year: 2022 });
    });
  });

  describe('getInputClass', () => {
    it('should return an input class without error class', () => {
      const classStr = durationHelperService.getInputClass(false);
      expect(classStr).toEqual('govuk-input govuk-date-input__input govuk-input--width-2');
    });

    it('should return an input class with error class', () => {
      const classStr = durationHelperService.getInputClass(true);
      expect(classStr).toEqual('govuk-input govuk-date-input__input govuk-input--width-2 date-error');
    });

    it('should return an input class without error class for year inputs', () => {
      const classStr = durationHelperService.getInputClass(false, true);
      expect(classStr).toEqual('govuk-input govuk-date-input__input govuk-input--width-4');
    });

    it('should return an input class with error class for year inputs', () => {
      const classStr = durationHelperService.getInputClass(true, true);
      expect(classStr).toEqual('govuk-input govuk-date-input__input govuk-input--width-4 date-error');
    });
  });

  describe('getDateInFuture', () => {
    it('should return a Date object representing date a week from todays date', () => {
      // get todays date
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      // get date a week from todays date
      const weekFromToday = new Date();
      weekFromToday.setUTCDate(today.getUTCDate() + 7);
      weekFromToday.setUTCHours(23, 59, 59, 999);

      // get date a week from today using duration helper service method
      const dateInFuture = durationHelperService.getDateInFuture(7);

      expect(dateInFuture.valueOf()).toEqual(weekFromToday.valueOf());
    });

    it('should throw an error if daysToAdd value is less than zero', () => {
      expect(() => {
        durationHelperService.getDateInFuture(-1);
      }).toThrow(new Error('Invalid value for daysToAdd param'));
    });
  });

  describe('startDateNotInPast', () => {
    it('should return true if start date is todays date', () => {
      const startDate = new Date();
      const startDateNotInPast = durationHelperService.startDateNotInPast(startDate);
      expect(startDateNotInPast).toBe(true);
    });

    it('should return true if start date is after todays date', () => {
      const today = new Date();
      const startDate = new Date();
      startDate.setDate(today.getDate() + 1);
      const startDateNotInPast = durationHelperService.startDateNotInPast(startDate);
      expect(startDateNotInPast).toBe(true);
    });

    it('should return false if start date is before todays date', () => {
      const today = new Date();
      const startDate = new Date();
      startDate.setDate(today.getDate() - 1);
      const startDateNotInPast = durationHelperService.startDateNotInPast(startDate);
      expect(startDateNotInPast).toBe(false);
    });
  });

  describe('startDateBeforeEndDate', () => {
    it('should return true if the start date is before the end date', () => {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 1);
      const startDateBeforeEndDate = durationHelperService.startDateBeforeEndDate(startDate, endDate);
      expect(startDateBeforeEndDate).toBe(true);
    });

    it('should return true if the start date is the same as the end date', () => {
      const startDate = new Date();
      const endDate = new Date();
      const startDateBeforeEndDate = durationHelperService.startDateBeforeEndDate(startDate, endDate);
      expect(startDateBeforeEndDate).toBe(true);
    });

    it('should return false if the start date is after the end date', () => {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() - 1);
      const startDateBeforeEndDate = durationHelperService.startDateBeforeEndDate(startDate, endDate);
      expect(startDateBeforeEndDate).toBe(false);
    });
  });

  describe('setUTCTimezone', () => {
    it('should return null if date is null', () => {
      const date = null;
      const result = durationHelperService.setUTCTimezone(date);
      expect(result).toBe(null);
    });

    it('should return current date if date is current passed', () => {
      const date = new Date();
      const result = durationHelperService.setUTCTimezone(date);
      expect(result).toBe(date);
    });

    it('should return correct JSON date if date is passed', () => {
      const date = new Date(2022, 10, 21);
      date.setHours(0, 0, 0, 0);
      expect(JSON.stringify(date)).toBe('"2022-11-21T00:00:00.000Z"');
      const result = durationHelperService.setUTCTimezone(date);
      expect(JSON.stringify(result)).toBe('"2022-11-21T00:00:00.000Z"');
    });
  });

  describe('setStartTimeOfDay', () => {
    it('should return null if date is null', () => {
      const date = null;
      const result = durationHelperService.setStartTimeOfDay(date);
      expect(result).toBe(null);
    });

    it('should return correct JSON date if date is passed', () => {
      const date = new Date(2022, 10, 21);
      const result = durationHelperService.setStartTimeOfDay(date);
      date.setUTCHours(0, 0, 0, 0);
      expect(result).toBe(date);
    });
  });

  describe('setEndTimeOfDay', () => {
    it('should return null if date is null', () => {
      const date = null;
      const result = durationHelperService.setEndTimeOfDay(date);
      expect(result).toBe(null);
    });

    it('should return correct JSON date if date is passed', () => {
      const date = new Date(2022, 10, 21);
      const result = durationHelperService.setEndTimeOfDay(date);
      date.setUTCHours(23, 59, 59, 999);
      expect(result).toBe(date);
    });
  });
});

