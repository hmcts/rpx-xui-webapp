import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { LoggerService } from '../app/services/logger/logger.service';
import * as fromServices from './services';
import { effects, reducers } from './store';

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

export class OrganisationModule { }
