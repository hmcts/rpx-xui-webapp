import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { DateResponseSubmittedAnswerConverter } from './date-response-submitted.answer.converter';

describe('DateResponseSubmittedAnswerConverter', () => {

  let dateRequestSubmittedTimeAnswerConverter: DateResponseSubmittedAnswerConverter;

  beforeEach(() => {
    dateRequestSubmittedTimeAnswerConverter = new DateResponseSubmittedAnswerConverter();
  });

  it('should transform type from request', () => {
    const STATE: State = initialState.hearings;
    const result$ = dateRequestSubmittedTimeAnswerConverter.transformAnswer(of(STATE));
    const type = '30 November 2021';
    const expected = cold('(b|)', { b: type });
    expect(result$).toBeObservable(expected);
  });

});
