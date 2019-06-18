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
  SearchFiltersModule, CreateCaseFiltersModule,
} from '@hmcts/ccd-case-ui-toolkit';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { SharedModule } from '../../../app/shared/shared.module';
import { AppConfigService } from '../../../app/services/config/configuration.services';
import { CaseFilterComponent } from './case-filter.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { MockStore } from '@ngrx/store/testing';
import * as fromCaseCreate from '../../store/reducers';
import { Observable } from 'rxjs';
import * as fromCasesFeature from '../../store';

class MockSortService {
  features = {};
  getFeatureToggle() { }
  getEditorConfiguration() { }
}

let store: MockStore<fromCaseCreate.State>;
const mockPlaceholderService = jasmine.createSpyObj(['resolvePlaceholders']);
const mockCasesService = jasmine.createSpyObj(['jurisdictionId', 'getCaseView', 'getCaseViewV2', 'getEventTrigger', 'validateCase',
'createCase', 'getPrintDocuments']);
const mockCCDAuthService = jasmine.createSpyObj(['signIn', 'redirectUri']);
const mockHttpService = jasmine.createSpyObj(['get', 'post', 'put', 'delete']);
const mockHttpErrorService = jasmine.createSpyObj(['setError', 'removeError', 'handle']);
const mockAlertService = jasmine.createSpyObj(['push', 'clear', 'error', 'warning', 'success', 'setPreserveAlerts', 'isPreserveAlerts',
'message']);

describe('Case Filter Component1', () => {
  let component: CaseFilterComponent;
  let fixture: ComponentFixture<CaseFilterComponent>;

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
        CreateCaseFiltersModule,
      ],
      declarations: [CaseFilterComponent],
      providers: [
        { provide: PlaceholderService, useValue: mockPlaceholderService },
        { provide: CasesService, useValue: mockCasesService },
        { provide: mockCCDAuthService, useValue: CCDAuthService },
        { provide: mockHttpService, useValue: HttpService },
        { provide: mockHttpErrorService, useValue: HttpErrorService },
        { provide: mockAlertService, useValue: AlertService },
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
      .compileComponents()
      .then(() => {

      });
  });

  it('should create', () => {
    store = TestBed.get(Store);
    spyOn(store, 'pipe').and.callFake(() =>  new Observable<any>() );
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(CaseFilterComponent);
    component = fixture.componentInstance;
    component.startButtonText = 'start';
    component.caseCreatFilterBindings = [];
    expect(component).toBeTruthy();
  });


});
