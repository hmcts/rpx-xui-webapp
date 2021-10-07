import { HttpError } from '../../models/httpError.model';
import { CaseHearingsMainModel } from './caseHearingsMain.model';

export interface HearingsStateData {
  caseReference: string;
  caseHearingsMainModel: CaseHearingsMainModel;
  lastError?: HttpError;
}
