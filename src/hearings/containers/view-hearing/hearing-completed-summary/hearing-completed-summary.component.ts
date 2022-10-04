import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-completed-summary',
  templateUrl: './hearing-completed-summary.component.html',
})
export class HearingCompletedSummaryComponent implements OnInit, OnDestroy {
  public hearingActualsMainModel: HearingActualsMainModel;
  public sub: Subscription;
  public showSpinner: boolean = true;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>) {
  }

  public ngOnInit(): void {
    this.sub = this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel),
      )
      .subscribe((state: HearingActualsStateData) => {
        this.hearingActualsMainModel = state.hearingActualsMainModel;
        this.showSpinner = false;
      });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
