import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PERSON_ROLE } from '../../../constants';
import { ExclusionNavigationEvent, ExclusionState, Role } from '../../../models';
import { RoleAllocationCaptionText, RoleAllocationTitleText } from '../../../models/enums';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import { OptionsModel } from '../../../models/options-model';
import { RoleExclusionsService } from '../../../services';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-choose-person-role',
  templateUrl: './choose-person-role.component.html',
  styleUrls: ['./choose-person-role.component.scss']
})
export class ChoosePersonRoleComponent implements OnInit {

  @Input() public navEvent: ExclusionNavigation;

  public roles$: Observable<Role[]>;
  public title = RoleAllocationTitleText.ExclusionChoose;
  public caption = RoleAllocationCaptionText.Exclusion;
  public optionsList: OptionsModel[];

  public formGroup: FormGroup;
  public radioOptionControl: FormControl;
  public radioControlName: string = PERSON_ROLE;

  constructor(private readonly store: Store<fromFeature.State>,
              private readonly roleExclusionsService: RoleExclusionsService) {
  }

  public ngOnInit(): void {
    this.radioOptionControl = new FormControl(false);
    this.formGroup = new FormGroup({[this.radioControlName]: this.radioOptionControl});

    this.roles$ = this.roleExclusionsService.getRolesCategory();
    this.roles$.subscribe((roles) => {
      this.optionsList = roles.map(role => {
        const option: OptionsModel = {
          optionId: role.roleId, optionValue: role.roleName
        };
        return option;
      });
    });
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent) {
    switch (navEvent) {
      case ExclusionNavigationEvent.CONTINUE:
        this.store.dispatch(new fromFeature.ChangeNavigation(ExclusionState.FIND_PERSON));
        break;
      default:
        throw new Error('Invalid option');
    }
  }
}
