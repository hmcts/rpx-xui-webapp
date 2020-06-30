import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model'
import { OrganisationModel } from '../../../src/cases/models/organisation/organisation.model'

export class DataBaseModel {
  organisations: OrganisationModel[]
  sharedCases: SharedCase[]
}
