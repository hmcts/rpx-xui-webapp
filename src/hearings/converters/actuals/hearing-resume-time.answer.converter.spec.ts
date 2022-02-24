import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../../hearing.test.data';
import {State} from '../../store/reducers';
import { HearingResumeTimeAnswerConverter } from './hearing-resume-time.answer.converter';

describe('HearingResumeTimeAnswerConverter', () => {

  let hearingResumeTimeAnswerConverter: HearingResumeTimeAnswerConverter;

  beforeEach(() => {
    hearingResumeTimeAnswerConverter = new HearingResumeTimeAnswerConverter();
  });

  it('should transform case name', () => {
    const STATE: State = initialState.hearings;
    const result$ = hearingResumeTimeAnswerConverter.transformAnswer(of(STATE));
    const caseName = 'Jane vs DWP';
    const expected = cold('(b|)', {b: caseName});
    expect(result$).toBeObservable(expected);
  });
});
