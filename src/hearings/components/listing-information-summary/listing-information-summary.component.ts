import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AnswerSource, LaCaseStatus } from '../../../hearings/models/hearings.enum';
import { HearingAnswersPipe } from '../../../hearings/pipes/hearing-answers.pipe';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-listing-information-summary',
  templateUrl: './listing-information-summary.component.html',
  styleUrls: ['./listing-information-summary.component.scss']
})
export class ListingInformationSummaryComponent {
  public hearingState$: Observable<fromHearingStore.State>;
  public answerSource = AnswerSource;
  public caseStatus = LaCaseStatus;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>, public readonly route: ActivatedRoute) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public getStatusName(): Observable<string> {
    return new HearingAnswersPipe(this.route).transform(this.answerSource.STATUS, this.hearingState$);
  }
}
