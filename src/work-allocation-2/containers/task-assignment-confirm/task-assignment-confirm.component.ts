import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskActionType } from 'src/work-allocation-2/enums';

@Component({
  selector: 'exui-task-assignment-confirm',
  templateUrl: './task-assignment-confirm.component.html'
})
export class TaskAssignmentConfirmComponent implements OnInit {

  public verb: TaskActionType;

  constructor(private readonly route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.verb = this.route.snapshot.data.verb as TaskActionType;
  }
}
