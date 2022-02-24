import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../../hearing.test.data';
import {State} from '../../store/reducers';
import { HearingTypeReasonAnswerConverter } from './hearing-type-reason.answer.converter';

describe('HearingTypeReasonAnswerConverter', () => {

  let hearingTypeReasonAnswerConverter: HearingTypeReasonAnswerConverter;

  beforeEach(() => {
    hearingTypeReasonAnswerConverter = new HearingTypeReasonAnswerConverter();
  });

  it('should transform case name', () => {
    const STATE: State = initialState.hearings;
    const result$ = hearingTypeReasonAnswerConverter.transformAnswer(of(STATE));
    const caseName = 'Jane vs DWP';
    const expected = cold('(b|)', {b: caseName});
    expect(result$).toBeObservable(expected);
  });
});
