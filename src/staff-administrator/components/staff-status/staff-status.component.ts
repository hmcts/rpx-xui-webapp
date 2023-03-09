import { Component, Input } from '@angular/core';

@Component({
  selector: 'exui-staff-status',
  templateUrl: './staff-status.component.html',
  styleUrls: ['./staff-status.component.scss']
})
export class StaffStatusComponent {
  @Input() public status: boolean;
}
