import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { SharedModule } from '../app/shared/shared.module';
import { StaffRefDataHomeComponent } from './containers/staff-ref-data-home/staff-ref-data-home.component';
import { StaffRefDataUsersFiltersComponent } from './containers/staff-ref-data-users/staff-ref-data-users-filters/staff-ref-data-users-filters.component';
import { StaffRefDataUsersListComponent } from './containers/staff-ref-data-users/staff-ref-data-users-list/staff-ref-data-users-list.component';
import { StaffRefDataUsersComponent } from './containers/staff-ref-data-users/staff-ref-data-users.component';
import { staffRefDataRouting } from './staff-ref-data-feature.routes';

@NgModule({
  declarations: [
    StaffRefDataUsersComponent,
    StaffRefDataHomeComponent,
    StaffRefDataUsersFiltersComponent,
    StaffRefDataUsersListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ExuiCommonLibModule,
    staffRefDataRouting,
  ],
  exports: []
})
export class StaffRefDataModule {
}
