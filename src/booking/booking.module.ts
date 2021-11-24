import * as fromContainers from './containers';
import * as fromServices from './services';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { SharedModule } from '../app/shared/shared.module';
import { bookingRouting } from './booking.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    bookingRouting,
    SharedModule,
    bookingRouting,
    ExuiCommonLibModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...fromContainers.containers,
  ],
  providers: [
    AlertService,
    ...fromServices.services
  ]
})
export class BookingModule { }
