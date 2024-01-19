import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { RouterModule } from '@angular/router';
import {
  AbstractAppConfig,
  AlertModule,
  AlertService,
  AuthService as CCDAuthService,
  CaseEditorModule,
  CaseEditWizardGuard,
  CaseFileViewService,
  CaseHeaderModule,
  CaseListFiltersModule,
  CaseListModule,
  CaseNotifier,
  CaseReferencePipe,
  CaseResolver,
  CasesService,
  CaseViewerModule,
  CcdCYAPageLabelFilterPipe,
  CreateCaseFiltersModule,
  DocumentManagementService,
  DraftService,
  ErrorNotifierService,
  FormatTranslatorService,
  HttpErrorService,
  HttpService,
  IsCompoundPipe,
  JurisdictionService,
  LoadingModule,
  NavigationNotifierService,
  OrganisationConverter,
  OrganisationService,
  PageValidationService,
  PaletteModule,
  PipesModule,
  PlaceholderService,
  RequestOptionsBuilder,
  RouterHelperService,
  SearchFiltersModule,
  SearchResultModule,
  WorkbasketFiltersModule,
  RetryUtil
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
import { PriorityFieldModule } from '../work-allocation/components/priority-field/priority-field.module';
import { WASupportedJurisdictionsService } from '../work-allocation/services';
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
import { RestrictedCaseAccessComponent } from './components/restricted-case-access/restricted-case-access.component';
import { RestrictedCaseAccessContainerComponent } from './containers/restricted-case-access-container/restricted-case-access-container.component';
import { RestrictedCaseAccessGuard } from './guards/restricted-case-access-guard';

@NgModule({
  imports: [
    AlertModule,
    CommonModule,
    CreateCaseFiltersModule,
    SearchResultModule,
    StoreModule.forFeature('cases', reducers),
    EffectsModule.forFeature(effects),
    casesRouting,
    SharedModule,
    OrganisationModule,
    SearchFiltersModule,
    HttpClientModule,
    MatDialogModule,
    CaseListFiltersModule,
    WorkbasketFiltersModule,
    ExuiCommonLibModule,
    LoadingModule,
    ReactiveFormsModule,
    PriorityFieldModule,
    HearingsModule,
    HearingsPipesModule,
    CaseHeaderModule,
    CaseEditorModule,
    CaseListModule,
    PaletteModule,
    CaseViewerModule,
    PipesModule
  ],
  declarations: [...fromComponents.components, ...fromContainers.containers, ...fromDirectives.directives],
  providers: [
    PlaceholderService,
    CaseReferencePipe,
    CaseNotifier,
    ErrorNotifierService,
    NavigationNotifierService,
    CasesService,
    RetryUtil,
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
    CaseResolver,
    ActivityResolver,
    HearingsService,
    FormatTranslatorService,
    WASupportedJurisdictionsService,
    OrganisationService,
    OrganisationConverter,
    IsCompoundPipe,
    CcdCYAPageLabelFilterPipe,
    CaseFileViewService,
    JurisdictionService,
    RestrictedCaseAccessGuard
  ]
})
/**
 * Entry point for Cases Module that is also lazy loaded.
 */
export class CasesModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(@Optional() @SkipSelf() parentModule: CasesModule) {
    CasesModule.forRoot();
  }

  public static forRoot(): ModuleWithProviders<RouterModule> {
    return {
      ngModule: CasesModule,
      providers: [
        AlertService
      ]
    };
  }
}
