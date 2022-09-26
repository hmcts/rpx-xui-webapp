import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffUserDetailsComponent } from './components/staff-user-details/staff-user-details.component';
import { StaffAddUserComponent } from './containers/staff-add-user/staff-add-user.component';
import { StaffMainContainerComponent } from './containers/staff-main-container/staff-main-container.component';
import { StaffUserDetailsContainerComponent } from './containers/staff-user-details-container/staff-user-details-container.component';
import { StaffFilterOptionsResolverService } from './resolvers/staff-filter-options-resolver.service';
import { StaffUserDetailsResolverService } from './resolvers/staff-user-details-resolver.service';

export const ROUTES: Routes = [
  {
    path: 'users',
    component: StaffUserDetailsContainerComponent,
    children: [
      {
        path: 'user-details/:id',
        component: StaffUserDetailsComponent,
        data: {
          title: 'User Details'
        },
        resolve: {
          staffUserDetails: StaffUserDetailsResolverService
        }
      }]
  },
  {
    path: '',
    component: StaffMainContainerComponent,
    resolve: {
      staffFilters: StaffFilterOptionsResolverService
    }
  },
  {
    path: 'add-user',
    component: StaffAddUserComponent
  }
];
export const staffAdministratorRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
