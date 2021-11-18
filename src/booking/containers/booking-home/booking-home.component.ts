import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BookingNavigationEvent } from '../../models';
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

  public bookingTypeForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder
  ) { }

  public ngOnInit() {
    this.bookingTypeForm = this.fb.group({
      bookingType: new FormControl(null)
    });
  }

  public onChange(index) {
    this.bookingOptionIndexChange.emit(index);
  }

}

