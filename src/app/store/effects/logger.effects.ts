import { Injectable } from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import { LoggerStateAction, LoggerStateActionTypes } from '../actions/logger-state.actions';
import {  map } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import 'rxjs/add/operator/do';

@Injectable()

export class LoggerEffects {
    constructor(private actions$: Actions,
                private ngxLogger: NGXLogger) {}
    @Effect({dispatch: false})
    infoConfig = this.actions$.pipe(
        ofType<LoggerStateAction>(LoggerStateActionTypes.Info),
        map(({ payload }) => {
            this.ngxLogger.info(payload);
          })
    );

    @Effect({dispatch: false})
    errorConfig = this.actions$.pipe(
        ofType<LoggerStateAction>(LoggerStateActionTypes.Error),
        map(({ payload }) => {
            this.ngxLogger.error(payload);
          })
    );

    @Effect({dispatch: false})
    fatalConfig = this.actions$.pipe(
        ofType<LoggerStateAction>(LoggerStateActionTypes.Fatal),
        map(({ payload }) => {
            this.ngxLogger.fatal(payload);
          })
    );

    @Effect({dispatch: false})
    traceConfig = this.actions$.pipe(
        ofType<LoggerStateAction>(LoggerStateActionTypes.Trace),
        map(({ payload }) => {
            this.ngxLogger.trace(payload);
          })
    );

    @Effect({dispatch: false})
    warnConfig = this.actions$.pipe(
        ofType<LoggerStateAction>(LoggerStateActionTypes.Warning),
        map(({ payload }) => {
            this.ngxLogger.warn(payload);
          })
    );

    @Effect({dispatch: false})
    debugConfig = this.actions$.pipe(
        ofType<LoggerStateAction>(LoggerStateActionTypes.Debug),
        map(({ payload }) => {
            this.ngxLogger.debug(payload);
          })
    );
}
