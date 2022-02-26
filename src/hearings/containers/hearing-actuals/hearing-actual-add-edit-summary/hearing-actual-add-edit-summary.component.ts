import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HearingActualsMainModel, PartyModel } from '../../../models/hearingActualsMainModel';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import * as fromHearingStore from '../../../store';
import { HearingsService } from '../../../services/hearings.service';
import { ACTION } from '../../../models/hearings.enum';

@Component({
  selector: 'exui-hearing-actual-add-edit-summary',
  templateUrl: './hearing-actual-add-edit-summary.component.html',
  styleUrls: ['./hearing-actual-add-edit-summary.component.scss']
})
export class HearingActualAddEditSummaryComponent implements OnInit {
  public hearingActualsMainModel: HearingActualsMainModel;
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
        this.hearingActualsMainModel = state.hearingActualsMainModel;
        console.log('HEARING ACTUALS', this.hearingActualsMainModel);
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
    console.log(party);
    if (party && party.individualDetails) {
      return `${party.individualDetails.firstName} ${party.individualDetails.lastName}`;
    }

    return '';
  }
}
