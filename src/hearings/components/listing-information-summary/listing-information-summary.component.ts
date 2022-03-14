import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AnswerSource, EXUIDisplayStatusEnum, LaCaseStatus } from '../../../hearings/models/hearings.enum';
import { HearingAnswersPipe } from '../../../hearings/pipes/hearing-answers.pipe';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-listing-information-summary',
  templateUrl: './listing-information-summary.component.html',
  styleUrls: ['./listing-information-summary.component.scss']
})
export class ListingInformationSummaryComponent implements OnInit, OnDestroy {
  public hearingState$: Observable<fromHearingStore.State>;
  public answerSource = AnswerSource;
  public caseStatus = LaCaseStatus;
  public caseStatusName: string;
  public serviceValueSub: Subscription;
  public exuiDisplayStatus = EXUIDisplayStatusEnum;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>, public readonly route: ActivatedRoute) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    this.serviceValueSub = this.hearingState$.subscribe((state) =>
      state.hearingList.hearingListMainModel.caseHearings.forEach(caseHearing => {
        if (caseHearing.hearingID === state.hearingRequest.hearingRequestMainModel.caseDetails.hearingID) {
          this.caseStatusName = caseHearing.exuiDisplayStatus;
        }
      })
    );
  }

  public getStatusName(): Observable<string> {
    return new HearingAnswersPipe(this.route).transform(this.answerSource.STATUS, this.hearingState$);
  }

  public ngOnDestroy(): void {
    if (this.serviceValueSub) {
      this.serviceValueSub.unsubscribe();
    }
  }
}
