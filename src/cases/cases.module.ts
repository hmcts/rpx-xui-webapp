import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material';
import { AbstractAppConfig, AuthService as CCDAuthService, CaseEditWizardGuard, CaseListFiltersModule, CasesService, CaseUIToolkitModule, CreateCaseFiltersModule, DocumentManagementService, DraftService, HttpErrorService, HttpService, PageValidationService, PlaceholderService, RequestOptionsBuilder, RouterHelperService, SearchFiltersModule, SearchResultModule } from '@hmcts/ccd-case-ui-toolkit';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { AppConfig } from '../app/services/ccd-config/ccd-case.config';
import { SharedModule } from '../app/shared/shared.module';
import { casesRouting } from './case-feature.routes';
// from components
import * as fromComponents from './components';
// from containers
import * as fromContainers from './containers';
import { CreateCaseEventTriggerResolver } from './resolvers/create-case-event-trigger.resolver';
// from services
import * as fromServices from './services';
import { effects, reducers } from './store';

@NgModule({
  imports: [
    CommonModule,
    CaseUIToolkitModule,
    CreateCaseFiltersModule,
    SearchResultModule,
    HttpClientModule,
    StoreModule.forFeature('cases', reducers),
    EffectsModule.forFeature(effects),
    casesRouting,
    SharedModule,
    SearchFiltersModule,
    // tslint:disable-next-line: deprecation
    HttpModule,
    MatDialogModule,
    CaseListFiltersModule
  ],
  declarations: [...fromComponents.components, ...fromContainers.containers],
  providers: [
    PlaceholderService,
    CasesService,
    CCDAuthService,
    HttpService,
    HttpErrorService,
    DraftService,
    PageValidationService,
    CaseEditWizardGuard,
    RouterHelperService,
    DocumentManagementService,
    RequestOptionsBuilder,
    {
      provide: AbstractAppConfig,
      useExisting: AppConfig
    },
    ScrollToService,
    ...fromServices.services,
    CreateCaseEventTriggerResolver
  ]
})
/**
 * Entry point for Cases Module that is also lazy loaded.
 */
export class CasesModule {
}
