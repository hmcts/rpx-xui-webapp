import {HttpError} from '../../models/httpError.model';
import {HearingActualsMainModel} from './hearingActualsMain.model';

export interface HearingActualsStateData {
  hearingActualsMainModel: HearingActualsMainModel;
  lastError?: HttpError;
}
