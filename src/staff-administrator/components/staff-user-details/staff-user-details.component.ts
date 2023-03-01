import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StaffUser } from '../../../staff-administrator/models/staff-user.model';
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
  public FILTER_ID = 'staff-update-user';

  constructor(
    private route: ActivatedRoute,
    private readonly router: Router,
    private staffDataAccessService: StaffDataAccessService
  ) {
    const routerStateUserDetails = router.getCurrentNavigation().extras.state &&
      router.getCurrentNavigation().extras.state.user;

    if (routerStateUserDetails) {
      this.userDetails = { ...routerStateUserDetails };
      // this.userDetails = this.route.snapshot.data.staffUserDetails.userDetails[0];
    } else {
      this.router.navigateByUrl('/staff');
    }
  }

  public updateUserStatus(): void {
    if (!this.loading) {
      this.loading = true;
      this.staffDataAccessService.updateUserStatus(this.userDetails).pipe(
        finalize(() => this.loading = false),
      )
        .subscribe(
          (res) => {
            this.userDetails.suspended = res.suspended;
            window.scrollTo(0, 0);
            this.suspendedStatus = res.suspended ? 'suspended' : 'restored';
          },
          (err) => {
            if (err.status === 401 || err.status.toString().startsWith('5')) {
              this.router.navigateByUrl('/service-down');
            } else {
              window.scrollTo(0, 0);
              this.suspendedStatus = 'error';
            }
          }
        );
    }
  }

  public copy(): void {
    const url = '/staff/add-user';
    this.router.navigate([url], { state: { user: this.userDetails } });
  }

  public setDataAndNavigateToUpdateUser() {
    const primaryLocation = this.userDetails.base_locations.find(item => item.is_primary);
    const formValues = {
      id: this.FILTER_ID,
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
          value: this.userDetails.services.map(item => item.service_code)
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
          value: this.userDetails.base_locations.filter(item => !item.is_primary).map(location => {
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
            this.userDetails.task_supervisor ? 'task-supervisor' : false,
            this.userDetails.staff_admin ? 'staff_admin' : false
          ].filter(item => item)
        },
        {
          name: 'jobTitle',
          value: this.userDetails.roles.map(item => Number(item.role_id))
        },
        {
          name: 'user-skills',
          value: this.userDetails.skills.map(item => item.skill_id)
        }
      ]
    };

    sessionStorage.setItem(this.FILTER_ID, JSON.stringify(formValues));
    this.router.navigateByUrl('/staff/update-user',
      { state: {userDetails: this.userDetails} }
    );
  }
}
