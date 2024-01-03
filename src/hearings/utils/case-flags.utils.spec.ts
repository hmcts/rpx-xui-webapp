import { caseFlagsRefData, serviceHearingValuesModel } from '../hearing.test.data';
import { CaseFlagType, PartyType, UnavailabilityType } from '../models/hearings.enum';
import { PartyDetailsModel } from '../models/partyDetails.model';
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
        partyRole: 'appellant',
        partyName: 'Jane Smith',
        individualDetails: {
          title: 'Mrs',
          firstName: 'Jane',
          lastName: 'Smith',
          preferredHearingChannel: 'inPerson',
          reasonableAdjustments: [
            'RA001'
          ]
        }
      },
      {
        partyID: 'P2',
        partyType: PartyType.IND,
        partyRole: 'claimant',
        partyName: 'Jack Ryan',
        individualDetails: {
          title: 'Mr',
          firstName: 'Jack',
          lastName: 'Ryan',
          preferredHearingChannel: 'inPerson',
          reasonableAdjustments: [
            'RA002'
          ]
        }
      }
    ];

    const partiesInSHV: PartyDetailsModel[] = [
      {
        partyID: 'P1',
        partyType: PartyType.IND,
        partyRole: 'appellant',
        partyName: 'Jane Smith',
        individualDetails: {
          title: 'Mrs',
          firstName: 'Jane',
          lastName: 'Smith',
          preferredHearingChannel: 'inPerson',
          reasonableAdjustments: [
            'RA001'
          ]
        }
      },
      {
        partyID: 'P2',
        partyType: PartyType.IND,
        partyRole: 'claimant',
        partyName: 'Jack Ryan',
        individualDetails: {
          title: 'Mr',
          firstName: 'Jack',
          lastName: 'Ryan',
          preferredHearingChannel: 'inPerson',
          reasonableAdjustments: [
            'RA002'
          ]
        }
      }
    ];

    const caseFlags = [

    ];
    it('should return reasonable adjustment flags', () => {


      const reasonableAdjustmentFlagsGroup = CaseFlagsUtils.getReasonableAdjustmentFlags(caseFlagsRefData, serviceHearingValuesModel.caseFlags.flags, partiesInHMC, partiesInSHV);
    });
  });
});
