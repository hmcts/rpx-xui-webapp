import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfig } from './case.config';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import {HttpClientModule} from '@angular/common/http';
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
    {
      provide: AbstractAppConfig,
      useExisting: AppConfig
    },
    ScrollToService
  ]
})
/**
 * Entry point for Cases Module that is also lazy loaded.
 */
export class CasesModule { }
