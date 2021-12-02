import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

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
}

