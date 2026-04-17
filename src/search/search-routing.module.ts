import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleMatching } from '@hmcts/rpx-xui-common-lib';
import { NavigationAccessGuard } from '../app/shared/guards/navigation-access.guard';
import { NoResultsComponent, SearchFormComponent, SearchResultsComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: SearchFormComponent,
    canActivate: [NavigationAccessGuard],
    data: {
      accessDeniedRedirectUrl: '/',
      requiredNavigationHref: '/search',
    },
  },
  {
    path: 'noresults',
    component: NoResultsComponent,
    data: {
      title: 'Search cases | No results',
      // TODO: Roles will need replacing with actual ones to be granted access, or loaded from configuration
      needsRole: ['pui-case-manager', 'caseworker'],
      roleMatching: RoleMatching.ANY,
      noRoleMatchRedirect: '/',
    },
  },
  {
    path: 'results',
    component: SearchResultsComponent,
    data: {
      title: 'Search cases | Search Results',
      // TODO: Roles will need replacing with actual ones to be granted access, or loaded from configuration
      needsRole: ['pui-case-manager', 'caseworker'],
      roleMatching: RoleMatching.ANY,
      noRoleMatchRedirect: '/',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
