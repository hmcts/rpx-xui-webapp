import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromServices from './services';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
import { HttpClientModule } from '@angular/common/http';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('org', reducers),
    EffectsModule.forFeature(effects),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      disableConsoleLogging: false
    })
  ],
  providers: [
      fromServices.services,
      LoggerService,
  ]
})

export class OrganisationModule {

}