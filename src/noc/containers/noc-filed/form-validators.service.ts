import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NocQuestion } from '../../models';

@Injectable()
export class FormValidatorsService {
  private static readonly REGEX_WHITESPACES: string = '^[^ ]+(?:\\s+[^ ]+)*$';

  public addValidators(nocQuestion: NocQuestion, control: FormControl): FormControl {
    if (nocQuestion.answer_field_type.type) {
      const validators = [Validators.required];
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
      }
      if (control.validator) {
        validators.push(control.validator);
      }
      control.setValidators(validators);
    }
    return control;
  }
}
