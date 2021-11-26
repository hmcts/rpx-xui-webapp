import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { PartyUnavailabilityRange } from '../../../hearings/models/partyUnavilabilityRange.model';
import { HearingValuesStateData } from '../../models/hearingValuesStateData';
import { getHearingUnavailabilityList, getHearingValues, reducers } from '../index';
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
    store = TestBed.get(Store);
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

  describe('getPartiesUnavailableDates', () => {
    it('should return unavailable date ranges', () => {
      let result: PartyUnavailabilityRange[];
      store.pipe(select(getHearingUnavailabilityList)).subscribe(value => {
        result = value;
      });
      expect(result).toEqual(null);
    });
  });
});
