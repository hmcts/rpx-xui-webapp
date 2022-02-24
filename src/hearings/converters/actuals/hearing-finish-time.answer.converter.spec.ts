import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../../hearing.test.data';
import {State} from '../../store/reducers';
import { HearingFinishTimeAnswerConverter } from './hearing-finish-time.answer.converter';

describe('HearingFinishTimeAnswerConverter', () => {

  let hearingFinishTimeAnswerConverter: HearingFinishTimeAnswerConverter;

  beforeEach(() => {
    hearingFinishTimeAnswerConverter = new HearingFinishTimeAnswerConverter();
  });

  it('should transform case name', () => {
    const STATE: State = initialState.hearings;
    const result$ = hearingFinishTimeAnswerConverter.transformAnswer(of(STATE));
    const caseName = 'Jane vs DWP';
    const expected = cold('(b|)', {b: caseName});
    expect(result$).toBeObservable(expected);
  });
});
