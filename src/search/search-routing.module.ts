import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard, RoleMatching } from '@hmcts/rpx-xui-common-lib';
import { SearchFormComponent } from './containers';

const routes: Routes = [{
  path: '',
  component: SearchFormComponent,
  canActivate: [RoleGuard],
  data: {
    // TODO: Roles will need replacing with actual ones to be granted access, or loaded from configuration
    needsRole: ['pui\-case\-manager'],
    roleMatching: RoleMatching.ANY,
    noRoleMatchRedirect: '/'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
