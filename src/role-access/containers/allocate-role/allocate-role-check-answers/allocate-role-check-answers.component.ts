import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AllocateRoleState } from '../../../models';
import { AllocateRoleNavigationEvent } from '../../../models/allocate-role-navigation-event.enum';
import { AllocateRoleNavigation } from '../../../models/allocate-role-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-allocate-role-check-answers',
  templateUrl: './allocate-role-check-answers.component.html'
})
export class AllocateRoleCheckAnswersComponent implements OnInit {

  @Input() public navEvent: AllocateRoleNavigation;

  constructor(private readonly store: Store<fromFeature.State>) { }

  public ngOnInit(): void {
  }

  public navigationHandler(navEvent: AllocateRoleNavigationEvent) {
    switch (navEvent) {
      case AllocateRoleNavigationEvent.CONFIRM:
        this.store.dispatch(new fromFeature.AllocateRoleChangeNavigation(AllocateRoleState.CONFIRM_ALLOCATION));
        break;
      default:
        throw new Error('Invalid option');
    }
  }

}
