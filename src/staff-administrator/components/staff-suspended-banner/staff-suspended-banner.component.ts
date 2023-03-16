import { Component, Input } from '@angular/core';

@Component({
  selector: 'exui-staff-suspended-banner',
  templateUrl: './staff-suspended-banner.component.html',
  styleUrls: ['./staff-suspended-banner.component.scss']
})
export class StaffSuspendedBannerComponent {
  @Input() public messageType: 'suspended' |  'error';

  constructor() { }
}
