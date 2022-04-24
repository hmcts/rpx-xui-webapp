import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { DateRequestFailedAnswerConverter } from './date-request-failed.answer.converter';

describe('DateRequestFailedAnswerConverter', () => {
  let dateRequestSubmittedAnswerConverter: DateRequestFailedAnswerConverter;

  beforeEach(() => {
    dateRequestSubmittedAnswerConverter = new DateRequestFailedAnswerConverter();
  });

  it('should transform error timestamp from request', () => {
    const STATE: State = initialState.hearings;
    STATE.hearingRequest.hearingRequestMainModel.hearingResponse.errorTimestamp = STATE.hearingRequest.hearingRequestMainModel.hearingResponse.receivedDateTime;
    const result$ = dateRequestSubmittedAnswerConverter.transformAnswer(of(STATE));
    const type = '30 November 2022 09:11:00';
    const expected = cold('(b|)', { b: type });
    expect(result$).toBeObservable(expected);
  });

});
