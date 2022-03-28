import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { HttpError } from '../../../../models/httpError.model';
import {
  ActualDayPartyModel,
  ActualHearingDayModel,
  HearingActualsMainModel,
  HearingOutcomeModel,
  PartyModel
} from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import { ACTION, HearingActualAddEditSummaryEnum, HearingResult, PartyRoleOnly } from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { HearingsService } from '../../../services/hearings.service';
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
    { id: 'serverError', message: 'There was a system error and your request could not be processed. Please try again.' }
  ];
  public hearingStageResultErrorMessage = '';
  public submitted = false;
  public sub: Subscription;
  public id: string;
  public error$: Observable<HttpError>;
  public partyChannels: LovRefDataModel[] = [];

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
    return hearingActuals.hearingActuals.actualHearingDays.length ? hearingActuals.hearingActuals.actualHearingDays[0].actualDayParties.some(
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
        const hearingActualsMainModel = state.hearingActualsMainModel;
        this.hearingOutcome = hearingActualsMainModel.hearingActuals.hearingOutcome;
        this.actualHearingDay = this.getActualHearingDay(hearingActualsMainModel);
        this.getActualDayParties(hearingActualsMainModel);
        this.hearingTypeDescription = this.getHearingTypeDescription(this.hearingOutcome.hearingType);
        this.hearingResult = hearingActualsMainModel.hearingActuals.hearingOutcome.hearingResult;
        this.hearingResultReasonTypeDescription = this.getHearingResultReasonTypeDescription(this.hearingOutcome);
        this.hearingActualsMainModel = hearingActualsMainModel;
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
    const party: PartyModel = this.hearingActualsMainModel.hearingPlanned.plannedHearingDays[0].parties.find(x => x.partyId === partyId.toString());
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
    return hearingActualsMainModel.hearingActuals.actualHearingDays && hearingActualsMainModel.hearingActuals.actualHearingDays.length > 0
      ? hearingActualsMainModel.hearingActuals.actualHearingDays[0] : null;
  }

  private getActualDayParties(hearingActualsMainModel: HearingActualsMainModel): void {
    if (HearingActualAddEditSummaryComponent.hasActualParties(hearingActualsMainModel, this.hearingRoles)) {
      const parties = hearingActualsMainModel.hearingActuals.actualHearingDays[0].actualDayParties;
      for (const party of parties) {
        if (party.partyRole ===  PartyRoleOnly.Appellant || party.partyRole === PartyRoleOnly.Claimant) {
          this.parties.push(party);
        } else {
          this.participants.push(party);
        }
      }
    } else {
      const parties = hearingActualsMainModel.hearingPlanned.plannedHearingDays[0].parties;
      for (const party of parties) {
        if (party.partyRole ===  PartyRoleOnly.Appellant || party.partyRole === PartyRoleOnly.Claimant) {
          const actualDayParty: ActualDayPartyModel = {
            actualIndividualDetails: {
              firstName: party.individualDetails.firstName,
              lastName: party.individualDetails.lastName,
            },
            actualOrganisationDetails: {
              name: party.organisationDetails.name,
            },
            didNotAttendFlag: false,
            partyChannelSubType: party.partyChannelSubType,
            representedParty: null,
            actualPartyId: party.partyId,
            partyRole: party.partyRole
          };
          this.parties.push(actualDayParty);
        }
      }
    }
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
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return false;
    }
    return true;
  }
}
