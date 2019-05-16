import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CaseListComponent} from './case-list.component';
import {
  CaseUIToolkitModule, DraftService, AlertService, HttpService, AuthService as CCDAuthService, CasesService,
  HttpErrorService, AbstractAppConfig, CaseEditWizardGuard, RouterHelperService,
  DocumentManagementService, PageValidationService, PlaceholderService, SearchService, RequestOptionsBuilder, SearchFiltersModule
} from '@hmcts/ccd-case-ui-toolkit';
import {AppConfig} from '../../case.config';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {HttpModule} from '@angular/http';
import {SharedModule} from '../../../app/shared/shared.module';
import {AppConfigService} from '../../../app/services/configuration.services';

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
        StoreModule.forRoot({}),
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
    fixture.detectChanges();

  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });


});
