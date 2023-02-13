import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BannerDataModel } from '../models/banner-data-model';

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
