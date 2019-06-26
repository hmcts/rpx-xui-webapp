import { CaseListFilterComponent } from './case-list-filter.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseUIToolkitModule, SearchFiltersModule, CaseListFiltersModule, PlaceholderService,
         CasesService, HttpService, HttpErrorService, AlertService, DraftService, PageValidationService,
         CaseEditWizardGuard, RouterHelperService, DocumentManagementService, AuthService,
         AbstractAppConfig } from '@hmcts/ccd-case-ui-toolkit';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppConfig } from 'src/app/services/ccd-config/ccd-case.config';
import { AppConfigService } from 'src/app/services/config/configuration.services';
import { StoreModule } from '@ngrx/store';

describe('Case List Filter Component', () => {
    let component: CaseListFilterComponent;
    let fixture: ComponentFixture<CaseListFilterComponent>;

    let mockApiConfig = jasmine.createSpyObj('mockApiConfig', [
    'load', 'getLoginUrl', 'getApiUrl', 'getCaseDataUrl', 'getDocumentManagementUrl', 'getRemoteDocumentManagementUrl',
    'getPostcodeLookupUrl','getOAuth2ClientId',
    'getPaymentsUrl', 'getCreateOrUpdateDraftsUrl', 'getViewOrDeleteDraftsUrl', 'getActivityUrl',
    'getActivityNexPollRequestMs', 'getActivityRetry', 'getActivityBatchCollectionDelayMs', 'getActivityMaxRequestPerBatch',
    'getCaseHistoryUrl', 'getPrintServiceUrl', 'getRemotePrintServiceUrl', 'getPaginationPageSize']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
              RouterTestingModule,
              CaseUIToolkitModule,
              HttpClientModule,
              StoreModule.forRoot({}),
              HttpModule,
              SharedModule,
              SearchFiltersModule,
              CaseListFiltersModule
            ],
            declarations: [ CaseListFilterComponent ],
            providers: [
                PlaceholderService,
                CasesService,
                HttpService,
                AuthService,
                HttpErrorService,
                AlertService,
                DraftService,
                PageValidationService,
                CaseEditWizardGuard,
                RouterHelperService,
                DocumentManagementService,
                AppConfigService,
                {
                    provide: AbstractAppConfig,
                    useValue: mockApiConfig
                },
            ]
        })
      .compileComponents();
      });

    it('should create', () => {
        fixture = TestBed.createComponent(CaseListFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
