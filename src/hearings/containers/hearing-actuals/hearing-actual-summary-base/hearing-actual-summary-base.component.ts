import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  ActualHearingDayModel,
  HearingActualsMainModel,
  HearingOutcomeModel
} from '../../../models/hearingActualsMainModel';
import {
  ACTION,
  AnswerSource,
  HearingChannelEnum,
  HearingDateEnum,
  HearingResult,
  PartyType
} from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { PartyDetailsModel } from '../../../models/partyDetails.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { ActualHearingsUtils } from '../../../utils/actual-hearings.utils';

@Component({
  selector: 'exui-hearing-actual-summary-base',
  template: ''

})
export class HearingActualSummaryBaseComponent implements OnInit, OnDestroy {
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
  public successBanner: boolean = false;
  public submitted = false;
  public sub: Subscription;
  public id: string;
  public errors$: Observable<number>;
  public partyChannels: LovRefDataModel[] = [];
  public hearingDateRange: string;
  public hearingDatesAccordion = {} as { [hearingDate: string]: boolean };
  public actualHearingUtils = ActualHearingsUtils;
  public answerSource = AnswerSource;
  public hearingRequestID: string;
  public individualParties: PartyDetailsModel[];

  constructor(
    public readonly hearingStore: Store<fromHearingStore.State>,
    public readonly hearingsService: HearingsService,
    public readonly route: ActivatedRoute,
    public readonly router: Router
  ) {
    this.hearingRoles = this.route.snapshot.data.hearingRole;
    this.hearingTypes = this.route.snapshot.data.hearingTypes;
    this.actualPartHeardReasonCodes = this.route.snapshot.data.actualPartHeardReasonCodes;
    this.actualCancellationReasonCodes = this.route.snapshot.data.cancelHearingActualReasons;
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.hearingState$ = this.hearingStore.select(fromHearingStore.getHearingsFeatureState);
    this.hearingState$.subscribe(state => {
      this.isPaperHearing = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingChannels.includes(HearingChannelEnum.ONPPR);
    });

    this.errors$ = combineLatest([
      this.hearingStore.select(fromHearingStore.getHearingActualsLastError),
      this.hearingStore.select(fromHearingStore.getHearingRequestLastError)
    ]).pipe(map((errors) => errors.filter(item => item).length));

    this.sub = this.hearingState$.pipe(
      filter((state) => !!state.hearingActuals.hearingActualsMainModel),
    )
      .subscribe((state) => {
        this.hearingActualsMainModel = state.hearingActuals.hearingActualsMainModel;
        this.hearingOutcome = this.hearingActualsMainModel.hearingActuals && this.hearingActualsMainModel.hearingActuals.hearingOutcome;
        this.hearingTypeDescription = this.hearingOutcome && this.hearingOutcome.hearingType && this.getHearingTypeDescription(this.hearingOutcome.hearingType);
        this.hearingResultReasonTypeDescription = this.hearingOutcome && this.getHearingResultReasonTypeDescription(this.hearingOutcome);
        this.hearingRequestID = state.hearingRequest.hearingRequestMainModel.requestDetails.hearingRequestID;
        this.hearingResult = this.hearingOutcome && this.hearingOutcome.hearingResult;
        this.actualHearingDays = ActualHearingsUtils.getActualHearingDays(this.hearingActualsMainModel);
        this.hearingDateRange = this.calculateEarliestHearingDate(this.actualHearingDays);
        this.individualParties = state.hearingValues.serviceHearingValuesModel.parties?.filter(party => party.partyType === PartyType.IND);

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

  public getHearingDateText(): string {
    return this.actualHearingDays && this.actualHearingDays.length > 1 ? 'Hearing date(s)' : 'Hearing date';
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

  public isHearingAllRequiredDaysCovered(): boolean {
    let isAllDaysCovered: boolean = true;
    const isActualHearingDaysAvailable = this.hearingActualsMainModel.hearingActuals && this.hearingActualsMainModel.hearingActuals.actualHearingDays
      && this.hearingActualsMainModel.hearingActuals.actualHearingDays.length > 0;
    if (isActualHearingDaysAvailable) {
      this.actualHearingDays.forEach((actualHearingDay) => {
        if (!actualHearingDay.notRequired && !this.isDetailsProvidedForDay(actualHearingDay)) {
          isAllDaysCovered = false;
        }
      });
    }
    return isAllDaysCovered;
  }

  public isAcutalTimingAvailable(actualDay: ActualHearingDayModel): boolean {
    return actualDay.notRequired || Boolean(actualDay.hearingDate && actualDay.hearingStartTime
      && actualDay.hearingEndTime && actualDay.pauseDateTimes);
  }

  public getHearingTypeDescription(hearingType: string): string {
    const hearingTypeFromLookup = this.hearingTypes && this.hearingTypes.find(x => x.key.toLowerCase() === hearingType.toLowerCase());

    return hearingTypeFromLookup ? hearingTypeFromLookup.value_en : '';
  }

  public isHearingActualsDaysAvailable(hearingDate: string) {
    const hearingInfo = this.hearingActualsMainModel.hearingActuals && this.hearingActualsMainModel.hearingActuals.actualHearingDays
      && this.hearingActualsMainModel.hearingActuals.actualHearingDays.length
      && this.hearingActualsMainModel.hearingActuals.actualHearingDays
        .find((hearingsInfo: ActualHearingDayModel) => hearingsInfo.hearingDate === hearingDate);
    return !!hearingInfo && this.isAcutalTimingAvailable(hearingInfo);
  }

  public isHearingActualsPartiesAvailable(hearingDate: string): boolean {
    const hearingInfo = this.hearingActualsMainModel.hearingActuals && this.hearingActualsMainModel.hearingActuals.actualHearingDays
      && this.hearingActualsMainModel.hearingActuals.actualHearingDays.length
      && this.hearingActualsMainModel.hearingActuals.actualHearingDays.find((hearingsInfo: ActualHearingDayModel) => hearingsInfo.hearingDate === hearingDate);
    return hearingInfo && (hearingInfo.notRequired || hearingInfo.actualDayParties.length > 0);
  }

  public isAllHearingActualsPartiesAvailable(hearingActualsMainModel: HearingActualsMainModel) {
    const hasAllActualDays = hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays.length === hearingActualsMainModel.hearingPlanned.plannedHearingDays.length;
    return hasAllActualDays && hearingActualsMainModel.hearingActuals.actualHearingDays.every(
      actualDay => actualDay.notRequired || actualDay.actualDayParties.length > 0
    );
  }

  public confirmActualHearingTimeAndParties(hearingDay: ActualHearingDayModel) {
    const updatedActuals = {
      hearingDate: hearingDay.hearingDate,
      hearingStartTime: hearingDay.hearingStartTime,
      hearingEndTime: hearingDay.hearingEndTime,
      pauseDateTimes: hearingDay.pauseDateTimes,
      actualDayParties: [...hearingDay.actualDayParties]
    } as ActualHearingDayModel;
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals
      (this.hearingActualsMainModel, hearingDay.hearingDate, updatedActuals);

    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals: patchedHearingActuals,
    }));
  }

  public calculateEarliestHearingDate(hearingDays: ActualHearingDayModel[]): string {
    const moments: moment.Moment[] = hearingDays.map(d => moment(d.hearingDate));
    if (moments.length > 1) {
      return `${moment.min(moments).format('DD MMMM YYYY')} - ${moment.max(moments).format('DD MMMM YYYY')}`;
    } else {
      return moment.max(moments).format(HearingDateEnum.DisplayMonth);
    }
  }

  public getPauseDateTime(day: ActualHearingDayModel, state: 'start' | 'end'): string {
    return ActualHearingsUtils.getPauseDateTime(day, state);
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
