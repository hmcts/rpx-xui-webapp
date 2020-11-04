import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'exui-task-manager',
    templateUrl: './taskManager.component.html',
    styleUrls: ['taskManager.component.scss']
  })
  export class TaskManagerComponent implements OnInit {
  ngOnInit(): void {
    console.log('TaskManagerComponent');
  }

  }
