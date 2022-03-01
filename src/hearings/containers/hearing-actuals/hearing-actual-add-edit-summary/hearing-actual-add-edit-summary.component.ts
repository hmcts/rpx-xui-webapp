import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  ActualDayPartyModel,
  ActualHearingDayModel,
  HearingActualsMainModel,
  HearingOutcomeModel,
  PartyModel
} from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import { ACTION } from '../../../models/hearings.enum';
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
  public sub: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService) {
  }

  public ngOnInit(): void {
    this.sub = this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel)
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
}
