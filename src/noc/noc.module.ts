import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstractAppConfig, CaseUIToolkitModule } from '@hmcts/ccd-case-ui-toolkit';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppConfig } from '../app/services/ccd-config/ccd-case.config';
// from containers
import * as fromContainers from './containers';
import { NocEmailFieldComponent } from './containers/noc-filed/email';
import { FormValidatorsService } from './containers/noc-filed/form-validators.service';
import { NocNumberFieldComponent } from './containers/noc-filed/number';
import { PaletteService } from './containers/noc-filed/palette.service';
import { NocPhoneUkFieldComponent } from './containers/noc-filed/phone-uk';
import { NocPostcodeFieldComponent } from './containers/noc-filed/postcode';
import { NocTextFieldComponent } from './containers/noc-filed/text';
import { NocYesNoFieldComponent, YesNoService } from './containers/noc-filed/yes-no';
import { nocRouting } from './noc.routes';
import { NocService } from './services';
import { effects, reducers } from './store';

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
  entryComponents: [
    NocTextFieldComponent,
    NocNumberFieldComponent,
    NocEmailFieldComponent,
    NocPhoneUkFieldComponent,
    NocYesNoFieldComponent,
    NocPostcodeFieldComponent
  ],
  providers: [{
      provide: AbstractAppConfig,
      useExisting: AppConfig,
    },
    NocService,
    PaletteService,
    FormValidatorsService,
    YesNoService
  ]
})
/**
 * Entry point for NOC Module that is also lazy loaded.
 */
export class NocModule {
  constructor(@Optional() @SkipSelf() parentModule: NocModule) {
    NocModule.forRoot();
  }

  private static forRoot(): ModuleWithProviders {
    return {
      ngModule: NocModule,
      providers: [
      ]
    };
  }
}
