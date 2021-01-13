import {Component, OnDestroy, OnInit} from '@angular/core';

import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
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

  constructor(private readonly store: Store<fromCaseCreate.State>) {}

  public caseId: string;
  public $caeIdSubscription: Subscription;

  public ngOnInit(): void {
    this.$caeIdSubscription = this.store.pipe(select(fromCaseCreate.getCaseId))
      .subscribe(caseId => this.caseId = caseId);
  }

  public ngOnDestroy(): void {
    this.$caeIdSubscription.unsubscribe();
  }


}
