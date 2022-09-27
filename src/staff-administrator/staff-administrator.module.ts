import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { SharedModule } from '../app/shared/shared.module';
import { StaffAdvFilterComponent } from './components/staff-adv-filter/staff-adv-filter.component';
import { StaffSearchComponent } from './components/staff-search/staff-search.component';
import { StaffUserListComponent } from './components/staff-user-list/staff-user-list.component';
import { StaffAddUserComponent } from './containers/staff-add-user/staff-add-user.component';
import { StaffEditUserComponent } from './containers/staff-edit-user/staff-edit-user.component';
import { StaffMainContainerComponent } from './containers/staff-main-container/staff-main-container.component';
import { StaffFilterOptionsResolverService } from './resolvers/staff-filter-options-resolver.service';
import { StaffDataAccessService } from './services/staff-data-access/staff-data-access.service';
import { StaffDataFilterService } from './services/staff-data-filter.service';
import { staffAdministratorRouting } from './staff-administrator.routes';

@NgModule({
  declarations: [
    StaffMainContainerComponent,
    StaffSearchComponent,
    StaffUserListComponent,
    StaffAdvFilterComponent,
    StaffAddUserComponent,
    StaffEditUserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CdkTableModule,
    ExuiCommonLibModule,
    ReactiveFormsModule,
    staffAdministratorRouting,
  ],
  providers: [
    StaffDataAccessService,
    StaffDataFilterService,
    StaffFilterOptionsResolverService,
  ],
  exports: []
})
export class StaffAdministratorModule {}
