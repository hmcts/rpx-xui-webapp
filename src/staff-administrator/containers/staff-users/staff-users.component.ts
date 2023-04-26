import { Component } from '@angular/core';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { StaffDataFilterService } from '../../components/staff-users/services/staff-data-filter/staff-data-filter.service';

@Component({
  selector: 'exui-staff-users',
  templateUrl: './staff-users.component.html',
  styleUrls: ['./staff-users.component.scss'],
  providers: [StaffDataFilterService]
})
export class StaffUsersComponent {
  public advancedSearchEnabled = false;

  constructor(
    public staffDataFilterService: StaffDataFilterService,
    private infoMessageCommService: InfoMessageCommService,
  ) {}

  public advancedSearchClicked(): void {
    this.advancedSearchEnabled = !this.advancedSearchEnabled;
    this.infoMessageCommService.removeAllMessages();
  }
}
