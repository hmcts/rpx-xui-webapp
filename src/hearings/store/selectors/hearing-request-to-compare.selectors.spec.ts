import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { reducers } from '../index';
import { initialHearingRequestState, State } from '../reducers';
import { getHearingRequestToCompare } from './hearing-request-to-compare.selectors';

describe('Hearing Request to compare selectors', () => {
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

  describe('getHearingRequestToCompare', () => {
    it('should return hearings request to compare state', () => {
      store.pipe(select(getHearingRequestToCompare)).subscribe((value) => {
        expect(value).toEqual(initialHearingRequestState);
      });
    });
  });
});
