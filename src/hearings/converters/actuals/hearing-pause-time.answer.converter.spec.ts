import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../../hearing.test.data';
import {State} from '../../store/reducers';
import { HearingPauseTimeAnswerConverter } from './hearing-pause-time.answer.converter';

describe('HearingPauseTimeAnswerConverter', () => {

  let hearingPauseTimeAnswerConverter: HearingPauseTimeAnswerConverter;

  beforeEach(() => {
    hearingPauseTimeAnswerConverter = new HearingPauseTimeAnswerConverter();
  });

  it('should transform case name', () => {
    const STATE: State = initialState.hearings;
    const result$ = hearingPauseTimeAnswerConverter.transformAnswer(of(STATE));
    const caseName = 'Jane vs DWP';
    const expected = cold('(b|)', {b: caseName});
    expect(result$).toBeObservable(expected);
  });
});
