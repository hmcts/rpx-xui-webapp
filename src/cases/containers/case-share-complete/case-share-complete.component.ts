import { Component, Input, OnInit } from '@angular/core';
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCasesFeature from '../../store';
import { LoadShareCase, LoadUserFromOrgForCase } from '../../store/actions';
import * as fromCaseList from '../../store/reducers';

@Component({
  selector: 'exui-case-share-complete',
  templateUrl: './case-share-complete.component.html'
})
export class CaseShareCompleteComponent implements OnInit {

  public shareCases$: Observable<SharedCase[]>;
  public shareCases: SharedCase[];
  public responseCode: string[] = [];
  public completeScreenMode: string;

  constructor(public store: Store<fromCaseList.State>) {
  }

  public ngOnInit() {
    this.shareCases$ = this.store.pipe(select(fromCasesFeature.getShareCaseListState));
    this.shareCases$.subscribe(shareCases => {
      this.shareCases = shareCases;
    });

    this.share(this.shareCases);
  }

  private share(shareCases: SharedCase[]) {
    console.log('shared with length  before in component' + this.shareCases[0].sharedWith.length);
    this.store.dispatch(new fromCasesFeature.AssignUsersToCase(shareCases));
    console.log('shared with length  after in component' + this.shareCases[0].sharedWith.length);
    this.completeScreenMode = 'COMPLETE';
    for (const aCase of this.shareCases) {
      if (aCase.pendingShares != null && aCase.pendingShares.length > 0) {
        this.completeScreenMode = 'PENDING';
        break;
      }
    }
  }

}
