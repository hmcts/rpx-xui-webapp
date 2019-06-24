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
import {combineReducers, StoreModule} from '@ngrx/store';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../../app/shared/shared.module';
import { AppConfigService } from '../../../app/services/config/configuration.services';
import { CasesCreateComponent } from './case-create.component';
import { reducers } from 'src/app/store';
import * as fromCases from '../../store/reducers';
class MockSortService {
  features = {};
  getFeatureToggle() { }
  getEditorConfiguration() { }
}
describe('CaseCaseComponent', () => {
  let component: CasesCreateComponent;
  let fixture: ComponentFixture<CasesCreateComponent>;

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
    component.caseCreateInputs = {jurisdictionId: '', caseTypeId: '', eventId: ''};

    fixture.detectChanges();

  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });


});
