import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import { HearingSpecificDateAmendedConverter } from './hearing-specific-date.amended.converter';

describe('HearingSpecificDateAmendedConverter', () => {

  let hearingSpecificDateAmendedConverter: HearingSpecificDateAmendedConverter;

  beforeEach(() => {
    hearingSpecificDateAmendedConverter = new HearingSpecificDateAmendedConverter();
  });

  it('should transform hearing specific date amended flag based on selection', () => {
    const STATE: State = initialState.hearings;
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow.hearingWindowDateRange = {
      hearingWindowStartDateRange: new Date().toDateString(),
      hearingWindowEndDateRange: new Date(new Date().getDay() + 1).toDateString(),
    }
    const result$ = hearingSpecificDateAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

});
