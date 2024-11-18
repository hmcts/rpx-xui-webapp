import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { AbstractAppConfig, CaseEditorConfig } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { AppConstants } from '../../../app/app.constants';
import { WAFeatureConfig } from '../../../work-allocation/models/common/service-config.model';
import { EnvironmentService } from '../../shared/services/environment.service';
import { AppConfigService } from '../config/configuration.services';
import { InitialisationSyncService } from './initialisation-sync-service';
import { LaunchDarklyDefaultsConstants } from './launch-darkly-defaults.constants';
import { DeploymentEnvironmentEnum } from '../../enums/deployment-environment-enum';
import { LoggerService } from '../logger/logger.service';

type ConfigValue = string | boolean | Array<string> | object;
/**
 * https://tools.hmcts.net/confluence/pages/viewpage.action?pageId=797343913#Integrationsteps-Caseview(`ccd-case-view`)
 * explains why this is needed
 */
@Injectable()
export class AppConfig extends AbstractAppConfig {
  public initialisationComplete = false;
  protected config: CaseEditorConfig;
  private deploymentEnv = DeploymentEnvironmentEnum.PROD;
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly featureToggleService: FeatureToggleService,
    private readonly environmentService: EnvironmentService,
    private readonly initialisationSyncService: InitialisationSyncService,
    private readonly window: Window,
    private readonly loggerService: LoggerService
  ) {
    super();
    this.deploymentEnv = environmentService.getDeploymentEnv();
    this.config = this.appConfigService.getEditorConfiguration() || {};
    this.initialisationSyncService.waitForInitialisation((init) => {
      if (init) {
        const defWACfg: WAFeatureConfig = LaunchDarklyDefaultsConstants.getWaServiceConfig(this.deploymentEnv);
        const obArray: Array<Observable<ConfigValue>> = [];
        this.setUpLaunchDarklyForFeature(AppConstants.FEATURE_NAMES.secureDocumentStoreEnabled, false, obArray);
        this.setUpLaunchDarklyForFeature(AppConstants.FEATURE_NAMES.accessManagementMode, true, obArray);
        this.setUpLaunchDarklyForFeature(AppConstants.FEATURE_NAMES.waServiceConfig, defWACfg, obArray);
        this.setUpLaunchDarklyForFeature(AppConstants.FEATURE_NAMES.icpEnabled, false, obArray);
        this.setUpLaunchDarklyForFeature(AppConstants.FEATURE_NAMES.icpJurisdictions, ['foo'], obArray);
        this.setUpLaunchDarklyForFeature(AppConstants.FEATURE_NAMES.enableRestrictedCaseAccess, true, obArray);
        this.setUpLaunchDarklyForFeature(AppConstants.FEATURE_NAMES.enableCaseFileViewVersion1_1, true, obArray);
        if (obArray.length === 7) {
          combineLatest(obArray).subscribe((items) => {
            this.initialisationComplete = true;
            console.log('LD initialisation complete with ' + items?.length + ' items');
          });
        }
      }
    });
  }

  private setUpLaunchDarklyForFeature<V extends ConfigValue>(featureName: string, defaultVal: V,
    obArray: Array<Observable<V>>) : void {
    const ob = this.featureToggleService.getValue(featureName, defaultVal);
    const cbFn = (val) => {
      this.config = this.addAttribute(this.config,
        AppConstants.FEATURE_TO_ATTRIBUTE_MAP.get(featureName), val);
    };
    ob.subscribe(cbFn);
    obArray.push(ob);
  }

  // Add a named attribute to an object in a properly typed way
  public addAttribute<T extends object, K extends string, V>(obj: T, key: K, value: V):T & { [P in K]: V } {
    return {
      ...obj,
      [key]: value
    } as T & { [P in K]: V };
  }

  public load(): Promise<void> {
    return Promise.resolve();
  }

  public getLoginUrl(): string {
    return this.config.login_url;
  }

  public getApiUrl() {
    return this.config.api_url;
  }

  public getCaseDataUrl() {
    return this.config.case_data_url;
  }

  public getDocumentManagementUrl() {
    return this.config.document_management_url;
  }

  public getDocumentManagementUrlV2() {
    return this.config.document_management_url_v2;
  }

  public getDocumentSecureMode() {
    return this.config.document_management_secure_enabled;
  }

  public getRemoteDocumentManagementUrl() {
    return this.config.remote_document_management_url;
  }

  public getPostcodeLookupUrl() {
    return this.config.postcode_lookup_url;
  }

  public getOAuth2ClientId() {
    return this.config.oauth2_client_id;
  }

  public getPaymentsUrl() {
    return this.config.payments_url;
  }

  public getHrsUrl() {
    return this.config.hrs_url;
  }

  public getRemoteHrsUrl() {
    return this.config.remote_hrs_url;
  }

  public getCaseHistoryUrl(caseId: string, eventId: string) {
    return `${this.getCaseDataUrl()}/internal/cases/${caseId}/events/${eventId}`;
  }

  public getCreateOrUpdateDraftsUrl(ctid: string) {
    return `${this.getCaseDataUrl()}/internal/case-types/${ctid}/drafts/`;
  }

  public getViewOrDeleteDraftsUrl(did: string) {
    return `${this.getCaseDataUrl()}/drafts/${did}`;
  }

  public getActivityUrl() {
    return `${this.environmentService.get('ccdGatewayUrl')}/activity`;
  }

  public getActivityNexPollRequestMs() {
    return this.config.activity_next_poll_request_ms;
  }

  public getActivityRetry() {
    return this.config.activity_retry;
  }

  public getTimeoutsForCaseRetrieval() {
    return this.config.timeouts_case_retrieval;
  }

  public getTimeoutsCaseRetrievalArtificialDelay() {
    return this.config.timeouts_case_retrieval_artificial_delay;
  }

  public getActivityBatchCollectionDelayMs() {
    return this.config.activity_batch_collection_delay_ms;
  }

  public getActivityMaxRequestPerBatch() {
    return this.config.activity_max_request_per_batch;
  }

  public getPrintServiceUrl() {
    return this.config.print_service_url;
  }

  public getRemotePrintServiceUrl() {
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
    return 300000;
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
    if (this.initialisationComplete) {
      return this.config.wa_service_config;
    }
    return LaunchDarklyDefaultsConstants.getWaServiceConfig(this.deploymentEnv);
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

  public getEnableRestrictedCaseAccessConfig(): boolean {
    return this.config.enable_restricted_case_access;
  }

  public getEnableCaseFileViewVersion1_1(): boolean {
    return this.config.enable_case_file_view_version_1_1;
  }

  public getIcpEnable(): boolean {
    return this.config.icp_enabled;
  }

  public getIcpJurisdictions(): string[] {
    return this.config.icp_jurisdictions;
  }

  public logMessage(logMessage: string): void {
    this.loggerService.log(logMessage);
  }
}
