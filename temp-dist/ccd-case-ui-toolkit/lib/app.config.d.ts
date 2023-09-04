export interface AccessManagementBasicViewMockModel {
    active?: boolean;
    basicFields?: {
        caseNameHmctsInternal?: string;
        caseManagementLocation?: {
            baseLocation?: number;
        };
    };
    accessProcess?: string;
}
export interface AccessManagementRequestReviewMockModel {
    active?: boolean;
    details?: {
        caseName: string;
        caseReference: string;
        dateSubmitted: string;
        requestFrom: string;
        reasonForCaseAccess: string;
    };
    accessProcess?: string;
}
export declare abstract class AbstractAppConfig {
    abstract load(): Promise<void>;
    abstract getLoginUrl(): string;
    abstract getApiUrl(): string;
    abstract getCaseDataUrl(): string;
    abstract getDocumentManagementUrl(): string;
    abstract getDocumentManagementUrlV2(): string;
    abstract getDocumentSecureMode(): boolean;
    abstract getRemoteDocumentManagementUrl(): string;
    abstract getHrsUrl(): string;
    abstract getRemoteHrsUrl(): string;
    abstract getAnnotationApiUrl(): string;
    abstract getPostcodeLookupUrl(): string;
    abstract getOAuth2ClientId(): string;
    abstract getPaymentsUrl(): string;
    abstract getPayBulkScanBaseUrl(): string;
    abstract getCreateOrUpdateDraftsUrl(ctid: string): string;
    abstract getViewOrDeleteDraftsUrl(did: string): string;
    abstract getActivityUrl(): string;
    abstract getActivityNexPollRequestMs(): number;
    abstract getActivityRetry(): number;
    abstract getTimeoutsForCaseRetrieval(): number[];
    abstract getTimeoutsCaseRetrievalArtificialDelay(): number;
    abstract getActivityBatchCollectionDelayMs(): number;
    abstract getActivityMaxRequestPerBatch(): number;
    abstract getCaseHistoryUrl(caseId: string, eventId: string): string;
    abstract getPrintServiceUrl(): string;
    /**
     * Dummy version replacing deprecated `getRemotePrintServiceUrl()`, to be removed in next major release
     * @deprecated
     * @returns `undefined`
     */
    getRemotePrintServiceUrl(): string;
    abstract getPaginationPageSize(): number;
    abstract getBannersUrl(): string;
    abstract getPrdUrl(): string;
    abstract getCacheTimeOut(): number;
    abstract getWorkAllocationApiUrl(): string;
    getUserInfoApiUrl(): string;
    getWAServiceConfig(): any;
    getAccessManagementMode(): boolean;
    getAccessManagementBasicViewMock(): AccessManagementBasicViewMockModel;
    getAccessManagementRequestReviewMockModel(): AccessManagementRequestReviewMockModel;
    getLocationRefApiUrl(): string;
    getEnvironment(): "aat" | "preview" | "demo" | "ithc" | "prod";
    abstract getRefundsUrl(): string;
    abstract getNotificationUrl(): string;
    abstract getPaymentReturnUrl(): string;
    abstract getCategoriesAndDocumentsUrl(): string;
    abstract getDocumentDataUrl(): string;
    getCamRoleAssignmentsApiUrl(): string;
    abstract getCaseFlagsRefdataApiUrl(): string;
    abstract getRDCommonDataApiUrl(): string;
    abstract getCaseDataStoreApiUrl(): string;
}
export declare class CaseEditorConfig {
    api_url: string;
    case_data_url: string;
    document_management_url: string;
    document_management_url_v2: string;
    hrs_url: string;
    document_management_secure_enabled: boolean;
    login_url: string;
    oauth2_client_id: string;
    postcode_lookup_url: string;
    remote_document_management_url: string;
    remote_hrs_url: string;
    annotation_api_url: string;
    payments_url: string;
    pay_bulk_scan_url: string;
    activity_batch_collection_delay_ms: number;
    activity_next_poll_request_ms: number;
    activity_retry: number;
    timeouts_case_retrieval: number[];
    timeouts_case_retrieval_artificial_delay: number;
    activity_url: string;
    activity_max_request_per_batch: number;
    print_service_url: string;
    /**
     * remote_print_service_url marked as optional since deprecation, ahead of removal in next major release
     * @deprecated
     */
    remote_print_service_url?: string;
    pagination_page_size: number;
    prd_url: string;
    cache_time_out: number;
    work_allocation_api_url: string;
    user_info_api_url: string;
    wa_service_config?: any;
    access_management_mode?: boolean;
    access_management_basic_view_mock?: {
        active?: boolean;
        basicFields?: {
            caseNameHmctsInternal?: string;
            caseManagementLocation?: {
                baseLocation?: number;
            };
        };
        accessProcess?: string;
    };
    access_management_request_review_mock?: {
        active?: boolean;
        details?: {
            caseName: string;
            caseReference: string;
            dateSubmitted: string;
            requestFrom: string;
            reasonForCaseAccess: string;
        };
        accessProcess?: string;
    };
    location_ref_api_url?: string;
    cam_role_assignments_api_url?: string;
    refunds_url: string;
    notification_url: string;
    payment_return_url: string;
    categories_and_documents_url: string;
    document_data_url: string;
    case_flags_refdata_api_url: string;
    rd_common_data_api_url: string;
    case_data_store_api_url: string;
}
//# sourceMappingURL=app.config.d.ts.map