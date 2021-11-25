import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingNavigationEvent, BookingProcess } from '../../models';

@Component({
  selector: 'exui-booking-location',
  templateUrl: './booking-location.component.html',
  styleUrls: ['./booking-location.component.scss']
})
export class BookingLocationComponent {

  @Input() public bookingProcess: BookingProcess;

  @Output() public bookingProcessChange = new EventEmitter<BookingProcess>();
  @Output() public eventTrigger = new EventEmitter();

  constructor() { }

  public onInputValueChange(value: string) {
    this.bookingProcess.locationName = value;
  }

  public onEventTrigger() {
    this.eventTrigger.emit(BookingNavigationEvent.LOCATIONCONTINUE);
  }

}
