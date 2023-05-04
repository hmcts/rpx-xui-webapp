import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCasesFeature from '../../store';
import * as fromCaseList from '../../store/reducers';

@Component({
  selector: 'exui-case-share-confirm',
  templateUrl: './case-share-confirm.component.html',
  styleUrls: ['./case-share-confirm.component.scss']
})
export class CaseShareConfirmComponent implements OnInit {
  public shareCases$: Observable<SharedCase[]>;
  public shareCases: SharedCase[];
  public showSpinner$ : Observable<boolean>;

  constructor(public store: Store<fromCaseList.State>,
    private readonly loadingService: LoadingService) {
  }

  public ngOnInit() {
    this.showSpinner$ = this.loadingService.isLoading as any;
    const loadingToken = this.loadingService.register();
    this.shareCases$ = this.store.pipe(select(fromCasesFeature.getShareCaseListState));
    this.shareCases$.subscribe((shareCases) => {
      this.shareCases = shareCases;
      this.loadingService.unregister(loadingToken);
    }, () => {
      this.loadingService.unregister(loadingToken);
    });
  }
}
