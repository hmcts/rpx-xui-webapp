import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { DateResponseSubmittedTimeAnswerConverter } from './date-response-submitted-time.answer.converter';

describe('DateResponseSubmittedTimeAnswerConverter', () => {
  let dateRequestSubmittedTimeAnswerConverter: DateResponseSubmittedTimeAnswerConverter;

  beforeEach(() => {
    dateRequestSubmittedTimeAnswerConverter = new DateResponseSubmittedTimeAnswerConverter();
  });

  it('should transform type from request', () => {
    const STATE: State = initialState.hearings;
    const result$ = dateRequestSubmittedTimeAnswerConverter.transformAnswer(of(STATE), 0);
    const type = '09:00';
    const expected = cold('(b|)', { b: type });
    expect(result$).toBeObservable(expected);
  });
});
