import { SharedCase } from '@hmcts/rpx-xui-common-lib';
import { UserDetails } from '@hmcts/rpx-xui-common-lib';
import { CaseAssigneeMappingModel } from '../models/case-assignee-mapping.model';

export function toCaseAssigneeMappingModel(user: UserDetails, aCase: SharedCase): CaseAssigneeMappingModel {
  return {
    assignee_id: user.idamId,
    case_id: aCase.caseId
  };
}
