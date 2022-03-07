import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import { HearingPriorityAmendedConverter } from './hearing-priority.amended.converter';

describe('HearingPriorityAmendedConverter', () => {

  let hearingPriorityAmendedConverter: HearingPriorityAmendedConverter;

  beforeEach(() => {
    hearingPriorityAmendedConverter = new HearingPriorityAmendedConverter();
  });

  it('should transform hearing priority amended flag based on selection', () => {
    const STATE: State = initialState.hearings;
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingPriorityType = 'standard'
    const result$ = hearingPriorityAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

});
