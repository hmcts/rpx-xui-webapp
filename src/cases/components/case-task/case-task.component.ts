import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from '../../../app/models';
import { SessionStorageService } from '../../../app/services';
import { Task } from '../../../work-allocation-2/models/tasks';

@Component({
  selector: 'exui-case-task',
  templateUrl: './case-task.component.html',
  styleUrls: ['./case-task.component.scss']
})
export class CaseTaskComponent implements OnInit {
  @Input() public task: Task;
  constructor(private readonly sessionStorageService: SessionStorageService) {}

  public ngOnInit(): void {
  }
  public getAssigneeName(task: Task): string {
    return task.assigneeName ? task.assigneeName : 'Unassigned';
  }
  public isTaskAssignedToCurrentUser(task: Task): boolean {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const userId = userInfo.id ? userInfo.id : userInfo.uid;
      return task.assignee && task.assignee === userId;
    }
    return false;
  }
}
