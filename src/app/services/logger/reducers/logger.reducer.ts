import { LoggerStateAction, LoggerStateActionTypes } from '../actions/logger-state.actions';

export interface LoggerMessage {
    infoMessages: Array<string>;
    errorMessages: Array<string>;
    traceMessages: Array<string>;
    warningMessages: Array<string>;
    debugMessages: Array<string>;
    fatalMessages: Array<string>;
}

export const initialState: LoggerMessage = {
    infoMessages: [],
    errorMessages: [],
    traceMessages: [],
    warningMessages: [],
    debugMessages: [],
    fatalMessages: []
};

export function loggerReducer(state = initialState, action: LoggerStateAction): LoggerMessage {
    const message = action.payload;
    switch (action.type) {
        case LoggerStateActionTypes.Info:
                const infoMessages = [...state.infoMessages, message];
                return {
                ...state,
                infoMessages
                };
        case LoggerStateActionTypes.Error:
            const errorMessages = [...state.errorMessages, message];
            return {
            ...state,
            errorMessages
            };
        case LoggerStateActionTypes.Warning:
            const warningMessages = [...state.warningMessages, message];
            return {
            ...state,
            warningMessages
            };
        case LoggerStateActionTypes.Fatal:
            const fatalMessages = [...state.fatalMessages, message];
            return {
            ...state,
            fatalMessages
            };
        case LoggerStateActionTypes.Debug:
            const debugMessages =  [...state.debugMessages, message];
            return {
            ...state,
            debugMessages
            };
        case LoggerStateActionTypes.Trace:
            const traceMessages =  [...state.traceMessages, message];
            return {
            ...state,
            traceMessages
            };
        default:
            return state;
        }
    }
