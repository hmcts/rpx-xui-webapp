import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HearingActualsMainModel, HearingActualsModel } from '../models/hearingActualsMainModel';
import { HearingListMainModel } from '../models/hearingListMain.model';
import { HearingRequestMainModel } from '../models/hearingRequestMain.model';
import { ACTION } from '../models/hearings.enum';
import { LovRefDataModel } from '../models/lovRefData.model';
import { ServiceHearingValuesModel } from '../models/serviceHearingValues.model';

@Injectable()
export class HearingsService {

  public actionSubject = new Subject<ACTION>();

  public navigateAction$: Observable<ACTION> = this.actionSubject.asObservable();

  constructor(private readonly http: HttpClient) {
  }

  public navigateAction(action: ACTION): void {
    this.actionSubject.next(action);
  }

  public getAllHearings(caseId: string): Observable<HearingListMainModel> {
    return this.http.get<HearingListMainModel>(`api/hearings/getHearings?caseId=${caseId}`);
  }

  public loadHearingValues(caseId: string): Observable<ServiceHearingValuesModel> {
    return this.http.post<ServiceHearingValuesModel>(`api/hearings/loadServiceHearingValues`,
      { caseReference: caseId });
  }

  public cancelHearingRequest(hearingId: string, reasons: LovRefDataModel[]): Observable<any> {
    const cancellationReasonCode: string = reasons.map(reason => reason.key).toString();
    let httpParams = new HttpParams();
    httpParams = httpParams.append('cancellationReasonCode', cancellationReasonCode);
    httpParams = httpParams.append('versionNumber', '1');
    return this.http.delete<any>(`api/hearings/cancelHearings?hearingId=${hearingId}`, {
      params: httpParams
    });
  }

  public submitHearingRequest(hearingRequestMainModel: HearingRequestMainModel): Observable<HearingRequestMainModel> {
    return this.http.post<HearingRequestMainModel>('api/hearings/submitHearingRequest', hearingRequestMainModel);
  }

  public getHearingActuals(hearingId: string): Observable<HearingActualsMainModel> {
    return this.http.get<any>(`api/hearings/hearingActuals/${hearingId}`);
  }

  public updateHearingActuals(hearingId: string, hearingActualsModel: HearingActualsModel): Observable<HearingActualsModel> {
    return this.http.put<HearingActualsModel>(`api/hearings/hearingActuals/${hearingId}`, hearingActualsModel);
  }

  public submitHearingActuals(hearingId: string): Observable<number> {
    return this.http.post<number>(`api/hearings/hearingActualsCompletion/${hearingId}`, null);
  }
}
