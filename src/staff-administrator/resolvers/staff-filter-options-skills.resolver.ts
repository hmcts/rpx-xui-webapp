import { Injectable } from '@angular/core';

import { GroupOption } from '../../../api/staff-ref-data/models/staff-filter-option.model';
import { StaffDataAccessService } from '../services/staff-data-access/staff-data-access.service';

@Injectable({
  providedIn: 'root'
})
export class StaffFilterOptionsSkillsResolver  {
  constructor(private staffDataAccessService: StaffDataAccessService) {
  }

  public resolve() {
    return this.staffDataAccessService.getSkills();
  }
}
