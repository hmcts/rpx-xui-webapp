import {KEY_MODE} from '../models/hearingConditions';
import {Mode} from '../models/hearings.enum';
import {HearingsUtils} from './hearings.utils';

describe('HearingsUtils', () => {

  it('should return true if has the right property', () => {
    const evaluateResult = HearingsUtils.hasPropertyAndValue({mode: Mode.CREATE}, KEY_MODE, Mode.CREATE);
    expect(evaluateResult).toBeTruthy();
  });

  it('should return false if has not the right property', () => {
    const evaluateResult = HearingsUtils.hasPropertyAndValue({mode: Mode.VIEW_EDIT}, KEY_MODE, Mode.CREATE);
    expect(evaluateResult).toBeFalsy();
  });

});
