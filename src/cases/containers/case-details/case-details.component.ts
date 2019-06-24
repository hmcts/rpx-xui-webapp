import {Component, OnDestroy, OnInit} from '@angular/core';

import {select, Store} from '@ngrx/store';
import * as fromCaseCreate from '../../store';
import {Subscription} from 'rxjs';
/**
 * Case Details Component
 * It consumes ccd-case-view component
 * param caseId
 */
@Component({
  selector: 'exui-case-details',
  template: `
    <ccd-case-view
      [hasPrint]="true"
      *ngIf="caseId"
      [case]="caseId"
      [hasEventSelector]="true">
    </ccd-case-view>
  `
})
export class CaseDetailsComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromCaseCreate.State>) {}

  caseId: string;
  $caeIdSubscription: Subscription;

  ngOnInit(): void {
    this.$caeIdSubscription = this.store.pipe(select(fromCaseCreate.getCaseId))
      .subscribe(caseId => this.caseId = caseId);
  }

  ngOnDestroy(): void {
    this.$caeIdSubscription.unsubscribe();
  }


}
