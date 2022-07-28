import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material';
import {
  AbstractAppConfig,
  AlertService,
  AuthService as CCDAuthService,
  CaseEditWizardGuard,
  CaseListFiltersModule,
  CasesService,
  CaseUIToolkitModule,
  CreateCaseFiltersModule,
  DocumentManagementService,
  DraftService,
  HttpErrorService,
  HttpService,
  LoadingModule,
  PageValidationService,
  PlaceholderService,
  RequestOptionsBuilder,
  RouterHelperService,
  SearchFiltersModule,
  SearchResultModule,
  WorkbasketFiltersModule
} from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { AppConfig } from '../app/services/ccd-config/ccd-case.config';
import { SharedModule } from '../app/shared/shared.module';
import { HearingsModule } from '../hearings/hearings.module';
import { HearingsPipesModule } from '../hearings/pipes/hearings.pipes.module';
import { HearingsService } from '../hearings/services/hearings.service';
import { OrganisationModule } from '../organisation/organisation.module';
import { PriorityFieldComponentModule } from '../work-allocation-2/components/priority-field/priority.module';
import { WASupportedJurisdictionsService } from '../work-allocation-2/services';
import { casesRouting } from './case-feature.routes';
// from components
import * as fromComponents from './components';
// from containers
import * as fromContainers from './containers';
// from directives
import * as fromDirectives from './directives';
import { ActivityResolver } from './resolvers/activity.resolver';
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
    OrganisationModule,
    SearchFiltersModule,
    HttpModule,
    MatDialogModule,
    CaseListFiltersModule,
    WorkbasketFiltersModule,
    ExuiCommonLibModule,
    LoadingModule,
    ReactiveFormsModule,
    PriorityFieldComponentModule,
    HearingsModule,
    HearingsPipesModule
  ],
  declarations: [...fromComponents.components, ...fromContainers.containers, ...fromDirectives.directives],
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
    CreateCaseEventTriggerResolver,
    ActivityResolver,
    HearingsService,
    WASupportedJurisdictionsService
  ]
})
/**
 * Entry point for Cases Module that is also lazy loaded.
 */
export class CasesModule {
  constructor(@Optional() @SkipSelf() parentModule: CasesModule) {
    CasesModule.forRoot();
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CasesModule,
      providers: [
        AlertService
      ]
    };
  }
}
