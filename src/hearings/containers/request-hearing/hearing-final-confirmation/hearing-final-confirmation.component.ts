import { Component, OnDestroy, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
=======
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
>>>>>>> 5d20462e7 (CR comments fix)
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-final-confirmation',
  templateUrl: './hearing-final-confirmation.component.html'
})
export class HearingFinalConfirmationComponent implements OnInit, OnDestroy {
  public heading: string;
  public headingDescription: string;
  public subheading: string;
  public subheadingDescription: string;
  public additionalDescription: string;
  public caseId: string;
  public sub: Subscription;
  public showSpinner$: Observable<boolean>;

<<<<<<< HEAD
  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {}
=======
  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
    private readonly loadingService: LoadingService) {
  }
>>>>>>> 5d20462e7 (CR comments fix)

  public ngOnInit(): void {
    this.showSpinner$ = this.loadingService.isLoading as any;
    const loadingToken = this.loadingService.register();
    this.sub = this.hearingStore.pipe(select(fromHearingStore.getHearingList)).subscribe(
      hearingList => {
        this.caseId = hearingList.hearingListMainModel ? hearingList.hearingListMainModel.caseRef : '';
        this.heading = 'Hearing request submitted';
        this.headingDescription = 'Your hearing request will now be processed';
        this.subheading = 'What happens next';
        this.additionalDescription = `If the hearing cannot be listed automatically, it will be sent to a member of staff to be processed.<br>
          A notice of hearing will be issued once the hearing is listed, you will not be notified of the listing.`;
        this.loadingService.unregister(loadingToken);
      }, error => {
        this.loadingService.unregister(loadingToken);
      });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
