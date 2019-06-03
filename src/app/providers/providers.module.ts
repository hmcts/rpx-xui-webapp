import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppConfigService } from '../services/config/configuration.services';
import { AppConfig } from '../services/ccd-config/ccd-case.config';
import { AuthService } from '../services/auth/auth.service';


/**
 * This Provider Module shares the instances of providers across the app (i.e. services)
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: []
})
export class ProvidersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProvidersModule,
      providers: [
        AuthService,
        AppConfigService,
        AppConfig,
        AuthService
      ]
    };
  }
}
