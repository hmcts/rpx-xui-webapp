import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { $enum as EnumUtil } from 'ts-enum-util';
import * as fromRoot from '../../../../app/store';
import { EXCLUSION_OPTION } from '../../../constants';
import { ExcludeOption, ExclusionNavigationEvent, ExclusionState } from '../../../models';
import { RoleAllocationCaptionText, RoleAllocationTitleText } from '../../../models/enums';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import { OptionsModel } from '../../../models/options-model';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-choose-exclusion',
  templateUrl: './choose-exclusion.component.html',
  styleUrls: ['./choose-exclusion.component.scss']
})

export class ChooseExclusionComponent implements OnInit, OnDestroy {

  @Input() public navEvent: ExclusionNavigation;
  public title = RoleAllocationTitleText.ExclusionAllocate;
  public caption = RoleAllocationCaptionText.Exclusion;
  public locationInfo$: Observable<any>;

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

  constructor(private readonly store: Store<fromFeature.State>) {
  }

  public ngOnInit(): void {
    this.exclusionStateDataSub = this.store.pipe(select(fromFeature.getRoleAccessState)).subscribe(
      exclusionStateData => {
        this.exclusionOption = exclusionStateData.exclusionOption;
      }
    );
    this.radioOptionControl = new FormControl(this.exclusionOption ? this.exclusionOption : '');
    this.formGroup = new FormGroup({[this.radioControlName]: this.radioOptionControl}, [Validators.required]);

    // currently the case allocator role information is stored in location info
    this.locationInfo$ = this.store.pipe(select(fromRoot.getLocationInfo));
    this.locationInfo$.subscribe(li => {
      const firstLocationInfo = li[0];
      this.optionsList = (firstLocationInfo && firstLocationInfo.isCaseAllocator) ? [this.excludeMe, this.excludeOther] : [this.excludeMe];
    });
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent) {
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
