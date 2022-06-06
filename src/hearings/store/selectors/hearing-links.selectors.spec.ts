import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { getHearingLinks, reducers } from '../index';
import { initialHearingLinksState, State } from '../reducers';

// Check testing
describe('Hearing Links selectors', () => {
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

  // Check testing
describe('getHearingLinks', () => {
    it('should return hearings links state', () => {
      let result;
      store.pipe(select(getHearingLinks)).subscribe(value => {
        result = value;
      });
      expect(result).toEqual(initialHearingLinksState);
    });
  });

});
