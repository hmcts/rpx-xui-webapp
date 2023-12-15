import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { AppConstants } from '../../../app/app.constants';
import { ServiceHearingValuesModel } from '../../models/serviceHearingValues.model';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-hearing-parties-title',
  templateUrl: './hearing-parties-title.component.html'
})
export class HearingPartiesTitleComponent implements OnInit, OnDestroy {
  public caseTitle: string;
  public serviceValueSub: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
    private readonly featureToggleService: FeatureToggleService) {}

  public ngOnInit(): void {
    const isHearingAmendmentsEnabled$ = this.featureToggleService.isEnabled(AppConstants.FEATURE_NAMES.enableHearingAmendments);
    const hearingValues$ = this.hearingStore.pipe<ServiceHearingValuesModel>(select(fromHearingStore.getHearingValuesModel));

    this.serviceValueSub = combineLatest([isHearingAmendmentsEnabled$, hearingValues$]).subscribe(([isHearingAmendmentsEnabled, hearingValues]) => {
      this.caseTitle = isHearingAmendmentsEnabled
        ? hearingValues?.hmctsInternalCaseName || ''
        : hearingValues?.publicCaseName || '';
    });
  }

  public ngOnDestroy(): void {
    this.serviceValueSub?.unsubscribe();
  }
}
