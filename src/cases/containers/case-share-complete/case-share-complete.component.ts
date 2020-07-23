import { Component, Input, OnInit } from '@angular/core';
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCasesFeature from '../../store';
import * as fromCaseList from '../../store/reducers';

@Component({
  selector: 'exui-case-share-complete',
  templateUrl: './case-share-complete.component.html',
  styleUrls: ['case-share-complete.component.scss']
})
export class CaseShareCompleteComponent implements OnInit {

  public shareCases$: Observable<SharedCase[]>;
  public shareCases: SharedCase[];
  public newShareCases$: Observable<SharedCase[]>;
  public newShareCases: SharedCase[];
  public completeScreenMode: string;

    constructor(public store: Store<fromCaseList.State>) {
  }

  public ngOnInit() {
    this.shareCases$ = this.store.pipe(select(fromCasesFeature.getShareCaseListState));
    this.shareCases$.subscribe(shareCases => {
      this.shareCases = shareCases;
    });
    this.store.dispatch(new fromCasesFeature.AssignUsersToCase(this.shareCases));

    this.newShareCases$ = this.store.pipe(select(fromCasesFeature.getShareCaseListState));
    this.newShareCases$.subscribe(shareCases => {
      this.completeScreenMode = this.checkIfIncomplete(shareCases)
      this.newShareCases = shareCases
    });
  }

  public  isPendingShares = (aCase) => aCase.pendingShares != null && aCase.pendingShares.length > 0;

  public checkIfIncomplete(shareCases: SharedCase[]) {
   if ( shareCases.some(this.isPendingShares)) {
      return 'PENDING';
    }
   return 'COMPLETE';
  }

}
