import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../app/shared/shared.module';
import { bookingRouting } from './booking.routes';
import * as fromComponents from './components';
import { BookingNavigationComponent } from './components/booking-navigation/booking-navigation.component';
import * as fromContainers from './containers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    bookingRouting,
    SharedModule
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
