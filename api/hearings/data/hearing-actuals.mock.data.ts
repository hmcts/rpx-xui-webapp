import { HearingActualsMainModel } from '../models/hearingActualsMainModel';
import { CategoryType, HearingResult, HMCStatus } from '../models/hearings.enum';

export const HEARING_ACTUAL: HearingActualsMainModel = {
  hearingActuals: {
    hearingOutcome: {
      hearingFinalFlag: false,
      hearingResult: HearingResult.CANCELLED,
      hearingResultDate: '2019-01-01',
      hearingResultReasonType: '',
      hearingType: 'final',
    },
    actualHearingDays: [
      {
        hearingDate: '2021-03-12',
        hearingStartTime: '2021-03-12T09:00:00.000+0000',
        hearingEndTime: '2021-03-13T10:00:00.000+0000',
        pauseDateTimes: [],
        actualDayParties: [
          {
            actualPartyId: '1',
            actualIndividualDetails: {
              firstName: 'Bob',
              lastName: 'Jones',
            },
            actualOrganisationDetails: {
              name: 'Company D',
            },
            didNotAttendFlag: false,
            partyChannelSubType: 'Fax',
            partyRole: 'Interpreter',
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
            actualPartyId: '2',
            actualIndividualDetails: {
              firstName: 'Mary',
              lastName: 'Jones',
            },
            actualOrganisationDetails: {
              name: 'Company A',
            },
            didNotAttendFlag: true,
            partyChannelSubType: 'Other',
            partyRole: 'Interpreter',
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
            partyId: '3',
            partyRole: 'Interpreter',
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
            partyId: '5',
            partyRole: 'Interpreter',
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
            partyId: '2',
            partyRole: 'Interpreter',
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
            partyId: '3',
            partyRole: 'Interpreter',
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
            partyId: '1',
            partyRole: 'Interpreter',
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
            partyId: '3',
            partyRole: 'Interpreter',
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
            partyId: '3',
            partyRole: 'Interpreter',
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
            partyId: '4',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Letter',
          },
        ],
      },
    ],
  },
  hmcStatus: HMCStatus.UPDATE_SUBMITTED,
  caseDetails: {
    hmctsServiceCode: 'SSCS',
    caseRef: '1584618195804035',
    requestTimeStamp: null,
    hearingID: 'h100001',
    externalCaseReference: null,
    caseDeepLink: null,
    hmctsInternalCaseName: 'Jane Smith vs DWP',
    publicCaseName: 'Jane Smith vs DWP',
    caseAdditionalSecurityFlag: false,
    caseInterpreterRequiredFlag: false,
    caseCategories: [
      {
        categoryType: CategoryType.CaseType,
        categoryValue: 'Personal Independence Payment',
      },
      {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'Conditions of Entitlement',
      },
      {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'Good cause',
      },
      {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'Rate of Assessment / Payability Issues - complex',
      }],
    caseManagementLocationCode: null,
    caserestrictedFlag: false,
    caseSLAStartDate: '2021-11-23T09:00:00.000+0000',
  },
};
