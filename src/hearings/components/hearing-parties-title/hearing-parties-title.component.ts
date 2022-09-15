import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ServiceHearingValuesModel } from '../../models/serviceHearingValues.model';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-hearing-parties-title',
  templateUrl: './hearing-parties-title.component.html',
})
export class HearingPartiesTitleComponent implements OnInit, OnDestroy {

  public caseTitle: string;
  public serviceValueSub: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>) {
  }

  public ngOnInit(): void {
    this.serviceValueSub = this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel)).subscribe((hearingValueModel: ServiceHearingValuesModel) =>
      this.caseTitle = hearingValueModel ? hearingValueModel.publicCaseName : ''
    );
  }

  public ngOnDestroy(): void {
    if (this.serviceValueSub) {
      this.serviceValueSub.unsubscribe();
    }
  }
}
