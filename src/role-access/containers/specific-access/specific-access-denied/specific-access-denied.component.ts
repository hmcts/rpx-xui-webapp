import { Component, Input, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Answer, SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import { SpecificAccessNavigation } from '../../../models/specific-access-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-specific-access-denied',
  templateUrl: './specific-access-denied.component.html'
})
export class SpecificAccessDeniedComponent implements OnDestroy {

  @Input() public navEvent: SpecificAccessNavigation;

  public answers: Answer[] = [];
  public caption = '';
  public heading = '';
  public hint = '';
  public storeSubscription: Subscription;

  constructor(private readonly store: Store<fromFeature.State>) {
    this.storeSubscription = this.store.pipe(select(fromFeature.getRoleAccessState)).subscribe();
  }

  public ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  public navigationHandler(navEvent: SpecificAccessNavigationEvent) {
    switch (navEvent) {
      case SpecificAccessNavigationEvent.RETURNTOMYTASKS:
        this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_APPROVED));
        break;
      default:
        throw new Error('Invalid option');
    }
  }

  public onNavigate(action) {
    this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(action));
  }
}

