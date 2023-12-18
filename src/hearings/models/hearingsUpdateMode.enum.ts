import { PartyDetailsModel } from './partyDetails.model';
import { PartyFlagsModel } from './partyFlags.model';

export enum HearingUpdateMode {
  UPDATED_AUTOMATICALLY,
  UPDATED_ON_PAGE_VISIT
}

export enum AutoUpdateMode {
  NO_UPDATE,
  PARTY,
  PAGELESS,
  WITHIN_PAGE,
  AFTER_PAGE_VISIT
}

export enum PagelessPropertiesEnum {
  CASE_MANAGEMENT_LOCATIONCODE = 'caseManagementLocationCode',
  PARTY_ROLE = 'partyRole',
  RELATED_PARTY_ID = 'relatedPartyID',
  RELATIONSHIP_TYPE = 'relationshipType',
  CUSTODY_STATUS = 'custodyStatus',
  VULNERABLE_FLAG = 'vulnerableFlag',
  VULNERABILITY_DETAILS = 'vulnerabilityDetails',
  HEARING_IN_WELSH_FLAG = 'hearingInWelshFlag',
  ORGANISATION = 'organisation',
  ORGANISATION_TYPE = 'organisationType',
  CFTORGANISATION_ID = 'cftOrganisationID',
  HEARING_CHANNEL_EMAIL = 'hearingChannelEmail',
  HEARING_CHANNEL_PHONE = 'hearingChannelPhone'
}

export enum WithinPagePropertiesEnum {
  HMCTS_INTERNAL_CASENAME = 'hmctsInternalCaseName',
  PUBLIC_CASE_NAME = 'publicCaseName',
  CASE_CATEGORIES = 'caseCategories',
  CASE_RESTRICTED_FLAG = 'caseRestrictedFlag',
  PRIVATE_HEARING_REQUIRED_FLAG = 'privateHearingRequiredFlag',
  PARTIES = 'parties'
}

export enum AfterPageVisitPropertiesEnum {
  REASONABLE_ADJUSTMENTS = 'reasonableAdjustments',
  NON_REASONABLE_ADJUSTMENTS = 'nonReasonableAdjustments',
  PARTIES = 'parties'
}

export interface PagelessProperties {
  caseManagementLocationCode?: boolean,
  partyRole?: boolean,
  relatedPartyID?: boolean,
  relationshipType?: boolean,
  custodyStatus?: boolean,
  vulnerableFlag?: boolean,
  vulnerabilityDetails?: boolean,
  hearingInWelshFlag?: boolean,
  organisation?: boolean,
  organisationType?: boolean,
  cftOrganisationID?: boolean,
  hearingChannelEmail?: boolean,
  hearingChannelPhone?: boolean
}

export interface WithinPageProperties {
  hmctsInternalCaseName?: boolean,
  publicCaseName?: boolean,
  caseCategories?: boolean,
  caseRestrictedFlag?: boolean,
  privateHearingRequiredFlag?: boolean,
  parties?: boolean
}

export interface AfterPageVisitProperties {
  reasonableAdjustmentChangesConfirmed?: boolean;
  nonReasonableAdjustmentChangesConfirmed?: boolean;
  partyDetailsChangesConfirmed?: boolean;
}

export interface PropertiesUpdatedAutomatically {
  pageless?: PagelessProperties,
  withinPage?: WithinPageProperties
}

export interface PropertiesUpdatedOnPageVisit {
  caseFlags: {
    flags: PartyFlagsModel[],
    flagAmendURL: string,
  };
  parties: PartyDetailsModel[],
  afterPageVisit?: AfterPageVisitProperties
}

export enum AmendmentLabelStatus {
  ACTION_NEEDED = 'ACTION NEEDED',
  AMENDED = 'AMENDED'
}
