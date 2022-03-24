import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PersonRole } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import { SpecificAccessNavigation } from '../../../models/specific-access-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-specific-access-duration',
  templateUrl: './specific-access-duration.component.html'
})
export class SpecificAccessDurationComponent implements OnDestroy {
  @Input() public navEvent: SpecificAccessNavigation;

  public title = '';
  public caption = '';

  public submitted: boolean = false;
  public specificAccessStateDataSub: Subscription;

  public personRole: PersonRole;

  constructor(private readonly store: Store<fromFeature.State>) {
  }

  public navigationHandler(navEvent: SpecificAccessNavigationEvent) {
    this.submitted = true;
    this.dispatchEvent(navEvent);
  }

  public dispatchEvent(navEvent: SpecificAccessNavigationEvent) {
    switch (navEvent) {
      case SpecificAccessNavigationEvent.CONTINUE:
        this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_APPROVED));
        break;
      default:
        throw new Error('Invalid option');
    }
  }

  public ngOnDestroy(): void {
    if (this.specificAccessStateDataSub) {
      this.specificAccessStateDataSub.unsubscribe();
    }
  }
}
