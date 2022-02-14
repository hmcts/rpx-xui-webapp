import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import {CaseNumberAnswerConverter} from './case-number.answer.converter';

describe('CaseNumberAnswerConverter', () => {

  let caseNumberAnswerConverter: CaseNumberAnswerConverter;

  beforeEach(() => {
    caseNumberAnswerConverter = new CaseNumberAnswerConverter();
  });

  it('should transform case number', () => {
    const STATE: State = initialState.hearings;
    const result$ = caseNumberAnswerConverter.transformAnswer(of(STATE));
    const caseNumber = '1111-2222-3333-4444';
    const expected = cold('(b|)', {b: caseNumber});
    expect(result$).toBeObservable(expected);
  });

});
