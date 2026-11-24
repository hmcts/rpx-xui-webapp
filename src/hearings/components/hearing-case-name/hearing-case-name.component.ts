import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromHearingStore from '../../store';

@Component({
  standalone: false,
  selector: 'exui-hearing-case-name',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './hearing-case-name.component.html',
})
export class HearingCaseNameComponent implements OnInit, OnDestroy {
  public caseName: string;
  public serviceValueSub: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>) {}

  public ngOnInit(): void {
    this.serviceValueSub = this.hearingStore
      .pipe(select(fromHearingStore.getHearingRequest))
      .subscribe((hearingRequest) => (this.caseName = hearingRequest.hearingRequestMainModel.caseDetails.hmctsInternalCaseName));
  }

  public ngOnDestroy(): void {
    if (this.serviceValueSub) {
      this.serviceValueSub.unsubscribe();
    }
  }
}
