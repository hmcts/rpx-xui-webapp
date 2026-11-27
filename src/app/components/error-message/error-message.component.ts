import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { ErrorMessage } from '../../models';

@Component({
  standalone: false,
  selector: 'exui-error-message',
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input() public error: ErrorMessage;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  public focusField(event: Event, fieldId: string): void {
    event.preventDefault();
    const field = fieldId ? this.document.getElementById(fieldId) : null;
    if (!field) {
      return;
    }
    field.scrollIntoView();
    field.focus();
  }
}
