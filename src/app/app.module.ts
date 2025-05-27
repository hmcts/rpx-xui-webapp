import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  ErrorHandler,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PaymentLibModule } from '@hmcts/ccpay-web-component';
import {
  CookieService,
  ExuiCommonLibModule,
  FeatureToggleGuard,
  FeatureToggleService,
  FilterService,
  GoogleTagManagerService,
  LaunchDarklyService,
  LoadingService,
  RoleService,
  TimeoutNotificationsService
} from '@hmcts/rpx-xui-common-lib';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
// ngrx modules - START
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { MetaReducer, Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import {
  LoggerModule,
  NGXLogger,
  NgxLoggerLevel,
  NGXLoggerMapperService
} from 'ngx-logger';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { BookingServiceDownComponent, BookingSystemErrorComponent, RefreshBookingServiceDownComponent } from '../booking/containers';
import { environment } from '../environments/environment';
import {
  EnvironmentConfig,
  ENVIRONMENT_CONFIG
} from '../models/environmentConfig.model';
import { initApplication } from './app-initilizer';
// app routes
import { ROUTES, routingConfiguration } from './app.routes';
import { AppComponent } from './containers/app/app.component';
// common provider
import { ProvidersModule } from './providers/providers.module';
import { AcceptTermsService } from './services/acceptTerms/acceptTerms.service';
import { CaseShareService } from './services/case/share-case.service';
import { DefaultErrorHandler } from './services/errorHandler/defaultErrorHandler';
import { JurisdictionService } from './services/jurisdiction/jurisdiction.service';
import { LoggerService } from './services/logger/logger.service';
import { MonitoringService } from './services/logger/monitoring.service';
import { SharedModule } from './shared/shared.module';
import { effects } from './store/effects';
// ngrx modules - END
// APP store
import { CustomSerializer, reducers } from './store/reducers';
import { InitialisationSyncService } from './services/ccd-config/initialisation-sync-service';
import { CspNonceService } from './services/nonce/csp-nonce.service';
import { CspStyleInterceptor } from './services/nonce/csp-style.interceptor';
// enforces immutability
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

export function launchDarklyClientIdFactory(
  envConfig: EnvironmentConfig
): string {
  return envConfig.launchDarklyClientId || '';
}

export function initializeCSP(
  cspNonceService: CspNonceService,
  cspStyleInterceptor: CspStyleInterceptor,
  logger: NGXLogger
): () => Promise<void> {
  return () => {
    return new Promise<void>((resolve) => {
      try {
        logger.info('Initializing CSP nonce support...');

        // Services are initialized through dependency injection
        const nonce = cspNonceService.getNonce();

        if (nonce) {
          logger.info('CSP nonce initialized successfully');
        } else {
          logger.warn('CSP nonce not found - styles may be blocked by CSP');
        }

        resolve();
      } catch (error) {
        logger.error('Error initializing CSP services:', error);
        resolve(); // Don't block app startup
      }
    });
  };
}

@NgModule({
  declarations: [AppComponent, BookingServiceDownComponent, BookingSystemErrorComponent, RefreshBookingServiceDownComponent],
  imports: [
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      disableConsoleLogging: false
    }),
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
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      connectInZone: true }),
    SharedModule,
    ExuiCommonLibModule,
    NgIdleKeepaliveModule.forRoot(),
    PaymentLibModule,
    RpxTranslationModule.forRoot({
      baseUrl: '/api/translation',
      debounceTimeMs: 300,
      validity: {
        days: 1
      },
      testMode: false
    })
  ],
  providers: [
    NGXLogger,
    NGXLoggerMapperService,
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [Store, ENVIRONMENT_CONFIG],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeCSP,
      deps: [CspNonceService, CspStyleInterceptor, NGXLogger],
      multi: true
    },
    MonitoringService,
    LoggerService,
    {
      provide: ErrorHandler,
      useClass: DefaultErrorHandler
    },
    AcceptTermsService,
    CaseShareService,
    { provide: FeatureToggleService, useClass: LaunchDarklyService },
    TimeoutNotificationsService,
    JurisdictionService,
    CookieService,
    FeatureToggleGuard,
    FilterService,
    GoogleTagManagerService,
    LoadingService,
    RoleService,
    InitialisationSyncService,
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
