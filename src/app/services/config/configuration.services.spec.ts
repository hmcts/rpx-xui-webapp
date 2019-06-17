import {AppConfigService} from './configuration.services';
import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';

describe('Configuration Service', () => {
  let httpClientSpy: { get: jasmine.Spy };
  const service = jasmine.createSpyObj(['load',
                                                        'getLoginUrl',
                                                        'getApiUrl',
                                                        'getCaseDataUrl',
                                                        'getDocumentManagementUrl',
                                                        'getRemoteDocumentManagementUrl',
                                                        'getPostcodeLookupUrl',
                                                        'getPostcodeLookupUrl',
                                                        'getOAuth2ClientId',
                                                        'getPaymentsUrl',
                                                        'getCreateOrUpdateDraftsUrl',
                                                        'getViewOrDeleteDraftsUrl',
                                                        'getActivityUrl',
                                                        'getActivityNexPollRequestMs',
                                                        'getActivityRetry',
                                                        'getActivityBatchCollectionDelayMs',
                                                        'getActivityMaxRequestPerBatch',
                                                        'getPrintServiceUrl',
                                                        'getRemotePrintServiceUrl',
                                                        'getPaginationPageSize',
                                                        'load',
                                                        'setConfiguration',
                                                        'getFeatureToggle',
                                                        'getEditorConfiguration',
                                                        'getRoutesConfig']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [{ provide: AppConfigService, useValue: service} ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });

  it('should have configuration service', () => {
    expect(service).toBeTruthy();
  });

  // it('should have configuration service load method', () => {
  //   httpClientSpy.get.and.returnValue({});
  //   service.load().subscribe(data => {
  //     expect(data.features).toBeDefined();
  //   });
  // });

  it('should have configuration service getFeatureToggle method', () => {
    expect(service.getFeatureToggle).toBeTruthy();
  });

  it('should have configuration service setConfiguration method', () => {
    expect(service.setConfiguration).toBeTruthy();
  });

  it('should have configuration service getEditorConfiguration method', () => {
    expect(service.getEditorConfiguration).toBeTruthy();
  });

  it('should have configuration service load method', () => {
    expect(service.load).toBeTruthy();
  });

  it('should have configuration service getRoutesConfig method', () => {
    expect(service.getRoutesConfig).toBeTruthy();
  });

  it('should have configuration service getEditorConfiguration method', () => {
    expect(service.getEditorConfiguration).toBeTruthy();
  });
});

