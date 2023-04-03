import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { InfoMessage } from '../../../app/shared/enums/info-message';
import { InfoMessageType } from '../../../role-access/models/enums';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { StaffAddEditUserFormId } from '../../models/staff-add-edit-user-form-id.enum';
import { StaffUser } from '../../models/staff-user.model';
import { StaffAddEditFormService } from '../../services/staff-add-edit-form/staff-add-edit-form.service';
import { StaffDataAccessService } from '../../services/staff-data-access/staff-data-access.service';

@Component({
  selector: 'exui-staff-user-details',
  templateUrl: './staff-user-details.component.html',
  styleUrls: ['./staff-user-details.component.scss']
})
export class StaffUserDetailsComponent {
  public userDetails: StaffUser;
  public showAction: boolean = false;
  public loading = false;
  public status: 'success' | 'warning';
  public title: string = '';
  public message: string = '';

  constructor(
    private route: ActivatedRoute,
    private readonly router: Router,
    private staffDataAccessService: StaffDataAccessService,
    private readonly messageService: InfoMessageCommService,
    private readonly staffAddEditFormService: StaffAddEditFormService
  ) {
    const userDetailsFromSnapshot = this.route.snapshot.data.staffUserDetails;

    if (!userDetailsFromSnapshot) {
      this.router.navigateByUrl('/staff');
    } else {
      this.userDetails = StaffUser.from(userDetailsFromSnapshot);
    }
  }

  public updateUserStatus(): void {
    if (!this.loading && !this.userDetails.suspended) {
      this.loading = true;
      const staffUser = new StaffUser();
      Object.assign(staffUser, this.userDetails);
      staffUser.suspended = true;
      this.staffDataAccessService.updateUser(staffUser).pipe(
        finalize(() => {
          this.loading = false;
          window.scrollTo(0, 0);
        })
      )
        .subscribe(
          () => {
            this.status = InfoMessageType.SUCCESS;
            this.title = 'User suspended';
            this.message = InfoMessage.SUSPEND_USER_SUCCESS;
            this.userDetails.suspended = staffUser.suspended;
          },
          (err) => {
            if (err.status === 401 || err.status.toString().startsWith('5')) {
              this.router.navigateByUrl('/service-down');
            } else {
              this.status = 'warning';
              this.message = InfoMessage.SUSPEND_USER_ERROR;
            }
          }
        );
    }
  }

  public onUpdateUser() {
    this.staffAddEditFormService.patchFormValues(this.userDetails);
    this.router.navigateByUrl(`/staff/user-details/${this.route.snapshot.params.id}/update`);
  }

  public onCopyUser() {
    this.staffAddEditFormService.patchFormValues({
      ...this.userDetails,
      first_name: '',
      last_name: '',
      email_id: ''
    } as StaffUser);
    this.router.navigateByUrl(`/staff/user-details/${this.route.snapshot.params.id}/copy`);
  }
}
