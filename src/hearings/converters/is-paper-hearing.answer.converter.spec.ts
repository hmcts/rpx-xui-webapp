import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { IsPaperHearingAnswerConverter } from './is-paper-hearing.answer.converter';

describe('IsPaperHearingAnswerConverter', () => {

  let isPaperHearingAnswerConverter: IsPaperHearingAnswerConverter;

  beforeEach(() => {
    isPaperHearingAnswerConverter = new IsPaperHearingAnswerConverter();
  });

  it('should transform paper hearing answer', () => {
    const STATE: State = initialState.hearings;
    const result$ = isPaperHearingAnswerConverter.transformAnswer(of(STATE));
    const paperHearing = 'No';
    const expected = cold('(b|)', { b: paperHearing });
    expect(result$).toBeObservable(expected);
  });

});
