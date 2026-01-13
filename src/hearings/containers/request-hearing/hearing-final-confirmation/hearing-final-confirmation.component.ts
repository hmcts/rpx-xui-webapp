import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromHearingStore from '../../../store';

@Component({
  standalone: false,
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
  public jurisdiction: string;
  public caseType: string;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
    private readonly loadingService: LoadingService,) {}

  public ngOnInit(): void {
    this.showSpinner$ = this.loadingService.isLoading as any;
    const loadingToken = this.loadingService.register();
    this.sub = this.hearingStore.pipe(select(fromHearingStore.getHearingList)).subscribe(
      (hearingList) => {
        this.caseId = hearingList.hearingListMainModel ? hearingList.hearingListMainModel.caseRef : '';
        this.heading = 'Hearing request submitted';
        this.headingDescription = 'Your hearing request will now be processed';
        this.subheading = 'What happens next';
        this.additionalDescription = `If the hearing cannot be listed automatically, it will be sent to a member of staff to be processed.<br>
          A notice of hearing will be issued once the hearing is listed, you will not be notified of the listing.`;
        this.loadingService.unregister(loadingToken);
      }, () => {
        this.loadingService.unregister(loadingToken);
      });
    this.hearingStore.pipe(select(fromHearingStore.getHearingValues)).subscribe((hearingValues) => {
      if (hearingValues) {
        this.jurisdiction = hearingValues.caseInfo.jurisdictionId;
        this.caseType = hearingValues.caseInfo.caseType;
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
