import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Booking } from 'src/booking/models/booking.interface';
import { BookingService } from 'src/booking/services';
import { BookingNavigation } from '../../models/booking-navigation.interface';

@Component({
  selector: 'exui-booking-home',
  templateUrl: './booking-home.component.html',
  styleUrls: ['./booking-home.component.scss']
})
export class BookingHomeComponent implements OnInit, OnDestroy {

  @Input() public navEvent: BookingNavigation;
  @Input() public bookingOptionIndex: boolean;

  @Output() public bookingOptionIndexChange = new EventEmitter<boolean>();

  public bookingTypeForm: FormGroup;
  public existingBookings: Booking[];
  private existingBookingsSubscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly bookingService: BookingService
  ) { }

  public ngOnInit() {
    this.bookingTypeForm = this.fb.group({
      bookingType: new FormControl(null)
    });

    this.existingBookingsSubscription = this.bookingService.getBookings().subscribe(response => {
      this.existingBookings = response.bookings;
    });
  }

  public onChange(index) {
    this.bookingOptionIndexChange.emit(index);
  }

  public ngOnDestroy() {
    if (this.existingBookingsSubscription) {
      this.existingBookingsSubscription.unsubscribe();
    }
  }

  public getLocation(locationId: string): string {
    return locationId;
  }

}

