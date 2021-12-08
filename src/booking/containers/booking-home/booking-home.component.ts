import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin, Observable, Subscription,  } from 'rxjs';
import { map } from 'rxjs/operators';
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
  private bookings$: Observable<any[]> | any;
  private locations$: Observable<any>[];
  private existingBookingsSubscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly bookingService: BookingService
  ) { }

  public ngOnInit() {
    this.bookingTypeForm = this.fb.group({
      bookingType: new FormControl(null)
    });

    this.existingBookingsSubscription = this.bookingService.getBookings().subscribe((arr) => {
      this.locations$ = arr.bookings.map(
        booking =>  this.bookingService.getBookingLocation(booking.base_location_id).pipe(
          map( location => {
            return {
              ...booking,
              locationName: location[0] && location[0].building_location_name  } ;
          }
        ))
      );

      this.bookings$ = forkJoin(this.locations$);
      this.bookings$.subscribe(( result) => {
        this.existingBookings = result;
        this.orderByCurrentThenFuture();
      });
    });
  }

  public checkIfButtonDisabled(beginTime: Date): boolean {
    return (new Date().getTime() < new Date(beginTime).getTime());
  }

  private orderByCurrentThenFuture() {
    const featureBookings: Booking[]  = this.existingBookings.filter(p => new Date().getTime() < new Date(p.beginTime).getTime()).sort(this.sortBookings);
    const currentBookings: Booking[]  = this.existingBookings.filter(p => new Date().getTime() > new Date(p.beginTime).getTime()).sort(this.sortBookings);
    this.existingBookings = currentBookings.sort(this.sortBookings).concat(featureBookings.sort(this.sortBookings));
  }

  private sortBookings(current, next) {
    if ( current.locationName > next.locationName) { return 1; }
    if ( current.locationName < next.locationName) { return -1; }
    if ( current.beginTime > next.beginTime) { return 1; }
    if ( current.beginTime < next.beginTime) { return -1; }
    return 0;
  }

  public onSelectOption(index) {
    this.bookingProcess.selectedBookingOption = index;
  }

  public ngOnDestroy() {
    if (this.bookings$) {
      this.bookings$.unsubscribe();
    }
    if (this.existingBookingsSubscription) {
      this.existingBookingsSubscription.unsubscribe();
    }
  }

  public onEventTrigger() {
    this.eventTrigger.emit(BookingNavigationEvent.HOMECONTINUE);
  }

}
