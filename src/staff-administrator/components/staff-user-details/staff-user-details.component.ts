import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StaffUser } from '../../../staff-administrator/models/staff-user.model';

@Component({
  selector: 'exui-staff-user-details',
  templateUrl: './staff-user-details.component.html',
  styleUrls: ['./staff-user-details.component.scss']
})
export class StaffUserDetailsComponent {
  public userDetails: StaffUser;
  public showAction: boolean = false;

  constructor(private readonly router: Router) {
    const routerStateUserDetails = router.getCurrentNavigation().extras.state &&
      router.getCurrentNavigation().extras.state.user;

    if (routerStateUserDetails) {
      this.userDetails = { ...routerStateUserDetails };
    } else {
      this.router.navigateByUrl('/staff');
    }
  }
}
