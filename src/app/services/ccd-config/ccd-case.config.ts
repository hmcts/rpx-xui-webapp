import { Injectable } from '@angular/core';
import { AbstractAppConfig, CaseEditorConfig, CaseTab } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { WorkAllocationTaskService } from '../../../work-allocation/services';
import { AppUtils } from '../../app-utils';
import { AppConstants } from '../../app.constants';
import { UserDetails } from '../../models/user-details.model';
import { EnvironmentService } from '../../shared/services/environment.service';
import * as fromRoot from '../../store';
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
  private workAllocationRoles: string[] = ['caseworker-ia', 'caseworker-ia-iacjudge'];
  private tabs: CaseTab[] =  [
    {
      id: 'tasks',
      label: 'Tasks',
      fields: [],
      show_condition: null
    },
    {
      id: 'roles and access',
      label: 'Roles and access',
      fields: [],
      show_condition: null
    }
  ];

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly store: Store<fromRoot.State>,
    private readonly featureToggleService: FeatureToggleService,
    private readonly environmentService: EnvironmentService
  ) {
    super();
    this.config = this.appConfigService.getEditorConfiguration() || {};
    this.featureToggleWorkAllocation();
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

  public getCaseHistoryUrl(caseId: string, eventId: string) {
    return (
      this.getCaseDataUrl() +
      `/internal` +
      `/cases/${caseId}` +
      `/events/${eventId}`
    );
  }

  public getCreateOrUpdateDraftsUrl(ctid: string) {
    return this.getCaseDataUrl() + `/internal/case-types/${ctid}/drafts/`;
  }

  public getViewOrDeleteDraftsUrl(did: string) {
    return this.getCaseDataUrl() + `/drafts/${did}`;
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
    return 45000;
  }

  public getWorkAllocationApiUrl(): string {
    return this.workallocationUrl;
  }

  public getHrsUrl(): string {
    return '';
  }

  public getRemoteHrsUrl(): string {
    return '';
  }

  public prependedCaseViewTabs(): Observable<CaseTab[]> {
    return combineLatest([
      this.featureToggleService.getValue(AppConstants.FEATURE_NAMES.currentWAFeature, 'WorkAllocationRelease1'),
      this.store.pipe(select(fromRoot.getUserDetails))
    ]).pipe(
      map(([feature, userDetails]: [string, UserDetails]) => this.enablePrependedTabs(feature, userDetails) ? this.tabs : [])
    );
  }

  private featureToggleWorkAllocation(): void {
    this.featureToggleService
      .isEnabled(AppConstants.FEATURE_NAMES.workAllocation)
      .subscribe(
        (isFeatureEnabled) =>
          this.workallocationUrl = AppUtils.getFeatureToggledUrl(
            isFeatureEnabled,
            WorkAllocationTaskService.WorkAllocationUrl
          )
      );
  }

  private enablePrependedTabs(feature: string, userDetails: UserDetails): boolean {
    return feature === 'WorkAllocationRelease2'
      && userDetails.userInfo.roles.some((role: string) => this.workAllocationRoles.indexOf(role) >= 0);
  }
}
