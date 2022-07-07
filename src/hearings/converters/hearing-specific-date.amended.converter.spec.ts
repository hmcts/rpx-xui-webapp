import {cold} from 'jasmine-marbles';
import * as _ from 'lodash';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import {HearingSpecificDateAmendedConverter} from './hearing-specific-date.amended.converter';

describe('HearingSpecificDateAmendedConverter', () => {

  let hearingSpecificDateAmendedConverter: HearingSpecificDateAmendedConverter;

  beforeEach(() => {
    hearingSpecificDateAmendedConverter = new HearingSpecificDateAmendedConverter();
  });

  it('should transform hearing specific date amended flag based on selection', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow = {
      dateRangeStart: new Date().toDateString(),
      dateRangeEnd: new Date(new Date().getDay() + 1).toDateString(),
      firstDateTimeMustBe: ''
    };
    const result$ = hearingSpecificDateAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

});
