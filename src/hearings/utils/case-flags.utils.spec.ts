import { caseFlagsRefData, serviceHearingValuesModel } from '../hearing.test.data';
import { CaseFlagType, PartyType } from '../models/hearings.enum';
import { AmendmentLabelStatus } from '../models/hearingsUpdateMode.enum';
import { PartyDetailsModel } from '../models/partyDetails.model';
import { PartyFlagsModel } from '../models/partyFlags.model';
import { CaseFlagsUtils } from './case-flags.utils';

describe('CaseFlagsUtils', () => {
  it('should return true if has the right property', () => {
    const caseFlagGroup = CaseFlagsUtils.displayCaseFlagsGroup(serviceHearingValuesModel.caseFlags.flags, caseFlagsRefData, CaseFlagType.REASONABLE_ADJUSTMENT);
    expect(caseFlagGroup.length).toBe(2);
  });

  it('should return false if has not the right property', () => {
    const caseFlagGroup = CaseFlagsUtils.displayCaseFlagsGroup(serviceHearingValuesModel.caseFlags.flags, caseFlagsRefData, CaseFlagType.NON_REASONABLE_ADJUSTMENT);
    expect(caseFlagGroup.length).toBe(3);
  });

  describe('Reasonable adjustments', () => {
    const partiesInHMC: PartyDetailsModel[] = [
      {
        partyID: 'P1',
        partyType: PartyType.IND,
        partyName: 'Jane Smith',
        partyRole: 'APPL',
        individualDetails: {
          firstName: 'Jane',
          lastName: 'Smith',
          reasonableAdjustments: [
            'RA0002'
          ]
        }
      },
      {
        partyID: 'P2',
        partyType: PartyType.IND,
        partyName: 'Jack Ryan',
        partyRole: 'APPL',
        individualDetails: {
          firstName: 'Jack',
          lastName: 'Ryan',
          reasonableAdjustments: [
            'RA0002'
          ]
        }
      }
    ];

    const partiesInSHV: PartyDetailsModel[] = [
      {
        partyID: 'P1',
        partyType: PartyType.IND,
        partyName: 'Jane Butler',
        partyRole: 'APPL',
        individualDetails: {
          firstName: 'Jane',
          lastName: 'Smith',
          reasonableAdjustments: [
            'RA0002'
          ]
        }
      },
      {
        partyID: 'P2',
        partyType: PartyType.IND,
        partyName: 'Jack Ryan',
        partyRole: 'APPL',
        individualDetails: {
          firstName: 'Jack',
          lastName: 'Ryan',
          reasonableAdjustments: [
            'RA0002'
          ]
        }
      },
      {
        partyID: 'P3',
        partyType: PartyType.IND,
        partyName: 'Rob Kennedy',
        partyRole: 'APPL',
        individualDetails: {
          firstName: 'Rob',
          lastName: 'Kennedy',
          reasonableAdjustments: [
            'RA0002'
          ]
        }
      }
    ];

    const caseFlags: PartyFlagsModel[] = [
      {
        partyId: 'P1',
        partyName: 'Jane Smith',
        flagParentId: 'RA0001',
        flagId: 'RA0002',
        flagDescription: 'Sign language interpreter required',
        flagStatus: 'ACTIVE'
      },
      {
        partyId: 'P1',
        partyName: 'Jane Smith',
        flagParentId: 'PF0001',
        flagId: 'PF0015',
        flagDescription: 'Language Interpreter',
        flagStatus: 'ACTIVE'
      },
      {
        partyId: 'P1',
        partyName: 'Jane Smith',
        flagParentId: 'CF0001',
        flagId: 'CF0006',
        flagDescription: 'Potential fraud',
        flagStatus: 'ACTIVE'
      },
      {
        partyId: 'P2',
        partyName: 'Jack Ryan',
        flagParentId: 'RA0001',
        flagId: 'RA0002',
        flagDescription: 'Sign language interpreter required',
        flagStatus: 'ACTIVE'
      },
      {
        partyId: 'P2',
        partyName: 'Jack Ryan',
        flagParentId: 'RA0008',
        flagId: 'RA0042',
        flagDescription: 'Sign language interpreter required',
        flagStatus: 'ACTIVE'
      },
      {
        partyId: 'P3',
        partyName: 'Rob Kennedy',
        flagParentId: 'RA0001',
        flagId: 'RA0002',
        flagDescription: 'Sign language interpreter required',
        flagStatus: 'ACTIVE'
      }
    ];

    it('should return reasonable adjustment flags', () => {
      const flagsGroup = CaseFlagsUtils.getReasonableAdjustmentFlags(caseFlagsRefData, caseFlags, partiesInHMC, partiesInSHV);
      expect(flagsGroup[0].name).toEqual('Jane Butler');
      expect(flagsGroup[0].partyAmendmentLabelStatus).toEqual(AmendmentLabelStatus.AMENDED);
      expect(flagsGroup[0].partyFlags[0].flagAmendmentLabelStatus).toBeUndefined();
      expect(flagsGroup[1].name).toEqual('Jack Ryan');
      expect(flagsGroup[1].partyAmendmentLabelStatus).toEqual(AmendmentLabelStatus.NONE);
      expect(flagsGroup[1].partyFlags[1].flagAmendmentLabelStatus).toEqual(AmendmentLabelStatus.ACTION_NEEDED);
      expect(flagsGroup[2].name).toEqual('Rob Kennedy');
      expect(flagsGroup[2].partyAmendmentLabelStatus).toEqual(AmendmentLabelStatus.ACTION_NEEDED);
      expect(flagsGroup[2].partyFlags[0].flagAmendmentLabelStatus).toBeUndefined();
    });
  });
});
