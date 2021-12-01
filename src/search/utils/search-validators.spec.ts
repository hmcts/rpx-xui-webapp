import { FormBuilder, FormControl } from '@angular/forms';
import { SearchFormControl, SearchFormErrorType } from '../enums';
import { SearchValidators } from './search-validators';

describe('SearchValidators', () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl({});
  });

  it('should fail caseReference validation if input is less than 16 digits after removing non-digits', () => {
    control.setValue('1234 1234-1234x123-');
    const caseReferenceValidator = SearchValidators.caseReferenceValidator();
    expect(caseReferenceValidator(control)).toEqual({caseReference: true});
  });

  it('should fail caseReference validation if input is more than 16 digits after removing non-digits', () => {
    control.setValue('1234 1234-1234x12345');
    const caseReferenceValidator = SearchValidators.caseReferenceValidator();
    expect(caseReferenceValidator(control)).toEqual({caseReference: true});
  });

  it('should pass caseReference validation if input is exactly 16 digits after removing non-digits', () => {
    control.setValue('1234 1234-1234x1234-');
    const caseReferenceValidator = SearchValidators.caseReferenceValidator();
    expect(caseReferenceValidator(control)).toBeNull();
  });

  it('should fail caseReference validation if input is null', () => {
    control.setValue(null);
    const caseReferenceValidator = SearchValidators.caseReferenceValidator();
    expect(caseReferenceValidator(control)).toEqual({caseReference: true});
  });

  it('should fail caseReference validation if input is the empty string', () => {
    control.setValue('');
    const caseReferenceValidator = SearchValidators.caseReferenceValidator();
    expect(caseReferenceValidator(control)).toEqual({caseReference: true});
  });

  it('should fail caseReferenceWithWildcards validation if input is less than 16 digits with no wildcards, after removing separators', () => {
    control.setValue('1234 1234-1234 123-');
    const caseReferenceWithWildcardsValidator = SearchValidators.caseReferenceWithWildcardsValidator();
    expect(caseReferenceWithWildcardsValidator(control)).toEqual({caseReference: true});
  });

  it('should fail caseReferenceWithWildcards validation if input is more than 16 digits with no wildcards, after removing separators', () => {
    control.setValue('1234 1234-1234 12345');
    const caseReferenceWithWildcardsValidator = SearchValidators.caseReferenceWithWildcardsValidator();
    expect(caseReferenceWithWildcardsValidator(control)).toEqual({caseReference: true});
  });

  it('should pass caseReferenceWithWildcards validation if input is exactly 16 digits with no wildcards, after removing separators', () => {
    control.setValue('1234 1234-1234 1234-');
    const caseReferenceWithWildcardsValidator = SearchValidators.caseReferenceWithWildcardsValidator();
    expect(caseReferenceWithWildcardsValidator(control)).toBeNull();
  });

  it('should pass caseReferenceWithWildcards validation if input is less than 16 digits and wildcards, after removing separators', () => {
    control.setValue('1234 1234-1234 12*-');
    const caseReferenceWithWildcardsValidator = SearchValidators.caseReferenceWithWildcardsValidator();
    expect(caseReferenceWithWildcardsValidator(control)).toBeNull();
  });

  it('should fail caseReferenceWithWildcards validation if input is more than 16 digits and wildcards, after removing separators', () => {
    control.setValue('1234 1234-1234 *123*-');
    const caseReferenceWithWildcardsValidator = SearchValidators.caseReferenceWithWildcardsValidator();
    expect(caseReferenceWithWildcardsValidator(control)).toEqual({caseReference: true});
  });

  it('should pass caseReferenceWithWildcards validation if input is exactly 16 digits and wildcards, after removing separators', () => {
    control.setValue('1234 1234-1234 *12*-');
    const caseReferenceWithWildcardsValidator = SearchValidators.caseReferenceWithWildcardsValidator();
    expect(caseReferenceWithWildcardsValidator(control)).toBeNull();
  });

  it('should pass caseReferenceWithWildcards validation if input is a single wildcard only', () => {
    control.setValue('*');
    const caseReferenceWithWildcardsValidator = SearchValidators.caseReferenceWithWildcardsValidator();
    expect(caseReferenceWithWildcardsValidator(control)).toBeNull();
  });

  it('should pass caseReferenceWithWildcards validation if input is a single wildcard followed by at least 1 digit', () => {
    control.setValue('*1');
    const caseReferenceWithWildcardsValidator = SearchValidators.caseReferenceWithWildcardsValidator();
    expect(caseReferenceWithWildcardsValidator(control)).toBeNull();
  });

  it('should fail caseReferenceWithWildcards validation if input contains any wildcards not separated by at least 1 digit', () => {
    control.setValue('1234 1234-1234**12-');
    const caseReferenceWithWildcardsValidator = SearchValidators.caseReferenceWithWildcardsValidator();
    expect(caseReferenceWithWildcardsValidator(control)).toEqual({caseReference: true});
  });

  it('postcodeValidator invalid case', () => {
    control.setValue('l15');
    const postcodeValidator = SearchValidators.postcodeValidator();
    expect(postcodeValidator(control)).toEqual({postcode: true});
  });

  it('postcodeValidator valid case', () => {
    control.setValue('l155ax');
    const postcodeValidator = SearchValidators.postcodeValidator();
    expect(postcodeValidator(control)).toBeNull();
  });

  it('dayValidator invalid case', () => {
    control.setValue('32');
    const dayValidator = SearchValidators.dayValidator();
    expect(dayValidator(control)).toEqual({dateDay: true});
  });

  it('dayValidator valid case', () => {
    control.setValue('10');
    const validator = SearchValidators.dayValidator();
    expect(validator(control)).toBeNull();
  });

  it('monthValidator invalid case', () => {
    control.setValue('14');
    const monthValidator = SearchValidators.monthValidator();
    expect(monthValidator(control)).toEqual({dateMonth: true});
  });

  it('monthValidator valid case', () => {
    control.setValue('10');
    const monthValidator = SearchValidators.monthValidator();
    expect(monthValidator(control)).toBeNull();
  });

  it('yearValidator invalid case', () => {
    control.setValue('1800');
    const yearValidator = SearchValidators.yearValidator();
    expect(yearValidator(control)).toEqual({dateYear: true});
  });

  it('yearValidator valid case', () => {
    control.setValue('2010');
    const yearValidator = SearchValidators.yearValidator();
    expect(yearValidator(control)).toBeNull();
  });

  it('dateComparisonValidator invalid case', () => {
    const formGroup = new FormBuilder().group({
      dateOfBirth_day: '',
      dateOfBirth_month: '',
      dateOfBirth_year: '',
      dateOfDeath_day: '',
      dateOfDeath_month: '',
      dateOfDeath_year: '',
    });

    formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).setValue(10);
    formGroup.get(SearchFormControl.DATE_OF_BIRTH_MONTH).setValue(12);
    formGroup.get(SearchFormControl.DATE_OF_BIRTH_YEAR).setValue(2020);

    formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).setValue(10);
    formGroup.get(SearchFormControl.DATE_OF_DEATH_MONTH).setValue(12);
    formGroup.get(SearchFormControl.DATE_OF_DEATH_YEAR).setValue(2010);

    const dateComparisonValidator = SearchValidators.dateComparisonValidator();
    expect(dateComparisonValidator(formGroup)).toEqual({datePair: true, errorType: SearchFormErrorType.DATE_COMPARISON});
  });

  it('dateComparisonValidator valid case', () => {
    const formGroup = new FormBuilder().group({
      dateOfBirth_day: '',
      dateOfBirth_month: '',
      dateOfBirth_year: '',
      dateOfDeath_day: '',
      dateOfDeath_month: '',
      dateOfDeath_year: '',
    });

    formGroup.get(SearchFormControl.DATE_OF_BIRTH_DAY).setValue(10);
    formGroup.get(SearchFormControl.DATE_OF_BIRTH_MONTH).setValue(12);
    formGroup.get(SearchFormControl.DATE_OF_BIRTH_YEAR).setValue(2010);

    formGroup.get(SearchFormControl.DATE_OF_DEATH_DAY).setValue(10);
    formGroup.get(SearchFormControl.DATE_OF_DEATH_MONTH).setValue(12);
    formGroup.get(SearchFormControl.DATE_OF_DEATH_YEAR).setValue(2020);

    const dateComparisonValidator = SearchValidators.dateComparisonValidator();
    expect(dateComparisonValidator(formGroup)).toBeNull();
  });
});
