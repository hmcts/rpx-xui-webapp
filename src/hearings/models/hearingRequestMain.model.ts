import {CaseDetailsModel} from './caseDetails.model';
import {HearingDetailsModel} from './hearingDetails.model';
import {HearingResponseModel} from './hearingResponse.model';
import {PartyDetailsModel} from './partyDetails.model';
import {RequestDetailsModel} from './requestDetails.model';

export interface HearingRequestMainModel {
  requestDetails?: RequestDetailsModel;
  hearingDetails: HearingDetailsModel;
  caseDetails?: CaseDetailsModel;
  partyDetails: PartyDetailsModel[];
  hearingResponse?: HearingResponseModel;
}
