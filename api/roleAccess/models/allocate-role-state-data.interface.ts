import { Person } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { AllocateTo, DurationOfRole, Period, RoleCategory, SpecificRole} from './allocate-role.enum';
import { RoleRequestPayload } from './role-request.model';

export interface AllocateRoleData {
  caseId: string;
  action: string;
  assignmentId?: string;
  typeOfRole: SpecificRole;
  requestedRole?: string;
  allocateTo: AllocateTo;
  personToBeRemoved?: Person;
  person: Person;
  assigneeId?: string;
  durationOfRole: DurationOfRole;
  roleCategory?: RoleCategory;
  period: Period;
  jurisdiction?: string;
  comment?: string;
  originalRequestDate?: Date;
  originalRequestJustification?: RoleRequestPayload;
}
