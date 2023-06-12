import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../../../app/models';
import { SessionStorageService } from '../../../app/services/session-storage/session-storage.service';
import { bookingBackButtonVisibilityStates, bookingCheckVisibilityStates, bookingDateVisibilityStates, bookingHomeVisibilityStates, bookingLocationVisibilityStates } from '../../constants/pageVisibilityStates';
import { BookingNavigation, BookingNavigationEvent, BookingProcess, BookingState } from '../../models';

@Component({
  selector: 'exui-booking-wrapper',
  templateUrl: './booking-wrapper.component.html',
  styleUrls: ['./booking-wrapper.component.scss']
})
export class BookingWrapperComponent implements OnInit {
  public backVisibilityStates = bookingBackButtonVisibilityStates;
  public bookingNavigationCurrentState: BookingState;
  public bookingNavigationEvent = BookingNavigationEvent;
  public bookingHomeVisibilityStates = bookingHomeVisibilityStates;
  public bookingLocationVisibilityStates = bookingLocationVisibilityStates;
  public bookingDateVisibilityStates = bookingDateVisibilityStates;
  public bookingCheckVisibilityStates = bookingCheckVisibilityStates;
  public navEvent: BookingNavigation;
  public bookingProcess = {} as BookingProcess;
  public userId: string;

  constructor(
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService
  ) {}

  public ngOnInit() {
    this.bookingNavigationCurrentState = BookingState.HOME;

    const userInfoStr = this.sessionStorageService.getItem('userDetails');

    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      this.userId = userInfo.id ? userInfo.id : userInfo.uid;
    }
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
      case BookingNavigationEvent.CHANGELOCATIONCLICK:
        if (this.bookingProcess.selectedBookingOption === 1) {
          this.bookingNavigationCurrentState = BookingState.LOCATION;
        } else {
          this.router.navigate(
            ['/work/my-work/list'],
            {
              state: {
                location: {
                  ids: this.bookingProcess.selectedBookingLocationIds
                }
              }
            }
          );
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
      case BookingNavigationEvent.CHANGEDURATIONCLICK:
        this.bookingNavigationCurrentState = BookingState.BOOKDATE;
        break;
      case BookingNavigationEvent.CANCEL:
        this.bookingProcess = {} as BookingProcess;
        this.bookingNavigationCurrentState = BookingState.HOME;
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
