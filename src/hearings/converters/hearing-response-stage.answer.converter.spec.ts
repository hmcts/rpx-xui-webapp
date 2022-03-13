import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { LaCaseStatus } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { HearingResponseStageAnswerConverter } from './hearing-response-stage.answer.converter';

describe('HearingResponseStageAnswerConverter', () => {

  let hearingResponseStageAnswerConverter: HearingResponseStageAnswerConverter;

  beforeEach(() => {
    hearingResponseStageAnswerConverter = new HearingResponseStageAnswerConverter();
  });

  it('should transform type from request', () => {
    const STATE: State = initialState.hearings;
    const result$ = hearingResponseStageAnswerConverter.transformAnswer(of(STATE));
    const type = LaCaseStatus.AWAITING_LISTING;
    const expected = cold('(b|)', { b: type });
    expect(result$).toBeObservable(expected);
  });

});
