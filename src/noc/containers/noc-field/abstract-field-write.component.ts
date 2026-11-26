import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { AbstractFormFieldComponent } from './abstract-form-field.component';

@Component({
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '',
})
export abstract class AbstractFieldWriteComponent extends AbstractFormFieldComponent {
  @Input()
  public idPrefix = '';

  public id() {
    return this.idPrefix + this.questionField.question_id;
  }
}
