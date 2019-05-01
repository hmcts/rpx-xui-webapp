import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfig } from './case-feature.config';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {CasesCreateComponent} from './containers/cases-create/cases-create.component';
import {
  CaseUIToolkitModule, DraftService, AlertService, HttpService, AuthService as CCDAuthService, CasesService,
  HttpErrorService, AbstractAppConfig, CaseEditWizardGuard, RouterHelperService,
  DocumentManagementService, PageValidationService, PlaceholderService
} from '@hmcts/ccd-case-ui-toolkit';
import { casesRouting } from './case-feature.routes';


@NgModule({
  imports: [
    CommonModule,
    // CaseUIToolkitModule,
    HttpClientModule,
    HttpModule,
    casesRouting
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
    AppConfig,
    {
      provide: AbstractAppConfig,
      useExisting: AppConfig
    },
    ScrollToService
  ]
})
export class CasesModule { }
