import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationErrors } from '@angular/forms/src/directives/validators';

export class NocValidators {
  public static numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
        return { number: true };
      }
      return;
    };
  }
}

