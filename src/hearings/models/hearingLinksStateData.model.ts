import {HttpError} from '../../models/httpError.model';
import {
  LinkedHearingGroupMainModel,
  ServiceLinkedCasesModel,
  ServiceLinkedCasesWithHearingsModel
} from './linkHearings.model';

export interface HearingLinksStateData {
  serviceLinkedCases: ServiceLinkedCasesModel[];
  serviceLinkedCasesWithHearings: ServiceLinkedCasesWithHearingsModel[];
  linkedHearingGroup: LinkedHearingGroupMainModel;
  lastError?: HttpError;
}
