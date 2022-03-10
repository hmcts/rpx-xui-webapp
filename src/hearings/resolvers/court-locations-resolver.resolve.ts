import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { LocationModel } from '../models/location.model';
import { LocationsDataService } from '../services/locations-data.service';
import * as fromHearingStore from '../store';

@Injectable({
  providedIn: 'root'
})
export class CourtLocationsDataResolver implements Resolve<LocationModel> {

  constructor(
    protected readonly locationsDataService: LocationsDataService,
    protected readonly hearingStore: Store<fromHearingStore.State>
  ) { }

  public resolve(): Observable<LocationModel> {
    return this.getLocationId$()
      .pipe(
        switchMap(id => of(id)), take(1),
        switchMap((locationId) => {
          return this.getCourtLocationData$(locationId);
        })
      );
  }

  public getLocationId$(): Observable<string> {
    return this.hearingStore.pipe(select(fromHearingStore.getHearingRequest)).pipe(
      map(hearingRequest => hearingRequest.hearingRequestMainModel && hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule.hearingVenueId)
    );
  }

  public getCourtLocationData$(locationId: string): Observable<LocationModel> {
    return this.locationsDataService.getLocationById(locationId).pipe(
      catchError(() => {
        return [];
      })
    );
  }
}
