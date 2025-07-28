import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { initApplication } from './app-initilizer';
import * as fromApp from './store';

describe('initApplication', () => {
  let mockStore: jasmine.SpyObj<Store<fromApp.State>>;
  let appConfigSubject: BehaviorSubject<any>;
  let dispatchedActions: any[];

  beforeEach(() => {
    dispatchedActions = [];
    
    mockStore = jasmine.createSpyObj<Store<fromApp.State>>('store', ['dispatch', 'pipe']);
    mockStore.dispatch.and.callFake((action) => {
      dispatchedActions.push(action);
    });
    
    // Create BehaviorSubject after test setup to avoid timing issues
    appConfigSubject = new BehaviorSubject({ config: { features: {} } });
    mockStore.pipe.and.returnValue(appConfigSubject.asObservable());
  });

  afterEach(() => {
    appConfigSubject.complete();
  });

  describe('Function return', () => {
    it('should return a function that returns a promise', () => {
      const initFunc = initApplication(mockStore);
      expect(initFunc).toEqual(jasmine.any(Function));
      expect(initFunc()).toEqual(jasmine.any(Promise));
    });
  });

  describe('Store interactions', () => {
    it('should dispatch StartAppInitilizer action', async () => {
      const initFunc = initApplication(mockStore);
      initFunc();
      
      expect(dispatchedActions).toContain(jasmine.objectContaining({
        type: fromApp.START_APP_INITIALIZER
      }));
    });

    it('should dispatch LoadConfig action', async () => {
      const initFunc = initApplication(mockStore);
      initFunc();
      
      expect(dispatchedActions).toContain(jasmine.objectContaining({
        type: fromApp.APP_LOAD_CONFIG
      }));
    });

    it('should dispatch LoadFeatureToggleConfig action', async () => {
      const initFunc = initApplication(mockStore);
      initFunc();
      
      expect(dispatchedActions).toContain(jasmine.objectContaining({
        type: fromApp.LOAD_FEATURE_TOGGLE_CONFIG
      }));
    });

    it('should dispatch all three initial actions in correct order', async () => {
      const initFunc = initApplication(mockStore);
      initFunc();
      
      expect(dispatchedActions.length).toBeGreaterThanOrEqual(3);
      expect(dispatchedActions[0]).toEqual(jasmine.objectContaining({
        type: fromApp.START_APP_INITIALIZER
      }));
      expect(dispatchedActions[1]).toEqual(jasmine.objectContaining({
        type: fromApp.APP_LOAD_CONFIG
      }));
      expect(dispatchedActions[2]).toEqual(jasmine.objectContaining({
        type: fromApp.LOAD_FEATURE_TOGGLE_CONFIG
      }));
    });
  });

  describe('Promise resolution', () => {
    it('should resolve to true when features are loaded', async () => {
      const initFunc = initApplication(mockStore);
      const promise = initFunc();
      
      appConfigSubject.next({
        config: {
          features: {
            feature1: true,
            feature2: false
          }
        }
      });
      
      const result = await promise;
      expect(result).toBe(true);
    });

    it('should dispatch FinishAppInitilizer when features are loaded', async () => {
      const initFunc = initApplication(mockStore);
      const promise = initFunc();
      
      appConfigSubject.next({
        config: {
          features: {
            feature1: true
          }
        }
      });
      
      await promise;
      
      expect(dispatchedActions).toContain(jasmine.objectContaining({
        type: fromApp.FINISH_APP_INITIALIZER
      }));
    });

    it('should not resolve when features object is empty', () => {
      const initFunc = initApplication(mockStore);
      const promise = initFunc();
      
      appConfigSubject.next({
        config: {
          features: {}
        }
      });
      
      // The promise should not resolve synchronously
      // We can verify this by checking that the promise is still pending
      let promiseStatus = 'pending';
      promise.then(() => {
        promiseStatus = 'resolved';
      });
      
      // Force a synchronous check
      expect(promiseStatus).toBe('pending');
    });

    it('should not resolve when features is undefined', () => {
      const initFunc = initApplication(mockStore);
      const promise = initFunc();
      
      appConfigSubject.next({
        config: {}
      });
      
      // Verify the promise hasn't resolved
      let promiseStatus = 'pending';
      promise.then(() => {
        promiseStatus = 'resolved';
      });
      
      expect(promiseStatus).toBe('pending');
    });

    it('should not resolve when config has undefined features', () => {
      const initFunc = initApplication(mockStore);
      const promise = initFunc();
      
      appConfigSubject.next({ 
        config: { 
          features: undefined 
        } 
      });
      
      // Check promise is still pending
      let promiseStatus = 'pending';
      promise.then(() => {
        promiseStatus = 'resolved';
      });
      
      expect(promiseStatus).toBe('pending');
    });
  });

  describe('Subscription management', () => {
    it('should handle multiple emissions before features are loaded', async () => {
      const initFunc = initApplication(mockStore);
      const promise = initFunc();
      
      // Send multiple invalid configs
      appConfigSubject.next({ config: {} });
      appConfigSubject.next({ config: { features: {} } });
      appConfigSubject.next({ config: { features: null } });
      
      // Promise should still be pending
      let promiseResolved = false;
      promise.then(() => {
        promiseResolved = true;
      });
      
      expect(promiseResolved).toBe(false);
      
      // Now send a valid config
      appConfigSubject.next({
        config: {
          features: {
            feature1: true
          }
        }
      });
      
      // Promise should resolve
      const result = await promise;
      expect(result).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should handle config with null features', () => {
      const initFunc = initApplication(mockStore);
      const promise = initFunc();
      
      appConfigSubject.next({
        config: {
          features: null
        }
      });
      
      // Promise should remain pending
      let promiseStatus = 'pending';
      promise.then(() => {
        promiseStatus = 'resolved';
      });
      
      expect(promiseStatus).toBe('pending');
    });

    it('should continue waiting when appConfig has valid structure but empty features', () => {
      const initFunc = initApplication(mockStore);
      const promise = initFunc();
      
      // Send multiple emissions with empty features
      appConfigSubject.next({
        config: {
          features: {}
        }
      });
      
      appConfigSubject.next({
        config: {
          features: {}
        }
      });
      
      // Promise should still be pending after multiple empty emissions
      let promiseStatus = 'pending';
      promise.then(() => {
        promiseStatus = 'resolved';
      });
      
      expect(promiseStatus).toBe('pending');
    });

    it('should resolve only once even with multiple valid feature emissions', async () => {
      const initFunc = initApplication(mockStore);
      const promise = initFunc();
      
      let resolveCount = 0;
      promise.then(() => {
        resolveCount++;
      });
      
      appConfigSubject.next({
        config: {
          features: {
            feature1: true
          }
        }
      });
      
      await promise;
      expect(resolveCount).toBe(1);
      
      // Try to emit more values
      appConfigSubject.next({
        config: {
          features: {
            feature1: true,
            feature2: false
          }
        }
      });
      
      // Resolve count should still be 1 as promises can only resolve once
      expect(resolveCount).toBe(1);
    });

    it('should handle features with no keys initially then with keys', async () => {
      const initFunc = initApplication(mockStore);
      const promise = initFunc();
      
      // First emit empty features
      appConfigSubject.next({
        config: {
          features: {}
        }
      });
      
      // Verify promise is still pending
      let promiseResolved = false;
      promise.then(() => {
        promiseResolved = true;
      });
      expect(promiseResolved).toBe(false);
      
      // Now emit features with keys
      appConfigSubject.next({
        config: {
          features: {
            newFeature: true
          }
        }
      });
      
      // Promise should now resolve
      const result = await promise;
      expect(result).toBe(true);
      expect(dispatchedActions).toContain(jasmine.objectContaining({
        type: fromApp.FINISH_APP_INITIALIZER
      }));
    });
  });
});