import {Component, Input, OnInit} from '@angular/core';

import {InfoMessage, InfoMessageType} from './../../enums';

@Component({
  selector: 'exui-info-message',
  templateUrl: './info-message.component.html',
})
export class InfoMessageComponent implements OnInit {

  /**
   * The type of message to display. ie. Success, Warning or Information message.
   */
  @Input() public infoMessageType: InfoMessageType;

  @Input() public infoMessage: InfoMessage;

  public infoMessageType = InfoMessageType;

  constructor() {}

  public ngOnInit(): void {
  }
}
