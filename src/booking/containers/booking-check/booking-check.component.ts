import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SessionStorageService } from '../../../app/services/session-storage/session-storage.service';
import { TaskListFilterComponent } from '../../../work-allocation/components';
import { BookingNavigationEvent, BookingProcess, BookingRequest } from '../../models';
import { BookingService } from '../../services';
import { CreateBookingHandleError, RefreshBookingHandleError } from '../utils/booking-error-handler';

@Component({
  selector: 'exui-booking-check',
  templateUrl: './booking-check.component.html',
  styleUrls: ['./booking-check.component.scss']
})
export class BookingCheckComponent {
  @Input() public selectedBookingOption: number;
  @Input() public bookingProcess: BookingProcess;
  @Input() public userId: string;

  @Output() public bookingProcessChange = new EventEmitter<BookingProcess>();
  @Output() public eventTrigger = new EventEmitter();

  public bookingNavigationEvent: typeof BookingNavigationEvent = BookingNavigationEvent;

  constructor(
    private readonly bookingService: BookingService,
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService,
    private readonly windowService: WindowService
  ) {}

  public onEventTrigger(navEvent: BookingNavigationEvent): void {
    if (navEvent === BookingNavigationEvent.CONFIRM) {
      this.submitBooking();
    } else {
      this.eventTrigger.emit(navEvent);
    }
  }

  private submitBooking(): void {
    const payload: BookingRequest = {
      userId: this.userId,
      locationId: this.bookingProcess.location.epimms_id,
      regionId: this.bookingProcess.location.region_id,
      beginDate: this.bookingProcess.startDate,
      endDate: this.bookingProcess.endDate
    };
    const givenDate = payload.beginDate;
    if (givenDate) {
      // issue previously with API rejecting DST because time was today 00:00 but UTC was yesterday 23:00
      // only replace the time if current status is DST
      if (payload.beginDate.getHours() !== payload.beginDate.getUTCHours()) {
        payload.beginDate = new Date(Date.UTC(
          givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate(), 0, 0, 0, 0
        ));
      }
    }
    const endDate = payload.endDate;
    if (endDate) {
      // issue previously with API rejecting DST because time was today 00:00 but UTC was yesterday 23:00
      // only replace the time if current status is DST
      if (payload.endDate.getHours() !== payload.endDate.getUTCHours()) {
        payload.endDate = new Date(Date.UTC(
          givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate(), 23, 59, 59, 999
        ));
      }
    }
    this.bookingService.createBooking(payload).pipe(
      switchMap(() => {
        return this.bookingService.refreshRoleAssignments(this.userId).pipe(
          catchError(err => {
            return throwError({...err, case : 'refreshRoleAssignments'});
          })
        );
      }),
      catchError(err => {
        if ( !err.case) {
        return throwError({...err, case : 'createBooking'});
      }
        return throwError({...err, case : 'refreshRoleAssignments'});
    })
    ).subscribe(() => {
      this.sessionStorageService.removeItem(TaskListFilterComponent.FILTER_NAME);
      this.windowService.removeLocalStorage(TaskListFilterComponent.FILTER_NAME);
      this.router.navigate(['/work/my-work/list'], {
        state: {
          location: {
            ids: [this.bookingProcess.location.epimms_id]
          }
        }
      });
    },
    err => {
      if ( err.case === 'createBooking') {
        CreateBookingHandleError(err, this.router);
      } else {
        RefreshBookingHandleError(err, this.router);
      }
    });
  }
}
