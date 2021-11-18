import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingNavigation } from '../../models/booking-navigation.interface';

@Component({
  selector: 'exui-booking-home',
  templateUrl: './booking-home.component.html',
  styleUrls: ['./booking-home.component.scss']
})
export class BookingHomeComponent implements OnInit {

  @Input() public navEvent: BookingNavigation;
  @Input() public bookingOptionIndex: number;

  @Output() public bookingOptionIndexChange = new EventEmitter<boolean>();

  constructor() { }

  public ngOnInit() {
  }

  public selectOption(index) {
    this.bookingOptionIndexChange.emit(index);
  }

}

