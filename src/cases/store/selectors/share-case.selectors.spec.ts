import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { CaseListComponent } from '../../containers';
import { getShareCaseListState, reducers, State } from '../index';

describe('Share case selectors', () => {
  let store: Store<State>;
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
      const caseListComponent = new CaseListComponent(store, null, null, null, null, null, null);
      caseListComponent.selectedCases = [{
        case_id: '1',
        case_fields: {
          solsSolicitorAppReference: 'James123'
        }
      }, {
        case_id: '2',
        case_fields: {
          solsSolicitorAppReference: 'Steve321'
        }
      }];
      caseListComponent.shareCaseSubmit();
      let result = [];
      store.pipe(select(getShareCaseListState)).subscribe(value => {
        result = value;
      });
      expect(result.length).toEqual(2);
    });
  });

});
