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

  it('dateValidator valid case', () => {
    control.setValue('24/12/2019');
    const validator = NocValidators.dateValidator();
    expect(validator(control)).toBeUndefined();
  });

  it('dateValidator invalid case', () => {
    control.setValue('24/13/2019');
    const validator = NocValidators.dateValidator();
    expect(validator(control)).toEqual({date: true, month: true, valid: false});
  });

  it('dateTimeValidator valid 12 hour case', () => {
    control.setValue('24/12/2019 09:15:00');
    const validator = NocValidators.dateTimeValidator();
    expect(validator(control)).toBeUndefined();
  });

  it('dateTimeValidator valid 24 hour case', () => {
    control.setValue('24/12/2019 22:00:00');
    const validator = NocValidators.dateTimeValidator();
    expect(validator(control)).toBeUndefined();
  });

  it('dateTimeValidator invalid case', () => {
    control.setValue('24/13/2019 30:15:00');
    const validator = NocValidators.dateTimeValidator();
    expect(validator(control)).toEqual({datetime: true, month: true, valid: false});
  });

  it('timeValidator valid 12 hour case', () => {
    control.setValue('09:15:00');
    const validator = NocValidators.timeValidator();
    expect(validator(control)).toBeUndefined();
  });

  it('timeValidator valid 24 hour case', () => {
    control.setValue('22:00:00');
    const validator = NocValidators.timeValidator();
    expect(validator(control)).toBeUndefined();
  });

  it('timeValidator invalid case', () => {
    control.setValue('30:15:00');
    const validator = NocValidators.timeValidator();
    expect(validator(control)).toEqual({time: true, hour: true, valid: false, message: ''});
  });
});
