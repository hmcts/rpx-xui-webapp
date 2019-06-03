import { LoggerStateAction, LoggerStateActionTypes } from '../actions/logger-state.actions';

export interface LoggerMessage {
    infoMessages: Array<string>,
    errorMessages: Array<string>,
    traceMessages: Array<string>,
    warningMessages: Array<string>,
    debugMessages: Array<string>,
    fatalMessages: Array<string>
}

export const initialState: LoggerMessage = {
    infoMessages: [],
    errorMessages: [],
    traceMessages: [],
    warningMessages: [],
    debugMessages: [],
    fatalMessages: []
};

export function loggerReducer(state = initialState, action: LoggerStateAction) : LoggerMessage {
    switch(action.type) {
        case LoggerStateActionTypes.Info:
            return {
            ...state,
            infoMessages: insertMessage(state.infoMessages, action)
            };
        case LoggerStateActionTypes.Error:
            return {
            ...state,
            errorMessages: insertMessage(state.errorMessages, action)
            };        
        case LoggerStateActionTypes.Warning:
            return {
            ...state,
            warningMessages: insertMessage(state.warningMessages, action)
            };
        case LoggerStateActionTypes.Fatal:
            return {
            ...state,
            fatalMessages: insertMessage(state.fatalMessages, action)
            };
        case LoggerStateActionTypes.Debug:
            return {
            ...state,
            debugMessages: insertMessage(state.debugMessages, action)
            };
        case LoggerStateActionTypes.Trace:
            return {
            ...state,
            traceMessages: insertMessage(state.traceMessages, action)
            };
        default:
            return state;
    }

    function insertMessage(array, action) {
        let newArray = array.slice()
        newArray.splice(action.index, 0, action.payload)
        return newArray
      } 
}