import { Person } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { AllocateTo, DurationOfRole, Period, TypeOfRole } from './allocate-role.enum';

export interface AllocateRoleData {
  caseId: string;
  typeOfRole: TypeOfRole;
  allocateTo: AllocateTo;
  person: Person;
  durationOfRole: DurationOfRole;
  period: Period;
}
