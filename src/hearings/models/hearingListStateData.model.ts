import { HttpError } from '../../models/httpError.model';
import { HearingListMainModel } from './hearingListMain.model';

export interface HearingListStateData {
  hearingListMainModel: HearingListMainModel;
  lastError?: HttpError;
}
