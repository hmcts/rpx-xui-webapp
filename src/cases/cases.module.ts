import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { RouterModule } from '@angular/router';
import {
  AbstractAppConfig,
  AlertModule,
  AlertService,
  AuthService as CCDAuthService,
  CaseEditWizardGuard,
  CaseEditorModule,
  CaseFileViewService,
  CaseHeaderModule,
  CaseListFiltersModule,
  CaseListModule,
  CaseNotifier,
  CaseReferencePipe,
  CaseResolver,
  CaseViewerModule,
  CasesService,
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
  RetryUtil,
  RouterHelperService,
  SearchFiltersModule,
  SearchResultModule,
  WorkbasketFiltersModule,
} from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { AppConfig } from '../app/services/ccd-config/ccd-case.config';
import { SharedModule } from '../app/shared/shared.module';
import { HearingsModule } from '../hearings/hearings.module';
import { HearingsPipesModule } from '../hearings/pipes/hearings.pipes.module';
import { HearingsService } from '../hearings/services/hearings.service';
import { OrganisationModule } from '../organisation/organisation.module';
import { WASupportedJurisdictionsService } from '../work-allocation/services';
import { casesRouting } from './case-feature.routes';
// from components
import * as fromComponents from './components';
// from containers
import * as fromContainers from './containers';
import { CaseHearingsComponent } from './containers';
import { RolesAndAccessContainerComponent } from './containers/roles-and-access-container/roles-and-access-container.component';
import { TasksContainerComponent } from './containers/tasks-container/tasks-container.component';
// from directives
import * as fromDirectives from './directives';
import { queryManagementRouting } from './query-management.routes';
import { ActivityResolver } from './resolvers/activity.resolver';
import { CreateCaseEventTriggerResolver } from './resolvers/create-case-event-trigger.resolver';
// from services
import * as fromServices from './services';
import { effects, reducers } from './store';
import { WorkAllocationComponentsModule } from '../work-allocation/components/work-allocation.components.module';

@NgModule({
  declarations: [...fromComponents.components, ...fromContainers.containers, ...fromDirectives.directives],
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
    MatDialogModule,
    CaseListFiltersModule,
    WorkbasketFiltersModule,
    ExuiCommonLibModule,
    LoadingModule,
    ReactiveFormsModule,
    HearingsModule,
    HearingsPipesModule,
    CaseHeaderModule,
    CaseEditorModule,
    CaseListModule,
    PaletteModule,
    CaseViewerModule,
    PipesModule,
    queryManagementRouting,
    RpxTranslationModule.forChild(),
    WorkAllocationComponentsModule,
  ],
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
      useExisting: AppConfig,
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
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
/**
 * Entry point for Cases Module that is also lazy loaded.
 */
export class CasesModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(
    @Optional() @SkipSelf() parentModule: CasesModule,
    private injector: Injector
  ) {
    CasesModule.forRoot();
    // There are elements that need to be registered as custom elements to be used in the toolkit
    if (typeof customElements !== 'undefined') {
      const registrations: Array<{ tag: string; component: any }> = [
        { tag: 'exui-case-hearings-ce', component: CaseHearingsComponent },
        { tag: 'exui-roles-and-access-ce', component: RolesAndAccessContainerComponent },
        { tag: 'exui-tasks-ce', component: TasksContainerComponent },
      ];
      for (const { tag, component } of registrations) {
        if (!customElements.get(tag)) {
          try {
            const el = createCustomElement(component, { injector: this.injector });
            customElements.define(tag, el);
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }

  public static forRoot(): ModuleWithProviders<RouterModule> {
    return {
      ngModule: CasesModule,
      providers: [AlertService],
    };
  }
}
