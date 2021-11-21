
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { SharedModule } from '../app/shared/shared.module';
import { bookingRouting } from './booking.routes';
import * as fromComponents from './components';
import { BookingNavigationComponent } from './components/booking-navigation/booking-navigation.component';
import * as fromContainers from './containers';
import * as fromServices from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    bookingRouting,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...fromComponents.components,
    ...fromContainers.containers,
    BookingNavigationComponent
  ],
  providers: [
    AlertService,
    ...fromServices.services
  ]
})
export class BookingModule { }
