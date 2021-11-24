import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingNavigationEvent, NewBooking } from '../../models';

@Component({
  selector: 'exui-booking-check',
  templateUrl: './booking-check.component.html',
  styleUrls: ['./booking-check.component.scss']
})
export class BookingCheckComponent implements OnInit {

  @Input() public bookingOptionIndex: number;
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
