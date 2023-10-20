import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { reducers } from '../index';
import { State } from '../reducers';
import { getHearingJudgeIds } from './hearing-judges.selectors';

describe('Hearing Judges selectors', () => {
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

  describe('getHearingJudgeIds', () => {
    it('should return hearing judge ids', () => {
      let result = null;
      store.pipe(select(getHearingJudgeIds)).subscribe((value) => {
        result = value;
      });
      expect(result).toEqual([]);
    });
  });
});
