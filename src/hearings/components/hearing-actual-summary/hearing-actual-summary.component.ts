import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActualHearingDayModel, HearingActualsMainModel, PlannedHearingDayModel } from '../../models/hearingActualsMainModel';
import { AnswerSource, HearingChannelEnum, HearingDateEnum, HearingResult } from '../../models/hearings.enum';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-hearing-actual-summary',
  templateUrl: './hearing-actual-summary.component.html',
  styleUrls: ['./hearing-actual-summary.component.scss']
})
export class HearingActualSummaryComponent implements OnInit {
  @Input() public hearingState$: Observable<fromHearingStore.State>;
  @Input() public hearingActualsMainModel: HearingActualsMainModel;

  public isCompleted: boolean;
  public isAdjourned: boolean;
  public isPaperHearing$: Observable<boolean>;
  public hearingDays: { actualHearingDay: ActualHearingDayModel; plannedHearingDay: PlannedHearingDayModel }[] = [];
  public dateFormat = HearingDateEnum;
  public answerSource = AnswerSource;

  public ngOnInit(): void {
    this.isCompleted = this.hearingActualsMainModel.hearingActuals.hearingOutcome.hearingResult === HearingResult.COMPLETED;
    this.isAdjourned = this.hearingActualsMainModel.hearingActuals.hearingOutcome.hearingResult === HearingResult.ADJOURNED;
    this.isPaperHearing$ = this.hearingState$ && this.hearingState$.pipe(
      map(state => state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingChannels.includes(HearingChannelEnum.ONPPR))
    );

    const actualHearingDaysLength = this.hearingActualsMainModel.hearingActuals.actualHearingDays.length;
    for (let i = 0; i < actualHearingDaysLength; i++) {
      this.hearingDays.push({
        actualHearingDay: this.hearingActualsMainModel.hearingActuals.actualHearingDays[i],
        plannedHearingDay: this.hearingActualsMainModel.hearingPlanned.plannedHearingDays[i]
      });
    }
  }

  public get multiDayHearing() {
    return this.hearingDays.length > 1;
  }
}
