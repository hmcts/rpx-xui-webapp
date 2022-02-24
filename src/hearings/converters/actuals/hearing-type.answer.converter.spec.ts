import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../../hearing.test.data';
import {State} from '../../store/reducers';
import { HearingTypeAnswerConverter } from './hearing-type.answer.converter';

describe('HearingTypeAnswerConverter', () => {

  let hearingTypeAnswerConverter: HearingTypeAnswerConverter;

  beforeEach(() => {
    hearingTypeAnswerConverter = new HearingTypeAnswerConverter();
  });

  it('should transform case name', () => {
    const STATE: State = initialState.hearings;
    const result$ = hearingTypeAnswerConverter.transformAnswer(of(STATE));
    const caseName = 'Jane vs DWP';
    const expected = cold('(b|)', {b: caseName});
    expect(result$).toBeObservable(expected);
  });
});
