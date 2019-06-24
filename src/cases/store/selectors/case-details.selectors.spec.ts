import * as fromRoot from '../../../app/store';
import { Store, StoreModule, combineReducers, select } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import * as fromCaseCreate from '../../store';
import * as fromActions from '../actions/create-case.action';

describe('App Selectors', () => {
    let store: Store<fromRoot.RouterStateUrl>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
            ],
          });
    });

    it('should return app feature state', () => {
        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();
        let caseId;
        store.pipe(select(fromCaseCreate.getCaseId))
        .subscribe(cId => caseId = cId);
        store.dispatch(new fromActions.ApplyChange({status: null, caseId: 1234}));
        expect(caseId).toBeUndefined();
      });

});
