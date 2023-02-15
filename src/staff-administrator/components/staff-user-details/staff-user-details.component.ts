import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffUser } from '../../../staff-administrator/models/staff-user.model';
import { StaffDataAccessService } from '../../../staff-administrator/services/staff-data-access/staff-data-access.service';

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
              private staffDataAccessService: StaffDataAccessService) {
   }

   public ngOnInit(): void {
    this.userDetails = this.route.snapshot.data.staffUserDetails.userDetails[0];
    console.log(this.userDetails, 'omg');
   }

   public updateUserStatus(): void {
    const user = this.userDetails;
    console.log(user.work_area);
    user.services = this.getServiceList(user.work_area);
    user.roles = user.role;
    user.base_locations = user.base_location;
    // TODO: Currently forcing these values, should be boolean throughout application
    // tech debt
    user.case_allocator = this.convertToBoolValue(user.case_allocator);
    user.task_supervisor = this.convertToBoolValue(user.task_supervisor);
    user.staff_admin = this.convertToBoolValue(user.staff_admin);
    this.staffDataAccessService.updateUserStatus(user).subscribe((res) => {
      this.userDetails.suspended = !this.userDetails.suspended;
      this.suspendedStatus = this.userDetails.suspended ? 'suspended' : 'restored';
    }, error => {
      this.suspendedStatus = 'error';
    });

   }

  private convertToBoolValue(value: any): boolean {
    if (typeof value === 'string') {
      return value === 'Y' ? true : false;
    }
    return value;
  }

  private getServiceList(workArea: any): any[] {
    const services = [];
    workArea.forEach(area => {
      const service_code = area.service_code;
      const service = area.area_of_work;
      services.push({service, service_code});
    })
    return services;
  }

}
