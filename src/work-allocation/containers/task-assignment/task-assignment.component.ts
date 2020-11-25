import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'exui-task-assignment',
    templateUrl: 'task-assignment.component.html',
    styleUrls: ['task-home.component.scss']
  })

export class TaskAssignmentComponent implements OnInit {
    public ngOnInit(): void {
        console.log('TaskAssignmentComponent');
    }
}
