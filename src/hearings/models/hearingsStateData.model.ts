import { HttpError } from '../../models/httpError.model';
import { CaseHearingsMainModel } from './caseHearingsMain.model';

export interface HearingListStateData {
  caseHearingsMainModel: CaseHearingsMainModel;
  lastError?: HttpError;
}
