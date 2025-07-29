import { FormControl, Validators } from '@angular/forms';
import { FormValidatorsService } from './form-validators.service';
import { NocQuestion } from '../../models';
import { NocValidators } from './utils/noc-validators';

describe('FormValidatorsService', () => {
  let service: FormValidatorsService;

  beforeEach(() => {
    service = new FormValidatorsService();
  });

  describe('addValidators', () => {
    describe('Text field type', () => {
      it('should add pattern validator with custom regular expression', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'Text',
            regular_expression: '^[A-Z]+$'
          }
        } as NocQuestion;
        const control = new FormControl('');
        
        const result = service.addValidators(nocQuestion, control);
        
        expect(result.hasError('pattern')).toBeFalsy();
        control.setValue('abc');
        expect(control.hasError('pattern')).toBeTruthy();
        control.setValue('ABC');
        expect(control.hasError('pattern')).toBeFalsy();
      });

      it('should add default whitespace pattern validator when no regular expression provided', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'Text'
          }
        } as NocQuestion;
        const control = new FormControl('');
        
        const result = service.addValidators(nocQuestion, control);
        
        control.setValue(' leading space');
        expect(control.hasError('pattern')).toBeTruthy();
        control.setValue('trailing space ');
        expect(control.hasError('pattern')).toBeTruthy();
        control.setValue('valid text');
        expect(control.hasError('pattern')).toBeFalsy();
      });

      it('should add minLength validator when min is specified', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'Text',
            min: 5
          }
        } as NocQuestion;
        const control = new FormControl('');
        
        const result = service.addValidators(nocQuestion, control);
        
        control.setValue('abc');
        expect(control.hasError('minlength')).toBeTruthy();
        control.setValue('abcde');
        expect(control.hasError('minlength')).toBeFalsy();
      });

      it('should add maxLength validator when max is specified', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'Text',
            max: 10
          }
        } as NocQuestion;
        const control = new FormControl('');
        
        const result = service.addValidators(nocQuestion, control);
        
        control.setValue('short');
        expect(control.hasError('maxlength')).toBeFalsy();
        control.setValue('this is too long');
        expect(control.hasError('maxlength')).toBeTruthy();
      });

      it('should add all validators when min, max, and regular expression are specified', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'Text',
            regular_expression: '^[0-9]+$',
            min: 3,
            max: 6
          }
        } as NocQuestion;
        const control = new FormControl('');
        
        const result = service.addValidators(nocQuestion, control);
        
        // Test all validators together
        control.setValue('12');
        expect(control.hasError('minlength')).toBeTruthy();
        control.setValue('1234567');
        expect(control.hasError('maxlength')).toBeTruthy();
        control.setValue('abc');
        expect(control.hasError('pattern')).toBeTruthy();
        control.setValue('12345');
        expect(control.valid).toBeTruthy();
      });
    });

    describe('Email field type', () => {
      it('should add email validator', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'Email'
          }
        } as NocQuestion;
        const control = new FormControl('');
        
        const result = service.addValidators(nocQuestion, control);
        
        control.setValue('invalid-email');
        expect(control.hasError('email')).toBeTruthy();
        control.setValue('user@example.com');
        expect(control.hasError('email')).toBeFalsy();
      });
    });

    describe('Number field type', () => {
      it('should add number validator', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'Number'
          }
        } as NocQuestion;
        const control = new FormControl('');
        spyOn(NocValidators, 'numberValidator').and.returnValue(Validators.pattern(/^\d+$/));
        
        const result = service.addValidators(nocQuestion, control);
        
        expect(NocValidators.numberValidator).toHaveBeenCalled();
      });
    });

    describe('Postcode field type', () => {
      it('should add postcode validator', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'Postcode'
          }
        } as NocQuestion;
        const control = new FormControl('');
        spyOn(NocValidators, 'postcodeValidator').and.returnValue(Validators.pattern(/^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/));
        
        const result = service.addValidators(nocQuestion, control);
        
        expect(NocValidators.postcodeValidator).toHaveBeenCalled();
      });
    });

    describe('PhoneUK field type', () => {
      it('should add phoneUK validator', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'PhoneUK'
          }
        } as NocQuestion;
        const control = new FormControl('');
        spyOn(NocValidators, 'phoneUKValidator').and.returnValue(Validators.pattern(/^\+?44/));
        
        const result = service.addValidators(nocQuestion, control);
        
        expect(NocValidators.phoneUKValidator).toHaveBeenCalled();
      });
    });

    describe('Date field type', () => {
      it('should add date validator', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'Date'
          }
        } as NocQuestion;
        const control = new FormControl('');
        spyOn(NocValidators, 'dateValidator').and.returnValue(Validators.pattern(/^\d{4}-\d{2}-\d{2}$/));
        
        const result = service.addValidators(nocQuestion, control);
        
        expect(NocValidators.dateValidator).toHaveBeenCalled();
      });
    });

    describe('DateTime field type', () => {
      it('should add dateTime validator', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'DateTime'
          }
        } as NocQuestion;
        const control = new FormControl('');
        spyOn(NocValidators, 'dateTimeValidator').and.returnValue(Validators.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/));
        
        const result = service.addValidators(nocQuestion, control);
        
        expect(NocValidators.dateTimeValidator).toHaveBeenCalled();
      });
    });

    describe('Time field type', () => {
      it('should add time validator', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'Time'
          }
        } as NocQuestion;
        const control = new FormControl('');
        spyOn(NocValidators, 'timeValidator').and.returnValue(Validators.pattern(/^\d{2}:\d{2}:\d{2}$/));
        
        const result = service.addValidators(nocQuestion, control);
        
        expect(NocValidators.timeValidator).toHaveBeenCalled();
      });
    });

    describe('Edge cases', () => {
      it('should preserve existing validators on the control', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'Text'
          }
        } as NocQuestion;
        const existingValidator = Validators.required;
        const control = new FormControl('', existingValidator);
        
        const result = service.addValidators(nocQuestion, control);
        
        // Check that required validator is still applied
        control.setValue('');
        expect(control.hasError('required')).toBeTruthy();
        control.setValue('valid');
        expect(control.hasError('required')).toBeFalsy();
      });

      it('should handle nocQuestion with answer_field_type but no type property', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {}
        } as NocQuestion;
        const control = new FormControl('');
        const initialValidators = control.validator;
        
        const result = service.addValidators(nocQuestion, control);
        
        expect(result).toBe(control);
        expect(control.validator).toBe(initialValidators);
      });

      it('should handle unknown field type gracefully', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'UnknownType'
          }
        } as NocQuestion;
        const control = new FormControl('');
        
        const result = service.addValidators(nocQuestion, control);
        
        // Should not add any validators for unknown type
        control.setValue('any value');
        expect(control.valid).toBeTruthy();
      });

      it('should return the same control instance', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'Text'
          }
        } as NocQuestion;
        const control = new FormControl('');
        
        const result = service.addValidators(nocQuestion, control);
        
        expect(result).toBe(control);
      });

      it('should handle multiple validators being set correctly', () => {
        const nocQuestion: NocQuestion = {
          answer_field_type: {
            type: 'Text',
            min: 5,
            max: 10
          }
        } as NocQuestion;
        const control = new FormControl('', Validators.required);
        
        const result = service.addValidators(nocQuestion, control);
        
        // Test that all validators work together
        control.setValue('');
        expect(control.hasError('required')).toBeTruthy();
        control.setValue('abc');
        expect(control.hasError('minlength')).toBeTruthy();
        control.setValue('this is way too long');
        expect(control.hasError('maxlength')).toBeTruthy();
        control.setValue('perfect');
        expect(control.valid).toBeTruthy();
      });
    });
  });
});