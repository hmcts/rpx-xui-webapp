import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffAddEditUserFormId } from './components/staff-add-edit-user-form-id.enum';
import {
  StaffUserCheckAnswersComponent
} from './components/staff-add-edit-user/staff-user-check-answers/staff-user-check-answers.component';
import { StaffAddUserComponent } from './containers/staff-add-user/staff-add-user.component';
import {
  StaffEditUserContainerComponent
} from './containers/staff-edit-user-container/staff-edit-user-container.component';
import { StaffMainContainerComponent } from './containers/staff-main-container/staff-main-container.component';
import { StaffUserDetailsComponent } from './containers/staff-user-details/staff-user-details.component';
import { StaffUsersComponent } from './containers/staff-users/staff-users.component';
import { StaffFilterOptionsJobTitlesResolver } from './resolvers/staff-filter-options-job-titles.resolver';
import { StaffFilterOptionsLocationsResolver } from './resolvers/staff-filter-options-locations.resolver';
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
      locations: StaffFilterOptionsLocationsResolver,
    },
    children: [
      { path: '', component: StaffUsersComponent },
      {
        path: 'user-details/:id',
        resolve: {
          staffUserDetails: StaffUserDetailsResolverService
        },
        children: [
          { path: '', component: StaffUserDetailsComponent },
          {
            path: 'update',
            data: { formId: StaffAddEditUserFormId.UpdateUser },
            children: [
              { path: '', component: StaffEditUserContainerComponent },
              { path: 'check-your-answers', component: StaffUserCheckAnswersComponent }
            ]
          },
          {
            path: 'copy',
            data: { formId: StaffAddEditUserFormId.CopyUser },
            children: [
              { path: '', component: StaffAddUserComponent },
              { path: 'check-your-answers', component: StaffUserCheckAnswersComponent }
            ]
          }
        ],
      },
      {
        path: 'add-user',
        data: { formId: StaffAddEditUserFormId.AddUser },
        children: [
          { path: '', component: StaffAddUserComponent },
          { path: 'check-your-answers', component: StaffUserCheckAnswersComponent }
        ]
      }
    ]
  },
];
export const staffAdministratorRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(ROUTES);
