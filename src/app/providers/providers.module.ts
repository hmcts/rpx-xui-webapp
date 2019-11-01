import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AppConfig } from '../services/ccd-config/ccd-case.config';
import { AppConfigService } from '../services/config/configuration.services';


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
  public static forRoot(): ModuleWithProviders {
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
