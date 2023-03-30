import { Component } from '@angular/core';
import { StaffAddEditFormService } from '../../services/staff-add-edit-form.service/staff-add-edit-form.service';

@Component({
  selector: 'exui-staff-user-details-container',
  templateUrl: './staff-user-details-container.component.html',
  styleUrls: ['./staff-user-details-container.component.scss'],
  providers: [StaffAddEditFormService]
})
export class StaffUserDetailsContainerComponent {}
