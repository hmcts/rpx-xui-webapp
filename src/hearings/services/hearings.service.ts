import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HearingActualsMainModel, HearingActualsModel } from '../models/hearingActualsMainModel';
import { HearingListMainModel } from '../models/hearingListMain.model';
import { HearingRequestMainModel } from '../models/hearingRequestMain.model';
import { ACTION, HearingChannelEnum } from '../models/hearings.enum';
import { PropertiesUpdatedAutomatically, PropertiesUpdatedOnPageVisit } from '../models/hearingsUpdateMode.enum';
import {
  LinkedHearingGroupMainModel,
  LinkedHearingGroupResponseModel,
  ServiceLinkedCasesModel,
  ServiceLinkedCasesWithHearingsModel,
} from '../models/linkHearings.model';
import { LovRefDataByServiceModel, LovRefDataModel } from '../models/lovRefData.model';
import { ResponseDetailsModel } from '../models/requestDetails.model';
import { ServiceHearingValuesModel } from '../models/serviceHearingValues.model';

@Injectable()
export class HearingsService {
  public actionSubject = new Subject<ACTION>();

  public navigateAction$: Observable<ACTION> = this.actionSubject.asObservable();

  public propertiesUpdatedOnPageVisit: PropertiesUpdatedOnPageVisit;
  public propertiesUpdatedAutomatically: PropertiesUpdatedAutomatically = { pageless: {}, withinPage: {} };
  public displayValidationError: boolean = false;
  public submitUpdatedRequestClicked: boolean = false;
  public hearingRequestForSubmitValid: boolean = false;

  constructor(private readonly http: HttpClient) {}

  public navigateAction(action: ACTION): void {
    this.actionSubject.next(action);
  }

  public getAllHearings(caseId: string): Observable<HearingListMainModel> {
    return this.http.get<HearingListMainModel>(`api/hearings/getHearings?caseId=${caseId}`);
  }

  public loadHearingValues(jurisdictionId: string, caseId: string): Observable<ServiceHearingValuesModel> {
    return this.http.post<ServiceHearingValuesModel>(`api/hearings/loadServiceHearingValues?jurisdictionId=${jurisdictionId}`, {
      caseReference: caseId,
    });
  }

  public loadServiceLinkedCases(
    jurisdictionId: string,
    caseReference: string,
    hearingId?: string
  ): Observable<ServiceLinkedCasesModel[]> {
    return this.http.post<ServiceLinkedCasesModel[]>(`api/hearings/loadServiceLinkedCases?jurisdictionId=${jurisdictionId}`, {
      caseReference,
      hearingId, // could be null, empty string or missing
    });
  }

  public loadLinkedCasesWithHearings(
    jurisdictionId: string,
    caseReference: string,
    caseName: string,
    hearingId?: string
  ): Observable<ServiceLinkedCasesWithHearingsModel[]> {
    return this.http.post<ServiceLinkedCasesWithHearingsModel[]>(
      `api/hearings/loadLinkedCasesWithHearings?jurisdictionId=${jurisdictionId}`,
      {
        caseReference,
        caseName,
        hearingId, // could be null, empty string or missing
      }
    );
  }

  public loadCaseLinkingReasonCodes(): Observable<LovRefDataByServiceModel> {
    return this.http.get<LovRefDataByServiceModel>('/refdata/commondata/lov/categories/CaseLinkingReasonCode');
  }

  public cancelHearingRequest(hearingId: string, caseId: string, reasons: LovRefDataModel[]): Observable<ResponseDetailsModel> {
    const cancellationReasonCodes: string[] = reasons.map((reason) => reason.key);
    const params = new HttpParams()
      .set('hearingId', hearingId)
      .set('caseId', caseId);

    return this.http.delete<ResponseDetailsModel>('api/hearings/cancelHearings', {
      params,
      body: { cancellationReasonCodes }
    });
  }

  public loadHearingRequest(hearingId: string, caseRef: string): Observable<HearingRequestMainModel> {
    return this.http.get<HearingRequestMainModel>(`api/hearings/getHearing?hearingId=${hearingId}&caseRef=${caseRef}`);
  }

  public submitHearingRequest(hearingRequestMainModel: HearingRequestMainModel): Observable<ResponseDetailsModel> {
    return this.http.post<ResponseDetailsModel>(
      'api/hearings/submitHearingRequest',
      this.prepareHearingRequestModel(hearingRequestMainModel)
    );
  }

  public updateHearingRequest(hearingRequestMainModel: HearingRequestMainModel): Observable<ResponseDetailsModel> {
    const options = {
      params: new HttpParams().set('hearingId', hearingRequestMainModel.requestDetails.hearingRequestID),
    };
    return this.http.put<ResponseDetailsModel>(
      'api/hearings/updateHearingRequest',
      this.prepareHearingRequestModel(hearingRequestMainModel),
      options
    );
  }

  public getHearingActuals(hearingId: string, caseRef: string): Observable<HearingActualsMainModel> {
    return this.http.get<any>(`api/hearings/hearingActuals/${hearingId}?caseRef=${caseRef}`);
  }

  public updateHearingActuals(hearingId: string, hearingActualsModel: HearingActualsModel, caseId: string): Observable<HearingActualsMainModel> {
    return this.http.put<HearingActualsMainModel>(`api/hearings/hearingActuals?hearingId=${hearingId}&caseId=${caseId}`, hearingActualsModel);
  }

  public submitHearingActuals(hearingId: string, caseRef: string): Observable<HttpResponse<number>> {
    return this.http.post<HttpResponse<number>>(`api/hearings/hearingActualsCompletion/${hearingId}?caseRef=${caseRef}`, null);
  }

  public getLinkedHearingGroup(groupId: string, hearingId: string, caseId: string): Observable<LinkedHearingGroupMainModel> {
    return this.http.get<LinkedHearingGroupMainModel>(`api/hearings/getLinkedHearingGroup?groupId=${groupId}&hearingId=${hearingId}&caseId=${caseId}`);
  }

  public postLinkedHearingGroup(linkedHearingGroupMainModel: LinkedHearingGroupMainModel, caseId: string, hearingId: string): Observable<LinkedHearingGroupResponseModel> {
    return this.http.post<LinkedHearingGroupResponseModel>(`api/hearings/postLinkedHearingGroup?caseId=${caseId}&hearingId=${hearingId}`, linkedHearingGroupMainModel);
  }

  public putLinkedHearingGroup(groupId: string, linkedHearingGroupMainModel: LinkedHearingGroupMainModel, caseId: string, hearingId: string): Observable<LinkedHearingGroupResponseModel> {
    return this.http.put<LinkedHearingGroupResponseModel>(`api/hearings/putLinkedHearingGroup?groupId=${groupId}&caseId=${caseId}&hearingId=${hearingId}`, linkedHearingGroupMainModel);
  }

  public deleteLinkedHearingGroup(hearingGroupId: string, caseId: string, hearingId: string): Observable<LinkedHearingGroupResponseModel> {
    const options = {
      params: new HttpParams()
        .set('hearingGroupId', hearingGroupId)
        .set('caseId', caseId)
        .set('hearingId', hearingId)
    };
    return this.http.delete<LinkedHearingGroupResponseModel>('api/hearings/deleteLinkedHearingGroup', options);
  }

  public prepareHearingRequestModel(hearingRequestMainModel: HearingRequestMainModel): HearingRequestMainModel {
    let model = hearingRequestMainModel;
    const newModel: HearingRequestMainModel = {
      ...hearingRequestMainModel,
      hearingDetails: {
        ...hearingRequestMainModel.hearingDetails,
        hearingWindow: null,
      },
    };
    if (
      hearingRequestMainModel.hearingDetails.hearingWindow &&
      Object.keys(hearingRequestMainModel.hearingDetails.hearingWindow).length === 0
    ) {
      model = newModel;
    }
    return model;
  }

  public getHearingChannels(hearingRequestMainModel: HearingRequestMainModel): string[] {
    return hearingRequestMainModel.hearingDetails?.isPaperHearing
      ? [HearingChannelEnum.ONPPR]
      : hearingRequestMainModel.hearingDetails.hearingChannels;
  }
}
