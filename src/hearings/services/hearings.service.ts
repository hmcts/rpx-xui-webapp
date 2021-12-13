import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HearingListMainModel } from '../models/hearingListMain.model';
import { ServiceHearingValuesModel } from '../models/serviceHearingValues.model';

@Injectable()
export class HearingsService {
  public requestHearingForm$: Subject<string> = new Subject<string>();
  public onFormSubmission = (routeName: string) => this.requestHearingForm$.next(routeName);

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
