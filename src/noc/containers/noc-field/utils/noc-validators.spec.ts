import { FormControl } from '@angular/forms';
import { NocValidators } from './noc-validators';

describe('NocValidators', () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl({});
  });

  it('numberValidator invalid case', () => {
    control.setValue('invalidNumber');
    const numberValidator = NocValidators.numberValidator();
    expect(numberValidator(control)).toEqual({number: true});
  });

  it('numberValidator valid case', () => {
    control.setValue('100');
    const numberValidator = NocValidators.numberValidator();
    expect(numberValidator(control)).toBeUndefined();
  });

  it('postcodeValidator invalid case', () => {
    control.setValue('l15');
    const postcodeValidator = NocValidators.postcodeValidator();
    expect(postcodeValidator(control)).toEqual({postcode: true});
  });

  it('postcodeValidator valid case', () => {
    control.setValue('l155ax');
    const postcodeValidator = NocValidators.postcodeValidator();
    expect(postcodeValidator(control)).toBeUndefined();
  });

  it('phoneUKValidator invalid case', () => {
    control.setValue('123546547897');
    const phoneUKValidator = NocValidators.phoneUKValidator();
    expect(phoneUKValidator(control)).toEqual({phoneUK: true});
  });

  it('phoneUKValidator valid case', () => {
    control.setValue('07777777777');
    const phoneUKValidator = NocValidators.phoneUKValidator();
    expect(phoneUKValidator(control)).toBeUndefined();
  });
});
