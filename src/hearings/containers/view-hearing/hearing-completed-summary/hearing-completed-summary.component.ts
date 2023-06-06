import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
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
  public showSpinner$: Observable<boolean>;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
    private readonly loadingService: LoadingService) {
  }

  public ngOnInit(): void {
    this.showSpinner$ = this.loadingService.isLoading as any;
    const loadingToken = this.loadingService.register();
    this.hearingState$ = this.hearingStore.select(fromHearingStore.getHearingsFeatureState)
      .pipe(
        filter((state) => !!state.hearingActuals.hearingActualsMainModel)
      );

    this.sub = this.hearingState$.subscribe((state) => {
      this.hearingActualsMainModel = state.hearingActuals.hearingActualsMainModel;
      this.loadingService.unregister(loadingToken);
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
