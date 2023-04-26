import { GroupLinkType } from '../models/hearings.enum';
import {
  LinkedHearingGroupMainModel,
  ServiceLinkedCasesModel
} from '../models/linkHearings.model';

export const SERVICE_LINKED_CASES: ServiceLinkedCasesModel[] = [
  {
    caseReference: '1546589340228619',
    caseName: 'Jane and Smith vs DWP',
    reasonsForLink: ['CLRC017']
  },
  {
    caseReference: '1546589642998505',
    caseName: 'Jane and Smith vs DWP',
    reasonsForLink: ['CLRC017', 'CLRC016']
  },
  {
    caseReference: '1584618195804035',
    caseName: 'Jane and Smith vs DWP',
    reasonsForLink: ['CLRC005', 'CLRC006', 'CLRC017']
  }
];

export const LINKED_HEARING_GROUP: LinkedHearingGroupMainModel = {
  groupDetails: {
    groupName: 'Group A',
    groupReason: 'Reason 1',
    groupLinkType: GroupLinkType.ORDERED,
    groupComments: 'Comment 1'
  },
  hearingsInGroup: [
    {
      hearingId: 'h100001',
      hearingOrder: 2,
      caseRef: '4652724902696213'
    },
    {
      hearingId: 'h100003',
      hearingOrder: 1,
      caseRef: '8254902572336147'
    }]
};
