import * as fromComponents from './components';
import * as fromContainers from './containers';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';

import { SharedModule } from '../app/shared/shared.module';
import { bookingRouting } from './booking.routes';
import { BookingNavigationComponent } from './components/booking-navigation/booking-navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    bookingRouting,
    ExuiCommonLibModule,
    SharedModule
  ],
  declarations: [
    ...fromComponents.components,
    ...fromContainers.containers,
    BookingNavigationComponent
  ],
  providers: [
    AlertService
  ]
})
export class BookingModule { }
