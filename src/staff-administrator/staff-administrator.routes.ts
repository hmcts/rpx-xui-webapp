import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  StaffUserCheckAnswersComponent
} from './components/staff-add-edit-user/staff-user-check-answers/staff-user-check-answers.component';
import { StaffUserDetailsComponent } from './components/staff-user-details/staff-user-details.component';
import { StaffAddUserComponent } from './containers/staff-add-user/staff-add-user.component';
import {
  StaffEditUserContainerComponent
} from './containers/staff-edit-user-container/staff-edit-user-container.component';
import { StaffMainContainerComponent } from './containers/staff-main-container/staff-main-container.component';
import { StaffUserDetailsContainerComponent } from './containers/staff-user-details-container/staff-user-details-container.component';
import { StaffUsersComponent } from './containers/staff-users/staff-users.component';
import { StaffFilterOptionsJobTitlesResolver } from './resolvers/staff-filter-options-job-titles.resolver';
import { StaffFilterOptionsServicesResolver } from './resolvers/staff-filter-options-services.resolver';
import { StaffFilterOptionsSkillsResolver } from './resolvers/staff-filter-options-skills.resolver';
import { StaffFilterOptionsUserTypesResolver } from './resolvers/staff-filter-options-userTypes.resolver';

export const ROUTES: Routes = [
  {
    path: 'users',
    component: StaffUserDetailsContainerComponent,
    children: [
      {
        path: 'user-details',
        component: StaffUserDetailsComponent,
        data: {
          title: 'User Details'
        }
      }]
  },
  {
    path: '',
    component: StaffMainContainerComponent,
    children: [
      { path: '',
        component: StaffUsersComponent,
        resolve: {
          jobTitles: StaffFilterOptionsJobTitlesResolver,
          services: StaffFilterOptionsServicesResolver,
          skills: StaffFilterOptionsSkillsResolver,
          userTypes: StaffFilterOptionsUserTypesResolver,
        },
      },
      {
        path: 'add-edit-user',
        resolve: {
          jobTitles: StaffFilterOptionsJobTitlesResolver,
          services: StaffFilterOptionsServicesResolver,
          skills: StaffFilterOptionsSkillsResolver,
          userTypes: StaffFilterOptionsUserTypesResolver,
        },
        data: {formId: 'staff-add-user'},
        children: [
          { path: '', component: StaffAddUserComponent },
          { path: 'check-your-answers', component: StaffUserCheckAnswersComponent }
        ]
      },
      {
        path: 'update-user',
        resolve: {
          jobTitles: StaffFilterOptionsJobTitlesResolver,
          services: StaffFilterOptionsServicesResolver,
          skills: StaffFilterOptionsSkillsResolver,
          userTypes: StaffFilterOptionsUserTypesResolver,
        },
        data: { formId: 'staff-update-user' },
        children: [
          { path: '', component: StaffEditUserContainerComponent },
          { path: 'check-your-answers', component: StaffUserCheckAnswersComponent }
        ]
      }
    ]
  },
];
export const staffAdministratorRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
