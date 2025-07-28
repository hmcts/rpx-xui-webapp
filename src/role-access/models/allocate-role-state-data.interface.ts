import { Person, RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { Role } from '.';
import { AllocateRoleState } from './allocate-role-state.enum';
import { Actions, AllocateTo, DurationOfRole, Period } from './allocate-role.enum';
import { HttpError } from './http-error.interface';
import { SpecificRole } from './specific-role.model';

export interface AllocateRoleStateData {
  caseId: string;
  jurisdiction: string;
  assignmentId?: string | string[];
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
  roles?: Role[];
}
