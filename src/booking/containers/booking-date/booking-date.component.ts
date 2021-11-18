import { Component, Input, OnInit } from '@angular/core';
import { BookingNavigation } from '../../models';

@Component({
  selector: 'exui-booking-date',
  templateUrl: './booking-date.component.html',
  styleUrls: ['./booking-date.component.scss']
})
export class BookingDateComponent implements OnInit {

  @Input() public navEvent: BookingNavigation;

  constructor() { }

  public ngOnInit() {
  }

}
