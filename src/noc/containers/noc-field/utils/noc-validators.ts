import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

const REGEX_DOS_FIX_LIMIT = 100;

export class NocValidators {
  private static isEmpty(value: any): boolean {
    return value === null || value === undefined || value === '';
  }

  public static numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.isEmpty(control.value)) {
        return null;
      }
      const value = control.value.toString();
      const isValid = value.length < REGEX_DOS_FIX_LIMIT && /^[0-9]+(\.?[0-9]+)?$/.test(value);
      return isValid ? null : { number: true };
    };
  }

  public static postcodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.isEmpty(control.value)) {
        return null;
      }
      const value = control.value.toString();

      const regEx = new RegExp(
        /^([A-Za-z]{1,2}[0-9][A-Za-z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?/.source //eg SE17 & special postcodes
       + /[0-9][A-Za-z]{2}|BFPO ?/.source //british forces postal overseas
       + /[0-9]{1,4}/.source // additional post code
       + /|(KY[0-9]|MSR|VG|AI)[ -]?[0-9]{4}|[A-Za-z]{2} ?[0-9]{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1$/.source // more postcode
      ).test(value);
      const isValid = value.length < REGEX_DOS_FIX_LIMIT && regEx;
      return isValid ? null : { postcode: true };
    };
  }

  public static phoneUKValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.isEmpty(control.value)) {
        return null;
      }
      const value = control.value.toString();
      const regEx = new  RegExp(''
      // /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))/.source //
      // + /|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|#)\d{3,4})?$/.source //
      ).test(value);
      const isValid = value.length < REGEX_DOS_FIX_LIMIT && regEx;
      return isValid ? null : { phoneUK: true };
    };
  }

  public static dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.isEmpty(control.value)) {
        return null;
      }
      const value = control.value.toString();
      const [year, month, day] = value.split('-').map(Number);
      const isValidDate = moment(value, 'YYYY-MM-DD', true).isValid();
      if (!isValidDate || year === 0 || month === 0 || month > 12 || day === 0 || day > 31) {
        return { month: true, date: true, valid: false };
      }
      return null;
    };
  }

  public static dateTimeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.isEmpty(control.value)) {
        return null;
      }
      const value = control.value.toString().replace('T', ' ').replace('.000', '');
      const isValidDateTime = moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid();
      const [datePart, timePart] = control.value.toString().split('T');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute, second] = (timePart || '').split(':').map(Number);

      if (!isValidDateTime || year === 0 || month === 0 || month > 12 || day === 0 || day > 31 ||
          hour > 23 || minute > 59 || (second !== undefined && second > 59)) {
        return { month: true, datetime: true, valid: false };
      }
      return null;
    };
  }

  public static timeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.isEmpty(control.value)) {
        return null;
      }
      const value = control.value.toString();
      const [hour, minute, second] = value.split(':').map(Number);
      const isValidTime = moment(value, 'HH:mm:ss', true).isValid();
      if (!isValidTime || hour > 23 || minute > 59 || (second !== undefined && second > 59)) {
        return { hour: true, time: true, valid: false, message: '' };
      }
      return null;
    };
  }
}
