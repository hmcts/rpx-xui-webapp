import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { switchMap } from 'rxjs/operators';
import { SessionStorageService } from '../../../app/services/session-storage/session-storage.service';
import { TaskListFilterComponent } from '../../../work-allocation-2/components';
import { BookingNavigationEvent, BookingProcess, BookingRequest } from '../../models';
import { BookingService } from '../../services';

@Component({
  selector: 'exui-booking-check',
  templateUrl: './booking-check.component.html',
  styleUrls: ['./booking-check.component.scss']
})
export class BookingCheckComponent implements OnInit {

  @Input() public selectedBookingOption: number;
  @Input() public bookingProcess: BookingProcess;

  @Output() public bookingProcessChange = new EventEmitter<BookingProcess>();
  @Output() public eventTrigger = new EventEmitter();

  public bookingNavigationEvent: typeof BookingNavigationEvent = BookingNavigationEvent;

  constructor(
    private readonly bookingService: BookingService,
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService,
    private readonly windowService: WindowService
  ) { }

  public ngOnInit() {
  }

  public onEventTrigger(navEvent: BookingNavigationEvent): void {
    if (navEvent === BookingNavigationEvent.CONFIRM) {
      this.submitBooking();
    } else {
      this.eventTrigger.emit(navEvent);
    }
  }

  private submitBooking(): void {
    this.bookingService.refreshRoleAssignments().pipe(
      switchMap(() => {
        const payload: BookingRequest = {
          locationId: this.bookingProcess.location.epims_id,
          regionId: this.bookingProcess.location.region_id,
          beginDate: this.bookingProcess.startDate,
          endDate: this.bookingProcess.endDate
        };
        return this.bookingService.createBooking(payload);
      })
    ).subscribe(() => {
      this.sessionStorageService.removeItem(TaskListFilterComponent.FILTER_NAME);
      this.windowService.removeLocalStorage(TaskListFilterComponent.FILTER_NAME);

      this.router.navigate(['/work/my-work/list'], {
        state: {
          location: {
            id: this.bookingProcess.location.epims_id
            
            //ids: [this.bookingProcess.location.epims_id]
          }
        }
      });
    });
  }
}
