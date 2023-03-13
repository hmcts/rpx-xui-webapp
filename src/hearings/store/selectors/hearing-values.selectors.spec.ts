import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { HearingValuesStateData } from '../../models/hearingValuesStateData';
import { getHearingValues, reducers } from '../index';
import { initialHearingValuesState, State } from '../reducers';

describe('Hearing Values selectors', () => {
  let store: Store<State>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('hearings', reducers),
      ],
    });
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getHearingValues', () => {
    it('should return hearing values state', () => {
      let result: HearingValuesStateData;
      store.pipe(select(getHearingValues)).subscribe(value => {
        result = value;
      });
      expect(result).toEqual(initialHearingValuesState);
    });
  });
});
