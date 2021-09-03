import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../work-allocation-2/models/tasks';

@Component({
  selector: 'exui-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss']
})
export class TasksContainerComponent implements OnInit {
  public tasks: Task[] = [];
  public warningIncluded: boolean;

  constructor(private readonly route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.tasks = this.route.snapshot.data.tasks as Task[];
    this.warningIncluded = this.tasks.some(task => task.warnings);
  }

}
