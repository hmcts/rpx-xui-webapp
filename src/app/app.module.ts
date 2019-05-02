import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule} from '@angular/core';
import { AppComponent } from './containers/app/app.component';
import { LoggerModule } from './services/logger/logger.module';

// ngrx modules - START
import {EffectsModule} from '@ngrx/effects';
import {MetaReducer, Store, StoreModule} from '@ngrx/store';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeFreeze} from 'ngrx-store-freeze';
// ngrx modules - END
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import {environment} from '../environments/environment';
import {CustomSerializer, reducers} from './store/reducers';
import {effects} from './store/effects';
import {initApplication} from './app-initilizer';

import {ProvidersModule} from './providers/providers.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProvidersModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    LoggerModule // todo remove
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer },
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [Store],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
