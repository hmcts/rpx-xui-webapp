import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../app/shared/shared.module';
import { bookingRouting } from './booking.routes';
import * as fromComponents from './components';
import { BookingNavigationComponent } from './components/booking-navigation/booking-navigation.component';
import { BookingLocationComponent } from './containers/booking-location/booking-location.component';
import { BookingDateComponent } from './containers/booking-date/booking-date.component';
import { BookingCheckComponent } from './containers/booking-check/booking-check.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    bookingRouting,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    ... fromComponents.components,
    ...fromContainers.containers,
    BookingNavigationComponent
  ],
  providers: [
    AlertService
  ]
})
export class BookingModule { }
