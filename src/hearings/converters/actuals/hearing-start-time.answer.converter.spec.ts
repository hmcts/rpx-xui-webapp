import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../../hearing.test.data';
import {State} from '../../store/reducers';
import { HearingStartTimeAnswerConverter } from './hearing-start-time.answer.converter';

describe('HearingStartTimeAnswerConverter', () => {

  let hearingStartTimeAnswerConverter: HearingStartTimeAnswerConverter;

  beforeEach(() => {
    hearingStartTimeAnswerConverter = new HearingStartTimeAnswerConverter();
  });

  it('should transform case name', () => {
    const STATE: State = initialState.hearings;
    const result$ = hearingStartTimeAnswerConverter.transformAnswer(of(STATE));
    const caseName = 'Jane vs DWP';
    const expected = cold('(b|)', {b: caseName});
    expect(result$).toBeObservable(expected);
  });
});
