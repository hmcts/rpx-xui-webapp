import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractAppConfig } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppConfig } from '../app/services/ccd-config/ccd-case.config';
import { SharedModule } from '../app/shared/shared.module';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { roleAccessRouting } from './role-access.routes';
import { RoleExclusionsService } from './services';
import { effects, reducers } from './store';
import { InfoMessageCommService } from '../work-allocation-2/services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('role-access', reducers),
    EffectsModule.forFeature(effects),
    roleAccessRouting,
    SharedModule,
    ReactiveFormsModule,
    ExuiCommonLibModule
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  entryComponents: [],
  providers: [{
    provide: AbstractAppConfig,
    useExisting: AppConfig,
  },
    InfoMessageCommService,
    RoleExclusionsService
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
