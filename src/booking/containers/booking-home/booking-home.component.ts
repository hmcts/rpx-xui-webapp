import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
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
    private readonly bookingService: BookingService
  ) { }

  public ngOnInit() {
    this.bookingTypeForm = this.fb.group({
      bookingType: new FormControl(null)
    });

  //   this.existingBookingsSubscription = this.bookingService.getBookings().pipe(
  //     map(res => (res as any).bookings.sort(this.sortFunction)
  // ).subscribe(response => {
  //     this.existingBookings = response.bookings;
  //     this.assignBookingLocation();
  //   });

    this.existingBookingsSubscription = this.bookingService.getBookings().subscribe(response => {
    this.existingBookings = response.bookings;
    this.assignBookingLocation();
    this.orderByCurrentThenFeature(); 
    });

  }

  private orderByCurrentThenFeature() {
    const featureBookings: Booking[]  = this.existingBookings.filter(p => new Date().getTime() < new Date(p.beginTime).getTime()).sort(this.sortFunction);
    const currentBookings: Booking[]  = this.existingBookings.filter(p => new Date().getTime() > new Date(p.beginTime).getTime()).sort(this.sortFunction);

    this.existingBookings = currentBookings.sort(this.sortFunction);
    this.existingBookings.push(...featureBookings.sort(this.sortFunction));
  }

  private sortFunction(a, b) {
    const dateA = new Date(a.beginTime).getTime();
    const dateB = new Date(b.beginTime).getTime();
    if ( a.locationName > b.locationName) { return 1; }
    if ( a.locationName < b.locationName) { return -1; }
    if ( dateA > dateB) { return 1; }
    if ( dateA < dateB) { return -1; }
    return 0;
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



}
