import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { StaffUser } from '../models/staff-user.model';
import { StaffDataAccessService } from '../services/staff-data-access/staff-data-access.service';

@Injectable({
  providedIn: 'root'
})
export class StaffUserDetailsResolverService implements Resolve<{ userDetails: StaffUser}> {

  constructor(private staffDataAccessService: StaffDataAccessService) {
  }

  public resolve(route?: ActivatedRouteSnapshot) {
    return combineLatest([
      this.staffDataAccessService.getStaffRefUserDetails(route.params.id)
    ]).pipe(
      map(res => {
        return {
          userDetails: res[0]
        };
    }));
  }
}
