import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonRole } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserRole } from '../../../../app/models';
import { CHOOSE_A_ROLE, ERROR_MESSAGE } from '../../../constants';
import {
  AllocateRoleNavigation,
  AllocateRoleNavigationEvent,
  AllocateRoleState,
  Role,
  RoleCategory,
  SpecificRole
} from '../../../models';
import { RoleAllocationTitleText } from '../../../models/enums';
import { OptionsModel } from '../../../models/options-model';
import { AllocateRoleService } from '../../../services';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-choose-role',
  templateUrl: './choose-role.component.html',
})
export class ChooseRoleComponent implements OnInit, OnDestroy {
  public ERROR_MESSAGE = ERROR_MESSAGE;
  @Input() public navEvent: AllocateRoleNavigation;

  public error: any;
  public title = RoleAllocationTitleText.NonExclusionChoose;
  public caption: string = '';
  public optionsList: OptionsModel[];
  public submitted: boolean = false;

  public formGroup: FormGroup;
  public radioOptionControl: FormControl;
  public radioControlName: string = CHOOSE_A_ROLE;

  public allocateRoleStateDataSub: Subscription;

  public typeOfRole: SpecificRole;

  public roleCategory: string = '';
  public jurisdiction: string;

  constructor(private readonly store: Store<fromFeature.State>,
              private readonly route: ActivatedRoute,
              private readonly allocateRoleService: AllocateRoleService) {
  }

  public ngOnInit(): void {
    // roleCategory: 1. JUDICIAL/2. LEGAL_OPERATIONS which is exactly matched with back end
    // 1. judicial: add judicial role journey
    // 2. legalOps: add legal Ops role journey
    this.roleCategory = this.route.snapshot.queryParams && this.route.snapshot.queryParams.roleCategory ?
      this.route.snapshot.queryParams.roleCategory : '';
    this.jurisdiction = this.route.snapshot.queryParams && this.route.snapshot.queryParams.jurisdiction ?
      this.route.snapshot.queryParams.jurisdiction : '';
    const userTypePlaceHolder = this.roleCategory === RoleCategory.JUDICIAL ? PersonRole.JUDICIAL.toLowerCase() : PersonRole.CASEWORKER.toLowerCase();
    this.caption = `Allocate a ${userTypePlaceHolder} role`;
    this.allocateRoleStateDataSub = this.store.pipe(select(fromFeature.getAllocateRoleState)).subscribe(
      allocateRoleStateData => {
        this.typeOfRole = allocateRoleStateData.typeOfRole;
        this.radioOptionControl = new FormControl(this.typeOfRole ? this.typeOfRole.name : '', [Validators.required]);
        this.formGroup = new FormGroup({ [this.radioControlName]: this.radioOptionControl });
      }
    );
    this.allocateRoleService.getValidRoles([this.jurisdiction]).subscribe(roles =>
      this.optionsList = this.getOptions(roles.filter(role => role.roleCategory === this.roleCategory)));
  }

  public navigationHandler(navEvent: AllocateRoleNavigationEvent, roleCategory: RoleCategory, isLegalOpsOrJudicialRole: UserRole): void {
    this.submitted = true;
    if (this.radioOptionControl.invalid) {
      this.radioOptionControl.setErrors({
        invalid: true
      });
      this.error = ERROR_MESSAGE;
      return;
    }
    this.dispatchEvent(navEvent, roleCategory, isLegalOpsOrJudicialRole);
  }

  public dispatchEvent(navEvent: AllocateRoleNavigationEvent, roleCategory: RoleCategory, isLegalOpsOrJudicialRole: UserRole): void {
    switch (navEvent) {
      case AllocateRoleNavigationEvent.CONTINUE:
        const roleChosen = this.radioOptionControl.value;
        const roleOption = this.optionsList.filter(option => option.optionValue === roleChosen)[0];
        const typeOfRole: SpecificRole = {
          id: roleOption ? roleOption.optionId : roleChosen,
          name: roleChosen
        };

        switch (roleCategory) {
          case RoleCategory.JUDICIAL: {
            switch (isLegalOpsOrJudicialRole) {
              case UserRole.LegalOps:
                this.store.dispatch(new fromFeature.ChooseRoleAndGo({
                  typeOfRole, allocateRoleState: AllocateRoleState.SEARCH_PERSON
                }));
                break;
              case UserRole.Judicial:
                this.store.dispatch(new fromFeature.ChooseRoleAndGo({
                  typeOfRole, allocateRoleState: AllocateRoleState.CHOOSE_ALLOCATE_TO
                }));
                break;
              default:
                throw new Error('Invalid user role');
            }
            break;
          }
          case RoleCategory.LEGAL_OPERATIONS: {
            switch (isLegalOpsOrJudicialRole) {
              case UserRole.LegalOps:
                this.store.dispatch(new fromFeature.ChooseRoleAndGo({
                  typeOfRole, allocateRoleState: AllocateRoleState.CHOOSE_ALLOCATE_TO
                }));
                break;
              case UserRole.Judicial:
                this.store.dispatch(new fromFeature.ChooseRoleAndGo({
                  typeOfRole, allocateRoleState: AllocateRoleState.SEARCH_PERSON
                }));
                break;
              default:
                throw new Error('Invalid user role');
            }
            break;
          }
          default:
            throw new Error('Invalid userType');
        }
        break;
      default:
        throw new Error('Invalid option');
    }
  }

  public getOptions(roles: Role[]): OptionsModel[] {
    return roles.map(role => ({ optionId: role.roleId, optionValue: role.roleName }));
  }

  public ngOnDestroy(): void {
    if (this.allocateRoleStateDataSub) {
      this.allocateRoleStateDataSub.unsubscribe();
    }
  }
}
