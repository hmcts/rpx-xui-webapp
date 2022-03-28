import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import { SpecificAccessNavigation } from '../../../models/specific-access-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-specific-access-information',
  templateUrl: './specific-access-information.component.html'
})
export class SpecificAccessInformationComponent implements OnDestroy {

  @Input() public navEvent: SpecificAccessNavigation;
  @Input() public title = 'Request more information';
  @Input() public caption = 'Reject specific access request';

  public subscription: Subscription;

  constructor(public readonly store: Store<fromFeature.State>) {
  }

  public navigationHandler(navEvent: SpecificAccessNavigationEvent) {
    this.dispatchEvent(navEvent);
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

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
