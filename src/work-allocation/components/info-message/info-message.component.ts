import {Component, Input} from '@angular/core';

import {InfoMessage, InfoMessageType} from './../../enums';

@Component({
  selector: 'exui-info-message',
  templateUrl: './info-message.component.html',
})
export class InfoMessageComponent {

  /**
   * The type of message to display. ie. Success, Warning or Information message.
   */
  @Input() public type: InfoMessageType;

  @Input() public message: InfoMessage;

  public infoMessageType = InfoMessageType;
}
