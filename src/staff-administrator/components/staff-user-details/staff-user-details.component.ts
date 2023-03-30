import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { InfoMessage } from '../../../app/shared/enums/info-message';
import { InformationMessage } from '../../../app/shared/models';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { InfoMessageType } from '../../../role-access/models/enums';
import { StaffUser } from '../../models/staff-user.model';
import { StaffAddEditFormService } from '../../services/staff-add-edit-form.service/staff-add-edit-form.service';
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
  public suspendedStatus: 'suspended' | 'error';

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
            this.suspendedStatus = 'suspended';
            this.userDetails.suspended = staffUser.suspended;
          },
          (err) => {
            if (err.status === 401 || err.status.toString().startsWith('5')) {
              this.router.navigateByUrl('/service-down');
            } else {
              this.suspendedStatus = 'error';
            }
          }
        );
    }
  }

  public resendInvite(): void {
    if (!this.loading) {
      this.loading = true;
      const staffUser = new StaffUser();
      Object.assign(staffUser, this.userDetails);
      staffUser.is_resend_invite = true;
      this.staffDataAccessService.updateUser(staffUser).pipe(
        finalize(() => {
          this.loading = false;
          window.scrollTo(0, 0);
        })
      )
      .subscribe((success) => {
        this.messageService.nextMessage({
          message: InfoMessage.ACTIVATION_EMAIL_SENT,
          type: InfoMessageType.SUCCESS
        } as InformationMessage);
        },
        (err) => {
          this.messageService.nextMessage({
            message: InfoMessage.ACTIVATION_EMAIL_ERROR,
            type: InfoMessageType.WARNING
          } as InformationMessage);
        }
      );
    }
  }

  public onUpdateUser() {
    this.staffAddEditFormService.formGroup.patchValue({
      ...this.userDetails
    });
    this.router.navigateByUrl(`/staff/user-details/${this.route.snapshot.params.id}/update`);
  }

  public onCopyUser() {
    this.staffAddEditFormService.formGroup.patchValue({
      ...this.userDetails,
      first_name: '',
      last_name: '',
      email_id: ''
    });
    this.router.navigateByUrl(`/staff/user-details/${this.route.snapshot.params.id}/copy`);
  }
}
