import { Component, OnInit } from '@angular/core';

import { Caseworker } from './../../models/dtos/task';

@Component({
  selector: 'exui-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {
  public ngOnInit(): void {
    console.log('TaskManagerComponent');
  }

  public onCaseworkerChanged(caseworker: Caseworker): void {
    console.log('onCaseworkerChanged', caseworker);
  }
}
