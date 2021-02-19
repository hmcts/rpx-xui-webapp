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
  templateUrl: './case-details.component.html'
})
export class CaseDetailsComponent implements OnInit, OnDestroy {

  public caseId: string;
  private $caseIdSubscription: Subscription;

  constructor(private readonly store: Store<fromCaseCreate.State>) {}

  public ngOnInit(): void {
    this.$caseIdSubscription = this.store.pipe(select(fromCaseCreate.getCaseId))
      .subscribe(caseId => this.caseId = caseId);
  }

  public ngOnDestroy(): void {
    this.$caseIdSubscription.unsubscribe();
  }


}
