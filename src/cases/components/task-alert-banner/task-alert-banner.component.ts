import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../work-allocation/models/tasks';

@Component({
    selector: 'exui-task-alert-banner',
    templateUrl: './task-alert-banner.component.html',
    styleUrls: ['./task-alert-banner.component.scss'],
    standalone: false
})
export class TaskAlertBannerComponent implements OnInit {
  @Input() public alertTitle;
  @Input() public alertMessage;
  @Input() public tasks: Task[] = [];
  public warnings: { warningCode: string; warningText: string; }[] = [];

  public ngOnInit(): void {
    // accumulate each task's warning_list, get each messages and remove dublicates then show those messages
    this.tasks.forEach((task) => {
      if (task.warning_list && task.warning_list.values && task.warning_list.values.length > 0) {
        task.warning_list.values.forEach((item) => this.warnings.push(item));
      }
    });
    this.warnings = this.warnings.filter((thing, i, arr) => {
      return arr.indexOf(arr.find((t) => t.warningCode === thing.warningCode)) === i;
    });
  }
}
