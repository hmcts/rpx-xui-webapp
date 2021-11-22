import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { bookingBackButtonVisibilityStates, bookingCheckVisibilityStates, bookingDateVisibilityStates, bookingHomeVisibilityStates, bookingLocationVisibilityStates } from '../../constants/pageVisibilityStates';
import { BookingNavigationEvent } from '../../models';
import { BookingState } from '../../models/booking-state.enum';

@Component({
  selector: 'exui-booking-navigation',
  templateUrl: './booking-navigation.component.html',
  styleUrls: ['./booking-navigation.component.scss']
})
export class BookingNavigationComponent {

  constructor() { }

  @Input() private readonly currentNavigationState: BookingState;
  @Input() private readonly bookingOptionIndex: number;

  @Output() public eventTrigger = new EventEmitter();

  public bookingNavigationEvent = BookingNavigationEvent;

  public homeVisibilityStates = bookingHomeVisibilityStates;
  public locationVisibilityStates = bookingLocationVisibilityStates;
  public dateVisibilityStates = bookingDateVisibilityStates;
  public checkBookingVisibilityStates = bookingCheckVisibilityStates;

  public backVisibilityStates = bookingBackButtonVisibilityStates;

  public isVisible(visibleNavigationStates: BookingState[]): boolean {
    return visibleNavigationStates.includes(this.currentNavigationState) && this.bookingOptionIndex > 0;
  }

  public onEventTrigger(event: BookingNavigationEvent) {
    this.eventTrigger.emit(event);
  }

}
