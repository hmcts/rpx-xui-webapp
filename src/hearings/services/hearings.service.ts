import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HearingActualsMainModel, HearingActualsModel} from '../models/hearingActualsMainModel';
import {HearingListMainModel} from '../models/hearingListMain.model';
import {HearingRequestMainModel} from '../models/hearingRequestMain.model';
import {ACTION} from '../models/hearings.enum';
import {
  LinkedHearingGroupMainModel,
  LinkedHearingGroupResponseModel,
  ServiceLinkedCasesModel
} from '../models/linkHearings.model';
import {LovRefDataModel} from '../models/lovRefData.model';
import {ResponseDetailsModel} from '../models/requestDetails.model';
import {ServiceHearingValuesModel} from '../models/serviceHearingValues.model';

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
    return this.http.post<ServiceHearingValuesModel>('api/hearings/loadServiceHearingValues',
      {caseReference: caseId});
  }

  public cancelHearingRequest(hearingId: string, reasons: LovRefDataModel[]): Observable<ResponseDetailsModel> {
    // TODO below logic may change, currently it was confirmed by HMC and stakeholder we will only send the 1st reasonCode to the backend
    const cancellationReasonCodes: string[] = reasons.map(reason => reason.key);
    const cancellationReasonCode: string = cancellationReasonCodes.length > 0 ? cancellationReasonCodes[0] : '';
    let httpParams = new HttpParams();
    httpParams = httpParams.append('cancellationReasonCode', cancellationReasonCode);
    return this.http.delete<ResponseDetailsModel>(`api/hearings/cancelHearings?hearingId=${hearingId}`, {
      params: httpParams
    });
  }

  public loadHearingRequest(hearingId: string): Observable<HearingRequestMainModel> {
    return this.http.get<HearingRequestMainModel>(`api/hearings/getHearing?hearingId=${hearingId}`);
  }

  public submitHearingRequest(hearingRequestMainModel: HearingRequestMainModel): Observable<ResponseDetailsModel> {
    return this.http.post<ResponseDetailsModel>('api/hearings/submitHearingRequest', hearingRequestMainModel);
  }

  public updateHearingRequest(hearingRequestMainModel: HearingRequestMainModel): Observable<ResponseDetailsModel> {
    const options = {
      params: new HttpParams()
        .set('hearingId', hearingRequestMainModel.requestDetails.hearingRequestID)
    };
    return this.http.put<ResponseDetailsModel>(`api/hearings/updateHearingRequest`, hearingRequestMainModel, options);
  }

  public getHearingActuals(hearingId: string): Observable<HearingActualsMainModel> {
    return this.http.get<any>(`api/hearings/hearingActuals/${hearingId}`);
  }

  public updateHearingActuals(hearingId: string, hearingActualsModel: HearingActualsModel): Observable<HearingActualsMainModel> {
    return this.http.put<HearingActualsMainModel>(`api/hearings/hearingActuals/${hearingId}`, hearingActualsModel);
  }

  public submitHearingActuals(hearingId: string): Observable<HttpResponse<number>> {
    return this.http.post<HttpResponse<number>>(`api/hearings/hearingActualsCompletion/${hearingId}`, null);
  }

  public loadServiceLinkedCases(caseReference: string, hearingId?: string): Observable<ServiceLinkedCasesModel[]> {
    return this.http.post<ServiceLinkedCasesModel[]>('api/hearings/loadServiceLinkedCases', {
      caseReference,
      hearingId // could be null, empty string or missing
    });
  }

  public getLinkedHearingGroup(caseReference: string, hearingId?: string): Observable<LinkedHearingGroupMainModel> {
    return this.http.get<LinkedHearingGroupMainModel>(`api/hearings/getLinkedHearingGroup?caseReference=${caseReference}&hearingId=${hearingId}`);
  }

  public postLinkedHearingGroup(linkedHearingGroupMainModel: LinkedHearingGroupMainModel): Observable<LinkedHearingGroupResponseModel> {
    return this.http.post<LinkedHearingGroupResponseModel>('api/hearings/postLinkedHearingGroup', linkedHearingGroupMainModel);
  }

  public putLinkedHearingGroup(linkedHearingGroupMainModel: LinkedHearingGroupMainModel): Observable<LinkedHearingGroupResponseModel> {
    return this.http.put<LinkedHearingGroupResponseModel>('api/hearings/putLinkedHearingGroup', linkedHearingGroupMainModel);
  }

  public deleteLinkedHearingGroup(hearingGroupId: string, hearingIds: string): Observable<LinkedHearingGroupResponseModel> {
    const options = {
      params: new HttpParams()
        .set('hearingGroupId', hearingGroupId)
        .set('hearingIds', hearingIds)
    };
    return this.http.delete<LinkedHearingGroupResponseModel>('api/hearings/deleteLinkedHearingGroup', options);
  }
}
