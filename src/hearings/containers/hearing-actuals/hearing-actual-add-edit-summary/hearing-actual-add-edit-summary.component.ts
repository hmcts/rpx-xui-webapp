import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import * as moment from 'moment';
import {Observable, Subscription} from 'rxjs';
import {filter, first} from 'rxjs/operators';
import {HttpError} from '../../../../models/httpError.model';
import {
  ActualDayPartyModel,
  ActualHearingDayModel,
  HearingActualsMainModel,
  HearingOutcomeModel,
  PlannedDayPartyModel,
  PlannedHearingDayModel
} from '../../../models/hearingActualsMainModel';
import {HearingActualsStateData} from '../../../models/hearingActualsStateData.model';
import {ACTION, HearingActualAddEditSummaryEnum, HearingResult} from '../../../models/hearings.enum';
import {LovRefDataModel} from '../../../models/lovRefData.model';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-actual-add-edit-summary',
  templateUrl: './hearing-actual-add-edit-summary.component.html',
  styleUrls: ['./hearing-actual-add-edit-summary.component.scss']
})
export class HearingActualAddEditSummaryComponent implements OnInit, OnDestroy {

  public hearingActualsMainModel: HearingActualsMainModel;
  public hearingOutcome: HearingOutcomeModel;
  public hearingRoles: LovRefDataModel[] = [];
  public actualHearingDay: ActualHearingDayModel;
  public participants: ActualDayPartyModel[] = [];
  public parties: ActualDayPartyModel[] = [];
  public hearingTypes: LovRefDataModel[];
  public adjournHearingActualReasons: LovRefDataModel[];
  public cancelHearingActualReasons: LovRefDataModel[];
  public hearingResult: string;
  public hearingTypeDescription: string;
  public hearingResultReasonTypeDescription: string;
  public validationErrors: { id: string, message: string }[] = [];
  public serverErrors: { id: string, message: string }[] = [
    {id: 'serverError', message: 'There was a system error and your request could not be processed. Please try again.'}
  ];
  public hearingStageResultErrorMessage = '';
  public submitted = false;
  public sub: Subscription;
  public id: string;
  public error$: Observable<HttpError>;
  public partyChannels: LovRefDataModel[] = [];
  public hearingDate: string;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService,
              private readonly route: ActivatedRoute) {
    this.hearingRoles = this.route.snapshot.data.hearingRole;
    this.hearingTypes = this.route.snapshot.data.hearingTypes;
    this.partyChannels = this.route.snapshot.data.partyChannel;
    this.adjournHearingActualReasons = this.route.snapshot.data.adjournHearingActualReasons;
    this.cancelHearingActualReasons = this.route.snapshot.data.cancelHearingActualReasons;
  }

  private static hasActualParties(hearingActuals: HearingActualsMainModel, immutablePartyRoles: LovRefDataModel[]): boolean {
    return !!hearingActuals.hearingActuals && hearingActuals.hearingActuals.actualHearingDays
    && hearingActuals.hearingActuals.actualHearingDays.length && hearingActuals.hearingActuals.actualHearingDays[0].actualDayParties
      ? hearingActuals.hearingActuals.actualHearingDays[0].actualDayParties.some(
        (actualDayParty: ActualDayPartyModel) => immutablePartyRoles
          .map((partyRole: LovRefDataModel) => partyRole.key)
          .includes(actualDayParty.partyRole)
      ) : false;
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.error$ = this.hearingStore.select(fromHearingStore.getHearingActualsLastError);
    this.sub = this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel),
        first()
      )
      .subscribe((state: HearingActualsStateData) => {
        this.hearingActualsMainModel = state.hearingActualsMainModel;
        this.hearingOutcome = this.hearingActualsMainModel.hearingActuals && this.hearingActualsMainModel.hearingActuals.hearingOutcome;
        this.actualHearingDay = this.getActualHearingDay(this.hearingActualsMainModel);
        this.getActualDayParties(this.hearingActualsMainModel);
        this.hearingTypeDescription = this.hearingOutcome && this.getHearingTypeDescription(this.hearingOutcome.hearingType);
        this.hearingResult = this.hearingOutcome && this.hearingOutcome.hearingResult;
        this.hearingResultReasonTypeDescription = this.hearingOutcome && this.getHearingResultReasonTypeDescription(this.hearingOutcome);
        this.hearingDate = this.calculateEarliestHearingDate(this.hearingActualsMainModel.hearingPlanned.plannedHearingDays);
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

  public onSubmitHearingDetails(): void {
    this.submitted = true;
    if (this.isValid()) {
      this.hearingStore.dispatch(new fromHearingStore.SubmitHearingActuals(this.id));
    }
  }

  public getRepresentingAttendee(partyId: string): string {
    const party: PlannedDayPartyModel = this.hearingActualsMainModel.hearingPlanned.plannedHearingDays[0].parties.find(x => x.partyId === partyId.toString());
    if (party && party.individualDetails) {
      return `${party.individualDetails.firstName} ${party.individualDetails.lastName}`;
    }
    return '';
  }

  public getHearingResultReasonTypeDescription(hearingOutcome: HearingOutcomeModel): string {
    const hearingActualReasonsRefData = hearingOutcome.hearingResult === HearingResult.COMPLETED
      ? [] : hearingOutcome.hearingResult === HearingResult.ADJOURNED
        ? this.adjournHearingActualReasons : this.cancelHearingActualReasons;

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

  private getActualHearingDay(hearingActualsMainModel: HearingActualsMainModel) {
    return hearingActualsMainModel.hearingActuals && hearingActualsMainModel.hearingActuals.actualHearingDays && hearingActualsMainModel.hearingActuals.actualHearingDays.length > 0
      ? hearingActualsMainModel.hearingActuals.actualHearingDays[0] : null;
  }

  public getActualDayParties(hearingActualsMainModel: HearingActualsMainModel): void {
    if (HearingActualAddEditSummaryComponent.hasActualParties(hearingActualsMainModel, this.hearingRoles)) {
      const actualParties: ActualDayPartyModel[] = hearingActualsMainModel.hearingActuals.actualHearingDays[0].actualDayParties;
      for (const actualParty of actualParties) {
        if (this.isPlannedParty(actualParty)) {
          this.parties.push(actualParty);
        } else {
          this.participants.push(actualParty);
        }
      }
    } else {
      const plannedParties: PlannedDayPartyModel[] = hearingActualsMainModel.hearingPlanned.plannedHearingDays[0].parties;
      for (const plannedParty of plannedParties) {
        const actualDayParty: ActualDayPartyModel = {
          individualDetails: {
            firstName: plannedParty.individualDetails && plannedParty.individualDetails.firstName,
            lastName: plannedParty.individualDetails && plannedParty.individualDetails.lastName,
          },
          organisationDetails: {
            name: plannedParty.organisationDetails && plannedParty.organisationDetails.name,
          },
          didNotAttendFlag: false,
          partyChannelSubType: plannedParty.partyChannelSubType,
          representedParty: null,
          actualPartyId: plannedParty.partyId,
          partyRole: plannedParty.partyRole
        };
        this.parties.push(actualDayParty);
      }
    }
  }

  public isPlannedParty(actualDayParty: ActualDayPartyModel): boolean {
    return this.hearingActualsMainModel.hearingPlanned.plannedHearingDays[0].parties.some(plannedParty => plannedParty.partyId === actualDayParty.actualPartyId);
  }

  private isValid(): boolean {
    this.validationErrors = [];
    this.hearingStageResultErrorMessage = '';
    if (this.hearingResult === '' || this.hearingResult === null) {
      this.validationErrors.push({
        id: 'hearing-stage-result-update-link',
        message: HearingActualAddEditSummaryEnum.HearingResultError
      });
      this.hearingStageResultErrorMessage = HearingActualAddEditSummaryEnum.HearingResultError;
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      return false;
    }
    return true;
  }

  public calculateEarliestHearingDate(hearingDays: PlannedHearingDayModel[]): string {
    const moments: moment.Moment[] = hearingDays.map(d => moment(d.plannedStartTime));
    return moment.min(moments).toISOString();
  }
}
