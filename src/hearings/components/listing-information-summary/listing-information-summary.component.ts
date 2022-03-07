import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { LaCaseStatus } from 'api/hearings/models/hearings.enum';
import { Observable, Subscription } from 'rxjs';
import { AnswerSource } from 'src/hearings/models/hearings.enum';
import { LovRefDataModel } from 'src/hearings/models/lovRefData.model';
import { HearingAnswersPipe } from 'src/hearings/pipes/hearing-answers.pipe';
import { HearingRequestMainModel } from '../../../hearings/models/hearingRequestMain.model';
import { ServiceHearingValuesModel } from '../../../hearings/models/serviceHearingValues.model';
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
