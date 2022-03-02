import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import {
  ActualDayPartyModel,
  ActualHearingDayModel,
  HearingActualsMainModel,
  HearingOutcomeModel,
  PartyModel
} from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import { ACTION, HearingResult } from '../../../models/hearings.enum';
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
  public actualHearingDay: ActualHearingDayModel;
  public actualDayParties: ActualDayPartyModel[];
  public hearingTypes: LovRefDataModel[];
  public adjournHearingActualReasons: LovRefDataModel[];
  public cancelHearingActualReasons: LovRefDataModel[];
  public sub: Subscription;
  public id: string;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService,
              private readonly route: ActivatedRoute) {
    this.hearingTypes = this.route.snapshot.data.hearingTypes;
    this.adjournHearingActualReasons = this.route.snapshot.data.adjournHearingActualReasons;
    this.cancelHearingActualReasons = this.route.snapshot.data.cancelHearingActualReasons;
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.sub = this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel),
        first()
      )
      .subscribe((state: HearingActualsStateData) => {
        const hearingActualsMainModel = state.hearingActualsMainModel;
        this.hearingOutcome = hearingActualsMainModel.hearingActuals.hearingOutcome;
        this.actualHearingDay = hearingActualsMainModel.hearingActuals.actualHearingDays && hearingActualsMainModel.hearingActuals.actualHearingDays.length > 0
          ? hearingActualsMainModel.hearingActuals.actualHearingDays[0] : null;
        this.actualDayParties = hearingActualsMainModel.hearingActuals.actualHearingDays && hearingActualsMainModel.hearingActuals.actualHearingDays.length > 0
          ? hearingActualsMainModel.hearingActuals.actualHearingDays.map(x => x.actualDayParties[0]) : [];
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

  public getRepresentingAttendee(partyId: number): string {
    const party: PartyModel = this.hearingActualsMainModel.hearingPlanned.plannedHearingDays[0].parties.find(x => x.partyId === partyId.toString());
    if (party && party.individualDetails) {
      return `${party.individualDetails.firstName} ${party.individualDetails.lastName}`;
    }
    return '';
  }

  public getHearingResultReasonTypeDescription(hearingOutcome: HearingOutcomeModel): string {
    if (hearingOutcome.hearingResult === HearingResult.ADJOURNED) {
      const hearingActualReason = this.adjournHearingActualReasons && this.adjournHearingActualReasons.find(x => x.key === hearingOutcome.hearingResultReasonType);
      if (hearingActualReason) {
        return hearingActualReason.value_en;
      }
    }
    if (hearingOutcome.hearingResult === HearingResult.CANCELLED) {
      const hearingActualReason = this.cancelHearingActualReasons && this.cancelHearingActualReasons.find(x => x.key === hearingOutcome.hearingResultReasonType);
      if (hearingActualReason) {
        return hearingActualReason.value_en;
      }
    }
    return '';
  }

  public getHearingTypeDescription(hearingType: string): string {
    const hearingTypeFromLookup = this.hearingTypes && this.hearingTypes.find(x => x.key.toLowerCase() === hearingType.toLowerCase());
    return hearingTypeFromLookup ? hearingTypeFromLookup.value_en : '';
  }
}
