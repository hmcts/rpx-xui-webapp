import { Component, Input } from '@angular/core';
import { AppUtils } from '../../../../app/app-utils';
import { PriorityLimits, TaskPriority } from '../../../enums';

@Component({
  selector: 'exui-priority-field-current',
  templateUrl: './priority-field-current.component.html'
})
export class PriorityFieldCurrentComponent {
  /**
   * The current date being examined
   */
  @Input() public date: Date;

  @Input() public majorPriority?: number;

  public get priority(): TaskPriority {
    if (this.majorPriority === PriorityLimits.High) {
      if (AppUtils.isPriorityDateTimePast(this.date)) {
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
