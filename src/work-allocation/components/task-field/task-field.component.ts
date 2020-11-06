import { Component, Input, ViewEncapsulation } from '@angular/core';

import { TaskFieldType } from './../../enums';
import { Task, TaskFieldConfig } from './../../models/tasks';

@Component({
  selector: 'exui-task-field',
  templateUrl: './task-field.component.html',
  styleUrls: ['task-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskFieldComponent { //implements OnChanges {
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

  // // The value, which is set in handleInputChanges whenever there is
  // // a change to either the config or the task.
  // private pValue: any;
  // public get value(): any {
  //   return this.pValue;
  // }

  // // Catch any changes to any of the Input() properties.
  // public ngOnChanges(): void {
  //   this.handleInputChanges();
  // }


  // // Set up the value, based on the task and the config.
  // private handleInputChanges(): void {
  //   // If we don't have a config, skip out of here.
  //   if (!this.config) {
  //     return;
  //   }
  //   if (this.task) {
  //     this.pValue = this.task[this.config.name];
  //   } else {
  //     this.pValue = undefined;
  //   }
  // }
}
