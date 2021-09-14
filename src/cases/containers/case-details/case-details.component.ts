import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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
export class CaseDetailsComponent implements OnInit {

  public caseId$: Observable<string>;

  constructor(private readonly store: Store<fromCaseCreate.State>) {
  }

  public ngOnInit(): void {
    this.caseId$ = this.store.pipe(select(fromCaseCreate.getCaseId));
  }
}
