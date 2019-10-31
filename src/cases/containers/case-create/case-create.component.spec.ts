import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractAppConfig, AlertService, AuthService as CCDAuthService, CaseEditWizardGuard, CasesService, CaseUIToolkitModule, DocumentManagementService, DraftService, HttpErrorService, HttpService, PageValidationService, PlaceholderService, RequestOptionsBuilder, RouterHelperService, SearchFiltersModule, SearchService } from '@hmcts/ccd-case-ui-toolkit';
import { combineReducers, StoreModule } from '@ngrx/store';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { reducers } from 'src/app/store';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { AppConfigService } from '../../../app/services/config/configuration.services';
import { SharedModule } from '../../../app/shared/shared.module';
import * as fromCases from '../../store/reducers';
import { CasesCreateComponent } from './case-create.component';
class MockSortService {
  public features = {};
  public getFeatureToggle() { }
  public getEditorConfiguration() { }
}

describe('CaseCaseComponent', () => {
  let component: CasesCreateComponent;
  let fixture: ComponentFixture<CasesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CaseUIToolkitModule,
        HttpClientTestingModule,
        StoreModule.forRoot({ ...reducers, cases: combineReducers(fromCases.reducers) }),
        SharedModule,
        SearchFiltersModule,
      ],
      declarations: [CasesCreateComponent],
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
    fixture = TestBed.createComponent(CasesCreateComponent);
    component = fixture.componentInstance;
    component.caseCreateInputs = { jurisdictionId: '', caseTypeId: '', eventId: '' };

    fixture.detectChanges();

  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });


});
