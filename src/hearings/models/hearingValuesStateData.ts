import { HttpError } from '../../models/httpError.model';
import { ServiceHearingValuesModel } from './serviceHearingValues.model';

export interface HearingValuesStateData {
  serviceHearingValuesModel: ServiceHearingValuesModel;
  caseInfo: any;
  lastError?: HttpError;
}
