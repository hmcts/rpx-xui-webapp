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
  @Input() public bookingOptionIndex: number;

  @Output() public bookingOptionIndexChange = new EventEmitter<boolean>();

  public bookingTypeForm: FormGroup;
  public existingBookings: Booking[];
  private existingBookingsSubscription: Subscription;
  private bookingLocationSubscription: Subscription;

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
      this.assignBookingLocation();
    });
  }

  public onChange(index) {
    this.bookingOptionIndexChange.emit(index);
  }

  public assignBookingLocation() {
    this.existingBookings.forEach(booking => {
      this.bookingLocationSubscription = this.bookingService.getBookingLocation(booking.base_location_id).subscribe(location =>
        booking.locationName = location[0] && location[0].building_location_name ?
                                    location[0].building_location_name :
                                    null
      );
    });
  }

  public ngOnDestroy() {
    if (this.existingBookingsSubscription) {
      this.existingBookingsSubscription.unsubscribe();
    }
    if (this.bookingLocationSubscription) {
      this.bookingLocationSubscription.unsubscribe();
    }
  }

}

