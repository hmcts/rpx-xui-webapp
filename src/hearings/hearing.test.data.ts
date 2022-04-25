import { HearingActualsMainModel } from './models/hearingActualsMainModel';
import { HearingRequestMainModel } from './models/hearingRequestMain.model';
import {
  CategoryType,
  GroupLinkType,
  HearingListingStatusEnum,
  HearingResult,
  HMCLocationType,
  HMCStatus,
  LaCaseStatus,
  ListingStatus,
  MemberType,
  PartyType,
  RequirementType, UnavailabilityType
} from './models/hearings.enum';
import {JudicialUserModel} from './models/judicialUser.model';
import { ServiceHearingValuesModel } from './models/serviceHearingValues.model';

export const hearingStageRefData =  [
  {
    key: 'initial',
    value_en: 'Initial',
    value_cy: '',
    hint_text_en: 'Initial',
    hint_text_cy: '',
    lov_order: 1,
    parent_key: null,
    category_key: 'HearingType',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
  },
  {
    key: 'final',
    value_en: 'Final',
    value_cy: '',
    hint_text_en: 'Final',
    hint_text_cy: '',
    lov_order: 2,
    parent_key: null,
    category_key: 'HearingType',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
  },
  {
    key: 'substantial',
    value_en: 'Substantial',
    value_cy: '',
    hint_text_en: 'Substantial',
    hint_text_cy: '',
    lov_order: 3,
    parent_key: null,
    category_key: 'HearingType',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
  },
  {
    key: 'case-management',
    value_en: 'Case management',
    value_cy: '',
    hint_text_en: 'Case management',
    hint_text_cy: '',
    lov_order: 4,
    parent_key: null,
    category_key: 'HearingType',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
  },
];

export const judicailUsersRefData: JudicialUserModel[] = [{
  emailId: 'jacky.collins@judicial.com',
  fullName: 'Jacky Collins',
  idamId: '1102839232',
  isJudge: '',
  isMagistrate: '',
  isPanelMember: '',
  knownAs: 'Jacky Collins',
  personalCode: 'P0000001',
  surname: 'Jacky Collins',
  title: 'Mr'
}];

export const judgeRefData: JudicialUserModel[] = [
  {
    emailId: 'jacky.collins@judicial.com',
    fullName: 'Jacky Collins',
    idamId: '38eb0c5e-29c7-453e-b92d-f2029aaed6c1',
    isJudge: '',
    isMagistrate: '',
    isPanelMember: '',
    knownAs: 'Jacky Collins',
    personalCode: 'P0000001',
    surname: 'Collins',
    title: 'Mr'
  }];

export const hearingPriorityRefData = [
  {
    key: 'urgent',
    value_en: 'Urgent',
    value_cy: '',
    hintText_EN: 'Urgent',
    hintTextCY: '',
    order: 1,
    parentKey: null
  },
  {
    key: 'standard',
    value_en: 'Standard',
    value_cy: '',
    hintText_EN: 'Standard',
    hintTextCY: '',
    order: 2,
    parentKey: null
  }
];

export const facilitiesListRefData = [
  {
    key: 'immigrationDetentionCentre',
    value_en: 'Immigration detention centre',
    value_cy: '',
    hintText_EN: 'Immigration detention centre',
    hintTextCY: '',
    order: 1,
    parentKey: null
  },
  {
    key: 'inCameraCourt',
    value_en: 'In camera court',
    value_cy: '',
    hintText_EN: 'In camera court',
    hintTextCY: '',
    order: 2,
    parentKey: null
  }
];

export const partyChannelsRefData = [
  { key: 'inPerson', value_en: 'In person', value_cy: '', hintText_EN: 'in person', hintTextCY: '', order: 1, parentKey: null },
  { key: 'byPhone', value_en: 'By phone', value_cy: '', hintText_EN: 'By Phone', hintTextCY: '', order: 2, parentKey: null },
  { key: 'byVideo', value_en: 'By video', value_cy: '', hintText_EN: 'By video', hintTextCY: '', order: 4, parentKey: null },
  { key: 'notAttending', value_en: 'Not attending', value_cy: '', hintText_EN: 'not attending', hintTextCY: '', order: 5, parentKey: null }
];

export const caseFlagsRefData = [
  {
    name: 'Case',
    hearingRelevant: true,
    flagComment: true,
    flagCode: 'CF0001',
    isParent: true,
    Path: [],
    childFlags: [
      {
        name: 'Complex Case',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'CF0002',
        isParent: false,
        Path: [
          'Case',
        ],
        childFlags: [],
      },
      {
        name: 'Potentially harmful medical evidence',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'CF0003',
        isParent: false,
        Path: [
          'Case',
        ],
        childFlags: [],
      },
      {
        name: 'Gender recognition',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'CF0004',
        isParent: false,
        Path: [
          'Case',
        ],
        childFlags: [],
      },
      {
        name: 'Domestic violence allegation',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'CF0005',
        isParent: false,
        Path: [
          'Case',
        ],
        childFlags: [],
      },
      {
        name: 'Potential fraud',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'CF0006',
        isParent: false,
        Path: [
          'Case',
        ],
        childFlags: [],
      },
      {
        name: 'Urgent flag',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'CF0007',
        isParent: false,
        Path: [
          'Case',
        ],
        childFlags: [],
      },
      {
        name: 'Exclusion order with Police',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'CF0008',
        isParent: false,
        Path: [
          'Case',
        ],
        childFlags: [],
      },
    ],
  },
  {
    name: 'Party',
    hearingRelevant: true,
    flagComment: true,
    flagCode: 'PF0001',
    isParent: true,
    Path: [],
    childFlags: [
      {
        name: 'Vulnerable user',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0002',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Potentially suicidal',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0003',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Confidential address',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0004',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Anonymous party',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0005',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Potentially Violent Person',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0006',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Unacceptable customer behaviour',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0007',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Vexatious litigant',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0008',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Civil restraint order',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0009',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Extended civil restraint order',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0010',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Banning order',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0011',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Foreign national offender',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0012',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Unaccompanied minor',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0013',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Audio/Video Evidence',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0014',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Language Interpreter',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'PF0015',
        isParent: false,
        Path: [
          'Party',
        ],
        childFlags: [],
      },
      {
        name: 'Reasonable adjustment',
        hearingRelevant: true,
        flagComment: true,
        flagCode: 'RA0001',
        isParent: true,
        Path: [
          'Party',
        ],
        childFlags: [
          {
            name: 'Alternative formats of our information',
            hearingRelevant: true,
            flagComment: true,
            flagCode: 'RA0002',
            isParent: true,
            Path: [
              'Party', 'Reasonable adjustment',
            ],
            childFlags: [
              {
                name: 'Audio / CD',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0009',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Alternative formats of our information',
                ],
                childFlags: [],
              },
              {
                name: 'Braille',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0010',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Alternative formats of our information',
                ],
                childFlags: [],
              },
              {
                name: 'Coloured paper',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0011',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Alternative formats of our information',
                ],
                childFlags: [],
              },
              {
                name: 'Easy Read',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0012',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Alternative formats of our information',
                ],
                childFlags: [],
              },
              {
                name: 'Larger font size',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0013',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Alternative formats of our information',
                ],
                childFlags: [],
              },
            ],
          },
          {
            name: 'Assistance with court and tribunal processes and forms',
            hearingRelevant: true,
            flagComment: true,
            flagCode: 'RA0003',
            isParent: true,
            Path: [
              'Party', 'Reasonable adjustment',
            ],
            childFlags: [
              {
                name: 'Completing forms and documents dictated by customer',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0014',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Assistance with court and tribunal processes and forms',
                ],
                childFlags: [],
              },
              {
                name: 'Face to face explanations to help customer to complete forms',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0015',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Assistance with court and tribunal processes and forms',
                ],
                childFlags: [],
              },
              {
                name: 'Reading documents for customer',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0016',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Assistance with court and tribunal processes and forms',
                ],
                childFlags: [],
              },
              {
                name: 'Time and opportunity for customer to explain their needs and preferences',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0017',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Assistance with court and tribunal processes and forms',
                ],
                childFlags: [],
              },
            ],
          },
          {
            name: 'Pre- Hearing visit',
            hearingRelevant: true,
            flagComment: true,
            flagCode: 'RA0004',
            isParent: false,
            Path: [
              'Party', 'Reasonable adjustment',
            ],
            childFlags: [],
          },
          {
            name: 'Physical access and facilities',
            hearingRelevant: true,
            flagComment: true,
            flagCode: 'RA0005',
            isParent: true,
            Path: [
              'Party', 'Reasonable adjustment',
            ],
            childFlags: [
              {
                name: 'Accessible toilet',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0018',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Physical access and facilities',
                ],
                childFlags: [],
              },
              {
                name: 'Assistance to get to court or tribunal',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0019',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Physical access and facilities',
                ],
                childFlags: [],
              },
              {
                name: 'Assistance using lifts',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0020',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Physical access and facilities',
                ],
                childFlags: [],
              },
              {
                name: 'Lift required',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0021',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Physical access and facilities',
                ],
                childFlags: [],
              },
              {
                name: 'Parking space close to court or tribunal',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0022',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Physical access and facilities',
                ],
                childFlags: [],
              },
              {
                name: 'Personal Evacuation Emergency Plan (PEEP) arrangements',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0023',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Physical access and facilities',
                ],
                childFlags: [],
              },
              {
                name: 'Ramps',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0024',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Physical access and facilities',
                ],
                childFlags: [],
              },
              {
                name: 'Relocation to another building / hearing room / ground floor room',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0025',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Physical access and facilities',
                ],
                childFlags: [],
              },
              {
                name: 'Use of venue wheelchair',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0026',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Physical access and facilities',
                ],
                childFlags: [],
              },
              {
                name: 'Wheelchair access',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0027',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Physical access and facilities',
                ],
                childFlags: [],
              },
            ],
          },
          {
            name: 'Within our buildings and hearing room environment',
            hearingRelevant: true,
            flagComment: true,
            flagCode: 'RA0006',
            isParent: true,
            Path: [
              'Party', 'Reasonable adjustment',
            ],
            childFlags: [
              {
                name: 'Alterations to seating layout',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0028',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Within our buildings and hearing room environment',
                ],
                childFlags: [],
              },
              {
                name: 'Chair in the witness box',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0030',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Within our buildings and hearing room environment',
                ],
                childFlags: [],
              },
              {
                name: 'Chair with back support / cushion / arms / adjustable / extra leg room',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0031',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Within our buildings and hearing room environment',
                ],
                childFlags: [],
              },
              {
                name: 'Hearing Enhancement System (hearing loops infra red receiver)',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0032',
                isParent: true,
                Path: [
                  'Party', 'Reasonable adjustment', 'Within our buildings and hearing room environment',
                ],
                childFlags: [
                  {
                    name: 'Hearing Loop',
                    hearingRelevant: true,
                    flagComment: true,
                    flagCode: 'RA0053',
                    isParent: false,
                    Path: [
                      'Party', 'Reasonable adjustment', 'Within our buildings and hearing room environment',
                      'Hearing Enhancement System (hearing loops infra red receiver)',
                    ],
                    childFlags: [],
                  },
                  {
                    name: 'Infra Red Receiver',
                    hearingRelevant: true,
                    flagComment: true,
                    flagCode: 'RA0054',
                    isParent: false,
                    Path: [
                      'Party', 'Reasonable adjustment', 'Within our buildings and hearing room environment',
                      'Hearing Enhancement System (hearing loops infra red receiver)',
                    ],
                    childFlags: [],
                  },
                  {
                    name: 'Induction Loop',
                    hearingRelevant: true,
                    flagComment: true,
                    flagCode: 'RA0055',
                    isParent: false,
                    Path: [
                      'Party', 'Reasonable adjustment', 'Within our buildings and hearing room environment',
                      'Hearing Enhancement System (hearing loops infra red receiver)',
                    ],
                    childFlags: [],
                  },
                ],
              },
              {
                name: 'Natural light',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0033',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Within our buildings and hearing room environment',
                ],
                childFlags: [],
              },
              {
                name: 'Need to be close to who is speaking',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0034',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Within our buildings and hearing room environment',
                ],
                childFlags: [],
              },
              {
                name: 'Separate waiting area / Private room',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0035',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Within our buildings and hearing room environment',
                ],
                childFlags: [],
              },
            ],
          },
          {
            name: 'The Hearing',
            hearingRelevant: true,
            flagComment: true,
            flagCode: 'RA0007',
            isParent: true,
            Path: [
              'Party', 'Reasonable adjustment',
            ],
            childFlags: [
              {
                name: 'Domiciliary hearing',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0036',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'The Hearing',
                ],
                childFlags: [],
              },
              {
                name: 'Facility to be able to get up and move around',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0037',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'The Hearing',
                ],
                childFlags: [],
              },
              {
                name: 'On-line hearing',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0038',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'The Hearing',
                ],
                childFlags: [],
              },
              {
                name: 'Regular or extra breaks (eg for medication, food and drink or lavatory needs',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0039',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'The Hearing',
                ],
                childFlags: [],
              },
              {
                name: 'Telephone hearing',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0040',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'The Hearing',
                ],
                childFlags: [],
              },
              {
                name: 'Video link',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0041',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'The Hearing',
                ],
                childFlags: [],
              },
            ],
          },
          {
            name: 'Help or support from a third party',
            hearingRelevant: true,
            flagComment: true,
            flagCode: 'RA0008',
            isParent: true,
            Path: [
              'Party', 'Reasonable adjustment',
            ],
            childFlags: [
              {
                name: 'Sign Language Interpreter',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0042',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Help or support from a third party',
                ],
                childFlags: [],
              },
              {
                name: 'CA Witness Services',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0043',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Help or support from a third party',
                ],
                childFlags: [],
              },
              {
                name: 'Clock (Community Legal Outreach Collaboration) representative',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0044',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Help or support from a third party',
                ],
                childFlags: [],
              },
              {
                name: 'Good Things foundation',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0045',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Help or support from a third party',
                ],
                childFlags: [],
              },
              {
                name: 'Intermediary',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0046',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Help or support from a third party',
                ],
                childFlags: [],
              },
              {
                name: 'Lip Speaker',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0047',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Help or support from a third party',
                ],
                childFlags: [],
              },
              {
                name: 'Mackenzie Friend',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0048',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Help or support from a third party',
                ],
                childFlags: [],
              },
              {
                name: 'Other Charity representative',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0049',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Help or support from a third party',
                ],
                childFlags: [],
              },
              {
                name: 'Personal Support Unit',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0050',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Help or support from a third party',
                ],
                childFlags: [],
              },
              {
                name: 'Speech to text reporter (Palantypist)',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0051',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Help or support from a third party',
                ],
                childFlags: [],
              },
              {
                name: 'Support Worker / Carer',
                hearingRelevant: true,
                flagComment: true,
                flagCode: 'RA0052',
                isParent: false,
                Path: [
                  'Party', 'Reasonable adjustment', 'Help or support from a third party',
                ],
                childFlags: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const serviceHearingValuesModel: ServiceHearingValuesModel = {
  hmctsServiceID: 'BBA3',
  caseName: 'Jane vs DWP',
  autoListFlag: false,
  hearingType: 'Final',
  caseCategories: [
    {
      categoryType: CategoryType.CaseType,
      categoryValue: 'Personal Independence Payment',
    }, {
      categoryType: CategoryType.CaseSubType,
      categoryValue: 'Conditions of Entitlement',
    }, {
      categoryType: CategoryType.CaseSubType,
      categoryValue: 'Good cause',
    }, {
      categoryType: CategoryType.CaseSubType,
      categoryValue: 'Rate of Assessment / Payability Issues - complex',
    },
  ],
  caseDeepLink: 'https://manage-case.demo.platform.hmcts.net/',
  caserestrictedFlag: false,
  caseManagementLocationCode: '196538',
  caseSLAStartDate: '2021-05-05T09:00:00.000Z',
  hearingWindow: {
    dateRangeStart: '2022-11-23T09:00:00.000Z',
    dateRangeEnd: '2022-11-30T09:00:00.000Z',
    firstDateTimeMustBe: '2022-12-01T09:00:00.000Z',
  },
  duration: 45,
  hearingPriorityType: 'standard',
  numberOfPhysicalAttendees: 2,
  hearingInWelshFlag: false,
  hearingLocations: [{
    locationId: '196538',
    locationType: HMCLocationType.COURT,
  },
  {
    locationId: '234850',
    locationType: HMCLocationType.COURT,
  },
  ],
  caseAdditionalSecurityFlag: false,
  facilitiesRequired: [],
  listingComments: '',
  hearingRequester: '',
  privateHearingRequiredFlag: false,
  leadJudgeContractType: '',
  judiciary: {
    roleType: [
      ''
    ],
    authorisationTypes: [
      ''
    ],
    authorisationSubType: [
      ''
    ],
    panelComposition: [
      {
        memberType: '',
        count: 1
      }
    ],
    judiciaryPreferences: [
      {
        memberID: 'p1000000',
        memberType: MemberType.JUDGE,
        requirementType: RequirementType.EXCLUDE
      }
    ],
    judiciarySpecialisms: [
      ''
    ]
  },
  hearingIsLinkedFlag: false,
  panelRequirements: {
    roleType: [
      'tribunalJudge',
      'deputyTribunalJudge',
      'regionalTribunalJudge',
    ],
    panelPreferences: [],
    panelSpecialisms: [
      'BBA3-DQPM',
      'BBA3-MQPM2-003',
      'BBA3-MQPM2-004',
      'BBA3-FQPM',
      'BBA3-RMM',
    ],
  },
  parties: [
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
      },
      unavailabilityRanges: [
        {
          unavailableFromDate: '2021-12-10T09:00:00.000Z',
          unavailableToDate: '2021-12-31T09:00:00.000Z',
          unavailabilityType: UnavailabilityType.ALL_DAY,
        },
      ],
    },
    {
      partyID: 'P2',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      partyName: 'DWP',
      individualDetails: {
        title: null,
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'inPerson',
      },
      organisationDetails: {
        name: 'DWP',
        organisationType: 'GOV',
        cftOrganisationID: 'O100000'
      },
      unavailabilityRanges: [
        {
          unavailableFromDate: '2021-12-20T09:00:00.000Z',
          unavailableToDate: '2021-12-31T09:00:00.000Z',
          unavailabilityType: UnavailabilityType.ALL_DAY,
        },
      ],
    }],
  caseFlags: {
    flags: [
      {
        partyID: 'P1',
        partyName: 'Jane Smith',
        flagParentId: 'RA0008',
        flagId: 'RA0042',
        flagDescription: 'Sign language interpreter required',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P1',
        partyName: 'Jane Smith',
        flagParentId: 'RA0032',
        flagId: 'RA0053',
        flagDescription: 'Hearing loop required',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P1',
        partyName: 'Jane Smith',
        flagParentId: 'RA0002',
        flagId: 'RA0013',
        flagDescription: 'Larger font size',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P1',
        partyName: 'Jane Smith',
        flagParentId: 'RA0003',
        flagId: 'RA0016',
        flagDescription: 'Reading documents for customer',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P1',
        partyName: 'Jane Smith',
        flagParentId: 'RA0008',
        flagId: 'RA0042',
        flagDescription: 'Sign Language Interpreter',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P1',
        partyName: 'Jane Smith',
        flagParentId: 'PF0001',
        flagId: 'PF0015',
        flagDescription: 'Language Interpreter',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P1',
        partyName: 'Jane Smith',
        flagParentId: 'PF0001',
        flagId: 'PF0002',
        flagDescription: 'Vulnerable user',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        flagParentId: 'RA0001',
        flagId: 'RA0005',
        flagDescription: 'Physical access and facilities',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        flagParentId: 'PF0001',
        flagId: 'PF0011',
        flagDescription: 'Banning order',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P2',
        partyName: 'Jane Smith vs DWP',
        flagParentId: 'CF0001',
        flagId: 'CF0002',
        flagDescription: 'Complex Case',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P2',
        partyName: 'Jane Smith vs DWP',
        flagParentId: 'CF0001',
        flagId: 'CF0006',
        flagDescription: 'Potential fraud',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P2',
        partyName: 'Jane Smith vs DWP',
        flagParentId: 'CF0001',
        flagId: 'CF0007',
        flagDescription: 'Urgent flag',
        flagStatus: 'ACTIVE',
      },
    ],
    flagAmendURL: '/'
  },
  screenFlow: [
    {
      screenName: 'hearing-requirements',
      navigation: [
        {
          resultValue: 'hearing-facilities',
        },
      ],
    },
    {
      screenName: 'hearing-facilities',
      navigation: [
        {
          resultValue: 'hearing-stage',
        },
      ],
    },
    {
      screenName: 'hearing-stage',
      navigation: [
        {
          resultValue: 'hearing-attendance',
        },
      ],
    },
    {
      screenName: 'hearing-attendance',
      navigation: [
        {
          resultValue: 'hearing-venue',
        },
      ],
    },
    {
      screenName: 'hearing-venue',
      conditionKey: 'region',
      navigation: [
        {
          conditionOperator: 'INCLUDE',
          conditionValue: 'Wales',
          resultValue: 'hearing-welsh',
        },
        {
          conditionOperator: 'NOT INCLUDE',
          conditionValue: 'Wales',
          resultValue: 'hearing-judge',
        },
      ],
    },
    {
      screenName: 'hearing-welsh',
      navigation: [
        {
          resultValue: 'hearing-judge',
        },
      ],
    },
    {
      screenName: 'hearing-judge',
      navigation: [
        {
          resultValue: 'hearing-panel',
        },
      ],
    },
    {
      screenName: 'hearing-panel',
      navigation: [
        {
          resultValue: 'hearing-timing',
        },
      ],
    },
    {
      screenName: 'hearing-timing',
      navigation: [
        {
          resultValue: 'hearing-additional-instructions',
        },
      ],
    },
    {
      screenName: 'hearing-additional-instructions',
      navigation: [
        {
          resultValue: 'hearing-create-edit-summary',
        },
      ],
    },
  ],
  vocabulary: [
    {
      word1: '',
    },
  ],
};

export const hearingRequestMainModel: HearingRequestMainModel = {
  requestDetails: {
    timeStamp: '2022-02-23T09:00:00.000Z',
    versionNumber: 1,
  },
  hearingDetails: {
    duration: 45,
    hearingType: 'final',
    hearingLocations: [
      {
        locationId: '196538',
        locationType: HMCLocationType.COURT,
      },
    ],
    hearingIsLinkedFlag: false,
    hearingWindow: {
      dateRangeStart: '2022-11-23T09:00:00.000Z',
      dateRangeEnd: '2022-11-30T09:00:00.000Z',
      firstDateTimeMustBe: '2022-12-01T09:00:00.000Z',
    },
    privateHearingRequiredFlag: false,
    panelRequirements: null,
    autolistFlag: false,
    hearingPriorityType: 'standard',
    numberOfPhysicalAttendees: 2,
    hearingInWelshFlag: false,
    facilitiesRequired: [
      'immigrationDetentionCentre',
      'inCameraCourt',
      'sameSexCourtroom',
    ],
    listingComments: 'Interpreter required',
    hearingRequester: '',
    leadJudgeContractType: '',
  },
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
    caseSLAStartDate: '2021-11-23T09:00:00.000Z',
  },
  partyDetails: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'appellant',
      individualDetails: {
        title: null,
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'inPerson',
      }
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        title: null,
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo',
      },
    },
  ],
  hearingResponse: {
    listAssistTransactionID: '123456789',
    receivedDateTime: '2021-11-30T09:00:00.000Z',
    responseVersion: 0,
    laCaseStatus: LaCaseStatus.AWAITING_LISTING,
    listingStatus: ListingStatus.DRAFT,
    hearingCancellationReason: '123456543',
    hearingDaySchedule: {
      hearingStartDateTime: '2021-03-12T09:00:00.000Z',
      hearingEndDateTime: '2021-03-12T16:00:00.000Z',
      listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
      hearingVenueId: '815833',
      hearingRoomId: 'room 4',
      hearingJudgeId: 'p1000002',
      panelMemberIds: ['p1000001'],
      attendees: [
        {
          partyID: 'P1',
          partyName: 'Jane and Smith',
          partyType: PartyType.IND,
          partyRole: 'appellant',
          individualDetails: {
            title: null,
            firstName: 'Jane',
            lastName: 'Smith',
            preferredHearingChannel: 'inPerson',
          }
        },
        {
          partyID: 'P2',
          partyName: 'DWP',
          partyType: PartyType.ORG,
          partyRole: 'claimant',
          individualDetails: {
            title: null,
            firstName: 'DWP',
            lastName: null,
            preferredHearingChannel: 'byVideo',
          },
        },
      ],
    },
  },
};

export const hearingActualsMainModel: HearingActualsMainModel = {
  hearingActuals: {
    hearingOutcome: {
      hearingFinalFlag: false,
      hearingResult: HearingResult.CANCELLED,
      hearingResultDate: '2019-01-01',
      hearingResultReasonType: 'reasonTwo',
      hearingType: 'Pre-hearing review',
    },
    actualHearingDays: [
      {
        hearingDate: '2021-03-12T09:00:00.000Z',
        hearingStartTime: '2021-03-12T09:00:00.000Z',
        hearingEndTime: '2021-03-13T10:00:00.000Z',
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
            partyChannelSubType: 'inPerson',
            partyRole: 'interpreter',
            representedParty: '5',
          },
        ],
      },
      {
        hearingDate: '2021-03-12',
        hearingStartTime: '2021-03-12T09:00:00.000Z',
        hearingEndTime: '2021-03-13T10:00:00.000Z',
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
            partyChannelSubType: 'video-teams',
            partyRole: 'interpreter',
            representedParty: '2',
          },
        ],
      },
    ],
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
              firstName: 'Mary',
              lastName: 'Jones',
            },
            organisationDetails: {
              cftOrganisationID: '54321',
              name: 'Company D',
            },
            partyId: '3',
            partyRole: 'interpreter',
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
            partyRole: 'interpreter',
            partyChannelSubType: 'Fax',
          },
        ],
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
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
            partyRole: 'interpreter',
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
            partyRole: 'interpreter',
            partyChannelSubType: 'Email',
          },
        ],
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
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
            partyRole: 'interpreter',
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
            partyRole: 'interpreter',
            partyChannelSubType: 'Other',
          },
        ],
      },
      {
        plannedStartTime: '2021-03-12T09:00:00.000Z',
        plannedEndTime: '2021-03-13T10:00:00.000Z',
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
            partyRole: 'interpreter',
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
            partyRole: 'interpreter',
            partyChannelSubType: 'Letter',
          },
        ],
      },
    ],
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
    caseSLAStartDate: '2021-11-23T09:00:00.000Z',
  },
};

export const initialState = {
  hearings: {
    hearingList: {
      hearingListMainModel: {
        caseRef: '1111222233334444',
        hmctsServiceID: 'BBA3',
        caseHearings: [{
          hearingID: 'h00001',
          hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
          hearingType: 'Case management hearing',
          hmcStatus: HMCStatus.HEARING_REQUESTED,
          lastResponseReceivedDateTime: '',
          responseVersion: 'rv1',
          hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
          listAssistCaseStatus: '',
          hearingIsLinkedFlag: true,
          hearingGroupRequestId: null,
          hearingDaySchedule: null,
        }]
      }
    },
    hearingActuals: {
      hearingActualsMainModel,
      lastError: null,
    },
    hearingValues: {
      serviceHearingValuesModel,
      lastError: null
    },
    hearingRequestToCompare: {
      hearingRequestMainModel: {
        requestDetails: {
          timeStamp: null,
          versionNumber: 1,
        },
        hearingDetails: {
          duration: 60,
          hearingType: 'final',
          hearingLocations: [
            {
              locationId: '196538',
              locationType: HMCLocationType.COURT,
            },
            {
              locationId: '234850',
              locationType: HMCLocationType.COURT,
            },
          ],
          hearingIsLinkedFlag: false,
          hearingWindow: {
            dateRangeStart: '2022-12-12T09:00:00.000Z',
            dateRangeEnd: '2022-12-12T09:00:00.000Z',
            firstDateTimeMustBe: '',
          },
          privateHearingRequiredFlag: false,
          panelRequirements: null,
          autolistFlag: false,
          nonStandardHearingDurationReasons: [],
          hearingPriorityType: 'standard',
          numberOfPhysicalAttendees: 3,
          hearingInWelshFlag: true,
          facilitiesRequired: [
            'immigrationDetentionCentre',
            'inCameraCourt'
          ],
          listingComments: 'blah blah blah',
          hearingRequester: null,
          leadJudgeContractType: null,
        },
        caseDetails: {
          hmctsServiceCode: null,
          caseRef: null,
          requestTimeStamp: null,
          hearingID: null,
          externalCaseReference: null,
          caseDeepLink: null,
          hmctsInternalCaseName: null,
          publicCaseName: null,
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
          caseSLAStartDate: null
        },
        partyDetails: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyRole: 'appellant',
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith',
              reasonableAdjustments: [
                'RA0042',
                'RA0053',
                'RA0013',
                'RA0016',
                'RA0042',
                'RA0009',
              ],
              interpreterLanguage: 'PF0015',
              preferredHearingChannel: 'byVideo',
            },
            organisationDetails: {},
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-10T09:00:00.000Z',
                unavailableToDate: '2021-12-31T09:00:00.000Z',
                unavailabilityType: UnavailabilityType.ALL_DAY,
              },
            ],
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyRole: 'claimant',
            individualDetails: {
              firstName: 'DWP',
              lastName: null,
              preferredHearingChannel: 'byVideo',
              reasonableAdjustments: [
                'RA0005',
              ],
              interpreterLanguage: null,
            },
            organisationDetails: {
              name: 'DWP',
              organisationType: 'GOV',
              cftOrganisationID: 'O100000',
            },
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-20T09:00:00.000Z',
                unavailableToDate: '2021-12-31T09:00:00.000Z',
                unavailabilityType: UnavailabilityType.ALL_DAY,
              },
            ],
          }
        ]
      },
      lastError: null
    },
    hearingRequest: {
      hearingRequestMainModel: {
        requestDetails: {
          timeStamp: '2021-11-30T09:00:00.000Z',
          versionNumber: 1,
        },
        hearingResponse: {
          listAssistTransactionID: '',
          responseVersion: 1,
          receivedDateTime: '2021-11-30T09:00:00.000Z',
          laCaseStatus: LaCaseStatus.AWAITING_LISTING,
          listingStatus: ListingStatus.FIXED,
          hearingCancellationReason: '',
          hearingDaySchedule: {
            hearingStartDateTime: '',
            hearingEndDateTime: '',
            listAssistSessionID: '',
            hearingVenueId: '',
            hearingRoomId: 'room 3',
            hearingJudgeId: 'p1000002',
            panelMemberIds: ['p1000001'],
            attendees: [
              {
                partyID: 'P1',
                partyName: 'Jane and Smith',
                partyType: PartyType.IND,
                partyRole: 'appellant',
                individualDetails: {
                  firstName: 'Jane',
                  lastName: 'Smith',
                  preferredHearingChannel: 'inPerson',
                }
              },
              {
                partyID: 'P2',
                partyName: 'DWP',
                partyType: PartyType.ORG,
                partyRole: 'claimant',
                individualDetails: {
                  firstName: 'DWP',
                  lastName: null,
                  preferredHearingChannel: 'byVideo',
                }
              },
            ],
          }
        },
        hearingDetails: {
          duration: 60,
          hearingType: 'final',
          hearingLocations: [
            {
              locationId: '196538',
              locationType: HMCLocationType.COURT,
            },
            {
              locationId: '234850',
              locationType: HMCLocationType.COURT,
            },
          ],
          hearingIsLinkedFlag: false,
          hearingWindow: {
            dateRangeStart: '2022-12-12T09:00:00.000Z',
            dateRangeEnd: '2022-12-12T09:00:00.000Z',
            firstDateTimeMustBe: '',
          },
          privateHearingRequiredFlag: false,
          panelRequirements: null,
          autolistFlag: false,
          nonStandardHearingDurationReasons: [],
          hearingPriorityType: 'standard',
          numberOfPhysicalAttendees: 3,
          hearingInWelshFlag: true,
          facilitiesRequired: [
            'immigrationDetentionCentre',
            'inCameraCourt'
          ],
          listingComments: 'blah blah blah',
          hearingRequester: null,
          leadJudgeContractType: null,
        },
        caseDetails: {
          hmctsServiceCode: null,
          caseRef: null,
          requestTimeStamp: null,
          hearingID: null,
          externalCaseReference: null,
          caseDeepLink: null,
          hmctsInternalCaseName: 'Jane vs DWP',
          publicCaseName: 'Jane vs DWP',
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
          caseSLAStartDate: null
        },
        partyDetails: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyRole: 'appellant',
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith',
              preferredHearingChannel: 'inPerson',
              reasonableAdjustments: [
                'RA0042',
                'RA0053',
                'RA0013',
                'RA0016',
                'RA0042',
              ],
              interpreterLanguage: 'PF0015',
            },
            organisationDetails: {},
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-10T09:00:00.000Z',
                unavailableToDate: '2021-12-31T09:00:00.000Z',
                unavailabilityType: UnavailabilityType.ALL_DAY,
              },
            ],
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyRole: 'claimant',
            individualDetails: {
              preferredHearingChannel: 'byVideo',
              reasonableAdjustments: [
                'RA0005',
              ],
              interpreterLanguage: null,
            },
            organisationDetails: {
              name: 'DWP',
              organisationType: 'GOV',
              cftOrganisationID: 'O100000',
            },
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-20T09:00:00.000Z',
                unavailableToDate: '2021-12-31T09:00:00.000Z',
                unavailabilityType: UnavailabilityType.ALL_DAY,
              },
            ],
          }
        ]
      },
      lastError: null
    },
    hearingConditions: {
      caseId: '1111222233334444',
      mode: 'create',
      isInit: true,
      fragmentId: 'venue'
    },
    hearingLinks: {
      serviceLinkedCases: [
        {
          caseReference: '4652724902696213',
          caseName: 'Smith vs Peterson',
          reasonsForLink: [
            'Linked for a hearing'
          ],
          hearings: [{
            hearingId: 'h100001',
            hearingStage: HMCStatus.UPDATE_REQUESTED,
            isSelected: true,
            hearingStatus: HMCStatus.AWAITING_LISTING,
            hearingIsLinkedFlag: false
          }]
        },
        {
          caseReference: '5283819672542864',
          caseName: 'Smith vs Peterson',
          reasonsForLink: [
            'Linked for a hearing',
            'Progressed as part of lead case'
          ]
        },
        {
          caseReference: '8254902572336147',
          caseName: 'Smith vs Peterson',
          reasonsForLink: [
            'Familial',
            'Guardian',
            'Linked for a hearing'
          ],
          hearings: [{
            hearingId: 'h100010',
            hearingStage: HMCStatus.UPDATE_REQUESTED,
            isSelected: true,
            hearingStatus: HMCStatus.AWAITING_LISTING,
            hearingIsLinkedFlag: false
          }, {
            hearingId: 'h100012',
            hearingStage: HMCStatus.UPDATE_REQUESTED,
            isSelected: false,
            hearingStatus: HMCStatus.AWAITING_LISTING,
            hearingIsLinkedFlag: false
          }]
        }
      ],
      linkedHearingGroup: {
        groupDetails: {
          groupName: 'Group A',
          groupReason: 'Reason 1',
          groupLinkType: GroupLinkType.ORDERED,
          groupComments: 'Comment 1',
        },
        hearingsInGroup: [
          {
            hearingId: 'h1000001',
            hearingOrder: 1,
          },
          {
            hearingId: 'h1000003',
            hearingOrder: 2,
          },
          {
            hearingId: 'h1000005',
            hearingOrder: 3,
          }],
      },
      lastError: null
    }
  },
};
