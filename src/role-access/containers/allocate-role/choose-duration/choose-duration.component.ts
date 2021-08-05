import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AllocateRoleNavigation, AllocateRoleNavigationEvent, AllocateRoleState, DurationOfRole, Period } from '../../../models';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-choose-duration',
  templateUrl: './choose-duration.component.html',
})

export class ChooseDurationComponent implements OnInit {

  public static sevenDaysDesc = 'Starts from today and ends at midnight 7 days from now.';
  public static indefiniteDesc = 'Starts from today and lasts while the case is open.';
  public static anotherPeriodDesc = 'You’ll need to provide both a start and end date for the role.';

  @Input() public navEvent: AllocateRoleNavigation;
  public radioSelected: string;
  public condition: boolean;
  public title: string;
  public readonly allDurations: DurationDescription [];
  public selectedDuration: DurationOfRole;
  public dayStartDate: number;
  public monthStartDate: number;
  public yearStartDate: number;
  public dayEndDate: number;
  public monthEndDate: number;
  public yearEndDate: number;


  constructor(private readonly store: Store<fromFeature.State>) {
    this.allDurations = [
      { duration: DurationOfRole.SEVEN_DAYS, description: ChooseDurationComponent.sevenDaysDesc },
      { duration: DurationOfRole.INDEFINITE, description:  ChooseDurationComponent.indefiniteDesc },
      { duration: DurationOfRole.ANOTHER_PERIOD, description: ChooseDurationComponent.anotherPeriodDesc }
    ]
   }

  public ngOnInit(): void {
    this.title = 'Allocate a hearing judge';
  }

  public navigationHandler(navEvent: AllocateRoleNavigationEvent): void {
    const period = this.getPeriod(this.selectedDuration);
    switch (navEvent) {
      case AllocateRoleNavigationEvent.CONTINUE:
        this.store.dispatch(new fromFeature.ChooseDurationAndGo({
            durationOfRole: this.selectedDuration,
            period,
            allocateRoleState: AllocateRoleState.CHECK_ANSWERS}
          ));
        break;
      default:
        throw new Error('Invalid option');
    }
  }

  public getPeriod(duration: DurationOfRole): Period {
    switch (duration) {
      case DurationOfRole.SEVEN_DAYS: {
        const nextDate = new Date().setDate(new Date().getDate() + 7);
        return {
          startDate: new Date(),
          endDate: new Date(nextDate)
        }
      }
      case DurationOfRole.INDEFINITE: {
        return {
          startDate: new Date(),
          endDate: null
        }
      }
      case DurationOfRole.ANOTHER_PERIOD: {
        return {
          startDate: new Date(this.yearStartDate, this.monthStartDate - 1, this.dayStartDate),
          endDate: new Date(this.yearEndDate, this.monthEndDate - 1, this.dayEndDate),
        }
      }
    }
  }

  public onItemChange(item: DurationOfRole) {
    this.condition = item === DurationOfRole.ANOTHER_PERIOD;
    this.selectedDuration = item;
  }
}

export interface DurationDescription {
  duration: DurationOfRole;
  description: string;
}
