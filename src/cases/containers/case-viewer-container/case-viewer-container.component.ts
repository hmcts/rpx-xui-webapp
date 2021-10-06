import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseTab, CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { FeatureVariation } from 'src/cases/models/feature-variation.model';
import { AppConstants } from '../../../app/app.constants';
import { UserDetails } from '../../../app/models/user-details.model';
import * as fromRoot from '../../../app/store';

@Component({
  selector: 'exui-case-viewer-container',
  templateUrl: './case-viewer-container.component.html',
  styleUrls: ['./case-viewer-container.component.scss']
})
export class CaseViewerContainerComponent implements OnInit {
  private static readonly FEATURE_HEARING = 'Hearings';
  public caseDetails: CaseView;

  private appendedTabs: CaseTab[] = [
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

  private static enableAppendedTabs(featureRoles:  string[], userDetails: UserDetails): boolean {
    console.log('featureRoles', featureRoles);
    console.log('userDetails', userDetails);

    if (userDetails && userDetails.userInfo) {
      return userDetails.userInfo.roles && featureRoles.length ? userDetails.userInfo.roles.some(userRole => featureRoles.some(role => role === userRole)): false;
    }
    return false;
  }

  public ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case as CaseView;    
    const lastCaseTab = Math.max.apply(Math, this.caseDetails.tabs.map(function(o) { return o.order; }));
    this.appendedTabs[0].order = lastCaseTab;
    this.appendedCaseViewTabs().subscribe(appendResult => {
      if (appendResult.length) {
        this.caseDetails.tabs.push(appendResult[0] as CaseTab);
      }
    });
  }

  private appendedCaseViewTabs(): Observable<CaseTab[]> {
    const returnValue = combineLatest([
      this.featureToggleService.getValueOnce<FeatureVariation[]>(AppConstants.FEATURE_NAMES.mcHearingsFeature, []),
      this.store.pipe(select(fromRoot.getUserDetails))
    ]).pipe(
      map(([featureVariations, userDetails]: [FeatureVariation[], UserDetails]) => {
        const featureRoles = featureVariations.length ? featureVariations[0].roles: [];
        return CaseViewerContainerComponent.enableAppendedTabs(featureRoles, userDetails) ? this.appendedTabs : [];
      })
    );
    return returnValue;
  }
}
