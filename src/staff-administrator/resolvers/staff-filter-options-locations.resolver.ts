import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { LocationByEPIMMSModel } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { StaffFilterOption } from '../models/staff-filter-option.model';

@Injectable({
  providedIn: 'root'
})
export class StaffFilterOptionsLocationsResolver implements Resolve<LocationByEPIMMSModel[]> {

  constructor(private readonly http: HttpClient) {
  }

  public resolve(route?: ActivatedRouteSnapshot): Observable<LocationByEPIMMSModel[]> {

    return this.http.post<LocationByEPIMMSModel[]>(`api/locations/getLocations`, {serviceIds: ['SSCS','IA'], locationType: 'case-management', searchTerm: 'cen'});
  }
}
