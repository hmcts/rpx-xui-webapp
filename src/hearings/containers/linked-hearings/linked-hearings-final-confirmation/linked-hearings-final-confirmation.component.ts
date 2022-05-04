import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-linked-hearings-final-confirmation',
  templateUrl: './linked-hearings-final-confirmation.component.html'
})
export class LinkedHearingsFinalConfirmationComponent implements OnInit, OnDestroy {

  public heading: string;
  public caseId: string;
  public sub: Subscription;
  public linkedHearingsCount: number;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly route: ActivatedRoute) {
    this.caseId = this.route.snapshot.params.caseId;
    this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState)).subscribe(
      state => {
        this.linkedHearingsCount = state.hearingLinks.linkedHearingGroup.hearingsInGroup.length;
      }
    );
  }

  public ngOnInit(): void {
    this.heading = this.linkedHearingsCount > 1 ? `${this.linkedHearingsCount} hearings are now linked` : `${this.linkedHearingsCount} hearing is now linked`;
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
