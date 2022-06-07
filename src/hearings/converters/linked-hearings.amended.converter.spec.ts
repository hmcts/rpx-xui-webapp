import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store';
import { LinkedHearingsAmendedConverter } from './linked-hearings.amended.converter';

describe('LinkedHearingsAmendedConverter', () => {
  let converter: LinkedHearingsAmendedConverter;

  beforeEach(() => {
    converter = new LinkedHearingsAmendedConverter();
  });

  it('should transform to yes', () => {
    const STATE: State = initialState.hearings;
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingIsLinkedFlag = true;
    const result$ = converter.transformIsAmended(of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', { b: isAmended });
    expect(result$).toBeObservable(expected);
  });
});
