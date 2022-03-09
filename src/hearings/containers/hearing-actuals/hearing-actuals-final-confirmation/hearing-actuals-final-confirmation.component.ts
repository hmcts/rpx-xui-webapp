import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { HearingConfirmationSource } from 'src/hearings/models/hearings.enum';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-actuals-final-confirmation',
  templateUrl: './hearing-actuals-final-confirmation.component.html'
})
export class HearingActualsFinalConfirmationComponent implements OnInit {

  public heading: string;
  public subheading: string;
  public caseId: string;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
  }

  public get hearingConfirmationSourceEnum() {
    return HearingConfirmationSource;
  }

  public ngOnInit(): void {
    this.hearingStore.pipe(select(fromHearingStore.getHearingList)).subscribe(
      hearingList => {
        this.caseId = hearingList.hearingListMainModel ? hearingList.hearingListMainModel.caseRef : '';
        this.heading = 'You have successfully submitted the hearing details.';
        this.subheading = 'What happens next';
      });
  }
}
