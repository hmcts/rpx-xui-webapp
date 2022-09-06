import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { JudicialUserModel } from '../models/judicialUser.model';
import { JudicialRefDataService } from '../services/judicial-ref-data.service';
import * as fromHearingStore from '../store';

@Injectable({
  providedIn: 'root'
})
export class JudicialUserSearchResponseResolver implements Resolve<JudicialUserModel[]> {
  constructor(
    protected readonly judicialRefDataService: JudicialRefDataService,
    protected readonly hearingStore: Store<fromHearingStore.State>
  ) {
  }

  public resolve(route?: ActivatedRouteSnapshot): Observable<JudicialUserModel[]> {
    return this.getUsersByPanelRequirements$()
      .pipe(
        switchMap(judicialMemberIds => {
          return of(judicialMemberIds);
        }), take(1),
        switchMap((judicialMemberIds) => {
          return judicialMemberIds && judicialMemberIds.length ? this.getUsersData$(judicialMemberIds) : of([]);
        })
      );
  }

  public getUsersByPanelRequirements$(): Observable<string[]> {
    return this.hearingStore.pipe(select(fromHearingStore.getHearingRequest)).pipe(
      map(hearingRequest => {
        let hearingJudgeId: string;
        let panelMemberIds: string[] = [];
        let allJudgeIds: string[] = [];
        if (hearingRequest.hearingRequestMainModel && hearingRequest.hearingRequestMainModel.hearingResponse
          && hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule
          && hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule.length === 1) {
          hearingJudgeId = hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].hearingJudgeId;
          panelMemberIds = hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[0].panelMemberIds  || [];
          allJudgeIds = [hearingJudgeId, ...panelMemberIds];
        }
        return allJudgeIds;
      })
    );
  }

  public getUsersData$(judgePersonalCodesList: string[]): Observable<JudicialUserModel[]> {
    return this.judicialRefDataService.searchJudicialUserByPersonalCodes(judgePersonalCodesList).pipe(
      catchError(() => {
        return [];
      })
    );
  }
}
