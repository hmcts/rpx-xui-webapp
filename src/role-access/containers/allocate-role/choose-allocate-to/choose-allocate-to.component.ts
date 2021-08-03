import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { $enum as EnumUtil } from 'ts-enum-util';
import { CHOOSE_ALLOCATE_TO, ERROR_MESSAGE } from '../../../constants';
import { AllocateRoleNavigation, AllocateRoleNavigationEvent, AllocateRoleState, AllocateTo, TypeOfRole } from '../../../models';
import { RoleAllocationCaptionText, RoleAllocationTitleText } from '../../../models/enums';
import { OptionsModel } from '../../../models/options-model';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-choose-allocate-to',
  templateUrl: './choose-allocate-to.component.html',
})
export class ChooseAllocateToComponent implements OnInit {

  public ERROR_MESSAGE = ERROR_MESSAGE;
  @Input() public navEvent: AllocateRoleNavigation;

  public title = RoleAllocationTitleText.NonExclusionAllocate;
  public caption = 'Allocate hearing judge';
  public optionsList: OptionsModel[];
  public submitted: boolean = false;

  public formGroup: FormGroup;
  public radioOptionControl: FormControl;
  public radioControlName: string = CHOOSE_ALLOCATE_TO;

  public allocateRoleStateDataSub: Subscription;

  public typeOfRole: string;
  public allocateTo: AllocateTo;

  constructor(private readonly store: Store<fromFeature.State>) { }

  public ngOnInit(): void {
    this.allocateRoleStateDataSub = this.store.pipe(select(fromFeature.getAllocateRoleState)).subscribe(
      allocateRoleStateData => {
        this.typeOfRole = allocateRoleStateData.typeOfRole;
        this.allocateTo = allocateRoleStateData.allocateTo;
        if (this.typeOfRole === TypeOfRole.CASE_MANAGER) {
          this.caption = RoleAllocationCaptionText.LegalOpsAllocate;
        } else {
          this.caption = `Allocate a ${this.typeOfRole.toLowerCase()}`;
        }
      }
    );

    this.radioOptionControl = new FormControl(this.allocateTo ? this.allocateTo : '', [Validators.required]);
    this.formGroup = new FormGroup({[this.radioControlName]: this.radioOptionControl});
    this.optionsList = [
      {
        optionId: EnumUtil(AllocateTo).getKeyOrDefault(AllocateTo.RESERVE_TO_ME),
        optionValue: AllocateTo.RESERVE_TO_ME
      },
      {
        optionId: EnumUtil(AllocateTo).getKeyOrDefault(AllocateTo.ALLOCATE_TO_ANOTHER_PERSON),
        optionValue: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON
      }
    ];
  }

  public navigationHandler(navEvent: AllocateRoleNavigationEvent): void {
    this.submitted = true;
    if (this.radioOptionControl.invalid) {
      this.radioOptionControl.setErrors({
        invalid: true
      });
      return;
    }
    this.dispatchEvent(navEvent);
  }

  public dispatchEvent(navEvent: AllocateRoleNavigationEvent): void {
    switch (navEvent) {
      case AllocateRoleNavigationEvent.CONTINUE:
        const allocateTo = this.radioOptionControl.value;
        this.store.dispatch(new fromFeature.ChooseAllocateToAndGo({
          allocateTo,
          allocateRoleState: AllocateRoleState.SEARCH_PERSON
        }));
        break;
      default:
        throw new Error('Invalid option');
    }
  }
}
