import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RefDataRegion, RefDataService } from '@hmcts/rpx-xui-common-lib';

@Injectable({
  providedIn: 'root'
})
export class StaffFilterOptionsRegionsResolver implements Resolve<RefDataRegion[]> {
  constructor(private refDataService: RefDataService) {}

  public resolve(route?: ActivatedRouteSnapshot) {
    return this.refDataService.regions$;
  }
}
