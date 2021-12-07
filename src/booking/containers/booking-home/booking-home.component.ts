import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Booking, BookingNavigationEvent, BookingProcess } from '../../models';
import { BookingService } from '../../services';

@Component({
  selector: 'exui-booking-home',
  templateUrl: './booking-home.component.html'
})
export class BookingHomeComponent implements OnInit, OnDestroy {

  @Input() public bookingProcess: BookingProcess;

  @Output() public bookingProcessChange = new EventEmitter<BookingProcess>();
  @Output() public eventTrigger = new EventEmitter();

  public bookingTypeForm: FormGroup;
  public existingBookings: Booking[];
  private existingBookingsSubscription: Subscription;
  private bookingLocationSubscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly bookingService: BookingService,
    private readonly router: Router
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

  public onSelectOption(index) {
    this.bookingProcess.selectedBookingOption = index;
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

  public onExistingBookingSelected(locationId) {
    this.router.navigate(['/work/my-work/list'], { queryParams: { epimms_id: locationId }});
  }

}
