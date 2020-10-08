import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AbstractAppConfig, CaseUIToolkitModule } from '@hmcts/ccd-case-ui-toolkit';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { nocRouting } from './noc.routes';
// from containers
import * as fromContainers from './containers';
import {reducers, effects} from './store';
import { AppConfig } from '../app/services/ccd-config/ccd-case.config';
import { NocService } from './services';

@NgModule({
    imports: [
        CommonModule,
        CaseUIToolkitModule,
        HttpClientModule,
        StoreModule.forFeature('noc', reducers),
        EffectsModule.forFeature(effects),
        nocRouting,
        SharedModule
    ],
  declarations: [...fromContainers.containers],
  providers: [{
      provide: AbstractAppConfig,
      useExisting: AppConfig
    },
    NocService
  ]
})
/**
 * Entry point for NOC Module that is also lazy loaded.
 */
export class NocModule {
  constructor(@Optional() @SkipSelf() parentModule: NocModule) {
    NocModule.forRoot();
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NocModule,
      providers: [
      ]
    };
  }
}
