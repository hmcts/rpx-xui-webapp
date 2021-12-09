import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
    private readonly router: Router
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
          locationId: this.bookingProcess.locationId,
          regionId: this.bookingProcess.regionId,
          beginDate: this.bookingProcess.startDate,
          endDate: this.bookingProcess.endDate
        };
        return this.bookingService.createBooking(payload);
      })
    ).subscribe(() => {
      this.router.navigate(['/work/my-work/list']);
    });
  }
}
