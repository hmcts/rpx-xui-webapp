import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  StaffAddEditUserFormComponent
} from './components/staff-add-edit-user/staff-add-edit-user-form/staff-add-edit-user-form.component';
import {
  StaffUserCheckAnswersComponent
} from './components/staff-add-edit-user/staff-user-check-answers/staff-user-check-answers.component';
import { StaffUserDetailsComponent } from './components/staff-user-details/staff-user-details.component';
import {
  StaffAddEditUserContainerComponent
} from './containers/staff-add-edit-user-container/staff-add-edit-user-container.component';
import { StaffMainContainerComponent } from './containers/staff-main-container/staff-main-container.component';
import {
  StaffUserDetailsContainerComponent
} from './containers/staff-user-details-container/staff-user-details-container.component';
import { StaffUsersComponent } from './containers/staff-users/staff-users.component';
import { StaffFilterOptionsJobTitlesResolver } from './resolvers/staff-filter-options-job-titles.resolver';
import { StaffFilterOptionsRegionsResolver } from './resolvers/staff-filter-options-regions.resolver';
import { StaffFilterOptionsServicesResolver } from './resolvers/staff-filter-options-services.resolver';
import { StaffFilterOptionsSkillsResolver } from './resolvers/staff-filter-options-skills.resolver';
import { StaffFilterOptionsUserTypesResolver } from './resolvers/staff-filter-options-userTypes.resolver';
import { StaffUserDetailsResolverService } from './resolvers/staff-user-details-resolver.service';

export const ROUTES: Routes = [
  {
    path: '',
    component: StaffMainContainerComponent,
    resolve: {
      jobTitles: StaffFilterOptionsJobTitlesResolver,
      services: StaffFilterOptionsServicesResolver,
      skills: StaffFilterOptionsSkillsResolver,
      userTypes: StaffFilterOptionsUserTypesResolver,
      regions: StaffFilterOptionsRegionsResolver
    },
    children: [
      { path: '', component: StaffUsersComponent },
      {
        path: 'user-details/:id',
        component: StaffUserDetailsContainerComponent,
        children: [
          { path: '',
            component: StaffUserDetailsComponent,
            resolve: {
              staffUserDetails: StaffUserDetailsResolverService
            },
            runGuardsAndResolvers: 'always'
          },
          {
            path: 'update',
            component: StaffAddEditUserContainerComponent,
            data: { isUpdateMode: true },
            children: [
              { path: '',
                component: StaffAddEditUserFormComponent,
                data: {
                  title: 'Edit user',
                  description: 'Change the details of this user.'
                }
              },
              { path: 'check-your-answers', component: StaffUserCheckAnswersComponent }
            ]
          },
          {
            path: 'copy',
            component: StaffAddEditUserContainerComponent,
            data: {
              title: 'Add user',
              description: 'Enter the details of the user you want to add.'
            },
            children: [
              { path: '', component: StaffAddEditUserFormComponent },
              { path: 'check-your-answers', component: StaffUserCheckAnswersComponent }
            ]
          }
        ]
      },
      {
        path: 'add-user',
        component: StaffAddEditUserContainerComponent,
        data: {
          title: 'Add user',
          description: 'Enter the details of the user you want to add.'
        },
        children: [
          { path: '', component: StaffAddEditUserFormComponent },
          { path: 'check-your-answers', component: StaffUserCheckAnswersComponent }
        ]
      }
    ]
  }
];
export const staffAdministratorRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(ROUTES);
