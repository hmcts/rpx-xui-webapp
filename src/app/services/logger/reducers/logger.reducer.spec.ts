import {loggerReducer, initialState} from './logger.reducer';
import { Info, Error, Warning, Fatal, Debug, Trace } from '../actions/logger-state.actions';

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
      const action = new Info('Logger Test');
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      let expectedState = initialState;
      expectedState.infoMessages.push('Logger Test');
      expect(state).toEqual(expectedState);
    });
  });

  describe('error action', () => {
    it('should return the error message in state', () => {
      const action = new Error('Logger Test');
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      let expectedState = initialState;
      expectedState.errorMessages.push('Logger Test');
      expect(state).toEqual(expectedState);
    });
  });

  describe('warn action', () => {
    it('should return the warn message in state', () => {
      const action = new Warning('Logger Test');
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      let expectedState = initialState;
      expectedState.warningMessages.push('Logger Test');
      expect(state).toEqual(expectedState);
    });
  });

  describe('fatal action', () => {
    it('should return the fatal message in state', () => {
      const action = new Fatal('Logger Test');
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      let expectedState = initialState;
      expectedState.fatalMessages.push('Logger Test');
      expect(state).toEqual(expectedState);
    });
  });

  describe('debug action', () => {
    it('should return the error message in state', () => {
      const action = new Debug('Logger Test');
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      let expectedState = initialState;
      expectedState.debugMessages.push('Logger Test');
      expect(state).toEqual(expectedState);
    });
  });

  describe('debug action', () => {
    it('should return the error message in state', () => {
      const action = new Trace('Logger Test');
      const state = loggerReducer(undefined, action);
      expect(state).not.toBe(initialState);
      let expectedState = initialState;
      expectedState.traceMessages.push('Logger Test');
      expect(state).toEqual(expectedState);
    });
  });
});
