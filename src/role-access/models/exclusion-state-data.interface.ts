import { Person, PersonRole } from '@hmcts/rpx-xui-common-lib';
import { ExclusionState } from './exclusion-state.enum';
import { ExcludeOption } from './exclusion.enum';
import { HttpError } from './http-error.interface';

export interface ExclusionStateData {
  caseId: string;
  jurisdiction: string;
  state: ExclusionState;
  exclusionOption: ExcludeOption;
  personRole: PersonRole;
  person: Person;
  exclusionDescription: string;
  lastError?: HttpError;
  caseType: string;
}
