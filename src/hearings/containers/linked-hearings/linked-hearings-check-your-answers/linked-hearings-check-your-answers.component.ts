import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { LoadServiceLinkedCases } from '../../../store';

@Component({
  selector: 'exui-linked-hearings-check-your-answers',
  templateUrl: './linked-hearings-check-your-answers.component.html'
})
export class LinkedHearingsCheckYourAnswersComponent implements OnInit {
  public caseId: string;
  public linkedCases: ServiceLinkedCasesModel[];
  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService) {
    this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState)).subscribe(
      state => {
        this.caseId = state.hearingList.hearingListMainModel ? state.hearingList.hearingListMainModel.caseRef : '';
      }
    )
  }

  public ngOnInit(): void {
    this.hearingStore.dispatch(new LoadServiceLinkedCases({caseReference: this.caseId, hearingId: ''}));
    this.hearingStore.pipe(select(fromHearingStore.getHearingLinks)).subscribe(
      hearingLinks => {
        this.linkedCases = hearingLinks.serviceLinkedCases;
      }
    )
  }
}
