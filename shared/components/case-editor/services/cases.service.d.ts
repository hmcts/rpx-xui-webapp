import { Observable } from 'rxjs';
import { AbstractAppConfig } from '../../../../app.config';
import { CaseEventData, CaseEventTrigger, CasePrintDocument, CaseView, FieldTypeEnum } from '../../../domain';
import { HttpErrorService, HttpService, LoadingService, OrderService, SessionStorageService } from '../../../services';
import { WizardPageFieldToCaseFieldMapper } from './wizard-page-field-to-case-field.mapper';
import { WorkAllocationService } from './work-allocation.service';
export declare class CasesService {
    private http;
    private appConfig;
    private orderService;
    private errorService;
    private wizardPageFieldToCaseFieldMapper;
    private readonly workAllocationService;
    private loadingService;
    private readonly sessionStorageService;
    static readonly V2_MEDIATYPE_CASE_VIEW = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-case-view.v2+json";
    static readonly V2_MEDIATYPE_START_CASE_TRIGGER = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_START_EVENT_TRIGGER = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_START_DRAFT_TRIGGER = "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-draft-trigger.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_CASE_DOCUMENTS = "application/vnd.uk.gov.hmcts.ccd-data-store-api.case-documents.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_CASE_DATA_VALIDATE = "application/vnd.uk.gov.hmcts.ccd-data-store-api.case-data-validate.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_CREATE_EVENT = "application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json;charset=UTF-8";
    static readonly V2_MEDIATYPE_CREATE_CASE = "application/vnd.uk.gov.hmcts.ccd-data-store-api.create-case.v2+json;charset=UTF-8";
    static readonly SERVER_RESPONSE_FIELD_TYPE_COLLECTION = "Collection";
    static readonly SERVER_RESPONSE_FIELD_TYPE_COMPLEX = "Complex";
    static readonly SERVER_RESPONSE_FIELD_TYPE_DYNAMIC_LIST_TYPE: FieldTypeEnum[];
    static readonly PUI_CASE_MANAGER = "pui-case-manager";
    /**
     *
     * @type {(caseId:string)=>"../../Observable".Observable<Case>}
     * @deprecated Use `CasesService::getCaseView` instead
     */
    get: (jurisdictionId: string, caseTypeId: string, caseId: string) => Observable<CaseView>;
    constructor(http: HttpService, appConfig: AbstractAppConfig, orderService: OrderService, errorService: HttpErrorService, wizardPageFieldToCaseFieldMapper: WizardPageFieldToCaseFieldMapper, workAllocationService: WorkAllocationService, loadingService: LoadingService, sessionStorageService: SessionStorageService);
    getCaseView(jurisdictionId: string, caseTypeId: string, caseId: string): Observable<CaseView>;
    getCaseViewV2(caseId: string): Observable<CaseView>;
    /**
     * handleNestedDynamicLists()
     * Reassigns list_item and value data to DynamicList children
     * down the tree. Server response returns data only in
     * the `value` object of parent complex type
     *
     * EUI-2530 Dynamic Lists for Elements in a Complex Type
     *
     * @param jsonBody - { case_fields: [ CaseField, CaseField ] }
     */
    private handleNestedDynamicLists;
    private setDynamicListDefinition;
    private getDynamicListValue;
    getEventTrigger(caseTypeId: string, eventTriggerId: string, caseId?: string, ignoreWarning?: string): Observable<CaseEventTrigger>;
    createEvent(caseDetails: CaseView, eventData: CaseEventData): Observable<object>;
    validateCase(ctid: string, eventData: CaseEventData, pageId: string): Observable<object>;
    createCase(ctid: string, eventData: CaseEventData): Observable<object>;
    getPrintDocuments(caseId: string): Observable<CasePrintDocument[]>;
    private buildEventTriggerUrl;
    private processResponseBody;
    private initialiseEventTrigger;
    private processTasksOnSuccess;
    private isPuiCaseManager;
}
