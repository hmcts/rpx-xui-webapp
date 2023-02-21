import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private staffDataAccessService: StaffDataAccessService) {
    this.userDetails = this.route.snapshot.data.staffUserDetails.userDetails[0];
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
}
