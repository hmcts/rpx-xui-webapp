import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookingCheckComponent, BookingDateComponent, BookingHomeComponent, BookingLocationComponent } from '..';
import { bookingCheckVisibilityStates, bookingDateVisibilityStates, bookingHomeVisibilityStates, bookingLocationVisibilityStates } from '../../constants/pageVisibilityStates';
import { BookingNavigation, BookingNavigationEvent, BookingState } from '../../models';

@Component({
  selector: 'exui-booking-wrapper',
  templateUrl: './booking-wrapper.component.html',
  styleUrls: ['./booking-wrapper.component.scss']
})
export class BookingWrapperComponent implements OnInit {

  @ViewChild('bookingHome', { read: BookingHomeComponent })
  public bookingHomeComponent: BookingHomeComponent;

  @ViewChild('bookingLocation', { read: BookingLocationComponent })
  public bookingLocationComponent: BookingLocationComponent;

  @ViewChild('bookingDate', { read: BookingDateComponent })
  public bookingDateComponent: BookingDateComponent;

  @ViewChild('bookingCheck', { read: BookingCheckComponent })
  public bookingCheckComponent: BookingCheckComponent;

  public navEvent: BookingNavigation;
  public bookingNavigationCurrentState: BookingState;
  public bookingHomeVisibilityStates = bookingHomeVisibilityStates;
  public bookingLocationVisibilityStates = bookingLocationVisibilityStates;
  public bookingDateVisibilityStates = bookingDateVisibilityStates;
  public bookingCheckVisibilityStates = bookingCheckVisibilityStates;

  public bookingOptionIndex: number;

  constructor(private readonly router: Router) { }

  public ngOnInit() {
    this.bookingNavigationCurrentState = BookingState.HOME;
  }

  public onNavEvent(event: BookingNavigationEvent) {
    this.navEvent = {
      event,
      timestamp: Date.now()
    };
    this.navigationHandler(event);
  }

  public navigationHandler(navEvent: BookingNavigationEvent) {
    switch (navEvent) {
      case BookingNavigationEvent.BACK:
        switch (this.bookingNavigationCurrentState) {
          case BookingState.LOCATION:
            this.bookingNavigationCurrentState = BookingState.HOME;
            break;
          case BookingState.BOOKDATE:
            this.bookingNavigationCurrentState = BookingState.LOCATION;
            break;
          case BookingState.CHECK:
            this.bookingNavigationCurrentState = BookingState.BOOKDATE;
            break;
          default:
            throw new Error('Invalid Booking Back state');
        }
        break;
      case BookingNavigationEvent.HOMECONTINUE:
        if (this.bookingOptionIndex === 1) {
          this.bookingNavigationCurrentState = BookingState.LOCATION;
        } else {
          this.router.navigate(['/work/my-work/list']);
          // TODO: redirect to view tasks and cases
        }
        break;
      case BookingNavigationEvent.LOCATIONCONTINUE:
        this.bookingNavigationCurrentState = BookingState.BOOKDATE;
        break;
      case BookingNavigationEvent.BOOKINGDATESUBMIT:
        this.bookingNavigationCurrentState = BookingState.CHECK;
        break;
      case BookingNavigationEvent.CONFIRMBOOKINGDATESUBMIT:
        this.bookingNavigationCurrentState = BookingState.CHECK;
        break;
      case BookingNavigationEvent.CONFIRMBOOKINGSUBMIT:
        // TODO: Submit booking
        break;
      default:
        throw new Error('Invalid Booking state');
    }
  }

  public isComponentVisible(currentNavigationState: BookingState, requiredNavigationState: BookingState[]): boolean {
    return requiredNavigationState.includes(currentNavigationState);
  }
}
