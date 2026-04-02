import { CaseDetailsModel } from './caseDetails.model';
import { HearingDetailsModel } from './hearingDetails.model';
import { HearingResponseModel } from './hearingResponse.model';
import { PartyDetailsModel } from './partyDetails.model';
import { RequestDetailsModel } from './requestDetails.model';

// Used specifically for hearing requests, not populated directly
// Populated in hearingrequirements.component.ts when a hearing request is being made via ServiceHearingValuesModel
export interface HearingRequestMainModel {
  // Read directly by few components but not updated
  requestDetails?: RequestDetailsModel;
  // Directly updated by numerous pages (not used in any other models)
  hearingDetails: HearingDetailsModel;
  // Only updated twice (used in few models)
  caseDetails?: CaseDetailsModel;
  // Updated a few times (used in multiple models)
  partyDetails: PartyDetailsModel[];
  // Never updated directly
  hearingResponse?: HearingResponseModel;
}
