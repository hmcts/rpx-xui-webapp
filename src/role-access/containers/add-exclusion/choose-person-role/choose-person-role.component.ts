import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ERROR_MESSAGE, PERSON_ROLE } from '../../../constants';
import { ExclusionNavigationEvent, ExclusionState, PersonRole, Role } from '../../../models';
import { RoleAllocationCaptionText, RoleAllocationTitleText } from '../../../models/enums';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import { OptionsModel } from '../../../models/options-model';
import { RoleExclusionsService } from '../../../services';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-choose-person-role',
  templateUrl: './choose-person-role.component.html'
})
export class ChoosePersonRoleComponent implements OnInit, OnDestroy {
  public ERROR_MESSAGE = ERROR_MESSAGE;
  @Input() public navEvent: ExclusionNavigation;

  public roles$: Observable<Role[]>;
  public title = RoleAllocationTitleText.ExclusionChoose;
  public caption = RoleAllocationCaptionText.Exclusion;
  public optionsList: OptionsModel[];

  public submitted: boolean = false;

  public formGroup: FormGroup;
  public radioOptionControl: FormControl;
  public radioControlName: string = PERSON_ROLE;

  public exclusionStateDataSub: Subscription;

  public personRole: PersonRole;

  constructor(private readonly store: Store<fromFeature.State>,
              private readonly roleExclusionsService: RoleExclusionsService) {
  }

  public ngOnInit(): void {
    this.exclusionStateDataSub = this.store.pipe(select(fromFeature.getRoleAccessState)).subscribe(
      exclusionStateData => {
        this.personRole = exclusionStateData.personRole;
      }
    );

    this.radioOptionControl = new FormControl(this.personRole ? this.personRole : '', [Validators.required]);
    this.formGroup = new FormGroup({[this.radioControlName]: this.radioOptionControl});

    this.roles$ = this.roleExclusionsService.getRolesCategory();
    this.roles$.subscribe((roles) => {
      this.optionsList = roles.map(role => {
        return {
          optionId: role.roleId, optionValue: role.roleName
        } as OptionsModel;
      });
    });
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
        const personRole = this.radioOptionControl.value;
        this.store.dispatch(new fromFeature.SavePersonRoleAndGo({ personRole,
          exclusionState: ExclusionState.FIND_PERSON }));
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
