import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { reducers } from '../index';
import { initialState, State } from '../reducers';
import { getNocState } from './noc.selectors';

describe('Noc selectors', () => {
  let store: Store<State>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('noc', reducers),
      ],
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getNocState', () => {
    it('should return noc navigation state', () => {
      let result;
      store.pipe(select(getNocState)).subscribe(value => {
        result = value;
      });
      expect(result).toEqual(initialState);
    });
  });

});
