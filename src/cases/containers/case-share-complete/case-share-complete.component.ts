import { Component, Input, OnInit } from '@angular/core';
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCasesFeature from '../../store';
import * as fromCaseList from '../../store/reducers';

@Component({
  selector: 'exui-case-share-complete',
  templateUrl: './case-share-complete.component.html'
})
export class CaseShareCompleteComponent implements OnInit {

  public shareCases$: Observable<SharedCase[]>;
  public shareCases: SharedCase[];
  public completeScreenMode: string;

    constructor(public store: Store<fromCaseList.State>) {
  }

  public ngOnInit() {
    this.shareCases$ = this.store.pipe(select(fromCasesFeature.getShareCaseListState));
    this.shareCases$.subscribe(shareCases => {
      this.shareCases = shareCases;
    });

    this.store.dispatch(new fromCasesFeature.AssignUsersToCase(this.shareCases));

    this.shareCases$ = this.store.pipe(select(fromCasesFeature.getShareCaseListState));
    this.shareCases$.subscribe(shareCases => {
      this.shareCases = shareCases;
    });
    this.completeScreenMode = this.checkIfIncomplete(this.shareCases);
  }

  private checkIfIncomplete(shareCases: SharedCase[]) {
    for (const aCase of shareCases) {
      console.log('got a pending status or case id -- ' + aCase.caseId
        + ' and pending length  ' + aCase.pendingShares.length)
      if (aCase.pendingShares != null && aCase.pendingShares.length > 0) {
        return 'PENDING';
      }
    }
    return 'COMPLETE';
  }

}
