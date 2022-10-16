import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { SharedModule } from '../app/shared/shared.module';
import {
  StaffAddEditUserFormComponent
} from './components/staff-add-edit-user/staff-add-edit-user-form/staff-add-edit-user-form.component';
import { StaffUserCheckAnswersComponent } from './components/staff-add-edit-user/staff-user-check-answers/staff-user-check-answers.component';
import { StaffDataFilterService } from './components/staff-users/services/staff-data-filter/staff-data-filter.service';
import { StaffAdvFilterComponent } from './components/staff-users/staff-adv-filter/staff-adv-filter.component';
import { StaffSearchComponent } from './components/staff-users/staff-search/staff-search.component';
import { StaffUserListComponent } from './components/staff-users/staff-user-list/staff-user-list.component';
import { StaffAddUserComponent } from './containers/staff-add-user/staff-add-user.component';
import { StaffMainContainerComponent } from './containers/staff-main-container/staff-main-container.component';
import { StaffUsersComponent } from './containers/staff-users/staff-users.component';
import { StaffFilterOptionsJobTitlesResolver } from './resolvers/staff-filter-options-job-titles.resolver';
import { StaffFilterOptionsServicesResolver } from './resolvers/staff-filter-options-services.resolver';
import { StaffFilterOptionsSkillsResolver } from './resolvers/staff-filter-options-skills.resolver';
import { StaffFilterOptionsUserTypesResolver } from './resolvers/staff-filter-options-userTypes.resolver';
import { StaffDataAccessService } from './services/staff-data-access/staff-data-access.service';
import { staffAdministratorRouting } from './staff-administrator.routes';
import { StaffStatusComponent } from './components/staff-status/staff-status.component';

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
    StaffFilterOptionsServicesResolver,
    StaffFilterOptionsSkillsResolver,
    StaffFilterOptionsJobTitlesResolver,
    StaffFilterOptionsUserTypesResolver
  ],
  exports: []
})
export class StaffAdministratorModule {}
