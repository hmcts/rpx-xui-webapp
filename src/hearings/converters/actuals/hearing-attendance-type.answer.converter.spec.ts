import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../../hearing.test.data';
import {State} from '../../store/reducers';
import { HearingAttendanceTypeAnswerConverter } from './hearing-attendance-type.answer.converter';

describe('HearingAttendanceTypeAnswerConverter', () => {

  let hearingAttendanceTypeAnswerConverter: HearingAttendanceTypeAnswerConverter;

  beforeEach(() => {
    hearingAttendanceTypeAnswerConverter = new HearingAttendanceTypeAnswerConverter();
  });

  it('should transform case name', () => {
    const STATE: State = initialState.hearings;
    const result$ = hearingAttendanceTypeAnswerConverter.transformAnswer(of(STATE));
    const caseName = 'Jane vs DWP';
    const expected = cold('(b|)', {b: caseName});
    expect(result$).toBeObservable(expected);
  });
});
