import {CaseDetailsModel} from './caseDetails.model';
import {HearingResult, HMCStatus} from './hearings.enum';

export interface PauseDateTimeModel {
  pauseStartTime: string;
  pauseEndTime: string;
}

export interface ActualIndividualDetailsModel {
  firstName: string;
  lastName: string;
}

export interface ActualOrganisationDetailsModel {
  name: string;
}

export interface IndividualDetailsModel {
  title: string;
  firstName: string;
  lastName: string;
}

export interface OrganisationDetailsModel {
  name: string;
  cftOrganisationID: string;
}

export interface PlannedDayPartyModel {
  partyId: string;
  partyRole: string;
  individualDetails?: IndividualDetailsModel;
  organisationDetails?: OrganisationDetailsModel;
  partyChannelSubType: string;
}


export interface ActualDayPartyModel {
  actualPartyId: string;
  didNotAttendFlag: boolean;
  individualDetails?: ActualIndividualDetailsModel;
  organisationDetails?: ActualOrganisationDetailsModel;
  partyChannelSubType: string;
  partyRole: string;
  representedParty: string;
}

export interface PlannedHearingDayModel {
  plannedStartTime: string;
  plannedEndTime: string;
  parties: PlannedDayPartyModel[];
}

export interface ActualHearingDayModel {
  hearingDate: string;
  hearingStartTime: string;
  hearingEndTime: string;
  pauseDateTimes: PauseDateTimeModel[];
  actualDayParties: ActualDayPartyModel[];
}

export interface HearingOutcomeModel {
  hearingFinalFlag: boolean;
  hearingResult: HearingResult;
  hearingResultDate: string;
  hearingResultReasonType: string;
  hearingType: string;
}

export interface HearingPlannedModel {
  plannedHearingType: string;
  plannedHearingDays: PlannedHearingDayModel[];
}

export interface HearingActualsModel {
  hearingOutcome: HearingOutcomeModel;
  actualHearingDays: ActualHearingDayModel[];
}

export interface HearingActualsMainModel {
  hearingActuals: HearingActualsModel;
  hearingPlanned: HearingPlannedModel;
  hmcStatus: HMCStatus;
  caseDetails: CaseDetailsModel;
}
