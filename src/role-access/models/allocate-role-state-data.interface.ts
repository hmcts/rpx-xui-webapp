import { Person } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { AllocateRoleState } from './allocate-role-state.enum';
import { Actions, AllocateTo, DurationOfRole, Period, RoleCategory} from './allocate-role.enum';
import { SpecificRole } from './specific-role.model';
import { HttpError } from './http-error.interface';

export interface AllocateRoleStateData {
  caseId: string;
  assignmentId?: string;
  state: AllocateRoleState;
  typeOfRole: SpecificRole;
  allocateTo: AllocateTo;
  personToBeRemoved?: Person;
  person: Person;
  durationOfRole: DurationOfRole;
  action: Actions;
  period: Period;
  roleCategory?: RoleCategory;
  lastError?: HttpError;
}
