import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { DateResponseReceivedAnswerConverter } from './date-response-received.answer.converter';

describe('DateResponseReceivedAnswerConverter', () => {

  let dateRequestSubmittedAnswerConverter: DateResponseReceivedAnswerConverter;

  beforeEach(() => {
    dateRequestSubmittedAnswerConverter = new DateResponseReceivedAnswerConverter();
  });

  it('should transform type from request', () => {
    const STATE: State = initialState.hearings;
    const result$ = dateRequestSubmittedAnswerConverter.transformAnswer(of(STATE));
    const type = '30 November 2021';
    const expected = cold('(b|)', { b: type });
    expect(result$).toBeObservable(expected);
  });

});
