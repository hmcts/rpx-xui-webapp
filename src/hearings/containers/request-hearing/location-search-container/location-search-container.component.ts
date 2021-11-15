import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromHearingStore from '../../../../hearings/store';

@Component({
  selector: 'exui-location-search-container',
  templateUrl: './location-search-container.component.html',
  styleUrls: ['./location-search-container.component.scss']
})
export class LocationSearchContainerComponent implements OnInit {
  public serviceId: string = 'SSCS';

  constructor(private readonly hearingStore: Store<fromHearingStore.State>) {}

  public ngOnInit(): void {
    this.hearingStore.pipe(select(fromHearingStore.getHearingsList)).pipe(
      map(hearingList => hearingList.caseHearingsMainModel.hmctsServiceID)
  ).subscribe(id => {
      console.log('seviceIce', id);
      this.serviceId = id
    });
  }

}
