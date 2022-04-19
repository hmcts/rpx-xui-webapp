import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HearingActualsMainModel, HearingActualsModel } from '../models/hearingActualsMainModel';
import { HearingLinksStateData } from '../models/hearingLinksStateData.model';
import { HearingListMainModel } from '../models/hearingListMain.model';
import { HearingRequestMainModel } from '../models/hearingRequestMain.model';
import { ACTION, EXUIDisplayStatusEnum } from '../models/hearings.enum';
import {
  HearingDetailModel,
  LinkedHearingGroupMainModel,
  LinkedHearingGroupResponseModel,
  ServiceLinkedCasesModel
} from '../models/linkHearings.model';
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
    return this.http.post<ServiceHearingValuesModel>('api/hearings/loadServiceHearingValues',
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

  public loadHearingRequest(hearingId: string): Observable<HearingRequestMainModel> {
    return this.http.get<HearingRequestMainModel>(`api/hearings/getHearing?hearingId=${hearingId}`);
  }

  public submitHearingRequest(hearingRequestMainModel: HearingRequestMainModel): Observable<HearingRequestMainModel> {
    return this.http.post<HearingRequestMainModel>('api/hearings/submitHearingRequest', hearingRequestMainModel);
  }

  public updateHearingRequest(hearingRequestMainModel: HearingRequestMainModel): Observable<HearingRequestMainModel> {
    return this.http.put<HearingRequestMainModel>('api/hearings/updateHearingRequest', hearingRequestMainModel);
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

  public getAllCaseInformation(linkedState: HearingLinksStateData, isManageLink: boolean): Observable<any[]> {
    const receivedCases: ServiceLinkedCasesModel[] = linkedState.serviceLinkedCases || [];
    const linkedCaseIds: string[] = receivedCases.map((caseDetails: ServiceLinkedCasesModel) => caseDetails.caseReference);
    const hearingServices = [];
    linkedCaseIds.forEach(id => {
      hearingServices.push(this.getAllHearings(id));
    });
    return forkJoin(hearingServices).pipe(
      map((hearingsList: HearingListMainModel[]) => {
        return receivedCases.map((caseInfo: ServiceLinkedCasesModel, pos: number) => {
          const hearings = [] as HearingDetailModel[];
          hearingsList[pos].caseHearings.forEach((hearing) => {
            if (hearing.exuiDisplayStatus === EXUIDisplayStatusEnum.AWAITING_LISTING || hearing.exuiDisplayStatus === EXUIDisplayStatusEnum.UPDATE_REQUESTED || hearing.exuiDisplayStatus === EXUIDisplayStatusEnum.LISTED) {
              const hearingInfo: HearingDetailModel = {
                hearingId: hearing.hearingID,
                hearingStage: hearing.hearingType,
                isSelected: isManageLink ? !!linkedState.linkedHearingGroup.hearingsInGroup.find((hearingInfo) => hearingInfo.caseRef === caseInfo.caseReference && hearingInfo.hearingId === hearing.hearingID) : false,
                hearingStatus: hearing.exuiDisplayStatus,
                hearingIsLinkedFlag: hearing.hearingIsLinkedFlag
              };
              hearings.push(hearingInfo);
            }
          });
          return {
            hearings,
            ...caseInfo
          };
        });
      })
    );
  }
}
