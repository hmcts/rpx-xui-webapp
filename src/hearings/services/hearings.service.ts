import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HearingListMainModel } from '../models/hearingListMain.model';
import { HearingRequestMainModel } from '../models/hearingRequestMain.model';
import { ACTION } from '../models/hearings.enum';
import { RefDataModel } from '../models/refData.model';
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

  public cancelHearingRequest(hearingId: string, reasons: RefDataModel[]): Observable<any> {
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
}
