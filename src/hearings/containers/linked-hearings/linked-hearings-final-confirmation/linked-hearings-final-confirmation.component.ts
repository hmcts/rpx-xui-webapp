import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromHearingStore from '../../../store';

@Component({
    selector: 'exui-linked-hearings-final-confirmation',
    templateUrl: './linked-hearings-final-confirmation.component.html',
    standalone: false
})
export class LinkedHearingsFinalConfirmationComponent implements OnInit {
  public heading: string;
  public caseId: string;
  public linkedHearingsCount: number;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly route: ActivatedRoute) {
    this.caseId = this.route.snapshot.params.caseId;
    this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState)).subscribe(
      (state) => {
        this.linkedHearingsCount = state.hearingLinks.linkedHearingGroup && state.hearingLinks.linkedHearingGroup.hearingsInGroup.length;
      }
    );
  }

  public ngOnInit(): void {
    if (!this.linkedHearingsCount) {
      this.heading = 'All hearings are now unlinked';
      return;
    }
    switch (this.linkedHearingsCount) {
      case 1:
        this.heading = `${this.linkedHearingsCount} hearing is now linked`;
        break;
      default:
        this.heading = `${this.linkedHearingsCount} hearings are now linked`;
        break;
    }
  }
}
