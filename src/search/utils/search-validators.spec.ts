import { FormControl } from '@angular/forms';
import { SearchValidators } from './search-validators';

describe('SearchValidators', () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl({});
  });

  it('postcodeValidator invalid case', () => {
    control.setValue('l15');
    const postcodeValidator = SearchValidators.postcodeValidator();
    expect(postcodeValidator(control)).toEqual({postcode: true});
  });

  it('postcodeValidator valid case', () => {
    control.setValue('l155ax');
    const postcodeValidator = SearchValidators.postcodeValidator();
    expect(postcodeValidator(control)).toBeUndefined();
  });

  it('dayValidator invalid case', () => {
    control.setValue('32');
    const dayValidator = SearchValidators.dayValidator();
    expect(dayValidator(control)).toEqual({isValid: false});
  });

  it('dayValidator valid case', () => {
    control.setValue('10');
    const validator = SearchValidators.dayValidator();
    expect(validator(control)).toBeUndefined();
  });

  it('monthValidator invalid case', () => {
    control.setValue('14');
    const monthValidator = SearchValidators.monthValidator();
    expect(monthValidator(control)).toEqual({isValid: false});
  });

  it('monthValidator valid case', () => {
    control.setValue('10');
    const monthValidator = SearchValidators.monthValidator();
    expect(monthValidator(control)).toBeUndefined();
  });

  it('yearValidator invalid case', () => {
    control.setValue('1800');
    const yearValidator = SearchValidators.yearValidator();
    expect(yearValidator(control)).toEqual({isValid: false});
  });

  it('yearValidator valid case', () => {
    control.setValue('2010');
    const yearValidator = SearchValidators.yearValidator();
    expect(yearValidator(control)).toBeUndefined();
  });
});
