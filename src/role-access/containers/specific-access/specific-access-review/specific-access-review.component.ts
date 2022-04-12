import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractAppConfig } from '@hmcts/ccd-case-ui-toolkit';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { $enum as EnumUtil } from 'ts-enum-util';

import { UserDetails } from '../../../../app/models';
import { ERROR_MESSAGE } from '../../../constants';
import { DisplayedAccessReason, OptionsModel, RequestAccessDetails, SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import { AccessReason, SpecificAccessErrors, SpecificAccessText } from '../../../models/enums';
import { SpecificAccessNavigation } from '../../../models/specific-access-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-specific-access-review',
  templateUrl: './specific-access-review.component.html'
})

export class SpecificAccessReviewComponent implements OnInit, OnDestroy {

  public ERROR_MESSAGE = ERROR_MESSAGE;
  @Input() public navEvent: SpecificAccessNavigation;
  public title = SpecificAccessText.TITLE;
  public hint = SpecificAccessText.HINT;
  public caseRefLabel = SpecificAccessText.CASE_REF;
  public requestAccessDetails: RequestAccessDetails;
  public userDetails$: Observable<UserDetails>;
  public errorMessage = {
    title: 'There is a problem',
    description: SpecificAccessErrors.NO_SELECTION,
  };
  public optionsList: OptionsModel[];

  public submitted: boolean = false;

  public formGroup: FormGroup;
  public initialAccessReason: AccessReason;
  public reviewOptionControl: FormControl;

  public specificAccessStateDataSub: Subscription;

  public readonly accessReasons: DisplayedAccessReason[];

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<fromFeature.State>
  ) {
    this.accessReasons = [
      { reason: AccessReason.APPROVE_REQUEST, checked: false },
      { reason: AccessReason.REJECT_REQUEST, checked: false },
      { reason: AccessReason.REQUEST_MORE_INFORMATION, checked: false },
    ];
  }

  public ngOnInit(): void {
    this.specificAccessStateDataSub = this.store.pipe(select(fromFeature.getSpecificAccessState)).subscribe(
      specificAccessStateData => {
        this.initialAccessReason = specificAccessStateData.accessReason;
      }
    );
    // TODO: this ticket is blocked so mocked with those data to go through, they will be removed and implimented with actual data
    // when dependency resolved
    this.setMockData();
    this.reviewOptionControl = new FormControl(this.initialAccessReason ? this.initialAccessReason : '', [Validators.required]);
    this.formGroup = this.fb.group({
      radioSelected: this.reviewOptionControl,
    });
    this.optionsList = [
      {
        optionId: EnumUtil(AccessReason).getKeyOrDefault(AccessReason.APPROVE_REQUEST),
        optionValue: AccessReason.APPROVE_REQUEST
      },
      {
        optionId: EnumUtil(AccessReason).getKeyOrDefault(AccessReason.REJECT_REQUEST),
        optionValue: AccessReason.REJECT_REQUEST
      },
      {
        optionId: EnumUtil(AccessReason).getKeyOrDefault(AccessReason.REQUEST_MORE_INFORMATION),
        optionValue: AccessReason.REQUEST_MORE_INFORMATION
      }
    ];
  }

  public onChange(): void {
    this.submitted = false;
  }

  // remove once Access management goes live
  public setMockData(): void {
    this.requestAccessDetails = {
      caseName: 'new name',
      caseReference: 'Test reference',
      dateSubmitted: '01-01-2001',
      requestFrom: 'Test user',
      reasonForCaseAccess: 'slow Tuesday'
    };
  }

  public navigationHandler(navEvent: SpecificAccessNavigationEvent) {
    this.submitted = true;
    if (this.reviewOptionControl.invalid) {
      this.reviewOptionControl.setErrors({
        invalid: true
      });
      return;
    }
    this.dispatchEvent(navEvent);
  }

  public dispatchEvent(navEvent: SpecificAccessNavigationEvent) {
    switch (navEvent) {
      case SpecificAccessNavigationEvent.CONTINUE:
        let specificAccessState: SpecificAccessState;
        const accessReason = this.reviewOptionControl.value;
        switch (accessReason) {
          case AccessReason.APPROVE_REQUEST:
            specificAccessState = SpecificAccessState.SPECIFIC_ACCESS_DURATION;
            break;
          case AccessReason.REJECT_REQUEST:
            specificAccessState = SpecificAccessState.SPECIFIC_ACCESS_DENIED;
            break;
          case AccessReason.REQUEST_MORE_INFORMATION:
            specificAccessState = SpecificAccessState.SPECIFIC_ACCESS_INFORMATION;
            break;
          default:
            throw new Error('Invalid option');
        }
        this.store.dispatch(new fromFeature.DecideSpecificAccessAndGo({
          accessReason,
          specificAccessState
        }));
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
