import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCaseComponent } from './container/create-case/create-case.component';

import {
  CaseUIToolkitModule, DraftService, AlertService, HttpService, AuthService as CCDAuthService, CasesService,
  HttpErrorService, AbstractAppConfig, CaseEditWizardGuard, RouterHelperService,
  DocumentManagementService, PageValidationService, PlaceholderService
} from '@hmcts/ccd-case-ui-toolkit';
import { AppConfig } from './case-feature.config';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { MaterialManifestModule } from 'src/app/material-manifest/material-manifest.module';
import { caseFeatureRouting } from './case-feature.routes';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    CommonModule,
    CaseUIToolkitModule,
    MaterialManifestModule,
    HttpClientModule,
    HttpModule,
    caseFeatureRouting
  ],
  declarations: [ CreateCaseComponent ],
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
export class CaseFeatureModule { }
