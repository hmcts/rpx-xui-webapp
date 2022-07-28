import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-actuals-final-confirmation',
  templateUrl: './hearing-actuals-final-confirmation.component.html'
})
export class HearingActualsFinalConfirmationComponent implements OnInit, OnDestroy {

  public heading: string;
  public subheading: string;
  public caseId: string;
  public sub: Subscription;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
  }

  public ngOnInit(): void {
    this.sub = this.hearingStore.pipe(select(fromHearingStore.getHearingList)).subscribe(
      hearingList => {
        this.caseId = hearingList.hearingListMainModel ? hearingList.hearingListMainModel.caseRef : '';
        this.heading = 'You have successfully submitted the hearing details.';
        this.subheading = 'What happens next';
      });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
