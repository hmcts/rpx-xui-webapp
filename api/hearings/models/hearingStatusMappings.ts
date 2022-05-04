/* tslint:disable:object-literal-sort-keys */
import { EXUIDisplayStatusEnum, EXUISectionStatusEnum, HMCStatus } from './hearings.enum';
import { HearingStatusMapping } from './hearingStatusMapping';

export const hearingStatusMappings: HearingStatusMapping[] = [
  {
    hmcStatus: HMCStatus.HEARING_REQUESTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_LISTING,
  },
  {
    hmcStatus: HMCStatus.AWAITING_LISTING,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_LISTING,
  },
  {
    hmcStatus: HMCStatus.LISTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.LISTED,
  },
  {
    hmcStatus: HMCStatus.UPDATE_REQUESTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.UPDATE_REQUESTED,
  },
  {
    hmcStatus: HMCStatus.UPDATE_SUBMITTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.UPDATE_REQUESTED,
  },
  {
    hmcStatus: HMCStatus.EXCEPTION,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.FAILURE,
  },
  {
    hmcStatus: HMCStatus.CANCELLATION_REQUESTED,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLATION_REQUESTED,
  },
  {
    hmcStatus: HMCStatus.VACATED,
    exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
    exuiDisplayStatus: EXUIDisplayStatusEnum.CANCELLED,
  },
  {
    hmcStatus: HMCStatus.AWAITING_ACTUALS,
    exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
    exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_ACTUALS,
  },
  {
    hmcStatus: HMCStatus.COMPLETED,
    exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
    exuiDisplayStatus: EXUIDisplayStatusEnum.COMPLETED,
  },
  {
    hmcStatus: HMCStatus.ADJOURNED,
    exuiSectionStatus: EXUISectionStatusEnum.PAST_AND_CANCELLED,
    exuiDisplayStatus: EXUIDisplayStatusEnum.ADJOURNED,
  },
];
