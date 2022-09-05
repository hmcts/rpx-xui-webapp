import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffMainContainerComponent } from './containers/staff-main-container/staff-main-container.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: StaffMainContainerComponent,
  }
];
export const staffAdministratorRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
