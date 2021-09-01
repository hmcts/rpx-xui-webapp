import { Person } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { AllocateRoleState } from './allocate-role-state.enum';
import { Actions, AllocateTo, DurationOfRole, Period, TypeOfRole } from './allocate-role.enum';
import { HttpError } from './http-error.interface';

export interface AllocateRoleStateData {
  caseId: string;
  assignmentId?: string;
  state: AllocateRoleState;
  typeOfRole: TypeOfRole;
  allocateTo: AllocateTo;
  personToBeRemoved?: Person;
  person: Person;
  durationOfRole: DurationOfRole;
  action: Actions;
  period: Period;
  lastError?: HttpError;
}
