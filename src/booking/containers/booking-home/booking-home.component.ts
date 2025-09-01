import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import * as moment from 'moment';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../../app/app.constants';
import { SessionStorageService } from '../../../app/services/session-storage/session-storage.service';
import { TaskListFilterComponent } from '../../../work-allocation/components';
import { Booking, BookingNavigationEvent, BookingProcess } from '../../models';
import { BookingService } from '../../services';

@Component({
  selector: 'exui-booking-home',
  templateUrl: './booking-home.component.html',
  styleUrls: ['./booking-home.component.scss']
})
export class BookingHomeComponent implements OnInit, OnDestroy {
  @Input() public bookingProcess: BookingProcess;
  @Input() public userId: string;
  @Output() public bookingProcessChange = new EventEmitter<BookingProcess>();
  @Output() public eventTrigger = new EventEmitter();

  public bookingTypeForm: FormGroup;
  public existingBookings: Booking[];
  private combineResult$: Observable<any[]> | any;
  private existingBookingsSubscription: Subscription;
  private refreshAssignmentsSubscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly bookingService: BookingService,
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService,
    private readonly windowService: WindowService,
    private readonly featureToggleService: FeatureToggleService,
  ) {}

  public ngOnInit() {
    this.bookingTypeForm = this.fb.group({
      bookingType: new FormControl(null)
    });
    const bookableServices = JSON.parse(this.sessionStorageService.getItem('bookableServices'));
    if (this.userId) {
      this.existingBookingsSubscription = this.bookingService.getBookings(this.userId, bookableServices).subscribe((bookings) => {
        if (bookings) {
          this.existingBookings = bookings as any;
          this.orderByCurrentThenFuture();
          this.bookingProcess.selectedBookingLocationIds = (bookings as any).filter((p) => moment(new Date()).isSameOrAfter(p.beginTime) && moment(new Date()).isSameOrBefore(p.endTime)).sort(this.sortBookings).map((p) => p.locationId);
          this.sessionStorageService.setItem('bookingLocations', JSON.stringify(Array.from(new Set(this.bookingProcess.selectedBookingLocationIds))));
        }
      },
      (err) => {
        this.NavigationErrorHandler(err, this.router);
      });
    }
  }

  public checkIfButtonDisabled(beginTime: Date): boolean {
    return (new Date().getTime() < new Date(beginTime).getTime());
  }

  private orderByCurrentThenFuture() {
    const featureBookings: Booking[] = this.existingBookings.filter((p) => new Date().getTime() < new Date(p.beginTime).getTime()).sort(this.sortBookings);
    const currentBookings: Booking[] = this.existingBookings.filter((p) => new Date().getTime() > new Date(p.beginTime).getTime()).sort(this.sortBookings);
    this.existingBookings = currentBookings.sort(this.sortBookings).concat(featureBookings.sort(this.sortBookings));
  }

  private sortBookings(current, next) {
    if (current.locationName > next.locationName) {
      return 1;
    }
    if (current.locationName < next.locationName) {
      return -1;
    }
    if (current.beginTime > next.beginTime) {
      return 1;
    }
    if (current.beginTime < next.beginTime) {
      return -1;
    }
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

  public getPreviousDate(givenDate: Date): Date {
    const date = new Date(givenDate);
    date.setDate(date.getDate() - 1);
    return date;
  }

  public onEventTrigger() {
    this.eventTrigger.emit(BookingNavigationEvent.HOMECONTINUE);
  }

  public onExistingBookingSelected(locationId) {
    this.refreshAssignmentsSubscription = this.bookingService.refreshRoleAssignments(this.userId).subscribe(() => {
      this.sessionStorageService.removeItem(TaskListFilterComponent.FILTER_NAME);
      this.windowService.removeLocalStorage(TaskListFilterComponent.FILTER_NAME);
      this.router.navigate(
        ['/work/my-work/list'],
        {
          state: {
            location: {
              ids: [locationId]
            }
          }
        }
      );
    });
  }

  public NavigationErrorHandler = (error: any, navigator: { navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> }): void => {
    if (error && error.status) {
      if (error.status >= 500 && error.status < 600) {
        navigator.navigate(['/service-down']);
        return;
      }
      switch (error.status) {
        case 401:
        case 403: {
          navigator.navigate(['/not-authorised']);
          return;
        }
        default: {
          navigator.navigate(['/booking-system-error']);
        }
      }
    }
  };
}
