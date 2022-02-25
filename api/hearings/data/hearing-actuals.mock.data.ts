import { HearingActualsMainModel } from '../models/hearingActualsMainModel';
import { HearingResult, HMCStatus } from '../models/hearings.enum';

export const HEARING_ACTUAL: HearingActualsMainModel = {
  hearingActuals: {
    hearingOutcome: {
      hearingFinalFlag: false,
      hearingResult: HearingResult.CANCELLED,
      hearingResultDate: '2019-01-01',
      hearingResultReasonType: '',
      hearingType: 'Pre-hearing review',
    },
    actualHearingDays: [
      {
        hearingDate: '2021-03-12',
        hearingStartTime: '2021-03-12T09:00:00.000+0000',
        hearingEndTime: '2021-03-13T10:00:00.000+0000',
        pauseDateTimes: [],
        actualDayParties: [
          {
            actualPartyId: 1,
            actualIndividualDetails: {
              firstName: 'Bob',
              lastName: 'Jones',
            },
            actualOrganisationDetails: {
              name: 'Company D',
            },
            didNotAttendFlag: false,
            partyId: 1,
            partyChannelSubType: 'Fax',
            partyRole: 1,
            representedParty: 5,
          },
        ],
      },
      {
        hearingDate: '2021-03-12',
        hearingStartTime: '2021-03-12T09:00:00.000+0000',
        hearingEndTime: '2021-03-13T10:00:00.000+0000',
        pauseDateTimes: [],
        actualDayParties: [
          {
            actualPartyId: 2,
            actualIndividualDetails: {
              firstName: 'Mary',
              lastName: 'Jones',
            },
            actualOrganisationDetails: {
              name: 'Company A',
            },
            didNotAttendFlag: true,
            partyId: 2,
            partyChannelSubType: 'Other',
            partyRole: 5,
            representedParty: 2,
          },
        ],
      },
    ],
  },
  hearingPlanned: {
    plannedHearingType: 'final',
    plannedHearingDays: [
      {
        plannedStartTime: '2021-03-12T09:00:00.000+0000',
        plannedEndTime: '2021-03-13T10:00:00.000+0000',
        parties: [
          {
            individualDetails: {
              title: 'Ms',
              firstName: 'Mary',
              lastName: 'Jones',
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company D',
            },
            partyId: 3,
            partyRole: 3,
            partyChannelSubType: 'Letter',
          },
          {
            individualDetails: {
              title: 'Miss',
              firstName: 'Bob',
              lastName: 'Jones',
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company C',
            },
            partyId: 5,
            partyRole: 5,
            partyChannelSubType: 'Fax',
          },
        ],
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000+0000',
        plannedEndTime: '2021-03-13T10:00:00.000+0000',
        parties: [
          {
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith',
            },
            organisationDetails: {
              cftOrganisationID: '12345',
              name: 'Company E',
            },
            partyId: 2,
            partyRole: 2,
            partyChannelSubType: 'Email',
          },
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'Tom',
              lastName: 'Jones',
            },
            organisationDetails: {
              cftOrganisationID: '12345',
              name: 'Company C',
            },
            partyId: 3,
            partyRole: 3,
            partyChannelSubType: 'Email',
          },
        ],
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000+0000',
        plannedEndTime: '2021-03-13T10:00:00.000+0000',
        parties: [
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'John',
              lastName: 'Smith',
            },
            organisationDetails: {
              cftOrganisationID: '67890',
              name: 'Company B',
            },
            partyId: 1,
            partyRole: 1,
            partyChannelSubType: 'Fax',
          },
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'Jane',
              lastName: 'Jones',
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company E',
            },
            partyId: 3,
            partyRole: 3,
            partyChannelSubType: 'Other',
          },
        ],
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000+0000',
        plannedEndTime: '2021-03-13T10:00:00.000+0000',
        parties: [
          {
            individualDetails: {
              title: 'Miss',
              firstName: 'Tom',
              lastName: 'Jones',
            },
            organisationDetails: {
              cftOrganisationID: '67890',
              name: 'Company D',
            },
            partyId: 3,
            partyRole: 3,
            partyChannelSubType: 'Fax',
          },
          {
            individualDetails: {
              title: 'Mrs',
              firstName: 'Jane',
              lastName: 'Smith',
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company C',
            },
            partyId: 4,
            partyRole: 4,
            partyChannelSubType: 'Letter',
          },
        ],
      },
    ],
  },
  hmcStatus: HMCStatus.UPDATE_SUBMITTED,
};
