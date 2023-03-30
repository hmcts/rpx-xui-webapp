import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RefDataService } from '@hmcts/rpx-xui-common-lib';
import { map } from 'rxjs/operators';
import { StaffFilterOption } from '../models/staff-filter-option.model';

@Injectable({
  providedIn: 'root'
})
export class StaffFilterOptionsServicesResolver implements Resolve<StaffFilterOption[]> {
  constructor(private refDataService: RefDataService) {}

  public resolve(route?: ActivatedRouteSnapshot) {
    return this.refDataService.services$.pipe(
      map((services) => services.map(service => ({
          key: service.service_code,
          label: service.service_description
        }))
      )
    );
  }
}
