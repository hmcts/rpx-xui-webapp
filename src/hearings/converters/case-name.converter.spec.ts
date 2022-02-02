import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {initialState} from '../hearing.test.data';
import {CaseNameConverter} from './case-name.converter';

describe('CaseNameConverter', () => {

  let caseNameConverter: CaseNameConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    caseNameConverter = new CaseNameConverter(store);
  });

  it('should transform case name', () => {
    const result$ = caseNameConverter.transformAnswer();
    const caseName = 'Jane vs DWP';
    const expected = cold('b', {b: caseName});
    expect(result$).toBeObservable(expected);
  });

});
