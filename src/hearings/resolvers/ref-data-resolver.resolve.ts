import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { HearingCategory } from '../models/hearings.enum';
import { RefDataModel } from '../models/refData.model';
import { HearingsRefDataService } from '../services/hearings-ref-data.service';
import * as fromHearingStore from '../store';

@Injectable({
  providedIn: 'root'
})
export class RefDataResolver implements Resolve<RefDataModel[]> {
  public serviceId: string = 'SSCS';

  constructor(
    private readonly hearingsDataService: HearingsRefDataService,
    private readonly hearingStore: Store<fromHearingStore.State>
  ) { }

  public resolve(route?: ActivatedRouteSnapshot): Observable<RefDataModel[]> {
    return this.getServiceId$()
      .pipe(
        switchMap(id => {
          return of(
            id ? id : this.serviceId);
        }), take(1),
        switchMap((serviceId) => {
          const category = route.data['category'] ? route.data['category'] as HearingCategory : HearingCategory.Priority;
          return this.getReferenceData$(serviceId, category);
        })
      );
  }

  public getServiceId$(): Observable<string> {
    return this.hearingStore.pipe(select(fromHearingStore.getHearingList)).pipe(
      map(hearingList => hearingList.hearingListMainModel ? hearingList.hearingListMainModel.hmctsServiceID : '')
    );
  }

  public getReferenceData$(serviceId, category: HearingCategory): Observable<RefDataModel[]> {
    return this.hearingsDataService.getRefData(category, serviceId).pipe(
      catchError(error => {
        return [];
      })
    );
  }
}
