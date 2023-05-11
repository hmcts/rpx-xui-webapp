import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StaffAddEditFormService } from '../../services/staff-add-edit-form/staff-add-edit-form.service';

@Component({
  selector: 'exui-staff-add-edit-user-container',
  templateUrl: './staff-add-edit-user-container.component.html',
  styleUrls: ['./staff-add-edit-user-container.component.scss'],
  providers: [StaffAddEditFormService]
})
export class StaffAddEditUserContainerComponent {
  constructor(
    private readonly router: Router,
    private readonly staffAddEditFormService: StaffAddEditFormService
  ) {
    this.setValuesToFormFromState();
  }

  private setValuesToFormFromState() {
    const formValuesFromState = this.router.getCurrentNavigation()?.extras?.state?.formValues;
    if (formValuesFromState) {
      this.staffAddEditFormService.patchFormValues(formValuesFromState);
    }
  }
}
