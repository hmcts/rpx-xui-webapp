import { Injectable } from '@angular/core';
import { BannerDataModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffDataSignalService {

  private bannerData = new BehaviorSubject<BannerDataModel>(null);
  public bannerData$ = this.bannerData.asObservable();

  public setBanner(message: BannerDataModel) {
    this.bannerData.next(message);
  }
}
