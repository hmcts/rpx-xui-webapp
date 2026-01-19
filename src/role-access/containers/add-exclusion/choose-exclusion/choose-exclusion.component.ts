import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { $enum as EnumUtil } from 'ts-enum-util';
import { UserDetails } from '../../../../app/models';
import * as fromRoot from '../../../../app/store';
import { ERROR_MESSAGE, EXCLUSION_OPTION } from '../../../constants';
import { ExcludeOption, ExclusionNavigationEvent, ExclusionState } from '../../../models';
import { RoleAllocationCaptionText, RoleAllocationTitleText } from '../../../models/enums';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import { OptionsModel } from '../../../models/options-model';
import * as fromFeature from '../../../store';

@Component({
  standalone: false,
  selector: 'exui-choose-exclusion',
  templateUrl: './choose-exclusion.component.html'
})

export class ChooseExclusionComponent implements OnInit, OnDestroy {
  public ERROR_MESSAGE = ERROR_MESSAGE;
  @Input() public navEvent: ExclusionNavigation;
  public title = RoleAllocationTitleText.ExclusionAllocate;
  public caption = RoleAllocationCaptionText.Exclusion;
  public userDetails$: Observable<UserDetails>;

  public submitted: boolean = false;

  public formGroup: FormGroup;
  public radioOptionControl: FormControl;
  public radioControlName: string = EXCLUSION_OPTION;

  public exclusionStateDataSub: Subscription;
  public exclusionOption: ExcludeOption;

  public excludeMe: OptionsModel = {
    optionId: EnumUtil(ExcludeOption).getKeyOrDefault(ExcludeOption.EXCLUDE_ME),
    optionValue: ExcludeOption.EXCLUDE_ME
  };

  public excludeOther: OptionsModel = {
    optionId: EnumUtil(ExcludeOption).getKeyOrDefault(ExcludeOption.EXCLUDE_ANOTHER_PERSON),
    optionValue: ExcludeOption.EXCLUDE_ANOTHER_PERSON
  };

  public optionsList: OptionsModel[] = [this.excludeMe, this.excludeOther];

  constructor(private readonly store: Store<fromFeature.State>) {}

  public ngOnInit(): void {
    const roleAccessState$ = this.store.pipe(select(fromFeature.getRoleAccessState));
    this.userDetails$ = this.store.pipe(select(fromRoot.getUserDetails));
    combineLatest([roleAccessState$, this.userDetails$]).subscribe(([exclusionStateData, userDetails]: any) => {
      this.exclusionOption = exclusionStateData.exclusionOption;
      this.setOptionsList(userDetails, exclusionStateData.jurisdiction);
    });
    this.radioOptionControl = new FormControl(this.exclusionOption ? this.exclusionOption : '', [Validators.required]);
    this.formGroup = new FormGroup({ [this.radioControlName]: this.radioOptionControl });
  }

  public setOptionsList(userDetails: UserDetails, jurisdiction: string) {
    // Todo: Need to add check for
    // Case Jurisdiction and LocationId
    // with User's Jurisdiction and LocationId
    const caseJurisdictionAndLocation = userDetails.roleAssignmentInfo
    &&
    userDetails.roleAssignmentInfo.some((roleAssignment) => roleAssignment.isCaseAllocator && roleAssignment.jurisdiction === jurisdiction);
    this.optionsList = caseJurisdictionAndLocation ? [this.excludeMe, this.excludeOther] : [this.excludeMe];
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent) {
    this.submitted = true;
    if (this.radioOptionControl.invalid) {
      this.radioOptionControl.setErrors({
        invalid: true
      });
      return;
    }
    this.dispatchEvent(navEvent);
  }

  public dispatchEvent(navEvent: ExclusionNavigationEvent) {
    switch (navEvent) {
      case ExclusionNavigationEvent.CONTINUE:
        const exclusionSelection = this.radioOptionControl.value;
        switch (exclusionSelection) {
          case ExcludeOption.EXCLUDE_ME:
            this.store.dispatch(new fromFeature.SaveExclusionOptionAndGo({
              exclusionOption: ExcludeOption.EXCLUDE_ME,
              exclusionState: ExclusionState.DESCRIBE_EXCLUSION
            }));
            break;
          case ExcludeOption.EXCLUDE_ANOTHER_PERSON:
            this.store.dispatch(new fromFeature.SaveExclusionOptionAndGo({
              exclusionOption: ExcludeOption.EXCLUDE_ANOTHER_PERSON,
              exclusionState: ExclusionState.CHOOSE_PERSON_ROLE
            }));
            break;
          default:
            break;
        }
        break;
      default:
        throw new Error('Invalid option');
    }
  }

  public ngOnDestroy(): void {
    if (this.exclusionStateDataSub) {
      this.exclusionStateDataSub.unsubscribe();
    }
  }
}
