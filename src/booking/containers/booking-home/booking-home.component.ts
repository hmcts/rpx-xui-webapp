import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { combineLatest, forkJoin, Observable, Subscription, } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constants';
import { SessionStorageService } from '../../../app/services/session-storage/session-storage.service';
import { TaskListFilterComponent } from '../../../work-allocation-2/components';
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
  private combineResult$: Observable<any[]> | any;
  private existingBookingsSubscription: Subscription;
  private refreshAssignmentsSubscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly bookingService: BookingService,
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService,
    private readonly windowService: WindowService,
    private readonly featureToggleService: FeatureToggleService
  ) { }

  public ngOnInit() {
    this.bookingTypeForm = this.fb.group({
      bookingType: new FormControl(null)
    });

    this.existingBookingsSubscription = this.bookingService.getBookings().subscribe((arr) => {
      this.locations$ = arr.bookings.map(
        booking => this.bookingService.getBookingLocation(booking.base_location_id).pipe(
          map(location => {
            return {
              ...booking,
              locationName: location[0] && location[0].building_location_name
            };
          }
          ))
      );

      this.bookings$ = forkJoin(this.locations$);
      this.combineResult$ = combineLatest([this.bookings$, this.featureToggleService.isEnabled(AppConstants.FEATURE_NAMES.booking)]);
      this.combineResult$.pipe(map(([bookingResults, bookingFeatureToggle]) => {
        this.existingBookings = bookingResults as any;
        this.orderByCurrentThenFuture();
        this.bookingProcess.selectedBookingLocationIds = bookingFeatureToggle ? (bookingResults as any ).filter(p => new Date().getTime() < new Date(p.beginTime).getTime()).sort(this.sortBookings).map(p => p.base_location_id) : null;
      })).subscribe();


    });
  }

  public checkIfButtonDisabled(beginTime: Date): boolean {
    return (new Date().getTime() < new Date(beginTime).getTime());
  }

  private orderByCurrentThenFuture() {
    const featureBookings: Booking[] = this.existingBookings.filter(p => new Date().getTime() < new Date(p.beginTime).getTime()).sort(this.sortBookings);
    const currentBookings: Booking[] = this.existingBookings.filter(p => new Date().getTime() > new Date(p.beginTime).getTime()).sort(this.sortBookings);
    this.existingBookings = currentBookings.sort(this.sortBookings).concat(featureBookings.sort(this.sortBookings));
  }

  private sortBookings(current, next) {
    if (current.locationName > next.locationName) { return 1; }
    if (current.locationName < next.locationName) { return -1; }
    if (current.beginTime > next.beginTime) { return 1; }
    if (current.beginTime < next.beginTime) { return -1; }
    return 0;
  }

  public onSelectOption(index) {
    this.bookingProcess.selectedBookingOption = index;
  }

  public ngOnDestroy() {
    if (this.existingBookingsSubscription) {
      this.existingBookingsSubscription.unsubscribe();
    }
    if (this.refreshAssignmentsSubscription) {
      this.refreshAssignmentsSubscription.unsubscribe();
    }
  }

  public onEventTrigger() {
    this.eventTrigger.emit(BookingNavigationEvent.HOMECONTINUE);
  }

  public onExistingBookingSelected(locationId) {
    this.refreshAssignmentsSubscription = this.bookingService.refreshRoleAssignments().subscribe(response => {
      this.sessionStorageService.removeItem(TaskListFilterComponent.FILTER_NAME);
      this.windowService.removeLocalStorage(TaskListFilterComponent.FILTER_NAME);

      this.router.navigate(
        ['/work/my-work/list'],
        {
          state: {
            location: {
              id: locationId
            }
          }
        }
      );
    });
  }

}
