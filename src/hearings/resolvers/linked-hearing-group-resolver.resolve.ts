import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HearingLinksStateData } from '../models/hearingLinksStateData.model';
import * as fromHearingStore from '../store';

@Injectable({
  providedIn: 'root'
})
export class LinkedHearingGroupResolver implements Resolve<HearingLinksStateData> {
  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>
  ) { }

  public resolve(): Observable<HearingLinksStateData> | HearingLinksStateData {
    return this.getHearingLinkState$()
      .pipe(
        switchMap(hearingState => {
          return of(hearingState);
        })
      );
  }

  public getHearingLinkState$(): Observable<HearingLinksStateData> {
    return this.hearingStore.pipe(select(fromHearingStore.getHearingLinks)).pipe(
      map(hearingLinks => hearingLinks
      ));
  }
}

