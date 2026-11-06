import { HMCLocationType, MemberType, RequirementType, DOW, DOWUnavailabilityType, UnavailabilityType } from './hearings.enum';

export interface RelatedPartiesModel {
  relatedPartyID: string;
  relationshipType: string;
}

export interface HearingWindowModel {
  dateRangeStart?: string;
  dateRangeEnd?: string;
  firstDateTimeMustBe?: string;
}

export interface HearingLocationModel {
  locationId: string;
  locationType: HMCLocationType;
}

export interface PanelRequirementsModel {
  roleType?: string[];
  authorisationTypes?: string[];
  authorisationSubType?: string[];
  panelPreferences?: PanelPreferenceModel[];
  panelSpecialisms?: string[];
}

export interface PanelPreferenceModel {
  memberID: string;
  memberType?: MemberType;
  requirementType: RequirementType;
}

export interface IndividualDetailsModel {
  title?: string;
  firstName?: string;
  lastName?: string;
  preferredHearingChannel?: string;
  interpreterLanguage?: string;
  reasonableAdjustments?: string[];
  vulnerableFlag?: boolean;
  vulnerabilityDetails?: string;
  hearingChannelEmail?: string[];
  hearingChannelPhone?: string[];
  relatedParties?: RelatedPartiesModel[];
  custodyStatus?: string;
  otherReasonableAdjustmentDetails?: string;
}

export interface OrganisationDetailsModel {
  name?: string;
  organisationType?: string;
  cftOrganisationID?: string;
}

export interface UnavailabilityDOWModel {
  DOW: DOW;
  DOWUnavailabilityType: DOWUnavailabilityType;
}

export interface UnavailabilityRangeModel {
  unavailableFromDate: string;
  unavailableToDate: string;
  unavailabilityType: UnavailabilityType;
}

export interface PartyUnavailabilityRangeModel {
  start: string;
  end: string;
}

export interface JudiciaryModel {
  roleType: string[];
  authorisationTypes: string[];
  authorisationSubType: string[];
  panelComposition: [
    {
      memberType: string;
      count: number;
    },
  ];
  judiciaryPreferences: PanelPreferenceModel[];
  judiciarySpecialisms: string[];
}

export interface VocabularyModel {
  word1: string;
}

export interface NavigationModel {
  conditionOperator?: string;
  conditionValue?: string;
  resultValue: string;
}

export interface ScreenNavigationModel {
  screenName: string;
  conditionKey?: string;
  navigation: NavigationModel[];
}
