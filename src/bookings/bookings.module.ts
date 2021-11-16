import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { bookingsRouting } from './bookings.routes';
// from containers
import * as fromContainers from './containers';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    bookingsRouting,
  ],
  declarations: [...fromContainers.containers],
  providers: [
  ]
})

export class BookingsModule { }
