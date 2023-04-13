import { Person } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { AllocateTo, DurationOfRole, Period, RoleCategory, SpecificRole } from './allocate-role.enum';
import { RoleRequestPayload } from './role-request.model';

export interface AllocateRoleData {
  caseId: string;
  action: string;
  assignmentId?: string;
  typeOfRole: SpecificRole;
  requestedRole?: string;
  requestId?: string;
  allocateTo: AllocateTo;
  personToBeRemoved?: Person;
  person?: Person;
  actorId?: string;
  assigneeId?: string;
  durationOfRole: DurationOfRole;
  roleCategory?: RoleCategory;
  period: Period;
  jurisdiction?: string;
  comment?: string;
  originalRequestDate?: Date;
  requestCreated?: Date;
  accessReason?: string;
  specificAccessReason?: string;
  originalRequestJustification?: RoleRequestPayload;
  specificReason?: string;
}
