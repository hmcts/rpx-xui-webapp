import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Answer } from '../../../models';
import { SpecificAccessNavigation } from '../../../models/specific-access-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
    selector: 'exui-specific-access-denied',
    templateUrl: './specific-access-denied.component.html',
    standalone: false
})
export class SpecificAccessDeniedComponent implements OnDestroy {
  @Input() public navEvent: SpecificAccessNavigation;

  public answers: Answer[] = [];
  public caseId: string;
  public storeSubscription: Subscription;
  public readonly retunToTask = 'Return to the Tasks tab for this case';
  public readonly returnToMyTask = 'Return to My tasks';

  constructor(private readonly router: Router,
              private readonly store: Store<fromFeature.State>) {
    this.storeSubscription = this.store.pipe(select(fromFeature.getRoleAccessState)).subscribe();
  }

  public ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  public onNavigate(action) {
    this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(action));
  }
}

