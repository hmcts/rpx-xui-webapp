import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Caseworker } from '../../../work-allocation-2/models/dtos';
import { Task } from '../../../work-allocation-2/models/tasks';
import { WorkAllocationCaseService } from '../../../work-allocation-2/services';

@Component({
  selector: 'exui-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss']
})
export class TasksContainerComponent implements OnInit {
  public tasks: Task[] = [];
  public caseworkers: Caseworker[] = [];
  public warningIncluded: boolean;

  constructor(private readonly waCaseService: WorkAllocationCaseService, private readonly route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.tasks = this.route.snapshot.data.tasks.tasks as Task[];
    this.caseworkers = this.route.snapshot.data.tasks.caseworkers as Caseworker[];
    this.warningIncluded = this.tasks.some(task => task.warnings);
  }

  public onTaskRefreshRequired(): void {
    this.waCaseService.getTasksByCaseId(this.tasks[0].case_id).pipe(first()).subscribe(tasks => {
      this.tasks = tasks;
      this.warningIncluded = this.tasks.some(task => task.warnings);
    })
  }
}
