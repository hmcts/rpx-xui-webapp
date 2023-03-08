import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { LocationByEPIMMSModel } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { WASupportedJurisdictionsService } from '../../work-allocation/services';

@Injectable({
  providedIn: 'root'
})
export class StaffFilterOptionsLocationsResolver implements Resolve<LocationByEPIMMSModel[]> {

  constructor(protected waSupportedJurisdictionsService: WASupportedJurisdictionsService, private readonly http: HttpClient) {
  }

  public resolve(route?: ActivatedRouteSnapshot): Observable<LocationByEPIMMSModel[]> {
    return this.waSupportedJurisdictionsService.getWASupportedJurisdictions().pipe(switchMap(supportedJurisdiction => {
      return this.http.post<LocationByEPIMMSModel[]>(`api/locations/getLocations`, {serviceIds: supportedJurisdiction, locationType: 'case-management', searchTerm: 'cen'});
    }));
  }
}
