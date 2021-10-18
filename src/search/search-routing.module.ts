import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard, RoleMatching } from '@hmcts/rpx-xui-common-lib';
import { SearchFormComponent } from './containers';
import { NoResultsComponent } from './containers/no-results/no-results.component';

const routes: Routes = [
  {
    path: '',
    component: SearchFormComponent,
    canActivate: [RoleGuard],
    data: {
      // TODO: Roles will need replacing with actual ones to be granted access, or loaded from configuration
      needsRole: ['pui-case-manager'],
      roleMatching: RoleMatching.ANY,
      noRoleMatchRedirect: '/'
    }
  },
  {
    path: 'noresults',
    component: NoResultsComponent,
    data: {
      title: 'No results'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
