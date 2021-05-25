import { inject, TestBed } from '@angular/core/testing';
import { AppConfig } from './ccd-case.config';

import {AppConfigService} from '../config/configuration.services';
import {StoreModule} from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { EnvironmentService } from 'src/app/shared/services/environment.service';

class MockConfigService {
  config;
  caseEditorConfig = {};
  getEditorConfiguration() {}
  constructor() {
    this.config = {
      login_url: 'test'
    };
  }
}

const mockFeatureToggleService = jasmine.createSpyObj('mockFeatureToggleService', ['isEnabled']);
const mockEnvironmentService = jasmine.createSpyObj('mockEnvironmentService', ['get']);

describe('AppConfiguration', () => {
  mockFeatureToggleService.isEnabled.and.returnValue(of(false));
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        HttpClientTestingModule
      ],
      providers: [
        AppConfig,
        AppConfigService,
        { provide: AppConfigService, useClass: MockConfigService },
        FeatureToggleService,
        { provide: FeatureToggleService, useValue: mockFeatureToggleService },
        { provide: EnvironmentService, useValue: mockEnvironmentService}
      ]
    });
    mockEnvironmentService.get.and.returnValue('someUrl');
  });

  it('should be created', inject([AppConfig], (service: AppConfig) => {
    expect(service).toBeTruthy();
    expect(mockFeatureToggleService.isEnabled).toHaveBeenCalled();
    expect(service.workallocationUrl).toBeNull();
  }));

  it('should have load', inject([AppConfig], (service: AppConfig) => {
    expect(service.load()).toBeDefined();
  }));

  it('should have getLoginUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getLoginUrl).toBeDefined();
  }));

  it('should have getLoginUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getLoginUrl).toBeDefined();
  }));

  it('should have getApiUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getApiUrl).toBeDefined();
  }));

  it('should have getDocumentManagementUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getDocumentManagementUrl).toBeDefined();
  }));

  it('should have getRemoteDocumentManagementUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getRemoteDocumentManagementUrl).toBeDefined();
  }));

  it('should have getPostcodeLookupUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getPostcodeLookupUrl).toBeDefined();
  }));

  it('should have getOAuth2ClientId', inject([AppConfig], (service: AppConfig) => {
    expect(service.getOAuth2ClientId).toBeDefined();
  }));

  it('should have getPaymentsUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getPaymentsUrl()).toBeUndefined();
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
    expect(service.getRemotePrintServiceUrl()).toBeUndefined();
  }));

  it('should have getCreateOrUpdateDraftsUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getCreateOrUpdateDraftsUrl('')).toBe('undefined/internal/case-types//drafts/');
  }));

  it('should have getAnnotationApiUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getAnnotationApiUrl()).toBeUndefined();
  }));

});
