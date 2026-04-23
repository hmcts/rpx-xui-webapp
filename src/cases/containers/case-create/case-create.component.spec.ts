import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AbstractAppConfig,
  AlertService,
  AuthService as CCDAuthService,
  CaseEditWizardGuard,
  CasesService,
  DocumentManagementService,
  DraftService,
  HttpErrorService,
  HttpService,
  PageValidationService,
  PlaceholderService,
  RequestOptionsBuilder,
  RouterHelperService,
  SearchService,
} from '@hmcts/ccd-case-ui-toolkit';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { AppConfigService } from '../../../app/services/config/configuration.services';
import * as fromCasesSelectors from '../../store/selectors/create-case.selectors';
import { CasesCreateComponent } from './case-create.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

class MockSortService {
  public features = {};

  public getFeatureToggle() {}

  public getEditorConfiguration() {}
}

describe('CaseCreateComponent', () => {
  let component: CasesCreateComponent;
  let fixture: ComponentFixture<CasesCreateComponent>;
  let store: MockStore;
  let createCaseFilterSelector: MemoizedSelector<any, { jurisdictionId: string; caseTypeId: string; eventId: string }>;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CasesCreateComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      teardown: { destroyAfterEach: false },
      imports: [RouterTestingModule],
      providers: [
        PlaceholderService,
        CasesService,
        CCDAuthService,
        HttpService,
        HttpErrorService,
        AlertService,
        DraftService,
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
            requestOptionsBuilder: RequestOptionsBuilder,
          },
        },
        {
          provide: AbstractAppConfig,
          useExisting: AppConfig,
        },
        {
          provide: AppConfigService,
          useClass: MockSortService,
        },
        provideMockStore(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    createCaseFilterSelector = store.overrideSelector(fromCasesSelectors.getCreateCaseFilterState, {
      jurisdictionId: 'TEST',
      caseTypeId: 'CASE',
      eventId: 'CREATE',
    });
    store.refreshState();
    fixture = TestBed.createComponent(CasesCreateComponent);
    component = fixture.componentInstance;
    component.caseCreateInputs = { jurisdictionId: '', caseTypeId: '', eventId: '' };

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    createCaseFilterSelector?.setResult({ jurisdictionId: 'TEST', caseTypeId: 'CASE', eventId: 'CREATE' });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should call unsubscribe on ngDestroy', () => {
    const subscription = jasmine.createSpyObj('myObject', ['unsubscribe']);

    component.unSubscribe(subscription);
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should not call unsubscribe when no subscription', () => {
    const subscription = jasmine.createSpyObj('myObject', ['unsubscribe']);

    component.unSubscribe(null);
    expect(subscription.unsubscribe).not.toHaveBeenCalled();
  });
});
