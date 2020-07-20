import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model'
import { RawCaseUserModel } from '../models/raw-case-user.model'

export function toSharedCases(rawCaseUserModel: RawCaseUserModel): SharedCase {
  return {
    caseId: rawCaseUserModel.case_id,
    caseTitle: '',
    sharedWith: [],
  }
}
