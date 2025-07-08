import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { HearingIdAnswerConverter } from './hearing-id.converter';

describe('CaseNameAnswerConverter', () => {
  let hearingIdAnswerConverter: HearingIdAnswerConverter;

  beforeEach(() => {
    hearingIdAnswerConverter = new HearingIdAnswerConverter();
  });

  it('should transform hearing id', () => {
    const STATE: State = initialState.hearings;
    const result$ = hearingIdAnswerConverter.transformAnswer(of(STATE));
    const hearingId = '1000000';
    const expected = cold('(b|)', { b: hearingId });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hearing id when hearings amendment is enabled', () => {
    const STATE = {
      ...initialState.hearings,
      hearingConditions: {
        ...initialState.hearings.hearingConditions,
        isHearingAmendmentsEnabled: true
      },
      hearingRequestToCompare: {
        ...initialState.hearings.hearingRequestToCompare,
        hearingRequestMainModel: {
          ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel,
          caseDetails: {
            ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel.caseDetails
          }
        }
      }
    };
    const result$ = hearingIdAnswerConverter.transformAnswer(of(STATE));
    const hearingId = '1000000';
    const expected = cold('(b|)', { b: hearingId });
    expect(result$).toBeObservable(expected);
  });
});
