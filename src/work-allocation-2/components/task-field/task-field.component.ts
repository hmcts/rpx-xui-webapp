import { Component, Input, ViewEncapsulation } from '@angular/core';

import { TaskFieldType } from './../../enums';
import { Task, TaskFieldConfig } from '.././../models/tasks';

@Component({
  selector: 'exui-task-field',
  templateUrl: './task-field.component.html',
  styleUrls: ['task-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskFieldComponent {
  /**
   * The configuration for this particular field, which is needed
   * to obtain the correct value from the task and determine how it
   * should be rendered.
   */
  @Input() public config: TaskFieldConfig;

  /**
   * The task, which contains the value we want to render in this
   * component. Which value we want is determined by the config.
   */
  @Input() public task: Task;

  // This is here for the ngSwitch in the template so we don't have
  // hard-coded strings floating around the place.
  protected fieldType = TaskFieldType;

  /**
   * Convert a string, number, or Date to date object.
   */
  public toDate(value: string | number | Date): Date {
    if (value) {
      const d = new Date(value);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  }


}
