import {DefaultHearingWindowModel} from './defaultHearingWindow.model';
import {JudiciaryModel} from './judiciary.model';
import {PartyFlagsModel} from './partyFlags.model';
import {PartyUnavailabilityModel} from './partyUnavilability.model';
import {ScreenNavigationModel} from './screenNavigation.model';
import {VocabularyModel} from './vocabulary.model';

export interface ServiceHearingValuesModel {
  autoListFlag: boolean;
  hearingType: string;
  caseType: string;
  caseSubTypes: string[];
  hearingWindow: DefaultHearingWindowModel;
  duration: number;
  hearingPriorityType: string;
  numberOfPhysicalAttendees: number;
  hearingInWelshFlag: boolean;
  hearingLocations: string[];
  facilitiesRequired: string[];
  listingComments: string;
  hearingRequester: string;
  privateHearingRequiredFlag: boolean;
  leadJudgeContractType: string;
  judiciary: JudiciaryModel;
  hearingIsLinkedFlag: boolean;
  parties: PartyUnavailabilityModel[];
  caseFlags: {
    flags: PartyFlagsModel[],
    flagAmendURL: string,
  };
  screenFlow: ScreenNavigationModel[];
  vocabulary: VocabularyModel[];
}
