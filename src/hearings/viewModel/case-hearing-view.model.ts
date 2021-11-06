import { CaseHearingModel } from "api/hearings/models/caseHearing.model";
import { HearingDayScheduleModel } from "api/hearings/models/hearingDaySchedule.model";
import { EXUISectionStatusEnum, EXUIDisplayStatusEnum } from "api/hearings/models/hearings.enum";

export class CaseHearingViewModel implements CaseHearingModel {
    hearingID: string;
    hearingType: string;
    hmcStatus: string;
    lastResponseReceivedDateTime: string;
    responseVersion: string;
    hearingListingStatus: string;
    listAssistCaseStatus: string;
    hearingDaySchedule: HearingDayScheduleModel[];
    exuiSectionStatus?: EXUISectionStatusEnum;
    exuiDisplayStatus?: EXUIDisplayStatusEnum;
    creationDateTime: string;
  }