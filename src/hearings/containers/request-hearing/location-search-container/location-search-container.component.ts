import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromHearingStore from '../../../../hearings/store';

@Component({
  selector: 'exui-location-search-container',
  templateUrl: './location-search-container.component.html',
})
export class LocationSearchContainerComponent implements OnInit {
  public serviceIds: string = 'SSCS';

  constructor(private readonly hearingStore: Store<fromHearingStore.State>) {}

  public ngOnInit(): void {
    this.hearingStore.pipe(select(fromHearingStore.getHearingList)).pipe(
      map(hearingList => hearingList.hearingListMainModel ? hearingList.hearingListMainModel.hmctsServiceID : '')
    ).subscribe(id => {
      this.serviceIds = id ? id : this.serviceIds;
    });
  }
}
