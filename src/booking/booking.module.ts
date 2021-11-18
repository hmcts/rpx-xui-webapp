import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../app/shared/shared.module';
import { bookingRouting } from './booking.routes';
import { BookingNavigationComponent } from './components/booking-navigation/booking-navigation.component';
import { BookingLocationComponent } from './containers/booking-location/booking-location.component';
import { BookingDateComponent } from './containers/booking-date/booking-date.component';
import { BookingCheckComponent } from './containers/booking-check/booking-check.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    bookingRouting,
    SharedModule
  ],
  declarations: [
    ... fromComponents.components,
    ...fromContainers.containers,
    BookingNavigationComponent,
    BookingLocationComponent,
    BookingDateComponent,
    BookingCheckComponent
  ],
  providers: [
    AlertService
  ]
})
export class BookingModule { }
