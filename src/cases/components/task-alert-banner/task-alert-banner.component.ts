import { Component } from '@angular/core';

@Component({
  selector: 'exui-task-alert-banner',
  templateUrl: './task-alert-banner.component.html',
  styleUrls: ['./task-alert-banner.component.scss']
})
export class TaskAlertBannerComponent {
  public alertTitle = 'Task alert';
  public alertMessage = 'An application is pending a decision. Consider if this application has an impact on any other tasks you might wish to complete.';
}
