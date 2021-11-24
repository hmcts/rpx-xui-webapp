import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingNavigationEvent, NewBooking } from '../../models';

@Component({
  selector: 'exui-booking-date',
  templateUrl: './booking-date.component.html',
  styleUrls: ['./booking-date.component.scss']
})
export class BookingDateComponent implements OnInit {

  @Input() public newBooking: NewBooking;

  @Output() public newBookingChange = new EventEmitter<NewBooking>();
  @Output() public eventTrigger = new EventEmitter();

  constructor() { }

  public ngOnInit() {
  }

  public onEventTrigger() {
    this.eventTrigger.emit(BookingNavigationEvent.CONFIRMBOOKINGDATESUBMIT);
  }

}
