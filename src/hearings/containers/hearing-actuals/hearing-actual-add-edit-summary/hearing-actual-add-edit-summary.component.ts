import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  ActualHearingDayModel,
  HearingActualsMainModel,
  HearingOutcomeModel,
  PlannedDayPartyModel
} from '../../../models/hearingActualsMainModel';
import { HearingRequestMainModel } from '../../../models/hearingRequestMain.model';
import {
  ACTION,
  HearingActualAddEditSummaryEnum,
  HearingChannelEnum,
  HearingDateEnum,
  HearingResult
} from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { ActualHearingsUtils } from '../../../utils/actual-hearings.utils';

@Component({
  selector: 'exui-hearing-actual-add-edit-summary',
  templateUrl: './hearing-actual-add-edit-summary.component.html',
  styleUrls: ['./hearing-actual-add-edit-summary.component.scss']
})
export class HearingActualAddEditSummaryComponent implements OnInit, OnDestroy {
  public hearingState$: Observable<fromHearingStore.State>;
  public isPaperHearing: boolean;
  public hearingActualsMainModel: HearingActualsMainModel;
  public hearingOutcome: HearingOutcomeModel;
  public hearingRoles: LovRefDataModel[] = [];
  public actualHearingDays: ActualHearingDayModel[];
  public hearingTypes: LovRefDataModel[];
  public actualPartHeardReasonCodes: LovRefDataModel[];
  public actualCancellationReasonCodes: LovRefDataModel[];
  public hearingResult: string;
  public hearingTypeDescription: string;
  public hearingResultReasonTypeDescription: string;
  public validationErrors: { id: string, message: string }[] = [];
  public serverErrors: { id: string, message: string }[] = [
    { id: 'serverError', message: 'There was a system error and your request could not be processed. Please try again.' }
  ];
  public hearingStageResultErrorMessage = '';
  public hearingTimingResultErrorMessage = '';
  public hearingPartiesResultErrorMessage = '';
  public successBanner: boolean = false;
  public submitted = false;
  public sub: Subscription;
  public id: string;
  public errors$: Observable<number>;
  public partyChannels: LovRefDataModel[] = [];
  public hearingDateRange: string;
  public hearingDatesAccordion = {} as { [hearingDate: string]: boolean};
  public hearingRequestMainModel: HearingRequestMainModel;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>, private readonly hearingsService: HearingsService, private readonly route: ActivatedRoute) {
    this.hearingRoles = this.route.snapshot.data.hearingRole;
    this.hearingTypes = this.route.snapshot.data.hearingTypes;
    this.partyChannels = this.route.snapshot.data.partyChannel;
    this.actualPartHeardReasonCodes = this.route.snapshot.data.actualPartHeardReasonCodes;
    this.actualCancellationReasonCodes = this.route.snapshot.data.actualCancellationReasonCodes;
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.hearingState$ = this.hearingStore.select(fromHearingStore.getHearingsFeatureState);
    this.hearingState$.subscribe(state => {
      this.isPaperHearing = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingChannels.includes(HearingChannelEnum.ONPPR);
      this.hearingRequestMainModel = state.hearingRequest.hearingRequestMainModel;
    });
    this.errors$ = combineLatest([
      this.hearingStore.select(fromHearingStore.getHearingActualsLastError),
      this.hearingStore.select(fromHearingStore.getHearingRequestLastError)
    ]).map((errors) => errors.filter(item => item).length);

    this.sub = this.hearingState$.pipe(
        filter((state) => !!state.hearingActuals.hearingActualsMainModel),
      )
      .subscribe((state) => {
        this.hearingActualsMainModel = state.hearingActuals.hearingActualsMainModel;
        this.hearingOutcome = this.hearingActualsMainModel.hearingActuals && this.hearingActualsMainModel.hearingActuals.hearingOutcome;
        this.hearingTypeDescription = this.hearingOutcome && this.hearingOutcome.hearingType && this.getHearingTypeDescription(this.hearingOutcome.hearingType);
        this.hearingResultReasonTypeDescription = this.hearingOutcome && this.getHearingResultReasonTypeDescription(this.hearingOutcome);
        this.hearingResult = this.hearingOutcome && this.hearingOutcome.hearingResult;
        this.actualHearingDays = ActualHearingsUtils.getActualHearingDays(this.hearingActualsMainModel);
        this.hearingDateRange = this.calculateEarliestHearingDate(this.actualHearingDays);

        this.hearingActualsMainModel.hearingPlanned.plannedHearingDays.forEach(
          plannedDay => {
            const key = ActualHearingsUtils.getDate(plannedDay.plannedStartTime);
            if (!this.hearingDatesAccordion.hasOwnProperty(key)) {
              this.hearingDatesAccordion[key] = false;
            }
          });
      });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public onBack(): void {
    this.hearingsService.navigateAction(ACTION.BACK);
  }

  public togglePaperHearing() {
    this.isPaperHearing = !this.isPaperHearing;
  }

  public onSubmitHearingDetails(): void {
    this.submitted = true;

    if (this.hearingResult === HearingResult.CANCELLED || this.isValid()) {
      if (this.isPaperHearing) {
        const hearingDetails = {
          ...this.hearingRequestMainModel.hearingDetails,
          hearingChannels: [HearingChannelEnum.ONPPR.toString()]
        };
        const hearingRequestMainModel = {
          ...this.hearingRequestMainModel,
          hearingDetails
        };
        console.log(hearingRequestMainModel);
        this.hearingStore.dispatch(new fromHearingStore.UpdateActualHearingRequest(hearingRequestMainModel));
      }
      this.hearingStore.dispatch(new fromHearingStore.SubmitHearingActuals(this.id));
    }
  }

  public getRepresentingAttendee(partyId: string, hearingDate: string): string {
    const plannedHearingDay = this.hearingActualsMainModel &&
      this.hearingActualsMainModel.hearingPlanned.plannedHearingDays.find(
      plannedDay => ActualHearingsUtils.getDate(plannedDay.plannedStartTime) === hearingDate
    );

    let party: PlannedDayPartyModel;
    if (plannedHearingDay) {
      party = plannedHearingDay.parties.find(x => x.partyID === partyId.toString());
    }

    if (party && party.individualDetails) {
      return `${party.individualDetails.firstName} ${party.individualDetails.lastName}`;
    } else {
      return '';
    }
  }

  public getHearingResultReasonTypeDescription(hearingOutcome: HearingOutcomeModel): string {
    const hearingActualReasonsRefData = hearingOutcome.hearingResult === HearingResult.COMPLETED
      ? [] : hearingOutcome.hearingResult === HearingResult.ADJOURNED
        ? this.actualPartHeardReasonCodes : this.actualCancellationReasonCodes;

    const hearingActualReason = hearingActualReasonsRefData && hearingActualReasonsRefData.find(refData => refData.key === hearingOutcome.hearingResultReasonType);
    if (hearingActualReason) {
      return hearingActualReason.value_en;
    }
    return '';
  }

  public getHearingTypeDescription(hearingType: string): string {
    const hearingTypeFromLookup = this.hearingTypes && this.hearingTypes.find(x => x.key.toLowerCase() === hearingType.toLowerCase());

    return hearingTypeFromLookup ? hearingTypeFromLookup.value_en : '';
  }

  public getParties(actualHearingDay: ActualHearingDayModel) {
    const plannedDayIndex = ActualHearingsUtils.getPlannedDayIndexFromHearingDate(this.hearingActualsMainModel, actualHearingDay.hearingDate);
    return this.hearingActualsMainModel.hearingPlanned.plannedHearingDays[plannedDayIndex].parties;
  }

  public getAttendees(actualHearingDay: ActualHearingDayModel) {
    const plannedDayIndex = ActualHearingsUtils.getPlannedDayIndexFromHearingDate(this.hearingActualsMainModel, actualHearingDay.hearingDate);
    const plannedParties = this.hearingActualsMainModel.hearingPlanned.plannedHearingDays[plannedDayIndex].parties;
    const plannedPartiesIds = plannedParties.map(party => party.partyID);

    return actualHearingDay.actualDayParties.filter(actualParty => !plannedPartiesIds.includes(actualParty.actualPartyId));
  }


  private isAllHearingActualsTimingAvailable(hearingActualsMainModel: HearingActualsMainModel) {
    const hasAllActualDays = hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays.length === hearingActualsMainModel.hearingPlanned.plannedHearingDays.length;

    return hasAllActualDays && hearingActualsMainModel.hearingActuals.actualHearingDays.every(
      actualDay => actualDay.notRequired || Boolean(actualDay.hearingDate && actualDay.hearingStartTime
        && actualDay.hearingEndTime && actualDay.pauseDateTimes)
    );
  }

  private isAllHearingActualsPartiesAvailable(hearingActualsMainModel: HearingActualsMainModel) {
    const hasAllActualDays = hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays.length === hearingActualsMainModel.hearingPlanned.plannedHearingDays.length;
    return hasAllActualDays && hearingActualsMainModel.hearingActuals.actualHearingDays.every(
      actualDay => actualDay.notRequired || actualDay.actualDayParties.length > 0
    );
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
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

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

  public changeWasThisHearingDayRequired(hearingDay: ActualHearingDayModel) {
    this.validationErrors = [];
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals
    (this.hearingActualsMainModel, hearingDay.hearingDate, { notRequired: !hearingDay.notRequired } as ActualHearingDayModel);

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
      this.validationErrors.push({
        id: 'hearing-timing-result-confirm-link',
        message: HearingActualAddEditSummaryEnum.ConfirmUpdateError
      });
      this.hearingTimingResultErrorMessage = HearingActualAddEditSummaryEnum.ConfirmUpdateError;
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      isValid = false;
    }
    if (!this.isAllHearingActualsPartiesAvailable(this.hearingActualsMainModel)) {
      this.validationErrors.push({
        id: 'hearing-parties-result-confirm-link',
        message: HearingActualAddEditSummaryEnum.ConfirmUpdateError
      });
      this.hearingPartiesResultErrorMessage = HearingActualAddEditSummaryEnum.ConfirmUpdateError;
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      isValid = false;
    }

    if (!this.hearingResult && this.hearingResult === '') {
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

  public calculateEarliestHearingDate(hearingDays: ActualHearingDayModel[]): string {
    const moments: moment.Moment[] = hearingDays.map(d => moment(d.hearingDate));
    if (moments.length > 1) {
      return `${moment.min(moments).format('DD MMMM YYYY')} - ${moment.max(moments).format('DD MMMM YYYY')}`;
    } else {
      return moment.max(moments).format(HearingDateEnum.DisplayMonth);
    }
  }

  public getPauseStartDateTime(day) {
    return day.pauseDateTimes && day.pauseDateTimes.length && day.pauseDateTimes[0] && day.pauseDateTimes[0].pauseStartTime
      ? moment(day.pauseDateTimes[0].pauseStartTime).format(HearingDateEnum.DisplayTime) : null;
  }

  public getPauseEndDateTime(day) {
    return day.pauseDateTimes && day.pauseDateTimes.length && day.pauseDateTimes[0] && day.pauseDateTimes[0].pauseStartTime
      ? moment(day.pauseDateTimes[0].pauseEndTime).format(HearingDateEnum.DisplayTime) : null;
  }

  public isDetailsProvidedForDay(day): boolean {
    if (this.hearingActualsMainModel.hearingActuals && this.hearingActualsMainModel.hearingActuals.actualHearingDays
      && this.hearingActualsMainModel.hearingActuals.actualHearingDays.length > 0) {
      const actualDay = this.hearingActualsMainModel.hearingActuals.actualHearingDays.find(d => Date.parse(d.hearingDate) === Date.parse(day.hearingDate));
      if (actualDay) {
        const hasActualTiming = Boolean(actualDay.hearingDate && actualDay.hearingStartTime && actualDay.hearingEndTime && actualDay.pauseDateTimes);
        const hasActualParties = actualDay.actualDayParties.length > 0;

        return hasActualTiming && hasActualParties || actualDay.notRequired;
      }
    }

    return false;
  }
}
