{
  autolistFlag: true,
  hearingType: '',
  caseType: '' ,
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
  hearingLocations: [{}],
  facilitiesRequired: [{}],
  listingComments: '',
  hearingRequester: '',
  privateHearingRequiredFlag: false,
  leadJudgeContractType: '',
  judiciary: {
  roleType: [''],
    authorisationTypes: [''],
    authorisationSubType: [''],
  panelComposition: {
    [
      memberType: 'string',
      count: number,
  ],
  }
  judiciaryPreferences: [
    {
      memberID: '',
      memberType: '',
      requirementType: '',
    },
}
],
  judiciarySpecialisms: [
  '',
]
},
hearingIsLinkedFlag: false,
parties:
  [
  {
    partyName: 'string',
    partyChannel: 'string',
    unavailability: [
      {
        start: 'string', // date
        end: 'string' // date
      }
    }
],
caseFlags: {
  flags:
    [
      {
        partyName: string,
        flagId: string,
        flagDescription: string,
        flagStatus: string,
      }
    ],
      flagAmendURL: string,
}
}
screenFlow:
[
  {
    screenName: string,
    navigation: [
      {
        resultValue1: "string",
      }
    ]
  }
]
vocabulary:
  [
    {
      word1: "string",
    }
  ]
}
