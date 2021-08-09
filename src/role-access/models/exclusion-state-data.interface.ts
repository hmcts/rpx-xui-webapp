import { Person, PersonRole } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { ExclusionState } from './exclusion-state.enum';
import { ExcludeOption } from './exclusion.enum';
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
