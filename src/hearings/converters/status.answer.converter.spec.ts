import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { EXUIDisplayStatusEnum, HMCStatus } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { StatusAnswerConverter } from './status.answer.converter';

describe('StatusAnswerConverter', () => {
  let statusAnswerConverter: StatusAnswerConverter;

  beforeEach(() => {
    statusAnswerConverter = new StatusAnswerConverter();
  });

  it('should transform status from request', () => {
    const STATE: State = initialState.hearings;
    const result$ = statusAnswerConverter.transformAnswer(of(STATE));
    const status = EXUIDisplayStatusEnum.LISTED;
    const expected = cold('(b|)', { b: status });
    expect(result$).toBeObservable(expected);
  });

  it('should return an empty status when the request status is not mapped', () => {
    const state: State = {
      ...initialState.hearings,
      hearingRequest: {
        ...initialState.hearings.hearingRequest,
        hearingRequestMainModel: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel,
          requestDetails: {
            ...initialState.hearings.hearingRequest.hearingRequestMainModel.requestDetails,
            status: 'UNKNOWN_STATUS' as HMCStatus,
          },
        },
      },
    };

    expect(statusAnswerConverter.transformAnswer(of(state))).toBeObservable(cold('(b|)', { b: '' }));
  });
});
