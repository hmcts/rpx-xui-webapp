import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-awaiting-summary',
  templateUrl: './hearing-awaiting-summary.component.html',
})
export class HearingAwaitingSummaryComponent implements OnInit, OnDestroy {
  public hearingActualsMainModel: HearingActualsMainModel;
  public subscription: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>) {
  }

  public ngOnInit(): void {
    this.subscription = this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel),
      )
      .subscribe((state: HearingActualsStateData) => {
        this.hearingActualsMainModel = state.hearingActualsMainModel;
      });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
