import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-linked-hearingss',
  templateUrl: './linked-hearings.component.html',
  styleUrls: ['./linked-hearings.component.scss']
})
export class LinkedHearingsComponent {
  public caseId: string;
  public caseName: string;
  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly route: ActivatedRoute) {
    this.caseId = this.route.snapshot.params.caseId;
    this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState)).subscribe(
      state => {
        this.caseName = state.hearingValues.serviceHearingValuesModel ? state.hearingValues.serviceHearingValuesModel.caseName : '';
      }
    );
  }
}
