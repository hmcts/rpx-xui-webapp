import { Component, OnInit } from '@angular/core';
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

  constructor(public store: Store<fromCaseList.State>) {}

  public ngOnInit() {
    this.shareCases$ = this.store.pipe(select(fromCasesFeature.getShareCaseListState));
    this.shareCases$.subscribe(shareCases => {
      this.shareCases = shareCases;
    });
    this.store.dispatch(new fromCasesFeature.AssignUsersToCase(this.shareCases));

    this.newShareCases$ = this.store.pipe(select(fromCasesFeature.getShareCaseListState));
    this.newShareCases$.subscribe(shareCases => {
      this.completeScreenMode = this.checkIfIncomplete(shareCases);
      this.newShareCases = shareCases;
    });
  }

  public checkIfIncomplete(shareCases: SharedCase[]) {
   if (shareCases.some(aCase => aCase.pendingShares && aCase.pendingShares.length > 0)) {
      return 'PENDING';
    }
   return 'COMPLETE';
  }

  public showUserAccessBlock(aCase: SharedCase): boolean {
    if (aCase.pendingShares) {
      if (aCase.pendingShares.length > 0) {
        return true;
      }
    }
    if (aCase.pendingUnshares) {
      if (aCase.pendingUnshares.length > 0) {
        return true;
      }
    }
    return false;
  }
}
