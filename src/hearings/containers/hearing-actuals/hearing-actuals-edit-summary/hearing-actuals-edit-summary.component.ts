import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ActualHearingDayModel
} from '../../../models/hearingActualsMainModel';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { ActualHearingsUtils } from '../../../utils/actual-hearings.utils';
import { HearingActualsSummaryBaseComponent } from '../hearing-actuals-summary-base/hearing-actuals-summary-base.component';

@Component({
  selector: 'exui-hearing-actuals-edit-summary',
  templateUrl: './hearing-actuals-edit-summary.component.html',
  styleUrls: ['./hearing-actuals-edit-summary.component.scss']
})
export class HearingActualsEditSummaryComponent extends HearingActualsSummaryBaseComponent {
  public hearingTimingResultErrorMessage = '';
  public hearingPartiesResultErrorMessage = '';
  public hearingDaysRequiredErrorMessage = '';
  constructor(
    public readonly hearingStore: Store<fromHearingStore.State>,
    public readonly hearingsService: HearingsService,
    public readonly route: ActivatedRoute,
    public readonly router: Router
  ) {
    super(hearingStore, hearingsService, route, router);
    this.partyChannels = [...this.route.snapshot.data.partyChannels, ...this.route.snapshot.data.partySubChannels];
  }

  public hearingActualAddEditUrl(): string {
    return `/hearings/actuals/${this.hearingRequestID}/hearing-actual-add-edit-summary`;
  }

  public onSubmitHearingDetails(): void {
    this.hearingStore.dispatch(new fromHearingStore.SubmitHearingActuals(this.id));
  }

  public confirmActualHearingTimeForDay(hearingDay: ActualHearingDayModel) {
    this.validationErrors = [];
    this.hearingTimingResultErrorMessage = '';
    this.successBanner = true;

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const updatedActuals = {
      hearingDate: hearingDay.hearingDate,
      hearingStartTime: hearingDay.hearingStartTime,
      hearingEndTime: hearingDay.hearingEndTime,
      pauseDateTimes: hearingDay.pauseDateTimes
    } as ActualHearingDayModel;
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals(this.hearingActualsMainModel, hearingDay.hearingDate, updatedActuals);

    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals: patchedHearingActuals
    }));
  }

  public confirmActualPartiesForDay(hearingDay: ActualHearingDayModel) {
    this.validationErrors = [];
    this.hearingPartiesResultErrorMessage = '';
    this.successBanner = true;

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    const updatedActuals = {
      actualDayParties: [...hearingDay.actualDayParties]
    } as ActualHearingDayModel;
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals(this.hearingActualsMainModel, hearingDay.hearingDate, updatedActuals);

    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals: patchedHearingActuals
    }));
  }
}
