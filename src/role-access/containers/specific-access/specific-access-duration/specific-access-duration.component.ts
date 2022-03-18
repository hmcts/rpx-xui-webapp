import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PersonRole } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { ERROR_MESSAGE, PERSON_ROLE } from '../../../constants';
import { SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import { SpecificAccessNavigation } from '../../../models/specific-access-navigation.interface';
import * as fromFeature from '../../../store';
import { DurationType } from '../../../models/enums';
import { Duration } from '../../../common';

@Component({
  selector: 'exui-specific-access-duration',
  templateUrl: './specific-access-duration.component.html',
  styleUrls: ['./specific-access-duration.component.scss']
})
export class SpecificAccessDurationComponent implements OnInit, OnDestroy {
  public ERROR_MESSAGE = ERROR_MESSAGE;
  @Input() public navEvent: SpecificAccessNavigation;

  public submitted: boolean = false;
  public radioOptionControl: FormControl;
  public radioControlName: string = PERSON_ROLE;

  public specificAccessStateDataSub: Subscription;

  public personRole: PersonRole;

  public defaultDuration = DurationType.SEVEN_DAYS;
  public durations: Duration[] = [
    { id: '1', name: DurationType.SEVEN_DAYS, description: 'Starts from today and ends at midnight 7 days from now.', checked: false },
    { id: '2', name: DurationType.INDEFINITE, description: 'Access starts from today and lasts while the case is open.', checked: false },
    { id: '3', name: DurationType.ANOTHER_PERIOD, description: 'You’ll need to provide both a start and end date for access to the case.', checked: false }
  ];
  public configEnd: GovUiConfigModel = {
    id: 'endDate',
    name: 'endDate',
    hint: 'For example, 01 01 2022',
    label: 'Access Ends'
  }
  public configStart: GovUiConfigModel = {
    id: 'startDate',
    name: 'startDate',
    hint: 'For example, 01 01 2022',
    label: 'Access Starts'
  };

  constructor(
    private readonly store: Store<fromFeature.State>
  ) {
  }

  public ngOnInit(): void {

  }

  public navigationHandler(navEvent: SpecificAccessNavigationEvent) {
    this.submitted = true;
    this.dispatchEvent(navEvent);
  }

  public dispatchEvent(navEvent: SpecificAccessNavigationEvent) {
    switch (navEvent) {
      case SpecificAccessNavigationEvent.CONTINUE:
        this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_APPROVED));
        break;
      default:
        throw new Error('Invalid option');
    }
  }

  public ngOnDestroy(): void {
    if (this.specificAccessStateDataSub) {
      this.specificAccessStateDataSub.unsubscribe();
    }
  }
}
