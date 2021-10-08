import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { reducers } from '../index';
import { initialState, State } from '../reducers';
import { getHearingsList } from './hearings.selectors';

describe('Hearings selectors', () => {
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

  describe('getHearingsList', () => {
    it('should return hearings navigation state', () => {
      let result;
      store.pipe(select(getHearingsList)).subscribe(value => {
        result = value;
      });
      expect(result).toEqual(initialState);
    });
  });

});
