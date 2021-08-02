import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { $enum as EnumUtil } from 'ts-enum-util';
import { CHOOSE_A_ROLE, ERROR_MESSAGE } from '../../../constants';
import { AllocateRoleNavigation, AllocateRoleNavigationEvent, AllocateRoleState, PersonRole, TypeOfRole } from '../../../models';
import { RoleAllocationTitleText } from '../../../models/enums';
import { OptionsModel } from '../../../models/options-model';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-choose-role',
  templateUrl: './choose-role.component.html',
})
export class ChooseRoleComponent implements OnInit, OnDestroy {
  public ERROR_MESSAGE = ERROR_MESSAGE;
  @Input() public navEvent: AllocateRoleNavigation;

  public title = RoleAllocationTitleText.NonExclusionChoose;
  public caption: string = '';
  public optionsList: OptionsModel[];
  public submitted: boolean = false;

  public formGroup: FormGroup;
  public radioOptionControl: FormControl;
  public radioControlName: string = CHOOSE_A_ROLE;

  public allocateRoleStateDataSub: Subscription;

  public typeOfRole: TypeOfRole;

  public userType: string = '';

  constructor(private readonly store: Store<fromFeature.State>,
              private readonly route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    // userType: 1. judicial/2. legalOps
    // 1. judicial: add judicial role journey
    // 2. legalOps: add legal Ops role journey
    this.userType = this.route.snapshot.queryParams && this.route.snapshot.queryParams.userType ?
      this.route.snapshot.queryParams.userType : '';
    const userTypePlaceHolder = this.userType === PersonRole.JUDICIAL.toLowerCase() ? PersonRole.JUDICIAL.toLowerCase() : PersonRole.CASEWORKER.toLowerCase();
    this.caption = `Allocate a ${userTypePlaceHolder} role`;
    this.allocateRoleStateDataSub = this.store.pipe(select(fromFeature.getAllocateRoleState)).subscribe(
      allocateRoleStateData => {
        this.typeOfRole = allocateRoleStateData.typeOfRole;
      }
    );
    this.radioOptionControl = new FormControl(this.typeOfRole ? this.typeOfRole : '', [Validators.required]);
    this.formGroup = new FormGroup({[this.radioControlName]: this.radioOptionControl});

    const judicialOptions = [
      {
        optionId: EnumUtil(TypeOfRole).getKeyOrDefault(TypeOfRole.LEAD_JUDGE),
        optionValue: TypeOfRole.LEAD_JUDGE
      },
      {
        optionId: EnumUtil(TypeOfRole).getKeyOrDefault(TypeOfRole.HEARING_JUDGE),
        optionValue: TypeOfRole.HEARING_JUDGE
      }
    ];
    const legalOpsOptions = [{optionId: EnumUtil(TypeOfRole).getKeyOrDefault(TypeOfRole.CASE_MANAGER), optionValue: TypeOfRole.CASE_MANAGER}];
    this.optionsList = this.userType === PersonRole.JUDICIAL.toLowerCase() ? judicialOptions : legalOpsOptions;
  }

  public navigationHandler(navEvent: AllocateRoleNavigationEvent) {
    this.submitted = true;
    if (this.radioOptionControl.invalid) {
      this.radioOptionControl.setErrors({
        invalid: true
      });
      return;
    }
    this.dispatchEvent(navEvent);
  }

  public dispatchEvent(navEvent: AllocateRoleNavigationEvent) {
    switch (navEvent) {
      case AllocateRoleNavigationEvent.CONTINUE:
        const typeOfRole = this.radioOptionControl.value;
        this.store.dispatch(new fromFeature.ChooseRoleAndGo({
          typeOfRole, allocateRoleState: AllocateRoleState.CHOOSE_ALLOCATE_TO}));
        break;
      default:
        throw new Error('Invalid option');
    }
  }

  public ngOnDestroy(): void {
    if (this.allocateRoleStateDataSub) {
      this.allocateRoleStateDataSub.unsubscribe();
    }
  }
}
