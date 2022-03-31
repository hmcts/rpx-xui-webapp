import {HttpError} from '../../models/httpError.model';
import {LinkedHearingGroupMainModel, ServiceLinkedCasesModel} from './linkHearings.model';

export interface HearingLinksStateData {
  serviceLinkedCases: ServiceLinkedCasesModel[];
  linkedHearingGroup: LinkedHearingGroupMainModel;
  lastError?: HttpError;
}
