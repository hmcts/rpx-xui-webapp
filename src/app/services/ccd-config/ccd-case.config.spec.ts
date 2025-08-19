import { provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { EnvironmentService } from '../../../app/shared/services/environment.service';
import { AppConfigService } from '../config/configuration.services';
import { AppConfig } from './ccd-case.config';
import { InitialisationSyncService } from './initialisation-sync-service';
import { DeploymentEnvironmentEnum } from '../../enums/deployment-environment-enum';
import { LoggerService } from '../logger/logger.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppConstants } from '../../../app/app.constants';

class MockConfigService {
  private readonly config;
  private readonly caseEditorConfig = {};
  constructor() {
    this.config = {
      login_url: 'test-login',
      api_url: 'test-api',
      case_data_url: 'test-case-data',
      document_management_url: 'test-dm',
      document_management_url_v2: 'test-dm-v2',
      document_management_secure_enabled: true,
      remote_document_management_url: 'test-remote-dm',
      postcode_lookup_url: 'test-postcode',
      oauth2_client_id: 'ccd_gateway',
      payments_url: 'test-payments',
      hrs_url: 'test-hrs',
      remote_hrs_url: 'test-remote-hrs',
      activity_next_poll_request_ms: 5000,
      activity_retry: 3,
      timeouts_case_retrieval: [10000, 20000, 30000],
      timeouts_case_retrieval_artificial_delay: 2000,
      activity_batch_collection_delay_ms: 1000,
      activity_max_request_per_batch: 5,
      print_service_url: 'test-print',
      remote_print_service_url: 'test-remote-print',
      pagination_page_size: 25,
      annotation_api_url: 'test-annotation',
      pay_bulk_scan_url: 'test-pay-bulk-scan',
      refunds_url: 'test-refunds',
      notification_url: 'test-notification',
      case_flags_refdata_api_url: 'test-case-flags',
      access_management_mode: true,
      location_ref_api_url: 'test-location',
      cam_role_assignments_api_url: 'test-cam',
      categories_and_documents_url: 'test-categories',
      document_data_url: 'test-doc-data',
      rd_common_data_api_url: 'test-rd-common',
      case_data_store_api_url: 'test-case-store',
      documentSecureModeCaseTypeExclusions: ['DIVORCE', 'PROBATE'],
      mc_cdam_exclusion_list: ['DIVORCE', 'PROBATE'],
      enable_case_file_view_version_1_1: true,
      icp_enabled: false,
      icp_jurisdictions: ['foo'],
      wa_service_config: { test: 'config' },
      events_to_hide: [
        'queryManagementRespondQuery'
      ]
    };
  }

  public getEditorConfiguration = () => this.config;
}

const mockFeatureToggleService = jasmine.createSpyObj('mockFeatureToggleService', ['isEnabled', 'getValue']);

const mockEnvironmentService = jasmine.createSpyObj('EnvironmentService', ['get', 'getDeploymentEnv']);
mockEnvironmentService.getDeploymentEnv.and.returnValue(DeploymentEnvironmentEnum.PROD);
mockEnvironmentService.get.and.returnValue('someUrl');

const mockWindow = jasmine.createSpyObj('Window', ['location']);
mockWindow.location.and.returnValue(new URL('https://manage-case.platform.hmcts.net'));
const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);

describe('AppConfiguration', () => {
  mockFeatureToggleService.isEnabled.and.returnValue(of(false));
  mockFeatureToggleService.getValue.and.callFake((featureMame: string, defVal: any) => {
    return of(defVal);
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: Window, useValue: mockWindow },
        AppConfig,
        InitialisationSyncService,
        { provide: AppConfigService, useClass: MockConfigService },
        { provide: FeatureToggleService, useValue: mockFeatureToggleService },
        { provide: EnvironmentService, useValue: mockEnvironmentService },
        { provide: LoggerService, useValue: mockLoggerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    const iss = TestBed.inject(InitialisationSyncService);
    iss.initialisationComplete(true);
  });

  it('should be created ', inject([AppConfig, Window], (service: AppConfig) => {
    expect(service).toBeTruthy();
    expect(mockEnvironmentService.getDeploymentEnv).toHaveBeenCalled();
  }));

  it('should have load', inject([AppConfig], (service: AppConfig) => {
    expect(service.load()).toBeDefined();
  }));

  it('should have getLoginUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getLoginUrl()).toBe('test-login');
  }));

  it('should have getApiUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getApiUrl()).toBe('test-api');
  }));

  it('should have getDocumentManagementUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getDocumentManagementUrl()).toBe('test-dm');
  }));

  it('should have getRemoteDocumentManagementUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getRemoteDocumentManagementUrl()).toBe('test-remote-dm');
  }));

  it('should have getHrsUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getHrsUrl()).toBe('test-hrs');
  }));

  it('should have getRemoteHrsUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getRemoteHrsUrl()).toBe('test-remote-hrs');
  }));

  it('should have getHrsUrl return value', inject([AppConfig], (service: AppConfig) => {
    expect(service.getHrsUrl()).toBe('test-hrs');
  }));

  it('should have getRemoteHrsUrl return value', inject([AppConfig], (service: AppConfig) => {
    expect(service.getRemoteHrsUrl()).toBe('test-remote-hrs');
  }));

  it('should have getPostcodeLookupUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getPostcodeLookupUrl()).toBe('test-postcode');
  }));

  it('should have getOAuth2ClientId', inject([AppConfig], (service: AppConfig) => {
    expect(service.getOAuth2ClientId()).toBe('ccd_gateway');
  }));

  it('should have getPaymentsUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getPaymentsUrl()).toBe('test-payments');
  }));

  it('should have getCreateOrUpdateDraftsUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getCreateOrUpdateDraftsUrl).toBeDefined();
  }));

  it('should have getCaseHistoryUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getCaseHistoryUrl).toBeDefined();
  }));

  it('should have getActivityUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getActivityUrl).toBeDefined();
  }));

  it('should have getRemotePrintServiceUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getRemotePrintServiceUrl()).toBe('test-remote-print');
  }));

  it('should have getCreateOrUpdateDraftsUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getCreateOrUpdateDraftsUrl('')).toBe('test-case-data/internal/case-types//drafts');
  }));

  it('should have getAnnotationApiUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getAnnotationApiUrl()).toBe('test-annotation');
  }));

  it('should have getDocumentManagementUrlV2', inject([AppConfig], (service: AppConfig) => {
    expect(service.getDocumentManagementUrlV2).toBeDefined();
  }));

  it('should have getDocumentSecureMode', inject([AppConfig], (service: AppConfig) => {
    expect(service.getDocumentSecureMode).toBeDefined();
  }));

  it('should have getDocumentManagementUrlV2 return value', inject([AppConfig], (service: AppConfig) => {
    expect(service.getDocumentManagementUrlV2()).toBe('test-dm-v2');
  }));

  it('should have getDocumentSecureMode return value', inject([AppConfig], (service: AppConfig) => {
    expect(service.getDocumentSecureMode()).toBe(false);
  }));

  it('should have getAccessManagementMode return value', inject([AppConfig], (service: AppConfig) => {
    mockEnvironmentService.get.and.returnValue(true);
    expect(service.getAccessManagementMode()).toBe(true);
  }));

  it('should have getLocationRefApiUrl return value', inject([AppConfig], (service: AppConfig) => {
    expect(service.getLocationRefApiUrl()).toBe('test-location');
  }));

  it('should have getCamRoleAssignmentsApiUrl return value', inject([AppConfig], (service: AppConfig) => {
    expect(service.getCamRoleAssignmentsApiUrl()).toBe('test-cam');
  }));

  it('should have getEventsToHide return value', inject([AppConfig], (service: AppConfig) => {
    expect(service.getEventsToHide()).toEqual(['queryManagementRespondQuery']);
  }));

  it('should have called LogService log method', inject([AppConfig, Window], (service: AppConfig) => {
    service.logMessage('hello world');
    expect(mockLoggerService.log).toHaveBeenCalledWith('hello world');
  }));

  it('should add attributes to an object retaining original attributes', inject([AppConfig], (service: AppConfig) => {
    const testObj = { foo: 'bar', thud: 1 };
    const expectedObj = {
      ...testObj,
      'wibble': 'wassock'
    };
    const result = service.addAttribute(testObj, 'wibble', 'wassock');
    expect(result).toEqual(expectedObj);
    expect(typeof result).toEqual(typeof(expectedObj));
  }));

  it('should be initialised after all LD observables complete', fakeAsync(inject([AppConfig], (service: AppConfig) => {
    tick(5000);
    expect(service.initialisationComplete).toBeTruthy();
  })));

  describe('getCaseDataUrl', () => {
    it('should return case data url', inject([AppConfig], (service: AppConfig) => {
      expect(service.getCaseDataUrl()).toBe('test-case-data');
    }));
  });

  describe('getViewOrDeleteDraftsUrl', () => {
    it('should return formatted drafts url with draft id', inject([AppConfig], (service: AppConfig) => {
      const draftId = 'draft-123';
      expect(service.getViewOrDeleteDraftsUrl(draftId)).toBe('test-case-data/drafts/draft-123');
    }));

    it('should handle empty draft id', inject([AppConfig], (service: AppConfig) => {
      expect(service.getViewOrDeleteDraftsUrl('')).toBe('test-case-data/drafts/');
    }));
  });

  describe('getActivityNexPollRequestMs', () => {
    it('should return activity next poll request ms value', inject([AppConfig], (service: AppConfig) => {
      expect(service.getActivityNexPollRequestMs()).toBe(5000);
    }));
  });

  describe('getActivityRetry', () => {
    it('should return activity retry value', inject([AppConfig], (service: AppConfig) => {
      expect(service.getActivityRetry()).toBe(3);
    }));
  });

  describe('getTimeoutsForCaseRetrieval', () => {
    it('should return timeouts for case retrieval', inject([AppConfig], (service: AppConfig) => {
      expect(service.getTimeoutsForCaseRetrieval()).toEqual([10000, 20000, 30000]);
    }));
  });

  describe('getTimeoutsCaseRetrievalArtificialDelay', () => {
    it('should return artificial delay for case retrieval', inject([AppConfig], (service: AppConfig) => {
      expect(service.getTimeoutsCaseRetrievalArtificialDelay()).toBe(2000);
    }));
  });

  describe('getActivityBatchCollectionDelayMs', () => {
    it('should return activity batch collection delay', inject([AppConfig], (service: AppConfig) => {
      expect(service.getActivityBatchCollectionDelayMs()).toBe(1000);
    }));
  });

  describe('getActivityMaxRequestPerBatch', () => {
    it('should return max requests per batch', inject([AppConfig], (service: AppConfig) => {
      expect(service.getActivityMaxRequestPerBatch()).toBe(5);
    }));
  });

  describe('getPrintServiceUrl', () => {
    it('should return print service url', inject([AppConfig], (service: AppConfig) => {
      expect(service.getPrintServiceUrl()).toBe('test-print');
    }));
  });

  describe('getPaginationPageSize', () => {
    it('should return pagination page size', inject([AppConfig], (service: AppConfig) => {
      expect(service.getPaginationPageSize()).toBe(25);
    }));
  });

  describe('getPayBulkScanBaseUrl', () => {
    it('should return pay bulk scan base url', inject([AppConfig], (service: AppConfig) => {
      expect(service.getPayBulkScanBaseUrl()).toBe('test-pay-bulk-scan');
    }));
  });

  describe('getBannersUrl', () => {
    it('should return formatted banners url', inject([AppConfig], (service: AppConfig) => {
      expect(service.getBannersUrl()).toBe('test-case-data/internal/banners');
    }));
  });

  describe('getPrdUrl', () => {
    it('should return PRD url', inject([AppConfig], (service: AppConfig) => {
      expect(service.getPrdUrl()).toBe('api/caseshare/orgs');
    }));
  });

  describe('getCacheTimeOut', () => {
    it('should return cache timeout value', inject([AppConfig], (service: AppConfig) => {
      expect(service.getCacheTimeOut()).toBe(300000);
    }));
  });

  describe('getWorkAllocationApiUrl', () => {
    it('should return work allocation API url', inject([AppConfig], (service: AppConfig) => {
      expect(service.getWorkAllocationApiUrl()).toBe('workallocation');
    }));
  });

  describe('getRefundsUrl', () => {
    it('should return refunds url', inject([AppConfig], (service: AppConfig) => {
      expect(service.getRefundsUrl()).toBe('test-refunds');
    }));
  });

  describe('getNotificationUrl', () => {
    it('should return notification url', inject([AppConfig], (service: AppConfig) => {
      expect(service.getNotificationUrl()).toBe('test-notification');
    }));
  });

  describe('getCaseFlagsRefdataApiUrl', () => {
    it('should return case flags refdata API url', inject([AppConfig], (service: AppConfig) => {
      expect(service.getCaseFlagsRefdataApiUrl()).toBe('test-case-flags');
    }));
  });

  describe('getPaymentReturnUrl', () => {
    it('should return payment return url from environment service', inject([AppConfig], (service: AppConfig) => {
      mockEnvironmentService.get.and.returnValue('https://payment-return.com');
      expect(service.getPaymentReturnUrl()).toBe('https://payment-return.com');
      expect(mockEnvironmentService.get).toHaveBeenCalledWith('paymentReturnUrl');
    }));
  });

  describe('getCategoriesAndDocumentsUrl', () => {
    it('should return categories and documents url', inject([AppConfig], (service: AppConfig) => {
      expect(service.getCategoriesAndDocumentsUrl()).toBe('test-categories');
    }));
  });

  describe('getDocumentDataUrl', () => {
    it('should return document data url', inject([AppConfig], (service: AppConfig) => {
      expect(service.getDocumentDataUrl()).toBe('test-doc-data');
    }));
  });

  describe('getRDCommonDataApiUrl', () => {
    it('should return RD common data API url', inject([AppConfig], (service: AppConfig) => {
      expect(service.getRDCommonDataApiUrl()).toBe('test-rd-common');
    }));
  });

  describe('getCaseDataStoreApiUrl', () => {
    it('should return case data store API url', inject([AppConfig], (service: AppConfig) => {
      expect(service.getCaseDataStoreApiUrl()).toBe('test-case-store');
    }));
  });

  describe('getEnableCaseFileViewVersion1_1', () => {
    it('should return enable case file view version 1.1 flag', inject([AppConfig], (service: AppConfig) => {
      expect(service.getEnableCaseFileViewVersion1_1()).toBeTruthy();
    }));
  });

  describe('getIcpEnable', () => {
    it('should return ICP enabled flag', inject([AppConfig], (service: AppConfig) => {
      expect(service.getIcpEnable()).toBeFalsy();
    }));
  });

  describe('getIcpJurisdictions', () => {
    it('should return ICP jurisdictions array', inject([AppConfig], (service: AppConfig) => {
      expect(service.getIcpJurisdictions()).toEqual(['foo']);
    }));
  });

  describe('getDocumentSecureModeCaseTypeExclusions', () => {
    it('should return document secure mode case type exclusions', inject([AppConfig], (service: AppConfig) => {
      expect(service.getDocumentSecureModeCaseTypeExclusions()).toEqual(['DIVORCE', 'PROBATE']);
    }));
  });

  describe('getCdamExclusionList', () => {
    it('should return CDAM exclusion list', inject([AppConfig], (service: AppConfig) => {
      expect(service.getCdamExclusionList()).toEqual(['DIVORCE', 'PROBATE']);
    }));
  });

  describe('getCaseHistoryUrl', () => {
    it('should return formatted case history url with case and event ids', inject([AppConfig], (service: AppConfig) => {
      const caseId = 'case-123';
      const eventId = 'event-456';
      expect(service.getCaseHistoryUrl(caseId, eventId)).toBe('test-case-data/internal/cases/case-123/events/event-456');
    }));

    it('should handle empty case and event ids', inject([AppConfig], (service: AppConfig) => {
      expect(service.getCaseHistoryUrl('', '')).toBe('test-case-data/internal/cases//events/');
    }));

    it('should handle special characters in ids', inject([AppConfig], (service: AppConfig) => {
      const caseId = 'case-123#special';
      const eventId = 'event-456&chars';
      expect(service.getCaseHistoryUrl(caseId, eventId)).toBe('test-case-data/internal/cases/case-123#special/events/event-456&chars');
    }));
  });

  describe('getActivityUrl', () => {
    it('should return formatted activity url from environment service', inject([AppConfig], (service: AppConfig) => {
      mockEnvironmentService.get.and.returnValue('https://gateway.com');
      expect(service.getActivityUrl()).toBe('https://gateway.com/activity');
      expect(mockEnvironmentService.get).toHaveBeenCalledWith('ccdGatewayUrl');
    }));
  });

  describe('getWAServiceConfig', () => {
    it('should return WA service config when initialization is complete', fakeAsync(inject([AppConfig], (service: AppConfig) => {
      tick(5000);
      expect(service.initialisationComplete).toBeTruthy();
      const config = service.getWAServiceConfig();
      expect(config).toBeDefined();
    })));

    it('should return default WA service config when initialization is not complete', inject([AppConfig], (service: AppConfig) => {
      service.initialisationComplete = false;
      const config = service.getWAServiceConfig();
      expect(config).toBeDefined();
    }));
  });

  describe('getAccessManagementMode', () => {
    it('should return true when both config and environment are enabled', inject([AppConfig], (service: AppConfig) => {
      mockEnvironmentService.get.and.returnValue(true);
      expect(service.getAccessManagementMode()).toBe(true);
    }));

    it('should return false when environment is disabled', inject([AppConfig], (service: AppConfig) => {
      mockEnvironmentService.get.and.returnValue(false);
      expect(service.getAccessManagementMode()).toBe(false);
    }));
  });
});

describe('AppConfiguration with different deployment environments', () => {
  let mockFeatureToggleServiceForEnv;
  let mockEnvironmentServiceForEnv;
  let mockInitialisationSyncService;
  let mockAppConfigService;
  let mockLoggerServiceForEnv;

  beforeEach(() => {
    mockFeatureToggleServiceForEnv = jasmine.createSpyObj('mockFeatureToggleService', ['isEnabled', 'getValue']);
    mockFeatureToggleServiceForEnv.isEnabled.and.returnValue(of(false));
    mockFeatureToggleServiceForEnv.getValue.and.callFake((featureName: string, defVal: any) => {
      return of(defVal);
    });

    mockEnvironmentServiceForEnv = jasmine.createSpyObj('EnvironmentService', ['get', 'getDeploymentEnv']);
    mockEnvironmentServiceForEnv.get.and.returnValue('someUrl');

    mockAppConfigService = jasmine.createSpyObj('AppConfigService', ['getEditorConfiguration']);
    mockAppConfigService.getEditorConfiguration.and.returnValue({
      documentSecureModeCaseTypeExclusions: ['TEST_CASE_TYPE'],
      login_url: 'test-login',
      api_url: 'test-api',
      case_data_url: 'test-case-data'
    });

    mockLoggerServiceForEnv = jasmine.createSpyObj('LoggerService', ['log']);
  });

  describe('with AAT deployment environment', () => {
    beforeEach(() => {
      mockEnvironmentServiceForEnv.getDeploymentEnv.and.returnValue(DeploymentEnvironmentEnum.AAT);
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          { provide: Window, useValue: mockWindow },
          AppConfig,
          InitialisationSyncService,
          { provide: AppConfigService, useValue: mockAppConfigService },
          { provide: FeatureToggleService, useValue: mockFeatureToggleServiceForEnv },
          { provide: EnvironmentService, useValue: mockEnvironmentServiceForEnv },
          { provide: LoggerService, useValue: mockLoggerServiceForEnv },
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting()
        ]
      });
      mockInitialisationSyncService = TestBed.inject(InitialisationSyncService);
      mockInitialisationSyncService.initialisationComplete(true);
    });

    it('should initialize with AAT environment configuration', inject([AppConfig], (service: AppConfig) => {
      expect(service).toBeTruthy();
      expect(mockEnvironmentServiceForEnv.getDeploymentEnv).toHaveBeenCalled();
      expect((service as any).deploymentEnv).toBe(DeploymentEnvironmentEnum.AAT);
    }));

    it('should return AAT specific WA service config', fakeAsync(inject([AppConfig], (service: AppConfig) => {
      tick(5000);
      const config = service.getWAServiceConfig();
      expect(config).toBeDefined();
    })));
  });

  describe('with DEMO deployment environment', () => {
    beforeEach(() => {
      mockEnvironmentServiceForEnv.getDeploymentEnv.and.returnValue(DeploymentEnvironmentEnum.DEMO);
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          { provide: Window, useValue: mockWindow },
          AppConfig,
          InitialisationSyncService,
          { provide: AppConfigService, useClass: MockConfigService },
          { provide: FeatureToggleService, useValue: mockFeatureToggleServiceForEnv },
          { provide: EnvironmentService, useValue: mockEnvironmentServiceForEnv },
          { provide: LoggerService, useValue: mockLoggerServiceForEnv },
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting()
        ]
      });
      mockInitialisationSyncService = TestBed.inject(InitialisationSyncService);
      mockInitialisationSyncService.initialisationComplete(true);
    });

    it('should initialize with DEMO environment configuration', inject([AppConfig], (service: AppConfig) => {
      expect(service).toBeTruthy();
      expect(mockEnvironmentServiceForEnv.getDeploymentEnv).toHaveBeenCalled();
      expect((service as any).deploymentEnv).toBe(DeploymentEnvironmentEnum.DEMO);
    }));
  });

  describe('with LOCAL deployment environment', () => {
    beforeEach(() => {
      mockEnvironmentServiceForEnv.getDeploymentEnv.and.returnValue(DeploymentEnvironmentEnum.LOCAL);
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          { provide: Window, useValue: mockWindow },
          AppConfig,
          InitialisationSyncService,
          { provide: AppConfigService, useClass: MockConfigService },
          { provide: FeatureToggleService, useValue: mockFeatureToggleServiceForEnv },
          { provide: EnvironmentService, useValue: mockEnvironmentServiceForEnv },
          { provide: LoggerService, useValue: mockLoggerServiceForEnv },
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting()
        ]
      });
      mockInitialisationSyncService = TestBed.inject(InitialisationSyncService);
      mockInitialisationSyncService.initialisationComplete(true);
    });

    it('should initialize with LOCAL environment configuration', inject([AppConfig], (service: AppConfig) => {
      expect(service).toBeTruthy();
      expect(mockEnvironmentServiceForEnv.getDeploymentEnv).toHaveBeenCalled();
      expect((service as any).deploymentEnv).toBe(DeploymentEnvironmentEnum.LOCAL);
    }));
  });
});

describe('AppConfiguration edge cases and error scenarios', () => {
  let mockFeatureToggleServiceError;
  let mockEnvironmentServiceError;
  let mockAppConfigServiceError;
  let mockLoggerServiceError;

  beforeEach(() => {
    mockFeatureToggleServiceError = jasmine.createSpyObj('mockFeatureToggleService', ['isEnabled', 'getValue']);
    mockEnvironmentServiceError = jasmine.createSpyObj('EnvironmentService', ['get', 'getDeploymentEnv']);
    mockAppConfigServiceError = jasmine.createSpyObj('AppConfigService', ['getEditorConfiguration']);
    mockLoggerServiceError = jasmine.createSpyObj('LoggerService', ['log']);
  });

  describe('with null/undefined configuration', () => {
    beforeEach(() => {
      mockFeatureToggleServiceError.isEnabled.and.returnValue(of(false));
      mockFeatureToggleServiceError.getValue.and.callFake((featureName: string, defVal: any) => {
        return of(defVal);
      });
      mockEnvironmentServiceError.getDeploymentEnv.and.returnValue(DeploymentEnvironmentEnum.PROD);
      mockEnvironmentServiceError.get.and.returnValue(null);
      mockAppConfigServiceError.getEditorConfiguration.and.returnValue(null);

      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          { provide: Window, useValue: mockWindow },
          AppConfig,
          InitialisationSyncService,
          { provide: AppConfigService, useValue: mockAppConfigServiceError },
          { provide: FeatureToggleService, useValue: mockFeatureToggleServiceError },
          { provide: EnvironmentService, useValue: mockEnvironmentServiceError },
          { provide: LoggerService, useValue: mockLoggerServiceError },
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting()
        ]
      });
      const iss = TestBed.inject(InitialisationSyncService);
      iss.initialisationComplete(true);
    });

    it('should handle null configuration gracefully', inject([AppConfig], (service: AppConfig) => {
      expect(service).toBeTruthy();
      expect(service.getLoginUrl()).toBeUndefined();
      expect(service.getApiUrl()).toBeUndefined();
    }));

    it('should handle null environment values', inject([AppConfig], (service: AppConfig) => {
      expect(service.getPaymentReturnUrl()).toBeNull();
      expect(service.getActivityUrl()).toBe('null/activity');
    }));
  });

  describe('with empty configuration object', () => {
    beforeEach(() => {
      mockFeatureToggleServiceError.isEnabled.and.returnValue(of(false));
      mockFeatureToggleServiceError.getValue.and.callFake((featureName: string, defVal: any) => {
        return of(defVal);
      });
      mockEnvironmentServiceError.getDeploymentEnv.and.returnValue(DeploymentEnvironmentEnum.PROD);
      mockEnvironmentServiceError.get.and.returnValue('');
      mockAppConfigServiceError.getEditorConfiguration.and.returnValue({});

      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          { provide: Window, useValue: mockWindow },
          AppConfig,
          InitialisationSyncService,
          { provide: AppConfigService, useValue: mockAppConfigServiceError },
          { provide: FeatureToggleService, useValue: mockFeatureToggleServiceError },
          { provide: EnvironmentService, useValue: mockEnvironmentServiceError },
          { provide: LoggerService, useValue: mockLoggerServiceError },
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting()
        ]
      });
      const iss = TestBed.inject(InitialisationSyncService);
      iss.initialisationComplete(true);
    });

    it('should handle empty configuration', fakeAsync(inject([AppConfig], (service: AppConfig) => {
      tick(5000);
      // getDocumentSecureMode returns false from the default feature toggle value
      expect(service.getDocumentSecureMode()).toBe(false);
      expect(service.getPaginationPageSize()).toBeUndefined();
      expect(service.getActivityNexPollRequestMs()).toBeUndefined();
    })));

    it('should return static values correctly even with empty config', inject([AppConfig], (service: AppConfig) => {
      expect(service.getCacheTimeOut()).toBe(300000);
      expect(service.getWorkAllocationApiUrl()).toBe('workallocation');
      expect(service.getPrdUrl()).toBe('api/caseshare/orgs');
    }));
  });

  describe('launch darkly initialization scenarios', () => {
    let mockFeatureToggleServiceAsync;
    let service: AppConfig;

    beforeEach(() => {
      mockFeatureToggleServiceAsync = jasmine.createSpyObj('mockFeatureToggleService', ['isEnabled', 'getValue']);
      mockFeatureToggleServiceAsync.isEnabled.and.returnValue(of(false));

      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          { provide: Window, useValue: mockWindow },
          AppConfig,
          InitialisationSyncService,
          { provide: AppConfigService, useClass: MockConfigService },
          { provide: FeatureToggleService, useValue: mockFeatureToggleServiceAsync },
          { provide: EnvironmentService, useValue: mockEnvironmentService },
          { provide: LoggerService, useValue: mockLoggerService },
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting()
        ]
      });
    });

    it('should handle feature toggle values changing over time', fakeAsync(() => {
      const changingValue$ = of(false);
      mockFeatureToggleServiceAsync.getValue.and.returnValue(changingValue$);

      service = TestBed.inject(AppConfig);
      const iss = TestBed.inject(InitialisationSyncService);
      iss.initialisationComplete(true);

      tick(5000);
      expect(service.initialisationComplete).toBeTruthy();
    }));

    it('should not mark initialization complete when initialisation sync is false', inject([AppConfig, InitialisationSyncService],
      (appConfig: AppConfig, initSync: InitialisationSyncService) => {
        initSync.initialisationComplete(false);
        expect(appConfig.initialisationComplete).toBeFalsy();
      }));
  });
});

describe('AppConfiguration with specific config values', () => {
  let mockFeatureToggleServiceConfig;
  let mockEnvironmentServiceConfig;
  let mockAppConfigServiceConfig;
  let mockLoggerServiceConfig;
  let specificConfig;

  beforeEach(() => {
    specificConfig = {
      login_url: 'https://login.test.com',
      api_url: 'https://api.test.com',
      case_data_url: 'https://casedata.test.com',
      document_management_url: 'https://dm.test.com',
      document_management_url_v2: 'https://dmv2.test.com',
      document_management_secure_enabled: true,
      remote_document_management_url: 'https://remote-dm.test.com',
      documentSecureModeCaseTypeExclusions: ['DIVORCE', 'PROBATE'],
      mc_cdam_exclusion_list: ['CIVIL', 'FAMILY'],
      postcode_lookup_url: 'https://postcode.test.com',
      oauth2_client_id: 'test-client-id',
      payments_url: 'https://payments.test.com',
      hrs_url: 'https://hrs.test.com',
      remote_hrs_url: 'https://remote-hrs.test.com',
      activity_next_poll_request_ms: 5000,
      activity_retry: 3,
      timeouts_case_retrieval: [30000, 60000, 90000],
      timeouts_case_retrieval_artificial_delay: 1000,
      activity_batch_collection_delay_ms: 2000,
      activity_max_request_per_batch: 10,
      print_service_url: 'https://print.test.com',
      remote_print_service_url: 'https://remote-print.test.com',
      pagination_page_size: 25,
      annotation_api_url: 'https://annotation.test.com',
      pay_bulk_scan_url: 'https://paybulkscan.test.com',
      refunds_url: 'https://refunds.test.com',
      notification_url: 'https://notification.test.com',
      case_flags_refdata_api_url: 'https://caseflags.test.com',
      wa_service_config: { testConfig: true },
      location_ref_api_url: 'https://location.test.com',
      cam_role_assignments_api_url: 'https://cam.test.com',
      categories_and_documents_url: 'https://categories.test.com',
      document_data_url: 'https://docdata.test.com',
      rd_common_data_api_url: 'https://rdcommon.test.com',
      case_data_store_api_url: 'https://casestore.test.com',
      enable_case_file_view_version_1_1: false,
      icp_enabled: true,
      icp_jurisdictions: ['SSCS', 'IMMIGRATION'],
      events_to_hide: ['event1', 'event2', 'event3'],
      access_management_mode: false
    };

    mockFeatureToggleServiceConfig = jasmine.createSpyObj('mockFeatureToggleService', ['isEnabled', 'getValue']);
    mockFeatureToggleServiceConfig.isEnabled.and.returnValue(of(false));
    mockFeatureToggleServiceConfig.getValue.and.callFake((featureName: string, defVal: any) => {
      // Override default values for specific features to match our test config
      if (featureName === AppConstants.FEATURE_NAMES.secureDocumentStoreEnabled) {
        return of(true);
      }
      if (featureName === AppConstants.FEATURE_NAMES.enableCaseFileViewVersion1_1) {
        return of(false);
      }
      if (featureName === AppConstants.FEATURE_NAMES.icpEnabled) {
        return of(true);
      }
      if (featureName === AppConstants.FEATURE_NAMES.icpJurisdictions) {
        return of(['SSCS', 'IMMIGRATION']);
      }
      if (featureName === AppConstants.FEATURE_NAMES.cdamExclusionList) {
        return of(['CIVIL', 'FAMILY']);
      }
      if (featureName === AppConstants.FEATURE_NAMES.accessManagementMode) {
        return of(false);
      }
      return of(defVal);
    });

    mockEnvironmentServiceConfig = jasmine.createSpyObj('EnvironmentService', ['get', 'getDeploymentEnv']);
    mockEnvironmentServiceConfig.getDeploymentEnv.and.returnValue(DeploymentEnvironmentEnum.PROD);
    mockEnvironmentServiceConfig.get.and.callFake((key: string) => {
      if (key === 'paymentReturnUrl') {
        return 'https://payment-return.test.com';
      }
      if (key === 'ccdGatewayUrl') {
        return 'https://gateway.test.com';
      }
      if (key === 'accessManagementEnabled') {
        return false;
      }
      return 'default-value';
    });

    mockAppConfigServiceConfig = jasmine.createSpyObj('AppConfigService', ['getEditorConfiguration']);
    mockAppConfigServiceConfig.getEditorConfiguration.and.returnValue(specificConfig);

    mockLoggerServiceConfig = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: Window, useValue: mockWindow },
        AppConfig,
        InitialisationSyncService,
        { provide: AppConfigService, useValue: mockAppConfigServiceConfig },
        { provide: FeatureToggleService, useValue: mockFeatureToggleServiceConfig },
        { provide: EnvironmentService, useValue: mockEnvironmentServiceConfig },
        { provide: LoggerService, useValue: mockLoggerServiceConfig },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    const iss = TestBed.inject(InitialisationSyncService);
    iss.initialisationComplete(true);
  });

  it('should return all configured URL values correctly', inject([AppConfig], (service: AppConfig) => {
    expect(service.getLoginUrl()).toBe('https://login.test.com');
    expect(service.getApiUrl()).toBe('https://api.test.com');
    expect(service.getCaseDataUrl()).toBe('https://casedata.test.com');
    expect(service.getDocumentManagementUrl()).toBe('https://dm.test.com');
    expect(service.getDocumentManagementUrlV2()).toBe('https://dmv2.test.com');
    expect(service.getRemoteDocumentManagementUrl()).toBe('https://remote-dm.test.com');
    expect(service.getPostcodeLookupUrl()).toBe('https://postcode.test.com');
    expect(service.getPaymentsUrl()).toBe('https://payments.test.com');
    expect(service.getHrsUrl()).toBe('https://hrs.test.com');
    expect(service.getRemoteHrsUrl()).toBe('https://remote-hrs.test.com');
    expect(service.getPrintServiceUrl()).toBe('https://print.test.com');
    expect(service.getRemotePrintServiceUrl()).toBe('https://remote-print.test.com');
    expect(service.getAnnotationApiUrl()).toBe('https://annotation.test.com');
    expect(service.getPayBulkScanBaseUrl()).toBe('https://paybulkscan.test.com');
    expect(service.getRefundsUrl()).toBe('https://refunds.test.com');
    expect(service.getNotificationUrl()).toBe('https://notification.test.com');
    expect(service.getCaseFlagsRefdataApiUrl()).toBe('https://caseflags.test.com');
    expect(service.getLocationRefApiUrl()).toBe('https://location.test.com');
    expect(service.getCamRoleAssignmentsApiUrl()).toBe('https://cam.test.com');
    expect(service.getCategoriesAndDocumentsUrl()).toBe('https://categories.test.com');
    expect(service.getDocumentDataUrl()).toBe('https://docdata.test.com');
    expect(service.getRDCommonDataApiUrl()).toBe('https://rdcommon.test.com');
    expect(service.getCaseDataStoreApiUrl()).toBe('https://casestore.test.com');
  }));

  it('should return all configured numeric values correctly', inject([AppConfig], (service: AppConfig) => {
    expect(service.getActivityNexPollRequestMs()).toBe(5000);
    expect(service.getActivityRetry()).toBe(3);
    expect(service.getTimeoutsForCaseRetrieval()).toEqual([30000, 60000, 90000]);
    expect(service.getTimeoutsCaseRetrievalArtificialDelay()).toBe(1000);
    expect(service.getActivityBatchCollectionDelayMs()).toBe(2000);
    expect(service.getActivityMaxRequestPerBatch()).toBe(10);
    expect(service.getPaginationPageSize()).toBe(25);
  }));

  it('should return all configured boolean values correctly', fakeAsync(inject([AppConfig], (service: AppConfig) => {
    tick(5000);
    expect(service.getDocumentSecureMode()).toBe(true);
    expect(service.getEnableCaseFileViewVersion1_1()).toBe(false);
    expect(service.getIcpEnable()).toBe(true);
  })));

  it('should return all configured array values correctly', fakeAsync(inject([AppConfig], (service: AppConfig) => {
    tick(5000);
    expect(service.getDocumentSecureModeCaseTypeExclusions()).toEqual(['DIVORCE', 'PROBATE']);
    expect(service.getCdamExclusionList()).toEqual(['CIVIL', 'FAMILY']);
    expect(service.getIcpJurisdictions()).toEqual(['SSCS', 'IMMIGRATION']);
    expect(service.getEventsToHide()).toEqual(['event1', 'event2', 'event3']);
  })));

  it('should return OAuth2 client ID correctly', inject([AppConfig], (service: AppConfig) => {
    expect(service.getOAuth2ClientId()).toBe('test-client-id');
  }));

  it('should handle access management mode with environment check', fakeAsync(inject([AppConfig], (service: AppConfig) => {
    tick(5000);
    // Initially both config and environment are false
    expect(service.getAccessManagementMode()).toBe(false);

    // Change environment to true, but config is still false
    mockEnvironmentServiceConfig.get.and.callFake((key: string) => {
      if (key === 'accessManagementEnabled') {
        return true;
      }
      if (key === 'paymentReturnUrl') {
        return 'https://payment-return.test.com';
      }
      if (key === 'ccdGatewayUrl') {
        return 'https://gateway.test.com';
      }
      return 'default-value';
    });
    // Still false because config.access_management_mode is false (from feature toggle)
    expect(service.getAccessManagementMode()).toBe(false);
  })));

  it('should generate correct derived URLs', inject([AppConfig], (service: AppConfig) => {
    expect(service.getCaseHistoryUrl('1234', '5678')).toBe('https://casedata.test.com/internal/cases/1234/events/5678');
    expect(service.getCreateOrUpdateDraftsUrl('CIVIL')).toBe('https://casedata.test.com/internal/case-types/CIVIL/drafts');
    expect(service.getViewOrDeleteDraftsUrl('draft999')).toBe('https://casedata.test.com/drafts/draft999');
    expect(service.getBannersUrl()).toBe('https://casedata.test.com/internal/banners');
    expect(service.getActivityUrl()).toBe('https://gateway.test.com/activity');
  }));
});
