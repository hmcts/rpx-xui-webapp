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
    this.userDetails = this.route.snapshot.data.staffUserDetails.userDetails.results[0];
   }

   public changeStatus(): void {

    this.staffDataAccessService.updateUserStatus(this.userDetails).subscribe((res: StaffUser) => {
      this.userDetails = res;
      // success banner
    }, error => {
    });

   }
}
