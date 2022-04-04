import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ERROR_MESSAGE, EXCLUSION_OPTION } from '../../../constants';
import { SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import { RoleAllocationCaptionText, RoleAllocationTitleText } from '../../../models/enums';
import { SpecificAccessNavigation } from '../../../models/specific-access-navigation.interface';
import * as fromFeature from '../../../store';
import { UserDetails } from '../../../../app/models';

@Component({
  selector: 'exui-specific-access-review',
  templateUrl: './specific-access-review.component.html'
})

export class SpecificAccessReviewComponent implements OnInit, OnDestroy {

  public ERROR_MESSAGE = ERROR_MESSAGE;
  @Input() public navEvent: SpecificAccessNavigation;
  public title = RoleAllocationTitleText.ExclusionAllocate;
  public caption = RoleAllocationCaptionText.Exclusion;
  public userDetails$: Observable<UserDetails>;

  public submitted: boolean = false;

  public formGroup: FormGroup;
  public radioOptionControl: FormControl;
  public radioControlName: string = EXCLUSION_OPTION;

  public specificAccessStateDataSub: Subscription;

  constructor(private readonly store: Store<fromFeature.State>) {
  }

  public ngOnInit(): void {

  }

  public navigationHandler(navEvent: SpecificAccessNavigationEvent) {
    this.dispatchEvent(navEvent);
  }

  public dispatchEvent(navEvent: SpecificAccessNavigationEvent) {
    switch (navEvent) {
      case SpecificAccessNavigationEvent.CONTINUE:
        this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_DURATION));
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
