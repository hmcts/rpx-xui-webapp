import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HearingActualsStateData } from 'src/hearings/models/hearingActualsStateData.model';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-actual-add-edit-summary',
  templateUrl: './hearing-actual-add-edit-summary.component.html',
})
export class HearingActualAddEditSummaryComponent implements OnInit {
  public hearingActualsMainModel: HearingActualsMainModel;
  public sub: Subscription;
  
  constructor(private readonly hearingStore: Store<fromHearingStore.State>) {
  }

  public ngOnInit(): void {
    this.sub = this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel)
      )
      .subscribe((state: HearingActualsStateData) => {
        this.hearingActualsMainModel = state.hearingActualsMainModel;
        console.log('HEARING ACTUALS', this.hearingActualsMainModel);
      });


  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
