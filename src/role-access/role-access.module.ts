import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstractAppConfig, PipesModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppConfig } from '../app/services/ccd-config/ccd-case.config';
import { SharedModule } from '../app/shared/shared.module';
import { CaseworkerDataService } from '../work-allocation-2/services';
import * as fromComponents from './components';
import { ChooseRadioOptionComponent } from './components';
import * as fromContainers from './containers';
import { roleAccessRouting } from './role-access.routes';
import { RoleExclusionsService } from './services';
import { effects, reducers } from './store';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('role-access', reducers),
    EffectsModule.forFeature(effects),
    PipesModule,
    roleAccessRouting,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ExuiCommonLibModule
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  entryComponents: [],
  exports: [
    ChooseRadioOptionComponent
  ],
  providers: [{
    provide: AbstractAppConfig,
    useExisting: AppConfig,
  },
    RoleExclusionsService,
    CaseworkerDataService
  ]
})
/**
 * Entry point for Role Access Module that is also lazy loaded.
 */
export class RoleAccessModule {
  constructor(@Optional() @SkipSelf() parentModule: RoleAccessModule) {
    RoleAccessModule.forRoot();
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RoleAccessModule,
      providers: []
    };
  }
}
