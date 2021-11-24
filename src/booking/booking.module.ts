import * as fromContainers from './containers';
import * as fromServices from './services';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { SharedModule } from '../app/shared/shared.module';
import { bookingRouting } from './booking.routes';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    bookingRouting,
    SharedModule,
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
