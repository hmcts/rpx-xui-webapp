import { Person } from '../../work-allocation-2/models/dtos';
import { ExclusionState } from './exclusion-state.enum';
import { ExcludeOption, PersonRole } from './exclusion.enum';
import { HttpError } from './http-error.interface';

export interface ExclusionStateData {
  caseId: string;
  state: ExclusionState;
  exclusionOption: ExcludeOption;
  personRole: PersonRole;
  person: Person;
  exclusionDescription: string;
  lastError?: HttpError;
}
