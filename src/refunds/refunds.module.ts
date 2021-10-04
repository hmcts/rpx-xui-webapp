import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefundsRoutingModule } from './refunds-routing.module';
import { RefundsComponent } from './refunds/refunds.component';
import { SharedModule } from '../app/shared/shared.module';
import { PaymentLibModule } from '@hmcts/ccpay-web-component';

@NgModule({
  imports: [
    CommonModule,
    RefundsRoutingModule,
    SharedModule,
    PaymentLibModule
  ],
  declarations: [RefundsComponent],
  exports: [RefundsComponent]
})
export class RefundsModule { }
