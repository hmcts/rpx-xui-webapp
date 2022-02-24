import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../../hearing.test.data';
import {State} from '../../store/reducers';
import { HearingDateAnswerConverter } from './hearing-date.answer.converter';

describe('HearingDateAnswerConverter', () => {

  let hearingDateAnswerConverter: HearingDateAnswerConverter;

  beforeEach(() => {
    hearingDateAnswerConverter = new HearingDateAnswerConverter();
  });

  it('should transform case name', () => {
    const STATE: State = initialState.hearings;
    const result$ = hearingDateAnswerConverter.transformAnswer(of(STATE));
    const caseName = 'Jane vs DWP';
    const expected = cold('(b|)', {b: caseName});
    expect(result$).toBeObservable(expected);
  });
});
