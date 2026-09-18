import { HttpError } from '../../models/httpError.model';
import { HearingActualsMainModel } from './hearingActualsMainModel';

export interface HearingActualsStateData {
  hearingActualsMainModel: HearingActualsMainModel;
  isFinalisedEditMode?: boolean;
  lastError?: HttpError;
}
