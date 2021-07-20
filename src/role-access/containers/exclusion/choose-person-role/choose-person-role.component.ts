import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RoleAllocationType } from '../../../models/enums';
import { ExclusionNavigationEvent, ExclusionState } from '../../../models';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-choose-person-role',
  templateUrl: './choose-person-role.component.html',
  styleUrls: ['./choose-person-role.component.scss']
})
export class ChoosePersonRoleComponent implements OnInit {

  @Input() public navEvent: ExclusionNavigation;
  public roles: string[];
  public roleAllocation = RoleAllocationType.Exclusion;

  constructor(private readonly store: Store<fromFeature.State>) {
  }

  public ngOnInit(): void {
    // TODO: Will need to get these from node layer - Role Assignment service
    this.roles = ['Judicial', 'Legal ops', 'Admin'];
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
