import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'nocError'
})
export class NocErrorPipe implements PipeTransform {

  public transform(value: ValidationErrors): string {

    if (!value) {
      return '';
    }
    const keys = Object.keys(value);

    if (!keys.length) {
      return '';
    }
    if (keys[0] ===  'required') {
      return 'This field is required.';
    } else if (keys[0] ===  'pattern') {
      return 'The data entered is not valid for this type of field.';
    } else if (keys[0] ===  'minlength') {
      return 'Required minimum length.';
    } else if (keys[0] ===  'maxlength') {
      return 'Exceeds maximum length.';
    } else if (keys[0] ===  'email') {
      return 'The email is invalid.';
    } else if (keys[0] ===  'number') {
      return 'The number is invalid.';
    } else if (keys[0] ===  'postcode') {
      return 'The postcode is invalid.';
    } else if (keys[0] ===  'phoneUK') {
      return 'The phone number is invalid.';
    } else if (keys[0] ===  'possibleIncorrectAnswer') {
      return '';
    } else if (keys[0] ===  'allAnswerEmpty') {
      return '';
    }
    return value[keys[0]];
  }

}
