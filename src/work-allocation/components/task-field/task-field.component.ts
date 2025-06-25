import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { AppUtils } from '../../../app/app-utils';
import { UserInfo, UserRole } from '../../../app/models';
import { SessionStorageService } from '../../../app/services';
import { FieldType, PriorityLimits } from '../../enums';
import { FieldConfig } from '../../models/common';
import { Task } from '../../models/tasks';

@Component({
  selector: 'exui-task-field',
  templateUrl: './task-field.component.html',
  styleUrls: ['task-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskFieldComponent implements OnInit {
  /**
   * The configuration for this particular field, which is needed
   * to obtain the correct value from the task and determine how it
   * should be rendered.
   */
  @Input() public config: FieldConfig;

  /**
   * The task, which contains the value we want to render in this
   * component. Which value we want is determined by the config.
   */
  @Input() public task: Task;

  public isUserJudicial: boolean;
  public isTaskUrgent: boolean;

  // This is here for the ngSwitch in the template so we don't have
  // hard-coded strings floating around the place.
  protected fieldType = FieldType;

  constructor(private readonly sessionStorageService: SessionStorageService) { }

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

  ngOnInit(): void {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      this.isUserJudicial = AppUtils.getUserRole(userInfo.roles) === UserRole.Judicial;
    }
    if (this.task && this.task.major_priority) {
      this.isTaskUrgent = this.task.major_priority <= PriorityLimits.Urgent ? true : false;
    }
  }
}
