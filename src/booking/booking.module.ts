import * as fromContainers from './containers';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { SharedModule } from '../app/shared/shared.module';
import { bookingRouting } from './booking.routes';
import { BookingGuard } from './guards/booking-guard';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { LocationDataService } from '../work-allocation/services';
import { BookingService } from './services';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    bookingRouting,
    SharedModule,
    bookingRouting,
    ExuiCommonLibModule
  ],
  declarations: [
    ...fromContainers.containers,
  ],
  providers: [
    AlertService,
    LocationDataService,
    BookingGuard,
    BookingService
  ]
})
export class BookingModule { }
