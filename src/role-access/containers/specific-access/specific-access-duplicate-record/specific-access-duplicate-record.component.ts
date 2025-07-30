import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkAllocationTaskService } from '../../../../work-allocation/services';
import { ACTION } from '../../../../work-allocation/services/work-allocation-task.service';
import { SpecificAccessNavigation } from '../../../models';

@Component({
    selector: 'exui-specific-access-duplicate-record',
    templateUrl: './specific-access-duplicate-record.component.html',
    styleUrls: ['./specific-access-duplicate-record.component.scss'],
    standalone: false
})
export class SpecificAccessDuplicateRecordComponent implements OnInit {
  @Input() public navEvent: SpecificAccessNavigation;
  private taskId: string;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly workAllocationTaskService: WorkAllocationTaskService) {}

  public ngOnInit() {
    this.taskId = (this.activatedRoute.snapshot.data.taskAndRole && this.activatedRoute.snapshot.data.taskAndRole.task && this.activatedRoute.snapshot.data.taskAndRole.task.task) &&
      this.activatedRoute.snapshot.data.taskAndRole.task.task.id;

    if (this.taskId) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.workAllocationTaskService.performActionOnTask(this.taskId, ACTION.CANCEL, false).subscribe(() => {});
    }
  }
}
