import {GroupLinkType} from "../models/hearings.enum";
import {
  LinkedHearingGroupMainModel,
  ServiceLinkedCasesModel
} from '../models/linkHearings.model';

export const SERVICE_LINKED_CASES: ServiceLinkedCasesModel[] = [
  {
    caseReference: '1546589340228619',
    caseName: 'Smith vs Peterson',
    reasonsForLink: ['Linked for a hearing'],
  },
  {
    caseReference: '1546589642998505',
    caseName: 'Smith vs Peterson',
    reasonsForLink: ['Linked for a hearing', 'Progressed as part of lead case'],
  },
  {
    caseReference: '1546590083847466',
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
      hearingId: 'h100001',
      hearingOrder: 2,
      caseRef: '4652724902696213',
    },
    {
      hearingId: 'h100003',
      hearingOrder: 1,
      caseRef: '8254902572336147',
    }],
};
