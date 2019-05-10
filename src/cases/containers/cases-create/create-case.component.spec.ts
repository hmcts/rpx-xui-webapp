import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CasesCreateComponent} from './cases-create.component';
import {
  CaseUIToolkitModule, DraftService, AlertService, HttpService, AuthService as CCDAuthService, CasesService,
  HttpErrorService, AbstractAppConfig, CaseEditWizardGuard, RouterHelperService,
  DocumentManagementService, PageValidationService, PlaceholderService
} from '@hmcts/ccd-case-ui-toolkit';
import {AppConfig} from '../../case.config';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {DummyComponentComponent, ExuiCcdConnectorComponent} from '../../../app/containers';
import {ExuiPageWrapperComponent} from '../../../app/components';
import {StoreModule} from '@ngrx/store';
import {HttpModule} from '@angular/http';


describe('CasesCreateComponent', () => {
  let component: CasesCreateComponent;
  let fixture: ComponentFixture<CasesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CaseUIToolkitModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        HttpModule
      ],
      declarations: [ CasesCreateComponent, ExuiCcdConnectorComponent, DummyComponentComponent, ExuiPageWrapperComponent ],
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
