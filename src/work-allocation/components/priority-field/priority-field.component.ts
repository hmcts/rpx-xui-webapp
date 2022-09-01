import { Component, Input } from '@angular/core';
import { TaskPriority, PriorityLimits } from '../../enums';

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

    const dCount = this.daysBetween(this.date, new Date());
    if (this.majorPriority <= PriorityLimits.Urgent) {
      return TaskPriority.URGENT;
    } else if (this.majorPriority < PriorityLimits.High) {
      return TaskPriority.HIGH;
    } else if (this.majorPriority === PriorityLimits.High) {
      if (dCount < 0) {
        return TaskPriority.HIGH
      } else if (dCount === 0) {
        return TaskPriority.MEDIUM
      }
    }
    return TaskPriority.LOW;
  }

  // returns the number of days that d1 is after d2
  private daysBetween(d1: Date, d2: Date): number {
    if (!(d1 && d2)) {
      return 0;
    }
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
    return Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));
  }
}
