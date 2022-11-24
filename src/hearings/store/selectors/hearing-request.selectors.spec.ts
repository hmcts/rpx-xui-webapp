import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { reducers } from '../index';
import { initialHearingRequestState, State } from '../reducers';
import { getHearingRequest } from './hearing-request.selectors';

describe('Hearing Request selectors', () => {
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

  describe('getHearingRequest', () => {
    it('should return hearings navigation state', () => {
      let result;
      store.pipe(select(getHearingRequest)).subscribe(value => {
        result = value;
      });
      expect(result).toEqual(initialHearingRequestState);
    });
  });

});
