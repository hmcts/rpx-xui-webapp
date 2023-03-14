import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ActualHearingDayModel,
} from '../../../models/hearingActualsMainModel';
import {
  HearingActualAddEditSummaryEnum,
  HearingResult
} from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { ActualHearingsUtils } from '../../../utils/actual-hearings.utils';
import { HearingActualSummaryBaseComponent } from '../hearing-actual-summary-base/hearing-actual-summary-base.component';

@Component({
  selector: 'exui-hearing-actual-add-edit-summary',
  templateUrl: './hearing-actual-add-edit-summary.component.html',
  styleUrls: ['./hearing-actual-add-edit-summary.component.scss']
})
export class HearingActualAddEditSummaryComponent extends HearingActualSummaryBaseComponent {
  public actualHearingUtils = ActualHearingsUtils;

  constructor(
    public readonly hearingStore: Store<fromHearingStore.State>,
    public readonly hearingsService: HearingsService,
    public readonly route: ActivatedRoute,
    public readonly router: Router
  ) {
    super(hearingStore, hearingsService, route, router);
    this.partyChannels = [...this.route.snapshot.data.partyChannels, ...this.route.snapshot.data.partySubChannels];
  }

  public onSubmitHearingDetails(): void {
    this.submitted = true;

    if (this.hearingResult === HearingResult.CANCELLED || this.isValid()) {
      this.router.navigate(['/', 'hearings', 'actuals', this.hearingRequestID, 'hearing-actual-summary']);
    }
  }

  public changeWasThisHearingDayRequired(hearingDay: ActualHearingDayModel) {
    this.validationErrors = [];
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals(this.hearingActualsMainModel, hearingDay.hearingDate, { notRequired: !hearingDay.notRequired } as ActualHearingDayModel);
    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals: patchedHearingActuals,
    }));
  }

  public confirmActualHearingTimeAndParties(hearingDay: ActualHearingDayModel) {
    // Organisation parties do not have partyChannelSubType and can be ignored
    // as they do not attend the actual hearing
    const individualPartyIds = this.individualParties.map(party => party.partyID);
    const actualDayParties = hearingDay?.actualDayParties?.filter(party => individualPartyIds.includes(party.actualPartyId));
    const updatedActuals = {
      hearingDate: hearingDay.hearingDate,
      hearingStartTime: hearingDay.hearingStartTime,
      hearingEndTime: hearingDay.hearingEndTime,
      pauseDateTimes: hearingDay.pauseDateTimes,
      actualDayParties: [...actualDayParties]
    } as ActualHearingDayModel;
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals(
      this.hearingActualsMainModel, hearingDay.hearingDate, updatedActuals
    );
    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals: patchedHearingActuals,
    }));
  }

  private isValid(): boolean {
    let isValid: boolean = true;
    this.validationErrors = [];
    this.hearingStageResultErrorMessage = '';

    if (!this.hearingResult || this.hearingResult === '') {
      this.validationErrors.push({
        id: 'hearing-stage-result-update-link',
        message: HearingActualAddEditSummaryEnum.HearingResultError
      });
      this.hearingStageResultErrorMessage = HearingActualAddEditSummaryEnum.HearingResultError;
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      isValid = false;
    }

    return isValid;
  }
}
