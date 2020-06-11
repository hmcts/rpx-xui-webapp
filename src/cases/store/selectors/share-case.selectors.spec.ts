import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { getCaseShareState, getShareCaseListState, reducers, ShareCasesState } from '../index';

describe('Share case selectors', () => {
  let store: Store<ShareCasesState>;
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

  describe('get share case state', () => {
    it('should return search state', () => {
      let result = [];
      store.pipe(select(getShareCaseListState)).subscribe(value => {
        result = value;
      });
      expect(result.length).toEqual(2);
    });
  });

});
