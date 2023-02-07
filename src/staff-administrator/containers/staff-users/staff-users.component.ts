import { Component } from '@angular/core';
import { HmctsBannerInfo } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/components/hmcts-banner/hmcts-banner-info.interface';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { StaffDataFilterService } from '../../components/staff-users/services/staff-data-filter/staff-data-filter.service';
@Component({
  selector: 'exui-staff-users',
  templateUrl: './staff-users.component.html',
  styleUrls: ['./staff-users.component.scss'],
})
export class StaffUsersComponent  {
  public advancedSearchEnabled = false;
  public bannerData: HmctsBannerInfo;

  constructor(
    public staffDataFilterService: StaffDataFilterService,
    private infoMessageCommService: InfoMessageCommService
  ) { }

  public advancedSearchClicked(): void {
    this.advancedSearchEnabled = !this.advancedSearchEnabled;
    this.infoMessageCommService.removeAllMessages();
  }
}
