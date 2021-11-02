import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SearchFormControl, SearchFormErrorType } from '../enums';

export class SearchValidators {

  public static postcodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (!control.value.toString().match(/^(([A-Za-z]{1,2}[0-9][A-Za-z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?[0-9][A-Za-z]{2}|BFPO ?[0-9]{1,4}|(KY[0-9]|MSR|VG|AI)[ -]?[0-9]{4}|[A-Za-z]{2} ?[0-9]{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/)) {
        return { postcode: true };
      }
      return;
    };
  }

  public static dayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (control.value === 0 || control.value > 31) {
        return { isValid : false };
      }
      return;
    };
  }

  public static monthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (control.value === 0 || control.value > 12) {
        return { isValid : false };
      }
      return;
    };
  }

  public static yearValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (control.value === 0 || control.value < 1900) {
        return { isValid : false };
      }
      return;
    };
  }

  public static dateComparisonValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const dateOfBirthDay = formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).value;
      const dateOfBirthMonth = formGroup.get(SearchFormControl.DATE_OF_BIRTH_MONTH).value;
      const dateOfBirthYear = formGroup.get(SearchFormControl.DATE_OF_BIRTH_YEAR).value;
      const dateOfDeathDay = formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).value;
      const dateOfDeathMonth = formGroup.get(SearchFormControl.DATE_OF_DEATH_MONTH).value;
      const dateOfDeathYear = formGroup.get(SearchFormControl.DATE_OF_DEATH_YEAR).value;

      // No comparison required if both the dates are blank
      if (dateOfBirthDay === '' && dateOfBirthMonth === '' && dateOfBirthYear === '' &&
          dateOfDeathDay === '' && dateOfDeathMonth === '' && dateOfDeathYear === '') {
        return;
      }

      // Form the dates
      const dateOfBirth = new Date(dateOfBirthYear, dateOfBirthMonth, dateOfBirthDay);
      const dateOfDeath = new Date(dateOfDeathYear, dateOfDeathMonth, dateOfDeathDay);

      // Do not compare even if one of the date is not well formed
      if (dateOfBirth.getFullYear() <= 1900 || dateOfDeath.getFullYear() <= 1900) {
        return;
      }

      // Compare
      if (dateOfBirth > dateOfDeath) {
        return { isValid: false, errorType: SearchFormErrorType.DATE_COMPARISON };
      }
      return;
    };
  }
}
