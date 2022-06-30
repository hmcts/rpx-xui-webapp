import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-linked-hearings',
  templateUrl: './linked-hearings.component.html',
  styleUrls: ['./linked-hearings.component.scss']
})
export class LinkedHearingsComponent implements OnDestroy {
  constructor(private readonly hearingStore: Store<fromHearingStore.State>) {
  }

  public ngOnDestroy(): void {
    this.hearingStore.dispatch(new fromHearingStore.ResetHearingLinks());
  }
}
