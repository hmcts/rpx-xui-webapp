import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CaseUIToolkitModule,
  DraftService,
  AlertService,
  HttpService,
  AuthService as CCDAuthService,
  CasesService,
  HttpErrorService,
  AbstractAppConfig,
  CaseEditWizardGuard,
  RouterHelperService,
  DocumentManagementService,
  PageValidationService,
  PlaceholderService,
  SearchService,
  RequestOptionsBuilder,
  SearchFiltersModule,
} from '@hmcts/ccd-case-ui-toolkit';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../../app/shared/shared.module';
import { AppConfigService } from '../../../app/services/config/configuration.services';
import { CasesCreateComponent } from './case-create.component';
import * as fromCasesFeature from '../../store';
import * as fromCaseCreate from '../../store/reducers';
import { MockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

class MockSortService {
  features = {};
  getFeatureToggle() { }
  getEditorConfiguration() { }
}
describe('CaseCreateComponent', () => {
  let component: CasesCreateComponent;
  let fixture: ComponentFixture<CasesCreateComponent>;
  let store: MockStore<fromCaseCreate.State>;
  const mockPlaceholderService = jasmine.createSpyObj(['resolvePlaceholders']);
  const mockCasesService = jasmine.createSpyObj(['jurisdictionId', 'getCaseView', 'getCaseViewV2', 'getEventTrigger', 'validateCase',
  'createCase', 'getPrintDocuments']);
  const mockCCDAuthService = jasmine.createSpyObj(['signIn', 'redirectUri']);
  const mockHttpService = jasmine.createSpyObj(['get', 'post', 'put', 'delete']);
  const mockHttpErrorService = jasmine.createSpyObj(['setError', 'removeError', 'handle']);
  const mockAlertService = jasmine.createSpyObj(['push', 'clear', 'error', 'warning', 'success', 'setPreserveAlerts', 'isPreserveAlerts',
  'message']);

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CaseUIToolkitModule,
        HttpClientModule,
        StoreModule.forRoot({
          ...fromCasesFeature.reducers,
          feature: combineReducers(fromCasesFeature.reducers)
        }),
        SharedModule,
        SearchFiltersModule,
      ],
      declarations: [CasesCreateComponent],
      providers: [
        { provide: PlaceholderService, useValue: mockPlaceholderService },
        { provide: CasesService, useValue: mockCasesService },
        { provide: mockCCDAuthService, useValue: CCDAuthService },
        { provide: mockHttpService, useValue: HttpService },
        { provide: mockHttpErrorService, useValue: HttpErrorService },
        { provide: mockAlertService, useValue: AlertService },
        PageValidationService,
        CaseEditWizardGuard,
        RouterHelperService,
        DocumentManagementService,
        AppConfigService,
        RequestOptionsBuilder,
        AppConfigService,
        AppConfig,
        {
          provide: SearchService,
          useValue: {
            requestOptionsBuilder: RequestOptionsBuilder
          }
        },
        {
          provide: AbstractAppConfig,
          useExisting: AppConfig
        },
        {
          provide: AppConfigService,
          useClass: MockSortService
        },
        ScrollToService
      ]
    })
      .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(CasesCreateComponent);
    component = fixture.componentInstance;
    component.caseCreateInputs = {jurisdictionId: '', caseTypeId: '', eventId: ''};

    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'pipe').and.callFake(() =>  new Observable<any>() );
    spyOn(store, 'dispatch').and.callThrough();

    expect(component).toBeTruthy();
  });


});
