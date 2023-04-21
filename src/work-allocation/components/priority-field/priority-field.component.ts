import { Component, Input } from '@angular/core';
import { PriorityLimits, TaskPriority } from '../../enums';
import { AppUtils } from '../../../app/app-utils';

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
    if (this.majorPriority === PriorityLimits.High) {
      if(AppUtils.isPriorityDateTimePast(this.date)) {
        return TaskPriority.HIGH;
      }
      return AppUtils.isPriorityDateTimeInNext24Hours(this.date) ? TaskPriority.MEDIUM : TaskPriority.LOW;
    }
    if (this.majorPriority <= PriorityLimits.Urgent) {
      return TaskPriority.URGENT;
    }
    if (this.majorPriority > PriorityLimits.High) {
      return TaskPriority.LOW;
    }
    return TaskPriority.HIGH;
  }
}
