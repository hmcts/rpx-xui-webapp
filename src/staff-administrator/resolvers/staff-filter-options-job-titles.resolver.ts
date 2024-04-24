import { Injectable } from '@angular/core';

import { StaffFilterOption } from '../../../api/staff-ref-data/models/staff-filter-option.model';
import { StaffDataAccessService } from '../services/staff-data-access/staff-data-access.service';

@Injectable({
  providedIn: 'root'
})
export class StaffFilterOptionsJobTitlesResolver  {
  constructor(private staffDataAccessService: StaffDataAccessService) {}

  public resolve() {
    return this.staffDataAccessService.getJobTitles();
  }
}
