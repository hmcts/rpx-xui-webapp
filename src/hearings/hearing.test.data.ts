import { HearingActualsMainModel } from './models/hearingActualsMainModel';
import { HearingListingStatusEnum, HearingResult, HMCStatus, PartyType } from './models/hearings.enum';
import { ServiceHearingValuesModel } from './models/serviceHearingValues.model';

export const hearingStageRefData = [
  {
    key: 'initial',
    value_en: 'Initial',
    value_cy: '',
    hintText_EN: 'Initial',
    hintTextCY: '',
    order: 1,
    parentKey: null
  },
  {
    key: 'final',
    value_en: 'Final',
    value_cy: '',
    hintText_EN: 'Final',
    hintTextCY: '',
    order: 2,
    parentKey: null
  }
];

export const judicailUsersRefData = [{
  sidam_id: '1102839232',
  object_id: '1102839232',
  known_as: 'Jacky Collins',
  surname: 'Jacky Collins',
  personal_code: 'P0000001',
  full_name: 'Jacky Collins',
  post_nominals: 'Jacky Collins',
  email_id: 'jacky.collins@judicial.com',
}];

export const judgeRefData = [
  {
    id: '38eb0c5e-29c7-453e-b92d-f2029aaed6c1',
    name: 'Jacky Collins',
    email: 'jacky.collins@judicial.com',
    domain: 'JUDICIAL',
    personalCode: 'P0000001',
    knownAs: 'Jacky Collins',
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

export const hearingActualAdjournReasonsRefData = [
  { key: 'postponedDueToExclusions', value_en: 'Postponed, due to Exclusions', value_cy: '', hintText_EN: 'Postponed, due to Exclusions', hintTextCY: '', order: 1, parentKey: null },
  { key: 'postponedDueToOtherReasons', value_en: 'Postponed, due to Other Reasons', value_cy: '', hintText_EN: 'Postponed, due to Other Reasons', hintTextCY: '', order: 2, parentKey: null },
  { key: 'postponedIncompleteTribunal', value_en: 'Postponed, Incomplete Tribunal', value_cy: '', hintText_EN: 'Postponed, Incomplete Tribunal', hintTextCY: '', order: 3, parentKey: null },
  { key: 'postponedNoReasonGiven', value_en: 'Postponed, No Reason Given', value_cy: '', hintText_EN: 'Postponed, No Reason Given', hintTextCY: '', order: 4, parentKey: null },
  { key: 'adjournedNoInterpreter', value_en: 'Adjourned, No Interpreter', value_cy: '', hintText_EN: 'Adjourned, No Interpreter', hintTextCY: '', order: 5, parentKey: null }
];

export const hearingActualCancelReasonsRefData = [
  { key: 'reasoneOne', value_en: 'Reason 1', value_cy: '', hintText_EN: 'reason 1', hintTextCY: '', order: 1, parentKey: null },
  { key: 'reasoneTwo', value_en: 'Reason 2', value_cy: '', hintText_EN: 'Reason 2', hintTextCY: '', order: 2, parentKey: null },
  { key: 'reasonThree', value_en: 'Reason 3', value_cy: '', hintText_EN: 'Reason 3', hintTextCY: '', order: 4, parentKey: null }
];

export const serviceHearingValuesModel: ServiceHearingValuesModel = {
  caseName: 'Jane vs DWP',
  autoListFlag: false,
  hearingType: 'Final',
  caseType: 'Personal Independence Payment',
  caseSubTypes: [
    'Conditions of Entitlement',
    'Good cause',
    'Rate of Assessment / Payability Issues - complex'
  ],
  hearingWindow: {
    hearingWindowDateRange: {
      hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
      hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
    },
    hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
  },
  duration: 45,
  hearingPriorityType: 'standard',
  numberOfPhysicalAttendees: 2,
  hearingInWelshFlag: false,
  hearingLocations: [{
    locationId: '196538',
    locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
    locationType: 'hearing',
    region: 'North West',
  },
  {
    locationId: '219164',
    locationName: 'ABERDEEN TRIBUNAL HEARING CENTRE',
    locationType: 'hearing',
    region: 'Scotland',
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
        memberID: '',
        memberType: '',
        requirementType: 'EXCLUDE'
      }
    ],
    judiciarySpecialisms: [
      ''
    ]
  },
  hearingIsLinkedFlag: false,
  parties: [
    {
      partyID: 'P1',
      partyType: PartyType.IND,
      partyName: 'Jane Smith',
      partyChannel: 'inPerson',
      unavailabilityRanges: [
        {
          unavailableFromDate: '2021-12-10T09:00:00.000+0000',
          unavailableToDate: '2021-12-31T09:00:00.000+0000',
        },
      ],
    },
    {
      partyID: 'P2',
      partyType: PartyType.ORG,
      partyName: 'DWP',
      partyChannel: 'inPerson',
      unavailabilityRanges: [
        {
          unavailableFromDate: '2021-12-20T09:00:00.000+0000',
          unavailableToDate: '2021-12-31T09:00:00.000+0000',
        },
      ],
    }],
  caseFlags: {
    flags: [
      {
        partyName: 'Jane Smith',
        flagParentId: 'RA0008',
        flagId: 'RA0042',
        flagDescription: 'Sign language interpreter required',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'Jane Smith',
        flagParentId: 'RA0032',
        flagId: 'RA0053',
        flagDescription: 'Hearing loop required',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'Jane Smith',
        flagParentId: 'RA0002',
        flagId: 'RA0013',
        flagDescription: 'Larger font size',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'Jane Smith',
        flagParentId: 'RA0003',
        flagId: 'RA0016',
        flagDescription: 'Reading documents for customer',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'Jane Smith',
        flagParentId: 'RA0008',
        flagId: 'RA0042',
        flagDescription: 'Sign Language Interpreter',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'Jane Smith',
        flagParentId: 'PF0001',
        flagId: 'PF0015',
        flagDescription: 'Language Interpreter',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'Jane Smith',
        flagParentId: 'PF0001',
        flagId: 'PF0002',
        flagDescription: 'Vulnerable user',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'DWP',
        flagParentId: 'RA0001',
        flagId: 'RA0005',
        flagDescription: 'Physical access and facilities',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'DWP',
        flagParentId: 'PF0001',
        flagId: 'PF0011',
        flagDescription: 'Banning order',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'Jane Smith vs DWP',
        flagParentId: 'CF0001',
        flagId: 'CF0002',
        flagDescription: 'Complex Case',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'Jane Smith vs DWP',
        flagParentId: 'CF0001',
        flagId: 'CF0006',
        flagDescription: 'Potential fraud',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'Jane Smith vs DWP',
        flagParentId: 'CF0001',
        flagId: 'CF0007',
        flagDescription: 'Urgent flag',
        flagStatus: 'ACTIVE',
      },
    ],
    flagAmendURL: '/'
  },
} as ServiceHearingValuesModel;

export const hearingActualsMainModel: HearingActualsMainModel = {
  hearingActuals: {
    hearingOutcome: {
      hearingFinalFlag: false,
      hearingResult: HearingResult.CANCELLED,
      hearingResultDate: '2019-01-01',
      hearingResultReasonType: 'reasoneTwo',
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
};

export const initialState = {
  hearings: {
    hearingList: {
      hearingListMainModel: {
        caseRef: '1111222233334444',
        hmctsServiceID: 'SSCS',
        caseHearings: [{
          hearingID: 'h00001',
          hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
          hearingType: 'Case management hearing',
          hmcStatus: HMCStatus.HEARING_REQUESTD,
          lastResponseReceivedDateTime: '',
          responseVersion: 'rv1',
          hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
          listAssistCaseStatus: '',
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
    hearingRequest: {
      hearingRequestMainModel: {
        requestDetails: {
          requestTimeStamp: null
        },
        hearingDetails: {
          duration: 60,
          hearingType: 'final',
          hearingLocations: [
            {
              locationId: '196538',
              locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
              locationType: 'hearing',
              region: 'North West',
            },
            {
              locationId: '219164',
              locationName: 'ABERDEEN TRIBUNAL HEARING CENTRE',
              locationType: 'hearing',
              region: 'Scotland',
            },
          ],
          hearingIsLinkedFlag: false,
          hearingWindow: {
            hearingWindowDateRange: {
              hearingWindowStartDateRange: '12-12-2022',
              hearingWindowEndDateRange: '12-12-2022',
            },
            hearingWindowFirstDate: null,
          },
          privateHearingRequiredFlag: false,
          panelRequirements: null,
          panelPreferences: null,
          autolistFlag: false,
          nonStandardHearingDurationReasons: [],
          hearingPriorityType: 'standard',
          numberOfPhysicalAttendees: null,
          hearingInWelshFlag: true,
          facilitiesRequired: [
            'immigrationDetentionCentre',
            'inCameraCourt'
          ],
          listingComments: 'blah blah blah',
          hearingRequester: null,
          leadJudgeContractType: null,
          totalParticipantAttendingHearing: 3
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
          caseCategories: [],
          caseManagementLocationCode: null,
          caserestrictedFlag: false,
          caseSLAStartDate: null
        },
        partyDetails: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyChannel: 'inPerson'
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyChannel: 'byVideo'
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
  },
};
