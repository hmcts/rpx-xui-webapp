import { CaseCategoryModel } from './caseCategory.model';
import { HearingLocationModel } from './hearingLocation.model';
import { HearingWindowModel } from './hearingWindow.model';
import { JudiciaryModel } from './judiciary.model';
import { PanelRequirementsModel } from './panelRequirements.model';
import { PartyDetailsModel } from './partyDetails.model';
import { PartyFlagsModel } from './partyFlags.model';
import { ScreenNavigationModel } from './screenNavigation.model';
import { VocabularyModel } from './vocabulary.model';

export interface ServiceHearingValuesModel {
  hmctsServiceID: string;
  hmctsInternalCaseName: string;
  publicCaseName: string;
  caseAdditionalSecurityFlag: boolean;
  caseCategories: CaseCategoryModel[];
  caseDeepLink: string;
  caserestrictedFlag: boolean;
  externalCaseReference: string;
  caseManagementLocationCode: string;
  caseSLAStartDate: string;
  autoListFlag: boolean;
  hearingType: string;
  hearingWindow: HearingWindowModel;
  duration: number;
  hearingPriorityType: string;
  numberOfPhysicalAttendees: number;
  hearingInWelshFlag: boolean;
  hearingLocations: HearingLocationModel[];
  facilitiesRequired: string[];
  listingComments: string;
  hearingRequester: string;
  privateHearingRequiredFlag: boolean;
  caseInterpreterRequiredFlag: boolean;
  panelRequirements: PanelRequirementsModel;
  leadJudgeContractType: string;
  judiciary: JudiciaryModel;
  hearingIsLinkedFlag: boolean;
  parties: PartyDetailsModel[];
  caseFlags: {
    flags: PartyFlagsModel[],
    flagAmendURL: string,
  };
  screenFlow: ScreenNavigationModel[];
  vocabulary: VocabularyModel[];
  hearingChannels: string[];
  panelRequiredDefault?: boolean;
}
