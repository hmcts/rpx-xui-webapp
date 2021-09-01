import { Component, Input } from '@angular/core';

@Component({
  selector: 'exui-task-alert-banner',
  templateUrl: './task-alert-banner.component.html',
  styleUrls: ['./task-alert-banner.component.scss']
})
export class TaskAlertBannerComponent {
  @Input() public alertTitle;
  @Input() public alertMessage;
}
