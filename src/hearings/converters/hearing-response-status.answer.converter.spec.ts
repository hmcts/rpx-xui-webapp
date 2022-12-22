import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { LaCaseStatus } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { HearingResponseStatusAnswerConverter } from './hearing-response-status.answer.converter';

describe('HearingResponseStageAnswerConverter', () => {

  let hearingResponseStatusAnswerConverter: HearingResponseStatusAnswerConverter;

  beforeEach(() => {
    hearingResponseStatusAnswerConverter = new HearingResponseStatusAnswerConverter();
  });

  it('should transform type from request', () => {
    const STATE: State = initialState.hearings;
    const result$ = hearingResponseStatusAnswerConverter.transformAnswer(of(STATE));
    const type = LaCaseStatus.PENDING_RELISTING;
    const expected = cold('(b|)', { b: type });
    expect(result$).toBeObservable(expected);
  });
});
