import {caseFlagsRefData, serviceHearingValuesModel} from '../hearing.test.data';
import {CaseFlagType} from '../models/hearings.enum';
import {CaseFlagsUtils} from './case-flags.utils';

describe('CaseFlagsUtils', () => {

  it('should return true if has the right property', () => {
    const caseFlagGroup = CaseFlagsUtils.displayCaseFlagsGroup(serviceHearingValuesModel.caseFlags.flags, caseFlagsRefData, CaseFlagType.REASONABLE_ADJUSTMENT);
    expect(caseFlagGroup.length).toBe(2);
  });

  it('should return false if has not the right property', () => {
    const caseFlagGroup = CaseFlagsUtils.displayCaseFlagsGroup(serviceHearingValuesModel.caseFlags.flags, caseFlagsRefData, CaseFlagType.NON_REASONABLE_ADJUSTMENT);
    expect(caseFlagGroup.length).toBe(3);
  });

});
