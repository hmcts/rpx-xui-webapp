import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ExclusionNavigationEvent, ExclusionState, Role } from '../../../models';
import { RoleAllocationType } from '../../../models/enums';
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
  public roles: Role[];
  public roleAllocation = RoleAllocationType.Exclusion;
  public roles$: Observable<Role[]>;

  constructor(private readonly store: Store<fromFeature.State>, private readonly roleExclusionsService: RoleExclusionsService) { }

  public ngOnInit(): void {
    this.roles$ = this.roleExclusionsService.getRolesCategory();
    this.roles$.subscribe((roles) => {
      this.roles = roles;
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
