import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromHearingStore from '../../store';
import { LoadServiceHearingDataPayload, LoadServiceLinkedCasesPayload, LoadServiceLinkedCasesWithHearingsPayload } from '../../store';

@Component({
  selector: 'exui-linked-hearings',
  templateUrl: './linked-hearings.component.html',
  styleUrls: ['./linked-hearings.component.scss']
})
export class LinkedHearingsComponent implements OnInit, OnDestroy {
  public caseId: string;
  public jurisdictionId: string;
  public hearingId: string;
  public caseName: string;
  public sub: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly route: ActivatedRoute) {
    this.caseId = this.route.snapshot.params.caseId;
    this.jurisdictionId = '';
    this.hearingId = this.route.snapshot.params.hearingId;
    this.sub = this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel)).subscribe(
      (state) => {
        this.caseName = state?.hmctsInternalCaseName ? state?.hmctsInternalCaseName : state?.publicCaseName;
      }
    );
  }

  public ngOnInit(): void {
    this.hearingStore.dispatch(new fromHearingStore.LoadServiceLinkedCases(
      new LoadServiceLinkedCasesPayload(this.jurisdictionId, this.caseId, this.hearingId)));
    this.hearingStore.dispatch(new fromHearingStore.LoadServiceLinkedCasesWithHearings(
      new LoadServiceLinkedCasesWithHearingsPayload(this.jurisdictionId, this.caseId, this.caseName, this.hearingId)));
  }

  public ngOnDestroy(): void {
    this.hearingStore.dispatch(new fromHearingStore.ResetHearingLinks());
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
