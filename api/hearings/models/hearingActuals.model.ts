import { HMCStatus } from './hearings.enum';

export interface HearingActualsModel {
  hearingActuals: HearingActuals;
  hearingPlanned: HearingPlanned;
  hmcStatus: HMCStatus;
}

export interface HearingPlanned {
  plannedHearingType: number;
  plannedHearingDays: PlannedHearing[];
}

export interface PlannedHearing {
  plannedStartTime: string;
  plannedEndTime: string;
  parties: Party[];
}

export interface Party {
  partyId: number;
  partyRole: number;
  individualDetails: IndividualDetail;
  organisationDetails: OrganisationDetails;
  partyChannelSubType: string;
}

interface IndividualDetail {
  title: string;
  firstName: string;
  lastName: string;
}

interface OrganisationDetails {
  name: string;
  cftOrganisationID: string;
}

export interface HearingActuals {
  hearingOutcome: HearingOutcome;
  actualHearingDays: ActualHearingDay[];
}

interface HearingOutcome {
  hearingFinalFlag: boolean;
  hearingResult: HearingResult;
  hearingResultDate: string;
  hearingResultReasonType: string;
  hearingType: string;
}

export interface ActualHearingDay {
  hearingDate: string;
  hearingStartTime: string;
  hearingEndTime: string;
  pauseDateTimes: PauseDateTime[];
  actualDayParties: ActualDayParty[];
}

export enum HearingResult {
  COMPLETED = 'COMPLETED',
  ADJOURNED = 'ADJOURNED',
  CANCELLED = 'CANCELLED',
}

export interface PauseDateTime {
  pauseStartTime: string;
  pauseEndTime: string;
}

export interface ActualIndividualDetail {
  firstName: string;
  lastName: string;
}

export interface ActualOrganisationDetails {
  name: string;
}

export interface ActualDayParty {
  actualPartyId: number;
  didNotAttendFlag: boolean;
  actualIndividualDetails: ActualIndividualDetail;
  actualOrganisationDetails: ActualOrganisationDetails;
  partyChannelSubType: string;
  partyId: number;
  partyRole: number;
  representedParty: number;
}
