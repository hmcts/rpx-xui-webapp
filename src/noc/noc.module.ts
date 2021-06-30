import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstractAppConfig, CaseUIToolkitModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { AppConfig } from '../app/services/ccd-config/ccd-case.config';
import * as fromContainers from './containers';
import { NocDateFieldComponent } from './containers/noc-field/date';
import { NocDateTimeFieldComponent } from './containers/noc-field/datetime';
import { NocEmailFieldComponent } from './containers/noc-field/email';
import { FormValidatorsService } from './containers/noc-field/form-validators.service';
import { NocNumberFieldComponent } from './containers/noc-field/number';
import { PaletteService } from './containers/noc-field/palette.service';
import { NocPhoneUkFieldComponent } from './containers/noc-field/phone-uk';
import { NocPostcodeFieldComponent } from './containers/noc-field/postcode';
import { NocTextFieldComponent } from './containers/noc-field/text';
import { NocTimeFieldComponent } from './containers/noc-field/time';
import { UtilsModule } from './containers/noc-field/utils/utils.module';
import { NocYesNoFieldComponent, YesNoService } from './containers/noc-field/yes-no';
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
      ReactiveFormsModule,
      UtilsModule,
      ExuiCommonLibModule
  ],
  declarations: [...fromContainers.containers],
  entryComponents: [
    NocTextFieldComponent,
    NocNumberFieldComponent,
    NocEmailFieldComponent,
    NocPhoneUkFieldComponent,
    NocYesNoFieldComponent,
    NocPostcodeFieldComponent,
    NocDateFieldComponent,
    NocDateTimeFieldComponent,
    NocTimeFieldComponent
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

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NocModule,
      providers: [
      ]
    };
  }
}
