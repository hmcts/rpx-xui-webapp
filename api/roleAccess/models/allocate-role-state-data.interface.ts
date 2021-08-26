import { Person } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { AllocateTo, DurationOfRole, Period, TypeOfRole } from './allocate-role.enum';

export interface AllocateRoleData {
  caseId: string;
  assignmentId?: string;
  typeOfRole: TypeOfRole;
  allocateTo: AllocateTo;
  personToBeRemoved?: Person;
  person: Person;
  durationOfRole: DurationOfRole;
  roleCategory?: string;
  period: Period;
}
