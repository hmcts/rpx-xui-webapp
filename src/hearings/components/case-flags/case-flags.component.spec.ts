import {ComponentFixture, TestBed} from '@angular/core/testing';
import * as _ from 'underscore';
import {ServiceHearingValuesModel} from '../../models/serviceHearingValues.model';
import {CaseFlagsComponent} from './case-flags.component';

describe('CaseFlagsComponent', () => {
  let component: CaseFlagsComponent;
  let fixture: ComponentFixture<CaseFlagsComponent>;

  const caseFlagsRefData = [
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

  const hearingValueModel: ServiceHearingValuesModel = {
    autoListFlag: false,
    hearingType: 'Final',
    caseType: 'Personal Independence Payment',
    caseSubTypes: [
      'Conditions of Entitlement',
      'Good cause',
      'Rate of Assessment / Payability Issues - complex'
    ],
    hearingWindow: {
      range: {
        start: '2021-11-23T09:00:00.000+0000',
        end: '2021-11-30T09:00:00.000+0000'
      },
      firstDateTimeMustBe: ''
    },
    duration: 45,
    hearingPriorityType: 'Standard',
    numberOfPhysicalAttendees: 2,
    hearingInWelshFlag: false,
    hearingLocations: [
      '196538'
    ],
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
        partyName: 'Jane and Smith',
        partyChannel: '',
        unavailability: [
          {
            start: '2021-12-10T09:00:00.000+0000',
            end: '2021-12-31T09:00:00.000+0000'
          }
        ]
      },
      {
        partyName: 'DWP',
        partyChannel: '',
        unavailability: [
          {
            start: '2021-12-20T09:00:00.000+0000',
            end: '2021-12-31T09:00:00.000+0000'
          }
        ]
      }
    ],
    caseFlags: {
      flags: [
        {
          partyName: 'Jane and Smith',
          flagParentId: 'RA0008',
          flagId: 'RA0042',
          flagDescription: 'Sign language interpreter required',
          flagStatus: 'ACTIVE',
        },
        {
          partyName: 'Jane and Smith',
          flagParentId: 'RA0032',
          flagId: 'RA0053',
          flagDescription: 'Hearing loop required',
          flagStatus: 'ACTIVE',
        },
        {
          partyName: 'Jane and Smith',
          flagParentId: 'RA0002',
          flagId: 'RA0013',
          flagDescription: 'Larger font size',
          flagStatus: 'ACTIVE',
        },
        {
          partyName: 'Jane and Smith',
          flagParentId: 'RA0003',
          flagId: 'RA0016',
          flagDescription: 'Reading documents for customer',
          flagStatus: 'ACTIVE',
        },
        {
          partyName: 'Jane and Smith',
          flagParentId: 'RA0008',
          flagId: 'RA0042',
          flagDescription: 'Sign Language Interpreter',
          flagStatus: 'ACTIVE',
        },
        {
          partyName: 'Jane and Smith',
          flagParentId: 'PF0001',
          flagId: 'PF0015',
          flagDescription: 'Language Interpreter',
          flagStatus: 'ACTIVE',
        },
        {
          partyName: 'Jane and Smith',
          flagParentId: 'CF0001',
          flagId: 'CF0007',
          flagDescription: 'Urgent flag',
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
          flagParentId: 'CF0001',
          flagId: 'CF0002',
          flagDescription: 'Complex Case',
          flagStatus: 'ACTIVE',
        },
        {
          partyName: 'DWP',
          flagParentId: 'PF0001',
          flagId: 'PF0002',
          flagDescription: 'Vulnerable user',
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
          partyName: 'DWP',
          flagParentId: 'CF0001',
          flagId: 'CF0006',
          flagDescription: 'Potential fraud',
          flagStatus: 'ACTIVE',
        },
      ],
      flagAmendURL: '/',
    },
  } as ServiceHearingValuesModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseFlagsComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(CaseFlagsComponent);
    component = fixture.componentInstance;
    component.caseFlagsRefData = caseFlagsRefData;
    component.hearingValueModel = hearingValueModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call convertMapToArray during onint call', () => {
    expect(component).toBeDefined();
    const caseFlags = _.groupBy(component.hearingValueModel.caseFlags.flags, 'partyName');
    const caseFlagConverted = component.convertMapToArray(caseFlags);
    expect(caseFlagConverted.length).toBeGreaterThan(0);
  });

});
