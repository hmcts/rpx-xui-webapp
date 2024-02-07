import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { CaseNameAnswerConverter } from './case-name.answer.converter';

describe('CaseNameAnswerConverter', () => {
  let caseNameAnswerConverter: CaseNameAnswerConverter;

  beforeEach(() => {
    caseNameAnswerConverter = new CaseNameAnswerConverter();
  });

  it('should transform case name', () => {
    const STATE: State = initialState.hearings;
    const result$ = caseNameAnswerConverter.transformAnswer(of(STATE));
    const caseName = 'Jane Smith vs DWP';
    const expected = cold('(b|)', { b: caseName });
    expect(result$).toBeObservable(expected);
  });
});
