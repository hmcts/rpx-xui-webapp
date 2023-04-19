import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { DateResponseSubmittedMultiDayAnswerConverter } from './date-response-submitted-multi-day.answer.converter';

describe('DateResponseSubmittedMultiDayAnswerConverter', () => {
  let dateResponseSubmittedMultiDayAnswerConverter: DateResponseSubmittedMultiDayAnswerConverter;

  beforeEach(() => {
    dateResponseSubmittedMultiDayAnswerConverter = new DateResponseSubmittedMultiDayAnswerConverter();
  });

  it('should transform type from request', () => {
    const STATE: State = initialState.hearings;
    const result$ = dateResponseSubmittedMultiDayAnswerConverter.transformAnswer(of(STATE));
    const type = '12 December 2022 - 12 December 2022';
    const expected = cold('(b|)', { b: type });
    expect(result$).toBeObservable(expected);
  });
});
