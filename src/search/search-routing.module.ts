import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard, RoleMatching } from '@hmcts/rpx-xui-common-lib';
import { SearchResultsComponent } from './containers/search-results/search-results.component';
import { NoResultsComponent, SearchFormComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: SearchFormComponent,
    canActivate: [RoleGuard],
    data: {
      // TODO: Roles will need replacing with actual ones to be granted access, or loaded from configuration
      needsRole: ['pui\-case\-manager'],
      roleMatching: RoleMatching.ANY,
      noRoleMatchRedirect: '/'
    }
  },
  {
    path: 'noresults',
    component: NoResultsComponent,
    data: {
      title: 'Search cases | No results',
      // TODO: Roles will need replacing with actual ones to be granted access, or loaded from configuration
      needsRole: ['pui\-case\-manager'],
      roleMatching: RoleMatching.ANY,
      noRoleMatchRedirect: '/'
    }
  },
  {
    path: 'results',
    component: SearchResultsComponent,
    data: {
      title: 'Search cases | Search Results',
      // TODO: Roles will need replacing with actual ones to be granted access, or loaded from configuration
      needsRole: ['pui\-case\-manager'],
      roleMatching: RoleMatching.ANY,
      noRoleMatchRedirect: '/'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
