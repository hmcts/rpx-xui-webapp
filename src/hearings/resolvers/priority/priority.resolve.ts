import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { HearingCategory } from '../../../hearings/models/hearings.enum';
import { RefDataModel } from '../../../hearings/models/refData.model';
import * as fromHearingStore from '../../../hearings/store';
import { HearingsRefDataService } from '../../services/hearings-ref-data.service';

@Injectable({
  providedIn: 'root'
})
export class PriorityResolver implements Resolve<RefDataModel[]> {
  public serviceId: string = 'SSCS';

  constructor(
    private readonly hearingsDataService: HearingsRefDataService,
    private readonly hearingStore: Store<fromHearingStore.State>
  ) { }

  public resolve(): Observable<RefDataModel[]> {
    return this.getServiceId$()
      .pipe(
        switchMap(id => {
          return of(
            id ? id : this.serviceId);
        }), take(1),
        switchMap((serviceId) => {
          return this.getReferenceData$(serviceId);
        })
      );
  }

  public getServiceId$(): Observable<string> {
    return this.hearingStore.pipe(select(fromHearingStore.getHearingList)).pipe(
      map(hearingList => hearingList.hearingListMainModel ? hearingList.hearingListMainModel.hmctsServiceID : '')
    );
  }

  public getReferenceData$(serviceId): Observable<RefDataModel[]> {
    return this.hearingsDataService.getRefData(HearingCategory.Priority, serviceId).pipe(
      catchError(error => {
        return [];
      })
    );
  }
}
