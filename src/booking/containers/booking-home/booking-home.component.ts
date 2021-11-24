import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingNavigationEvent, NewBooking } from '../../models';

@Component({
  selector: 'exui-booking-home',
  templateUrl: './booking-home.component.html',
  styleUrls: ['./booking-home.component.scss']
})
export class BookingHomeComponent implements OnInit {

  @Input() public newBooking: NewBooking;

  @Output() public newBookingChange = new EventEmitter<NewBooking>();
  @Output() public eventTrigger = new EventEmitter();

  constructor() { }

  public ngOnInit() {
  }

  public onSelectOption(index) {
    this.newBooking.bookingOptionIndex = index;
  }

  public onEventTrigger() {
    this.eventTrigger.emit(BookingNavigationEvent.HOMECONTINUE);
  }

}
