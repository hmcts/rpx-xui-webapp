import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { defer, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
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
import { HearingsTelemetryService, HearingsTelemetryAction, HearingsValidationCategory } from './hearings-telemetry.service';
import { HearingsOperation } from './hearings-exception-telemetry';

@Injectable()
export class HearingsService {
  public actionSubject = new Subject<ACTION>();

  public navigateAction$: Observable<ACTION> = this.actionSubject.asObservable();

  public propertiesUpdatedOnPageVisit: PropertiesUpdatedOnPageVisit;
  public propertiesUpdatedAutomatically: PropertiesUpdatedAutomatically = { pageless: {}, withinPage: {} };
  public displayValidationError: boolean = false;
  public submitUpdatedRequestClicked: boolean = false;
  public hearingRequestForSubmitValid: boolean = false;
  public hearingRequestContinueDisabled: boolean = false;

  constructor(
    private readonly http: HttpClient,
    @Optional() private readonly telemetry?: HearingsTelemetryService
  ) {}

  public navigateAction(action: ACTION): void {
    const actions = new Map<ACTION, HearingsTelemetryAction>([
      [ACTION.BACK, 'back'],
      [ACTION.CONTINUE, 'continue'],
      [ACTION.SUBMIT, 'submit'],
      [ACTION.CANCEL, 'cancel'],
      [ACTION.VIEW_EDIT_REASON, 'submit'],
      [ACTION.VIEW_EDIT_SUBMIT, 'submit'],
    ]);
    const telemetryAction = actions.get(action);
    if (telemetryAction) {
      this.recordAction(telemetryAction);
    }
    this.actionSubject.next(action);
  }

  public recordAction(action: HearingsTelemetryAction): void {
    try {
      this.telemetry?.recordAction(action);
    } catch {
      // Telemetry must never prevent the original navigation, validation or API operation.
    }
  }

  public recordValidationFailure(category: HearingsValidationCategory, errorCount = 1): void {
    try {
      this.telemetry?.recordValidationFailure(category, errorCount);
    } catch {
      // Do not log validation details or interfere with the user's journey.
    }
  }

  public getAllHearings(caseId: string): Observable<HearingListMainModel> {
    return this.observeErrors('getAllHearings', this.http.get<HearingListMainModel>(`api/hearings/getHearings?caseId=${caseId}`));
  }

  public errorReporter(operation: HearingsOperation): (error: unknown) => void {
    try {
      const report = this.telemetry?.captureException(operation);
      return (error) => {
        try {
          report?.(error);
        } catch {
          /* Preserve the original application error. */
        }
      };
    } catch {
      return () => {};
    }
  }

  private observeErrors<T>(operation: HearingsOperation, request: Observable<T>): Observable<T> {
    return defer(() => request.pipe(tap({ error: this.errorReporter(operation) })));
  }

  public loadHearingValues(jurisdictionId: string, caseId: string): Observable<ServiceHearingValuesModel> {
    return this.observeErrors(
      'loadHearingValues',
      this.http.post<ServiceHearingValuesModel>(`api/hearings/loadServiceHearingValues?jurisdictionId=${jurisdictionId}`, {
        caseReference: caseId,
      })
    );
  }

  public loadServiceLinkedCases(
    jurisdictionId: string,
    caseReference: string,
    hearingId?: string
  ): Observable<ServiceLinkedCasesModel[]> {
    return this.observeErrors(
      'loadServiceLinkedCases',
      this.http.post<ServiceLinkedCasesModel[]>(`api/hearings/loadServiceLinkedCases?jurisdictionId=${jurisdictionId}`, {
        caseReference,
        hearingId, // could be null, empty string or missing
      })
    );
  }

  public loadLinkedCasesWithHearings(
    jurisdictionId: string,
    caseReference: string,
    caseName: string,
    hearingId?: string
  ): Observable<ServiceLinkedCasesWithHearingsModel[]> {
    return this.observeErrors(
      'loadLinkedCasesWithHearings',
      this.http.post<ServiceLinkedCasesWithHearingsModel[]>(
        `api/hearings/loadLinkedCasesWithHearings?jurisdictionId=${jurisdictionId}`,
        {
          caseReference,
          caseName,
          hearingId, // could be null, empty string or missing
        }
      )
    );
  }

  public loadCaseLinkingReasonCodes(): Observable<LovRefDataByServiceModel> {
    return this.observeErrors(
      'loadCaseLinkingReasonCodes',
      this.http.get<LovRefDataByServiceModel>('/refdata/commondata/lov/categories/CaseLinkingReasonCode')
    );
  }

  public cancelHearingRequest(hearingId: string, caseId: string, reasons: LovRefDataModel[]): Observable<ResponseDetailsModel> {
    const cancellationReasonCodes: string[] = reasons.map((reason) => reason.key);
    const params = new HttpParams().set('hearingId', hearingId).set('caseId', caseId);

    return this.observeErrors(
      'cancelHearingRequest',
      this.http.delete<ResponseDetailsModel>('api/hearings/cancelHearings', {
        params,
        body: { cancellationReasonCodes },
      })
    );
  }

  public loadHearingRequest(hearingId: string, caseRef: string): Observable<HearingRequestMainModel> {
    return this.observeErrors(
      'loadHearingRequest',
      this.http.get<HearingRequestMainModel>(`api/hearings/getHearing?hearingId=${hearingId}&caseRef=${caseRef}`)
    );
  }

  public submitHearingRequest(hearingRequestMainModel: HearingRequestMainModel): Observable<ResponseDetailsModel> {
    return this.observeErrors(
      'submitHearingRequest',
      this.http.post<ResponseDetailsModel>(
        'api/hearings/submitHearingRequest',
        this.prepareHearingRequestModel(hearingRequestMainModel)
      )
    );
  }

  public updateHearingRequest(hearingRequestMainModel: HearingRequestMainModel): Observable<ResponseDetailsModel> {
    const options = {
      params: new HttpParams().set('hearingId', hearingRequestMainModel.requestDetails.hearingRequestID),
    };
    return this.observeErrors(
      'updateHearingRequest',
      this.http.put<ResponseDetailsModel>(
        'api/hearings/updateHearingRequest',
        this.prepareHearingRequestModel(hearingRequestMainModel),
        options
      )
    );
  }

  public getHearingActuals(hearingId: string, caseRef: string): Observable<HearingActualsMainModel> {
    return this.observeErrors(
      'getHearingActuals',
      this.http.get<HearingActualsMainModel>(`api/hearings/hearingActuals/${hearingId}?caseRef=${caseRef}`)
    );
  }

  public updateHearingActuals(
    hearingId: string,
    hearingActualsModel: HearingActualsModel,
    caseId: string
  ): Observable<HearingActualsMainModel> {
    return this.observeErrors(
      'updateHearingActuals',
      this.http.put<HearingActualsMainModel>(
        `api/hearings/hearingActuals?hearingId=${hearingId}&caseId=${caseId}`,
        hearingActualsModel
      )
    );
  }

  public submitHearingActuals(hearingId: string, caseRef: string): Observable<HttpResponse<number>> {
    return this.observeErrors(
      'submitHearingActuals',
      this.http.post<HttpResponse<number>>(`api/hearings/hearingActualsCompletion/${hearingId}?caseRef=${caseRef}`, null)
    );
  }

  public getLinkedHearingGroup(groupId: string, hearingId: string, caseId: string): Observable<LinkedHearingGroupMainModel> {
    return this.observeErrors(
      'getLinkedHearingGroup',
      this.http.get<LinkedHearingGroupMainModel>(
        `api/hearings/getLinkedHearingGroup?groupId=${groupId}&hearingId=${hearingId}&caseId=${caseId}`
      )
    );
  }

  public postLinkedHearingGroup(
    linkedHearingGroupMainModel: LinkedHearingGroupMainModel,
    caseId: string,
    hearingId: string
  ): Observable<LinkedHearingGroupResponseModel> {
    return this.observeErrors(
      'postLinkedHearingGroup',
      this.http.post<LinkedHearingGroupResponseModel>(
        `api/hearings/postLinkedHearingGroup?caseId=${caseId}&hearingId=${hearingId}`,
        linkedHearingGroupMainModel
      )
    );
  }

  public putLinkedHearingGroup(
    groupId: string,
    linkedHearingGroupMainModel: LinkedHearingGroupMainModel,
    caseId: string,
    hearingId: string
  ): Observable<LinkedHearingGroupResponseModel> {
    return this.observeErrors(
      'putLinkedHearingGroup',
      this.http.put<LinkedHearingGroupResponseModel>(
        `api/hearings/putLinkedHearingGroup?groupId=${groupId}&caseId=${caseId}&hearingId=${hearingId}`,
        linkedHearingGroupMainModel
      )
    );
  }

  public deleteLinkedHearingGroup(
    hearingGroupId: string,
    caseId: string,
    hearingId: string
  ): Observable<LinkedHearingGroupResponseModel> {
    const options = {
      params: new HttpParams().set('hearingGroupId', hearingGroupId).set('caseId', caseId).set('hearingId', hearingId),
    };
    return this.observeErrors(
      'deleteLinkedHearingGroup',
      this.http.delete<LinkedHearingGroupResponseModel>('api/hearings/deleteLinkedHearingGroup', options)
    );
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
