import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../../hearing.test.data';
import {State} from '../../store/reducers';
import { HearingResultAnswerConverter } from './hearing-result.answer.converter';

describe('HearingResultAnswerConverter', () => {

  let hearingResultAnswerConverter: HearingResultAnswerConverter;

  beforeEach(() => {
    hearingResultAnswerConverter = new HearingResultAnswerConverter();
  });

  it('should transform case name', () => {
    const STATE: State = initialState.hearings;
    const result$ = hearingResultAnswerConverter.transformAnswer(of(STATE));
    const caseName = 'Jane vs DWP';
    const expected = cold('(b|)', {b: caseName});
    expect(result$).toBeObservable(expected);
  });
});
