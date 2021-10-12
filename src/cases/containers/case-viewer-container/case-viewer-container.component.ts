import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseTab, CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../../app/app.constants';
import { UserDetails } from '../../../app/models/user-details.model';
import * as fromRoot from '../../../app/store';
import { FeatureVariation } from '../../models/feature-variation.model';

@Component({
  selector: 'exui-case-viewer-container',
  templateUrl: './case-viewer-container.component.html'
})
export class CaseViewerContainerComponent implements OnInit {
  private static readonly FEATURE_WORK_ALLOCATION_RELEASE_1 = 'WorkAllocationRelease1';
  private static readonly FEATURE_WORK_ALLOCATION_RELEASE_2 = 'WorkAllocationRelease2';

  public caseDetails: CaseView;
  public prependedTabs$: Observable<CaseTab[]>;
  public appendedTabs$: Observable<CaseTab[]>;

  private readonly prependedTabs: CaseTab[] = [
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

  private readonly appendedTabs: CaseTab[] = [
    {
      id: 'hearings',
      label: 'Hearings',
      fields: [],
      show_condition: null
    }
  ];

  constructor(private readonly route: ActivatedRoute,
              private readonly store: Store<fromRoot.State>,
              private readonly featureToggleService: FeatureToggleService) {
  }

  private static enablePrependedTabs(feature: string, userDetails: UserDetails): boolean {
    // TODO disabled now, this is from work allocation, this needed to be synced with work allocation once it's live
    return false;
  }

  public ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case as CaseView;
    this.prependedTabs$ = this.prependedCaseViewTabs();
    this.appendedTabs$ = this.appendedCaseViewTabs();
  }

  private prependedCaseViewTabs(): Observable<CaseTab[]> {
    return combineLatest([
      this.featureToggleService.getValue(AppConstants.FEATURE_NAMES.currentWAFeature, CaseViewerContainerComponent.FEATURE_WORK_ALLOCATION_RELEASE_1),
      this.store.pipe(select(fromRoot.getUserDetails))
    ]).pipe(
      map(([feature, userDetails]: [string, UserDetails]) =>
        CaseViewerContainerComponent.enablePrependedTabs(feature, userDetails) ? this.prependedTabs : [])
    );
  }

  private appendedCaseViewTabs(): Observable<CaseTab[]> {
    return combineLatest([
      this.featureToggleService.getValueOnce<FeatureVariation[]>(AppConstants.FEATURE_NAMES.mcHearingsFeature, []),
      this.store.pipe(select(fromRoot.getUserDetails))
    ]).pipe(
      map(([featureVariations, userDetails]: [FeatureVariation[], UserDetails]) => {
        const jurisdictionID = this.caseDetails.case_type.jurisdiction.id;
        const hasMatchedJurisdictionAndRole = featureVariations.some(featureVariation =>
          this.hasMatchedJurisdictionAndRole(featureVariation, jurisdictionID, userDetails));
        return hasMatchedJurisdictionAndRole ? this.appendedTabs : [];
      })
    );
  }

  private hasMatchedJurisdictionAndRole(featureVariation: FeatureVariation, jurisdictionID: string, userDetails: UserDetails): boolean {
    if (featureVariation.jurisdiction === jurisdictionID) {
      if (userDetails && userDetails.userInfo) {
        return userDetails.userInfo.roles && featureVariation.roles ? userDetails.userInfo.roles.some(userRole =>
          featureVariation.roles.some(role => role === userRole)) : false;
      }
    } else {
      return false;
    }
  }
}
