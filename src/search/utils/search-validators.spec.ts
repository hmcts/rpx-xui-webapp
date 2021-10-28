import { FormControl } from "@angular/forms";
import { SearchValidators } from "./search-validators";

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

  it('dateValidator invalid case', () => {
    control.setValue('2019-13-24');
    const validator = SearchValidators.dateValidator();
    expect(validator(control)).toEqual({date: true, month: true, valid: false});
  });

  it('dateValidator valid case', () => {
    control.setValue('2019-12-24');
    const validator = SearchValidators.dateValidator();
    expect(validator(control)).toBeUndefined();
  });
});
