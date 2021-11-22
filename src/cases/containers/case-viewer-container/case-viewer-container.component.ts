import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseTab, CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AppUtils } from '../../../app/app-utils';
import { AppConstants } from '../../../app/app.constants';
import { UserDetails } from '../../../app/models/user-details.model';
import { SessionStorageService } from '../../../app/services';
import * as fromRoot from '../../../app/store';

@Component({
  selector: 'exui-case-viewer-container',
  templateUrl: './case-viewer-container.component.html',
  styleUrls: ['./case-viewer-container.component.scss']
})
export class CaseViewerContainerComponent implements OnInit {
  private static readonly CLAIM_URL_RETURN_KEY = 'claimReturnUrl';
  private static readonly FEATURE_WORK_ALLOCATION_RELEASE_1 = 'WorkAllocationRelease1';
  private static readonly FEATURE_WORK_ALLOCATION_RELEASE_2 = 'WorkAllocationRelease2';
  public caseDetails: CaseView;
  public tabs$: Observable<CaseTab[]>;
  private tabs: CaseTab[] = [
    {
      id: 'tasks',
      label: 'Tasks',
      fields: [],
      show_condition: null
    },
    {
      id: 'roles-and-access',
      label: 'Roles and access',
      fields: [],
      show_condition: null
    }
  ];

  constructor(private readonly route: ActivatedRoute,
              private readonly sessionStorageService: SessionStorageService,
              private readonly store: Store<fromRoot.State>,
              private readonly featureToggleService: FeatureToggleService) {
  }

  private static enablePrependedTabs(feature: string, userDetails: UserDetails): boolean {
    return feature === CaseViewerContainerComponent.FEATURE_WORK_ALLOCATION_RELEASE_2
      && !!AppUtils.isLegalOpsOrJudicial(userDetails.userInfo.roles);
  }

  public ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case as CaseView;
    this.tabs$ = this.prependedCaseViewTabs();
    this.sessionStorageService.setItem(CaseViewerContainerComponent.CLAIM_URL_RETURN_KEY, window.location.pathname);
  }

  private prependedCaseViewTabs(): Observable<CaseTab[]> {
    return combineLatest([
      this.featureToggleService.getValue(AppConstants.FEATURE_NAMES.currentWAFeature, CaseViewerContainerComponent.FEATURE_WORK_ALLOCATION_RELEASE_1),
      this.store.pipe(select(fromRoot.getUserDetails))
    ]).pipe(
      map(([feature, userDetails]: [string, UserDetails]) => CaseViewerContainerComponent.enablePrependedTabs(feature, userDetails) ? this.tabs : [])
    );
  }

}
