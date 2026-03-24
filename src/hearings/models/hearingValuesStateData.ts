import { HttpError } from '../../models/httpError.model';
import { ServiceHearingValuesModel } from './serviceHearingValues.model';

export interface HearingValuesStateData {
  serviceHearingValuesModel: ServiceHearingValuesModel;
  // unsure why not set to HearingsValueCaseContext
  caseInfo: any;
  lastError?: HttpError;
}

export interface HearingValuesCaseContext {
  jurisdictionId: string;
  caseReference: string;
  caseType?: string;
}
