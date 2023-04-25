import { Component, Input } from '@angular/core';

import { TaskPriority } from '../../../enums';

@Component({
  selector: 'exui-priority-field-legacy',
  templateUrl: './priority-field-legacy.component.html'
})
export class PriorityFieldLegacyComponent {
  /**
   * The current date being examined
   */
  @Input() public dueDate: Date;

  public get priority(): TaskPriority {
    const today = new Date();
    if (this.dueDate) {
      const isToday = this.dueDate.toDateString() === today.toDateString();
      if (isToday) {
        return TaskPriority.MEDIUM;
      }
      return this.dueDate < today ? TaskPriority.HIGH : TaskPriority.LOW;
    }
    // in response to linting issue, returning undefined
    return undefined;
  }
}
