import { Injectable } from '@angular/core';
import { AbstractAppConfig, CaseEditorConfig } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { WAFeatureConfig } from '../../../work-allocation/models/common/service-config.model';
import { EnvironmentService } from '../../shared/services/environment.service';
import { AppConfigService } from '../config/configuration.services';

/**
 * see more:
 * https://tools.hmcts.net/confluence/pages/viewpage.action?pageId=797343913#Integrationsteps-Caseview(`ccd-case-view`)
 * is explained why this is needed
 */

@Injectable()
export class AppConfig extends AbstractAppConfig {
  public workallocationUrl: string;
  protected config: CaseEditorConfig;

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly featureToggleService: FeatureToggleService,
    private readonly environmentService: EnvironmentService
  ) {
    super();
    this.config = this.appConfigService.getEditorConfiguration() || {};

    this.featureToggleService.getValue('mc-document-secure-mode-enabled', false).subscribe({
      next: (val) => this.config = {
        ...this.config,
        document_management_secure_enabled: val
      }
    });

    this.featureToggleService.getValue('access-management-mode', false).subscribe({
      next: (val) => this.config = {
        ...this.config,
        access_management_mode: val
      }
    });

    this.environmentService.config$.subscribe((config) => {
      this.featureToggleService.getValue('wa-service-config', config.waSupportedServices).subscribe({
        next: (val) => this.config = {
          ...this.config,
          wa_service_config: val
        }
      });
    });

    this.featureToggleService.getValue('access-management-basic-view-mock', {}).subscribe({
      next: (val) => this.config = {
        ...this.config,
        access_management_basic_view_mock: val
      }
    });
  }

  public load(): Promise<void> {
    return Promise.resolve();
  }

  public getLoginUrl(): string {
    return this.config.login_url;
  }

  public getApiUrl(): string {
    return this.config.api_url;
  }

  public getCaseDataUrl(): string {
    return this.config.case_data_url;
  }

  public getDocumentManagementUrl(): string {
    return this.config.document_management_url;
  }

  public getDocumentManagementUrlV2(): string {
    return this.config.document_management_url_v2;
  }

  public getDocumentSecureMode(): boolean {
    return this.config.document_management_secure_enabled;
  }

  public getRemoteDocumentManagementUrl(): string {
    return this.config.remote_document_management_url;
  }

  public getPostcodeLookupUrl(): string {
    return this.config.postcode_lookup_url;
  }

  public getOAuth2ClientId(): string {
    return this.config.oauth2_client_id;
  }

  public getPaymentsUrl(): string {
    return this.config.payments_url;
  }

  public getHrsUrl(): string {
    return this.config.hrs_url;
  }

  public getRemoteHrsUrl(): string {
    return this.config.remote_hrs_url;
  }

  public getCaseHistoryUrl(caseId: string, eventId: string): string {
    return `${this.getCaseDataUrl()}/internal/cases/${caseId}/events/${eventId}`;
  }

  public getCreateOrUpdateDraftsUrl(ctid: string): string {
    return `${this.getCaseDataUrl()}/internal/case-types/${ctid}/drafts/`;
  }

  public getViewOrDeleteDraftsUrl(did: string): string {
    return `${this.getCaseDataUrl()}/drafts/${did}`;
  }

  public getActivityUrl(): string {
    return `${this.environmentService.get('ccdGatewayUrl')}/activity`;
  }

  public getActivityNexPollRequestMs(): number {
    return this.config.activity_next_poll_request_ms;
  }

  public getActivityRetry(): number {
    return this.config.activity_retry;
  }

  public getActivityBatchCollectionDelayMs(): number {
    return this.config.activity_batch_collection_delay_ms;
  }

  public getActivityMaxRequestPerBatch(): number {
    return this.config.activity_max_request_per_batch;
  }

  public getPrintServiceUrl(): string {
    return this.config.print_service_url;
  }

  public getRemotePrintServiceUrl(): string {
    return this.config.remote_print_service_url;
  }

  public getPaginationPageSize(): number {
    return this.config.pagination_page_size;
  }

  public getAnnotationApiUrl(): string {
    return this.config.annotation_api_url;
  }

  public getPayBulkScanBaseUrl(): string {
    return this.config.pay_bulk_scan_url;
  }

  public getBannersUrl(): string {
    return `${this.getCaseDataUrl()}/internal/banners/`;
  }

  public getPrdUrl(): string {
    return 'api/caseshare/orgs';
  }

  public getCacheTimeOut(): number {
    return 45000;
  }

  public getWorkAllocationApiUrl(): string {
    return 'workallocation';
  }

  public getRefundsUrl(): string {
    return this.config.refunds_url;
  }

  public getNotificationUrl(): string {
    return this.config.notification_url;
  }

  public getCaseFlagsRefdataApiUrl(): string {
    return this.config.case_flags_refdata_api_url;
  }

  public getAccessManagementMode(): boolean {
    return this.config.access_management_mode && this.environmentService.get('accessManagementEnabled');
  }

  public getWAServiceConfig(): WAFeatureConfig {
    return this.config.wa_service_config;
  }

  public getAccessManagementBasicViewMock(): unknown {
    return this.config.access_management_basic_view_mock;
  }

  public getLocationRefApiUrl(): string {
    return this.config.location_ref_api_url;
  }

  public getCamRoleAssignmentsApiUrl(): string {
    return this.config.cam_role_assignments_api_url;
  }

  public getPaymentReturnUrl(): string {
    return this.environmentService.get('paymentReturnUrl');
  }

  public getCategoriesAndDocumentsUrl(): string {
    return this.config.categories_and_documents_url;
  }

  public getDocumentDataUrl(): string {
    return this.config.document_data_url;
  }

  public getRDCommonDataApiUrl(): string {
    return this.config.rd_common_data_api_url;
  }

  public getCaseDataStoreApiUrl(): string {
    return this.config.case_data_store_api_url;
  }
}
