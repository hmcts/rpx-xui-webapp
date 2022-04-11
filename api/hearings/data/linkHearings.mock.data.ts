import { GroupLinkType } from '../models/hearings.enum'
import { LinkedHearingGroupMainModel, ServiceLinkedCasesModel } from '../models/linkHearings.model'

export const SERVICE_LINKED_CASES: ServiceLinkedCasesModel[] = [
    {
        caseReference: '4652724902696213',
        caseName: 'Smith vs Peterson',
        reasonsForLink: ['Linked for a hearing'],
        hearings: [
            {
                hearingId: 'h1000001',
                hearingStage: 'Initial hearing',
                isSelected: false,
            },
            {
                hearingId: 'h1000002',
                hearingStage: 'Initial hearing',
                isSelected: true,
            },
        ],
    },
    {
        caseReference: '5283819672542864',
        caseName: 'Smith vs Peterson',
        reasonsForLink: ['Linked for a hearing', 'Progressed as part of lead case'],
        hearings: [
            {
                hearingId: 'h1000003',
                hearingStage: 'Final hearing',
                isSelected: true,
            },
            {
                hearingId: 'h1000004',
                hearingStage: 'Final hearing',
                isSelected: false,
            },
        ],
    },
    {
        caseReference: '8254902572336147',
        caseName: 'Smith vs Peterson',
        reasonsForLink: ['Familial', 'Guardian', 'Linked for a hearing'],
        hearings: [
            {
                hearingId: 'h1000005',
                hearingStage: 'Initial hearing',
                isSelected: true,
            },
            {
                hearingId: 'h1000006',
                hearingStage: 'Initial hearing',
                isSelected: false,
            },
        ],
    },
]

export const LINKED_HEARING_GROUP: LinkedHearingGroupMainModel = {
    groupDetails: {
        groupName: 'Smith vs Peterson 1234-5678-9012-3456 (full hearing)',
        groupReason: 'Reason 1',
        groupLinkType: GroupLinkType.ORDERED,
        groupComments: 'Comment 1',
    },
    hearingsInGroup: [
        {
            hearingId: 'h1000000',
            hearingOrder: 1,
        },
        {
            hearingId: 'h1000001',
            hearingOrder: 2,
        },
        {
            hearingId: 'h1000002',
            hearingOrder: 3,
        },
    ],
}
