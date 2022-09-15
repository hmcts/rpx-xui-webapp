import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { SharedModule } from '../app/shared/shared.module';
import { StaffAdvFilterComponent } from './components/staff-adv-filter/staff-adv-filter.component';
import { StaffSearchComponent } from './components/staff-search/staff-search.component';
import { StaffUserListComponent } from './components/staff-user-list/staff-user-list.component';
import { StaffMainContainerComponent } from './containers/staff-main-container/staff-main-container.component';
import { StaffFilterOptionsResolverService } from './resolvers/staff-filter-options-resolver.service';
import { StaffDataAccessService } from './services/staff-data-access/staff-data-access.service';
import { staffAdministratorRouting } from './staff-administrator.routes';

@NgModule({
  declarations: [
    StaffMainContainerComponent,
    StaffSearchComponent,
    StaffUserListComponent,
    StaffAdvFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CdkTableModule,
    ExuiCommonLibModule,
    staffAdministratorRouting,
  ],
  providers: [
    StaffFilterOptionsResolverService,
    StaffDataAccessService
  ],
  exports: []
})
export class StaffAdministratorModule {}
