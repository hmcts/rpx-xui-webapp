import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SearchFormControl, SearchFormErrorType } from '../enums';

/**
 * A collection of validators for use with certain fields of the "Search cases" form and the 16-digit case reference input box in the
 * menu bar. Validator functions return a key-value pair error object if validation fails, or null if it passes. By convention, the
 * error object returned has the error name as its key and the value is always true.
 */
export class SearchValidators {

  /**
   * Validates case reference entry. Excluding spaces and '-' characters, it accepts exactly 16 digits only. All other characters are
   * invalid.
   * @returns `ValidationErrors` object if validation fails; `null` if it passes
   */
  public static caseReferenceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Use template literal to coerce control.value to a string in case it is null
      if (!(`${control.value}`).replace(/[\s-]/g, '').match(/^\d{16}$/)) {
        return { caseReference: true };
      }
      return null;
    };
  }

  /**
   * Validates case reference entry. Excluding spaces and '-' as separators, it accepts either exactly 16 digits or a combination of
   * digits and asterisk (*) wildcard characters up to a maximum of 16, with at least a 1-digit separation between wildcards.
   * @returns `ValidationErrors` object if validation fails; `null` if it passes
   */
  public static caseReferenceWithWildcardsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }

      /**
       * Explanation of regex used for matching (from @ronaldmansveld):
       *
       * ^\d{16}$ -> matches exactly 16 digits
       * (?=.{1,16}$) -> positive lookahead, making sure we're dealing with between 1 and 16 characters for the next check
       * (\d+)? -> start with any optional digits
       * (\*(\d|$)+)+ -> asterisk followed by one or more digits or end of string; this can be done multiple times. Ensures that an
       * asterisk is either end of the string, or followed by at least 1 digit. Since the start is optional digits, it can start
       * with the asterisk itself as well
       *
       * Last two fragments are surrounded with parentheses to be sure that the lookahead applies to the whole thing.
       */
      if (!control.value.toString().replace(/[\s-]/g, '').match(/^\d{16}$|^(?=.{1,16}$)((\d+)?(\*(\d|$)+)+)/)) {
        return { caseReference: true };
      }
      return null;
    };
  }

  public static postcodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (!control.value.toString().match(/^(([A-Za-z]{1,2}[0-9][A-Za-z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?[0-9][A-Za-z]{2}|BFPO ?[0-9]{1,4}|(KY[0-9]|MSR|VG|AI)[ -]?[0-9]{4}|[A-Za-z]{2} ?[0-9]{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/)) {
        return { postcode: true };
      }
      return null;
    };
  }

  public static dayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (control.value === 0 || control.value > 31) {
        return { dateDay : true };
      }
      return null;
    };
  }

  public static monthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (control.value === 0 || control.value > 12) {
        return { dateMonth : true };
      }
      return null;
    };
  }

  public static yearValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') { return; }
      if (control.value === 0 || control.value < 1900) {
        return { dateYear : true };
      }
      return null;
    };
  }

  public static dateComparisonValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      // Set values to empty strings if they are not truthy
      const dateOfBirthDay = formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).value || '';
      const dateOfBirthMonth = formGroup.get(SearchFormControl.DATE_OF_BIRTH_MONTH).value || '';
      const dateOfBirthYear = formGroup.get(SearchFormControl.DATE_OF_BIRTH_YEAR).value || '';
      const dateOfDeathDay = formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).value || '';
      const dateOfDeathMonth = formGroup.get(SearchFormControl.DATE_OF_DEATH_MONTH).value || '';
      const dateOfDeathYear = formGroup.get(SearchFormControl.DATE_OF_DEATH_YEAR).value || '';

      // No comparison possible if either date has one or more blank fields (should no longer happen once the revised xuilib-gov-uk-date
      // component with built-in validation is released in XUI Common Lib)
      if (dateOfBirthDay === '' || dateOfBirthMonth === '' || dateOfBirthYear === '' ||
          dateOfDeathDay === '' || dateOfDeathMonth === '' || dateOfDeathYear === '') {
        return null;
      }

      // Form the dates. **Note: month ranges from 0-11 for the Date constructor!**
      const dateOfBirth = new Date(dateOfBirthYear, dateOfBirthMonth - 1, dateOfBirthDay);
      const dateOfDeath = new Date(dateOfDeathYear, dateOfDeathMonth - 1, dateOfDeathDay);

      // Do not compare if one of the dates is not well formed
      if (dateOfBirth.getFullYear() < 1900 || dateOfDeath.getFullYear() < 1900) {
        return null;
      }

      // Compare
      if (dateOfBirth > dateOfDeath) {
        return { datePair: true, errorType: SearchFormErrorType.DATE_COMPARISON };
      }
      return null;
    };
  }
}
