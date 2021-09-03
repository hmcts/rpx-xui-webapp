import { Component, Input } from '@angular/core';

import { TaskPriority } from '../../enums';

@Component({
  selector: 'exui-priority-field',
  templateUrl: './priority-field.component.html'
})
export class PriorityFieldComponent {

  /**
   * The current date being examined
   */
  @Input() public dueDate: Date;

  public get priority(): TaskPriority {
    const d = new Date();
    if (this.dueDate) {
      const isToday = this.dueDate.toDateString() === d.toDateString();
      if (isToday) {
        return TaskPriority.MEDIUM;
      } else {
        return this.dueDate < d ? TaskPriority.HIGH : TaskPriority.LOW
      }
    }
  }
}
