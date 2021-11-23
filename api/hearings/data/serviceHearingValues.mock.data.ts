/* tslint:disable:object-literal-sort-keys */
const searviceHearingValues = {
  autoListFlag: true,
  hearingType: '',
  caseType: '',
  caseSubTypes: [''],
  hearingWindow: {
    range: {
      start: '2021-10-20',
      end: '2022-01-31',
    },
    firstDateTimeMustBe: '',
  },
  duration: 45,
  hearingPriorityType: '',
  numberOfPhysicalAttendees: 2,
  hearingInWelshFlag: false,
  hearingLocations: [],
  facilitiesRequired: [],
  listingComments: '',
  hearingRequester: '',
  privateHearingRequiredFlag: false,
  leadJudgeContractType: '',
  judiciary: {
    roleType: [''],
    authorisationTypes: [''],
    authorisationSubType: [''],
    panelComposition: [{
      memberType: '',
      count: 1,
    }],
    judiciaryPreferences: [
      {
        memberID: '',
        memberType: '',
        requirementType: '',
      },
    ],
    judiciarySpecialisms: [''],
  },
  hearingIsLinkedFlag: false,
  parties: [{
    partyName: 'Jane and Smith',
    partyChannel: 'string',
    unavailability: [
      {
        start: '20211122',
        end: '20211123',
      },
    ],
  }],
  caseFlags: {
    flags: [
      {
        partyName: 'Jane and Smith',
        flagId: 'string',
        flagDescription: 'string',
        flagStatus: 'string',
      },
    ],
    flagAmendURL: 'string',
  },
  screenFlow: [
    {
      screenName: 'string',
      navigation: [
        {
          resultValue1: 'string',
        },
      ],
    },
  ],
  vocabulary: [
    {
      word1: 'string',
    },
  ],
};
