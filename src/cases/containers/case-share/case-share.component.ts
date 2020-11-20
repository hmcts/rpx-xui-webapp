import { Component, OnInit } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import { UserDetails } from '@hmcts/rpx-xui-common-lib/lib/models/user-details.model';
import { RouterReducerState } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { initAll } from 'govuk-frontend';
import { Observable } from 'rxjs';
import { getRouterState, RouterStateUrl } from '../../../app/store/reducers';
import * as fromCasesFeature from '../../store';
import { LoadShareCase, LoadUserFromOrgForCase } from '../../store/actions';
import * as fromCaseList from '../../store/reducers';

@Component({
  selector: 'exui-case-share',
  templateUrl: './case-share.component.html',
  styleUrls: ['./case-share.component.scss']
})
export class CaseShareComponent implements OnInit {

  public routerState$: Observable<RouterReducerState<RouterStateUrl>>;
  public init: boolean;
  public shareCases$: Observable<SharedCase[]>;
  public shareCases: SharedCase[];
  public orgUsers$: Observable<UserDetails[]>;
  public removeUserFromCaseToggleOn$: Observable<boolean>;

  constructor(public store: Store<fromCaseList.State>,
              public featureToggleService: FeatureToggleService) {
  }

  public ngOnInit() {
    this.routerState$ = this.store.pipe(select(getRouterState));
    this.routerState$.subscribe(router => this.init = router.state.queryParams.init);
    this.shareCases$ = this.store.pipe(select(fromCasesFeature.getShareCaseListState));
    this.shareCases$.subscribe(shareCases => {
      this.shareCases = shareCases;
    });
    this.orgUsers$ = this.store.pipe(select(fromCasesFeature.getOrganisationUsersState));
    if (this.init) {
      // call api to retrieve case assigned users
      this.store.dispatch(new LoadShareCase(this.shareCases));
      // call api to retrieve users in the same organisation
      this.store.dispatch(new LoadUserFromOrgForCase());
    }
    this.removeUserFromCaseToggleOn$ = this.featureToggleService.getValue('remove-user-from-case', false);

    // initialize javascript for accordion component to enable open/close button
    setTimeout(() => initAll(), 1000);
  }

  public deselect($event) {
    this.store.dispatch(new fromCasesFeature.DeleteAShareCase($event));
  }

  public synchronizeStore($event) {
    this.store.dispatch(new fromCasesFeature.SynchronizeStateToStore($event));
  }

}
