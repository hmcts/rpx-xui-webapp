import { Component, Input } from '@angular/core';

import { ErrorMessage } from '../../models';

@Component({
  selector: 'exui-error-message',
  templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent {
  @Input() public error: ErrorMessage;
}
