import { HttpError } from '../../models/httpError.model';
import { HearingRequestMainModel } from './hearingRequestMain.model';

export interface HearingRequestStateData {
  hearingRequestMainModel: HearingRequestMainModel;
  lastError?: HttpError;
  loading?: boolean;
}
