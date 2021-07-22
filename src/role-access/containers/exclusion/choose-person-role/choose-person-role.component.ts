import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { RoleAllocationCaptionText, RoleAllocationTitleText } from 'src/role-access/models/enums';

import { ExclusionNavigationEvent, ExclusionState, RadioOption, Role } from '../../../models';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import { RoleExclusionsService } from '../../../services/role-exclusions.service';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-choose-person-role',
  templateUrl: './choose-person-role.component.html',
  styleUrls: ['./choose-person-role.component.scss']
})
export class ChoosePersonRoleComponent implements OnInit {

  @Input() public navEvent: ExclusionNavigation;
  public roleOptions: RadioOption[];
  public roles$: Observable<Role[]>;
  public title = RoleAllocationTitleText.ExclusionChoose;
  public caption = RoleAllocationCaptionText.Exclusion;

  constructor(private readonly store: Store<fromFeature.State>, private readonly roleExclusionsService: RoleExclusionsService) { }

  public ngOnInit(): void {
    this.roles$ = this.roleExclusionsService.getRolesCategory();
    this.roles$.subscribe((roles) => {
      this.roleOptions = [];
      roles.forEach(role => {
        const currentOption: RadioOption = { radioId: role.roleId, radioName: role.roleName };
        this.roleOptions.push(currentOption);
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
