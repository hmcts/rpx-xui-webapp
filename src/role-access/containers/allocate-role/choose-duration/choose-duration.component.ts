import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AllocateRoleNavigation, AllocateRoleNavigationEvent, AllocateRoleState, DurationOfRole } from '../../../models';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-choose-duration',
  templateUrl: './choose-duration.component.html',
})

export class ChooseDurationComponent implements OnInit {

  @Input() public navEvent: AllocateRoleNavigation;
  public radioSelected: string;
  public condition: boolean;
  public title: string;
  public readonly allDurations: DurationDescription [];

  constructor(private readonly store: Store<fromFeature.State>) {
    this.allDurations = [
      { duration: DurationOfRole.SEVEN_DAYS, description: 'Starts from today and ends at midnight 7 days from now.' },
      { duration: DurationOfRole.INDEFINITE, description: 'Starts from today and lasts while the case is open.' },
      { duration: DurationOfRole.ANOTHER_PERIOD, description: 'You’ll need to provide both a start and end date for the role.' }
    ]
   }

  public ngOnInit(): void {
    this.title = 'Allocate a hearing judge';
  }

  public navigationHandler(navEvent: AllocateRoleNavigationEvent): void {
    switch (navEvent) {
      case AllocateRoleNavigationEvent.CONTINUE:
        this.store.dispatch(new fromFeature.AllocateRoleChangeNavigation(AllocateRoleState.CHECK_ANSWERS));
        break;
      default:
        throw new Error('Invalid option');
    }
  }

  public onItemChange(item: DurationOfRole) {
    this.condition = item === DurationOfRole.ANOTHER_PERIOD;
  }
}

export interface DurationDescription {
  duration: DurationOfRole;
  description: string;
}
