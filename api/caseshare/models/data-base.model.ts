import { SharedCase } from '@hmcts/rpx-xui-common-lib';
import { OrganisationModel } from './organisation.model';

export class DataBaseModel {
  organisations: OrganisationModel[];
  sharedCases: SharedCase[];
}
