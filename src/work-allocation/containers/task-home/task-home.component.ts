import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'exui-task-home',
  templateUrl: 'task-home.component.html',
  styleUrls: ['task-home.component.scss']
})
export class TaskHomeComponent implements OnInit, OnDestroy {

  constructor() {
  }

  public ngOnInit(): void {
    console.log('onInitTaskHome');
  }

  public ngOnDestroy(): void {
  }
}
