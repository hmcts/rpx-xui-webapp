import { Person } from '../../work-allocation-2/models/dtos';
import { AllocateRoleState } from './allocate-role-state.enum';
import { AllocateTo, AnotherPeriod, DurationOfRole, TypeOfRole } from './allocate-role.enum';
import { HttpError } from './http-error.interface';

export interface AllocateRoleStateData {
  caseId: string;
  state: AllocateRoleState;
  typeOfRole: TypeOfRole;
  allocateTo: AllocateTo;
  person: Person;
  durationOfRole: DurationOfRole;
  anotherPeriod: AnotherPeriod;
  lastError?: HttpError;
}
