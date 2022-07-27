import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AnswerSource, EXUIDisplayStatusEnum, LaCaseStatus } from '../../models/hearings.enum';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-listing-information-summary',
  templateUrl: './listing-information-summary.component.html',
  styleUrls: ['./listing-information-summary.component.scss']
})
export class ListingInformationSummaryComponent implements OnInit, OnDestroy {
  public hearingState$: Observable<fromHearingStore.State>;
  public answerSource = AnswerSource;
  public isListedCaseStatus: boolean;
  public caseStatusName: string;
  public serviceValueSub: Subscription;
  public exuiDisplayStatus = EXUIDisplayStatusEnum;

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
    }
    );
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
