import { Component, Input, OnInit } from '@angular/core';
import { BookingNavigation } from '../../models';

@Component({
  selector: 'exui-booking-location',
  templateUrl: './booking-location.component.html',
  styleUrls: ['./booking-location.component.scss']
})
export class BookingLocationComponent implements OnInit {

  @Input() public navEvent: BookingNavigation;

  constructor() { }

  public ngOnInit() {
  }

}
