import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CaseTab, CaseView} from '@hmcts/ccd-case-ui-toolkit';
import {FeatureToggleService} from '@hmcts/rpx-xui-common-lib';
import {select, Store} from '@ngrx/store';
import {combineLatest, of} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import { AllocateRoleService } from '../../../role-access/services';
import {AppUtils} from '../../../app/app-utils';
import {AppConstants} from '../../../app/app.constants';
import * as fromRoot from '../../../app/store';
import { WASupportedJurisdictionsService } from '../../../work-allocation/services';
import {FeatureVariation} from '../../models/feature-variation.model';
import {Utils} from '../../utils/utils';
import { WAFeatureConfig } from 'src/work-allocation/models/common/service-config.model';

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
              private readonly featureToggleService: FeatureToggleService,
              private readonly allocateRoleService: AllocateRoleService,
              private readonly waService: WASupportedJurisdictionsService) {
    this.userRoles$ = this.store.pipe(select(fromRoot.getUserDetails)).pipe(
      map(userDetails => userDetails.userInfo.roles)
    );
  }

  private enablePrependedTabs(features: WAFeatureConfig, userRoles: string[], supportedServices: string[], excludedRoles: string[]): boolean {
    const caseJurisdiction = this.caseDetails && this.caseDetails.case_type && this.caseDetails.case_type.jurisdiction ? this.caseDetails.case_type.jurisdiction.id : null;
    const caseType = this.caseDetails && this.caseDetails.case_type ? this.caseDetails.case_type.id : null;
    let requiredFeature = false;
    features.configurations.forEach(serviceConfig => {
      if (serviceConfig.serviceName === caseJurisdiction && serviceConfig.caseTypes.includes(caseType)) {
          requiredFeature = parseFloat(serviceConfig.releaseVersion) >= 2 ? true : false ;
      }
    })
    return requiredFeature && !!AppUtils.isLegalOpsOrJudicial(userRoles) && !!AppUtils.showWATabs(supportedServices, caseJurisdiction, userRoles, excludedRoles);
  }

  public ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case as CaseView;
    this.allocateRoleService.manageLabellingRoleAssignment(this.caseDetails.case_id).subscribe();
    this.prependedTabs$ = this.prependedCaseViewTabs();
    this.appendedTabs$ = this.appendedCaseViewTabs();
  }

  private prependedCaseViewTabs(): Observable<CaseTab[]> {
    return combineLatest([
      this.featureToggleService.getValue(AppConstants.FEATURE_NAMES.waServiceConfig, null),
      this.userRoles$,
      this.waService.getWASupportedJurisdictions(),
      this.featureToggleService.getValue(AppConstants.FEATURE_NAMES.excludedRolesForCaseTabs, [])
    ]).pipe(
      // @ts-ignore
      map(([feature, userRoles, supportedServices, excludedRoles]: [WAFeatureConfig, string[]]) =>
        this.enablePrependedTabs(feature, userRoles, supportedServices, excludedRoles) ? this.prependedTabs : [])
    ).catch(() => this.prependedTabs$ = of([]));
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
