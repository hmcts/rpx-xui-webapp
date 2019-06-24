import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CaseListComponent} from './case-list.component';
import {
  CaseUIToolkitModule, DraftService, AlertService, HttpService, AuthService as CCDAuthService, CasesService,
  HttpErrorService, AbstractAppConfig, CaseEditWizardGuard, RouterHelperService,
  DocumentManagementService, PageValidationService, PlaceholderService, SearchService, RequestOptionsBuilder, SearchFiltersModule
} from '@hmcts/ccd-case-ui-toolkit';
import {AppConfig} from '../../../app/services/ccd-config/ccd-case.config';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {combineReducers, StoreModule} from '@ngrx/store';
import {HttpModule} from '@angular/http';
import {SharedModule} from '../../../app/shared/shared.module';
import {AppConfigService} from '../../../app/services/config/configuration.services';
import {reducers} from '../../store/reducers';
import * as fromCases from '../../store/reducers/';

class MockSortService {
  features = {};
  getFeatureToggle() {}
}
describe('CaseListComponent', () => {
  let component: CaseListComponent;
  let fixture: ComponentFixture<CaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CaseUIToolkitModule,
        HttpClientModule,
        StoreModule.forRoot({...reducers, cases: combineReducers(fromCases.reducers)}),
        HttpModule,
        SharedModule,
        SearchFiltersModule,
      ],
      declarations: [ CaseListComponent ],
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
        AppConfig,
        AppConfigService,
        RequestOptionsBuilder,
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
    fixture = TestBed.createComponent(CaseListComponent);
    component = fixture.componentInstance;
   // componentInstance fixture.detectChanges();

  });
  it('should create', () => {
    // TODO enable when developing component
   // expect(component).toBeTruthy();
  });



});
