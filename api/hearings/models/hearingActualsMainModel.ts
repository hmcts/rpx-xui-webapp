import { HearingResult, HMCStatus } from './hearings.enum';

export interface HearingActualsMainModel {
  hearingActuals: HearingActualsModel;
  hearingPlanned: HearingPlannedModel;
  hmcStatus: HMCStatus;
}

export interface HearingPlannedModel {
  plannedHearingType: string;
  plannedHearingDays: PlannedHearingModel[];
}

export interface PlannedHearingModel {
  plannedDate?: string;
  plannedStartTime: string;
  plannedEndTime: string;
  parties: PartyModel[];
}

export interface PartyModel {
  partyId: number;
  partyRole: number;
  individualDetails: IndividualDetailModel;
  organisationDetails: OrganisationDetailsModel;
  partyChannelSubType: string;
}

export interface IndividualDetailModel {
  title: string;
  firstName: string;
  lastName: string;
}

export interface OrganisationDetailsModel {
  name: string;
  cftOrganisationID: string;
}

export interface HearingActualsModel {
  hearingOutcome: HearingOutcomeModel;
  actualHearingDays: ActualHearingDayModel[];
}

export interface HearingOutcomeModel {
  hearingFinalFlag: boolean;
  hearingResult: HearingResult;
  hearingResultDate: string;
  hearingResultReasonType: string;
  hearingType: string;
}

export interface ActualHearingDayModel {
  hearingDate: string;
  hearingStartTime: string;
  hearingEndTime: string;
  pauseDateTimes: PauseDateTimeModel[];
  actualDayParties: ActualDayPartyModel[];
}

export interface PauseDateTimeModel {
  pauseStartTime: string;
  pauseEndTime: string;
}

export interface ActualIndividualDetailModel {
  firstName: string;
  lastName: string;
}

export interface ActualOrganisationDetailsModel {
  name: string;
}

export interface ActualDayPartyModel {
  actualPartyId: number;
  didNotAttendFlag: boolean;
  actualIndividualDetails: ActualIndividualDetailModel;
  actualOrganisationDetails: ActualOrganisationDetailsModel;
  partyChannelSubType: string;
  partyId: number;
  partyRole: number;
  representedParty: number;
}
