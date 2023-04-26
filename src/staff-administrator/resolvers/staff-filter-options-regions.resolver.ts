import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RefDataRegion, RefDataService } from '@hmcts/rpx-xui-common-lib';

@Injectable({
  providedIn: 'root'
})
export class StaffFilterOptionsRegionsResolver implements Resolve<RefDataRegion[]> {
  constructor(private refDataService: RefDataService) {}

  public resolve() {
    return this.refDataService.regions$;
  }
}
