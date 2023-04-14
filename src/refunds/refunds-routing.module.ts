import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard, RoleMatching } from '@hmcts/rpx-xui-common-lib';
import { RefundsComponent } from './refunds/refunds.component';

const routes: Routes = [{
  path: '',
  component: RefundsComponent,
  canActivate: [RoleGuard],
  data: {
    needsRole: ['payments-refund-approver', 'payments-refund'],
    roleMatching: RoleMatching.ANY,
    noRoleMatchRedirect: '/'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefundsRoutingModule {}
