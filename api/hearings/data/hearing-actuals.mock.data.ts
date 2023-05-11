import { HearingActualsMainModel } from '../models/hearingActualsMainModel';
import { CategoryType, HearingResult, HMCStatus } from '../models/hearings.enum';

export const HEARING_ACTUAL: HearingActualsMainModel = {
  hearingActuals: {
    hearingOutcome: {
      hearingFinalFlag: false,
      hearingResult: null,
      hearingResultDate: '2019-01-01',
      hearingResultReasonType: '',
      hearingType: 'final'
    },
    actualHearingDays: [
      {
        hearingDate: '2021-03-12',
        hearingStartTime: '2021-03-12T09:00:00.000Z',
        hearingEndTime: '2021-03-13T10:00:00.000Z',
        pauseDateTimes: [],
        actualDayParties: [],
        notRequired: false
      }
    ]
  },
  hearingPlanned: {
    plannedHearingType: 'final',
    plannedHearingDays: [
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
        parties: [
          {
            individualDetails: {
              title: 'Ms',
              firstName: 'Jane',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company D'
            },
            partyID: '3',
            partyRole: 'appellant',
            partyChannelSubType: 'video-teams'
          },
          {
            individualDetails: {
              title: '',
              firstName: 'DWP',
              lastName: ''
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company C'
            },
            partyID: '5',
            partyRole: 'claimant',
            partyChannelSubType: 'video-teams'
          }
        ]
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
        parties: [
          {
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '12345',
              name: 'Company E'
            },
            partyID: '2',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Email'
          },
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'Tom',
              lastName: 'Jones'
            },
            organisationDetails: {
              cftOrganisationID: '12345',
              name: 'Company C'
            },
            partyID: '3',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Email'
          }
        ]
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
        parties: [
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'John',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '67890',
              name: 'Company B'
            },
            partyID: '1',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Fax'
          },
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'Jane',
              lastName: 'Jones'
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company E'
            },
            partyID: '3',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Other'
          }
        ]
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
        parties: [
          {
            individualDetails: {
              title: 'Miss',
              firstName: 'Tom',
              lastName: 'Jones'
            },
            organisationDetails: {
              cftOrganisationID: '67890',
              name: 'Company D'
            },
            partyID: '3',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Fax'
          },
          {
            individualDetails: {
              title: 'Mrs',
              firstName: 'Jane',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company C'
            },
            partyID: '4',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Letter'
          }
        ]
      }
    ]
  },
  hmcStatus: HMCStatus.UPDATE_SUBMITTED,
  caseDetails: {
    hmctsServiceCode: 'BBA3',
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
        categoryValue: 'BBA3-002'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002CC',
        categoryParent: 'BBA3-002'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002GC',
        categoryParent: 'BBA3-002'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002RC',
        categoryParent: 'BBA3-002'
      }],
    caseManagementLocationCode: null,
    caserestrictedFlag: false,
    caseSLAStartDate: '2021-11-23T09:00:00.000Z'
  }
};

export const HEARING_ACTUAL_COMPLETED: HearingActualsMainModel = {
  hearingActuals: {
    hearingOutcome: {
      hearingFinalFlag: false,
      hearingResult: HearingResult.COMPLETED,
      hearingResultDate: '2019-01-01',
      hearingResultReasonType: 'Result reason',
      hearingType: 'final'
    },
    actualHearingDays: [
      {
        hearingDate: '2021-03-12',
        hearingStartTime: '2021-03-12T09:00:00.000Z',
        hearingEndTime: '2021-03-13T10:00:00.000Z',
        notRequired: false,
        pauseDateTimes: [{
          pauseStartTime: '2021-03-12T10:10:00.000Z',
          pauseEndTime: '2021-03-12T11:15:00.000Z'
        }],
        actualDayParties: [
          {
            actualPartyId: '3',
            didNotAttendFlag: false,
            individualDetails: {
              firstName: 'Jane',
              lastName: 'Smith'
            },
            actualOrganisationName: 'Company A',
            partyChannelSubType: 'video-teams',
            partyRole: 'Interpreter',
            representedParty: null
          },
          {
            actualPartyId: '5',
            didNotAttendFlag: false,
            individualDetails: {
              firstName: 'DWP',
              lastName: ''
            },
            actualOrganisationName: 'Company A',
            partyChannelSubType: 'telephone-btMeetMe',
            partyRole: 'Interpreter',
            representedParty: null
          },
          {
            actualPartyId: '10',
            didNotAttendFlag: false,
            individualDetails: {
              firstName: 'Tom',
              lastName: 'Cruise'
            },
            actualOrganisationName: 'Company A',
            partyChannelSubType: 'telephone-CVP',
            partyRole: 'Interpreter',
            representedParty: '3'
          }
        ]
      }
    ]
  },
  hearingPlanned: {
    plannedHearingType: 'final',
    plannedHearingDays: [
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
        parties: [
          {
            individualDetails: {
              title: 'Ms',
              firstName: 'Jane',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company D'
            },
            partyID: '3',
            partyRole: 'appellant',
            partyChannelSubType: 'telephone-CVP'
          },
          {
            individualDetails: {
              title: '',
              firstName: 'DWP',
              lastName: ''
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company C'
            },
            partyID: '5',
            partyRole: 'claimant',
            partyChannelSubType: 'video-teams'
          }
        ]
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
        parties: [
          {
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '12345',
              name: 'Company E'
            },
            partyID: '2',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Email'
          },
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'Tom',
              lastName: 'Jones'
            },
            organisationDetails: {
              cftOrganisationID: '12345',
              name: 'Company C'
            },
            partyID: '3',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Email'
          }
        ]
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
        parties: [
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'John',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '67890',
              name: 'Company B'
            },
            partyID: '1',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Fax'
          },
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'Jane',
              lastName: 'Jones'
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company E'
            },
            partyID: '3',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Other'
          }
        ]
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
        parties: [
          {
            individualDetails: {
              title: 'Miss',
              firstName: 'Tom',
              lastName: 'Jones'
            },
            organisationDetails: {
              cftOrganisationID: '67890',
              name: 'Company D'
            },
            partyID: '3',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Fax'
          },
          {
            individualDetails: {
              title: 'Mrs',
              firstName: 'Jane',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company C'
            },
            partyID: '4',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Letter'
          }
        ]
      }
    ]
  },
  hmcStatus: HMCStatus.UPDATE_SUBMITTED,
  caseDetails: {
    hmctsServiceCode: 'BBA3',
    caseRef: '1584618195804035',
    requestTimeStamp: null,
    hearingID: 'h100010',
    externalCaseReference: null,
    caseDeepLink: null,
    hmctsInternalCaseName: 'Jane Smith vs DWP',
    publicCaseName: 'Jane Smith vs DWP',
    caseAdditionalSecurityFlag: false,
    caseInterpreterRequiredFlag: false,
    caseCategories: [
      {
        categoryType: CategoryType.CaseType,
        categoryValue: 'BBA3-002'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002CC',
        categoryParent: 'BBA3-002'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002GC',
        categoryParent: 'BBA3-002'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002RC',
        categoryParent: 'BBA3-002'
      }],
    caseManagementLocationCode: null,
    caserestrictedFlag: false,
    caseSLAStartDate: '2021-11-23T09:00:00.000Z'
  }
};

export const HEARING_ACTUAL_ADJOURNED: HearingActualsMainModel = {
  hearingActuals: {
    hearingOutcome: {
      hearingFinalFlag: false,
      hearingResult: HearingResult.ADJOURNED,
      hearingResultDate: '2019-01-01',
      hearingResultReasonType: 'Result reason',
      hearingType: 'final'
    },
    actualHearingDays: [
      {
        hearingDate: '2021-03-12',
        hearingStartTime: '2021-03-12T09:00:00.000Z',
        hearingEndTime: '2021-03-13T10:00:00.000Z',
        notRequired: false,
        pauseDateTimes: [{
          pauseStartTime: '2021-03-12T10:10:00.000Z',
          pauseEndTime: '2021-03-12T11:15:00.000Z'
        }],
        actualDayParties: [
          {
            actualPartyId: '3',
            didNotAttendFlag: false,
            individualDetails: {
              firstName: 'Jane',
              lastName: 'Smith'
            },
            actualOrganisationName: 'Company A',
            partyChannelSubType: 'video-teams',
            partyRole: 'Interpreter',
            representedParty: null
          },
          {
            actualPartyId: '5',
            didNotAttendFlag: false,
            individualDetails: {
              firstName: 'DWP',
              lastName: ''
            },
            actualOrganisationName: 'Company A',
            partyChannelSubType: 'telephone-btMeetMe',
            partyRole: 'Interpreter',
            representedParty: null
          },
          {
            actualPartyId: '10',
            didNotAttendFlag: false,
            individualDetails: {
              firstName: 'Tom',
              lastName: 'Cruise'
            },
            actualOrganisationName: 'Company A',
            partyChannelSubType: 'telephone-CVP',
            partyRole: 'Interpreter',
            representedParty: '3'
          }
        ]
      }
    ]
  },
  hearingPlanned: {
    plannedHearingType: 'final',
    plannedHearingDays: [
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
        parties: [
          {
            individualDetails: {
              title: 'Ms',
              firstName: 'Jane',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company D'
            },
            partyID: '3',
            partyRole: 'appellant',
            partyChannelSubType: 'telephone-CVP'
          },
          {
            individualDetails: {
              title: '',
              firstName: 'DWP',
              lastName: ''
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company C'
            },
            partyID: '5',
            partyRole: 'claimant',
            partyChannelSubType: 'video-teams'
          }
        ]
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
        parties: [
          {
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '12345',
              name: 'Company E'
            },
            partyID: '2',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Email'
          },
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'Tom',
              lastName: 'Jones'
            },
            organisationDetails: {
              cftOrganisationID: '12345',
              name: 'Company C'
            },
            partyID: '3',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Email'
          }
        ]
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
        parties: [
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'John',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '67890',
              name: 'Company B'
            },
            partyID: '1',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Fax'
          },
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'Jane',
              lastName: 'Jones'
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company E'
            },
            partyID: '3',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Other'
          }
        ]
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
        parties: [
          {
            individualDetails: {
              title: 'Miss',
              firstName: 'Tom',
              lastName: 'Jones'
            },
            organisationDetails: {
              cftOrganisationID: '67890',
              name: 'Company D'
            },
            partyID: '3',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Fax'
          },
          {
            individualDetails: {
              title: 'Mrs',
              firstName: 'Jane',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company C'
            },
            partyID: '4',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Letter'
          }
        ]
      }
    ]
  },
  hmcStatus: HMCStatus.UPDATE_SUBMITTED,
  caseDetails: {
    hmctsServiceCode: 'BBA3',
    caseRef: '1584618195804035',
    requestTimeStamp: null,
    hearingID: 'h100011',
    externalCaseReference: null,
    caseDeepLink: null,
    hmctsInternalCaseName: 'Jane Smith vs DWP',
    publicCaseName: 'Jane Smith vs DWP',
    caseAdditionalSecurityFlag: false,
    caseInterpreterRequiredFlag: false,
    caseCategories: [
      {
        categoryType: CategoryType.CaseType,
        categoryValue: 'BBA3-002'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002CC',
        categoryParent: 'BBA3-002'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002GC',
        categoryParent: 'BBA3-002'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002RC',
        categoryParent: 'BBA3-002'
      }],
    caseManagementLocationCode: null,
    caserestrictedFlag: false,
    caseSLAStartDate: '2021-11-23T09:00:00.000Z'
  }
};

export const HEARING_ACTUAL_AWAITING: HearingActualsMainModel = {
  hearingActuals: {
    hearingOutcome: {
      hearingFinalFlag: false,
      hearingResult: HearingResult.CANCELLED,
      hearingResultDate: '2019-01-01',
      hearingResultReasonType: 'Result reason',
      hearingType: 'final'
    },
    actualHearingDays: [
      {
        hearingDate: '2021-03-12',
        hearingStartTime: '2021-03-12T09:00:00.000+0000',
        hearingEndTime: '2021-03-13T10:00:00.000+0000',
        notRequired: false,
        pauseDateTimes: [{
          pauseStartTime: '2021-03-12T10:10:00.000+0000',
          pauseEndTime: '2021-03-12T11:15:00.000+0000'
        }],
        actualDayParties: [
          {
            actualPartyId: '3',
            didNotAttendFlag: false,
            individualDetails: {
              firstName: 'Jane',
              lastName: 'Smith'
            },
            actualOrganisationName: 'Company A',
            partyChannelSubType: 'video-teams',
            partyRole: 'Interpreter',
            representedParty: null
          },
          {
            actualPartyId: '5',
            didNotAttendFlag: false,
            individualDetails: {
              firstName: 'DWP',
              lastName: ''
            },
            actualOrganisationName: 'Company A',
            partyChannelSubType: 'telephone-btMeetMe',
            partyRole: 'Interpreter',
            representedParty: null
          },
          {
            actualPartyId: '10',
            didNotAttendFlag: false,
            individualDetails: {
              firstName: 'Tom',
              lastName: 'Cruise'
            },
            actualOrganisationName: 'Company A',
            partyChannelSubType: 'telephone-CVP',
            partyRole: 'Interpreter',
            representedParty: '3'
          }
        ]
      }
    ]
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
              firstName: 'Jane',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company D'
            },
            partyID: '3',
            partyRole: 'appellant',
            partyChannelSubType: 'telephone-CVP'
          },
          {
            individualDetails: {
              title: '',
              firstName: 'DWP',
              lastName: ''
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company C'
            },
            partyID: '5',
            partyRole: 'claimant',
            partyChannelSubType: 'video-teams'
          }
        ]
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000+0000',
        plannedEndTime: '2021-03-13T10:00:00.000+0000',
        parties: [
          {
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '12345',
              name: 'Company E'
            },
            partyID: '2',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Email'
          },
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'Tom',
              lastName: 'Jones'
            },
            organisationDetails: {
              cftOrganisationID: '12345',
              name: 'Company C'
            },
            partyID: '3',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Email'
          }
        ]
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000+0000',
        plannedEndTime: '2021-03-13T10:00:00.000+0000',
        parties: [
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'John',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '67890',
              name: 'Company B'
            },
            partyID: '1',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Fax'
          },
          {
            individualDetails: {
              title: 'Mr',
              firstName: 'Jane',
              lastName: 'Jones'
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company E'
            },
            partyID: '3',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Other'
          }
        ]
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000+0000',
        plannedEndTime: '2021-03-13T10:00:00.000+0000',
        parties: [
          {
            individualDetails: {
              title: 'Miss',
              firstName: 'Tom',
              lastName: 'Jones'
            },
            organisationDetails: {
              cftOrganisationID: '67890',
              name: 'Company D'
            },
            partyID: '3',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Fax'
          },
          {
            individualDetails: {
              title: 'Mrs',
              firstName: 'Jane',
              lastName: 'Smith'
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company C'
            },
            partyID: '4',
            partyRole: 'Interpreter',
            partyChannelSubType: 'Letter'
          }
        ]
      }
    ]
  },
  hmcStatus: HMCStatus.UPDATE_SUBMITTED,
  caseDetails: {
    hmctsServiceCode: 'SSCS',
    caseRef: '1584618195804035',
    requestTimeStamp: null,
    hearingID: 'h100009',
    externalCaseReference: null,
    caseDeepLink: null,
    hmctsInternalCaseName: 'Jane Smith vs DWP',
    publicCaseName: 'Jane Smith vs DWP',
    caseAdditionalSecurityFlag: false,
    caseInterpreterRequiredFlag: false,
    caseCategories: [
      {
        categoryType: CategoryType.CaseType,
        categoryValue: 'BBA3-002'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002CC',
        categoryParent: 'BBA3-002'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002GC',
        categoryParent: 'BBA3-002'
      }, {
        categoryType: CategoryType.CaseSubType,
        categoryValue: 'BBA3-002RC',
        categoryParent: 'BBA3-002'
      }],
    caseManagementLocationCode: null,
    caserestrictedFlag: false,
    caseSLAStartDate: '2021-11-23T09:00:00.000+0000'
  }
};
