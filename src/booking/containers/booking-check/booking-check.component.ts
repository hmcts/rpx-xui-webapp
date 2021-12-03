import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingNavigationEvent, BookingProcess } from '../../models';

@Component({
  selector: 'exui-booking-check',
  templateUrl: './booking-check.component.html',
  styleUrls: ['./booking-check.component.scss']
})
export class BookingCheckComponent implements OnInit {

  @Input() public selectedBookingOption: number;
  @Input() public bookingProcess: BookingProcess;

  @Output() public bookingProcessChange = new EventEmitter<BookingProcess>();
  @Output() public eventTrigger = new EventEmitter();

  constructor() { }

  public ngOnInit() {
  }

  public onEventTrigger() {
    this.eventTrigger.emit(BookingNavigationEvent.CONFIRMBOOKINGDATESUBMIT);
  }

}
