import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefundsComponent } from './refunds/refunds.component';

const routes: Routes = [{
  path: '',
  component: RefundsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefundsRoutingModule { }
