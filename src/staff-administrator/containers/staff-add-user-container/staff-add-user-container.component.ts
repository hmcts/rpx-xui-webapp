import { Component } from '@angular/core';
import { StaffAddEditFormService } from '../../services/staff-add-edit-form.service/staff-add-edit-form.service';

@Component({
  selector: 'exui-staff-add-user-container',
  templateUrl: './staff-add-user-container.component.html',
  styleUrls: ['./staff-add-user-container.component.scss'],
  providers: [StaffAddEditFormService]
})
export class StaffAddUserContainerComponent {}
