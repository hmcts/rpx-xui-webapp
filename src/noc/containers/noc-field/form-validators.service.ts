import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NocQuestion } from '../../models';
import { NocValidators } from './utils/noc-validators';

@Injectable()
export class FormValidatorsService {
  private static readonly REGEX_WHITESPACES: string = '^[^ ]+(?:\\s+[^ ]+)*$';

  public addValidators(nocQuestion: NocQuestion, control: FormControl): FormControl {
    if (nocQuestion.answerFieldType.type) {
      const validators = [];
      if (nocQuestion.answerFieldType.type === 'Text') {
        if (nocQuestion.answerFieldType.regularExpression) {
          validators.push(Validators.pattern(nocQuestion.answerFieldType.regularExpression));
        } else {
          validators.push(Validators.pattern(FormValidatorsService.REGEX_WHITESPACES));
        }
        if (nocQuestion.answerFieldType.min) {
          validators.push(Validators.minLength(nocQuestion.answerFieldType.min));
        }
        if (nocQuestion.answerFieldType.max) {
          validators.push(Validators.maxLength(nocQuestion.answerFieldType.max));
        }
      } else if (nocQuestion.answerFieldType.type === 'Email') {
        validators.push(Validators.email);
      } else if (nocQuestion.answerFieldType.type === 'Number') {
        validators.push(NocValidators.numberValidator());
      } else if (nocQuestion.answerFieldType.type === 'Postcode') {
        validators.push(NocValidators.postcodeValidator());
      } else if (nocQuestion.answerFieldType.type === 'PhoneUK') {
        validators.push(NocValidators.phoneUKValidator());
      } else if (nocQuestion.answerFieldType.type === 'Date') {
        validators.push(NocValidators.dateValidator());
      } else if (nocQuestion.answerFieldType.type === 'DateTime') {
        validators.push(NocValidators.dateTimeValidator());
      } else if (nocQuestion.answerFieldType.type === 'Time') {
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
