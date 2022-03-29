import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AbstractAppConfig, CaseUIToolkitModule} from '@hmcts/ccd-case-ui-toolkit';
import {ExuiCommonLibModule} from '@hmcts/rpx-xui-common-lib';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AppConfig} from '../app/services/ccd-config/ccd-case.config';
import {SharedModule} from '../app/shared/shared.module';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import {HearingsEditGuard} from './guards/hearings-edit-guard';
import {HearingsViewGuard} from './guards/hearings-view-guard';
import {hearingsRouting} from './hearings.routes';
import {HearingsPipesModule} from './pipes/hearings.pipes.module';
import {HearingsService} from './services/hearings.service';
import {effects, reducers} from './store';
import {AbstractPageFlow} from './utils/abstract-page-flow';
import {PageFlow} from './utils/page-flow';

@NgModule({
  imports: [
    CommonModule,
    CaseUIToolkitModule,
    HttpClientModule,
    StoreModule.forFeature('hearings', reducers),
    EffectsModule.forFeature(effects),
    hearingsRouting,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ExuiCommonLibModule,
    HearingsPipesModule,
  ],
  declarations: [...fromComponents.components, ...fromContainers.containers],
  entryComponents: [],
  providers: [
    PageFlow,
    {
      provide: AbstractAppConfig,
      useExisting: AppConfig,
    },
    {
      provide: AbstractPageFlow,
      useExisting: PageFlow,
    },
    HearingsService,
    HearingsEditGuard,
    HearingsViewGuard,
  ]
})
/**
 * Entry point for Hearings Module that is also lazy loaded.
 */
export class HearingsModule {
  constructor(@Optional() @SkipSelf() parentModule: HearingsModule) {
    HearingsModule.forRoot();
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HearingsModule,
      providers: []
    };
  }
}
