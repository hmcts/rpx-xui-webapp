import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { DateRequestSubmittedTimeAnswerConverter } from './date-request-submitted-time.answer.converter';

describe('DateRequestSubmittedTimeAnswerConverter', () => {

  let dateRequestSubmittedTimeAnswerConverter: DateRequestSubmittedTimeAnswerConverter;

  beforeEach(() => {
    dateRequestSubmittedTimeAnswerConverter = new DateRequestSubmittedTimeAnswerConverter();
  });

  it('should transform type from request', () => {
    const STATE: State = initialState.hearings;
    const result$ = dateRequestSubmittedTimeAnswerConverter.transformAnswer(of(STATE));
    const type = '09:11';
    const expected = cold('(b|)', { b: type });
    expect(result$).toBeObservable(expected);
  });

});
