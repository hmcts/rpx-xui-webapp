import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AbstractAppConfig, CaseUIToolkitModule } from '@hmcts/ccd-case-ui-toolkit';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { NocService } from 'src/noc/services/index';
import { AppConfig } from '../app/services/ccd-config/ccd-case.config';
// from containers
import * as fromContainers from './containers';
import { nocRouting } from './noc.routes';
import {reducers, effects} from './store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaletteService } from './containers/noc-filed/palette.service';
import { FormValidatorsService } from './containers/noc-filed/form-validators.service';

@NgModule({
    imports: [
        CommonModule,
        CaseUIToolkitModule,
        HttpClientModule,
        StoreModule.forFeature('noc', reducers),
        EffectsModule.forFeature(effects),
        nocRouting,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
  declarations: [...fromContainers.containers],
  providers: [{
      provide: AbstractAppConfig,
      useExisting: AppConfig
    },
    NocService,
    PaletteService,
    FormValidatorsService
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
