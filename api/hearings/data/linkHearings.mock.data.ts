import {GroupLinkType} from "../models/hearings.enum";
import {
  LinkedHearingGroupMainModel,
  ServiceLinkedCasesModel
} from '../models/linkHearings.model';

export const SERVICE_LINKED_CASES: ServiceLinkedCasesModel[] = [
  {
    caseReference: '4652724902696213',
    caseName: 'Smith vs Peterson',
    reasonsForLink: ['Linked for a hearing'],
  },
  {
    caseReference: '5283819672542864',
    caseName: 'Smith vs Peterson',
    reasonsForLink: ['Linked for a hearing', 'Progressed as part of lead case'],
  },
  {
    caseReference: '8254902572336147',
    caseName: 'Smith vs Peterson',
    reasonsForLink: ['Familial', 'Guardian', 'Linked for a hearing'],
  },
];

export const LINKED_HEARING_GROUP: LinkedHearingGroupMainModel = {
  groupDetails: {
    groupName: 'Group A',
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
    }],
};
