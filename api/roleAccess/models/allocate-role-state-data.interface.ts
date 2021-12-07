import { Person } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { AllocateTo, DurationOfRole, Period, RoleCategory, SpecificRole} from './allocate-role.enum';

export interface AllocateRoleData {
  caseId: string;
  action: string;
  assignmentId?: string;
  typeOfRole: SpecificRole;
  allocateTo: AllocateTo;
  personToBeRemoved?: Person;
  person: Person;
  durationOfRole: DurationOfRole;
  roleCategory?: RoleCategory;
  period: Period;
  jurisdiction?: string;
}
