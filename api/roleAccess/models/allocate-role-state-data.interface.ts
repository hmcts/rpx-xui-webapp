import { Person } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { AllocateTo, DurationOfRole, Period, RoleCategory, SpecificRole} from './allocate-role.enum';

export interface AllocateRoleData {
  action: string;
  allocateTo: AllocateTo;
  assignmentId?: string;
  caseType: string;
  caseId: string;
  durationOfRole: DurationOfRole;
  jurisdiction?: string;
  period: Period;
  personToBeRemoved?: Person;
  person: Person;
  roleCategory?: RoleCategory;
  typeOfRole: SpecificRole;
}
