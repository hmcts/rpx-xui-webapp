import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-completed-summary',
  templateUrl: './hearing-completed-summary.component.html'
})
export class HearingCompletedSummaryComponent implements OnInit, OnDestroy {
  public hearingState$: Observable<fromHearingStore.State>;
  public hearingActualsMainModel: HearingActualsMainModel;
  public sub: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>) {}

  public ngOnInit(): void {
    this.hearingState$ = this.hearingStore.select(fromHearingStore.getHearingsFeatureState)
      .pipe(
        filter((state) => !!state.hearingActuals.hearingActualsMainModel),
      );

    this.sub = this.hearingState$.subscribe((state) => {
      this.hearingActualsMainModel = state.hearingActuals.hearingActualsMainModel;
    });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
