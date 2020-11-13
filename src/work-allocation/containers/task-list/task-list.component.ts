import { Component, OnInit } from '@angular/core';
import { WorkAllocationTaskService } from 'src/work-allocation/services/work-allocation-task.service';

@Component({
  selector: 'exui-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private readonly workAllocationTaskService: WorkAllocationTaskService) {}

  public ngOnInit(): void {
    // Test the getTask
    this.workAllocationTaskService.getTask('123456').subscribe(task => console.log(task));
  }
}
