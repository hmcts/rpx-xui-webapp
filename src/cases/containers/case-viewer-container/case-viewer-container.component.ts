import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CaseTab, CaseView} from '@hmcts/ccd-case-ui-toolkit';
import {FeatureToggleService} from '@hmcts/rpx-xui-common-lib';
import {select, Store} from '@ngrx/store';
import {combineLatest} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {AppUtils} from '../../../app/app-utils';
import {AppConstants} from '../../../app/app.constants';
import * as fromRoot from '../../../app/store';
import {FeatureVariation} from '../../models/feature-variation.model';
import {Utils} from '../../utils/utils';

@Component({
  selector: 'exui-case-viewer-container',
  templateUrl: './case-viewer-container.component.html',
  styleUrls: ['./case-viewer-container.component.scss']
})
export class CaseViewerContainerComponent implements OnInit {
  private static readonly FEATURE_WORK_ALLOCATION_RELEASE_1 = 'WorkAllocationRelease1';
  private static readonly FEATURE_WORK_ALLOCATION_RELEASE_2 = 'WorkAllocationRelease2';

  public caseDetails: CaseView;
  public prependedTabs$: Observable<CaseTab[]>;
  public appendedTabs$: Observable<CaseTab[]>;
  public userRoles$: Observable<string[]>;

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
    this.userRoles$ = this.store.pipe(select(fromRoot.getUserDetails)).pipe(
      map(userDetails => userDetails.userInfo.roles)
    );
  }

  private static enablePrependedTabs(feature: string, userRoles: string[]): boolean {
    return feature === CaseViewerContainerComponent.FEATURE_WORK_ALLOCATION_RELEASE_2
      && !!AppUtils.isLegalOpsOrJudicial(userRoles);
  }

  public ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case as CaseView;
    this.prependedTabs$ = this.prependedCaseViewTabs();
    this.appendedTabs$ = this.appendedCaseViewTabs();
  }

  private prependedCaseViewTabs(): Observable<CaseTab[]> {
    return combineLatest([
      this.featureToggleService.getValue(AppConstants.FEATURE_NAMES.currentWAFeature, CaseViewerContainerComponent.FEATURE_WORK_ALLOCATION_RELEASE_1),
      this.userRoles$
    ]).pipe(
      // @ts-ignore
      map(([feature, userRoles]: [string, string[]]) =>
        CaseViewerContainerComponent.enablePrependedTabs(feature, userRoles) ? this.prependedTabs : [])
    );
  }

  private appendedCaseViewTabs(): Observable<CaseTab[]> {
    return combineLatest([
      this.featureToggleService.getValueOnce<FeatureVariation[]>(AppConstants.FEATURE_NAMES.mcHearingsFeature, []),
      this.userRoles$
    ]).pipe(
      // @ts-ignore
      map(([featureVariations, userRoles]: [FeatureVariation[], string[]]) => {
        const jurisdictionID = this.caseDetails.case_type.jurisdiction.id;
        const hasMatchedJurisdictionAndRole = featureVariations.some(featureVariation =>
          Utils.hasMatchedJurisdictionAndRole(featureVariation, jurisdictionID, userRoles));
        return hasMatchedJurisdictionAndRole ? this.appendedTabs : [];
      })
    );
  }

}
