import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HearingDayScheduleModel } from '../../models/hearingDaySchedule.model';
import { AnswerSource, EXUIDisplayStatusEnum, HearingChannelEnum, LaCaseStatus } from '../../models/hearings.enum';
import * as fromHearingStore from '../../store';
import { HearingsUtils } from '../../utils/hearings.utils';

@Component({
  selector: 'exui-listing-information-summary',
  templateUrl: './listing-information-summary.component.html',
  styleUrls: ['./listing-information-summary.component.scss']
})
export class ListingInformationSummaryComponent implements OnInit, OnDestroy {

  private static readonly HEARING_PANEL_SCREEN_NAME = 'hearing-panel';

  public hearingState$: Observable<fromHearingStore.State>;
  public hearingDaySchedule: HearingDayScheduleModel[];
  public answerSource = AnswerSource;
  public isListedCaseStatus: boolean;
  public caseStatusName: string;
  public serviceValueSub: Subscription;
  public exuiDisplayStatus = EXUIDisplayStatusEnum;
  public isPaperHearing: boolean;
  public displayPanelMembersSection: boolean;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>, public readonly route: ActivatedRoute) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    this.serviceValueSub = this.hearingState$.subscribe((state) => {
      this.isListedCaseStatus = state.hearingRequest.hearingRequestMainModel.hearingResponse.laCaseStatus === LaCaseStatus.LISTED;
      state.hearingList.hearingListMainModel.caseHearings.forEach(caseHearing => {
        if (caseHearing.hearingID === state.hearingRequest.hearingRequestMainModel.caseDetails.hearingID) {
          this.caseStatusName = caseHearing.exuiDisplayStatus;
        }
      });
      this.hearingDaySchedule = state.hearingRequest.hearingRequestMainModel.hearingResponse
        && state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule
        && HearingsUtils.sortHearingDaySchedule(state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule);
      this.isPaperHearing = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingChannels.includes(HearingChannelEnum.ONPPR);
      const screenFlow = state.hearingValues && state.hearingValues.serviceHearingValuesModel && state.hearingValues.serviceHearingValuesModel.screenFlow;
      this.displayPanelMembersSection = screenFlow && screenFlow.findIndex(screen => screen.screenName === ListingInformationSummaryComponent.HEARING_PANEL_SCREEN_NAME) !== -1;
    });
  }

  public isCaseStatusListed(): boolean {
    return this.exuiDisplayStatus.LISTED === this.caseStatusName;
  }


  public ngOnDestroy(): void {
    if (this.serviceValueSub) {
      this.serviceValueSub.unsubscribe();
    }
  }
}
