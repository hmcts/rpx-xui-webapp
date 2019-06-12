import { AppModule } from './../../../app/app.module';
import { AuthService } from './../../../app/services/auth/auth.service';
import { ExuiPageWrapperComponent } from './../../../app/components/exui-mian-wrapper/exui-page-wrapper.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CaseSearchComponent } from './case-search.component';
import * as fromCasesFeature from '../../store';
import { MockStore } from '@ngrx/store/testing';
import { SearchService, ActivityService, HttpErrorService, HttpService, AbstractAppConfig} from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCcdConnectorComponent } from '../../../app/containers/exiu-ccd-connector-wrapper/exui-ccd-connector.component';
import { SearchFiltersModule, SearchResultModule } from '@hmcts/ccd-case-ui-toolkit/dist/shared/components';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { Http, ConnectionBackend, RequestOptions, HttpModule } from '@angular/http';
import { ProvidersModule } from '../../../app/providers/providers.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AppConfigService } from '../../../app/services/config/configuration.services';

describe('CaseSearchComponent', () => {
  let fixture: ComponentFixture<CaseSearchComponent>;
  let component: CaseSearchComponent;
  let store: Store<fromCasesFeature.State>;
  // let store: MockStore<fromCasesFeature.State>;

  beforeEach(() => {
    const mockSearchService = jasmine.createSpyObj(['search', 'getSearchInputUrl', 'getSearchInputs', 'isDataValid']);
    const mockAuthService = jasmine.createSpyObj(['canActivate','generateLoginUrl','loginRedirect', 'decodeJwt',
                                                  'isAuthenticated', 'signOut']);
    const appMockService = jasmine.createSpyObj(['load', 'getLoginUrl','getApiUrl','getCaseDataUrl','getDocumentManagementUrl',
    'getRemoteDocumentManagementUrl', 'getPostcodeLookupUrl',
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
    'getPaginationPageSize']);

    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      imports: [
        SearchFiltersModule,
        SearchResultModule,
        RouterTestingModule,
        ProvidersModule,
        HttpModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromCasesFeature.reducers,
          feature: combineReducers(fromCasesFeature.reducers),
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        //Http,ConnectionBackend,RequestOptions,
        HttpService,
        { provide:  AuthService, useValue: mockAuthService},
        {provide: HttpErrorService, useClass: HttpErrorService, deps: [AuthService]},
        {provide: AbstractAppConfig, useValue: appMockService},
        ActivityService,
        AppConfigService,
        { provide: SearchService, useValue: mockSearchService},
      ],
      declarations: [ExuiPageWrapperComponent, ExuiCcdConnectorComponent, CaseSearchComponent, ]
    });
    // .compileComponents().then(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(CaseSearchComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    });
  it('should create', () => {
      // inject([HttpTestingController, SearchService], ( httpMock: HttpTestingController, searchService: SearchService) => {
        expect(component).toBeTruthy();
  });

  // it('should have ngOnInit', () => {
  //   expect(component.ngOnInit).toBeTruthy();
  // });
});
