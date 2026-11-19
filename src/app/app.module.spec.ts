import { TestBed } from '@angular/core/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import { STORE_RUNTIME_CHECKS } from './app.module';

interface TestState {
  nested: {
    count: number;
  };
}

interface TestAction extends Action {
  nested?: {
    count: number;
  };
}

const initialState: TestState = {
  nested: {
    count: 0,
  },
};

function testReducer(state = initialState, action: TestAction): TestState {
  if (action.type === 'replace state' && action.nested) {
    return {
      nested: {
        count: action.nested.count,
      },
    };
  }

  return state;
}

describe('AppModule', () => {
  let store: Store<{ test: TestState }>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {},
          {
            runtimeChecks: STORE_RUNTIME_CHECKS,
          }
        ),
        StoreModule.forFeature('test', testReducer),
      ],
    });

    store = TestBed.inject(Store);
  });

  it('should enable StoreModule state immutability checks', () => {
    let currentState: TestState | undefined;
    const subscription = store.select('test').subscribe((state) => {
      currentState = state;
    });

    store.dispatch({ type: 'replace state', nested: { count: 1 } });

    expect(Object.isFrozen(currentState)).toBeTrue();
    expect(Object.isFrozen(currentState?.nested)).toBeTrue();

    subscription.unsubscribe();
  });

  it('should enable StoreModule action immutability checks', () => {
    const action: TestAction = { type: 'replace state', nested: { count: 1 } };

    store.dispatch(action);

    expect(Object.isFrozen(action)).toBeTrue();
    expect(Object.isFrozen(action.nested)).toBeTrue();
  });
});
