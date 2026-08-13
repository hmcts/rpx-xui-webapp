import { cold } from 'jasmine-marbles';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { NeedWelshAmendedConverter } from './need-welsh.amended.converter';

describe('NeedWelshAmendedConverter', () => {
  let needWelshAmendedConverter: NeedWelshAmendedConverter;

  beforeEach(() => {
    needWelshAmendedConverter = new NeedWelshAmendedConverter();
  });

  it('should transform need welsh flag based on selection', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingInWelshFlag = true;
    STATE.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.hearingInWelshFlag = true;
    const result$ = needWelshAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', { b: isAmended });
    expect(result$).toBeObservable(expected);
  });
});
