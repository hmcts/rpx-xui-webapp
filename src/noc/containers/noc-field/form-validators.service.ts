import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NocQuestion } from '../../models';
import { NocValidators } from './utils/noc-validators';

@Injectable()
export class FormValidatorsService {
  private static readonly REGEX_WHITESPACES: string = '^[^ ]+(?:\\s+[^ ]+)*$';

  public addValidators(nocQuestion: NocQuestion, control: FormControl): FormControl {
    if (nocQuestion.answer_field_type.type) {
      const validators = [];
      if (nocQuestion.answer_field_type.type === 'Text') {
        if (nocQuestion.answer_field_type.regular_expression) {
          validators.push(Validators.pattern(nocQuestion.answer_field_type.regular_expression));
        } else {
          validators.push(Validators.pattern(FormValidatorsService.REGEX_WHITESPACES));
        }
        if (nocQuestion.answer_field_type.min) {
          validators.push(Validators.minLength(nocQuestion.answer_field_type.min));
        }
        if (nocQuestion.answer_field_type.max) {
          validators.push(Validators.maxLength(nocQuestion.answer_field_type.max));
        }
      } else if (nocQuestion.answer_field_type.type === 'Email') {
        validators.push(Validators.email);
      } else if (nocQuestion.answer_field_type.type === 'Number') {
        validators.push(NocValidators.numberValidator());
      } else if (nocQuestion.answer_field_type.type === 'Postcode') {
        validators.push(NocValidators.postcodeValidator());
      } else if (nocQuestion.answer_field_type.type === 'PhoneUK') {
        validators.push(NocValidators.phoneUKValidator());
      } else if (nocQuestion.answer_field_type.type === 'Date') {
        validators.push(NocValidators.dateValidator());
      } else if (nocQuestion.answer_field_type.type === 'DateTime') {
        validators.push(NocValidators.dateTimeValidator());
      } else if (nocQuestion.answer_field_type.type === 'Time') {
        validators.push(NocValidators.timeValidator());
      }
      if (control.validator) {
        validators.push(control.validator);
      }
      control.setValidators(validators);
    }
    return control;
  }
}
