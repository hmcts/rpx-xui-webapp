import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StaffAddEditUserFormId } from '../../components/staff-add-edit-user-form-id.enum';
import { StaffUser } from '../../models/staff-user.model';
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
  public suspendedStatus: 'suspended' | 'restored' | 'error';

  constructor(
    private route: ActivatedRoute,
    private readonly router: Router,
    private staffDataAccessService: StaffDataAccessService
  ) {
    this.userDetails = this.route.snapshot.data.staffUserDetails.userDetails;
    if (!this.userDetails) {
      this.router.navigateByUrl('/staff');
    }
  }

  public updateUserStatus(): void {
    if (!this.loading) {
      this.loading = true;
      const staffUser = new StaffUser();
      Object.assign(staffUser, this.userDetails);
      staffUser.suspended = this.userDetails.suspended === 'true' ? 'false' : 'true';
      this.staffDataAccessService.updateUser(staffUser).pipe(
        finalize(() => {
          this.loading = false;
          window.scrollTo(0, 0);
        })
      )
        .subscribe(
          () => {
            this.suspendedStatus = staffUser.suspended === 'true' ? 'suspended' : 'restored';
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

  public onUpdateUser() {
    this.setDataForGenericFilterAndNavigate(StaffAddEditUserFormId.UpdateUser,
      `/staff/user-details/${this.route.snapshot.params.id}/update`);
  }

  public onCopyUser() {
    this.userDetails.first_name = '';
    this.userDetails.last_name = '';
    this.userDetails.email_id = '';

    this.setDataForGenericFilterAndNavigate(StaffAddEditUserFormId.CopyUser,
      `/staff/user-details/${this.route.snapshot.params.id}/copy`);
  }

  public setDataForGenericFilterAndNavigate(filterId: string, destination: string) {
    const primaryLocation = this.userDetails.base_location.find(item => item.is_primary);
    const formValues = {
      id: filterId,
      fields: [
        {
          name: 'first_name',
          value: [this.userDetails.first_name]
        },
        {
          name: 'last_name',
          value: [this.userDetails.last_name]
        },
        {
          name: 'email_id',
          value: [this.userDetails.email_id]
        },
        {
          name: 'user-services',
          value: this.userDetails.work_area.map(item => item.service_code)
        },
        {
          name: 'region_id',
          value: [this.userDetails.region_id]
        },
        {
          name: 'primaryLocation',
          value: [{ epimms_id: primaryLocation.location_id, site_name: primaryLocation.location }]
        },
        {
          name: 'additionalLocations',
          value: this.userDetails.base_location.filter(item => !item.is_primary).map(location => {
            return { epimms_id: location.location_id, site_name: location.location };
          })
        },
        {
          name: 'user_type',
          value: [this.userDetails.user_type]
        },
        {
          name: 'roles',
          value: [
            this.userDetails.case_allocator ? 'case_allocator' : false,
            this.userDetails.task_supervisor ? 'task_supervisor' : false,
            this.userDetails.staff_admin ? 'staff_admin' : false
          ].filter(item => item)
        },
        {
          name: 'jobTitle',
          value: this.userDetails.role.map(item => Number(item.role_id))
        },
        {
          name: 'user-skills',
          value: this.userDetails.skills.map(item => item.skill_id)
        }
      ]
    };

    sessionStorage.setItem(filterId, JSON.stringify(formValues));
    this.router.navigateByUrl(destination);
  }
}
