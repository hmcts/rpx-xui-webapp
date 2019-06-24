import {loggerReducer, initialState} from './logger.reducer';
import { Info, Error, Warning, Fatal, Debug, Trace } from '../actions/logger-state.actions';


const loggerMessage = 'Logger Test123';

describe('info action', () => {
    it('should return the info message in state', () => {
      const action = new Info(loggerMessage);
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      const expectedState = {
        ...initialState,
        infoMessages: [loggerMessage]
      };
      expect(state).toEqual(expectedState);
    });
  });

describe('error action', () => {
    it('should return the error message in state', () => {
      const action = new Error(loggerMessage);
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      const expectedState = {
        ...initialState,
        errorMessages: [loggerMessage]
      };
      expect(state).toEqual(expectedState);
    });
  });

describe('warn action', () => {
    it('should return the warn message in state', () => {
      const action = new Warning(loggerMessage);
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      const expectedState = {
        ...initialState,
        warningMessages: [loggerMessage]
      };
      expect(state).toEqual(expectedState);
    });
  });

describe('fatal action', () => {
    it('should return the fatal message in state', () => {
      const action = new Fatal(loggerMessage);
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      const expectedState = {
        ...initialState,
        fatalMessages: [loggerMessage]
      };
      expect(state).toEqual(expectedState);
    });
  });

describe('debug action', () => {
    it('should return the error message in state', () => {
      const action = new Debug(loggerMessage);
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      const expectedState = {
        ...initialState,
        debugMessages: [loggerMessage]
      };
      expect(state).toEqual(expectedState);
    });
  });

describe('debug action', () => {
    it('should return the error message in state', () => {
      const action = new Trace(loggerMessage);
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      const expectedState = {
        ...initialState,
        traceMessages: [loggerMessage]
      };
      expect(state).toEqual(expectedState);
    });
   });
