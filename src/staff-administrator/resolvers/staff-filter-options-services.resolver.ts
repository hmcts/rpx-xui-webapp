import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { StaffFilterOption } from '../models/staff-filter-option.model';
import { StaffDataAccessService } from '../services/staff-data-access/staff-data-access.service';

@Injectable({
  providedIn: 'root'
})
export class StaffFilterOptionsServicesResolver implements Resolve<StaffFilterOption[]> {

  constructor(private staffDataAccessService: StaffDataAccessService) {}

  public resolve(route?: ActivatedRouteSnapshot) {
    return this.staffDataAccessService.getServices();
  }
}
