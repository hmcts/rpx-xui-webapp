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
        let panelMemberIds: string[] = [];
        let hearingJudgeIds: string[] = [];
        if (hearingRequest.hearingRequestMainModel && hearingRequest.hearingRequestMainModel.hearingResponse && hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule) {
          panelMemberIds = hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule.map(member => member.panelMemberId).filter(memberId => memberId) || [];
          hearingJudgeIds = hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule.map(judge => judge.hearingJudgeId).filter(judgeId => judgeId) || [];
          panelMemberIds = [...panelMemberIds, ...hearingJudgeIds];
        }
        return panelMemberIds;
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
