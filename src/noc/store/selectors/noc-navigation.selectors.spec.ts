import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { reducers } from '../index';
import { NocNavigationState, initialState } from '../reducers';
import { getNocNavigationState, previousNavigation, currentNavigation, nextNavigation } from './noc-navigation.selectors';

describe('Search filter selectors', () => {
  let store: Store<NocNavigationState>;
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

  describe('getNocNavigationState', () => {
    it('should return noc navigation state', () => {
      let result;
      store.pipe(select(getNocNavigationState)).subscribe(value => {
        result = value;
      });
      expect(result).toEqual(initialState);
    });
  });

});
