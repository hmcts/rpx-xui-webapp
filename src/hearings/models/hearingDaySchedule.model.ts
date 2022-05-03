import { PartyDetailsModel } from './partyDetails.model';

export interface HearingDayScheduleModel {
  hearingStartDateTime: string;
  hearingEndDateTime: string;
  listAssistSessionID: string;
  hearingVenueId: string;
  hearingRoomId: string;
  hearingJudgeId: string;
  panelMemberIds: string[];
  attendees: PartyDetailsModel[];
}
