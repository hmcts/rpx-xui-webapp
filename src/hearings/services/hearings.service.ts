import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { HearingListMainModel } from '../models/hearingListMain.model';
import {ACTION} from '../models/hearings.enum';
import { ServiceHearingValuesModel } from '../models/serviceHearingValues.model';

@Injectable()
export class HearingsService {

  public actionSubject = new Subject<ACTION>();

  public navigateAction$: Observable<ACTION> = this.actionSubject.asObservable();

  public navigateAction(action: ACTION): void {
    this.actionSubject.next(action);
  }

  constructor(private readonly http: HttpClient) {
  }

  public getAllHearings(caseId: string): Observable<HearingListMainModel> {
    return this.http.get<HearingListMainModel>(`api/hearings/getHearings?caseId=${caseId}`);
  }

  public loadHearingValues(caseId: string): Observable<ServiceHearingValuesModel> {
    return this.http.post<ServiceHearingValuesModel>(`api/hearings/loadServiceHearingValues`,
      { caseReference: caseId });
  }
}
