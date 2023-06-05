import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActualHearingDayModel } from '../../../models/hearingActualsMainModel';
import { HearingActualAddEditSummaryEnum, HearingResult } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { ActualHearingsUtils } from '../../../utils/actual-hearings.utils';
import { HearingActualsSummaryBaseComponent } from '../hearing-actuals-summary-base/hearing-actuals-summary-base.component';

@Component({
  selector: 'exui-hearing-actuals-add-edit-summary',
  templateUrl: './hearing-actuals-add-edit-summary.component.html',
  styleUrls: ['./hearing-actuals-add-edit-summary.component.scss']
})
export class HearingActualsAddEditSummaryComponent extends HearingActualsSummaryBaseComponent {
  public successBanner = false;

  constructor(public readonly hearingStore: Store<fromHearingStore.State>,
    public readonly hearingsService: HearingsService,
    public readonly route: ActivatedRoute,
    public readonly router: Router
  ) {
    super(hearingStore, hearingsService, route, router);
    this.partyChannels = [...this.route.snapshot.data.partyChannels, ...this.route.snapshot.data.partySubChannels];
  }

  public getHearingDateText(): string {
    return this.actualHearingDays && this.actualHearingDays.length > 1 ? 'Hearing date(s)' : 'Hearing date';
  }

  /**
   * TODO: Navigate to check your answers page if not cancelled and valid
   * Determines whether submit hearing details on
   */
  public async onSubmitHearingDetails(): Promise<void> {
    if (this.hearingResult === HearingResult.CANCELLED || this.isValid()) {
      await this.router.navigate(['/', 'hearings', 'actuals', this.hearingRequestID, 'hearing-actual-edit-summary']);
    }
  }

  public changeWasThisHearingDayRequired(hearingDay: ActualHearingDayModel) {
    this.validationErrors = [];
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals(
      this.hearingActualsMainModel, hearingDay.hearingDate, { notRequired: !hearingDay.notRequired } as ActualHearingDayModel
    );
    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals: patchedHearingActuals
    }));
  }

  public confirmActualHearingTimeForDay(hearingDay: ActualHearingDayModel) {
    this.resetErrorMessages();
    const updatedActuals = {
      hearingDate: hearingDay.hearingDate,
      hearingStartTime: hearingDay.hearingStartTime,
      hearingEndTime: hearingDay.hearingEndTime,
      pauseDateTimes: hearingDay.pauseDateTimes
    } as ActualHearingDayModel;
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals(
      this.hearingActualsMainModel, hearingDay.hearingDate, updatedActuals
    );
    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals: patchedHearingActuals
    }));
    this.showSuccessBannerMessage();
  }

  public confirmActualPartiesForDay(hearingDay: ActualHearingDayModel) {
    this.resetErrorMessages();
    // Organisation parties do not have partyChannelSubType and can be ignored
    // as they do not attend the actual hearing
    const individualPartyIds = this.individualParties.map((party) => party.partyID);
    const actualDayParties = hearingDay?.actualDayParties?.filter((party) => individualPartyIds.includes(party.actualPartyId));
    const updatedActuals = {
      actualDayParties: [...actualDayParties]
    } as ActualHearingDayModel;
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals(
      this.hearingActualsMainModel, hearingDay.hearingDate, updatedActuals
    );
    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals: patchedHearingActuals
    }));
    this.showSuccessBannerMessage();
  }

  private isValid(): boolean {
    this.resetErrorMessages();
    if (!this.hearingResult || this.hearingResult === '') {
      this.validationErrors.push({
        id: 'hearing-stage-result-update-link',
        message: HearingActualAddEditSummaryEnum.HearingResultError
      });
      this.hearingStageResultErrorMessage = HearingActualAddEditSummaryEnum.HearingResultError;
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return false;
    }
    return true;
  }

  private resetErrorMessages(): void {
    this.validationErrors = [];
    this.hearingStageResultErrorMessage = '';
  }

  private showSuccessBannerMessage(): void {
    this.successBanner = true;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
