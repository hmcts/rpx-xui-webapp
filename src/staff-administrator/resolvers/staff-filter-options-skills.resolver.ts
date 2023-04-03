import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { GroupOption } from '../../../api/staff-ref-data/models/staff-filter-option.model';
import { StaffDataAccessService } from '../services/staff-data-access/staff-data-access.service';

@Injectable({
  providedIn: 'root'
})
export class StaffFilterOptionsSkillsResolver implements Resolve<GroupOption[]> {
  constructor(private staffDataAccessService: StaffDataAccessService) {
  }

  public resolve(route?: ActivatedRouteSnapshot) {
    return this.staffDataAccessService.getSkills();
  }
}
