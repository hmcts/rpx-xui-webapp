<<<<<<< HEAD
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
=======
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
>>>>>>> 5d20462e7 (CR comments fix)
import {
  ActualHearingDayModel
} from '../../../models/hearingActualsMainModel';
import {
  HearingActualAddEditSummaryEnum,
  HearingResult
} from '../../../models/hearings.enum';
<<<<<<< HEAD
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { ActualHearingsUtils } from '../../../utils/actual-hearings.utils';
import { HearingActualSummaryBaseComponent } from '../hearing-actual-summary-base/hearing-actual-summary-base.component';
=======
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { ActualHearingsUtils } from '../../../utils/actual-hearings.utils';
>>>>>>> 5d20462e7 (CR comments fix)

@Component({
  selector: 'exui-hearing-actual-add-edit-summary',
  templateUrl: './hearing-actual-add-edit-summary.component.html',
  styleUrls: ['./hearing-actual-add-edit-summary.component.scss']
})
<<<<<<< HEAD
export class HearingActualAddEditSummaryComponent extends HearingActualSummaryBaseComponent {
=======
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
  public hearingDaysRequiredErrorMessage = '';
  public successBanner: boolean = false;
  public submitted = false;
  public sub: Subscription;
  public id: string;
  public errors$: Observable<number>;
  public partyChannels: LovRefDataModel[] = [];
  public showSpinner$: Observable<boolean>;
  public hearingDateRange: string;
  public hearingDatesAccordion = {} as { [hearingDate: string]: boolean };
>>>>>>> 5d20462e7 (CR comments fix)
  public actualHearingUtils = ActualHearingsUtils;

<<<<<<< HEAD
  constructor(
    public readonly hearingStore: Store<fromHearingStore.State>,
    public readonly hearingsService: HearingsService,
    public readonly route: ActivatedRoute,
    public readonly router: Router
  ) {
    super(hearingStore, hearingsService, route, router);
    this.partyChannels = [...this.route.snapshot.data.partyChannels, ...this.route.snapshot.data.partySubChannels];
=======
  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
    private readonly hearingsService: HearingsService,
    private readonly route: ActivatedRoute,
    private readonly loadingService: LoadingService) {
    this.hearingRoles = this.route.snapshot.data.hearingRole;
    this.hearingTypes = this.route.snapshot.data.hearingTypes;
    this.partyChannels = [...this.route.snapshot.data.partyChannels, ...this.route.snapshot.data.partySubChannels];
    this.actualPartHeardReasonCodes = this.route.snapshot.data.actualPartHeardReasonCodes;
    this.actualCancellationReasonCodes = this.route.snapshot.data.cancelHearingActualReasons;
  }

  public ngOnInit(): void {
    this.showSpinner$ = this.loadingService.isLoading as any;
    const loadingToken = this.loadingService.register();
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
        this.loadingService.unregister(loadingToken);
      }, error => {
        this.loadingService.unregister(loadingToken);
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
>>>>>>> 5d20462e7 (CR comments fix)
  }

  public onSubmitHearingDetails(): void {
    this.submitted = true;

    if (this.hearingResult === HearingResult.CANCELLED || this.isValid()) {
      this.router.navigate(['/', 'hearings', 'actuals', this.hearingRequestID, 'hearing-actual-summary']);
    }
  }

<<<<<<< HEAD
  public changeWasThisHearingDayRequired(hearingDay: ActualHearingDayModel) {
=======
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

  private isAllHearingActualsTimingAvailable(hearingActualsMainModel: HearingActualsMainModel) {
    const hasAllActualDays = hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays
      && hearingActualsMainModel.hearingActuals.actualHearingDays.length === hearingActualsMainModel.hearingPlanned.plannedHearingDays.length;

    return hasAllActualDays && hearingActualsMainModel.hearingActuals.actualHearingDays.every(
      actualDay => this.isAcutalTimingAvailable(actualDay)
    );
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

  public confirmActualHearingTimeForDay(hearingDay: ActualHearingDayModel) {
>>>>>>> 5d20462e7 (CR comments fix)
    this.validationErrors = [];
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals(this.hearingActualsMainModel, hearingDay.hearingDate, { notRequired: !hearingDay.notRequired } as ActualHearingDayModel);
    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals: patchedHearingActuals
    }));
  }

<<<<<<< HEAD
  public confirmActualHearingTimeAndParties(hearingDay: ActualHearingDayModel) {
    // Organisation parties do not have partyChannelSubType and can be ignored
    // as they do not attend the actual hearing
    const individualPartyIds = this.individualParties.map((party) => party.partyID);
    const actualDayParties = hearingDay?.actualDayParties?.filter((party) => individualPartyIds.includes(party.actualPartyId));
=======
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
>>>>>>> 5d20462e7 (CR comments fix)
    const updatedActuals = {
      hearingDate: hearingDay.hearingDate,
      hearingStartTime: hearingDay.hearingStartTime,
      hearingEndTime: hearingDay.hearingEndTime,
      pauseDateTimes: hearingDay.pauseDateTimes,
      actualDayParties: [...actualDayParties]
    } as ActualHearingDayModel;
<<<<<<< HEAD
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals(
      this.hearingActualsMainModel, hearingDay.hearingDate, updatedActuals
    );
    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals: patchedHearingActuals
=======
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
>>>>>>> 5d20462e7 (CR comments fix)
    }));
  }

  private isValid(): boolean {
    let isValid: boolean = true;
    this.validationErrors = [];
    this.hearingStageResultErrorMessage = '';
<<<<<<< HEAD
=======
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
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    if (!this.isHearingAllRequiredDaysCovered()) {
      this.validationErrors.push({
        id: 'actual-hearing-dates',
        message: HearingActualAddEditSummaryEnum.AllDaysCoveredError
      });
      this.hearingDaysRequiredErrorMessage = HearingActualAddEditSummaryEnum.AllDaysCoveredError;
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      isValid = false;
    }
>>>>>>> 5d20462e7 (CR comments fix)

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
