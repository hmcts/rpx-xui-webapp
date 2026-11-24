import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { StaffUserStatus } from '../../../models/staff-user-status.enum';

@Component({
  standalone: false,
  selector: 'exui-staff-status',
  templateUrl: './staff-status.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./staff-status.component.scss'],
})
export class StaffStatusComponent {
  @Input() public status: StaffUserStatus;
}
