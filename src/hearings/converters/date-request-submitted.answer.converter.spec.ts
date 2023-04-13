import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { DateRequestSubmittedAnswerConverter } from './date-request-submitted.answer.converter';

describe('DateRequestSubmittedAnswerConverter', () => {
  let dateRequestSubmittedAnswerConverter: DateRequestSubmittedAnswerConverter;

  beforeEach(() => {
    dateRequestSubmittedAnswerConverter = new DateRequestSubmittedAnswerConverter();
  });

  it('should transform type from request', () => {
    const STATE: State = initialState.hearings;
    const result$ = dateRequestSubmittedAnswerConverter.transformAnswer(of(STATE));
    const type = '30 November 2021';
    const expected = cold('(b|)', { b: type });
    expect(result$).toBeObservable(expected);
  });
});
