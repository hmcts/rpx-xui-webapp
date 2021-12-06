import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public numberMinMaxValidator(minNumber: number, maxNumber: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const inputNumber = Number(control.value);
      return !isNaN(Number(inputNumber)) && inputNumber >= minNumber && inputNumber <= maxNumber ? null : { isValid: false };
    };
  }

  public minutesValidator(minNumber: number, maxNumber: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const hours = Number(control.get('hours').value);
      const minutes = Number(control.get('minutes').value);
      const totalMinutes = (hours * 60) + minutes;
      return !isNaN(Number(totalMinutes)) && totalMinutes >= minNumber && totalMinutes <= maxNumber ? null : { isValid: false };
    };
  }

  public hearingDateValidator(unavailableDateList: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = moment(Object.values(control.value).join('-'), 'DD-MM-YYYY');
      return selectedDate.isValid() &&
        ((selectedDate.weekday() !== 6) && (selectedDate.weekday() !== 0)) &&
        !unavailableDateList.includes(selectedDate.format('DD MMMM YYYY'))
        ? null : { isValid: false };
    };
  }

  public hearingDateRangeValidator(unavailableDateList: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const firstDateRange = Object.keys(control.value)[0];
      const secondDateRange = Object.keys(control.value)[0];
      const firstDate = moment(Object.values(control.value[firstDateRange]).join('-'), 'DD-MM-YYYY');
      const secondDate = moment(Object.values(control.value[secondDateRange]).join('-'), 'DD-MM-YYYY');
      return (firstDate.isValid() || secondDate.isValid()) && (secondDate > firstDate) &&
        ((firstDate.weekday() !== 6) && (firstDate.weekday() !== 0)) &&
        ((secondDate.weekday() !== 6) && (secondDate.weekday() !== 0)) &&
        !unavailableDateList.includes(firstDate.format('DD MMMM YYYY')) &&
        !unavailableDateList.includes(secondDate.format('DD MMMM YYYY'))
        ? null : { isValid: false };
    };
  }
}

