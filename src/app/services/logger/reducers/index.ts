import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { loggerReducer, LoggerMessage } from './logger.reducer';

export interface LoggerState {
  loggerMessage: LoggerMessage
}

export const reducers: ActionReducerMap<LoggerState> = {
  loggerMessage: loggerReducer
};


export const metaReducers: MetaReducer<LoggerState>[] = !environment.production ? [] : [];
