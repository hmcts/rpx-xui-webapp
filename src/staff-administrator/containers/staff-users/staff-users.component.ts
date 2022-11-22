import { Component } from '@angular/core';
import { BannerDataModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { StaffDataFilterService } from '../../components/staff-users/services/staff-data-filter/staff-data-filter.service';

@Component({
  selector: 'exui-staff-users',
  templateUrl: './staff-users.component.html',
  styleUrls: ['./staff-users.component.scss'],
})
export class StaffUsersComponent  {
  public advancedSearchEnabled = false;
  public bannerData: BannerDataModel;

  constructor(public staffDataFilterService: StaffDataFilterService) { }

}
