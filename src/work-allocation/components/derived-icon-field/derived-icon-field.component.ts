import { Component, Input } from '@angular/core';

import { Task } from '../../models/tasks';

@Component({
  standalone: false,
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
   * The column to get values to create alert messages.
   */
  @Input() public sourceValueColumn?: string;

  /**
   * The value to examine to create an alert for.
   */
  @Input() public matchValue: any;

  public message: string;
  public get showIcon(): boolean {
    if (!this.task || !this.sourceColumn || this.task[this.sourceColumn] !== this.matchValue || !this.task.warning_list) {
      return false;
    }

    const distinctMessages = this.task.warning_list.values.filter((thing, i, arr) => {
      return arr.indexOf(arr.find((t) => t.code === thing.code)) === i;
    });

    if (!distinctMessages || distinctMessages.length === 0) {
      return false;
    }

    // if one message left after dublicates removed, it should show that message.Otherwise it should show general message
    if (distinctMessages.length === 1) {
      this.message = distinctMessages[0].warningText;
    } else {
      this.message = 'There are warnings on this task';
    }
    return true;
  }
}
