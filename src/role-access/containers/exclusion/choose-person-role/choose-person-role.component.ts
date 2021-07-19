import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(private readonly store: Store<fromFeature.State>) {
  }

  public ngOnInit(): void {
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
