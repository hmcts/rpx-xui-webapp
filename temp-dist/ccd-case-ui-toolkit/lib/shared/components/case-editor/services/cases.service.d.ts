import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../../app.config';
import { CaseEventData, CaseEventTrigger, CasePrintDocument, CaseView, ChallengedAccessRequest, RoleAssignmentResponse, SpecificAccessRequest } from '../../../domain';
import { HttpErrorService, HttpService, LoadingService, OrderService, RetryUtil, SessionStorageService } from '../../../services';
import { LinkedCasesResponse } from '../../palette/linked-cases/domain/linked-cases.model';
import { WizardPageFieldToCaseFieldMapper } from './wizard-page-field-to-case-field.mapper';
import * as i0 from "@angular/core";
export declare class CasesService {
    private http;
    private appConfig;
    private orderService;
    private errorService;
    private wizardPageFieldToCaseFieldMapper;
    private loadingService;
    private readonly sessionStorageService;
    private readonly retryUtil;
    static readonly V2_MEDIATYPE_CASE_VIEW = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-case-view.v2+json";
    static readonly V2_MEDIATYPE_START_CASE_TRIGGER = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_START_EVENT_TRIGGER = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_START_DRAFT_TRIGGER = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-draft-trigger.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_CASE_DOCUMENTS = "application/vnd.uk.gov.hmcts.ccd-data-store-api.case-documents.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_CASE_DATA_VALIDATE = "application/vnd.uk.gov.hmcts.ccd-data-store-api.case-data-validate.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_CREATE_EVENT = "application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_CREATE_CASE = "application/vnd.uk.gov.hmcts.ccd-data-store-api.create-case.v2+json;charset=UTF-8";
    static readonly PUI_CASE_MANAGER = "pui-case-manager";
    get: (jurisdictionId: string, caseTypeId: string, caseId: string) => Observable<CaseView>;
    static updateChallengedAccessRequestAttributes(httpClient: HttpClient, caseId: string, attributesToUpdate: {
        [x: string]: any;
    }): Observable<RoleAssignmentResponse>;
    static updateSpecificAccessRequestAttributes(httpClient: HttpClient, caseId: string, attributesToUpdate: {
        [x: string]: any;
    }): Observable<RoleAssignmentResponse>;
    constructor(http: HttpService, appConfig: AbstractAppConfig, orderService: OrderService, errorService: HttpErrorService, wizardPageFieldToCaseFieldMapper: WizardPageFieldToCaseFieldMapper, loadingService: LoadingService, sessionStorageService: SessionStorageService, retryUtil: RetryUtil);
    getCaseView(jurisdictionId: string, caseTypeId: string, caseId: string): Observable<CaseView>;
    getCaseViewV2(caseId: string): Observable<CaseView>;
    private pipeErrorProcessor;
    private finalizeGetCaseViewWith;
    getEventTrigger(caseTypeId: string, eventTriggerId: string, caseId?: string, ignoreWarning?: string): Observable<CaseEventTrigger>;
    createEvent(caseDetails: CaseView, eventData: CaseEventData): Observable<{}>;
    validateCase(ctid: string, eventData: CaseEventData, pageId: string): Observable<object>;
    createCase(ctid: string, eventData: CaseEventData): Observable<object>;
    getPrintDocuments(caseId: string): Observable<CasePrintDocument[]>;
    private buildEventTriggerUrl;
    private initialiseEventTrigger;
    private isPuiCaseManager;
    getCourtOrHearingCentreName(locationId: number): Observable<any>;
    createChallengedAccessRequest(caseId: string, request: ChallengedAccessRequest): Observable<RoleAssignmentResponse>;
    createSpecificAccessRequest(caseId: string, sar: SpecificAccessRequest): Observable<RoleAssignmentResponse>;
    getLinkedCases(caseId: string): Observable<LinkedCasesResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CasesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CasesService>;
}
//# sourceMappingURL=cases.service.d.ts.map