import {loggerReducer, initialState} from './logger.reducer';
import { Info, Error, Warning, Fatal, Debug, Trace, Clear } from '../actions/logger-state.actions';
import { stat } from 'fs';

const loggerMessage = 'Logger Test123';

describe('LoggerReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = loggerReducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('info action', () => {
    it('should return the info message in state', () => {
      const action = new Info(loggerMessage);
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      const expectedState = initialState;
      expectedState.infoMessages.push(loggerMessage);
      expect(state).toEqual(expectedState);
    });
  });

  describe('error action', () => {
    it('should return the error message in state', () => {
      const action = new Error(loggerMessage);
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      const expectedState = initialState;
      expectedState.errorMessages.push(loggerMessage);
      expect(state).toEqual(expectedState);
    });
  });

  describe('warn action', () => {
    it('should return the warn message in state', () => {
      const action = new Warning(loggerMessage);
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      const expectedState = initialState;
      expectedState.warningMessages.push(loggerMessage);
      expect(state).toEqual(expectedState);
    });
  });

  describe('fatal action', () => {
    it('should return the fatal message in state', () => {
      const action = new Fatal(loggerMessage);
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      const expectedState = initialState;
      expectedState.fatalMessages.push(loggerMessage);
      expect(state).toEqual(expectedState);
    });
  });

  describe('debug action', () => {
    it('should return the error message in state', () => {
      const action = new Debug(loggerMessage);
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      const expectedState = initialState;
      expectedState.debugMessages.push(loggerMessage);
      expect(state).toEqual(expectedState);
    });
  });

  describe('debug action', () => {
    it('should return the error message in state', () => {
      const action = new Trace(loggerMessage);
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      const expectedState = initialState;
      expectedState.traceMessages.push(loggerMessage);
      expect(state).toEqual(expectedState);
    });
  });
  afterEach(() => {
    const action = {} as any;
    const state = loggerReducer(initialState, new Clear(undefined));
  });
});
