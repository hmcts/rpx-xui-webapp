import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../../app/store/reducers';
import * as fromReducers from '../reducers';
import { getLogMessagesState, getInfoMessagesState, getErrorMessagesState, getWarningMessagesState,
  getDebugMessagesState, getTraceMessagesState, getFatalMessagesState } from './logger.selector';
import { Clear, Info, Error, Warning, Debug, Trace, Fatal } from '../actions/logger-state.actions';
import { initialState } from '../reducers/logger.reducer';

describe('Logger Selectors', () => {
    let store: Store<fromReducers.LoggerState>;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({
            ...fromRoot.reducers,
            products: combineReducers(fromReducers.reducers),
          }),
        ],
      });
      store = TestBed.get(Store);
      spyOn(store, 'dispatch').and.callThrough();
    });

    describe('Configuration State', () => {
        it('should return config initial state', () => {
         store.dispatch(new Clear(undefined));
         let result;
         store
            .select(getLogMessagesState)
            .subscribe(value => (result = value));
         expect(result).toEqual(initialState);
        });
      });

    describe('Configuration State', () => {
        it('should have info state populated', () => {
         store.dispatch(new Clear(undefined));
         store.dispatch(new Info('App Info'));
         let result;
         store
            .select(getInfoMessagesState)
            .subscribe(value => (result = value));
         console.log(result);
         expect(result).toEqual('App Info');
        });
      });

    describe('Configuration State', () => {
        it('should have Error state populated', () => {
         store.dispatch(new Clear(undefined));
         store.dispatch(new Error('App Error'));
         let result;
         store
            .select(getErrorMessagesState)
            .subscribe(value => (result = value));
         console.log(result);
         expect(result).toEqual('App Error');
        });
      });

    describe('Configuration State', () => {
        it('should have Warning state populated', () => {
         store.dispatch(new Clear(undefined));
         store.dispatch(new Warning('App Warn'));
         let result;
         store
            .select(getWarningMessagesState)
            .subscribe(value => (result = value));
         console.log(result);
         expect(result).toEqual('App Warn');
        });
      });

    describe('Configuration State', () => {
        it('should have Warning state populated', () => {
         store.dispatch(new Clear(undefined));
         store.dispatch(new Debug('App Debug'));
         let result;
         store
            .select(getDebugMessagesState)
            .subscribe(value => (result = value));
         console.log(result);
         expect(result).toEqual('App Debug');
        });
      });

    describe('Configuration State', () => {
        it('should have Warning state populated', () => {
         store.dispatch(new Clear(undefined));
         store.dispatch(new Trace('App Trace'));
         let result;
         store
            .select(getTraceMessagesState)
            .subscribe(value => (result = value));
         console.log(result);
         expect(result).toEqual('App Trace');
        });
      });

    describe('Configuration State', () => {
        it('should have Warning state populated', () => {
         store.dispatch(new Clear(undefined));
         store.dispatch(new Fatal('App Trace'));
         let result;
         store
            .select(getFatalMessagesState)
            .subscribe(value => (result = value));
         console.log(result);
         expect(result).toEqual('App Trace');
        });
      });
});
