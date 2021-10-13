import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import { UserDetails } from '@hmcts/rpx-xui-common-lib/lib/models/user-details.model';
import { CaseAssigneeMappingModel } from '../models/case-assignee-mapping.model';

export function toCaseAssigneeMappingModel(user: UserDetails, aCase: SharedCase): CaseAssigneeMappingModel {
  return {
    assignee_id: user.idamId,
    case_id: aCase.caseId,
  };
}
