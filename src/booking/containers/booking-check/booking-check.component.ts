import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingNavigation } from '../../models';

@Component({
  selector: 'exui-booking-check',
  templateUrl: './booking-check.component.html',
  styleUrls: ['./booking-check.component.scss']
})
export class BookingCheckComponent implements OnInit {

  @Input() public navEvent: BookingNavigation;
  @Input() public bookingOptionIndex: number;

  @Output() public bookingOptionIndexChange = new EventEmitter<boolean>();

  constructor() { }

  public ngOnInit() {
  }

  public onChange(index) {
    this.bookingOptionIndexChange.emit(index);
  }

}
