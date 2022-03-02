/* tslint:disable:object-literal-sort-keys */
import {HearingLocationModel} from './hearingLocation.model';
import {HearingWindowModel} from './hearingWindow.model';
import {JudiciaryModel} from './judiciary.model';
import { PanelRequirementsModel } from './panelRequirements.model';
import {PartyDetailsModel} from './partyDetails.model';
import {PartyFlagsModel} from './partyFlags.model';
import {ScreenNavigationModel} from './screenNavigation.model';
import {VocabularyModel} from './vocabulary.model';

export interface ServiceHearingValuesModel {
  caseName: string;
  autoListFlag: boolean;
  hearingType: string;
  caseType: string;
  caseSubTypes: string[];
  hearingWindow: HearingWindowModel;
  duration: number;
  hearingPriorityType: string;
  numberOfPhysicalAttendees: number;
  hearingInWelshFlag: boolean;
  hearingLocations: HearingLocationModel[];
  caseAdditionalSecurityFlag?: boolean;
  facilitiesRequired: string[];
  listingComments: string;
  hearingRequester: string;
  privateHearingRequiredFlag: boolean;
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
}
