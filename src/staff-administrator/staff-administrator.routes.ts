import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffMainContainerComponent } from './containers/staff-main-container/staff-main-container.component';
import { StaffFilterOptionsResolverService } from './resolvers/staff-filter-options-resolver.service';

export const ROUTES: Routes = [
  {
    path: '',
    component: StaffMainContainerComponent,
    resolve: {
      staffFilters: StaffFilterOptionsResolverService
    }
  }
];
export const staffAdministratorRouting: ModuleWithProviders = RouterModule.forChild(ROUTES);
