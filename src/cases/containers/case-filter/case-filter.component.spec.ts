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
import { combineReducers, StoreModule } from '@ngrx/store';
import { HttpModule } from '@angular/http';
import { SharedModule } from '@shared/shared.module';
import { AppConfigService } from '../../../app/services/config/configuration.services';
import { CaseFilterComponent } from './case-filter.component';
import { reducers } from '../../store/reducers';
import * as fromCases from '../../store/reducers/';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as fromCaseCreate from '../../store/reducers';

class MockSortService {
  features = {};
  getFeatureToggle() { }
  getEditorConfiguration() { }
}
describe('Case Filter Component', () => {
  let component: CaseFilterComponent;
  let fixture: ComponentFixture<CaseFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CaseUIToolkitModule,
        HttpClientTestingModule,
        StoreModule.forRoot({ ...reducers, cases: combineReducers(fromCases.reducers) }),
        HttpModule,
        SharedModule,
        SearchFiltersModule,
        CreateCaseFiltersModule,
      ],
      declarations: [CaseFilterComponent],
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFilterComponent);
    component = fixture.componentInstance;
    component.startButtonText = 'start';
    component.caseCreatFilterBindings = [];
    component.fromCasesFeature = fromCaseCreate;
    fixture.detectChanges();
  });

  xit('should create', () => {
  //  expect(component).toBeTruthy();
  });



});
