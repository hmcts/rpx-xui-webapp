import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { PersonRole } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ERROR_MESSAGE, PERSON_ROLE } from '../../../constants';
import { SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import { SpecificAccessNavigation } from '../../../models/specific-access-navigation.interface';
import * as fromFeature from '../../../store';
import { RoleAccessDurationBaseComponent } from '../../../common';

@Component({
  selector: 'exui-specific-access-duration',
  templateUrl: './specific-access-duration.component.html',
  styleUrls: ['./specific-access-duration.component.scss']
})
export class SpecificAccessDurationComponent extends RoleAccessDurationBaseComponent implements OnInit, OnDestroy {
  public ERROR_MESSAGE = ERROR_MESSAGE;
  @Input() public navEvent: SpecificAccessNavigation;

  public submitted: boolean = false;
  public radioOptionControl: FormControl;
  public radioControlName: string = PERSON_ROLE;

  public specificAccessStateDataSub: Subscription;

  public personRole: PersonRole;

  constructor(
    public readonly builder: FormBuilder,
    private readonly store: Store<fromFeature.State>
  ) {
    super(builder);
    // overide base component properties
    this.title = 'How long do you want to give access to this case for?';
    this.caption = 'Approve specific access request';
    this.configStart.label = 'Access starts';
    this.configEnd.label = 'Access ends';
    this.durations[0].description = 'Starts from today and ends at midnight 7 days from now.';
    this.durations[1].description = 'Access starts from today and lasts while the case is open.';
    this.durations[2].description = 'You’ll need to provide both a start and end date for access to the case.';
  }

  public ngOnInit(): void {
    this.formGroup = this.getFormGroup();
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
