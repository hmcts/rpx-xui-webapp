import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { reducers } from '../index';
import { initialHearingListState, State } from '../reducers';
import { getHearingList } from './hearing-list.selectors';

describe('Hearing List selectors', () => {
  let store: Store<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('hearings', reducers)
      ]
    });
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getHearingList', () => {
    it('should return hearings navigation state', () => {
      let result;
      store.pipe(select(getHearingList)).subscribe((value) => {
        result = value;
      });
      expect(result).toEqual(initialHearingListState);
    });
  });
});
