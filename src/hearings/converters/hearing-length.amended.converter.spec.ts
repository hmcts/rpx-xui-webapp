import {cold} from 'jasmine-marbles';
import * as _ from 'lodash';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {State} from '../store/reducers';
import { HearingLengthAmendedConverter } from './hearing-length.amended.converter';

describe('HearingLengthAmendedConverter', () => {

  let hearingLengthAmendedConverter: HearingLengthAmendedConverter;

  beforeEach(() => {
    hearingLengthAmendedConverter = new HearingLengthAmendedConverter();
  });

  it('should transform hearing length amended flag based on selection', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.duration = 30;
    const result$ = hearingLengthAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });

});
