import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingNavigationEvent, NewBooking } from '../../models';

@Component({
  selector: 'exui-booking-location',
  templateUrl: './booking-location.component.html',
  styleUrls: ['./booking-location.component.scss']
})
export class BookingLocationComponent {

  @Input() public newBooking: NewBooking;

  @Output() public newBookingChange = new EventEmitter<NewBooking>();
  @Output() public eventTrigger = new EventEmitter();

  constructor() { }

  public onInputValueChange(value: string) {
    this.newBooking.locationName = value;
  }

  public onEventTrigger() {
    this.eventTrigger.emit(BookingNavigationEvent.LOCATIONCONTINUE);
  }

}
