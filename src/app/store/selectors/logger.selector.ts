import {createSelector} from '@ngrx/store';
import { getLoggerState } from 'src/app/store';
import { LoggerMessage } from '../reducers/logger.reducer';

export const getLogMessagesState = createSelector(
    getLoggerState,
    (state: LoggerMessage) => state
  );
export const getDebugMessagesState = createSelector(
  getLogMessagesState,
  (state: LoggerMessage) => state.debugMessages[state.debugMessages.length - 1]
);
export const getErrorMessagesState = createSelector(
  getLogMessagesState,
  (state: LoggerMessage) => state.errorMessages[state.errorMessages.length - 1]
);
export const getFatalMessagesState = createSelector(
  getLogMessagesState,
  (state: LoggerMessage) => state.fatalMessages[state.fatalMessages.length - 1]
);
export const getInfoMessagesState = createSelector(
  getLogMessagesState,
  (state: LoggerMessage) => state.infoMessages[state.infoMessages.length - 1]
);
export const getTraceMessagesState = createSelector(
  getLogMessagesState,
  (state: LoggerMessage) => state.traceMessages[state.traceMessages.length - 1]
);
export const getWarningMessagesState = createSelector(
  getLogMessagesState,
  (state: LoggerMessage) => state.warningMessages[state.warningMessages.length - 1]
);
