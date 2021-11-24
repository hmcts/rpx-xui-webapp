import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookingNavigation } from '../../models/booking-navigation.interface';
import { Booking } from '../../models/booking.interface';
import { BookingService } from '../../services';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingNavigationEvent, NewBooking } from '../../models';

@Component({
  selector: 'exui-booking-home',
  templateUrl: './booking-home.component.html'
})
export class BookingHomeComponent implements OnInit, OnDestroy {

  @Input() public newBooking: NewBooking;

  @Output() public newBookingChange = new EventEmitter<NewBooking>();
  @Output() public eventTrigger = new EventEmitter();

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
  public onSelectOption(index) {
    this.newBooking.bookingOptionIndex = index;
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

  public onEventTrigger() {
    this.eventTrigger.emit(BookingNavigationEvent.HOMECONTINUE);
  }

}
