import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffRefDataHomeComponent } from './containers/staff-ref-data-home/staff-ref-data-home.component';
import { StaffRefDataUsersComponent } from './containers/staff-ref-data-users/staff-ref-data-users.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: StaffRefDataHomeComponent,
    canActivate: [],
    children: [
      { path: 'users', component: StaffRefDataUsersComponent }
    ]
  }
];
export const staffRefDataRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
