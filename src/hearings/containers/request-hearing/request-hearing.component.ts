import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-request-hearing',
  templateUrl: './request-hearing.component.html',
  styleUrls: ['./request-hearing.component.scss']
})
export class RequestHearingComponent implements OnInit, OnDestroy {
  public backLink: string;
  public referenceId: string;
  public hearingListSub: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>) {
    this.hearingListSub = this.hearingStore.pipe(select(fromHearingStore.getHearingList)).subscribe(
      hearingList => {
        this.referenceId = hearingList.hearingListMainModel ? hearingList.hearingListMainModel.caseRef : '';
      }
    );
  }

  public ngOnInit(): void {
    this.hearingStore.dispatch(new fromHearingStore.LoadHearingValues(this.referenceId));
  }

  /**
   * Determines whether submit on
   * @returns void if invalid form
   */
  public onSubmit(): void {
  }

  public ngOnDestroy(): void {
    if (this.hearingListSub) {
      this.hearingListSub.unsubscribe();
    }
  }
}
