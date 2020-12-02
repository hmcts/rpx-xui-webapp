import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import { TaskFieldType } from './../../enums';
import { Task, TaskFieldConfig } from './../../models/tasks';

@Component({
  selector: 'exui-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['info-message.component.scss'],
})
export class InfoMessageComponent implements OnInit {

  /**
   * The type of message to display.
   */
  @Input() public messageType; // Needs a type

  @Input() public message: string;

  constructor() {}

  public ngOnInit(): void {
    console.log('message type');
    console.log(this.messageType);
    console.log(this.message);
  }
  /**
   * The task, which contains the value we want to render in this
   * component. Which value we want is determined by the config.
   */
  // @Input() public task: Task;

  // This is here for the ngSwitch in the template so we don't have
  // hard-coded strings floating around the place.
  // protected fieldType = TaskFieldType;
}
