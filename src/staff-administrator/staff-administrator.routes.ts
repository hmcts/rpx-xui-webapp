import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffAddUserComponent } from './containers/staff-add-user/staff-add-user.component';
import { StaffMainContainerComponent } from './containers/staff-main-container/staff-main-container.component';
import {
  StaffUserCheckAnswersComponent
} from './containers/staff-user-check-answers/staff-user-check-answers.component';
import { StaffFilterOptionsJobTitlesResolver } from './resolvers/staff-filter-options-job-titles.resolver';
import { StaffFilterOptionsServicesResolver } from './resolvers/staff-filter-options-services.resolver';
import { StaffFilterOptionsSkillsResolver } from './resolvers/staff-filter-options-skills.resolver';
import { StaffFilterOptionsUserTypesResolver } from './resolvers/staff-filter-options-userTypes.resolver';

export const ROUTES: Routes = [
  {
    path: '',
    component: StaffMainContainerComponent,
    resolve: {
      jobTitles: StaffFilterOptionsJobTitlesResolver,
      userTypes: StaffFilterOptionsUserTypesResolver,
      skills: StaffFilterOptionsSkillsResolver,
    }
  },
  {
    path: 'add-user',
    component: StaffAddUserComponent,
    resolve: {
      skills: StaffFilterOptionsSkillsResolver,
      services: StaffFilterOptionsServicesResolver,
      userTypes: StaffFilterOptionsUserTypesResolver,
      jobTitles: StaffFilterOptionsJobTitlesResolver
    }
  },
  {
    path: 'user/check-answers',
    component: StaffUserCheckAnswersComponent,
  }
];
export const staffAdministratorRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
