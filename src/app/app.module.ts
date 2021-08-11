import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, RouterModule } from '@angular/router';
import { PaymentLibModule } from '@hmcts/ccpay-web-component';
import { ExuiCommonLibModule, LAUNCHDARKLYKEY } from '@hmcts/rpx-xui-common-lib';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
// ngrx modules - START
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { MetaReducer, Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from '../environments/environment';
import { EnvironmentConfig, ENVIRONMENT_CONFIG } from '../models/environmentConfig.model';
import { initApplication } from './app-initilizer';
// app routes
import { ROUTES, routingConfiguration } from './app.routes';
import { AppComponent } from './containers/app/app.component';
// common provider
import { ProvidersModule } from './providers/providers.module';
import { AcceptTermsService } from './services/acceptTerms/acceptTerms.service';
import { CaseShareService } from './services/case/share-case.service';
import { DefaultErrorHandler } from './services/errorHandler/defaultErrorHandler';
import { AbstractAppInsights, AppInsightsWrapper } from './services/logger/appInsightsWrapper';
import { CryptoWrapper } from './services/logger/cryptoWrapper';
import { LoggerService } from './services/logger/logger.service';
import { MonitoringService } from './services/logger/monitoring.service';
import { SharedModule } from './shared/shared.module';
import { effects } from './store/effects';
// ngrx modules - END
// APP store
import { CustomSerializer, reducers } from './store/reducers';
// enforces immutability
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

export function launchDarklyClientIdFactory(envConfig: EnvironmentConfig): string {
  return envConfig.launchDarklyClientId || '';
}

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
};

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
    ExuiCommonLibModule.forRoot(),
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
    { provide: LAUNCHDARKLYKEY, useFactory: launchDarklyClientIdFactory, deps: [ENVIRONMENT_CONFIG] },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
