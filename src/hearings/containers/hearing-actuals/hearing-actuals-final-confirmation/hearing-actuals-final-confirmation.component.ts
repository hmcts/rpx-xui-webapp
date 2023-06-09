import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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
  public showSpinner$: Observable<boolean>;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>, private readonly loadingService: LoadingService) {

  }

  public ngOnInit(): void {
    this.showSpinner$ = this.loadingService.isLoading as any;
    const loadingToken = this.loadingService.register();
    this.sub = this.hearingStore.pipe(select(fromHearingStore.getHearingList)).subscribe(
      (hearingList) => {
        this.loadingService.unregister(loadingToken);
        this.caseId = hearingList.hearingListMainModel ? hearingList.hearingListMainModel.caseRef : '';
        this.heading = 'You have successfully submitted the hearing details.';
        this.subheading = 'What happens next';
      }, () => {
        this.loadingService.unregister(loadingToken);
      });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
