import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../app/shared/shared.module';
import { StaffAddEditUserFormComponent } from './components/staff-add-edit-user/staff-add-edit-user-form/staff-add-edit-user-form.component';
import { StaffUserCheckAnswersComponent } from './components/staff-add-edit-user/staff-user-check-answers/staff-user-check-answers.component';
import { StaffStatusComponent } from './components/staff-status/staff-status.component';
import { StaffSuspendedBannerComponent } from './components/staff-suspended-banner/staff-suspended-banner.component';
import { StaffDataFilterService } from './components/staff-users/services/staff-data-filter/staff-data-filter.service';
import { StaffAdvFilterComponent } from './components/staff-users/staff-adv-filter/staff-adv-filter.component';
import { StaffSearchComponent } from './components/staff-users/staff-search/staff-search.component';
import { StaffUserListComponent } from './components/staff-users/staff-user-list/staff-user-list.component';
import { StaffAddUserComponent } from './containers/staff-add-user/staff-add-user.component';
import {
  StaffEditUserContainerComponent
} from './containers/staff-edit-user-container/staff-edit-user-container.component';
import { StaffMainContainerComponent } from './containers/staff-main-container/staff-main-container.component';
import { StaffUserDetailsComponent } from './containers/staff-user-details/staff-user-details.component';
import { StaffUsersComponent } from './containers/staff-users/staff-users.component';
import { PluckAndJoinPipe } from './pipes/pluckAndJoin.pipe';
import { StaffFilterOptionsJobTitlesResolver } from './resolvers/staff-filter-options-job-titles.resolver';
import { StaffFilterOptionsServicesResolver } from './resolvers/staff-filter-options-services.resolver';
import { StaffFilterOptionsSkillsResolver } from './resolvers/staff-filter-options-skills.resolver';
import { StaffFilterOptionsUserTypesResolver } from './resolvers/staff-filter-options-userTypes.resolver';
import { StaffUserDetailsResolverService } from './resolvers/staff-user-details-resolver.service';
import { StaffDataAccessService } from './services/staff-data-access/staff-data-access.service';
import { staffAdministratorRouting } from './staff-administrator.routes';

@NgModule({
  declarations: [
    StaffMainContainerComponent,
    StaffUsersComponent,
    StaffSearchComponent,
    StaffUserListComponent,
    StaffAdvFilterComponent,
    StaffAddEditUserFormComponent,
    StaffAddUserComponent,
    StaffUserCheckAnswersComponent,
      StaffUserDetailsComponent,
    StaffStatusComponent,
    PluckAndJoinPipe,
    StaffEditUserContainerComponent,
    StaffStatusComponent,
    StaffSuspendedBannerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CdkTableModule,
    ExuiCommonLibModule,
    ReactiveFormsModule,
    staffAdministratorRouting,
    NgxPaginationModule
  ],
  providers: [
    StaffDataAccessService,
    StaffDataFilterService,
    StaffFilterOptionsServicesResolver,
    StaffFilterOptionsSkillsResolver,
    StaffFilterOptionsJobTitlesResolver,
    StaffFilterOptionsUserTypesResolver,
    StaffUserDetailsResolverService,
    StaffDataAccessService
  ],
  exports: []
})
export class StaffAdministratorModule {}
