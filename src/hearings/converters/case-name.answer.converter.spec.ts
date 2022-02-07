import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {initialState} from '../hearing.test.data';
import {CaseNameAnswerConverter} from './case-name.answer.converter';

describe('CaseNameAnswerConverter', () => {

  let caseNameAnswerConverter: CaseNameAnswerConverter;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ]
    });
    store = TestBed.get(Store);
    caseNameAnswerConverter = new CaseNameAnswerConverter(store);
  });

  it('should transform case name', () => {
    const result$ = caseNameAnswerConverter.transformAnswer();
    const caseName = 'Jane vs DWP';
    const expected = cold('b', {b: caseName});
    expect(result$).toBeObservable(expected);
  });

});
