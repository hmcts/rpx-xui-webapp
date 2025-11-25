import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import * as fromFeature from '../../../store';

@Component({
  standalone: false,
  selector: 'exui-specific-access-approved',
  templateUrl: './specific-access-approved.component.html'
})
export class SpecificAccessApprovedComponent {
  @Input() public navEvent: SpecificAccessNavigationEvent;
  public subscription: Subscription;
  public services: string[];
  public assignedUser: string;

  constructor(private readonly store: Store<fromFeature.State>) {}

  public navigationHandler(navEvent: SpecificAccessNavigationEvent): void {
    switch (navEvent) {
      case SpecificAccessNavigationEvent.RETURNTOMYTASKS:
        this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_APPROVED));
        break;
      default:
        this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_APPROVED));
        throw new Error('Invalid case');
    }
  }

  public dispatchEvent(navEvent: SpecificAccessNavigationEvent) {
    switch (navEvent) {
      case SpecificAccessNavigationEvent.BACK:
        this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_REVIEW));
        break;
      default:
        throw new Error('Not yet implemented');
    }
  }
}
