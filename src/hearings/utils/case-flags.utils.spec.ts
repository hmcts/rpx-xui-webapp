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

  describe('Non-reasonable adjustments', () => {
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
          lastName: 'Ryan'
        }
      },
      {
        partyID: 'P3',
        partyType: PartyType.IND,
        partyName: 'Rob Kennedy',
        partyRole: 'APPL',
        individualDetails: {
          firstName: 'Rob',
          lastName: 'Kennedy'
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
          lastName: 'Ryan'
        }
      },
      {
        partyID: 'P3',
        partyType: PartyType.IND,
        partyName: 'Rob Kennedy',
        partyRole: 'APPL',
        individualDetails: {
          firstName: 'Rob',
          lastName: 'Kennedy'
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
        flagParentId: null,
        flagId: 'CF0006',
        flagDescription: 'Potential fraud',
        flagStatus: 'ACTIVE',
        dateTimeCreated: '2023-12-19T09:00:00.000Z'
      },
      {
        partyId: 'P2',
        partyName: 'Jack Ryan',
        flagParentId: null,
        flagId: 'PF0002',
        flagDescription: 'Vulnerable user',
        flagStatus: 'ACTIVE',
        dateTimeModified: '2023-12-19T09:00:00.000Z'
      },
      {
        partyId: 'P2',
        partyName: 'Jack Ryan',
        flagParentId: null,
        flagId: 'CF0002',
        flagDescription: 'Complex Case',
        flagStatus: 'ACTIVE',
        dateTimeCreated: '2023-12-17T09:00:00.000Z'
      },
      {
        partyId: 'P3',
        partyName: 'Rob Kennedy',
        flagParentId: null,
        flagId: 'CF0007',
        flagDescription: 'Urgent Case',
        flagStatus: 'ACTIVE',
        dateTimeModified: '2023-12-17T09:00:00.000Z'
      }
    ];

    const requestDetails = {
      timestamp: '2023-12-18T09:00:00.000Z',
      versionNumber: 1
    };

    it('should return non-reasonable adjustment flags with labels', () => {
      const flagsGroup = CaseFlagsUtils.getNonReasonableAdjustmentFlags(caseFlagsRefData, caseFlags,
        partiesInHMC, partiesInSHV, requestDetails, false);
      expect(flagsGroup[0].name).toEqual('Jane Butler');
      expect(flagsGroup[0].partyAmendmentLabelStatus).toEqual(AmendmentLabelStatus.AMENDED);
      expect(flagsGroup[0].partyFlags[0].flagAmendmentLabelStatus).toBeUndefined();
      expect(flagsGroup[0].partyFlags[1].flagAmendmentLabelStatus).toBeUndefined();
      expect(flagsGroup[0].partyFlags[2].flagAmendmentLabelStatus).toEqual(AmendmentLabelStatus.ACTION_NEEDED);
      expect(flagsGroup[1].name).toEqual('Jack Ryan');
      expect(flagsGroup[1].partyAmendmentLabelStatus).toEqual(AmendmentLabelStatus.NONE);
      expect(flagsGroup[1].partyFlags[0].flagAmendmentLabelStatus).toEqual(AmendmentLabelStatus.ACTION_NEEDED);
      expect(flagsGroup[0].partyFlags[1].flagAmendmentLabelStatus).toBeUndefined();
      expect(flagsGroup[2].name).toEqual('Rob Kennedy');
      expect(flagsGroup[2].partyAmendmentLabelStatus).toEqual(AmendmentLabelStatus.NONE);
      expect(flagsGroup[2].partyFlags[0].flagAmendmentLabelStatus).toBeUndefined();
    });

    it('should return non-reasonable adjustment flags with no labels', () => {
      const flagsGroup = CaseFlagsUtils.getNonReasonableAdjustmentFlags(caseFlagsRefData, caseFlags,
        partiesInHMC, partiesInSHV, requestDetails, true);
      expect(flagsGroup[0].name).toEqual('Jane Butler');
      expect(flagsGroup[0].partyAmendmentLabelStatus).toEqual(AmendmentLabelStatus.NONE);
      expect(flagsGroup[0].partyFlags[0].flagAmendmentLabelStatus).toBeUndefined();
      expect(flagsGroup[0].partyFlags[1].flagAmendmentLabelStatus).toBeUndefined();
      expect(flagsGroup[0].partyFlags[2].flagAmendmentLabelStatus).toBeUndefined();
      expect(flagsGroup[1].name).toEqual('Jack Ryan');
      expect(flagsGroup[1].partyAmendmentLabelStatus).toEqual(AmendmentLabelStatus.NONE);
      expect(flagsGroup[1].partyFlags[0].flagAmendmentLabelStatus).toBeUndefined();
      expect(flagsGroup[0].partyFlags[1].flagAmendmentLabelStatus).toBeUndefined();
      expect(flagsGroup[2].name).toEqual('Rob Kennedy');
      expect(flagsGroup[2].partyAmendmentLabelStatus).toEqual(AmendmentLabelStatus.NONE);
      expect(flagsGroup[2].partyFlags[0].flagAmendmentLabelStatus).toBeUndefined();
    });
  });
});
