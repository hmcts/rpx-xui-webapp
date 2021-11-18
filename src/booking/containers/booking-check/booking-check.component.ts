import { Component, Input, OnInit } from '@angular/core';
import { BookingNavigation } from '../../models';

@Component({
  selector: 'exui-booking-check',
  templateUrl: './booking-check.component.html',
  styleUrls: ['./booking-check.component.scss']
})
export class BookingCheckComponent implements OnInit {

  @Input() public navEvent: BookingNavigation;

  constructor() { }

  public ngOnInit() {
  }

}
