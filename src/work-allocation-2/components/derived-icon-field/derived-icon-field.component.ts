import { Component, Input } from '@angular/core';

import { Task } from '../../models/tasks';

@Component({
  selector: 'exui-derived-icon-field',
  templateUrl: './derived-icon-field.component.html'
})
export class DerivedIconFieldComponent {

  /**
   * The current task being examined
   */
  @Input() public task: Task;

  /**
   * The column to examine to create an alert for.
   */
  @Input() public sourceColumn: string;

  /**
   * The value to examine to create an alert for.
   */
  @Input() public matchValue: any;

  public get showIcon(): boolean {
    if (this.task && this.sourceColumn && this.task[this.sourceColumn] === this.matchValue) {
      return true;
    } else {
      return false;
    }
  }
}
