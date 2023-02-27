import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceInformation, StaffUser, WorkArea } from '../../models/staff-user.model';
import { StaffDataAccessService } from '../../services/staff-data-access/staff-data-access.service';

@Component({
  selector: 'exui-staff-user-details',
  templateUrl: './staff-user-details.component.html',
  styleUrls: ['./staff-user-details.component.scss']
})
export class StaffUserDetailsComponent implements OnInit {
  public userDetails: StaffUser;
  public showAction: boolean = false;
  public loading = false;
  public suspendedStatus: 'suspended' | 'restored' | 'error';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private staffDataAccessService: StaffDataAccessService) {
   }

   public ngOnInit(): void {
    this.userDetails = this.route.snapshot.data.staffUserDetails.userDetails[0];
   }

   public updateUserStatus(): void {
    const user = this.userDetails;
    const services = this.userDetails.services;
    const roles = this.userDetails.roles;
    user.services = this.getServiceList(user.work_area);
    user.roles = user.role;
    user.base_locations = user.base_location;
    this.staffDataAccessService.updateUserStatus(user).subscribe((res) => {
      this.userDetails.suspended = !this.userDetails.suspended;
      this.suspendedStatus = this.userDetails.suspended ? 'suspended' : 'restored';
    }, error => {
      this.suspendedStatus = 'error';
    });
    // reset the services and roles to original pre-API ready values
    this.userDetails.services = services;
    this.userDetails.roles = roles;
   }

  private getServiceList(workAreaList: WorkArea[]): ServiceInformation[] {
    const services = [];
    workAreaList.forEach(area => {
      const service_code = area.service_code;
      const service = area.area_of_work;
      services.push({service, service_code});
    })
    return services;
  }

  public copy(): void {
    const url = '/staff/add-user';
    this.router.navigate([url], { state: { user: this.userDetails } });
  }
}
