import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CasesCreateComponent} from './cases-create.component';
import {ConnectionBackend, Http, HttpModule, RequestOptions} from '@angular/http';
import {
  CaseUIToolkitModule, DraftService, AlertService, HttpService, AuthService as CCDAuthService, CasesService,
  HttpErrorService, AbstractAppConfig, CaseEditWizardGuard, RouterHelperService,
  DocumentManagementService, PageValidationService, PlaceholderService
} from '@hmcts/ccd-case-ui-toolkit';
import {AppConfig} from '../../case.config';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {RouterModule} from '@angular/router';
import {ROUTES} from '../../../app/app.routes';
import {RouterTestingModule} from '@angular/router/testing';


describe('CasesCreateComponent', () => {
  let component: CasesCreateComponent;
  let fixture: ComponentFixture<CasesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CaseUIToolkitModule,
        HttpModule
      ],
      declarations: [ CasesCreateComponent ],
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
        {
          provide: AbstractAppConfig,
          useExisting: AppConfig
        },
        ScrollToService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
