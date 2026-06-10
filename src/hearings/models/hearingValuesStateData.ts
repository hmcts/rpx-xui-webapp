import { HttpError } from '../../models/httpError.model';
import { ServiceHearingValuesModel } from './serviceHearingValues.model';

export interface HearingValuesStateData {
  serviceHearingValuesModel: ServiceHearingValuesModel;
  caseInfo: HearingValuesCaseContext | null;
  lastError?: HttpError;
}

export interface HearingValuesCaseContext {
  jurisdictionId?: string;
  caseReference?: string;
  caseType?: string;
  hearingId?: string;
}

export interface ResolvedHearingValuesCaseContext extends HearingValuesCaseContext {
  jurisdictionId: string;
  caseReference: string;
}
