import { Input } from '@angular/core';
import { AbstractFormFieldComponent } from './abstract-form-field.component';

export abstract class AbstractFieldWriteComponent extends AbstractFormFieldComponent {

  @Input()
  public idPrefix = '';

  public id() {
    return this.idPrefix + this.questionField.question_id;
  }
}
