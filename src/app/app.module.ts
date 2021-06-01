import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { AppComponent } from './containers/app/app.component';
import { environment } from '../environments/environment';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
// ngrx modules - START
import {EffectsModule} from '@ngrx/effects';
import {MetaReducer, Store, StoreModule} from '@ngrx/store';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeFreeze} from 'ngrx-store-freeze';
import {LoggerService} from './services/logger/logger.service';
// enforces immutability
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];
// ngrx modules - END

// APP store
import { CustomSerializer, reducers } from './store/reducers';
import { effects } from './store/effects';

import { initApplication } from './app-initilizer';

// common provider
import { ProvidersModule } from './providers/providers.module';
// app routes
import { ROUTES, routingConfiguration } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonitoringService } from './services/logger/monitoring.service';
import { CryptoWrapper } from './services/logger/cryptoWrapper';
import { AbstractAppInsights, AppInsightsWrapper } from './services/logger/appInsightsWrapper';
import { DefaultErrorHandler } from './services/errorHandler/defaultErrorHandler';
import { AcceptTermsService } from './services/acceptTerms/acceptTerms.service';
import { ExuiCommonLibModule, FeatureToggleService, LAUNCHDARKLYKEY, TimeoutNotificationsService } from '@hmcts/rpx-xui-common-lib';
import { PaymentLibModule } from '@hmcts/ccpay-web-component';
import { ENVIRONMENT_CONFIG, EnvironmentConfig } from '../models/environmentConfig.model';
import { CaseShareService } from './services/case/share-case.service';
import { MCLAUNCHDARKLYKEY, McLaunchDarklyService } from './shared/services/mc-launch-darkly-service';

export function launchDarklyClientIdFactory(envConfig: EnvironmentConfig): string {
  return envConfig.launchDarklyClientId || '';
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    ProvidersModule.forRoot(),
    RouterModule.forRoot(ROUTES, routingConfiguration),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    SharedModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      disableConsoleLogging: false
    }),
    ExuiCommonLibModule,
    NgIdleKeepaliveModule.forRoot(),
    PaymentLibModule,
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [Store],
      multi: true
    },
    CryptoWrapper,
    MonitoringService,
    LoggerService,
    {
      provide: AbstractAppInsights,
      useClass: AppInsightsWrapper
    },
    {
      provide: ErrorHandler,
      useClass: DefaultErrorHandler
    },
    AcceptTermsService,
    CaseShareService,
    { provide: MCLAUNCHDARKLYKEY, useFactory: launchDarklyClientIdFactory, deps: [ENVIRONMENT_CONFIG] },
    { provide: LAUNCHDARKLYKEY, useFactory: launchDarklyClientIdFactory, deps: [ENVIRONMENT_CONFIG] },
    { provide: FeatureToggleService, useClass: McLaunchDarklyService },
    TimeoutNotificationsService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
