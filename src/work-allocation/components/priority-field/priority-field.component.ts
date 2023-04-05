import { Component, Input } from '@angular/core';
import { PriorityLimits, TaskPriority } from '../../enums';

@Component({
  selector: 'exui-priority-field',
  templateUrl: './priority-field.component.html'
})
export class PriorityFieldComponent {

  /**
   * The current date being examined
   */
  @Input() public date: Date;

  @Input() public majorPriority?: number;

  public get priority(): TaskPriority {
    const date = this.date ? this.date : new Date()
    return this.getPriorityLabel(this.majorPriority, date);
  }

  private getInterval(d1:Date, d2:Date): number {
    return (d2.getTime() - d1.getTime()) / 1000 * 60 * 60 * 24;
  }

  private getPriorityLabel(majorPriority: number, priorityDate: Date): TaskPriority {
    const interval = this.getInterval(new Date(), priorityDate);
    if (majorPriority <= PriorityLimits.Urgent) {
      return TaskPriority.URGENT;
    } else if (majorPriority < PriorityLimits.High) {
      return TaskPriority.HIGH;
    }
    else if ( majorPriority === PriorityLimits.High) {
      if (interval < 0) {
        return TaskPriority.HIGH}
      } else if ((interval >= 0) && (interval < 1)) {
        return TaskPriority.MEDIUM;
      }
    return TaskPriority.LOW;
  }
}
