import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ErrorMessage } from '../../models';

@Component({
  standalone: false,
  selector: 'exui-error-message',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input() public error: ErrorMessage;
}
