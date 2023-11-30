import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-additional-instructions-section',
  templateUrl: './additional-instructions-section.component.html'
})
export class AdditionalInstructionsSectionComponent implements OnInit, OnDestroy {
  public additionalInstructions: string;
  public hearingState$: Observable<fromHearingStore.State>;
  public hearingStateSubscription: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    this.hearingState$.subscribe((state) => {
      const additionalInstructions = state.hearingRequest.hearingRequestMainModel.hearingDetails.listingComments;
      if (!additionalInstructions) {
        return additionalInstructions;
      }
      this.additionalInstructions = additionalInstructions.replace(/(?:\r\n|\r|\n)/g, '<br>');
    });
  }

  public ngOnDestroy(): void {
    this.hearingStateSubscription?.unsubscribe();
  }
}
