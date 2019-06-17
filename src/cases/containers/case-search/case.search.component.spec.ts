import { Entity } from './../../../app/store/helpers/entity';
import { Observable } from 'rxjs/Observable';
import { reducers } from '../../../app/store/reducers/index';
import { AppModule } from '../../../app/app.module';
import { AuthService } from '../../../app/services/auth/auth.service';
import { ExuiPageWrapperComponent } from '../../../app/components/exui-mian-wrapper/exui-page-wrapper.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CaseSearchComponent } from './case-search.component';
import * as fromCasesFeature from '../../store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SearchService, ActivityService, HttpErrorService, HttpService, AbstractAppConfig,
  SearchResultView, SearchResultViewColumn, FieldType, SearchResultViewItem, CaseType,
  CaseState, Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCcdConnectorComponent } from '../../../app/containers/exiu-ccd-connector-wrapper/exui-ccd-connector.component';
import { SearchFiltersModule, SearchResultModule } from '@hmcts/ccd-case-ui-toolkit/dist/shared/components';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, StoreModule, combineReducers, MemoizedSelector } from '@ngrx/store';
import { Http, ConnectionBackend, RequestOptions, HttpModule } from '@angular/http';
import { ProvidersModule } from '../../../app/providers/providers.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AppConfigService } from '../../../app/services/config/configuration.services';
import { of, observable } from 'rxjs';
import { json } from 'body-parser';

describe('CaseSearchComponent', () => {
  let fixture: ComponentFixture<CaseSearchComponent>;
  let component: CaseSearchComponent;
  let store: MockStore<fromCasesFeature.State>;

  beforeEach(() => {
    const mockSearchService = jasmine.createSpyObj(['search', 'getSearchInputUrl', 'getSearchInputs', 'isDataValid']);
    const mockAuthService = jasmine.createSpyObj(['canActivate', 'generateLoginUrl', 'loginRedirect', 'decodeJwt',
                                                  'isAuthenticated', 'signOut']);
    const appMockService = jasmine.createSpyObj(['load', 'getLoginUrl', 'getApiUrl', 'getCaseDataUrl', 'getDocumentManagementUrl',
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
          feature: combineReducers(fromCasesFeature.reducers)
        })
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
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
    spyOn(store, 'pipe').and.callFake(() =>  new Observable<any>() );
    spyOn(store, 'dispatch').and.callThrough();
    mockSearchService.search.and.callFake(() =>  new Observable<any>());

    fixture = TestBed.createComponent(CaseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    });
  it('should create', () => {
      // inject([HttpTestingController, SearchService], ( httpMock: HttpTestingController, searchService: SearchService) => {
        expect(component).toBeTruthy();
  });

  it('should have ngOnInit', () => {
    component.fromCasesFeature = store;
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should assign value to search input', () => {
    const ct = new CaseType();
    ct.id = 'Benefit';
    const cs = new CaseState();
    cs.id = 'Open';
    ct.states = [cs];
    const jd = new Jurisdiction();
    jd.caseTypes = [ct];
    jd.id = 'England';
    const data = {
      jurisdiction : new Entity(jd),
      caseType: new Entity(ct),
      metadataFields: []
    };
    component.assignData(data);
    expect(component.jurisdiction.id).toBe(data.jurisdiction.id);
    expect(component.caseType.id).toBe(data.caseType.id);
  });

  it('should do search result mapping', () => {
    const data = new SearchResultView();
    const column = new SearchResultViewColumn();
    column.case_field_type = new FieldType();
    data.columns = [column];
    const result = new SearchResultViewItem();
    data.results = [result];
    component.assignResult(data);
    expect(component.resultView).toBe(data);
  });
});
