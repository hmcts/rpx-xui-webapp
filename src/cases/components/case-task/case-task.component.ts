import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../work-allocation-2/models/tasks';

@Component({
  selector: 'exui-case-task',
  templateUrl: './case-task.component.html',
  styleUrls: ['./case-task.component.scss']
})
export class CaseTaskComponent implements OnInit {
  ngOnInit(): void {
  }
  @Input() public task: Task;
}
