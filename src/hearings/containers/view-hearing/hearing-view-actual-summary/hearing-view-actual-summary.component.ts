import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-view-actual-summary',
  templateUrl: './hearing-view-actual-summary.component.html'
})
export class HearingViewActualSummaryComponent implements OnInit, OnDestroy {
  public hearingActualsMainModel: HearingActualsMainModel;
  public subscription: Subscription;
  public showSpinner$: Observable<boolean>;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
    private readonly loadingService: LoadingService) {
  }

  public ngOnInit(): void {
    this.showSpinner$ = this.loadingService.isLoading as any;
    const loadingToken = this.loadingService.register();
    this.subscription = this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel),
      )
      .subscribe((state: HearingActualsStateData) => {
        this.hearingActualsMainModel = state.hearingActualsMainModel;
        this.loadingService.unregister(loadingToken);
      }, () => {
        this.loadingService.unregister(loadingToken);
      });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
