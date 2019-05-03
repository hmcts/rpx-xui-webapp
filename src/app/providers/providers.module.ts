import { ModuleWithProviders, NgModule } from '@angular/core';
import {AppConfigService} from '../services/configuration.services';

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
        AppConfigService,
      ]
    };
  }
}
