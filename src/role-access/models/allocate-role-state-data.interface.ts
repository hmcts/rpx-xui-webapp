import { Person } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { AllocateRoleState } from './allocate-role-state.enum';
import { AllocateTo, DurationOfRole, Period, TypeOfRole } from './allocate-role.enum';
import { HttpError } from './http-error.interface';

export interface AllocateRoleStateData {
  caseId: string;
  state: AllocateRoleState;
  typeOfRole: TypeOfRole;
  allocateTo: AllocateTo;
  person: Person;
  durationOfRole: DurationOfRole;
  period: Period;
  lastError?: HttpError;
}
