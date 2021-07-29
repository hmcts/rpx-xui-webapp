import { ExclusionState } from './exclusion-state.enum';
import { HttpError } from './http-error.interface';
import { ExcludeOption, PersonRole } from './exclusion.enum';
import { Person } from '../../work-allocation-2/models/dtos';


export interface ExclusionStateData {
  caseId: string;
  state: ExclusionState;
  exclusionOption: ExcludeOption;
  personRole: PersonRole;
  person: Person;
  exclusionDescription: string;
  lastError?: HttpError;
}
