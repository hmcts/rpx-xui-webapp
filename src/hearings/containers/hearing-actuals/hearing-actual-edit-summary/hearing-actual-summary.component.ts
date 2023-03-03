import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {
  ActualHearingDayModel,
  HearingActualsMainModel,
} from '../../../models/hearingActualsMainModel';
import {
  HearingActualAddEditSummaryEnum,
  HearingResult
} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import {ActualHearingsUtils} from '../../../utils/actual-hearings.utils';
import { HearingActualSummaryBaseComponent } from '../hearing-actual-summary-base/hearing-actual-summary-base.component';

@Component({
  selector: 'exui-hearing-actual-summary',
  templateUrl: './hearing-actual-summary.component.html',
  styleUrls: ['./hearing-actual-summary.component.scss']
})
export class HearingActualSummaryComponent extends HearingActualSummaryBaseComponent {
  public serverErrors: { id: string, message: string }[] = [
    {id: 'serverError', message: 'There was a system error and your request could not be processed. Please try again.'}
  ];
  public hearingTimingResultErrorMessage = '';
  public hearingPartiesResultErrorMessage = '';
  public hearingDaysRequiredErrorMessage = '';
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

  public hearingActualAddEditUrl(): string {
    return `/hearings/actuals/${this.hearingRequestID}/hearing-actual-add-edit-summary`;
  }

  public onSubmitHearingDetails(): void {
    this.submitted = true;

    if (this.hearingResult === HearingResult.CANCELLED || this.isValid()) {
      this.hearingStore.dispatch(new fromHearingStore.SubmitHearingActuals(this.id));
    }
  }

  private isAllHearingActualsTimingAvailable(hearingActualsMainModel: HearingActualsMainModel) {
    const hasAllActualDays = hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays.length === hearingActualsMainModel.hearingPlanned.plannedHearingDays.length;

    return hasAllActualDays && hearingActualsMainModel.hearingActuals.actualHearingDays.every(
      actualDay => this.isAcutalTimingAvailable(actualDay)
    );
  }

  public confirmActualHearingTimeForDay(hearingDay: ActualHearingDayModel) {
    this.validationErrors = [];
    this.hearingTimingResultErrorMessage = '';
    this.successBanner = true;

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    const updatedActuals = {
      hearingDate: hearingDay.hearingDate,
      hearingStartTime: hearingDay.hearingStartTime,
      hearingEndTime: hearingDay.hearingEndTime,
      pauseDateTimes: hearingDay.pauseDateTimes,
    } as ActualHearingDayModel;
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals
    (this.hearingActualsMainModel, hearingDay.hearingDate, updatedActuals);

    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals: patchedHearingActuals,
    }));
  }

  public confirmActualPartiesForDay(hearingDay: ActualHearingDayModel) {
    this.validationErrors = [];
    this.hearingPartiesResultErrorMessage = '';
    this.successBanner = true;

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    const updatedActuals = {
      actualDayParties: [...hearingDay.actualDayParties]
    } as ActualHearingDayModel;
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals
    (this.hearingActualsMainModel, hearingDay.hearingDate, updatedActuals);

    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals: patchedHearingActuals,
    }));
  }

  private isValid(): boolean {
    let isValid: boolean = true;
    this.validationErrors = [];
    this.hearingStageResultErrorMessage = '';
    this.hearingTimingResultErrorMessage = '';
    this.hearingPartiesResultErrorMessage = '';
    if (!this.isAllHearingActualsTimingAvailable(this.hearingActualsMainModel)) {
      this.hearingTimingResultErrorMessage = HearingActualAddEditSummaryEnum.ConfirmUpdateError;
      isValid = false;
    }
    if (!this.isAllHearingActualsPartiesAvailable(this.hearingActualsMainModel)) {
      this.hearingPartiesResultErrorMessage = HearingActualAddEditSummaryEnum.ConfirmUpdateError;
      isValid = false;
    }
    if (!this.isAllHearingActualsTimingAvailable(this.hearingActualsMainModel) || !this.isAllHearingActualsPartiesAvailable(this.hearingActualsMainModel)) {
      this.validationErrors.push({
        id: 'hearing-timing-result-confirm-link',
        message: HearingActualAddEditSummaryEnum.ConfirmUpdateError
      });
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    if (!this.isHearingAllRequiredDaysCovered()) {
      this.validationErrors.push({
        id: 'actual-hearing-dates',
        message: HearingActualAddEditSummaryEnum.AllDaysCoveredError
      });
      this.hearingDaysRequiredErrorMessage = HearingActualAddEditSummaryEnum.AllDaysCoveredError;
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      isValid = false;
    }

    if (!this.hearingResult || this.hearingResult === '') {
      this.validationErrors.push({
        id: 'hearing-stage-result-update-link',
        message: HearingActualAddEditSummaryEnum.HearingResultError
      });
      this.hearingStageResultErrorMessage = HearingActualAddEditSummaryEnum.HearingResultError;
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      isValid = false;
    }

    return isValid;
  }
}
