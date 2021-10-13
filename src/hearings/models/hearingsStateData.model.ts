import { HttpError } from '../../models/httpError.model';
import { CaseHearingsMainModel } from './caseHearingsMain.model';

export interface HearingsStateData {
  caseHearingsMainModel: CaseHearingsMainModel;
  lastError?: HttpError;
}
