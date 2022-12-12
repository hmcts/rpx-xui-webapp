import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffUser } from '../../../staff-administrator/models/staff-user.model';

@Component({
  selector: 'exui-staff-user-details',
  templateUrl: './staff-user-details.component.html',
  styleUrls: ['./staff-user-details.component.scss']
})
export class StaffUserDetailsComponent {
  public userDetails: StaffUser;
  public showAction: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    this.userDetails = this.route.snapshot.data.staffUserDetails.userDetails.results[0];
   }

   public copy(): void {
    const url = '/staff/add-user';
    this.router.navigate([url], { state: { user: this.userDetails } });
  }
}
