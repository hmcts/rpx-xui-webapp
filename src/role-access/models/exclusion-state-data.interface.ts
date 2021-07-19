import { ExclusionState } from './exclusion-state.enum';
import { HttpError } from './http-error.interface';
import { ExcludeOption, PersonRole } from './exclusion.enum';
import { Person } from './person-model';

export interface ExclusionStateData {
  state: ExclusionState;
  exclusionOption: ExcludeOption;
  personRole: PersonRole;
  person: Person;
  exclusionDescription: string;
  lastError?: HttpError;
}
