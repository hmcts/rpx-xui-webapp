import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-adjourned-summary',
  templateUrl: './hearing-adjourned-summary.component.html',
})
export class HearingAdjournedSummaryComponent implements OnInit, OnDestroy {
  public hearingActualsModel: HearingActualsMainModel;
  public subscription: Subscription;

  constructor(private readonly store: Store<fromHearingStore.State>) {
  }

  public ngOnInit(): void {
    this.subscription = this.store.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel),
      )
      .subscribe((state: HearingActualsStateData) => {
        this.hearingActualsModel = state.hearingActualsMainModel;
      });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
