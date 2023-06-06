import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { StaffFilterOption } from '../models/staff-filter-option.model';
import { StaffDataAccessService } from '../services/staff-data-access/staff-data-access.service';

@Injectable({
  providedIn: 'root'
})
export class StaffFilterOptionsUserTypesResolver implements Resolve<StaffFilterOption[]> {
  constructor(private staffDataAccessService: StaffDataAccessService) {
  }

  public resolve() {
    return this.staffDataAccessService.getUserTypes();
  }
}
