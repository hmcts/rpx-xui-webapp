import { HttpError } from '../../models/httpError.model';
import { HearingValuesCaseContext } from './hearingCaseContext.model';
import { ServiceHearingValuesModel } from './serviceHearingValues.model';

export { HearingValuesCaseContext, ResolvedHearingValuesCaseContext } from './hearingCaseContext.model';

export interface HearingValuesStateData {
  serviceHearingValuesModel: ServiceHearingValuesModel;
  caseInfo: HearingValuesCaseContext | null;
  lastError?: HttpError;
}
