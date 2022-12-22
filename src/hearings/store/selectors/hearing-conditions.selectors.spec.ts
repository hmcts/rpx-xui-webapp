import {TestBed} from '@angular/core/testing';
import {select, Store, StoreModule} from '@ngrx/store';
import {reducers} from '../index';
import {State} from '../reducers';
import {getHearingConditions} from './hearing-conditions.selectors';

describe('Hearing Conditions selectors', () => {
  let store: Store<State>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('hearings', reducers),
      ],
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getHearingConditions', () => {
    it('should return hearings navigation state', () => {
      let result = null;
      store.pipe(select(getHearingConditions)).subscribe(value => {
        result = value;
      });
      expect(result).toEqual({});
    });
  });

});
