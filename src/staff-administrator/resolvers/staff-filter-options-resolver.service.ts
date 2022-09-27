import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { StaffFilterOption } from '../models/staff-filter-option.model';
import { StaffDataAccessService } from '../services/staff-data-access/staff-data-access.service';

@Injectable({
  providedIn: 'root'
})
export class StaffFilterOptionsResolverService implements Resolve<{ userTypes: StaffFilterOption[], jobTitles: StaffFilterOption[], skills: StaffFilterOption[] }> {

  constructor(private staffDataAccessService: StaffDataAccessService) {
  }

  public resolve(route?: ActivatedRouteSnapshot) {
    return combineLatest([
      this.staffDataAccessService.getUserTypes(),
      this.staffDataAccessService.getJobTitles(),
      this.staffDataAccessService.getSkills()
    ]).pipe(
      map(res => {
        return {
          userTypes: res[0],
          jobTitles: res[1],
          skills: res[2]
        };
    }));
  }
}
