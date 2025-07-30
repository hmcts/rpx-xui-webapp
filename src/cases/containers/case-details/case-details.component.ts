import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromCaseCreate from '../../store';

/**
 * Case Details Component
 * It consumes ccd-case-view component
 * param caseId
 */
@Component({
    selector: 'exui-case-details',
    templateUrl: './case-details.component.html',
    standalone: false
})
export class CaseDetailsComponent implements OnDestroy, OnInit {
  public caseId: string;
  public $caseIdSubscription: Subscription;

  constructor(private readonly store: Store<fromCaseCreate.State>) {}

  public ngOnInit(): void {
    this.$caseIdSubscription = this.store.pipe(select(fromCaseCreate.getCaseId))
      .subscribe((caseId) => this.caseId = caseId);
  }

  public ngOnDestroy(): void {
    this.unSubscribe(this.$caseIdSubscription);
  }

  public unSubscribe(subscription: Subscription): void {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}
