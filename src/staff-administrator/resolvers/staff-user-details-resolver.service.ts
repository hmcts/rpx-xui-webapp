import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
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
    return this.staffDataAccessService.fetchSingleUserById(route.params.id).pipe(
      map((user) => StaffUser.from(user))
    );
  }
}
