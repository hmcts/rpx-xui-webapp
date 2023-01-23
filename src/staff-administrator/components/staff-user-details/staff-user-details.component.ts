import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffDataAccessService } from 'src/staff-administrator/services/staff-data-access/staff-data-access.service';
import { StaffUser } from '../../../staff-administrator/models/staff-user.model';

@Component({
  selector: 'exui-staff-user-details',
  templateUrl: './staff-user-details.component.html',
  styleUrls: ['./staff-user-details.component.scss']
})
export class StaffUserDetailsComponent {
  public userDetails: StaffUser;
  public showAction: boolean = false;

  constructor(private route: ActivatedRoute,
              private staffDataAccessService: StaffDataAccessService) {
    this.userDetails = this.route.snapshot.data.staffUserDetails.userDetails[0];
   }

   public updateUserStatus(): void {
    this.userDetails.suspended = !this.userDetails.suspended;
    const user = {
      ...this.userDetails,
      "base_location": this.userDetails.primaryLocation,
      "primary_role": this.userDetails.roles,
      "primary_base_location": this.userDetails.locations
    }
    this.staffDataAccessService.updateUserStatus(user).subscribe((res: StaffUser) => {
      this.userDetails = res;
      // success banner
    }, error => {
    });

   }
}
