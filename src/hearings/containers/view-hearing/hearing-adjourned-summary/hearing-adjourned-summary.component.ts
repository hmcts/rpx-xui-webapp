import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-adjourned-summary',
  templateUrl: './hearing-adjourned-summary.component.html'
})
export class HearingAdjournedSummaryComponent implements OnInit, OnDestroy {
  public hearingState$: Observable<fromHearingStore.State>;
  public hearingActualsMainModel: HearingActualsMainModel;
  public adjournReasons: LovRefDataModel[];
  public subscription: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly route: ActivatedRoute) {
    this.adjournReasons = this.route.snapshot.data.adjournReasons;
  }

  public ngOnInit(): void {
    this.hearingState$ = this.hearingStore.select(fromHearingStore.getHearingsFeatureState)
      .pipe(
        filter((state) => !!state.hearingActuals.hearingActualsMainModel),
      );

    this.subscription = this.hearingState$.subscribe({
      next: (state: fromHearingStore.State) => {
        this.hearingActualsMainModel = state.hearingActuals.hearingActualsMainModel;
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
