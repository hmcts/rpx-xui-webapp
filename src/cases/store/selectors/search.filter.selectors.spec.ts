import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { reducers } from '../index';
import { initialSearchState, SearchState } from '../reducers';
import { getSearchState } from './search.filter.selectors';

describe('Search filter selectors', () => {
  let store: Store<SearchState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cases', reducers),
      ],
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getSearchState', () => {
    it('should return search state', () => {
      let result;
      store.pipe(select(getSearchState)).subscribe(value => {
        result = value;
      });
      expect(result).toEqual(initialSearchState);
    });
  });

});
