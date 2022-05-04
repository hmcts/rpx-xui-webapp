import { HttpError } from '../../models/httpError.model';
import { HearingActualsMainModel } from './hearingActualsMainModel';

export interface HearingActualsStateData {
  hearingActualsMainModel: HearingActualsMainModel;
  lastError?: HttpError;
}
