import { inject, TestBed } from '@angular/core/testing';
import { AppConfig } from './ccd-case.config';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import {StoreModule} from '@ngrx/store';
import {AppConfigService} from '../config/configuration.services';

class MockConfigService {
  public config;
  public caseEditorConfig = {};
  public getEditorConfiguration() {}
  constructor() {
    this.config = {
      login_url: 'test'
    };
  }
}

describe('AppConfiguration', () => {
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
      ]
    });
  });

  it('should be created', inject([AppConfig], (service: AppConfig) => {
    expect(service).toBeTruthy();
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

  it('should have getActivityUrl', inject([AppConfig], (service: AppConfig) => {
    expect(service.getActivityUrl()).toBeUndefined();
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
